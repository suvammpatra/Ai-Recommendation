export default function ProductCard({ product, recommended, dimmed }) {
  return (
    <div
      style={{
        border: recommended ? "1.5px solid #2563eb" : "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 16,
        background: "#fff",
        opacity: dimmed ? 0.35 : 1,
        position: "relative",
        transition: "opacity 0.2s",
      }}
    >
      {recommended && (
        <span
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "#eff6ff",
            color: "#1d4ed8",
            fontSize: 11,
            fontWeight: 500,
            padding: "2px 8px",
            borderRadius: 99,
          }}
        >
          AI Pick
        </span>
      )}
      <p style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", marginBottom: 4 }}>
        {product.brand}
      </p>
      <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>{product.name}</p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14, lineHeight: 1.5 }}>{product.desc}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 15, fontWeight: 500 }}>${product.price}</span>
        <span
          style={{
            fontSize: 11,
            background: "#f3f4f6",
            color: "#6b7280",
            padding: "3px 10px",
            borderRadius: 99,
          }}
        >
          {product.category}
        </span>
      </div>
    </div>
  );
}
