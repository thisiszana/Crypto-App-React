import { useEffect, useState } from "react"
import { getCoinList } from "../../Services/cryptoApi"

function HomePgae() {
    const [coin, setCoin] = useState([]);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState("usd");

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(getCoinList(page, currency));
            const json = await res.json();
            setCoin(json);
        }

        getData();
    }, [])
  return (
    <div>HomePgae</div>
  )
}

export default HomePgae