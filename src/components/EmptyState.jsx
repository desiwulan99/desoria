export default function EmptyState({ message = "Data tidak ditemukan." }) {
  return (
    <div className="not-found-state">
      <div className="empty-icon">📦</div>
      <p>{message}</p>
    </div>
  );
}