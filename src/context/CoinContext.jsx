import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setAllCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoins = async ()=> {
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
  useEffect(() => {
    fetchAllCoins();
  }, [currency]);
  const CoinContextValue = {
    allCoins,
    currency,
    setAllCurrency,
  };
  return (
    <div>

    <CoinContext.Provider value={CoinContextValue}>
      {props.children}
    </CoinContext.Provider>
    </div>
  );
};


export default CoinContextProvider