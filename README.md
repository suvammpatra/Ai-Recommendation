# AI Product Recommender

A React application that uses Groq's LLM API to recommend products based on natural language queries.

## Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

3. Add your Groq API key to `.env`:
   ```
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```
   Get your API key at https://console.groq.com

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/
│   ├── ProductCard.jsx   # Individual product display
│   └── SearchBar.jsx     # Query input with suggestions
├── data/
│   └── products.js       # Product catalog
├── services/
│   └── groq.js           # Groq API integration
├── App.jsx               # Root component with state
└── main.jsx              # Entry point
```

## How It Works

1. The user types a natural language query (e.g. "phone under $500 with good camera")
2. The full product catalog is sent to Groq's 'llama-3.3-70b-versatile' model as context
3. The model returns a JSON object with matching product IDs and an explanation
4. Matching products are highlighted; non-matches are dimmed

## Build

```bash
npm run build
```

## Demo Video
(https://drive.google.com/file/d/1KPg3GATN6pzkTxe4e3D-QEA7YpvUb5Aj/view?usp=sharing)
