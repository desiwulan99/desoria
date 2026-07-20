export default function LoadingState({ message = "Sedang memuat data Desoria..." }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="spinner" />
      <p>{message}</p>
    </div>
  );
}
