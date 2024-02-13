import { RotatingLines } from "react-loader-spinner";
import styles from "./TableCoin.module.css";

import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

function TableCoin({ coin, isLoading }) {
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
              <TableRow data={coin} key={coin.id} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({ data }) => {
  const {
    image,
    name,
    symbol,
    current_price,
    total_volume,
    price_change_percentage_24h: change_price,
  } = data;

  return (
    <tr>
      <td>
        <div className={styles.symbol}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>$ {current_price.toLocaleString()}</td>
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
