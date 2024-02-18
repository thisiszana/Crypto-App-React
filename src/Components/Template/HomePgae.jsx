import { useEffect, useState } from "react";
import { getCoinList } from "../../Services/cryptoApi";
import TableCoin from "../Modules/TableCoin";
import Pagination from "../Modules/Pagination";
import Search from "../Modules/Search";
import Chart from "../Modules/Chart";

function HomePgae() {
  const [coin, setCoin] = useState([]);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [isLoading, setIsLoading] = useState(true);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await fetch(getCoinList(page, currency));
      const json = await res.json();

      setCoin(json);
      setIsLoading(false);
    };

    getData();
  }, [page, currency]);
  return (
    <>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin
        coin={coin}
        isLoading={isLoading}
        currency={currency}
        setChart={setChart}
      />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </>
  );
}

export default HomePgae;
