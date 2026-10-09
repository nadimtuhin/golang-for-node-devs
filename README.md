# 🐹 Go for Node.js Developers Masterclass Studio

> An interactive, visual learning platform and live playground tailored specifically for JavaScript and Node.js developers making the leap to Go. Powered by **Astro 5** & TypeScript.

[![Go Version](https://img.shields.io/badge/Go-1.23+-00ADD8?style=flat&logo=go)](https://golang.org)
[![Astro Version](https://img.shields.io/badge/Astro-5.0+-FF5D01?style=flat&logo=astro)](https://astro.build)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=flat&logo=vercel)](https://golang-for-node-devs.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## 🌐 Live Interactive Studio

> **Try it live in your browser right now:**  
> 👉 [**https://golang-for-node-devs.vercel.app**](https://golang-for-node-devs.vercel.app)

---

## 🌟 Overview

Transitioning from dynamic, single-threaded, npm-heavy JavaScript to statically-typed, compiled, concurrent Go can feel jarring. **Go for Node.js Developers Studio** bridges that gap by directly mapping every Go concept to its Node.js equivalent — with side-by-side code comparisons, architectural SVG diagrams, interview questions, known footguns, production Docker recipes, LeetCode solutions, and an interactive in-browser compiler.

Built with **Astro 5** for lightning-fast zero-JS static generation, modular components, and seamless developer ergonomics.

---

## 🚀 Key Features

- **💻 Interactive 3-Column Studio:**
  - **Column 1:** Chapter Navigation across 56 interactive lessons with live instant search (`⌘+K`).
  - **Column 2:** Lesson Briefing with explicit Node.js vs Go comparisons, "Why Go Does This", and architectural rationale.
  - **Column 3:** Live CodeMirror Go Editor connected to the Go Playground compilation API with a real-time output terminal (`⌘+⏎`).
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

## 🏗️ Project Structure (Astro Architecture)

```text
├── astro.config.mjs          # Astro configuration (static output)
├── package.json              # Astro 5 + TypeScript scripts
├── src/
│   ├── components/
│   │   ├── Header.astro      # Navigation bar with pill toggles
│   │   ├── Sidebar.astro     # Lessons directory with live instant filter
│   │   ├── LessonDetail.astro# Middle briefing card with copy & nav
│   │   ├── Playground.astro  # CodeMirror editor & telemetry terminal
│   │   └── views/            # Full-page deep-dive views
│   │       ├── DockerView.astro
│   │       ├── LeetcodeView.astro
│   │       ├── InterviewsView.astro
│   │       ├── PitfallsView.astro
│   │       ├── TroubleshootingView.astro
│   │       ├── PhilosophyView.astro
│   │       ├── RepoExplorer.astro
│   │       ├── ModExplainView.astro
│   │       └── CheatsheetView.astro
│   ├── data/
│   │   └── chapters.ts       # 56 strongly-typed lessons and code samples
│   ├── layouts/
│   │   └── Layout.astro      # Master layout with Google Fonts & CodeMirror
│   ├── pages/
│   │   └── index.astro       # Main entry page assembling the studio
│   └── styles/
│       └── global.css        # Clean design tokens, typography & layout styles
```

---

## ⚡ Quickstart

```bash
# Clone the repository
git clone https://github.com/nadimtuhin/golang-for-node-devs.git
cd golang-for-node-devs

# Install dependencies
pnpm install
# Or npm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

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
