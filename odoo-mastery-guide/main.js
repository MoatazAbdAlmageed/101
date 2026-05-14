import './style.css';
import { createIcons, Menu, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide';

import { marked } from 'marked';
import hljs from 'highlight.js';

// Configuration
const chapters = [
  { id: 'introduction', title: '01. Introduction', file: '01-introduction.md' },
  { id: 'installation', title: '02. Installation', file: '02-installation.md' },
  { id: 'core-concepts', title: '03. Core Concepts', file: '03-core-concepts.md' },
  { id: 'implementation', title: '04. Implementation', file: '04-implementation.md' },
  { id: 'development', title: '05. Development Intro', file: '05-development-intro.md' },
];

let currentChapterIndex = 0;

// Initialize Lucide Icons
function initIcons() {
  createIcons({
    icons: { Menu, Sun, Moon, ChevronLeft, ChevronRight }
  });
}

// Render TOC
function renderTOC() {
  const toc = document.getElementById('toc');
  toc.innerHTML = chapters.map((chapter, index) => `
    <div class="toc-item ${index === currentChapterIndex ? 'active' : ''}" data-index="${index}">
      ${chapter.title}
    </div>
  `).join('');

  document.querySelectorAll('.toc-item').forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.index);
      loadChapter(index);
    });
  });
}

// Load Chapter
async function loadChapter(index) {
  if (index < 0 || index >= chapters.length) return;
  
  currentChapterIndex = index;
  const chapter = chapters[index];
  
  // Update UI
  renderTOC();
  document.getElementById('breadcrumb').textContent = chapter.title;
  
  const contentArea = document.getElementById('markdown-content');
  contentArea.innerHTML = '<div class="loading">Loading chapter...</div>';

  try {
    const response = await fetch(`/content/${chapter.file}`);
    if (!response.ok) throw new Error('Failed to load content');
    const markdown = await response.text();
    
    // Parse Markdown
    contentArea.innerHTML = marked.parse(markdown);
    
    // Highlight Code
    contentArea.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });

    // Update Navigation Buttons
    updateNavButtons();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Handle internal links (links to other chapters)
    contentArea.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetChapter = chapters.find(c => c.id === href || c.file.includes(href));
          if (targetChapter) {
            loadChapter(chapters.indexOf(targetChapter));
          }
        });
      }
    });

  } catch (error) {
    contentArea.innerHTML = `<div class="error">Error: ${error.message}</div>`;
  }
}

function updateNavButtons() {
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  prevBtn.disabled = currentChapterIndex === 0;
  nextBtn.disabled = currentChapterIndex === chapters.length - 1;
}

// Event Listeners
document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentChapterIndex > 0) loadChapter(currentChapterIndex - 1);
});

document.getElementById('next-btn').addEventListener('click', () => {
  if (currentChapterIndex < chapters.length - 1) loadChapter(currentChapterIndex + 1);
});

document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  loadChapter(0);
});
