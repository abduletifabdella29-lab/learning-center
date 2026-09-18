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

## Practice Exercises

A few follow-up exercises in the same style as the reference code above — same heavy-commenting approach, same "naive vs optimized" mindset. Each one is a stub: the formula and setup are given, the loop logic is left for you to fill in.

### Exercise 1 — Euclidean Distance

```javascript
// =======================================================================================
// MATHEMATICAL FORMULA: EUCLIDEAN DISTANCE
//
// Formula:  Distance = sqrt( ∑ (A[i] - B[i])² )
//
// Where:
//   - Measures the straight-line ("as the crow flies") distance between two points/vectors.
//   - Score Range  = 0 (identical vectors) to +Infinity (completely different).
//
// NOTE: Unlike cosine similarity, this DOES care about magnitude, not just direction.
// =======================================================================================

/**
 * TODO: Implement Euclidean Distance
 *
 * STEPS:
 * 1. Check both vectors have the same length (throw an error if not).
 * 2. Loop through both vectors, subtract matching elements, square the result, and sum it.
 * 3. Take the square root of the sum.
 * 4. Return the result.
 */
function euclideanDistance (vecA, vecB) {
    // your code here
}

console.log(euclideanDistance([1, 9], [2, 0])) // try it with the same vectors from 02_Math-Similarity.js
```

### Exercise 2 — Manhattan Distance (single-pass, like `cosineSimilarity02`)

```javascript
// =======================================================================================
// MATHEMATICAL FORMULA: MANHATTAN DISTANCE (a.k.a. Taxicab Distance)
//
// Formula:  Distance = ∑ |A[i] - B[i]|
//
// Where:
//   - Sums the absolute differences between matching elements.
//   - Named after navigating city blocks — you can't cut diagonally, only along grid lines.
// =======================================================================================

/**
 * TODO: Implement Manhattan Distance in a SINGLE loop (no helper loops)
 *
 * STEPS:
 * 1. Check both vectors have the same length.
 * 2. In one loop, take the absolute difference of each matching pair and accumulate it.
 * 3. Return the total.
 *
 * BONUS: Add a zero-length / empty-vector guard, same idea as the
 * division-by-zero check in cosineSimilarity02().
 */
function manhattanDistance (vecA, vecB) {
    // your code here
}

console.log(manhattanDistance([5, 1], [10, 2]))
```

### Exercise 3 — Find the Most Similar Vector (Top-1 Nearest Neighbor)

```javascript
// =======================================================================================
// TASK: SEMANTIC SEARCH (SIMPLIFIED)
//
// Given one "query" vector and a list of "candidate" vectors, find the candidate
// that is most similar to the query using cosine similarity.
//
// This is the same core loop that powers real semantic search / RAG retrieval —
// just without a database or real embeddings behind it.
// =======================================================================================

/**
 * TODO: Implement findMostSimilar
 *
 * STEPS:
 * 1. Loop through each candidate vector.
 * 2. Reuse cosineSimilarity02() (from 02_Math-Similarity.js) to score it against the query.
 * 3. Keep track of the highest score seen so far, and which candidate produced it.
 * 4. Return { index, score } for the best match.
 */
function findMostSimilar (queryVec, candidateVecs) {
    // your code here
}

const query = [1, 9]
const candidates = [
    [2, 0],
    [1, 8],
    [9, 1],
]

console.log(findMostSimilar(query, candidates)) // expect index 1 to win — it's closest in direction to [1, 9]
```

## Semantic Search Pipeline (Real-World Flow)

The exercises above are the building blocks of a real semantic search endpoint. Here's how a typical `GET /api/questions/search` request flows end to end, and how each step maps back to the code in this repo:

```
Client Request GET /api/questions/search
            │
            ▼
   Validate Query Params
            │
            ▼
 Call Gemini API for Query Embedding
            │
            ▼
 Fetch All 'ready' Vectors from DB
            │
            ▼
 Compute Cosine Similarity for Each
            │
            ▼
  Filter out Scores < Threshold
            │
            ▼
   Sort Descending & Take Top K
            │
            ▼
 Fetch Question Details for Top K
            │
            ▼
        Return 200 OK
```

| Pipeline Step | What it does | Maps to |
|---|---|---|
| **Client Request** | User submits a search query string | Entry point of the API |
| **Validate Query Params** | Reject empty/missing queries before doing expensive work | Basic input validation (not covered in this repo) |
| **Call Gemini API for Query Embedding** | Convert the user's search text into a vector | `01_Generate-Embeddings.js` — same `embedContent()` call, run on live user input instead of a fixed test string |
| **Fetch All 'ready' Vectors from DB** | Load pre-computed embeddings for every stored question | The `candidates` array in Exercise 3, but persisted in a real database instead of hardcoded |
| **Compute Cosine Similarity for Each** | Score the query vector against every candidate vector | `cosineSimilarity02()` from `02_Math-Similarity.js`, looped — this **is** `findMostSimilar()` from Exercise 3 |
| **Filter out Scores < Threshold** | Drop matches that aren't similar enough (e.g. score < 0.75) | Not yet built — see "Next Steps" below |
| **Sort Descending & Take Top K** | Keep only the best K matches, ranked highest to lowest | Extension of `findMostSimilar()` — instead of tracking one best match, track and sort the top K |
| **Fetch Question Details for Top K** | Go back to the DB to pull full question data for the winning vectors | Not yet built — see "Next Steps" below |
| **Return 200 OK** | Send the ranked results back to the client | API response layer (not covered in this repo) |

### Next Steps

To turn the practice exercises into this full pipeline, the remaining pieces to build are:

1. **`findTopK(queryVec, candidateVecs, k, threshold)`** — an extension of `findMostSimilar()` that:
   - Scores every candidate with `cosineSimilarity02()`
   - Filters out anything below `threshold`
   - Sorts the remaining scores descending
   - Returns only the top `k` results
2. **A mock in-memory "database"** — an array of `{ id, question, vector }` objects to stand in for the real DB fetch, so the whole pipeline can run without a real backend.
3. **Wiring it together** — a small script that: embeds a query with `01_Generate-Embeddings.js`, runs it through `findTopK()`, and logs the ranked results — a working, end-to-end mock of the diagram above.

## Key Takeaway

Embeddings turn text into vectors that capture semantic meaning, and cosine similarity lets you measure how "close" two pieces of text are in meaning — the foundation of semantic search, recommendation systems, and RAG pipelines.

## Notes

This is a practice/reference project focused on understanding the underlying math and API mechanics, not production-ready code.