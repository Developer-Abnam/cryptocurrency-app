import React, { useContext, useEffect, useState } from "react";
import './Home.css'
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
const Home = () => {
    const {allCoins, currency} = useContext(CoinContext)
    const [displayCoins, setDisplayCoins] = useState([])
    const [inputValue, setInputValue] = useState('')
    const searchHandler = (event) => {
      setInputValue(event.target.value)
      if(event.target.value === '') {
        setDisplayCoins(allCoins)
      }
    }

    const inputHandler = async (event) => {
      event.preventDefault()
      const coins = await allCoins.filter((item)=>
      (
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      ))
      setDisplayCoins(coins)
    }
    useEffect(()=>{
        setDisplayCoins(allCoins)
    },[allCoins])
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world largest cryptocurrency marketplace. sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={inputHandler}>
            <input type="text" list="coinlist" placeholder="Search crypto..." onChange={searchHandler} value={inputValue} />
            <datalist id="coinlist">
              {
                displayCoins.map((item,index)=>(<option value={item.name} key={index} />))
              }
            </datalist>
            <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{textAlign: "center"}}>24H Change</p>
            <p className="market-cap">Market Cap</p>
        </div>
        {
            displayCoins.slice(0,10).map((item, index)=>(
                <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                    <p>{item.market_cap_rank}</p>
                    <div>
                        <img src={item.image} alt="" />
                        <p>{item.name + " - " + item.symbol}</p>
                    </div>
                    <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                    <p className={item.price_change_percentage_24h>0 ? 'green' : 'red'}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
                    <p className="market-cap">{currency.symbol} {item.market_cap.toLocaleString()}</p>
                </Link>
            ))
        }
      </div>
    </div>
  );
};

export default Home;
