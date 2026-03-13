const SUGGESTIONS = [
  "phone under $500",
  "laptop for students",
  "wireless earbuds with ANC",
  "fitness tracker under $200",
  "budget gaming accessories",
];

export default function SearchBar({ query, onChange, onSubmit, loading }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder="e.g. I want a phone under $500 with great camera..."
          style={{
            flex: 1,
            padding: "10px 14px",
            fontSize: 14,
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={onSubmit}
          disabled={loading || !query.trim()}
          style={{
            padding: "10px 20px",
            background: loading || !query.trim() ? "#e5e7eb" : "#111",
            color: loading || !query.trim() ? "#9ca3af" : "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 500,
            cursor: loading || !query.trim() ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            minWidth: 90,
          }}
        >
          {loading ? "..." : "Search"}
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            style={{
              background: "none",
              border: "1px solid #e5e7eb",
              borderRadius: 99,
              padding: "4px 12px",
              fontSize: 12,
              color: "#6b7280",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
