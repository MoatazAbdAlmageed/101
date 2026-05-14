import './style.css'
import { createIcons, Menu, X, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide'
import { marked } from 'marked'
import hljs from 'highlight.js'

// Initialize Lucide icons
createIcons({
  icons: {
    Menu, X, Sun, Moon, ChevronLeft, ChevronRight
  }
})

const CHAPTERS = [
  { id: 'introduction', title: 'Introduction', file: '01-introduction.md' },
  { id: 'setup', title: 'Setup & Environment', file: '02-setup.md' },
  { id: 'basics', title: 'Variables & Data Types', file: '03-basics.md' },
  { id: 'control-flow', title: 'Control Flow', file: '04-control-flow.md' },
  { id: 'functions', title: 'Functions', file: '05-functions.md' },
  { id: 'data-structures', title: 'Data Structures', file: '06-data-structures.md' },
  { id: 'final-project', title: 'Hero Project', file: '07-final-project.md' },
]

let currentChapterIndex = 0

const tocContainer = document.getElementById('toc')
const contentArea = document.getElementById('markdown-content')
const breadcrumb = document.getElementById('breadcrumb')
const prevBtn = document.getElementById('prev-btn')
const nextBtn = document.getElementById('next-btn')
const sidebar = document.getElementById('sidebar')
const menuToggle = document.getElementById('menu-toggle')

// Configure Marked
const renderer = new marked.Renderer();
marked.setOptions({
  renderer: renderer,
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartypants: false,
  xhtml: false
});

function initTOC() {
  tocContainer.innerHTML = CHAPTERS.map((chapter, index) => `
    <div class="toc-item ${index === 0 ? 'active' : ''}" data-index="${index}">
      ${index + 1}. ${chapter.title}
    </div>
  `).join('')

  tocContainer.querySelectorAll('.toc-item').forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.index)
      loadChapter(index)
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open')
      }
    })
  })
}

async function loadChapter(index) {
  if (index < 0 || index >= CHAPTERS.length) return

  currentChapterIndex = index
  const chapter = CHAPTERS[index]

  // Update UI
  breadcrumb.textContent = chapter.title
  document.querySelectorAll('.toc-item').forEach((item, i) => {
    item.classList.toggle('active', i === index)
  })

  // Update buttons
  prevBtn.disabled = index === 0
  nextBtn.disabled = index === CHAPTERS.length - 1

  // Fetch and render
  try {
    const response = await fetch(`/content/${chapter.file}`)
    const markdown = await response.text()
    contentArea.innerHTML = marked.parse(markdown)
    
    // Highlight code blocks
    contentArea.querySelectorAll('pre code').forEach((el) => {
      hljs.highlightElement(el)
    })

    // Scroll to top
    window.scrollTo(0, 0)
    
    // Update URL hash without jumping
    history.pushState(null, null, `#${chapter.id}`)
  } catch (error) {
    console.error('Error loading chapter:', error)
    contentArea.innerHTML = '<h1>Error</h1><p>Failed to load content. Please try again.</p>'
  }
}

// Event Listeners
prevBtn.addEventListener('click', () => loadChapter(currentChapterIndex - 1))
nextBtn.addEventListener('click', () => loadChapter(currentChapterIndex + 1))

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open')
})

// Initialize
initTOC()

// Handle initial route
const hash = window.location.hash.slice(1)
const initialIndex = CHAPTERS.findIndex(c => c.id === hash)
loadChapter(initialIndex !== -1 ? initialIndex : 0)
