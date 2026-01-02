# 🚀 API Explorer

A sleek, developer-focused web application to discover, search, and bookmark APIs from a curated mega list.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 📋 Project Description

**API Explorer** is a modern, responsive web application that serves as a catalog for discovering useful APIs. It features a dark "hacker" theme with terminal-inspired aesthetics, making it perfect for developers who appreciate clean, functional design.

> **📚 Data Source:** This project features a curated selection of **175 APIs** from the [API Mega List](https://github.com/cporter202/API-mega-list) repository, which contains **10,498+ production-ready APIs**. We've hand-picked the most popular and useful APIs across 16 categories for easy discovery.

The application allows users to:
- Browse a curated collection of 175+ production-ready APIs
- Search and filter APIs in real-time
- Organize APIs by 16 categories
- Bookmark favorite APIs with persistent storage

---

## ✨ Features

### 🔍 Search & Filter
- **Real-time search** with debounced input
- Search by API name, description, or category
- Instant results as you type
- Keyboard shortcut: Press `/` to focus search

### 📂 Category Browsing
- **16 categories**: Weather, Finance, AI, News, Utilities, Social Media, Entertainment, Developer Tools, Data & Analytics, Maps & Location, API Marketplaces, Automation, Payments, Cloud Services, Authentication, Food & Recipes, Travel, Sports
- Dynamic category pills with item counts
- One-click category filtering
- Combine search with category filters

### ⭐ Favorites & Bookmarks
- Click the star to bookmark any API
- **localStorage persistence** - bookmarks survive browser refresh
- "Bookmarks Only" filter to view saved APIs
- Real-time bookmark counter in header

### 🎨 Developer/Hacker Theme
- Deep black background with matrix-green accents
- Monospace typography (JetBrains Mono)
- Terminal-inspired UI elements
- Subtle grid pattern and scanline effects
- Smooth hover animations with glow effects

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure and accessibility |
| **CSS3** | Custom properties, Grid, Flexbox, animations |
| **Vanilla JavaScript** | DOM manipulation, fetch API, localStorage |
| **Google Fonts** | JetBrains Mono typography |

**No frameworks or dependencies** - pure HTML, CSS, and JavaScript!

---

## 🚀 How to Run Locally

### Option 1: VS Code Live Server (Recommended)

1. **Clone or download** this repository
2. **Open** the folder in VS Code
3. **Install** the "Live Server" extension (if not already installed)
4. **Right-click** on `index.html` → "Open with Live Server"
5. The app will open at `http://127.0.0.1:5500`

### Option 2: Python Simple Server

```bash
# Navigate to project folder
cd "API Explorer Web App"

# Python 3
python -m http.server 8000

# Open http://localhost:8000 in your browser
```

### Option 3: Node.js (npx)

```bash
# Navigate to project folder
cd "API Explorer Web App"

# Use npx serve
npx serve

# Open the URL shown in terminal
```

### Option 4: Direct File Open

Simply double-click `index.html` to open in your browser.

> ⚠️ Note: Some browsers may block the JSON fetch when opening directly. Use a local server for best results.

---

## 📁 Project Structure

```
API Explorer Web App/
├── index.html          # Main HTML structure
├── styles.css          # Developer/hacker dark theme
├── script.js           # Core application logic
├── README.md           # Project documentation
└── data/
    └── apis.json       # Curated API database (65+ APIs)
```

---

## 🔮 Future Improvements

- [ ] **API Testing Playground** - Make live API requests from the app
- [ ] **Dark/Light Mode Toggle** - Theme switcher for accessibility
- [ ] **Export Bookmarks** - Download saved APIs as JSON
- [ ] **API Submit Form** - Allow users to suggest new APIs
- [ ] **Pagination/Infinite Scroll** - Handle larger datasets
- [ ] **Search History** - Remember recent searches
- [ ] **Detailed API Pages** - Individual pages with more info
- [ ] **Rate Limit Indicators** - Show API pricing/limits
- [ ] **Social Sharing** - Share favorite APIs on social media
- [ ] **PWA Support** - Install as a Progressive Web App

---

## 📊 Categories

| Category | Count | Description |
|----------|-------|-------------|
| AI | 15 | Machine learning and AI services |
| Automation | 10 | Workflow automation and productivity |
| Authentication | 4 | Identity and access management |
| Cloud Services | 8 | Cloud infrastructure and platforms |
| Data & Analytics | 16 | Statistics, demographics, and data |
| Developer Tools | 14 | GitHub, npm, testing tools |
| Entertainment | 18 | Movies, games, music, and jokes |
| Finance | 10 | Stocks, crypto, and currency data |
| Food & Recipes | 5 | Recipes and nutrition data |
| Maps & Location | 10 | Geocoding and mapping services |
| News | 8 | News aggregation and headlines |
| Payments | 6 | Payment processing and fintech |
| Social Media | 12 | Twitter, Discord, Reddit, and more |
| Sports | 4 | Sports data and statistics |
| Travel | 5 | Flights, hotels, and travel |
| Utilities | 20 | Email, images, QR codes, and more |
| Weather | 8 | Weather forecasts and conditions |
| API Marketplaces | 4 | API discovery platforms |

**Total: 175 curated APIs** from 10,498+ available in the source

---

## 🙏 Credits

- API data sourced from [API Mega List](https://github.com/cporter202/API-mega-list)
- Font: [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with 💚 using HTML, CSS & JavaScript
</p>
