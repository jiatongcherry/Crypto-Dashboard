import admin from 'firebase-admin';
import cron from 'node-cron';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert(require('/root/email_reminder_cron/firebase_key.json')),
});

const db = admin.firestore();

export async function getUpcomingReminders() {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const eventsRef = db.collection('events');
    try {
        const query = eventsRef
            .where('date', '==', formattedDate)
            .where('reminder.enabled', '==', true)
            .where('reminder.sent', '==', false)
            .where('reminder.time', '>=', formattedTime)
            .where('reminder.time', '<', `${formattedTime.split(':')[0]}:${(now.getMinutes() + 1).toString().padStart(2, '0')}`);

        const snapshot = await query.get();
        console.log('Found', snapshot.docs.length, 'upcoming reminders');
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); //users choose to send reminder
    } catch (error) {
        console.error(error);
    }
}

export async function getUser(userId) {
    try {
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();
        return userDoc.data();
    } catch (error) {
        console.error(error);
    }
}

// send email usign mailgun
export async function sendEmail(to, subject, body) {
    console.log('Sending email to', to);
    
    const domain = 'noreply.calendar.domain';
    const apiEndpoint = `https://api.mailgun.net/v3/${domain}/messages`;

    const reqHeaders = {
        'Authorization': `Basic ${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString('base64')}`,
    };

    const formdata = new URLSearchParams();
    formdata.append("from", "Calendar <postmaster@noreply.calendar.domain>");
    formdata.append("to", to);
    formdata.append("subject", subject);
    formdata.append("text", subject);
    formdata.append("html", body);

    const requestOptions = {
        method: 'POST',
        headers: reqHeaders,
        body: formdata,
    };

    try {
        const response = await fetch(apiEndpoint, requestOptions);
        const result = await response.text();
        return !!result;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function updateEventReminder(eventId) {
    const eventRef = db.collection('events').doc(eventId);
    await eventRef.update({
        'reminder.sent': true,
    });
}

// main function to send reminders
export async function sendReminders() {
    const events = await getUpcomingReminders();
    console.log(events);
    
    for (const event of events) {
        const { userId, title, description } = event;
        const userData = await getUser(userId);
        if (!userData) {
            console.error(`User not found: ${userId}`);
            continue;
        }
        const email = userData.email;
        
        const emailBody = `
            You have an upcoming event: \n
            Title: ${title} \n
            Description: ${description || 'No description provided'} \n
            Date: ${event.date} \n
            Time: ${event.eventTime.allDay ? "All Day" : `${event.eventTime.start} - ${event.eventTime.end}`} \n
        `;
        
        await sendEmail(email, `Reminder: ${title}`, emailBody);
        await updateEventReminder(event.id);
    }
}

cron.schedule('* * * * *', async () => {
    console.log('Start reminder check...');
    await sendReminders();
});