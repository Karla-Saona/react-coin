import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Favorites() {

const [coins, setCoins] = useState([]);
const [loading, setLoading] = useState(true);

const API_KEY = import.meta.env.VITE_API_KEY;

useEffect(() => {

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (favorites.length === 0) {
  setLoading(false);
  return;
}

fetch("https://rest.coincap.io/v3/assets", {
  headers: {
  Authorization: `Bearer ${API_KEY}`,
  },
  })
  .then(res => res.json())
  .then(data => {

  const filteredCoins = data.data.filter(coin =>
  favorites.includes(coin.id)
  );

setCoins(filteredCoins);
setLoading(false);

});

}, []);

if (loading) return <p>Cargando...</p>;

if (coins.length === 0) {
return <p>No hay criptomonedas favoritas.</p>;
}

return (
  <div>
  <h1>Favoritos</h1>

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