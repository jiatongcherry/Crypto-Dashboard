import React, { useEffect, useState, useContext } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await res.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json' }
    };

    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options);
      const data = await res.json();
      setHistoricalData(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      //guarantee two component are both rendered
      await Promise.all([fetchCoinData(), fetchHistoricalData()]);
      setIsLoading(false);
    };

    fetchData();
  }, [currency]);

  if (isLoading || !coinData || !historicalData) {
    return (
      <div className='spinner'>
        <div className="spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>

          <ul>
            <li>Current Price</li>
            <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>

          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Coin;