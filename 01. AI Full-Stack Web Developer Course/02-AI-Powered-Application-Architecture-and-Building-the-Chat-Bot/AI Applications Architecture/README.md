# 🧠 AI Architecture, Model Selection & Advanced Terminology

A practical, restaurant-themed guide to how AI applications actually work — from the LLM "brain" behind the API, to picking the right model, tuning its behavior, and writing prompts that get results.

---

## 📖 Table of Contents

1. [The Anatomy of an AI Application](#1-the-anatomy-of-an-ai-application)
2. [Essential Terminology for AI Architects](#2-essential-terminology-for-ai-architects)
3. [Controlling the Model (The Knobs)](#3-controlling-the-model-the-knobs)
4. [Model Selection Strategy](#4-model-selection-strategy)
5. [Prompt Engineering Strategies](#5-prompt-engineering-strategies)

---

## 1. The Anatomy of an AI Application

> 💡 **Mental model:** Think of an AI app like a **high-end restaurant**. Each technical layer maps to a role in the restaurant.

| Layer | Restaurant Role | What It Actually Does |
|---|---|---|
| 🧑‍🍳 **LLM API** (Inference Layer) | The Chef | The "brain" — models like GPT, Gemini, or Claude. Knows everything, but only responds to what's on the ticket (your prompt). Never sees the customer directly. |
| ⚙️ **Backend** (Orchestrator) | The Waiter | Built with FastAPI / Node.js. Handles prompt engineering, auth & guardrails, and async tasks. Turns messy human requests into clean, structured prompts. |
| 🖥️ **Frontend** (Interface) | The Menu & Table | Where users type and see responses. Doesn't "think" — just streams the chef's output back, token by token. |
| 🗄️ **Database** (Data & Memory) | The Order Logbook | The model has amnesia — it remembers nothing on its own. The backend fetches past history from storage and re-sends it each time. |

**Two flavors of database:**
- **Vector Databases** (Pinecone, ChromaDB) → store data as numerical vectors, enabling **RAG** (Retrieval-Augmented Generation) for real-time external knowledge.
- **Relational Databases** (MySQL, PostgreSQL) → store user profiles, sessions, and chat history.

---

## 2. Essential Terminology for AI Architects

### 🪙 Token
The smallest unit of text a model processes (~¾ of a word in English).
> **Why it matters:** You're billed per token, and tokens define the context window limit.

### 📏 Context Window
How many tokens a model can process in one prompt. Bigger window = more information the model can consider at once.

<details>
<summary>📊 What can 1 million tokens hold?</summary>

- 50,000 lines of code
- All your text messages from the last 5 years
- 8 average-length novels
- 200+ podcast transcripts
- 1 hour of silent video
- ~45 minutes of video with audio
- 9.5 hours of audio

</details>

### ⚖️ Parameters / Weights
The internal numbers a model learns during training — a rough proxy for its size and capability.

| Model Size | Runs On | Best For |
|---|---|---|
| ~7B | A laptop | Simple chatbots, fast tasks |
| 70B+ | Serious infrastructure | Complex reasoning, coding |
| 400B+ | Datacenter-scale | Maximum capability tasks |

### ⚡ Inference & Performance
- **Training** happens once (expensive, up front).
- **Inference** happens on *every* user request — this is where your ongoing costs live.
- **Latency** (speed of one request) vs. **Throughput** (requests handled per second) — you usually optimize for one at the expense of the other.

---

## 3. Controlling the Model (The Knobs)

Every model decision comes down to: **how does it pick the next token?**

| Knob | What It Does | Low Setting | High Setting |
|---|---|---|---|
| 🌡️ **Temperature** | The "boldness" dial (0–2) | Safe, predictable | Creative, varied |
| 🎯 **Top-k** | Limits choices to the *k* most likely next tokens | Narrow, focused (e.g. k=5) | Wide, surprising (e.g. k=50) |
| 🌊 **Top-p** (Nucleus Sampling) | Dynamically picks the smallest set of tokens whose probability adds up to *p* | Narrow when answer is obvious | Expands when many options are viable |

> ⚠️ Top-p and Top-k are usually used as **alternatives**, not together.

### 🎛️ Quick-reference settings

| Task | Temperature | Top-p |
|---|---|---|
| Coding / Factual Q&A | `0.2` (low) | `0.8` |
| Creative Writing | `0.8` (high) | `0.95` |
| General Chat | `0.5` (balanced) | `0.9` |

---

## 4. Model Selection Strategy

> Choosing a model is like choosing a car engine — balance **power, cost, and fuel usage** for the job.

**Five things to weigh:**

1. **Parameter size** — bigger = smarter but slower/pricier.
2. **Context window** — match it to your max expected prompt size (chat vs. long documents vs. huge codebases).
3. **Modality** — text-only vs. multimodal (image/audio/video input).
4. **Capability specialization** — some models excel at coding, others at creative writing or speed/cost efficiency.
5. **Pricing** — usually billed per million tokens.

> 💰 **Common cost strategy:** use cheap, fast models for 80–90% of everyday tasks, and reserve expensive flagship models for rare, high-value queries.

**Proprietary vs. Open-Source:**

| | Proprietary (Option A) | Open-Source (Option B) |
|---|---|---|
| Examples | GPT-4o, Gemini Pro, Claude Sonnet | Llama 3, Mistral, Gemma |
| Setup | API key + `npm install` | Self-hosted, own GPUs |
| Pros | Easy, scalable, capable | Full control & privacy |
| Cons | Ongoing usage cost | You manage the infrastructure |
| Best for | Students & most startups | Teams needing full control |

---

## 5. Prompt Engineering Strategies

A **prompt** is the instruction that steers the model's behavior. There are three core structures:

| Type | Best For | Example |
|---|---|---|
| **Direct instructions** | Clear, straightforward tasks | *"Write a poem about nature."* |
| **Open-ended instructions** | Brainstorming, exploration | *"Tell me about the universe."* |
| **Task-specific instructions** | Precise, goal-oriented work | *"Translate this text into French: 'Hello.'"* |

### 🔑 Key Techniques

- **Zero-shot** — ask directly, no examples given; model relies purely on pretrained knowledge.
- **Few-shot** — give a couple of examples first so the model mirrors the tone/format.
- **Chain of Thought (CoT)** — break the task into explicit steps so the model reasons before concluding.

### System Prompt vs. User Prompt

| | Role | Example |
|---|---|---|
| **System Prompt** | Sets personality & rules | *"You are a helpful Python tutor who explains concepts with analogies."* |
| **User Prompt** | The actual request | *"Explain what a decorator is."* |

> 🧩 **Pro tip:** Use the system prompt to lock in consistent tone, guardrails, and error handling across an entire conversation or app.

---

## ✅ TL;DR

- The **API is the chef**, the **backend is the waiter**, the **frontend is the menu**, and the **database is the order log**.
- **Tokens** drive cost and memory limits; **parameters** drive capability and speed.
- **Temperature / Top-k / Top-p** shape how creative or predictable outputs are.
- Pick a model by weighing **size, context window, modality, specialization, and price**.
- Structure prompts deliberately — **zero-shot, few-shot, and chain-of-thought** each unlock different levels of reasoning quality.