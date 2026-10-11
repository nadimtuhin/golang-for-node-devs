export interface ChapterInsight {
  goParadigm: string;
  nodeEquivalent: string;
  coreTakeaway: string;
}

export const CHAPTER_INSIGHTS: Record<string, ChapterInsight> = {
  basic_vars: {
    goParadigm: 'Variables have strict static types and deterministic zero values (0, "", false, nil); := infers type at compile time.',
    nodeEquivalent: 'Dynamic typing where uninitialized variables are undefined or null, risking runtime TypeError.',
    coreTakeaway: 'Go eliminates "Cannot read properties of undefined" by guaranteeing every variable begins in a known, initialized zero state.'
  },
  basic_funcs: {
    goParadigm: 'First-class multiple return values (T, error) natively unrolled on the stack without heap allocation.',
    nodeEquivalent: 'Single return value requiring object or array wrapping { result, error } to return errors alongside data.',
    coreTakeaway: 'Multiple returns avoid unnecessary wrapper object allocations and make error checking an explicit, unskippable control flow step.'
  },
  basic_structs: {
    goParadigm: 'Concrete memory layouts with explicit method receivers (u User) or (u *User); zero prototype chains or this binding.',
    nodeEquivalent: 'ES6 classes and prototype methods where callback passing frequently detaches this, requiring .bind(this) or arrow functions.',
    coreTakeaway: 'Receiver methods make the target instance an explicit function parameter, completely eliminating runtime context binding defects.'
  },
  basic_interfaces: {
    goParadigm: 'Implicit duck typing: types satisfy interfaces automatically by implementing required methods without declaration.',
    nodeEquivalent: 'TypeScript interfaces require nominal implements or structural duck typing that vanishes after compile-time erasure.',
    coreTakeaway: 'Consumer packages define the interfaces they need rather than producer libraries dictating deep inheritance hierarchies.'
  },
  basic_flow: {
    goParadigm: 'Single unified for loop syntax for standard loops, while loops, and infinite loops; switch cases break by default.',
    nodeEquivalent: 'Multiple looping constructs (for, while, do-while, for..in, for..of) and switch statements requiring explicit break.',
    coreTakeaway: 'Eliminating redundant control flow keywords and switch fallthrough drastically lowers cognitive overhead and prevents subtle logic bugs.'
  },
  basic_packages: {
    goParadigm: 'Identifier visibility is governed by capitalization (Upper = exported public, lower = unexported private) scoped to package directories.',
    nodeEquivalent: 'File-based modularity requiring explicit export, export default, or module.exports statements.',
    coreTakeaway: 'You can instantly determine whether any function, type, or field is public across an entire codebase just by inspecting its first letter.'
  },
  fiber_api: {
    goParadigm: 'Express-like routing API atop fasthttp with zero-allocation byte buffers and direct multi-core scaling.',
    nodeEquivalent: 'Express.js on Node\'s single-threaded event loop allocating V8 objects for every incoming HTTP request and response.',
    coreTakeaway: 'Fiber lets Express developers retain familiar handler signatures while achieving 10x-20x higher request throughput with sub-20MB RAM.'
  },
  mongo_singleton: {
    goParadigm: 'Thread-safe, lazy initialization using sync.Once guaranteeing atomic single-execution across concurrent goroutines.',
    nodeEquivalent: 'Module-level variable caching with async initialization races or singleton class patterns.',
    coreTakeaway: 'sync.Once guarantees database handshakes happen exactly once at hardware level, even under thousands of simultaneous boot requests.'
  },
  http_api: {
    goParadigm: 'HTTP/1.1 and HTTP/2 server built directly into standard library net/http with goroutine-per-request concurrency; requires explicit http.Server.ReadHeaderTimeout to defend against Slowloris header-stalling attacks.',
    nodeEquivalent: 'Requires external dependencies like Express, Fastify, or Koa, clustered across CPU cores via PM2 or Node cluster mode.',
    coreTakeaway: 'Go eliminates external web framework dependencies, but raw http.ListenAndServe uses zero-timeouts by default. Always instantiate &http.Server with explicit ReadHeaderTimeout and IdleTimeout.'
  },
  middleware: {
    goParadigm: 'Standard decorator pattern wrapping http.Handler or http.HandlerFunc without mutating request state.',
    nodeEquivalent: 'Express middleware mutating the shared req object (req.user = user) and calling next().',
    coreTakeaway: 'Go middleware relies on clean function composition and explicit context.Context rather than mutating mutable request dictionaries.'
  },
  http_client: {
    goParadigm: 'Standard library http.Client featuring native connection pooling, HTTP/2 multiplexing, and deadline cancellation via context.Context.',
    nodeEquivalent: 'External libraries like axios, node-fetch, or undici to get reliable timeouts and pooling.',
    coreTakeaway: 'Built-in connection reuse requires draining/closing resp.Body and overriding Transport.MaxIdleConnsPerHost (default is only 2), preventing TCP socket churn under microservice loads.'
  },
  json: {
    goParadigm: 'Type-safe serialization with struct tags (e.g. `json:"user_id"`) enforcing compile-time schema contracts.',
    nodeEquivalent: 'Dynamic JSON.parse() returning unchecked any objects requiring runtime validators like Zod or Joi.',
    coreTakeaway: 'Struct tags enforce bidirectional serialization schemas directly at compile time without third-party schema validation libraries.'
  },
  fs_io: {
    goParadigm: 'Universal, composable stream interfaces io.Reader and io.Writer enabling zero-allocation chunked data pipelines.',
    nodeEquivalent: 'Node.js Stream.Readable and Stream.Writable relying on event emitter callbacks and stream buffer wrapping.',
    coreTakeaway: 'Any source (file, network socket, HTTP body, gzip buffer) implementing Read([]byte) (int, error) pipes cleanly anywhere via io.Copy.'
  },
  env_vars: {
    goParadigm: 'Standard library os.Getenv reading OS environment variables directly with zero external dependencies.',
    nodeEquivalent: 'process.env populated at startup often requiring third-party libraries like dotenv.',
    coreTakeaway: '12-Factor app configurations read environment variables directly from container orchestrators with simple typed fallback functions.'
  },
  http_routing: {
    goParadigm: 'Method-specific routing and path parameter wildcards ({id}) built into Go 1.22+ standard http.ServeMux.',
    nodeEquivalent: 'Express or Fastify route matching (app.get("/users/:id")) requiring third-party web frameworks.',
    coreTakeaway: 'Go 1.22+ eliminates third-party routers: standard http.ServeMux matches HTTP methods and extracts path wildcards with r.PathValue().'
  },
  structured_logging: {
    goParadigm: 'High-performance, leveled, structured JSON logging standardized across the ecosystem via Go 1.21 log/slog.',
    nodeEquivalent: 'Pino or Winston emitting JSON log objects formatted for CloudWatch, Datadog, or Elasticsearch.',
    coreTakeaway: 'log/slog unifies logging across all Go packages with zero-allocation attributes (slog.String, slog.Int) and built-in contextual tracing.'
  },
  slice_map: {
    goParadigm: 'Explicit pre-allocated slice loop make([]R, 0, len(items)) or generic Map helper to avoid GC reallocation.',
    nodeEquivalent: 'Array.prototype.map() creating a new heap-allocated JS array on every transformation.',
    coreTakeaway: 'Pre-allocating slice capacity before looping avoids repeated memory reallocations, running significantly faster than functional JS chains.'
  },
  slice_filter: {
    goParadigm: 'In-place or pre-allocated filtering into a slice with zero intermediate closure overhead.',
    nodeEquivalent: 'Array.prototype.filter() allocating a new array and invoking a callback function for every element.',
    coreTakeaway: 'Go gives complete transparency over memory allocation, preventing hidden garbage collector thrashing in high-frequency data pipelines.'
  },
  slice_reduce: {
    goParadigm: 'Simple, unrolled for range loop accumulating state with zero function call overhead and clear readability.',
    nodeEquivalent: 'Array.prototype.reduce() with accumulator callback passing, which is prone to mutation bugs and harder stack traces.',
    coreTakeaway: 'Plain loops in Go are faster, easier to debug, and provide immediate clarity without complex accumulator typing.'
  },
  slice_sort: {
    goParadigm: 'High-performance pdqsort (Pattern-Defeating Quicksort) via standard library slices.Sort and slices.SortFunc.',
    nodeEquivalent: 'Array.prototype.sort() which converts items to strings by default or requires comparator functions mutating the array.',
    coreTakeaway: 'Go 1.21+ slices package provides cache-friendly, type-safe in-place sorting without interface boxing or reflection overhead.'
  },
  slice_ops: {
    goParadigm: 'Lightweight 3-word slice header (Data *T, Len int, Cap int) manipulated via append() and sub-slicing s[low:high].',
    nodeEquivalent: 'Array mutations via push(), pop(), shift(), unshift(), and splice() modifying dynamic V8 arrays.',
    coreTakeaway: 'Slicing creates a zero-copy sub-window over existing memory; note that keeping sub-slices pins the entire backing array in memory.'
  },
  data_types: {
    goParadigm: 'Explicit sized types (int8, int32, int64, float64, byte, rune) matching CPU architecture registers.',
    nodeEquivalent: 'Single IEEE-754 64-bit float number type (plus BigInt), creating hidden precision hazards with 64-bit integer IDs.',
    coreTakeaway: 'Explicit numeric types prevent floating-point precision loss for database 64-bit IDs and allow optimal CPU cache utilization.'
  },
  maps_sets: {
    goParadigm: 'Built-in map[K]V with O(1) lookups; zero-byte map[T]struct{} forms the ultimate memory-efficient Set.',
    nodeEquivalent: 'JavaScript Map for key-value stores and Set for unique items, both carrying significant V8 object wrapper overhead.',
    coreTakeaway: 'Using struct{} (which consumes 0 bytes of RAM) as a map value creates a high-performance hash set with no memory waste.'
  },
  pointers: {
    goParadigm: 'Explicit pointer syntax & (address of) and * (dereference); choose pass-by-value vs pass-by-pointer per function.',
    nodeEquivalent: 'Primitives are implicitly passed by value; objects and arrays are implicitly passed by reference with no caller control.',
    coreTakeaway: 'Pointers give you total control over whether a function can mutate state or must operate on an immutable local copy.'
  },
  db_pool: {
    goParadigm: 'Built-in, thread-safe connection pooling via *sql.DB shared across all concurrent goroutines.',
    nodeEquivalent: 'Third-party connection pool libraries (pg.Pool) duplicated across clustered Node worker processes.',
    coreTakeaway: 'A single Go binary manages one unified connection pool across thousands of concurrent requests, maximizing database connection limits.'
  },
  db_queries: {
    goParadigm: 'Explicit differentiation between Exec (mutations), QueryRow (single record), and Query (multi-record cursor).',
    nodeEquivalent: 'Uniform pool.query() returning an array of untyped rows for all SQL operations.',
    coreTakeaway: 'Explicit query methods enforce resource cleanup (like closing row cursors) and prevent accidental multi-row memory loading.'
  },
  db_tx: {
    goParadigm: 'Explicit db.BeginTx with idiomatic defer tx.Rollback() guaranteeing automatic rollback on any returned error.',
    nodeEquivalent: 'Manual BEGIN/COMMIT/ROLLBACK queries wrapped in try/catch/finally blocks or ORM transaction callbacks.',
    coreTakeaway: 'defer tx.Rollback() ensures transactions are never left dangling; calling Rollback() after successful Commit() safely returns sql.ErrTxDone.'
  },
  orm_patterns: {
    goParadigm: 'Compile-time type-safe SQL with sqlc or lightweight ORM with GORM, avoiding heavy runtime reflection.',
    nodeEquivalent: 'Heavy runtime ORMs like Prisma or TypeORM that construct dynamic queries and rely on deep TypeScript schema generation.',
    coreTakeaway: 'sqlc compiles raw SQL files directly into type-safe, zero-reflection Go structs, combining raw SQL performance with total type safety.'
  },
  bullmq_basic: {
    goParadigm: 'In-process asynchronous job distribution using buffered Go channels and worker goroutine pools with zero external brokers.',
    nodeEquivalent: 'Requires external Redis server and BullMQ / BeeQueue libraries to distribute background jobs across processes.',
    coreTakeaway: 'For in-process async processing, Go channels deliver 500,000+ jobs/sec in ~15MB RAM without managing Redis infrastructure.'
  },
  bullmq_retries: {
    goParadigm: 'Explicit exponential backoff retry loops with randomized jitter to prevent thundering herds, and routing to a DLQ channel.',
    nodeEquivalent: 'BullMQ job options (attempts: 3, backoff: { type: "exponential" }) orchestrated through Redis Lua scripts.',
    coreTakeaway: 'Adding randomized jitter prevents retry storms when downstream services fail, making backoff resilient without external brokers.'
  },
  promise_all: {
    goParadigm: 'True multi-core parallel execution coordinated via sync.WaitGroup or golang.org/x/sync/errgroup.',
    nodeEquivalent: 'Promise.all() running asynchronous tasks concurrently on Node\'s single-threaded event loop.',
    coreTakeaway: 'While Promise.all multiplexes on one core, Go goroutines execute simultaneously across all available physical CPU cores.'
  },
  promise_race: {
    goParadigm: 'Native select statement multiplexing multiple channel reads and timeouts at the language syntax level.',
    nodeEquivalent: 'Promise.race() settling as soon as the first promise resolves or rejects.',
    coreTakeaway: 'Go\'s select statement provides non-blocking, multi-channel multiplexing and timeout handling with zero Promise allocation.'
  },
  abort_controller: {
    goParadigm: 'Idiomatic cancellation and deadline propagation through the call tree using standard context.Context.',
    nodeEquivalent: 'AbortController and AbortSignal manually wired into fetch calls and event listeners.',
    coreTakeaway: 'context.Context is the universal standard in Go: when a client disconnects, cancellation instantly cascades to every DB and HTTP call.'
  },
  error_wrapping: {
    goParadigm: 'Errors as values wrapped with %w, checked via errors.Is (sentinel identity) and errors.As (typed unwrapping).',
    nodeEquivalent: 'Throwing exceptions (throw new CustomError()) caught with try/catch and instanceof checks.',
    coreTakeaway: 'Errors are regular values inspected without breaking execution control flow or paying the performance penalty of stack unwinding.'
  },
  channels_basics: {
    goParadigm: 'Typed memory communication conduits (chan T) synchronizing producer and consumer goroutines without mutexes.',
    nodeEquivalent: 'Async queue structures, EventEmitter events, or Promise deferred pipelines.',
    coreTakeaway: 'Channels pass data ownership between concurrent routines; unbuffered channels synchronize immediately while buffered channels decouple throughput.'
  },
  graceful_shutdown: {
    goParadigm: 'Clean server draining with signal.NotifyContext and http.Server.Shutdown(ctx) allowing active HTTP requests to complete.',
    nodeEquivalent: 'Intercepting process.on("SIGTERM") to close HTTP listeners and pool connections before process.exit().',
    coreTakeaway: 'In containerized Kubernetes deployments, graceful shutdown prevents dropped TCP sockets and 502 Bad Gateway errors during rolling updates.'
  },
  basic_pointers: {
    goParadigm: 'Distinguishing pass-by-value (safe copy) from passing pointer values (*T) to control mutation and allocation.',
    nodeEquivalent: 'Hidden object reference mutation bugs where passing an object to a function unexpectedly alters parent state.',
    coreTakeaway: 'Pass-by-value guarantees local isolation by default, while explicit pointers signal intentional mutation or large struct sharing.'
  },
  basic_type_assertions: {
    goParadigm: 'Safe type assertions v, ok := x.(T) and switch v := x.(type) checking concrete underlying types at runtime.',
    nodeEquivalent: 'typeof, instanceof, or TypeScript user-defined type guards (x is Dog) with potential runtime mismatches.',
    coreTakeaway: 'The comma-ok idiom prevents runtime panics when extracting concrete types from any (interface{}).'
  },
  basic_enums: {
    goParadigm: 'Type-safe constants generated sequentially with the iota enumerator within a const block.',
    nodeEquivalent: 'TypeScript enum compiling to reverse-lookup JS objects, or string union types ("active" | "inactive").',
    coreTakeaway: 'iota provides zero-cost integer enumerations with compile-time type safety and optional .String() method formatting.'
  },
  basic_embedding: {
    goParadigm: 'Composition over inheritance: embedding anonymous structs to promote fields and methods without class hierarchies.',
    nodeEquivalent: 'Classical class inheritance using extends and super() leading to brittle base class hierarchies.',
    coreTakeaway: 'Struct embedding allows code reuse and method promotion without locking types into rigid, fragile object-oriented hierarchies.'
  },
  basic_defer_panic: {
    goParadigm: 'defer schedules LIFO cleanup (up to 8 static defers inlined via Go 1.14+ open-coded defers; loop defers use stack/heap deferpool); recover() must be called directly inside a deferred closure in the SAME goroutine (cross-goroutine recover is impossible).',
    nodeEquivalent: 'try/catch/finally and process.on("uncaughtException"). In Node, unhandled exceptions can be intercepted globally; in Go, an uncaught panic in any goroutine terminates the process.',
    coreTakeaway: 'recover() only catches panics within its own goroutine stack. Fatal crashes like concurrent map read/write or stack overflow (runtime.throw) abort immediately and cannot be recovered.'
  },
  basic_generics: {
    goParadigm: 'Compile-time parametric polymorphism via type parameters [T any] and constraints [K comparable] without runtime reflection.',
    nodeEquivalent: 'TypeScript generics erased at compile time or dynamic JS functions accepting any type without safety.',
    coreTakeaway: 'Go generics deliver reusable data structures and algorithms while maintaining full compile-time static type verification.'
  },
  ds_slice_internals: {
    goParadigm: 'Under the hood, a slice is a 24-byte struct (on 64-bit platforms: Data pointer, Len, Cap) with a pointer to backing array, length, and capacity.',
    nodeEquivalent: 'V8 JS Arrays implemented as dynamic Fast Elements or Dictionary Elements with complex hidden classes.',
    coreTakeaway: 'Understanding slice capacity prevents silent reallocation copies and avoids unintended mutations when taking sub-slices.'
  },
  ds_map_internals: {
    goParadigm: 'Hash table built of 8-slot buckets (or Go 1.24 Swiss Tables); runtime randomizes iteration by selecting a pseudo-random start bucket and slot offset via fastrand() to prevent key order dependency.',
    nodeEquivalent: 'JS Objects and Maps maintain insertion order by specification, adding runtime maintenance overhead.',
    coreTakeaway: 'Go intentionally randomizes map iteration to prevent developers from relying on non-deterministic key ordering.'
  },
  ds_struct_memory: {
    goParadigm: 'Fields align to their natural size (1, 2, 4, 8 bytes on 64-bit); ordering fields from largest to smallest eliminates padding gaps. Note: a zero-size struct (struct{}) at the end of a struct incurs trailing padding to prevent out-of-bounds pointer creation.',
    nodeEquivalent: 'V8 handles object layout and hidden classes invisibly, abstracting CPU memory alignment from developers.',
    coreTakeaway: 'Ordering struct fields by byte size optimizes CPU cache lines and eliminates padding bytes in high-density data structures.'
  },
  ds_stacks_queues: {
    goParadigm: 'Ring buffers or slices avoid the O(N) memory shift of arr.shift(), maintaining O(1) enqueue and dequeue.',
    nodeEquivalent: 'Array.prototype.shift() re-indexes every element in memory, degrading queue operations to O(N) performance.',
    coreTakeaway: 'Building queues with slice indices or circular buffers avoids catastrophic O(N) re-indexing in high-throughput pipelines.'
  },
  ds_priority_queue: {
    goParadigm: 'Standard library container/heap provides an efficient binary min/max heap over any slice implementing heap.Interface.',
    nodeEquivalent: 'Requires npm packages or manual binary heap implementations, as JavaScript lacks a built-in heap/priority queue.',
    coreTakeaway: 'container/heap provides O(log N) scheduling, Dijkstra paths, and top-K streaming with standard library primitives.'
  },
  ds_sync_pool: {
    goParadigm: 'sync.Pool caches allocated, unused temporary objects across goroutines to eliminate garbage collection pressure.',
    nodeEquivalent: 'No standard object pool; V8 garbage collection must clean up every temporary object created in request pipelines.',
    coreTakeaway: 'sync.Pool is an ephemeral recycler using Go 1.13+ victim caches (surviving 1 GC cycle), not a persistent cache. Never rely on it for state retention.'
  },
  philo_clear_over_clever: {
    goParadigm: 'Write simple, transparent code that any engineer can read and maintain without mental deciphering.',
    nodeEquivalent: 'Chained one-liner arrow functions, proxy magic, and dynamic metaprogramming that look clever but hinder debugging.',
    coreTakeaway: 'Clarity is the primary metric of Go engineering: explicit, straightforward code prevents bugs and eases team onboarding.'
  },
  philo_little_copying: {
    goParadigm: 'Duplicating 5 lines of code is vastly superior to pulling in a third-party module dependency.',
    nodeEquivalent: 'Installing micro-dependencies (left-pad, is-number) creating fragile dependency trees and supply chain risks.',
    coreTakeaway: 'Vendor minimal dependencies; owning a small helper function prevents dependency bloat and transitive security vulnerabilities.'
  },
  philo_errors_values: {
    goParadigm: 'Treat errors as regular inspectable data values rather than exceptional runtime execution diversions.',
    nodeEquivalent: 'Exceptions (throw) bypassing function call stacks and requiring nested try/catch handlers.',
    coreTakeaway: 'Handling errors as normal values makes control flow transparent, predictable, and fully visible on the happy path.'
  },
  philo_share_memory: {
    goParadigm: 'Do not communicate by sharing memory; instead, share memory by communicating via channels.',
    nodeEquivalent: 'Shared state in worker threads requiring complex mutex locks or message-passing via postMessage.',
    coreTakeaway: 'Channels pass ownership of data between concurrent routines, preventing race conditions by architectural design.'
  },
  philo_zero_value: {
    goParadigm: 'Design structs so their zero value (var x MyType) is immediately safe and functional without constructor functions.',
    nodeEquivalent: 'Objects often fail with null reference errors unless initialized through complex factory functions or constructors.',
    coreTakeaway: 'Types like sync.Mutex and bytes.Buffer work immediately upon zero declaration without initialization boilerplate.'
  },
  lc_two_sum: {
    goParadigm: 'Single-pass hash map map[int]int storing complement index for O(N) time and O(N) space.',
    nodeEquivalent: 'Using JS Map or plain object {} to store seen numbers and complement lookups.',
    coreTakeaway: 'Pre-allocating make(map[int]int, len(nums)) ensures optimal hash bucket allocation for O(1) constant lookups.'
  },
  lc_valid_parentheses: {
    goParadigm: 'Slice-based LIFO stack appending closing brackets and popping top elements in O(N) time and O(N) space.',
    nodeEquivalent: 'Array-based stack using .push() and .pop() with dynamic array allocation.',
    coreTakeaway: 'A pre-allocated []byte slice acts as an optimal stack with reslicing for matching ASCII bracket pairs in linear time.'
  },
  lc_merge_lists: {
    goParadigm: 'Dummy head pointer node traversing both linked lists and wiring Next pointers in O(N) time and O(1) space.',
    nodeEquivalent: 'Object references { val, next } updated iteratively using a dummy head reference.',
    coreTakeaway: 'Dummy nodes eliminate edge-case nil checks for the list head, allowing clean in-place pointer splicing.'
  },
  lc_buy_sell_stock: {
    goParadigm: 'Single-pass greedy tracking of minimum purchase price and maximum profit in O(N) time and O(1) auxiliary space.',
    nodeEquivalent: 'Iterative loop tracking minPrice and maxProfit with Math.max() and Math.min().',
    coreTakeaway: 'Linear greedy traversal yields optimal O(1) space complexity without requiring auxiliary arrays or dynamic programming matrices.'
  },
  lc_valid_palindrome: {
    goParadigm: 'Two-pointer approach over string bytes achieves true O(1) auxiliary space, or over a []rune slice for multi-byte Unicode code points.',
    nodeEquivalent: 'Regex string cleaning str.replace(/[^a-z0-9]/gi, \'\') followed by .split(\'\').reverse().join(\'\').',
    coreTakeaway: 'Byte indexing avoids regex engine overhead and allocates zero auxiliary heap memory for ASCII palindrome validation.'
  },
  lc_reverse_linked_list: {
    goParadigm: 'Iterative 3-pointer manipulation (prev, curr, next) reversing pointers in-place in O(N) time and O(1) space.',
    nodeEquivalent: 'Iterative object reference reassignment swapping curr.next references.',
    coreTakeaway: 'Pointer flipping reorders linked list nodes directly in memory without allocating new node structs.'
  },
  lc_max_subarray: {
    goParadigm: 'Kadane\'s algorithm keeping running local sum and resetting when negative, running in O(N) time and O(1) space.',
    nodeEquivalent: 'Dynamic programming array or Kadane\'s loop updating currentSum and maxSum.',
    coreTakeaway: 'Greedy state accumulation achieves optimal linear performance without allocating memoization tables.'
  }
};
