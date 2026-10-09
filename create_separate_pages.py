import os, re

base_dir = '/Users/nadimtuhin/opensource/golang-for-node-devs'
views_dir = os.path.join(base_dir, 'src', 'components', 'views')
pages_dir = os.path.join(base_dir, 'src', 'pages')

# 1. UPDATE src/components/Header.astro WITH ACTIVE ROUTE PATHS
new_header = """---
const pathname = Astro.url.pathname.replace(/\\/$/, '') || '/';
---

<header>
  <a href="/" class="brand">
    <span>🟢 ➔ 🐹</span>
    <span>Go Backend Studio</span>
    <span class="badge">56 Lessons & Demos</span>
  </a>
  
  <nav class="header-nav-scroll">
    <a href="/" class={`tab-toggle ${pathname === '/' ? 'active' : ''}`}>⚡ Studio</a>
    <a href="/microservice" class={`tab-toggle ${pathname === '/microservice' ? 'active' : ''}`}>📂 Microservice</a>
    <a href="/docker" class={`tab-toggle ${pathname === '/docker' ? 'active' : ''}`}>🐳 Docker</a>
    <a href="/leetcode" class={`tab-toggle ${pathname === '/leetcode' ? 'active' : ''}`}>🧩 LeetCode</a>
    <a href="/go-mod-vs-npm" class={`tab-toggle ${pathname === '/go-mod-vs-npm' ? 'active' : ''}`}>📦 go.mod vs npm</a>
    <a href="/philosophy" class={`tab-toggle ${pathname === '/philosophy' ? 'active' : ''}`}>🧠 Philosophy</a>
    <a href="/interviews" class={`tab-toggle ${pathname === '/interviews' ? 'active' : ''}`}>🎯 Interviews</a>
    <a href="/pitfalls" class={`tab-toggle ${pathname === '/pitfalls' ? 'active' : ''}`}>⚠️ Pitfalls</a>
    <a href="/troubleshooting" class={`tab-toggle ${pathname === '/troubleshooting' ? 'active' : ''}`}>🛠️ Diagnostics</a>
    <a href="/cheatsheet" class={`tab-toggle ${pathname === '/cheatsheet' ? 'active' : ''}`}>📖 Rosetta</a>
  </nav>

  <a href="https://github.com/nadimtuhin/golang-for-node-devs" target="_blank" class="github-link-btn">
    <span>GitHub ★</span>
  </a>
</header>
"""
with open(os.path.join(base_dir, 'src', 'components', 'Header.astro'), 'w', encoding='utf-8') as f:
    f.write(new_header)
print("Updated src/components/Header.astro")

# 2. UPDATE global.css TO MAKE .view-container DISPLAY BLOCK
css_path = os.path.join(base_dir, 'src', 'styles', 'global.css')
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Replace .view-container { display: none; ... } with display: block
css = re.sub(r'\.view-container\s*\{[^}]*\}', """.view-container {
      display: block;
      width: 100%;
      min-height: calc(100vh - 54px);
      background: #ffffff;
    }""", css)
with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated src/styles/global.css")

