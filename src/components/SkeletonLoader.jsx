export default function SkeletonLoader({ count = 8 }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="product-card skeleton-card">
          <div className="product-card-img-wrapper skeleton-block image-skeleton"></div>
          <div className="product-card-content">
            <div className="skeleton-block title-skeleton"></div>
            <div className="skeleton-block price-skeleton"></div>
            <div className="skeleton-block button-skeleton"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
