import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Coin() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

const API_KEY = import.meta.env.VITE_API_KEY;

useEffect(() => {
  fetch(`https://rest.coincap.io/v3/assets/${id}`, {
    headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
  })
  .then((res) => res.json())
  .then((data) => {
    setCoin(data.data);
    })
  .catch((error) => console.error(error));
  }, [id, API_KEY]);

useEffect(() => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  setIsFavorite(favorites.includes(id));
}, [id]);

const toggleFavorite = () => {
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let updatedFavorites;

if (favorites.includes(id)) {
  updatedFavorites = favorites.filter((favId) => favId !== id);
  setIsFavorite(false);
  } else {
  updatedFavorites = [...favorites, id];
  setIsFavorite(true);
  }

localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

if (!coin) return <p>Cargando...</p>;

return (
  <div>
    <h1>{coin.name}</h1>
    <p>Símbolo: {coin.symbol}</p>
    <p>Precio USD: ${Number(coin.priceUsd).toFixed(2)}</p>
    <p>Rank: {coin.rank}</p>

  <button onClick={toggleFavorite}>
    {isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
  </button>
</div>
);
}