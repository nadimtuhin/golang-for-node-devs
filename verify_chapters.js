import { chaptersData } from "./src/data/chapters.ts";

async function compileSnippet(key, chapter) {
  const params = new URLSearchParams();
  params.append("version", "2");
  params.append("body", chapter.code);

  try {
    const res = await fetch("https://play.golang.org/compile", {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    if (!res.ok) {
      return {
        key,
        num: chapter.num,
        title: chapter.title,
        status: "HTTP_ERROR",
        error: "HTTP " + res.status + ": " + res.statusText
      };
    }

    const data = await res.json();
    return {
      key,
      num: chapter.num,
      title: chapter.title,
      status: (data.Errors && data.Errors.trim() !== "") ? "COMPILE_ERROR" : "OK",
      errors: data.Errors || "",
      events: data.Events || [],
      goStatus: data.Status
    };
  } catch (err) {
    return {
      key,
      num: chapter.num,
      title: chapter.title,
      status: "FETCH_ERROR",
      error: err.message
    };
  }
}

async function main() {
  const entries = Object.entries(chaptersData);
  console.log("Starting verification of " + entries.length + " chapters against Go Playground (https://play.golang.org/compile)...");

  const results = [];
  const concurrency = 4;
  for (let i = 0; i < entries.length; i += concurrency) {
    const batch = entries.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(([key, chapter]) => compileSnippet(key, chapter))
    );
    for (const r of batchResults) {
      results.push(r);
      if (r.status === "OK") {
        console.log("[PASS] [" + r.num + "] " + r.key + ": " + r.title);
      } else {
        console.error("[FAIL] [" + r.num + "] " + r.key + ": " + r.title);
        console.error("       Error: " + (r.errors || r.error));
      }
    }
    await new Promise((res) => setTimeout(res, 200));
  }

  const passed = results.filter((r) => r.status === "OK");
  const failed = results.filter((r) => r.status !== "OK");

  console.log("\n==========================================");
  console.log("       GO PLAYGROUND VERIFICATION SUMMARY ");
  console.log("==========================================");
  console.log("Total Chapters: " + results.length);
  console.log("Passed:         " + passed.length);
  console.log("Failed:         " + failed.length);
  console.log("Pass Rate:      " + ((passed.length / results.length) * 100).toFixed(1) + "%");
  console.log("==========================================\n");

  if (failed.length > 0) {
    console.error("Failed Chapters Details:");
    for (const f of failed) {
      console.error("- [" + f.num + "] " + f.key + ": " + (f.errors || f.error));
    }
    process.exit(1);
  } else {
    console.log("All 56 Go code snippets compiled cleanly with 0 errors (Exit 0) on Go Playground!");
    process.exit(0);
  }
}

main();
