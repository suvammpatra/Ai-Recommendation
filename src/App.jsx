import { useState } from "react";
import products from "./data/products";
import { getRecommendations } from "./services/groq";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";

const CATEGORIES = ["all", "phones", "laptops", "audio", "wearables", "gaming"];

export default function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [recommendedIds, setRecommendedIds] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState("all");

  async function handleSearch() {
    if (!query.trim() || loading) return;
    setLoading(true);
    setError("");
    setAiMessage("");
    setRecommendedIds(new Set());

    try {
      const result = await getRecommendations(query, products);
      setRecommendedIds(new Set((result.ids || []).map(Number)));
      setAiMessage(result.explanation || "");
      setActiveCategory("all");
    } catch (err) {
      setError(err.message || "Something went wrong. Check your API key.");
    } finally {
      setLoading(false);
    }
  }

  const filtered =
    activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

  const hasRecs = recommendedIds.size > 0;

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 20px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 6 }}>AI Product Recommender</h1>
        <p style={{ fontSize: 14, color: "#6b7280" }}>
          Describe what you need — the AI will highlight the best matches from our catalog.
        </p>
      </div>

      <SearchBar
        query={query}
        onChange={setQuery}
        onSubmit={handleSearch}
        loading={loading}
      />

      {error && (
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 6,
            padding: "10px 14px",
            fontSize: 13,
            color: "#dc2626",
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      {aiMessage && (
        <div
          style={{
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            padding: "10px 14px",
            fontSize: 13,
            color: "#374151",
            marginBottom: 20,
          }}
        >
          <span style={{ fontWeight: 500 }}>AI: </span>{aiMessage}
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "5px 14px",
              borderRadius: 99,
              border: "1px solid",
              borderColor: activeCategory === cat ? "#111" : "#e5e7eb",
              background: activeCategory === cat ? "#111" : "transparent",
              color: activeCategory === cat ? "#fff" : "#6b7280",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 13, color: "#9ca3af" }}>
          {filtered.length} products
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            recommended={recommendedIds.has(product.id)}
            dimmed={hasRecs && !recommendedIds.has(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
