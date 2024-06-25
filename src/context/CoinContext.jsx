import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  // CG-k61zmAzWzbNZDuwpdYMMNXHL
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: 'usd',
    symbol: '$',
  })
//   cosnt[currency, setCurrency] = useState({
//     name: "usd",
//     symbol: "$",
//   });

  const fetchAllCoins = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-k61zmAzWzbNZDuwpdYMMNXHL",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setAllCoins(response))
      .catch((err) => console.error(err));
  };
  useEffect(()=>{
    fetchAllCoins()
  },[currency])
  const CoinContextValue = {
    allCoins, currency,setCurrency
  };
  return (
    <CoinContextProvider.provider value={CoinContextProvider}>
      {props.children}
    </CoinContextProvider.provider>
  );
};

export default CoinContextProvider;
