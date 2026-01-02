/**
 * API Explorer - Main JavaScript
 * Handles search, filtering, and bookmarks
 */

// ============================================
// State Management
// ============================================
let allAPIs = [];
let filteredAPIs = [];
let bookmarkedIDs = [];
let activeCategory = 'All';
let showBookmarksOnly = false;
let searchQuery = '';

// ============================================
// DOM Elements
// ============================================
const elements = {
    searchInput: document.getElementById('searchInput'),
    categoryPills: document.getElementById('categoryPills'),
    apiGrid: document.getElementById('apiGrid'),
    emptyState: document.getElementById('emptyState'),
    loadingState: document.getElementById('loadingState'),
    totalCount: document.getElementById('totalCount'),
    bookmarkCount: document.getElementById('bookmarkCount'),
    resultCount: document.getElementById('resultCount'),
    showAllBtn: document.getElementById('showAllBtn'),
    showBookmarksBtn: document.getElementById('showBookmarksBtn')
};

// ============================================
// Initialize App
// ============================================
async function init() {
    showLoading(true);
    loadBookmarks();
    await loadAPIs();
    setupEventListeners();
    renderCategories();
    filterAndRender();
    showLoading(false);
    updateStats();
}

// ============================================
// Data Loading
// ============================================
async function loadAPIs() {
    try {
        const response = await fetch('./data/apis.json');
        if (!response.ok) throw new Error('Failed to load APIs');
        allAPIs = await response.json();
        filteredAPIs = [...allAPIs];
    } catch (error) {
        console.error('Error loading APIs:', error);
        showError();
    }
}

// ============================================
// LocalStorage Functions
// ============================================
function loadBookmarks() {
    try {
        const saved = localStorage.getItem('bookmarkedAPIs');
        bookmarkedIDs = saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Error loading bookmarks:', error);
        bookmarkedIDs = [];
    }
}

function saveBookmarks() {
    try {
        localStorage.setItem('bookmarkedAPIs', JSON.stringify(bookmarkedIDs));
    } catch (error) {
        console.error('Error saving bookmarks:', error);
    }
}

function toggleBookmark(apiId) {
    const index = bookmarkedIDs.indexOf(apiId);
    if (index > -1) {
        bookmarkedIDs.splice(index, 1);
    } else {
        bookmarkedIDs.push(apiId);
    }
    saveBookmarks();
    updateStats();
    
    // Update button state
    const btn = document.querySelector(`[data-api-id="${apiId}"]`);
    if (btn) {
        btn.classList.toggle('active');
        btn.textContent = bookmarkedIDs.includes(apiId) ? '★' : '☆';
    }
    
    // Re-filter if showing bookmarks only
    if (showBookmarksOnly) {
        filterAndRender();
    }
}

