import Button from "./Button";

export default function EmptyState({ message = "Data tidak ditemukan.", actionLabel, onAction, children }) {
  return (
    <div className="not-found-state">
      <div className="empty-icon">📦</div>
      <p>{message}</p>
      {actionLabel && onAction && (
        <div className="empty-action">
          <Button variant="outline" fullWidth={false} onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
      {children && <div className="empty-action">{children}</div>}
    </div>
  );
}
