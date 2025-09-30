import { useEffect, useState } from "react";

function App() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showWelcome, setShowWelcome] = useState(true); // estado para la alerta

  const fetchCharacters = (query = "") => {
    setLoading(true);
    setError("");

    const url = query
      ? `https://rickandmortyapi.com/api/character/?name=${query}`
      : `https://rickandmortyapi.com/api/character`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("No se encontraron personajes 😢");
        return res.json();
      })
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setCharacters([]);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    if (search.length > 2) {
      fetchCharacters(search);
    } else if (search.length === 0) {
      fetchCharacters();
    }
  }, [search]);

  return (
    <div>
      <h1>Rick and Morty Characters</h1>

      {/* 🚀 Modal de bienvenida */}
      {showWelcome && (
        <div className="modal">
          <div className="modal-content">
            <h2>👋 Bienvenido</h2>
            <p>Explora el universo de Rick and Morty Characters</p>
            <button onClick={() => setShowWelcome(false)}>Entrar</button>
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Buscar personaje..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          display: "block",
          margin: "20px auto",
          padding: "10px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid gray",
        }}
      />

      {loading && <p style={{ textAlign: "center" }}>Cargando...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      <ul>
        {characters.map((char) => (
          <li key={char.id}>
            <img src={char.image} alt={char.name} width={120} />
            <h3>{char.name}</h3>
            <p>Status: {char.status}</p>
            <p>Species: {char.species}</p>
            <p>Origin: {char.origin.name}</p>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
