import Button from "./Button";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <div className="error-state-icon">⚠️</div>
      <p className="error-state-message">Gagal memuat data: {message}</p>
      {onRetry && (
        <div className="empty-action">
          <Button variant="danger" fullWidth={false} onClick={onRetry}>
            Coba Lagi
          </Button>
        </div>
      )}
    </div>
  );
}
