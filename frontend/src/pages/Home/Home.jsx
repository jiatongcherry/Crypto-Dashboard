import React, { useContext, useState, useEffect } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../contexts/authContext';

const Home = () => {
  const { allCoins, currency } = useContext(CoinContext);
  const [displayCoins, setDisplayCoins] = useState([]);
  const [input, setInput] = useState('');
  const { currentUser } = useAuth();

  const inputHandler = (e) => {
    setInput(e.target.value);

    if (e.target.value === '') {
      setDisplayCoins(allCoins);
    }
  }

  /* Search filter out the coin searched*/
  const searchHandler = async (event) => {
    //prevent page refresh
    event.preventDefault();

    const coins = await allCoins.filter((coin) => {
      return coin.name.toLowerCase().includes(input.toLowerCase())
    })

    setDisplayCoins(coins);
  }

  const showWelcomeMessage = () => {
    if (currentUser) {
      alert(`Hello ${currentUser.email}, you are now logged in`);
    } else {
      alert('Hello Guest, you are now logged in');
    }
  };

  useEffect(() => {
    setDisplayCoins(allCoins);
  }, [allCoins]);

  useEffect(() => {
    showWelcomeMessage();
  }, [currentUser]);

  //list='coinlist'，associated with <datalist> whose id is 'coinlist'
  return (
    <>
      <Navbar />
      <div className='home'>
        <div className='hero'>
          <h1>Largest <br /> Crypto Marketplace</h1>
          <p>Buy and sell cryptocurrencies easily on Crypto</p>
          <form onSubmit={searchHandler}>
            <input onChange={inputHandler} value={input} list='coinlist'
              type="text" placeholder='Search crypto...' required />


            <datalist id='coinlist'>
              {allCoins.map((item, index) => (
                <option key={index} value={item.name} />
              ))}
            </datalist>


            <button type='submit'>Search</button>
          </form>
        </div>

        <div className='crypto-table'>
          <div className='table-layout'>
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{ textAlign: "center" }}>24H Change</p>
            <p className='market-cap'>Market Cap</p>
          </div>

          <div>
            {
              displayCoins.slice(0, 10).map((item, index) => (
                <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                  <p>{item.market_cap_rank}</p>
                  <div>
                    <img src={item.image} alt="" />
                    <p>{item.name + '-' + item.symbol}</p>
                  </div>
                  <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                  <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                    {Math.floor(item.price_change_percentage_24h * 100) / 100}
                  </p>
                  <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                </Link>
              ))
            }
          </div>
        </div>

      </div >
      <Footer />
    </>
  )
}

export default Home
