import { useState } from "react";

import styles from "./Chart.module.css";
import { convertData } from "../../Helpers/convertData.js";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");

  const typeHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      const type = e.target.innerText.toLowerCase().replace(" ", "_");
      setType(type);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <div className={styles.nameCross}>
          <div className={styles.name}>
            <img src={chart.data.image} alt={chart.data.name} />
            <p>{chart.data.name}</p>
          </div>
          <div className={styles.cross} onClick={() => setChart(null)}>
            <span>X</span>
          </div>
        </div>
        <div className={styles.graph}>
          <ChartComponents data={convertData(chart, type)} type={type} />
        </div>
        <div className={styles.types} onClick={typeHandler}>
          <button className={type === "prices" ? styles.selected : null}>
            Prices
          </button>
          <button className={type === "market_caps" ? styles.selected : null}>
            Market Caps
          </button>
          <button className={type === "total_volumes" ? styles.selected : null}>
            Total Volumes
          </button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Prices :</p>
            <span>$ {chart.data.current_price}</span>
          </div>
          <div>
            <p>ATH :</p>
            <span>$ {chart.data.ath}</span>
          </div>
          <div>
            <p>MArket Cap :</p>
            <span>{chart.data.market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

const ChartComponents = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#6f0477"
          strokeWidth="2px"
        />
        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <XAxis dataKey="date" domain={["auto", "auto"]} hide />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
