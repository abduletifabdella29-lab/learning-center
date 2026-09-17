# 02. Building a Semantic Comparator (Practice)

A small practice project exploring how to generate text embeddings with the Gemini API and compare them mathematically using cosine similarity.

## Overview

This project has two parts:

1. **Generating embeddings** — turning text into a numerical vector representation using Google's Gemini embedding model.
2. **Comparing embeddings** — measuring how similar two vectors are using the cosine similarity formula, implemented two different ways.

## Files

### `01_Generate-Embeddings.js`

Uses the `@google/genai` SDK to generate a vector embedding for a sample piece of text.

- Loads `GEMINI_API_KEY` and `GEMINI_EMBEDDING_MODEL` from environment variables (`.env`), defaulting to `gemini-embedding-001` if no model is specified.
- Calls `ai.models.embedContent()` with `outputDimensionality: 768` to get a 768-dimension vector.
- Logs the resulting embedding values to the console.

**Setup:**

```bash
npm install dotenv @google/genai
```

Create a `.env` file:

```
GEMINI_API_KEY=your_api_key_here
GEMINI_EMBEDDING_MODEL=gemini-embedding-001
```

Run:

```bash
node 01_Generate-Embeddings.js
```

### `02_Math-Similarity.js`

Implements **cosine similarity** — the standard way to measure how close two vectors point in the same direction, regardless of their magnitude.

**Formula:**

```
Cosine Similarity = (A · B) / (||A|| * ||B||)
```

Where:
- `A · B` — dot product: the sum of matching element products (`∑(A[i] * B[i])`)
- `||A||`, `||B||` — magnitude (length) of each vector: `sqrt(∑(A[i]²))`
- Result ranges from `-1.0` (opposite direction) to `1.0` (identical direction)

Two implementations are included for comparison:

#### `cosineSimilarity()` — Naive version
- Uses three separate loops: one for the dot product, one for magnitude A, one for magnitude B.
- **Pros:** very readable, good for learning the math step by step.
- **Cons:** less efficient — iterates over the data three times (`O(3N)`).

#### `cosineSimilarity02()` — Optimized version
- Computes the dot product and both magnitudes in a single loop.
- Includes a safety check to avoid dividing by zero if either vector has zero magnitude.
- **Pros:** faster on high-dimensional vectors (e.g. 768d embeddings), single-pass (`O(N)`).
- **Cons:** slightly less obvious to read at a glance since everything happens together.

**Run:**

```bash
node 02_Math-Similarity.js
```

This will log similarity scores for two example vector pairs.

## Key Takeaway

Embeddings turn text into vectors that capture semantic meaning, and cosine similarity lets you measure how "close" two pieces of text are in meaning — the foundation of semantic search, recommendation systems, and RAG pipelines.

## Notes

This is a practice/reference project focused on understanding the underlying math and API mechanics, not production-ready code.