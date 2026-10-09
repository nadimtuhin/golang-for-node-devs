# 🐹 Go for Node.js Developers Masterclass Studio

> An interactive, visual learning platform and live playground tailored specifically for JavaScript and Node.js developers making the leap to Go.

[![Go Version](https://img.shields.io/badge/Go-1.22+-00ADD8?style=flat&logo=go)](https://golang.org)
[![Node.js Compatibility](https://img.shields.io/badge/Node.js-Mental%20Model-5FA04E?style=flat&logo=node.js)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Overview

Transitioning from dynamic, single-threaded, npm-heavy JavaScript to statically-typed, compiled, concurrent Go can feel jarring. **Go for Node.js Developers Studio** bridges that gap by directly mapping every Go concept to its Node.js equivalent — with side-by-side code comparisons, architectural SVG diagrams, interview questions, known footguns, and an interactive in-browser compiler.

Based on real-world microservices architectures and TomDoesTech's popular *"Intro to Go for Node.js Developers"* project.

---

## 🚀 Key Features

- **💻 Interactive 3-Column Studio:**
  - **Column 1:** Chapter Navigation across 49 interactive lessons.
  - **Column 2:** Lesson Briefing with explicit Node.js vs Go comparisons, "Why Go Does This", and architectural rationale.
  - **Column 3:** Live CodeMirror Go Editor connected to the Go Playground compilation API with a real-time output terminal.
- **📂 TomDoesTech Project Explorer:** Full side-by-side repo comparison of `Express` vs `Fiber`, `MongoDB` client singletons with `sync.Once`, and `package.json` vs `go.mod`.
- **📦 Dependency Deep-Dive:** `go.mod` & `go.sum` vs `package.json` & `package-lock.json` (why Go has no centralized registry or 500MB `node_modules`).
- **🧠 Go Philosophy & Zen of Go:** The 10 Go Proverbs analyzed for JS developers, plus a detailed breakdown of *"What Go Deliberately Left Out (and WHY)"*.
- **🎯 Senior Backend Interview Q&A:** High-frequency interview questions with mental models, deep technical explanations, and pro-tips (Escape Analysis, Nil Interface traps, Tri-color GC vs V8, Goroutine leaks).
- **⚠️ Known Pitfalls & Footguns:** The top 8 gotchas where JS intuition fails (loop variable closure captures, sub-slice memory retention, concurrent map read/write crashes, `defer` inside loops).
- **🛠️ Troubleshooting & Diagnostics:** Step-by-step playbooks for deadlocks, hunting race conditions with `go test -race`, and CPU/memory profiling with `net/http/pprof`.
- **📖 Rosetta Code Cheatsheet:** Quick lookup table for common syntax, error handling patterns, and data structures.

---

## 🗺️ Curriculum Structure (49 Lessons)

```text
├── ⭐ Featured: TomDoesTech Video Project
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
└── Part 6: Go Philosophy in Practice (P1 - P5)
    ├── "Clear is Better Than Clever"
    ├── "A Little Copying > A Little Dependency"
    ├── "Errors are Values" (No Exceptions)
    ├── "Share Memory by Communicating" (CSP)
    └── "Make the Zero Value Useful"
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

---

## 🤝 Contributing

Contributions, additional lessons, and architectural clarifications are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewLesson`)
3. Commit your Changes (`git commit -m 'Add new lesson on Channels'`)
4. Push to the Branch (`git push origin feature/NewLesson`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
