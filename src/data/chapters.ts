export interface Chapter {
  num: string;
  part: string;
  title: string;
  desc: string;
  nodeCode: string;
  why: string;
  code: string;
}

export const chaptersData: Record<string, Chapter> = {
      // PART 0: LANGUAGE FUNDAMENTALS
      basic_vars: {
        num: "B1",
        part: "Part 0: Language Basics",
        title: "Variables, := & Zero Values",
        desc: "In JS, variables can start undefined and change types at runtime. In Go, every variable has a static type and a default 'Zero Value' (0, \"\", false, or nil). The := operator automatically infers types.",
        nodeCode: "let name = 'Gopher'; let count = 0; let active = false;",
        why: "Zero values eliminate 'Cannot read properties of undefined' crashes. Variables in Go are never in an uninitialized state.",
        code: `package main

import "fmt"

func main() {
	// 1. Short declaration (:=) infers the type automatically
	name := "Gopher"
	age := 15
	isEngineer := true

	fmt.Printf("User: %s | Age: %d | Engineer: %t\\n\\n", name, age, isEngineer)

	// 2. Zero Values (no undefined or NaN in Go!)
	var defaultNumber int
	var defaultString string
	var defaultBool bool
	var defaultPointer *string

	fmt.Println("--- Guaranteed Zero Values in Go ---")
	fmt.Printf("int:     %d\\n", defaultNumber)
	fmt.Printf("string:  '%s'\\n", defaultString)
	fmt.Printf("bool:    %t\\n", defaultBool)
	fmt.Printf("pointer: %v (Go's null)\\n", defaultPointer)
}`
      },

      basic_funcs: {
        num: "B2",
        part: "Part 0: Language Basics",
        title: "Functions & Multiple Return Values",
        desc: "In JS, functions can only return a single value (so developers wrap { data, error } in objects). Go natively supports returning multiple values, forming the basis of all Go error handling.",
        nodeCode: "// Returning multiple values in Node.js requires object or array wrapping\nfunction divide(dividend, divisor) {\n  if (divisor === 0) {\n    return { result: null, error: new Error('division by zero') };\n  }\n  return { result: dividend / divisor, error: null };\n}\n\nconst { result, error } = divide(10, 2);\nif (error) {\n  console.error('Failed:', error.message);\n} else {\n  console.log('Result:', result);\n}",
        why: "Multiple returns eliminate object wrapping allocations and allow the blank identifier '_' to ignore unneeded return values.",
        code: `package main

import (
	"errors"
	"fmt"
	"strings"
)

func formatName(input string) (string, int) {
	upper := strings.ToUpper(input)
	length := len(input)
	return upper, length // Returning two distinct values
}

func safeDivide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("cannot divide by zero")
	}
	return a / b, nil
}

func main() {
	loud, count := formatName("golang")
	fmt.Printf("Formatted: %s, Length: %d\\n\\n", loud, count)

	shouted, _ := formatName("backend")
	fmt.Println("Only wanted the name:", shouted)

	res, err := safeDivide(10, 2)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Printf("10 / 2 = %.2f\\n", res)
	}
}`
      },

      basic_structs: {
        num: "B3",
        part: "Part 0: Language Basics",
        title: "Structs & Receiver Methods (No 'this')",
        desc: "Go does NOT have ES6 classes or prototype chains. You define data structures using 'struct' and attach methods using explicit 'receiver' parameters, eliminating all JS 'this' binding bugs.",
        nodeCode: "class User { constructor(name) { this.name = name; } greet() { return 'Hi ' + this.name; } }",
        why: "In JS, losing 'this' context in callbacks or arrow functions is a chronic source of bugs. In Go, the receiver (d Developer) is passed explicitly as an argument.",
        code: `package main

import "fmt"

type Developer struct {
	Name      string
	Language  string
	YearsExp  int
}

// Receiver method attached to Developer
// (d Developer) is the explicit receiver - NO elusive 'this' keyword!
func (d Developer) Introduce() string {
	return fmt.Sprintf("Hi, I'm %s, coding %s for %d years! 🚀", d.Name, d.Language, d.YearsExp)
}

func (d *Developer) LevelUp() {
	d.YearsExp++
}

func main() {
	dev := Developer{
		Name:     "Nadim",
		Language: "Go & Node.js",
		YearsExp: 5,
	}

	fmt.Println(dev.Introduce())
	dev.LevelUp()
	fmt.Printf("After LevelUp: %d years of experience\\n", dev.YearsExp)
}`
      },

      basic_interfaces: {
        num: "B4",
        part: "Part 0: Language Basics",
        title: "Interfaces & Implicit Duck Typing",
        desc: "In TypeScript, you write 'implements MyInterface'. In Go, interfaces are satisfied IMPLICITLY: if a struct has the required methods, it automatically implements the interface with zero boilerplate.",
        nodeCode: "interface Greeter { greet(): string; } class Bot implements Greeter { ... }",
        why: "Implicit interfaces let packages define abstractions without depending on external implementations. If it walks like a duck and quacks like a duck, it's a duck!",
        code: `package main

import "fmt"

type Greeter interface {
	Greet() string
}

type Human struct {
	Name string
}
func (h Human) Greet() string {
	return "Hello! I am " + h.Name
}

type Robot struct {
	Model string
}
func (r Robot) Greet() string {
	return "BEEP BOOP: " + r.Model
}

func Welcome(g Greeter) {
	fmt.Println(g.Greet())
}

func main() {
	h := Human{Name: "Alice"}
	r := Robot{Model: "R2-D2"}

	Welcome(h)
	Welcome(r)
}`
      },

      basic_flow: {
        num: "B5",
        part: "Part 0: Language Basics",
        title: "Loops, If & Switch Expressions",
        desc: "Go simplified control flow: there is only ONE looping keyword ('for'). 'while' and 'do-while' were removed. 'if' statements can declare variables inline, and 'switch' does not require break statements.",
        nodeCode: "for (let i=0; i<3; i++); while(cond); switch(x) { case 1: break; }",
        why: "No forgotten 'break' statements in switch blocks causing accidental fallthrough bugs. Single loop syntax simplifies codebases.",
        code: `package main

import "fmt"

func main() {
	fmt.Print("Standard loop: ")
	for i := 1; i <= 3; i++ {
		fmt.Printf("%d ", i)
	}
	fmt.Println()

	count := 3
	fmt.Print("While-style loop: ")
	for count > 0 {
		fmt.Printf("%d ", count)
		count--
	}
	fmt.Println()

	if status := 200; status >= 200 && status < 300 {
		fmt.Printf("HTTP Success (status %d)\\n", status)
	}

	role := "admin"
	switch role {
	case "admin":
		fmt.Println("Role: Full Access")
	case "editor":
		fmt.Println("Role: Edit Content")
	default:
		fmt.Println("Role: Read Only")
	}
}`
      },

      basic_packages: {
        num: "B6",
        part: "Part 0: Language Basics",
        title: "Packages & Capitalization Exports",
        desc: "In Node.js, you use 'module.exports' or 'export default'. In Go, visibility is controlled by CAPITALIZATION: uppercase identifiers are public (exported); lowercase identifiers are private to the package.",
        nodeCode: "export function PublicFunc() {} function privateHelper() {}",
        why: "No need for export keywords. You know immediately whether any function or struct field across any library is public or private just by glancing at the first letter.",
        code: `package main

import "fmt"

type UserAccount struct {
	Username string
	email    string
}

func CalculateReward(points int) int {
	return internalMultiplier(points)
}

func internalMultiplier(p int) int {
	return p * 10
}

func main() {
	fmt.Println("=== Go Capitalization Visibility Rule ===")
	fmt.Println("Capital (Public):    fmt.Println, http.ListenAndServe, json.Marshal")
	fmt.Println("Lowercase (Private): internal functions and unexported struct fields\\n")

	reward := CalculateReward(5)
	fmt.Printf("Calculated reward: %d points\\n", reward)
}`
      },

      // FEATURED VIDEO CHAPTERS
      fiber_api: {
        num: "⭐",
        part: "Featured: Video Project",
        title: "Express vs Fiber (Video Project)",
        desc: "Express.js is re-architected in Go using Fiber (github.com/gofiber/fiber/v2). Fiber provides an Express-like routing API (app.Get, app.Post, c.JSON) while leveraging the zero-allocation fasthttp engine.",
        nodeCode: "app.post('/api/products', createProduct); app.get('/api/products', getProducts);",
        why: "Fiber is built on Fasthttp, the fastest HTTP engine in Go. It keeps Express-style routing while executing at 10x-20x the throughput of Node with minimal memory!",
        code: `package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"time"
)

// In this production microservice, the Product struct uses multi-tags:
// json:"_id" bson:"_id" validate:"required"
type Product struct {
	ID        string    \`json:"_id"\`
	Title     string    \`json:"title"\`
	CreatedAt time.Time \`json:"createdAt"\`
	UpdatedAt time.Time \`json:"updatedAt"\`
}

// Simulated in-memory store matching the video's MongoDB collection
var productsDB = []Product{
	{ID: "prod_1", Title: "Mechanical Keyboard", CreatedAt: time.Now(), UpdatedAt: time.Now()},
	{ID: "prod_2", Title: "Ultrawide Monitor", CreatedAt: time.Now(), UpdatedAt: time.Now()},
}

// Fiber / Express style Handler:
func GetAllProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(productsDB)
}

func CreateProduct(w http.ResponseWriter, r *http.Request) {
	var newProd Product
	if err := json.NewDecoder(r.Body).Decode(&newProd); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	newProd.ID = fmt.Sprintf("prod_%d", len(productsDB)+1)
	newProd.CreatedAt = time.Now()
	newProd.UpdatedAt = time.Now()
	productsDB = append(productsDB, newProd)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newProd)
}

func main() {
	fmt.Println("=== Express vs Fiber Production Microservice Comparison ===")
	fmt.Println("Node: app.get('/api/products', getProducts)")
	fmt.Println("Go:   app.Get('/api/products', handlers.GetAllProducts)\\n")

	// Test GET products
	req := httptest.NewRequest("GET", "/api/products", nil)
	rec := httptest.NewRecorder()
	GetAllProducts(rec, req)

	fmt.Printf("HTTP Status: %d %s\\n", rec.Code, http.StatusText(rec.Code))
	fmt.Println("Response Body:")
	fmt.Println(rec.Body.String())
}`
      },

      mongo_singleton: {
        num: "⭐",
        part: "Featured: Video Project",
        title: "MongoDB Client & sync.Once",
        desc: "In the video, Tom builds internal/db/db.go using sync.Once to create a thread-safe singleton MongoDB connection pool. Every Goroutine reuses this client safely.",
        nodeCode: "const client = new MongoClient(URI); await client.connect();",
        why: "sync.Once guarantees that the connection handshake runs only once even if 1,000 incoming requests hit the server concurrently on startup.",
        code: `package main

import (
	"fmt"
	"sync"
	"time"
)

// Production Mongo singleton pattern with sync.Once (internal/db/db.go):
type MongoClient struct {
	URI       string
	Database  string
	Connected bool
}

var (
	clientInstance *MongoClient
	mongoOnce      sync.Once
)

const (
	Database           = "products-api"
	ProductsCollection = "products"
)

func GetMongoClient() *MongoClient {
	mongoOnce.Do(func() {
		fmt.Println("⚡ [sync.Once] Connecting to MongoDB (Handshake running only once!)...")
		time.Sleep(50 * time.Millisecond) // Simulate connection delay
		clientInstance = &MongoClient{
			URI:       "mongodb://localhost:27017",
			Database:  Database,
			Connected: true,
		}
	})
	return clientInstance
}

func main() {
	var wg sync.WaitGroup

	fmt.Println("--- Simulating 5 Concurrent Handlers Calling GetMongoClient() ---")
	for i := 1; i <= 5; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			client := GetMongoClient()
			fmt.Printf("✓ Handler %d obtained Mongo Client for db '%s' (Connected: %t)\\n", id, client.Database, client.Connected)
		}(i)
	}

	wg.Wait()
	fmt.Println("\\n✓ Notice the connection handshake executed exactly ONCE across all callers!")
}`
      },

      // PART 1
      http_api: {
        num: "01",
        part: "Part 1: Web APIs",
        title: "Express API vs net/http",
        desc: "In Node, you install Express to handle routes and serialize JSON. In Go, an ultra-fast production HTTP server with routing and JSON serialization is built right into the standard library with zero external dependencies.",
        nodeCode: "app.get('/api/users', (req, res) => res.json({ id: 1, name: 'Alice' }))",
        why: "Go's net/http package is production-grade out of the box. Cloudflare, Google, and Docker run massive workloads directly on it without requiring external frameworks.",
        code: `package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
)

type UserResponse struct {
	ID   int    \`json:"id"\`
	Name string \`json:"name"\`
	Role string \`json:"role"\`
}

func usersHandler(w http.ResponseWriter, r *http.Request) {
	user := UserResponse{ID: 1, Name: "Alice", Role: "Admin"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

func main() {
	req := httptest.NewRequest("GET", "/api/users", nil)
	recorder := httptest.NewRecorder()
	usersHandler(recorder, req)

	resp := recorder.Result()
	fmt.Printf("Status: %d %s\\n", resp.StatusCode, http.StatusText(resp.StatusCode))
	fmt.Printf("Content-Type: %s\\n", resp.Header.Get("Content-Type"))
	fmt.Println("Body:", recorder.Body.String())
}`
      },

      middleware: {
        num: "02",
        part: "Part 1: Web APIs",
        title: "Express Middleware vs Handler Wrappers",
        desc: "Express middleware like (req, res, next) => { ... next() } translates to standard wrapper functions in Go (decorator pattern).",
        nodeCode: "import express from 'express';\nconst app = express();\n\n// Express logging & timing middleware\napp.use((req, res, next) => {\n  const start = Date.now();\n  console.log(`--> ${req.method} ${req.url}`);\n  \n  res.on('finish', () => {\n    const duration = Date.now() - start;\n    console.log(`<-- ${res.statusCode} (${duration}ms)`);\n  });\n\n  next();\n});",
        why: "Go doesn't mutate request objects behind the scenes like Express does. Middleware simply wraps the http.HandlerFunc interface cleanly.",
        code: `package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"time"
)

func LoggerMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		fmt.Printf("[MIDDLEWARE] Incoming %s request to %s\\n", r.Method, r.URL.Path)
		next(w, r)
		fmt.Printf("[MIDDLEWARE] Completed in %v\\n", time.Since(start))
	}
}

func DashboardHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Hello from Dashboard Handler!"))
}

func main() {
	wrapped := LoggerMiddleware(DashboardHandler)
	req := httptest.NewRequest("GET", "/dashboard", nil)
	rec := httptest.NewRecorder()
	wrapped(rec, req)
	fmt.Println("Response Body:", rec.Body.String())
}`
      },

      http_client: {
        num: "03",
        part: "Part 1: Web APIs",
        title: "axios / fetch Client in Go",
        desc: "How to make outbound HTTP requests to microservices with request timeout deadlines, custom headers, and response decoding without axios.",
        nodeCode: "const res = await axios.get('/api/quote', { timeout: 2000 })",
        why: "Go's http.Client includes connection pooling, HTTP/2 support, and context timeouts out-of-the-box.",
        code: `package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"time"
)

type QuoteResponse struct {
	Author string \`json:"author"\`
	Quote  string \`json:"quote"\`
}

func main() {
	mockServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		resp := QuoteResponse{Author: "Rob Pike", Quote: "Simplicity is complicated."}
		json.NewEncoder(w).Encode(resp)
	}))
	defer mockServer.Close()

	client := &http.Client{Timeout: 2 * time.Second}
	req, _ := http.NewRequest("GET", mockServer.URL, nil)
	req.Header.Set("User-Agent", "GoMicroservice/1.0")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println("Request failed:", err)
		return
	}
	defer res.Body.Close()

	var quote QuoteResponse
	json.NewDecoder(res.Body).Decode(&quote)

	fmt.Printf("Status: %d\\n", res.StatusCode)
	fmt.Printf("Quote: \\"%s\\" — %s\\n", quote.Quote, quote.Author)
}`
      },

      json: {
        num: "04",
        part: "Part 1: Web APIs",
        title: "JSON.parse & stringify vs Struct Tags",
        desc: "In Node, JSON parsing is dynamic. In Go, you define a struct with JSON tags (like `json:\"userId\"`) to validate and deserialize strictly.",
        nodeCode: "const data = JSON.parse(str); const text = JSON.stringify(obj);",
        why: "Struct tags prevent schema drift and runtime shape errors by enforcing exact types at compile time.",
        code: `package main

import (
	"encoding/json"
	"fmt"
)

type Task struct {
	ID        int    \`json:"id"\`
	Title     string \`json:"title"\`
	Completed bool   \`json:"completed"\`
}

func main() {
	task := Task{ID: 101, Title: "Master Go Concurrency", Completed: false}
	bytes, _ := json.MarshalIndent(task, "", "  ")
	fmt.Println("--- 1. JSON.stringify Output ---")
	fmt.Println(string(bytes))

	rawJSON := \`{"id": 202, "title": "Deploy Go Microservice", "completed": true}\`
	var incoming Task
	json.Unmarshal([]byte(rawJSON), &incoming)
	fmt.Println("\\n--- 2. JSON.parse Into Typed Struct ---")
	fmt.Printf("Task ID: %d | Title: %s | Done: %t\\n", incoming.ID, incoming.Title, incoming.Completed)
}`
      },

      fs_io: {
        num: "05",
        part: "Part 1: Web APIs",
        title: "fs.createReadStream vs io.Reader",
        desc: "Streaming data in Node uses stream.pipe(). In Go, the universal io.Reader and io.Writer interfaces provide zero-allocation streaming pipelines.",
        nodeCode: "fs.createReadStream('input.txt').pipe(dest);",
        why: "io.Reader and io.Writer are the bedrock of Go. HTTP bodies, files, compression, and network sockets all implement the exact same interface.",
        code: `package main

import (
	"bytes"
	"fmt"
	"io"
	"strings"
)

func main() {
	srcData := "Row 1: User signed in\\nRow 2: Payment processed\\nRow 3: Invoice emailed\\n"
	reader := strings.NewReader(srcData)
	var destinationBuffer bytes.Buffer

	bytesCopied, err := io.Copy(&destinationBuffer, reader)
	if err != nil {
		fmt.Println("Stream error:", err)
		return
	}

	fmt.Printf("Successfully piped %d bytes!\\n\\n", bytesCopied)
	fmt.Print(destinationBuffer.String())
}`
      },

      env_vars: {
        num: "06",
        part: "Part 1: Web APIs",
        title: "process.env vs os.Getenv & Defaults",
        desc: "Reading 12-factor environment variables and providing fallback defaults using Go's built-in os package without needing dotenv.",
        nodeCode: "const port = process.env.PORT || '3000';",
        why: "Go apps are designed to be deployed as stateless containers where all configuration is passed cleanly through environment variables.",
        code: `package main

import (
	"fmt"
	"os"
)

func getEnv(key, fallback string) string {
	val := os.Getenv(key)
	if val == "" {
		return fallback
	}
	return val
}

func main() {
	os.Setenv("APP_NAME", "OrderMicroservice")
	appName := getEnv("APP_NAME", "DefaultApp")
	port := getEnv("PORT", "3000")
	dbHost := getEnv("DATABASE_HOST", "127.0.0.1:5432")

	fmt.Printf("App Name: %s\\n", appName)
	fmt.Printf("Port:     %s\\n", port)
	fmt.Printf("DB Host:  %s\\n", dbHost)
}`
      },

      // PART 2: ARRAYS & TYPES
      slice_map: {
        num: "07",
        part: "Part 2: Arrays & Types",
        title: "Array.map() in Go",
        desc: "In JavaScript, arr.map((x) => x * 2) transforms elements functionally. In Go, you can transform slices with pre-allocated loops or reusable generics.",
        nodeCode: "const doubled = numbers.map(n => n * 2);",
        why: "Pre-allocating slice capacity with make([]int, 0, len(items)) avoids array re-allocations and GC thrashing, running significantly faster than JS array methods.",
        code: `package main

import "fmt"

func Map[T any, R any](items []T, transform func(T) R) []R {
	result := make([]R, len(items))
	for i, item := range items {
		result[i] = transform(item)
	}
	return result
}

func main() {
	numbers := []int{10, 20, 30, 40}

	doubled := make([]int, 0, len(numbers))
	for _, n := range numbers {
		doubled = append(doubled, n*2)
	}
	fmt.Println("1. Standard Go Loop (doubled):", doubled)

	squared := Map(numbers, func(n int) int {
		return n * n
	})
	fmt.Println("2. Generic Map (squared):      ", squared)
}`
      },

      slice_filter: {
        num: "08",
        part: "Part 2: Arrays & Types",
        title: "Array.filter() in Go",
        desc: "In JS, arr.filter((x) => x > 10) selects matching elements. In Go, you filter into a new slice using a range loop or a generic Filter function.",
        nodeCode: "const evens = numbers.filter(n => n % 2 === 0);",
        why: "Go gives you full control over slice memory allocation without creating intermediate closures or generator wrappers.",
        code: `package main

import "fmt"

type Product struct {
	Name    string
	Price   float64
	InStock bool
}

func Filter[T any](items []T, predicate func(T) bool) []T {
	result := make([]T, 0)
	for _, item := range items {
		if predicate(item) {
			result = append(result, item)
		}
	}
	return result
}

func main() {
	products := []Product{
		{Name: "Laptop", Price: 1200.0, InStock: true},
		{Name: "Mouse", Price: 25.0, InStock: false},
		{Name: "Keyboard", Price: 85.0, InStock: true},
	}

	inStock := Filter(products, func(p Product) bool { return p.InStock })
	fmt.Println("--- In-Stock Products ---")
	for _, p := range inStock {
		fmt.Printf("✓ %s ($%.2f)\\n", p.Name, p.Price)
	}
}`
      },

      slice_reduce: {
        num: "09",
        part: "Part 2: Arrays & Types",
        title: "Array.reduce() in Go",
        desc: "In JS, arr.reduce((acc, curr) => acc + curr, 0) aggregates an array into a single value. In Go, an explicit loop or generic Reduce function achieves the same result.",
        nodeCode: "const total = cart.reduce((sum, item) => sum + item.price, 0);",
        why: "Explicit loops in Go are easier to debug, have zero allocation overhead, and avoid complex accumulator callback binding.",
        code: `package main

import "fmt"

func main() {
	prices := []float64{19.99, 49.50, 5.00, 120.00}
	var sum float64
	for _, p := range prices {
		sum += p
	}
	fmt.Printf("1. Total Sum via Loop: $%.2f\\n", sum)

	words := []string{"apple", "banana", "apple", "cherry", "banana"}
	counts := make(map[string]int)
	for _, w := range words {
		counts[w]++
	}
	fmt.Println("2. Word Frequency Map (reduce to object):", counts)
}`
      },

      slice_sort: {
        num: "10",
        part: "Part 2: Arrays & Types",
        title: "Array.sort() (slices.Sort & SortFunc)",
        desc: "In JS, array.sort((a,b) => a - b) sorts in place. In Go 1.21+, the standard library 'slices' package provides high-performance Sort and SortFunc.",
        nodeCode: "users.sort((a, b) => b.score - a.score); // descending",
        why: "Go uses pdqsort (Pattern-Defeating Quicksort), combining the speed of quicksort with the worst-case guarantees of heapsort and insertion sort for small slices.",
        code: `package main

import (
	"cmp"
	"fmt"
	"slices"
)

type User struct {
	Name  string
	Score int
}

func main() {
	scores := []int{45, 12, 85, 32, 89, 21}
	slices.Sort(scores)
	fmt.Println("1. Sorted Numbers:", scores)

	users := []User{
		{Name: "Alice", Score: 88},
		{Name: "Bob", Score: 95},
		{Name: "Charlie", Score: 72},
	}
	slices.SortFunc(users, func(a, b User) int {
		return cmp.Compare(b.Score, a.Score)
	})

	fmt.Println("\\n2. Leaderboard Sorted by Score (Descending):")
	for i, u := range users {
		fmt.Printf("   #%d %s - %d pts\\n", i+1, u.Name, u.Score)
	}
}`
      },

      slice_ops: {
        num: "11",
        part: "Part 2: Arrays & Types",
        title: "push/pop/splice vs Go append & slices",
        desc: "In JS: push(), pop(), shift(), unshift(), and splice(). In Go, the append() built-in and slice re-slicing handle all dynamic array modifications.",
        nodeCode: "arr.push(4); const last = arr.pop(); arr.splice(1, 1);",
        why: "Go slices are a lightweight 3-word view (pointer, length, capacity) over an underlying array. Slicing never copies memory unless you grow beyond capacity.",
        code: `package main

import (
	"fmt"
	"slices"
)

func main() {
	s := []int{10, 20, 30}
	s = append(s, 40) // push
	fmt.Println("1. push(40):     ", s)

	last := s[len(s)-1]
	s = s[:len(s)-1]  // pop
	fmt.Printf("2. pop(): popped %d, left: %v\\n", last, s)

	first := s[0]
	s = s[1:]         // shift
	fmt.Printf("3. shift(): removed %d, left: %v\\n", first, s)

	items := []string{"A", "B", "REMOVE_ME", "C"}
	items = slices.Delete(items, 2, 3) // splice
	fmt.Println("4. splice/delete:", items)
}`
      },

      data_types: {
        num: "12",
        part: "Part 2: Arrays & Types",
        title: "Primitive Types (int64, runes)",
        desc: "JS has number, string, boolean, bigint, symbol, null, undefined. Go has explicit sized integers (int8, int32, int64), floats (float32, float64), byte, and rune (Unicode).",
        nodeCode: "let x = 42; let y = 3.14; let s = 'hello'; typeof x === 'number';",
        why: "In Go, choosing int32 vs int64 or float64 determines exact byte memory layout and CPU cache efficiency.",
        code: `package main

import (
	"fmt"
	"unsafe"
)

func main() {
	var smallNumber int8 = 127
	var largeNumber int64 = 9223372036854775807
	var precise float64 = 3.14159265359
	var b byte = 'A'
	var r rune = '🚀'

	fmt.Printf("int8:    %d  (size: %d byte)\\n", smallNumber, unsafe.Sizeof(smallNumber))
	fmt.Printf("int64:   %d  (size: %d bytes)\\n", largeNumber, unsafe.Sizeof(largeNumber))
	fmt.Printf("float64: %f  (size: %d bytes)\\n", precise, unsafe.Sizeof(precise))
	fmt.Printf("byte:    %c  (ASCII %d)\\n", b, b)
	fmt.Printf("rune:    %c  (Unicode code point: %U)\\n", r, r)
}`
      },

      maps_sets: {
        num: "13",
        part: "Part 2: Arrays & Types",
        title: "Objects & Set vs Go map[K]V",
        desc: "In JS, you use {} or new Map() for key-value pairs and new Set() for unique collections. In Go, maps handle dictionaries, and map[T]struct{} handles memory-efficient Sets.",
        nodeCode: "// Hash maps and sets in JavaScript\nconst userSessions = new Map();\nuserSessions.set('usr_101', { name: 'Alice', active: true });\nuserSessions.set('usr_102', { name: 'Bob', active: false });\n\nconsole.log(userSessions.get('usr_101'));\nconsole.log('Exists:', userSessions.has('usr_102'));\n\n// Unique set of user IDs\nconst activeUserIds = new Set(['usr_101', 'usr_102']);\nactiveUserIds.add('usr_101'); // Duplicate ignored\nconsole.log('Total active:', activeUserIds.size);",
        why: "A Go struct{} (empty struct) takes literally 0 bytes of RAM! map[string]struct{} creates the most memory-efficient Set possible.",
        code: `package main

import "fmt"

func main() {
	roles := map[string]string{"alice": "admin", "bob": "editor"}
	role, exists := roles["alice"]
	fmt.Printf("1. Map lookup 'alice': role=%s, exists=%t\\n", role, exists)

	set := make(map[string]struct{})
	set["golang"] = struct{}{}
	set["nodejs"] = struct{}{}
	set["golang"] = struct{}{} // duplicate ignored

	fmt.Println("2. Set Keys:")
	for tag := range set {
		fmt.Printf("   ✓ %s\\n", tag)
	}
}`
      },

      pointers: {
        num: "14",
        part: "Part 2: Arrays & Types",
        title: "Pointers (*T & &T) Demystified for JS Devs",
        desc: "In JS, primitives pass by value, and objects pass by reference automatically. In Go, you explicitly decide using & (address of) and * (pointer dereference).",
        nodeCode: "// In JS, objects mutate by reference automatically, but primitives cannot!",
        why: "Pointers allow you to modify data without cloning large structs in memory, or use nil to indicate an optional/missing value.",
        code: `package main

import "fmt"

type Profile struct {
	Username  string
	Followers int
}

func incrementByValue(p Profile) { p.Followers += 100 }
func incrementByPointer(p *Profile) { p.Followers += 100 }

func main() {
	user := Profile{Username: "gopher_master", Followers: 50}
	incrementByValue(user)
	fmt.Println("After incrementByValue (No Change):", user)

	incrementByPointer(&user)
	fmt.Println("After incrementByPointer (Updated!):", user)
}`
      },

      // PART 3: DATABASES
      db_pool: {
        num: "15",
        part: "Part 3: Databases & ORMs",
        title: "pg.Pool vs database/sql Pool",
        desc: "In Node, you install pg or pg-pool and configure max connections. In Go, connection pooling is built directly into database/sql.",
        nodeCode: "const pool = new Pool({ max: 25, idleTimeoutMillis: 30000 });",
        why: "In Go, sql.DB is a thread-safe connection pool shared across all Goroutines without PM2 cluster duplication.",
        code: `package main

import (
	"fmt"
	"time"
)

type MockDBPool struct {
	MaxOpenConns int
	MaxIdleConns int
	ConnLifetime time.Duration
}

func (db *MockDBPool) SetMaxOpenConns(n int) { db.MaxOpenConns = n }
func (db *MockDBPool) SetMaxIdleConns(n int) { db.MaxIdleConns = n }
func (db *MockDBPool) SetConnMaxLifetime(d time.Duration) { db.ConnLifetime = d }

func main() {
	db := &MockDBPool{}
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(10)
	db.SetConnMaxLifetime(5 * time.Minute)

	fmt.Printf("Max Open Connections: %d\\n", db.MaxOpenConns)
	fmt.Printf("Max Idle Connections: %d\\n", db.MaxIdleConns)
	fmt.Printf("Max Lifetime:         %v\\n", db.ConnLifetime)
	fmt.Println("\\n✓ In Go, *sql.DB is a thread-safe connection pool shared across all Goroutines!")
}`
      },

      db_queries: {
        num: "16",
        part: "Part 3: Databases & ORMs",
        title: "DB Queries: Exec vs QueryRow vs Query",
        desc: "In Node, pool.query() handles everything dynamically. Go strictly separates queries by return shape: Exec, QueryRow, and Query.",
        nodeCode: "const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);",
        why: "Separating single vs multi-row prevents buffer bloat and memory leaks.",
        code: `package main

import "fmt"

type User struct {
	ID    int
	Email string
}

func main() {
	fmt.Println("1. db.Exec(\\"UPDATE users SET score = ?\\", 100) -> Rows Affected: 1")

	singleUser := User{ID: 42, Email: "alice@company.com"}
	fmt.Printf("2. db.QueryRow -> Scanned: ID=%d, Email=%s\\n\\n", singleUser.ID, singleUser.Email)

	fmt.Println("3. rows, err := db.Query(\\"SELECT id, email FROM users\\")")
	users := []User{{ID: 1, Email: "admin@system.com"}, {ID: 2, Email: "bob@test.com"}}
	for _, u := range users {
		fmt.Printf("   ✓ Row scanned: %+v\\n", u)
	}
}`
      },

      db_tx: {
        num: "17",
        part: "Part 3: Databases & ORMs",
        title: "ACID Transactions (db.BeginTx)",
        desc: "In Node, you use BEGIN / COMMIT or prisma.$transaction(). In Go, db.BeginTx binds queries to an isolated connection, and defer tx.Rollback() ensures guaranteed safety.",
        nodeCode: "await client.query('BEGIN'); ... await client.query('COMMIT');",
        why: "defer tx.Rollback() is a standard safety idiom: if Commit() is called, rollback is a no-op; if an error occurs early, rollback triggers automatically.",
        code: `package main

import (
	"errors"
	"fmt"
)

func transferMoney(from, to string, amount float64) error {
	fmt.Printf("ACID transaction: Transfer $%.2f from %s to %s\\n", amount, from, to)
	if amount > 500 {
		return errors.New("insufficient funds (limit $500)")
	}
	fmt.Printf("1. Deducting $%.2f from %s\\n", amount, from)
	fmt.Printf("2. Crediting $%.2f to %s\\n", amount, to)
	fmt.Println("3. tx.Commit() -> Done!")
	return nil
}

func main() {
	transferMoney("ACC_100", "ACC_200", 250.0)
	fmt.Println()
	if err := transferMoney("ACC_100", "ACC_200", 999.0); err != nil {
		fmt.Println("Transaction Failed & Rolled Back:", err)
	}
}`
      },

      orm_patterns: {
        num: "18",
        part: "Part 3: Databases & ORMs",
        title: "Prisma & TypeORM vs GORM & sqlc",
        desc: "Node developers rely heavily on Prisma or TypeORM. In Go, backend engineers either use GORM (ActiveRecord ORM) or sqlc (generates type-safe Go code from plain SQL files).",
        nodeCode: "const user = await prisma.user.findUnique({ where: { id: 1 } });",
        why: "sqlc is the current industry gold standard in Go: you write pure SQL queries, and the compiler generates zero-reflection, hyper-fast Go structs and methods automatically.",
        code: `package main

import (
	"fmt"
	"time"
)

type Order struct {
	ID        uint      \`json:"id"\`
	Customer  string    \`json:"customer"\`
	Total     float64   \`json:"total"\`
	Status    string    \`json:"status"\`
	CreatedAt time.Time \`json:"createdAt"\`
}

func main() {
	order := Order{ID: 1001, Customer: "Acme Corp", Total: 450.75, Status: "PENDING", CreatedAt: time.Now()}
	fmt.Println("1. GORM: db.Create(&order) OR db.Where(\\"customer = ?\\", \\"Acme Corp\\").First(&order)")
	fmt.Println("2. sqlc: You write schema.sql & query.sql -> sqlc compiles to zero-reflection Go methods!")
	fmt.Printf("\\nLoaded Order Entity: %+v\\n", order)
}`
      },

      // PART 4: QUEUES
      bullmq_basic: {
        num: "19",
        part: "Part 4: Queues & BullMQ",
        title: "BullMQ vs Go Channel Worker Queue",
        desc: "In Node, BullMQ uses Redis to distribute jobs across background workers. In Go, you can build a high-performance in-process worker queue using buffered channels without Redis.",
        nodeCode: "const queue = new Bull('emails'); queue.process(3, async job => sendEmail(job.data));",
        why: "A Go channel queue can process 500,000 jobs/sec in memory using 15MB RAM.",
        code: `package main

import (
	"fmt"
	"sync"
	"time"
)

type EmailJob struct {
	ID      string
	To      string
	Subject string
}

func emailWorker(id int, queue <-chan EmailJob, wg *sync.WaitGroup) {
	defer wg.Done()
	for job := range queue {
		fmt.Printf("[Worker %d] Sending '%s' to %s (Job ID: %s)\\n", id, job.Subject, job.To, job.ID)
		time.Sleep(50 * time.Millisecond)
	}
}

func main() {
	jobQueue := make(chan EmailJob, 10)
	var wg sync.WaitGroup

	for w := 1; w <= 3; w++ {
		wg.Add(1)
		go emailWorker(w, jobQueue, &wg)
	}

	jobQueue <- EmailJob{ID: "J-1", To: "alice@corp.com", Subject: "Welcome to Go!"}
	jobQueue <- EmailJob{ID: "J-2", To: "bob@corp.com", Subject: "Password Reset"}
	close(jobQueue)
	wg.Wait()
	fmt.Println("\\n✓ All BullMQ-style background jobs completed!")
}`
      },

      bullmq_retries: {
        num: "20",
        part: "Part 4: Queues & BullMQ",
        title: "BullMQ Retries & Dead-Letter Queue",
        desc: "In BullMQ, you configure attempts: 3 and backoff: exponential. In Go, you implement retry loops with exponential backoff and forward failed jobs to a DLQ channel.",
        nodeCode: "queue.add('payment', data, { attempts: 3, backoff: { type: 'exponential' } });",
        why: "In Go, retries are transparent and testable without black-box Redis scripts.",
        code: `package main

import (
	"errors"
	"fmt"
	"time"
)

type PaymentJob struct {
	ID       string
	Amount   float64
	Attempts int
}

func processPayment(job *PaymentJob) error {
	job.Attempts++
	fmt.Printf("[Attempt %d] Charging card for job %s...\\n", job.Attempts, job.ID)
	if job.Attempts < 3 {
		return errors.New("gateway timeout (504)")
	}
	return nil
}

func executeWithRetry(job PaymentJob, maxAttempts int, dlq chan<- PaymentJob) {
	backoff := 50 * time.Millisecond
	for job.Attempts < maxAttempts {
		err := processPayment(&job)
		if err == nil {
			fmt.Printf("✓ Job %s succeeded on attempt %d!\\n", job.ID, job.Attempts)
			return
		}
		fmt.Printf("⚠️ Retrying in %v...\\n", backoff)
		time.Sleep(backoff)
		backoff *= 2
	}
	dlq <- job
}

func main() {
	dlq := make(chan PaymentJob, 5)
	job := PaymentJob{ID: "PAY-999", Amount: 149.00}
	executeWithRetry(job, 3, dlq)
}`
      },

      // PART 5: ASYNC & CONCURRENCY
      promise_all: {
        num: "21",
        part: "Part 5: Concurrency & Async",
        title: "Promise.all vs sync.WaitGroup",
        desc: "In Node, Promise.all([p1, p2, p3]) runs promises concurrently on the event loop. In Go, sync.WaitGroup coordinates true multi-core parallel execution across Goroutines.",
        nodeCode: "const results = await Promise.all([fetchDB(), fetchCache(), fetchAPI()]);",
        why: "Node executes async tasks sequentially across I/O ticks on a single core. Go executes them simultaneously on physical multi-core threads.",
        code: `package main

import (
	"fmt"
	"sync"
	"time"
)

func fetchEndpoint(name string, delayMs int, wg *sync.WaitGroup, out chan<- string) {
	defer wg.Done()
	time.Sleep(time.Duration(delayMs) * time.Millisecond)
	out <- fmt.Sprintf("%s data (%dms)", name, delayMs)
}

func main() {
	var wg sync.WaitGroup
	results := make(chan string, 3)

	endpoints := []string{"DB", "Cache", "External API"}
	for _, ep := range endpoints {
		wg.Add(1)
		go fetchEndpoint(ep, 100, &wg, results)
	}

	wg.Wait()
	close(results)

	for res := range results {
		fmt.Println("✓ Received:", res)
	}
}`
      },

      promise_race: {
        num: "22",
        part: "Part 5: Concurrency & Async",
        title: "Promise.race vs select Statement",
        desc: "In Node, Promise.race([fetch(), timeout(100)]) returns the fastest resolving promise. In Go, the select statement multiplexes channel reads natively.",
        nodeCode: "const fastest = await Promise.race([queryPrimary(), queryReplica()]);",
        why: "select is a built-in language keyword designed specifically for racing async streams and cancellation signals without Promise allocations.",
        code: `package main

import (
	"fmt"
	"time"
)

func queryServer(name string, delay time.Duration, ch chan<- string) {
	time.Sleep(delay)
	ch <- fmt.Sprintf("Result from %s (latency %v)", name, delay)
}

func main() {
	primaryCh := make(chan string, 1)
	replicaCh := make(chan string, 1)

	go queryServer("Primary DB", 200*time.Millisecond, primaryCh)
	go queryServer("Read Replica", 60*time.Millisecond, replicaCh)

	select {
	case res := <-primaryCh:
		fmt.Println("🏆 Primary won:", res)
	case res := <-replicaCh:
		fmt.Println("🏆 Read Replica won:", res)
	case <-time.After(150 * time.Millisecond):
		fmt.Println("⏱️ Timeout: Neither responded within 150ms!")
	}
}`
      },

      abort_controller: {
        num: "23",
        part: "Part 5: Concurrency & Async",
        title: "AbortController vs context.Context",
        desc: "In Node 16+, AbortController sends cancellation signals to fetch() and DB drivers. In Go, context.Context is the universal standard across the entire Go ecosystem.",
        nodeCode: "const ac = new AbortController(); fetch(url, { signal: ac.signal }); ac.abort();",
        why: "Go contexts pass deadlines, cancellation signals, and request-scoped metadata across network boundaries and database queries automatically.",
        code: `package main

import (
	"context"
	"fmt"
	"time"
)

func queryWithContext(ctx context.Context) {
	select {
	case <-time.After(250 * time.Millisecond):
		fmt.Println("Query completed successfully!")
	case <-ctx.Done():
		fmt.Println("❌ Query cancelled by context:", ctx.Err())
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()

	fmt.Println("Executing 250ms query with 100ms deadline...")
	queryWithContext(ctx)
}`
      },

      error_wrapping: {
        num: "24",
        part: "Part 5: Concurrency & Async",
        title: "Error Wrapping & errors.Is/As",
        desc: "In Node, nested try/catch loses context unless using err.cause. Go supports native error wrapping with %w and inspection using errors.Is and errors.As.",
        nodeCode: "throw new Error('Failed to checkout', { cause: dbError });",
        why: "Wrapping errors preserves the root cause across architecture layers while attaching domain context.",
        code: `package main

import (
	"errors"
	"fmt"
)

var ErrRecordNotFound = errors.New("record not found in database")

func repositoryLayer() error {
	return ErrRecordNotFound
}

func serviceLayer() error {
	err := repositoryLayer()
	if err != nil {
		return fmt.Errorf("userService: failed to fetch user: %w", err)
	}
	return nil
}

func main() {
	err := serviceLayer()
	fmt.Println("Wrapped Error:", err)

	if errors.Is(err, ErrRecordNotFound) {
		fmt.Println("\\n✓ Verified root cause is ErrRecordNotFound -> Returning 404 to HTTP client!")
	}
}`
      }
    ,
      // ==========================================
      // PART 0 EXPANSIONS: LANGUAGE BASICS DEEP-DIVE
      // ==========================================
      basic_pointers: {
        num: "B7",
        part: "Part 0: Language Basics",
        title: "Pointers (*T & &T) & Pass-By-Value",
        desc: "In JS, primitive values are passed by value and objects are passed by reference. In Go, EVERY argument is passed by value (copied) unless you explicitly pass a pointer using & (address-of) and dereference using *.",
        nodeCode: "const u = { views: 10 }; update(u); // JS always mutates object references",
        why: "Pointers give you explicit control over heap vs stack memory. Value semantics prevent unexpected mutation bugs across goroutines.",
        code: `package main

import "fmt"

type Profile struct {
	Name  string
	Role  string
	Views int
}

// Pass-by-value: p is an independent copy in stack memory
func updateByValue(p Profile) {
	p.Views += 100 // Mutates ONLY the local copy!
}

// Pass-by-pointer: p holds the memory address of the caller's struct
func updateByPointer(p *Profile) {
	p.Views += 100 // Mutates the original struct in caller!
}

func main() {
	user := Profile{Name: "Alex", Role: "Fullstack", Views: 10}
	fmt.Printf("Initial: %+v (Memory Address: %p)\\n", user, &user)

	// 1. Pass by value (Copy)
	updateByValue(user)
	fmt.Printf("After updateByValue:   %+v (Views unchanged!)\\n", user)

	// 2. Pass by pointer (Memory address reference)
	updateByPointer(&user)
	fmt.Printf("After updateByPointer: %+v (Views mutated!)\\n", user)
}`
      },

      basic_type_assertions: {
        num: "B8",
        part: "Part 0: Language Basics",
        title: "Type Assertions & Type Switches",
        desc: "In JS, you use 'typeof x' or 'x instanceof Clazz' on dynamic variables. In Go, when dealing with 'any' (interface{}), you use type assertion 'v.(T)' or type switch 'switch v := x.(type)'.",
        nodeCode: "// Type narrowing in TypeScript / JavaScript\nfunction processValue(val) {\n  if (typeof val === 'string') {\n    // Narrowed to string\n    return val.toUpperCase();\n  } else if (typeof val === 'number') {\n    // Narrowed to number\n    return val.toFixed(2);\n  }\n  return String(val);\n}\n\nconsole.log(processValue('gopher'));\nconsole.log(processValue(42.3456));",
        why: "Type assertions enforce runtime safety while retaining static compiler guarantees. The comma-ok idiom prevents runtime panics.",
        code: `package main

import "fmt"

// Type switch inspects dynamic types held inside any (interface{})
func inspectValue(val any) {
	switch v := val.(type) {
	case string:
		fmt.Printf("String [len=%d]: %q\\n", len(v), v)
	case int:
		fmt.Printf("Integer [doubled]: %d\\n", v*2)
	case []string:
		fmt.Printf("Slice of %d strings: %v\\n", len(v), v)
	default:
		fmt.Printf("Unknown type: %T with value %v\\n", v, v)
	}
}

func main() {
	var payload any = "Payload from WebSocket"

	// 1. Safe Type Assertion with comma-ok idiom
	str, ok := payload.(string)
	if ok {
		fmt.Printf("Safe assertion: %s\\n", str)
	} else {
		fmt.Println("Payload is not a string!")
	}

	// 2. Type Switch (Go's typeof/instanceof pattern)
	fmt.Println("\\n--- Type Switch Inspections ---")
	inspectValue(42)
	inspectValue("Go Backend")
	inspectValue([]string{"Redis", "Postgres", "Kafka"})
}`
      },

      basic_enums: {
        num: "B9",
        part: "Part 0: Language Basics",
        title: "Enums with iota Pattern",
        desc: "TypeScript uses 'enum Status { Pending, Shipped }' or union strings. Go has no enum keyword; instead, it uses typed integer constants with 'iota' and the Stringer interface.",
        nodeCode: "// Enums or frozen object dictionaries in TypeScript/Node.js\nconst OrderStatus = Object.freeze({\n  Pending: 'PENDING',\n  Processing: 'PROCESSING',\n  Shipped: 'SHIPPED',\n  Delivered: 'DELIVERED',\n});\n\nfunction handleOrder(status) {\n  switch (status) {\n    case OrderStatus.Pending:\n      return 'Waiting for payment';\n    case OrderStatus.Shipped:\n      return 'Order on its way';\n    default:\n      return 'Unknown status';\n  }\n}",
        why: "iota creates lightweight, type-safe integer enums with zero memory overhead, while String() provides clean JSON/log stringification.",
        code: `package main

import "fmt"

type OrderStatus int

const (
	StatusPending OrderStatus = iota // 0
	StatusProcessing                 // 1
	StatusShipped                    // 2
	StatusDelivered                  // 3
	StatusCancelled                  // 4
)

// Stringer method: converts enum int to human-readable string
func (s OrderStatus) String() string {
	names := [...]string{"PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"}
	if s < 0 || int(s) >= len(names) {
		return "UNKNOWN"
	}
	return names[s]
}

func main() {
	current := StatusProcessing
	fmt.Printf("Order state: %s (Raw integer: %d)\\n", current, current)

	if current == StatusProcessing {
		fmt.Println("Order is currently packed in warehouse.")
	}

	current = StatusShipped
	fmt.Printf("Updated state: %s (Raw integer: %d)\\n", current, current)
}`
      },

      basic_embedding: {
        num: "B10",
        part: "Part 0: Language Basics",
        title: "Struct Embedding (Composition over Inheritance)",
        desc: "In JS/TS, code reuse uses 'class Admin extends User' with super(). Go deliberately omits classes and inheritance. It uses struct embedding where inner fields and methods are automatically promoted.",
        nodeCode: "class Admin extends User { constructor() { super(); } }",
        why: "Avoids the fragile base class problem. Outer structs can promote inner methods or override them cleanly without virtual dispatch overhead.",
        code: `package main

import "fmt"

type User struct {
	ID    int
	Name  string
	Email string
}

func (u User) Display() string {
	return fmt.Sprintf("User #%d: %s <%s>", u.ID, u.Name, u.Email)
}

// AdminUser embeds User (Composition, no 'extends')
type AdminUser struct {
	User        // Anonymous embedded struct: fields & methods promoted!
	Permissions []string
	Level       int
}

// Shadow / override User's Display method
func (a AdminUser) Display() string {
	return fmt.Sprintf("[ADMIN Level %d] %s", a.Level, a.User.Display())
}

func main() {
	admin := AdminUser{
		User:        User{ID: 101, Name: "Sarah Connor", Email: "sarah@resistance.org"},
		Permissions: []string{"audit_logs", "delete_users"},
		Level:       5,
	}

	// Promoted fields accessed directly
	fmt.Printf("Direct field access: %s (%s)\\n", admin.Name, admin.Email)
	fmt.Printf("Admin custom method: %s\\n", admin.Display())
	fmt.Printf("Original inner method: %s\\n", admin.User.Display())
}`
      },

      basic_defer_panic: {
        num: "B11",
        part: "Part 0: Language Basics",
        title: "Defer, Panic & Recover",
        desc: "In JS, cleanups use 'try { ... } finally { close() }'. In Go, 'defer' schedules cleanups to run immediately when the function returns (LIFO order). 'panic' is reserved for unrecoverable errors.",
        nodeCode: "// Resource cleanup in Node.js using try/finally\nasync function processReport(dbClient) {\n  try {\n    await dbClient.connect();\n    console.log('Processing critical transaction...');\n    throw new Error('Simulated database write error');\n  } catch (err) {\n    console.error('Caught exception:', err.message);\n  } finally {\n    // Cleanup runs no matter what\n    await dbClient.close();\n    console.log('Database connection cleanly closed.');\n  }\n}",
        why: "Defer keeps cleanup logic adjacent to resource allocation (e.g., file opens, mutex locks), preventing memory and descriptor leaks.",
        code: `package main

import "fmt"

func safeDivision(a, b int) (result int, err error) {
	// Defer runs in LIFO order upon function exit, even if panic occurs!
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("safely caught runtime panic: %v", r)
		}
	}()

	fmt.Printf("Attempting division: %d / %d\\n", a, b)
	return a / b, nil
}

func main() {
	fmt.Println("--- 1. LIFO Defer Execution Order ---")
	func() {
		defer fmt.Println("Deferred 1 (Runs LAST)")
		defer fmt.Println("Deferred 2 (Runs SECOND)")
		defer fmt.Println("Deferred 3 (Runs FIRST)")
		fmt.Println("Main function body executing...")
	}()

	fmt.Println("\\n--- 2. Panic and Recover ---")
	res, err := safeDivision(10, 0)
	if err != nil {
		fmt.Printf("Recovered cleanly: %v\\n", err)
	} else {
		fmt.Printf("Result: %d\\n", res)
	}
}`
      },

      basic_generics: {
        num: "B12",
        part: "Part 0: Language Basics",
        title: "Generics in Go (Type Parameters)",
        desc: "TypeScript has rich generics like 'function map<T, R>(arr: T[], fn: (x: T) => R): R[]'. Since Go 1.18, Go supports type parameters '[T any]' with compile-time monomorphization.",
        nodeCode: "function first<T>(items: T[]): T | undefined { return items[0]; }",
        why: "Allows reusable algorithms and data structures without dynamic 'any' casting or runtime reflection overhead.",
        code: `package main

import "fmt"

// Generic Map function works for any slice element T and result type R
func Map[T any, R any](items []T, fn func(T) R) []R {
	result := make([]R, len(items))
	for i, item := range items {
		result[i] = fn(item)
	}
	return result
}

// Generic Key-Value Cache
type SimpleCache[K comparable, V any] struct {
	store map[K]V
}

func NewSimpleCache[K comparable, V any]() *SimpleCache[K, V] {
	return &SimpleCache[K, V]{store: make(map[K]V)}
}

func (c *SimpleCache[K, V]) Set(key K, val V) {
	c.store[key] = val
}

func (c *SimpleCache[K, V]) Get(key K) (V, bool) {
	val, ok := c.store[key]
	return val, ok
}

func main() {
	nums := []int{1, 2, 3, 4, 5}
	doubled := Map(nums, func(n int) int { return n * 2 })
	fmt.Println("Generic mapped ints:", doubled)

	words := []string{"golang", "typescript"}
	lengths := Map(words, func(s string) int { return len(s) })
	fmt.Println("Generic mapped string lengths:", lengths)

	cache := NewSimpleCache[string, int]()
	cache.Set("active_users", 850)
	if v, ok := cache.Get("active_users"); ok {
		fmt.Printf("Cache hit: %d\\n", v)
	}
}`
      },

      // ==========================================
      // PART 2 EXPANSIONS: DATA STRUCTURES DEEP-DIVE
      // ==========================================
      ds_slice_internals: {
        num: "DS1",
        part: "Part 2: Data Structures",
        title: "Slice Header: Len, Cap & Pointer",
        desc: "In JS, arrays are dynamic heap objects managed by V8. In Go, a slice is a 24-byte struct header containing: Pointer to underlying array, Length, and Capacity. Sub-slices share memory!",
        nodeCode: "const arr = [1, 2]; arr.push(3); // V8 reallocates hidden arrays",
        why: "Pre-allocating slice capacity with make([]T, 0, cap) prevents heap re-allocations and improves throughput 5-10x.",
        code: `package main

import "fmt"

func inspectSlice(name string, s []int) {
	fmt.Printf("%-12s -> len: %d, cap: %d, ptr: %p, data: %v\\n", name, len(s), cap(s), s, s)
}

func main() {
	// 1. Initial allocation with make([]T, len, cap)
	s := make([]int, 2, 4)
	s[0] = 10
	s[1] = 20
	inspectSlice("Initial", s)

	// 2. Appending within capacity (no re-allocation, same memory pointer!)
	s = append(s, 30)
	inspectSlice("Append 30", s)

	// 3. Exceeding capacity triggers reallocation: Go allocates new array with 2x capacity!
	s = append(s, 40, 50)
	inspectSlice("Exceeded cap", s)

	// 4. Sub-slicing shares the SAME memory block (zero allocation!)
	sub := s[1:3]
	inspectSlice("sub[1:3]", sub)

	sub[0] = 999 // Mutating sub mutates the underlying slice s!
	fmt.Printf("Original after sub mutation: %v (Shared memory view!)\\n", s)
}`
      },

      ds_map_internals: {
        num: "DS2",
        part: "Part 2: Data Structures",
        title: "Map Buckets & Randomized Iteration",
        desc: "In JS ES6 Map, keys preserve insertion order. In Go, map[K]V iteration order is INTENTIONALLY randomized on every execution by the Go runtime so developers do not rely on hash bucket ordering.",
        nodeCode: "const map = new Map(); // Iterates in exact insertion order",
        why: "Go map iteration randomization prevents subtle bugs where code accidentally assumes hash table ordering.",
        code: `package main

import "fmt"

func main() {
	scores := map[string]int{
		"Alice":   95,
		"Bob":     82,
		"Charlie": 99,
		"Diana":   88,
		"Evan":    74,
	}

	fmt.Println("--- Iteration 1 ---")
	for k, v := range scores {
		fmt.Printf("%s: %d  ", k, v)
	}
	fmt.Println("\\n--- Iteration 2 (Notice the randomized order!) ---")
	for k, v := range scores {
		fmt.Printf("%s: %d  ", k, v)
	}
	fmt.Println()

	// Safe read check with comma-ok idiom
	val, exists := scores["Zoe"]
	fmt.Printf("\\nLooking up 'Zoe': val=%d, exists=%t\\n", val, exists)

	// Zero-memory Set emulation using struct{} (0 bytes allocated per value)
	seenIPs := make(map[string]struct{})
	seenIPs["192.168.1.1"] = struct{}{}
	seenIPs["10.0.0.1"] = struct{}{}

	if _, ok := seenIPs["192.168.1.1"]; ok {
		fmt.Println("IP 192.168.1.1 already processed (zero-byte struct set)")
	}
}`
      },

      ds_struct_memory: {
        num: "DS3",
        part: "Part 2: Data Structures",
        title: "Struct Memory Alignment & Padding",
        desc: "In JS, object property order has zero memory effect. In Go, struct fields sit in contiguous memory aligned to 8-byte boundaries. Reordering struct fields can shrink memory usage by 33%!",
        nodeCode: "const user = { isAdmin: true, age: 30, active: false };",
        why: "Memory alignment impacts CPU cache performance and footprint in high-density in-memory caches.",
        code: `package main

import (
	"fmt"
	"unsafe"
)

// Inefficient field ordering: 8-byte alignment forces padding!
type InefficientUser struct {
	IsAdmin bool   // 1 byte + 7 bytes padding gap
	Age     int64  // 8 bytes
	Active  bool   // 1 byte + 7 bytes padding gap
}

// Optimized field ordering: adjacent small types packed together
type OptimizedUser struct {
	Age     int64  // 8 bytes
	IsAdmin bool   // 1 byte
	Active  bool   // 1 byte + 6 bytes padding gap
}

func main() {
	var ineff InefficientUser
	var opt OptimizedUser

	fmt.Println("=== Struct Memory Alignment in Go ===")
	fmt.Printf("InefficientUser size: %d bytes (due to alignment gaps)\\n", unsafe.Sizeof(ineff))
	fmt.Printf("OptimizedUser size:   %d bytes (same data, packed!)\\n", unsafe.Sizeof(opt))

	saved := float64(unsafe.Sizeof(ineff)-unsafe.Sizeof(opt)) / float64(unsafe.Sizeof(ineff)) * 100
	fmt.Printf("Memory reduction: %.1f%% across in-memory datasets!\\n", saved)
}`
      },

      ds_stacks_queues: {
        num: "DS4",
        part: "Part 2: Data Structures",
        title: "FIFO Queue (Avoiding O(N) shift())",
        desc: "In JS, developers often call array.shift() for FIFO queues. In V8, shift() is an O(N) disaster because all remaining elements must be reindexed. In Go, we use head pointers and amortized compaction for true O(1).",
        nodeCode: "const item = queue.shift(); // O(N) performance cliff in JS!",
        why: "High-throughput messaging queues require deterministic O(1) enqueue and dequeue operations.",
        code: `package main

import (
	"errors"
	"fmt"
)

// Efficient FIFO Queue with head pointer (avoids O(N) shift)
type FIFOQueue[T any] struct {
	items []T
	head  int
}

func (q *FIFOQueue[T]) Enqueue(item T) {
	q.items = append(q.items, item)
}

func (q *FIFOQueue[T]) Dequeue() (T, error) {
	if q.head >= len(q.items) {
		var zero T
		return zero, errors.New("queue is empty")
	}
	item := q.items[q.head]
	q.head++

	// Periodically compact memory when head consumes over half of capacity
	if q.head > 32 && q.head*2 >= len(q.items) {
		q.items = q.items[q.head:]
		q.head = 0
	}
	return item, nil
}

func (q *FIFOQueue[T]) Len() int {
	return len(q.items) - q.head
}

func main() {
	queue := &FIFOQueue[string]{}
	queue.Enqueue("Job #1: Email Receipt")
	queue.Enqueue("Job #2: Process Video")
	queue.Enqueue("Job #3: Generate PDF")

	fmt.Printf("Initial Queue size: %d\\n", queue.Len())

	for queue.Len() > 0 {
		job, _ := queue.Dequeue()
		fmt.Printf("Dequeued: %s (Remaining: %d)\\n", job, queue.Len())
	}
}`
      },

      ds_priority_queue: {
        num: "DS5",
        part: "Part 2: Data Structures",
        title: "Priority Queue with container/heap",
        desc: "In JS, priority queues require 3rd-party npm libraries or O(N log N) array.sort() re-sorts. Go's standard library provides container/heap: an O(log N) binary heap interface.",
        nodeCode: "items.sort((a, b) => b.priority - a.priority); // O(N log N) resort",
        why: "Binary heaps guarantee efficient task scheduling and Dijkstra shortest path routing.",
        code: `package main

import (
	"container/heap"
	"fmt"
)

type Task struct {
	name     string
	priority int // Higher number = higher priority
	index    int
}

type PriorityQueue []*Task

func (pq PriorityQueue) Len() int           { return len(pq) }
func (pq PriorityQueue) Less(i, j int) bool { return pq[i].priority > pq[j].priority } // Max-heap
func (pq PriorityQueue) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].index = i
	pq[j].index = j
}
func (pq *PriorityQueue) Push(x any) {
	n := len(*pq)
	item := x.(*Task)
	item.index = n
	*pq = append(*pq, item)
}
func (pq *PriorityQueue) Pop() any {
	old := *pq
	n := len(old)
	item := old[n-1]
	old[n-1] = nil
	item.index = -1
	*pq = old[0 : n-1]
	return item
}

func main() {
	pq := &PriorityQueue{}
	heap.Init(pq)

	heap.Push(pq, &Task{name: "Low priority analytics", priority: 1})
	heap.Push(pq, &Task{name: "CRITICAL: Database Failover", priority: 100})
	heap.Push(pq, &Task{name: "Medium priority email", priority: 20})
	heap.Push(pq, &Task{name: "URGENT: Payment Processing", priority: 90})

	fmt.Println("--- Processing Tasks by Priority Order ---")
	for pq.Len() > 0 {
		task := heap.Pop(pq).(*Task)
		fmt.Printf("[%3d Priority] %s\\n", task.priority, task.name)
	}
}`
      },

      ds_sync_pool: {
        num: "DS6",
        part: "Part 2: Data Structures",
        title: "Zero-Allocation Pools (sync.Pool)",
        desc: "In JS, allocating thousands of objects per second causes V8 Garbage Collector stop-the-world spikes. In Go, sync.Pool recycles temporary buffers across goroutines with lock-free concurrency.",
        nodeCode: "const buf = Buffer.alloc(1024); // Constant GC allocation pressure",
        why: "sync.Pool is essential for high-throughput HTTP servers and network proxies to eliminate GC pauses.",
        code: `package main

import (
	"bytes"
	"fmt"
	"sync"
)

var bufferPool = sync.Pool{
	New: func() any {
		return new(bytes.Buffer) // Allocate buffer only when pool is empty
	},
}

func formatLogMessage(level, message string) string {
	// 1. Borrow a buffer from the pool (Zero heap allocation!)
	buf := bufferPool.Get().(*bytes.Buffer)
	buf.Reset()
	defer bufferPool.Put(buf) // Return buffer to pool for reuse!

	buf.WriteString("[")
	buf.WriteString(level)
	buf.WriteString("] ")
	buf.WriteString(message)
	return buf.String()
}

func main() {
	fmt.Println("--- Reusing Memory with sync.Pool ---")
	for i := 1; i <= 5; i++ {
		msg := formatLogMessage("INFO", fmt.Sprintf("Processing request #%d without heap churn", i))
		fmt.Println(msg)
	}
	fmt.Println("\\nsync.Pool prevents garbage collection pauses under high concurrency.")
}`
      },

      // ==========================================
      // PART 6: GO PHILOSOPHY IN PRACTICE
      // ==========================================
      philo_clear_over_clever: {
        num: "P1",
        part: "Part 6: Go Philosophy",
        title: "\"Clear is Better Than Clever\"",
        desc: "Go values simple, linear, readable code over clever metaprogramming tricks, monkey-patching, and cryptic one-liners. Any engineer should be able to read and debug the code without a mental simulator.",
        nodeCode: "// Highly condensed syntax in modern JavaScript\nconst result = user?.profile?.contact?.getEmail?.() ?? 'default@example.com';\n\n// Nested ternary and dense chaining can obscure failure modes\nconst accessLevel = isAdmin ? 3 : isEditor ? 2 : isGuest ? 1 : 0;\nconsole.log({ result, accessLevel });",
        why: "Code is read 10x more often than it is written. Explicit code avoids production surprises.",
        code: `package main

import (
	"fmt"
	"strings"
)

// Idiomatic Go: Straightforward, readable, linear control flow
type Account struct {
	ID       string
	Balance  int
	IsActive bool
}

func ProcessWithdrawal(acc *Account, amount int) error {
	if !acc.IsActive {
		return fmt.Errorf("account %s is inactive", acc.ID)
	}
	if amount <= 0 {
		return fmt.Errorf("invalid withdrawal amount: %d", amount)
	}
	if acc.Balance < amount {
		return fmt.Errorf("insufficient balance: current %d, required %d", acc.Balance, amount)
	}

	acc.Balance -= amount
	return nil
}

func main() {
	acc := &Account{ID: "ACC-902", Balance: 500, IsActive: true}
	fmt.Printf("Initial account: %+v\\n", acc)

	err := ProcessWithdrawal(acc, 200)
	if err != nil {
		fmt.Printf("Error: %v\\n", err)
	} else {
		fmt.Printf("Withdrawal succeeded! New balance: %d\\n", acc.Balance)
	}

	// Clarity: No hidden proxies, no magic decorators, no implicit monkey patching
	fmt.Println("\\nGo Philosophy: 'Clear is better than clever.'")
	fmt.Println(strings.Repeat("-", 45))
}`
      },

      philo_little_copying: {
        num: "P2",
        part: "Part 6: Go Philosophy",
        title: "\"A Little Copying > A Little Dependency\"",
        desc: "In Node.js, developers frequently pull in npm modules for single utility functions (like left-pad). In Go, writing or copying 10 lines of standard library code is preferred over adding a 3rd-party dependency.",
        nodeCode: "// Over-reliance on tiny micro-packages in npm ecosystem\n// npm dependency for 11 lines of code:\nimport leftPad from 'left-pad';\n\nconst formattedId = leftPad('42', 6, '0');\nconsole.log('Padded ID:', formattedId); // \"000042\"",
        why: "Eliminates supply chain attacks, breaking updates, and the 500MB node_modules folder.",
        code: `package main

import (
	"fmt"
	"strings"
)

// In Node, developers npm install 'left-pad' (11 lines of code)
// In Go: 'A little copying is better than a little dependency.'
func LeftPad(s string, length int, pad rune) string {
	if len(s) >= length {
		return s
	}
	return strings.Repeat(string(pad), length-len(s)) + s
}

func Slugify(s string) string {
	s = strings.ToLower(strings.TrimSpace(s))
	return strings.ReplaceAll(s, " ", "-")
}

func main() {
	invoiceNumber := "428"
	padded := LeftPad(invoiceNumber, 8, '0')
	fmt.Printf("Padded Invoice: %s (Standard Library only)\\n", padded)

	title := "Go For Node Developers Masterclass"
	slug := Slugify(title)
	fmt.Printf("Slug: %s\\n", slug)

	fmt.Println("\\nZero external dependencies. No supply chain vulnerability.")
}`
      },

      philo_errors_values: {
        num: "P3",
        part: "Part 6: Go Philosophy",
        title: "\"Errors are Values\" (No Exceptions)",
        desc: "In JS, 'throw' bypasses control flow and creates invisible failure paths. In Go, errors are first-class values returned alongside results. You inspect, wrap, and count errors using regular code.",
        nodeCode: "// Exceptions (try/catch) create hidden non-local jump paths\ntry {\n  const user = authenticateUser(token);\n  const data = fetchUserData(user.id);\n  saveToDisk(data);\n} catch (err) {\n  // Catch block catches any error from any step without explicit trace\n  console.error('Unexpected runtime failure:', err.message);\n}",
        why: "Treating errors as values keeps call stacks predictable and ensures every failure mode is handled explicitly.",
        code: `package main

import (
	"errors"
	"fmt"
)

var (
	ErrNotFound     = errors.New("item not found")
	ErrUnauthorized = errors.New("unauthorized request")
)

type Inventory struct {
	items map[string]int
}

func (inv *Inventory) GetCount(sku string) (int, error) {
	count, exists := inv.items[sku]
	if !exists {
		return 0, fmt.Errorf("sku %q: %w", sku, ErrNotFound)
	}
	return count, nil
}

func main() {
	inv := &Inventory{items: map[string]int{"GO-BOOK": 15}}

	count, err := inv.GetCount("JS-BOOK")
	if err != nil {
		if errors.Is(err, ErrNotFound) {
			fmt.Printf("Handled missing item cleanly: %v\\n", err)
		} else {
			fmt.Printf("Unexpected error: %v\\n", err)
		}
	} else {
		fmt.Printf("Found item count: %d\\n", count)
	}

	fmt.Println("\\nGo Philosophy: Errors are values to inspect, not exceptions to throw.")
}`
      },

      philo_share_memory: {
        num: "P4",
        part: "Part 6: Go Philosophy",
        title: "\"Share Memory by Communicating\"",
        desc: "Instead of having multiple threads lock and mutate shared variables in memory, goroutines communicate by passing data ownership over channels. Only one goroutine owns the data at any time.",
        nodeCode: "// Shared memory in Node.js requires SharedArrayBuffer + Atomics\nconst buffer = new SharedArrayBuffer(1024);\nconst sharedInts = new Int32Array(buffer);\n\n// Thread-safe atomic increment across Worker threads\nAtomics.add(sharedInts, 0, 1);\nconsole.log('Worker count:', Atomics.load(sharedInts, 0));",
        why: "Prevents data races and deadlocks by design without heavy mutex contention.",
        code: `package main

import (
	"fmt"
	"time"
)

// Data packet owned by one goroutine at a time
type DataPacket struct {
	ID        int
	Payload   string
	Processed bool
}

func worker(in <-chan *DataPacket, out chan<- *DataPacket) {
	for packet := range in {
		// Goroutine has exclusive ownership of packet without mutexes!
		packet.Payload += " -> transformed by worker"
		packet.Processed = true
		out <- packet
	}
	close(out)
}

func main() {
	jobs := make(chan *DataPacket, 3)
	results := make(chan *DataPacket, 3)

	go worker(jobs, results)

	jobs <- &DataPacket{ID: 1, Payload: "Initial payload"}
	jobs <- &DataPacket{ID: 2, Payload: "Secondary data"}
	close(jobs)

	for res := range results {
		fmt.Printf("Result #%d: %s (Processed: %t)\\n", res.ID, res.Payload, res.Processed)
	}

	fmt.Println("\\nGo Proverb: 'Don't communicate by sharing memory; share memory by communicating.'")
	time.Sleep(10 * time.Millisecond)
}`
      },

      philo_zero_value: {
        num: "P5",
        part: "Part 6: Go Philosophy",
        title: "\"Make the Zero Value Useful\"",
        desc: "In JS, uninitialized fields are undefined and throw TypeErrors. In Go, well-designed structs are completely valid and ready to use in their zero state without calling a constructor.",
        nodeCode: "// In JS, uninitialized references throw runtime TypeError\nlet userMap;\n\ntry {\n  // TypeError: Cannot read properties of undefined (reading \"set\")\n  userMap.set('admin', true);\n} catch (err) {\n  console.error('Runtime crash:', err.message);\n}",
        why: "Zero values eliminate initialization boilerplate and runtime nil crashes.",
        code: `package main

import (
	"fmt"
	"strings"
	"sync"
)

// Self-initializing type: zero value is ready to use without New() constructor
type SafeCounter struct {
	mu    sync.Mutex // Zero value of Mutex is an unlocked, valid mutex!
	count int        // Zero value of int is 0!
}

func (c *SafeCounter) Inc() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.count++
}

func (c *SafeCounter) Value() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.count
}

func main() {
	// Notice: No NewSafeCounter() call required!
	var counter SafeCounter
	counter.Inc()
	counter.Inc()
	fmt.Printf("SafeCounter zero-value initialized value: %d\\n", counter.Value())

	// strings.Builder is another standard library zero-value wonder
	var sb strings.Builder
	sb.WriteString("Zero ")
	sb.WriteString("Value ")
	sb.WriteString("Useful!")
	fmt.Printf("strings.Builder output: %s\\n", sb.String())
}`
      },
      // ==========================================
      // PART 7: LEETCODE EASY IN GO (JS VS GO)
      // ==========================================
      lc_two_sum: {
        num: "LC1",
        part: "Part 7: LeetCode in Go",
        title: "Two Sum (#1) — Hash Map Lookup",
        desc: "Find indices of two numbers that add up to target. In JS, developers use 'new Map()' or a plain object. In Go, pre-allocating 'make(map[int]int, len(nums))' and the comma-ok idiom solves this in O(N) time and O(N) space with zero memory allocations.",
        nodeCode: "const seen = new Map();\nfor (let i = 0; i < nums.length; i++) {\n  const comp = target - nums[i];\n  if (seen.has(comp)) return [seen.get(comp), i];\n  seen.set(nums[i], i);\n}",
        why: "Demonstrates Go map lookups with comma-ok (if idx, ok := seen[comp]; ok), slice index manipulation, and preallocating map capacity to avoid rehashing.",
        code: `package main

import "fmt"

// twoSum returns indices of the two numbers such that they add up to target
func twoSum(nums []int, target int) []int {
	// Preallocate map capacity to avoid expensive hash table bucket resizing
	seen := make(map[int]int, len(nums))

	for i, num := range nums {
		complement := target - num

		// Go's idiomatic comma-ok map lookup
		if prevIdx, ok := seen[complement]; ok {
			return []int{prevIdx, i}
		}

		seen[num] = i
	}
	return nil
}

func main() {
	nums := []int{2, 7, 11, 15}
	target := 9
	result := twoSum(nums, target)

	fmt.Printf("Input: nums = %v, target = %d\\n", nums, target)
	fmt.Printf("Output Indices: %v (Values: %d + %d = %d)\\n",
		result, nums[result[0]], nums[result[1]], target)
}`
      },

      lc_valid_parentheses: {
        num: "LC20",
        part: "Part 7: LeetCode in Go",
        title: "Valid Parentheses (#20) — Slice Stack",
        desc: "Determine if string parentheses '()[]{}' are valid. In JS, Array.push() and Array.pop() act as a stack. In Go, we use a slice of runes '[]rune' with sub-slicing stack[:len(stack)-1] for an ultra-fast, zero-overhead LIFO stack.",
        nodeCode: "const stack = [];\nfor (const char of s) {\n  if (map[char]) stack.push(char);\n  else if (stack.pop() !== match[char]) return false;\n}\nreturn stack.length === 0;",
        why: "Teaches how Go slices naturally represent stacks without needing specialized container classes or npm packages.",
        code: `package main

import "fmt"

func isValid(s string) bool {
	// Stack implemented via slice of runes with pre-allocated capacity
	stack := make([]rune, 0, len(s))
	bracketMap := map[rune]rune{
		')': '(',
		'}': '{',
		']': '[',
	}

	for _, ch := range s {
		// If it's a closing bracket, check top of stack
		if openExpected, isClosing := bracketMap[ch]; isClosing {
			if len(stack) == 0 || stack[len(stack)-1] != openExpected {
				return false
			}
			// Pop from stack by reslicing (O(1) operation)
			stack = stack[:len(stack)-1]
		} else {
			// Push opening bracket
			stack = append(stack, ch)
		}
	}

	return len(stack) == 0
}

func main() {
	testCases := []string{"()[]{}", "([)]", "{[]}", "(("}
	for _, tc := range testCases {
		fmt.Printf("isValid(%q) = %t\\n", tc, isValid(tc))
	}
}`
      },

      lc_merge_lists: {
        num: "LC21",
        part: "Part 7: LeetCode in Go",
        title: "Merge Two Sorted Lists (#21) — Dummy Pointers",
        desc: "Merge two sorted linked lists into one sorted list. In JS, nodes are objects with 'val' and 'next'. In Go, we use pointers to structs (*ListNode) and a dummy head node to eliminate special-case code for the list head.",
        nodeCode: "let dummy = new ListNode(0);\nlet tail = dummy;\nwhile (l1 && l2) {\n  if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }\n  else { tail.next = l2; l2 = l2.next; }\n  tail = tail.next;\n}",
        why: "Classic demonstration of Go pointer ergonomics: *ListNode struct pointers, referencing fields directly without arrow syntax (l1.Val, not l1->Val).",
        code: `package main

import "fmt"

type ListNode struct {
	Val  int
	Next *ListNode
}

func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
	// Dummy head node on stack; avoids checking if head is nil
	dummy := &ListNode{}
	tail := dummy

	for l1 != nil && l2 != nil {
		if l1.Val <= l2.Val {
			tail.Next = l1
			l1 = l1.Next
		} else {
			tail.Next = l2
			l2 = l2.Next
		}
		tail = tail.Next
	}

	// Attach remaining nodes in one pointer assignment
	if l1 != nil {
		tail.Next = l1
	} else {
		tail.Next = l2
	}

	return dummy.Next
}

func printList(node *ListNode) {
	for node != nil {
		fmt.Printf("%d -> ", node.Val)
		node = node.Next
	}
	fmt.Println("nil")
}

func main() {
	// l1: 1 -> 2 -> 4
	l1 := &ListNode{1, &ListNode{2, &ListNode{4, nil}}}
	// l2: 1 -> 3 -> 4
	l2 := &ListNode{1, &ListNode{3, &ListNode{4, nil}}}

	fmt.Print("List 1: ")
	printList(l1)
	fmt.Print("List 2: ")
	printList(l2)

	merged := mergeTwoLists(l1, l2)
	fmt.Print("Merged: ")
	printList(merged)
}`
      },

      lc_buy_sell_stock: {
        num: "LC121",
        part: "Part 7: LeetCode in Go",
        title: "Best Time to Buy/Sell Stock (#121) — Greedy One-Pass",
        desc: "Maximize profit by choosing a single day to buy and a later day to sell. Solved in a single O(N) pass and O(1) space by tracking minPrice and calculating profit on the fly.",
        nodeCode: "let minPrice = Infinity; let maxProfit = 0;\nfor (const p of prices) {\n  minPrice = Math.min(minPrice, p);\n  maxProfit = Math.max(maxProfit, p - minPrice);\n}",
        why: "Shows idiomatic clean procedural Go: no external math functions needed, straightforward if-statements execute faster than function call overhead.",
        code: `package main

import "fmt"

func maxProfit(prices []int) int {
	if len(prices) == 0 {
		return 0
	}

	minPrice := prices[0]
	maxProf := 0

	// Single pass O(N) time, O(1) memory
	for _, price := range prices[1:] {
		if price < minPrice {
			minPrice = price
		} else if profit := price - minPrice; profit > maxProf {
			maxProf = profit
		}
	}

	return maxProf
}

func main() {
	prices1 := []int{7, 1, 5, 3, 6, 4}
	fmt.Printf("Prices: %v -> Max Profit: %d (Buy at 1, Sell at 6)\\n", prices1, maxProfit(prices1))

	prices2 := []int{7, 6, 4, 3, 1}
	fmt.Printf("Prices: %v -> Max Profit: %d (No profitable transaction)\\n", prices2, maxProfit(prices2))
}`
      },

      lc_valid_palindrome: {
        num: "LC125",
        part: "Part 7: LeetCode in Go",
        title: "Valid Palindrome (#125) — In-Place Runes & Two Pointers",
        desc: "Determine if a string is a palindrome after converting to lowercase and stripping non-alphanumeric characters. In JS, devs regex-replace and reverse. In Go, two pointers over runes avoids string allocations completely.",
        nodeCode: "const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\nreturn clean === clean.split('').reverse().join('');",
        why: "In Node, regex replace creates heavy string copies. In Go, unicode.IsLetter and unicode.ToLower over []rune achieves zero intermediate heap allocation.",
        code: `package main

import (
	"fmt"
	"unicode"
)

func isPalindrome(s string) bool {
	runes := []rune(s)
	left, right := 0, len(runes)-1

	for left < right {
		// Skip non-alphanumeric characters from left
		for left < right && !isAlphaNumeric(runes[left]) {
			left++
		}
		// Skip non-alphanumeric characters from right
		for left < right && !isAlphaNumeric(runes[right]) {
			right--
		}

		// Compare case-insensitively
		if unicode.ToLower(runes[left]) != unicode.ToLower(runes[right]) {
			return false
		}
		left++
		right--
	}

	return true
}

func isAlphaNumeric(r rune) bool {
	return unicode.IsLetter(r) || unicode.IsDigit(r)
}

func main() {
	tests := []string{
		"A man, a plan, a canal: Panama",
		"race a car",
		"Was it a car or a cat I saw?",
	}

	for _, tc := range tests {
		fmt.Printf("isPalindrome(%q) = %t\\n", tc, isPalindrome(tc))
	}
}`
      },

      lc_reverse_linked_list: {
        num: "LC206",
        part: "Part 7: LeetCode in Go",
        title: "Reverse Linked List (#206) — Pointer Flipping",
        desc: "Reverse a singly linked list in-place. Pointers are flipped one node at a time in O(N) time and O(1) space.",
        nodeCode: "let prev = null, curr = head;\nwhile (curr) {\n  let next = curr.next;\n  curr.next = prev;\n  prev = curr;\n  curr = next;\n}\nreturn prev;",
        why: "Pointer manipulation in Go is clean and safe: zero pointer arithmetic bugs (unlike C/C++) while preserving native CPU pointer performance.",
        code: `package main

import "fmt"

type ListNode struct {
	Val  int
	Next *ListNode
}

func reverseList(head *ListNode) *ListNode {
	var prev *ListNode = nil
	curr := head

	for curr != nil {
		nextTemp := curr.Next // Save next pointer
		curr.Next = prev      // Reverse pointer direction
		prev = curr           // Advance prev pointer
		curr = nextTemp       // Advance curr pointer
	}

	return prev
}

func printList(node *ListNode) {
	for node != nil {
		fmt.Printf("%d -> ", node.Val)
		node = node.Next
	}
	fmt.Println("nil")
}

func main() {
	// 1 -> 2 -> 3 -> 4 -> 5
	head := &ListNode{1, &ListNode{2, &ListNode{3, &ListNode{4, &ListNode{5, nil}}}}}

	fmt.Print("Original: ")
	printList(head)

	reversed := reverseList(head)
	fmt.Print("Reversed: ")
	printList(reversed)
}`
      },

      lc_max_subarray: {
        num: "LC53",
        part: "Part 7: LeetCode in Go",
        title: "Maximum Subarray (#53) — Kadane's Algorithm",
        desc: "Find the contiguous subarray with the largest sum. Kadane's dynamic programming algorithm tracks currentSum and maxSum in O(N) time and O(1) space.",
        nodeCode: "let maxSum = nums[0], current = nums[0];\nfor (let i = 1; i < nums.length; i++) {\n  current = Math.max(nums[i], current + nums[i]);\n  maxSum = Math.max(maxSum, current);\n}\nreturn maxSum;",
        why: "Demonstrates high-performance single-pass dynamic programming without slice reallocations.",
        code: `package main

import "fmt"

func maxSubArray(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	maxSum := nums[0]
	currentSum := nums[0]

	for _, n := range nums[1:] {
		// If currentSum is negative, start fresh from current number
		if currentSum < 0 {
			currentSum = n
		} else {
			currentSum += n
		}

		if currentSum > maxSum {
			maxSum = currentSum
		}
	}

	return maxSum
}

func main() {
	nums1 := []int{-2, 1, -3, 4, -1, 2, 1, -5, 4}
	fmt.Printf("nums: %v -> Max Subarray Sum: %d (Subarray: [4, -1, 2, 1])\\n", nums1, maxSubArray(nums1))

	nums2 := []int{5, 4, -1, 7, 8}
	fmt.Printf("nums: %v -> Max Subarray Sum: %d\\n", nums2, maxSubArray(nums2))
}`
      }};
