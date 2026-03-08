import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_API_KEY;

useEffect(() => {
  fetch("https://rest.coincap.io/v3/assets", {
  headers: {
  Authorization: `Bearer ${API_KEY}`,
},
})
  .then((res) => res.json())
  .then((data) => {
    setCoins(data.data);
    setLoading(false);
})
  .catch((error) => {
    console.error(error);
    setLoading(false);
});
}, [API_KEY]);

if (loading) return <p>Cargando...</p>;

return (
  <div>
  <h1>Criptomonedas</h1>

  {coins.map((coin) => (
  <div key={coin.id}>
  <Link to={`/coin/${coin.id}`}>
    {coin.name} ({coin.symbol})
  </Link>
  </div>
  ))}
</div>
  );
}