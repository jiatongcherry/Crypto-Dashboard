# Crypto Price Tracking Application

This is a cryptocurrency price tracking application built with React, Vite, CoinGecko API, and Firebase. The application allows users to search for cryptocurrency prices, view trends.

## Features

- **Real-Time Data**: Retrieve and display real-time cryptocurrency prices and market capitalization using the CoinGecko API.
- **User Authentication**: Users can register and log in using Firebase Authentication.

## Technologies Used

- **Frontend**: React, Vite
- **API**: CoinGecko API
- **Authentication**: Firebase Authentication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Crypto-Price-Tracking-Application.git

2. Navigate to the backend directory and install dependencies:

   ```bash
   cd Crypto-Price-Tracking-Application/node-rest-api
   npm install

3. Set up your MongoDB database and configure your environment variables (.env)

4. Start the backend server
   To keep the service running continuously and not dependent on the terminal, you can use pm2
   
   ```bash
   npm run dev
   
   pm2 start index.js

5. Navigate to the frontend directory and install dependencies:
   
   ```bash
   cd /crypto-dashboard
   npm install

6. Start the frontend development server:
   
   ```bash
   npm run dev