# 3. CONVERT JUMP BUTTONS TO REAL HREF LINKS IN VIEW HTML FILES
for fname in os.listdir(views_dir):
    if fname.endswith('.html'):
        fpath = os.path.join(views_dir, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            v_content = f.read()
        
        # Replace onclick="jumpToChapter('xyz')" with href="/?chapter=xyz"
        v_content = re.sub(
            r'<button([^>]*?)onclick="jumpToChapter\(\'([^\']+)\'\)"([^>]*?)>(.*?)</button>',
            r'<a\1href="/?chapter=\2"\3 style="text-decoration:none;">\4</a>',
            v_content
        )
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(v_content)
        print(f"Updated jump links in {fname}")

# 4. CREATE DEDICATED PAGES
pages_meta = {
    'microservice.astro': ('RepoExplorer.astro', 'Real-World Microservice Architecture (Express vs Go Fiber)', 'Side-by-side comparison of Express/Mongoose microservice rewritten in Go Fiber and official MongoDB driver.'),
    'docker.astro': ('DockerView.astro', 'Production Go Docker Images (Distroless & Scratch)', 'Ultra-compact, production-ready Go Dockerfiles under 15MB compared against 200MB+ Node.js images.'),
    'leetcode.astro': ('LeetcodeView.astro', 'LeetCode Easy Solutions in Go (JS vs Go)', 'Classic algorithm and data structure problems solved in Go with zero-allocation idioms vs JavaScript objects.'),
    'go-mod-vs-npm.astro': ('ModExplainView.astro', 'Dependency Management: go.mod vs package.json', 'How Go Modules, go.sum, and semantic import versioning replace package.json and npm.'),
    'philosophy.astro': ('PhilosophyView.astro', 'The Go Philosophy & Zen of Go', 'Rob Pike Go Proverbs, what Go deliberately omitted and why, and Dave Cheney Zen of Go.'),
    'interviews.astro': ('InterviewsView.astro', 'Senior Backend Go Interview Questions', 'Top technical interview questions for developers transitioning from Node.js to Go with SVG architecture diagrams.'),
    'pitfalls.astro': ('PitfallsView.astro', 'Known Pitfalls & Footguns in Go', 'The top 8 common traps where JavaScript intuition fails in Go, with side-by-side buggy vs idiomatic code diffs.'),
    'troubleshooting.astro': ('TroubleshootingView.astro', 'Go Troubleshooting & Diagnostics', 'Playbooks for diagnosing deadlocks, data races with -race, and profiling CPU/memory with pprof.'),
    'cheatsheet.astro': ('CheatsheetView.astro', 'Go vs Node.js Rosetta Code Cheatsheet', 'Side-by-side syntax comparison table between Node.js / TypeScript and Go.')
}

for page_name, (comp_name, title, desc) in pages_meta.items():
    page_content = f"""---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import ViewComponent from '../components/views/{comp_name}';
---

<Layout title="{title} — Go for Node.js Devs" description="{desc}">
  <Header />
  <main style="min-height: calc(100vh - 54px); overflow-y: auto;">
    <ViewComponent />
  </main>
</Layout>
"""
    with open(os.path.join(pages_dir, page_name), 'w', encoding='utf-8') as f:
        f.write(page_content)
    print(f"Created src/pages/{page_name}")

# 5. UPDATE src/pages/index.astro TO BE PURE STUDIO WITH URL PARAM DEEP LINKING
with open(os.path.join(pages_dir, 'index.astro'), 'r', encoding='utf-8') as f:
    idx_content = f.read()

# In index.astro, remove the documentation views imports and renderings
index_clean = """---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Sidebar from '../components/Sidebar.astro';
import LessonDetail from '../components/LessonDetail.astro';
import Playground from '../components/Playground.astro';

import { chaptersData } from '../data/chapters';
---

<Layout title="Interactive Studio — Go for Node.js Developers Masterclass">
  <Header />

  <!-- Studio View (3 Columns) -->
  <div id="viewStudio" class="studio-container">
    <Sidebar />
    <LessonDetail />
    <Playground />
  </div>

  <!-- Client-side Interactive Engine -->
  <script define:vars={{ chaptersData }}>
    window.chaptersData = chaptersData;

    let activeKey = 'basic_vars';

    const editor = CodeMirror.fromTextArea(document.getElementById('codeArea'), {
      lineNumbers: true,
      mode: 'go',
      theme: 'eclipse',
      tabSize: 4,
      indentUnit: 4,
      lineWrapping: true,
      viewportMargin: Infinity
    });

    // Search & Filter Lessons
    function filterLessons(query) {
      const q = query.toLowerCase().trim();
      const clearBtn = document.getElementById('clearSearchBtn');
      if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

      let visibleCount = 0;
      const items = document.querySelectorAll('.chapter-nav-item');
      items.forEach(item => {
        const text = item.innerText.toLowerCase();
        const matches = text.includes(q);
        item.style.display = matches ? 'flex' : 'none';
        if (matches) visibleCount++;
      });

      document.querySelectorAll('.sidebar-part-label').forEach(label => {
        let sibling = label.nextElementSibling;
        let anyVisible = false;
        while (sibling && sibling.classList.contains('chapter-nav-item')) {
          if (sibling.style.display !== 'none') anyVisible = true;
          sibling = sibling.nextElementSibling;
        }
        label.style.display = anyVisible ? 'block' : 'none';
      });

      const badge = document.getElementById('sidebarCountBadge');
      if (badge) badge.innerText = q ? `${visibleCount} Found` : '56 Lessons';
    }

    function clearLessonSearch() {
      const input = document.getElementById('lessonSearchInput');
      if (input) {
        input.value = '';
        filterLessons('');
        input.focus();
      }
    }

    // Previous / Next Lesson Navigation
    function navigateLesson(direction) {
      const keys = Object.keys(chaptersData);
      const currentIndex = keys.indexOf(activeKey);
      if (currentIndex === -1) return;

      const nextIndex = currentIndex + direction;
      if (nextIndex >= 0 && nextIndex < keys.length) {
        selectChapter(keys[nextIndex]);
      }
    }

    function copyNodeSnippet() {
      const code = document.getElementById('detailNodeCode').innerText;
      navigator.clipboard.writeText(code).then(() => {
        alert('Copied Node.js snippet!');
      });
    }

    function copyEditorCode() {
      const code = editor.getValue();
      navigator.clipboard.writeText(code).then(() => {
        alert('Copied Go code!');
      });
    }

    function resetEditorCode() {
      if (chaptersData[activeKey]) {
        editor.setValue(chaptersData[activeKey].code);
      }
    }

    function clearConsole() {
      document.getElementById('consoleArea').innerText = '';
      updateStatus('Ready', 'ready');
    }

    function copyConsoleOutput() {
      const out = document.getElementById('consoleArea').innerText;
      navigator.clipboard.writeText(out).then(() => {
        alert('Copied console output!');
      });
    }

    // Keyboard Shortcuts: Cmd+Enter / Ctrl+Enter to execute Go code
    document.addEventListener('keydown', function(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        executeGoCode();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('lessonSearchInput');
        if (searchInput) searchInput.focus();
      }
    });

    function selectChapter(key) {
      if (!chaptersData[key]) return;
      activeKey = key;
      const data = chaptersData[key];

      document.querySelectorAll('.chapter-nav-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('onclick').includes(key));
      });

      document.getElementById('detailPartTag').innerText = data.part;
      document.getElementById('detailId').innerText = '#' + data.num;
      document.getElementById('detailTitle').innerText = data.title;
      document.getElementById('detailDesc').innerText = data.desc;
      document.getElementById('detailNodeCode').innerText = data.nodeCode;
      document.getElementById('detailGoWhy').innerText = data.why;

      document.getElementById('editorCurrentFile').innerText = `📄 main.go — ${data.title}`;
      editor.setValue(data.code);

      updateStatus('Ready', 'ready');
      const c = document.getElementById('consoleArea');
      c.className = 'console-body';
      c.textContent = '// Hit "Run Code" (or ⌘+Enter) to compile and execute on Go Playground!';
      
      // Update browser URL query parameter without full reload
      if (history.pushState) {
        const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?chapter=' + key;
        window.history.replaceState({path:newurl},'',newurl);
      }
    }

    function updateStatus(text, type) {
      const statusTag = document.getElementById('statusTag');
      const statusDot = document.getElementById('statusDot');
      if (statusTag) {
        statusTag.innerText = text;
        statusTag.className = 'status-pill ' + (type || 'ready');
      }
      if (statusDot) {
        statusDot.className = 'status-dot ' + (type === 'error' ? 'error' : (type === 'running' ? 'compiling' : ''));
      }
    }

    async function executeGoCode() {
      const code = editor.getValue();
      const consoleArea = document.getElementById('consoleArea');
      const runBtn = document.getElementById('runBtn');
      const statusDot = document.getElementById('statusDot');
      const statusTag = document.getElementById('statusTag');
      const statusLatency = document.getElementById('statusLatency');

      if (runBtn) runBtn.disabled = true;
      if (statusDot) statusDot.className = 'status-dot compiling';
      if (statusTag) {
        statusTag.className = 'status-pill running';
        statusTag.innerText = 'Compiling...';
      }
      if (statusLatency) statusLatency.innerText = '';

      consoleArea.className = 'console-body';
      consoleArea.textContent = '⏳ Compiling and executing on Go Playground...';

      const startTime = performance.now();

      try {
        const params = new URLSearchParams();
        params.append('version', '2');
        params.append('body', code);

        const response = await fetch('https://play.golang.org/compile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params.toString()
        });

        const elapsed = Math.round(performance.now() - startTime);
        if (statusLatency) statusLatency.innerText = `${elapsed}ms`;

        if (!response.ok) {
          throw new Error(`Compiler returned HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data.Errors) {
          consoleArea.className = 'console-body is-error';
          consoleArea.textContent = '❌ Compile Error:\\n\\n' + data.Errors;
          if (statusDot) statusDot.className = 'status-dot error';
          if (statusTag) {
            statusTag.className = 'status-pill error';
            statusTag.innerText = 'Error';
          }
        } else {
          let outputText = '';
          if (data.Events && data.Events.length > 0) {
            outputText = data.Events.map(e => e.Message).join('');
          } else {
            outputText = '✓ Program completed with code 0 (no stdout output).';
          }
          consoleArea.className = 'console-body';
          consoleArea.textContent = outputText;
          if (statusDot) statusDot.className = 'status-dot';
          if (statusTag) {
            statusTag.className = 'status-pill ready';
            statusTag.innerText = `Exit 0 • ${elapsed}ms`;
          }
        }
      } catch (err) {
        const elapsed = Math.round(performance.now() - startTime);
        if (statusLatency) statusLatency.innerText = `${elapsed}ms`;
        consoleArea.className = 'console-body is-error';
        consoleArea.textContent = '⚠️ Request Failed:\\n' + err.message;
        if (statusDot) statusDot.className = 'status-dot error';
        if (statusTag) {
          statusTag.className = 'status-pill error';
          statusTag.innerText = 'Failed';
        }
      } finally {
        if (runBtn) runBtn.disabled = false;
      }
    }

    // Initialize initial lesson on page load (support ?chapter=... URL param)
    window.addEventListener('DOMContentLoaded', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const requestedChapter = urlParams.get('chapter');
      if (requestedChapter && chaptersData[requestedChapter]) {
        selectChapter(requestedChapter);
      } else {
        selectChapter('basic_vars');
      }
    });

    // Make selectChapter available on window for onclick attributes
    window.selectChapter = selectChapter;
    window.filterLessons = filterLessons;
    window.clearLessonSearch = clearLessonSearch;
    window.navigateLesson = navigateLesson;
    window.copyNodeSnippet = copyNodeSnippet;
    window.copyEditorCode = copyEditorCode;
    window.resetEditorCode = resetEditorCode;
    window.clearConsole = clearConsole;
    window.copyConsoleOutput = copyConsoleOutput;
    window.executeGoCode = executeGoCode;
  </script>
</Layout>
"""

with open(os.path.join(pages_dir, 'index.astro'), 'w', encoding='utf-8') as f:
    f.write(index_clean)
print("Updated src/pages/index.astro to dedicated studio page with URL deep linking!")
