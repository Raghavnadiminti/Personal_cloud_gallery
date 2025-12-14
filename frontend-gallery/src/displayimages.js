export default function Gallery({ images, loading, selected, onSelect }) {
  
  if (loading) return <div className="loading-text">Loading Gallery...</div>;

  return (
    <div className="gallery-grid">
      {images.map((img) => (
        <div
          key={img.key}
          className={`image-card ${selected === img.key ? "selected" : ""}`}
          onClick={() => onSelect(img.key)}
        >
          <img src={img.url} alt="Gallery" loading="lazy" />
          
          {selected === img.key && (
            <div className="checkmark">✓</div>
          )}
        </div>
      ))}
    </div>
  );
}