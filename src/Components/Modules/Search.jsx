import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

import { searchCoin } from "../../Services/cryptoApi.js";
import styles from "./Search.module.css";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState("flase");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    setCoins([]);
    if (!text) {
      setIsLoading(false);
      return;
    }

    const getData = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        if (json.coins) {
          setIsLoading(false);
          setCoins(json.coins);
        } else {
          setError(json.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message);
      }
    };

    setIsLoading(true);
    getData();

    return () => controller.abort();
  }, [text]);

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Enter coin name ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(!!coins.length || isLoading) && (
        <div className={styles.searchResult}>
          {isLoading && (
            <RotatingLines strokeColor="#6f0477" strokeWidth="2" width="50px" />
          )}
          <ul>
            {coins.map((coin) => (
              <li key={coin.id}>
                <img src={coin.thumb} alt={coin.name} />
                <p>{coin.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
