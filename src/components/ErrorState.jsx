export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state" style={{ textAlign: "center", padding: "40px", border: "1px solid #fecaca", backgroundColor: "#fef2f2", borderRadius: "8px" }}>
      <p style={{ color: "#dc2626", fontWeight: "medium" }}>
        Gagal memuat data: {message}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          style={{ marginTop: "15px", padding: "8px 16px", backgroundColor: "#dc2626", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}