// ============================================
// Filtering Logic
// ============================================
function filterAndRender() {
    // Start with all APIs
    filteredAPIs = [...allAPIs];
    
    // Filter by category
    if (activeCategory !== 'All') {
        filteredAPIs = filteredAPIs.filter(api => api.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filteredAPIs = filteredAPIs.filter(api => 
            api.name.toLowerCase().includes(query) || 
            api.description.toLowerCase().includes(query) ||
            api.category.toLowerCase().includes(query)
        );
    }
    
    // Filter by bookmarks
    if (showBookmarksOnly) {
        filteredAPIs = filteredAPIs.filter(api => bookmarkedIDs.includes(api.id));
    }
    
    renderAPICards();
    updateResultCount();
}

// ============================================
// Rendering Functions
// ============================================
function renderCategories() {
    // Get unique categories with counts
    const categoryCounts = {};
    allAPIs.forEach(api => {
        categoryCounts[api.category] = (categoryCounts[api.category] || 0) + 1;
    });
    
    const categories = ['All', ...Object.keys(categoryCounts).sort()];
    
    elements.categoryPills.innerHTML = categories.map(cat => {
        const count = cat === 'All' ? allAPIs.length : categoryCounts[cat];
        const isActive = cat === activeCategory ? 'active' : '';
        return `
            <button class="category-pill ${isActive}" data-category="${cat}">
                ${cat}
                <span class="pill-count">${count}</span>
            </button>
        `;
    }).join('');
}

function renderAPICards() {
    if (filteredAPIs.length === 0) {
        elements.apiGrid.innerHTML = '';
        elements.emptyState.classList.add('visible');
        return;
    }
    
    elements.emptyState.classList.remove('visible');
    
    elements.apiGrid.innerHTML = filteredAPIs.map(api => {
        const isBookmarked = bookmarkedIDs.includes(api.id);
        return `
            <article class="api-card">
                <div class="card-header">
                    <h3 class="card-title">${escapeHTML(api.name)}</h3>
                    <button 
                        class="bookmark-btn ${isBookmarked ? 'active' : ''}" 
                        data-api-id="${api.id}"
                        aria-label="${isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}"
                    >
                        ${isBookmarked ? '★' : '☆'}
                    </button>
                </div>
                <span class="card-category">${escapeHTML(api.category)}</span>
                <p class="card-description">${escapeHTML(api.description)}</p>
                <a href="${escapeHTML(api.url)}" target="_blank" rel="noopener noreferrer" class="card-link">
                    View API Docs
                </a>
            </article>
        `;
    }).join('');
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
    // Search input with debounce
    let searchTimeout;
    elements.searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchQuery = e.target.value;
            filterAndRender();
        }, 300);
    });
    
    // Category pills (event delegation)
    elements.categoryPills.addEventListener('click', (e) => {
        const pill = e.target.closest('.category-pill');
        if (!pill) return;
        
        activeCategory = pill.dataset.category;
        
        // Update active state
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        
        filterAndRender();
    });
    
    // Bookmark buttons (event delegation)
    elements.apiGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.bookmark-btn');
        if (!btn) return;
        
        const apiId = btn.dataset.apiId;
        toggleBookmark(apiId);
    });
    
    // Show All button
    elements.showAllBtn.addEventListener('click', () => {
        showBookmarksOnly = false;
        elements.showAllBtn.classList.add('active');
        elements.showBookmarksBtn.classList.remove('active');
        filterAndRender();
    });
    
    // Show Bookmarks button
    elements.showBookmarksBtn.addEventListener('click', () => {
        showBookmarksOnly = true;
        elements.showBookmarksBtn.classList.add('active');
        elements.showAllBtn.classList.remove('active');
        filterAndRender();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Focus search on '/' key
        if (e.key === '/' && document.activeElement !== elements.searchInput) {
            e.preventDefault();
            elements.searchInput.focus();
        }
        // Clear search on Escape
        if (e.key === 'Escape') {
            elements.searchInput.value = '';
            searchQuery = '';
            elements.searchInput.blur();
            filterAndRender();
        }
    });
}

// ============================================
// UI Updates
// ============================================
function updateStats() {
    elements.totalCount.querySelector('.stat-value').textContent = allAPIs.length;
    elements.bookmarkCount.querySelector('.stat-value').textContent = bookmarkedIDs.length;
}

function updateResultCount() {
    elements.resultCount.querySelector('.count-value').textContent = filteredAPIs.length;
}

function showLoading(show) {
    elements.loadingState.classList.toggle('visible', show);
    elements.apiGrid.style.display = show ? 'none' : 'grid';
}

function showError() {
    elements.apiGrid.innerHTML = '';
    elements.emptyState.querySelector('.empty-title').textContent = 'Error Loading APIs';
    elements.emptyState.querySelector('.empty-text').textContent = 'Please check your connection and try again';
    elements.emptyState.classList.add('visible');
}

// ============================================
// Utility Functions
// ============================================
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ============================================
// Start the App
// ============================================
document.addEventListener('DOMContentLoaded', init);
