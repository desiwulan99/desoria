import SearchBar from "./SearchBar";

export default function Navbar({ searchTerm, setSearchTerm }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Desoria</div>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
    </nav>
  );
}