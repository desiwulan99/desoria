export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Cari produk di Desoria..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search-bar-input"
    />
  );
}