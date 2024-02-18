import { RotatingLines } from "react-loader-spinner";
import styles from "./TableCoin.module.css";

import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { marketChart } from "../../Services/cryptoApi";

function TableCoin({ coin, isLoading, currency, setChart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines strokeColor="#6f0477" strokeWidth="2" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Toatal Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coin.map((coin) => (
              <TableRow
                data={coin}
                key={coin.id}
                currency={currency}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({ data, currency, setChart }) => {
  const {
    id,
    image,
    name,
    symbol,
    current_price,
    total_volume,
    price_change_percentage_24h: change_price,
  } = data;

  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart({ ...json, data});
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currency === "usd"
          ? `$  ${current_price.toLocaleString()}`
          : currency === "jpy"
          ? `¥  ${current_price.toLocaleString()}`
          : currency === "eur"
          ? `€  ${current_price.toLocaleString()}`
          : null}
      </td>
      <td className={change_price > 0 ? styles.success : styles.error}>
        {change_price.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={change_price > 0 ? chartUp : chartDown} alt={name} />
      </td>
    </tr>
  );
};
