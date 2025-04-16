import { useEffect, useState } from "react";

function App() {
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const onChange = (event) => {
    setMoney(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json.filter((item) => item.symbol === "BTC"));
      })
    }, []);
  console.log(coins);
  return (
    <div>
      <h1>Bitcoin!</h1>
      <input onChange={onChange} value={money} type="text" placeholder="Write your money."></input>
      {
        <h4>i'll buy {coins[0].quotes.USD.price / money} qty</h4>
      }
      {
        coins.map((coin) => (
          <h4>
          {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
          </h4>
        ))
      }
    </div>
  );
}

export default App;