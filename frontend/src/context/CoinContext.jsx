import { createContext } from "react";
import { useState, useEffect } from "react";

export const CoinContext = createContext();
const CoinContextProvider = (props) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$"
  });

  const fetchCoins = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-dU5DNYgub7gqfup7dBnrvSpn' }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
      .then(res => res.json())
      .then(res => setAllCoins(res))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoins();
  }, [currency])

  const ContextValue = {
    allCoins, currency, setCurrency
  }

  return (
    <CoinContext.Provider value={ContextValue}>
      {props.children}
    </CoinContext.Provider>
  )
}

export default CoinContextProvider;