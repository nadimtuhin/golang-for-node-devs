# 🐹 Go for Node.js Developers Masterclass Studio

> An interactive, visual learning platform and live playground tailored specifically for JavaScript and Node.js developers making the leap to Go.

[![Go Version](https://img.shields.io/badge/Go-1.23+-00ADD8?style=flat&logo=go)](https://golang.org)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=flat&logo=vercel)](https://golang-for-node-devs.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## 🌐 Live Interactive Studio

> **Try it live in your browser right now:**  
> 👉 [**https://golang-for-node-devs.vercel.app**](https://golang-for-node-devs.vercel.app)

---

## 🌟 Overview

Transitioning from dynamic, single-threaded, npm-heavy JavaScript to statically-typed, compiled, concurrent Go can feel jarring. **Go for Node.js Developers Studio** bridges that gap by directly mapping every Go concept to its Node.js equivalent — with side-by-side code comparisons, architectural SVG diagrams, interview questions, known footguns, production Docker recipes, LeetCode solutions, and an interactive in-browser compiler.

Built on real-world microservices architectures, comparing production **Express/Mongoose** implementations with high-throughput **Go Fiber/MongoDB** services.

---

## 🚀 Key Features

- **💻 Interactive 3-Column Studio:**
  - **Column 1:** Chapter Navigation across 56 interactive lessons.
  - **Column 2:** Lesson Briefing with explicit Node.js vs Go comparisons, "Why Go Does This", and architectural rationale.
  - **Column 3:** Live CodeMirror Go Editor connected to the Go Playground compilation API with a real-time output terminal.
- **📂 Real-World Microservice Architecture:** Full side-by-side comparison of an Express/Mongoose microservice re-architected in Go Fiber, including MongoDB client singletons with `sync.Once`, and `package.json` vs `go.mod`.
- **🐳 Production Docker Recipes:** Ready-to-deploy multi-stage Dockerfiles:
  - **Google Distroless (< 15MB)** with non-root user, CA certs, and tzdata.
  - **Ultra-Minimal Scratch (~6MB)** for the absolute smallest attack surface.
  - Comprehensive comparison against 200MB+ Node.js container bloat.
- **🧩 LeetCode Easy in Go:** Classic data structures and algorithms (Two Sum, Valid Parentheses, Merge Lists, Buy/Sell Stock, Palindrome, Reverse Linked List, Kadane's Max Subarray) solved with zero-allocation Go patterns vs JS objects.
- **📦 Dependency Deep-Dive:** `go.mod` & `go.sum` vs `package.json` & `package-lock.json` (why Go has no centralized registry or 500MB `node_modules`).
- **🧠 Go Philosophy & Zen of Go:** The 10 Go Proverbs analyzed for JS developers, plus a detailed breakdown of *"What Go Deliberately Left Out (and WHY)"*.
- **🎯 Senior Backend Interview Q&A:** High-frequency interview questions with mental models, deep technical explanations, and pro-tips (Escape Analysis, Nil Interface traps, Tri-color GC vs V8, Goroutine leaks).
- **⚠️ Known Pitfalls & Footguns:** The top 8 gotchas where JS intuition fails (loop variable closure captures, sub-slice memory retention, concurrent map read/write crashes, `defer` inside loops).
- **🛠️ Troubleshooting & Diagnostics:** Step-by-step playbooks for deadlocks, hunting race conditions with `go test -race`, and CPU/memory profiling with `net/http/pprof`.
- **📖 Rosetta Code Cheatsheet:** Quick lookup table for common syntax, error handling patterns, and data structures.

---

## 🐳 Production Go Dockerfile (Google Distroless)

```dockerfile
# Stage 1: Build the static Linux binary
FROM golang:1.23-alpine AS builder
RUN apk --no-cache add ca-certificates git
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
    -ldflags="-s -w -X main.Version=1.0.0" \
    -trimpath \
    -o /app/server ./cmd/main.go

# Stage 2: Final minimal non-root runtime (< 15MB)
FROM gcr.io/distroless/static-debian12:nonroot
WORKDIR /app
COPY --from=builder /app/server /app/server
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/app/server"]
```

---

## 🗺️ Curriculum Structure (56 Lessons)

```text
├── ⭐ Featured: Fullstack Microservice (Fiber + Mongo)
│   ├── Express API vs Fiber Web Server
│   └── MongoDB Client Singleton & sync.Once
├── Part 0: Go Language Fundamentals (B1 - B12)
│   ├── Variables, := & Zero Values
│   ├── Functions & Multiple Returns
│   ├── Structs & Receiver Methods (No 'this')
│   ├── Interfaces & Duck Typing
│   ├── Loops, If & Switch Expressions
│   ├── Packages & Capital Exports
│   ├── Pointers (*T & &T) & Pass-By-Value
│   ├── Type Assertions & Type Switches
│   ├── Enums with iota Pattern
│   ├── Struct Embedding (Composition over Inheritance)
│   ├── Defer, Panic & Recover
│   └── Generics in Go 1.18+ (Type Parameters)
├── Part 1: Web APIs & Networking (01 - 06)
│   ├── Express API vs net/http
│   ├── Express Middleware vs Handler Wrappers
│   ├── axios / fetch Client in Go
│   ├── JSON & Struct Tags
│   ├── fs Streams vs io.Reader
│   └── process.env & Config
├── Part 2: Data Structures & Algorithms (07 - 14, DS1 - DS6)
│   ├── Array.map() in Go
│   ├── Array.filter() in Go
│   ├── Array.reduce() in Go
│   ├── Array.sort() (slices.Sort & SortFunc)
│   ├── push/pop/splice vs append & slicing
│   ├── Primitive Types & Memory Footprint (int64, runes)
│   ├── Objects & Set vs map[K]V and map[K]struct{}
│   ├── Pointers Demystified
│   ├── DS1: Slice Header (Len, Cap & Pointer)
│   ├── DS2: Map Internals & Randomized Iteration
│   ├── DS3: Struct Memory Alignment & Padding
│   ├── DS4: FIFO Queue (Avoiding O(N) shift())
│   ├── DS5: Priority Queue with container/heap
│   └── DS6: Zero-Allocation Pools (sync.Pool)
├── Part 3: Databases & ORMs (15 - 18)
│   ├── pg.Pool vs database/sql Pool
│   ├── Query Types: Exec vs QueryRow vs Query
│   ├── ACID Transactions (db.BeginTx)
│   └── Prisma & TypeORM vs GORM & sqlc
├── Part 4: Queues & BullMQ (19 - 20)
│   ├── BullMQ vs Go Channel Worker Queue
│   └── BullMQ Retries & Dead-Letter Queue
├── Part 5: Concurrency, Async & Errors (21 - 24)
│   ├── Promise.all vs sync.WaitGroup
│   ├── Promise.race vs select Statement
│   ├── AbortController vs context.Context
│   └── Error Wrapping & errors.Is / As
├── Part 6: Go Philosophy in Practice (P1 - P5)
│   ├── "Clear is Better Than Clever"
│   ├── "A Little Copying > A Little Dependency"
│   ├── "Errors are Values" (No Exceptions)
│   ├── "Share Memory by Communicating" (CSP)
│   └── "Make the Zero Value Useful"
└── Part 7: LeetCode Easy in Go (JS vs Go) (LC1 - LC53)
    ├── LC1: Two Sum (#1) — Hash Map Lookup
    ├── LC20: Valid Parentheses (#20) — Slice Stack
    ├── LC21: Merge Two Sorted Lists (#21) — Dummy Pointers
    ├── LC121: Best Time to Buy/Sell Stock (#121) — Greedy One-Pass
    ├── LC125: Valid Palindrome (#125) — Runes & Two Pointers
    ├── LC206: Reverse Linked List (#206) — Pointer Flipping
    └── LC53: Maximum Subarray (#53) — Kadane's Algorithm
```

---

## ⚡ Quickstart

### Running Locally
No build step or dependencies required! Simply open `index.html` in your browser:

```bash
# Clone the repository
git clone https://github.com/nadimtuhin/golang-for-node-devs.git
cd golang-for-node-devs

# Open in browser directly
open index.html

# Or serve via simple HTTP server
npx serve .
# Or Python
python3 -m http.server 3000
```

---

## 🏗️ Architecture: Node.js vs Go

| Concern | Node.js / JavaScript | Go (Golang) |
| :--- | :--- | :--- |
| **Execution Model** | Single-threaded Event Loop (libuv) | M:N Work-Stealing Scheduler |
| **Concurrency Primitive** | Promises, `async/await`, Web Workers | Goroutines (2 KB stack), Channels, `select` |
| **Parallelism** | Worker threads or Cluster module | Native multicore hardware parallelism |
| **Memory Management** | Generational GC (V8 Scavenger/Mark-Sweep) | Low-latency Tri-Color Mark-Sweep (<0.5ms pause) |
| **Type System** | Dynamic (or compile-time TypeScript) | Static, compiled, strict (no implicit casts) |
| **OOP Model** | Prototypal / `class ... extends` | Struct embedding & implicit interfaces |
| **Error Handling** | `try / catch` & Promise rejections | Explicit error values: `val, err := fn()` |
| **Deployment** | `node_modules` + runtime engine | Single static compiled binary (0 dependencies) |
| **Docker Image Size** | 180MB – 1.2GB | **5MB – 18MB** (Distroless / Scratch) |

---

## 🤝 Contributing

Contributions, additional lessons, and architectural clarifications are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewLesson`)
3. Commit your Changes (`git commit -m 'Add new lesson'`)
4. Push to the Branch (`git push origin feature/NewLesson`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
