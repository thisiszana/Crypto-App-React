import { useEffect, useState } from "react";
import { getCoinList } from "../../Services/cryptoApi";
import TableCoin from "../Modules/TableCoin";
import Pagination from "../Modules/Pagination";

function HomePgae() {
  const [coin, setCoin] = useState([]);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await fetch(getCoinList(page, currency));
      const json = await res.json();

      setCoin(json);
      setIsLoading(false);
    };

    getData();
  }, [page]);
  return (
    <>
      <TableCoin coin={coin} isLoading={isLoading} />
      <Pagination page={page} setPage={setPage} />
    </>
  );
}

export default HomePgae;
