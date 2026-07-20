export default function Button({ children, onClick, type = "button", className = "", ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-add-cart ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}