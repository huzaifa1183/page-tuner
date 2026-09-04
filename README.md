# 📖 PageTurner

PageTurner is a front-end web app for discovering your next great book. It ships with a curated library of 100+ titles that you can filter by genre, mood, and rating, search by title or author, and sort however you like — plus a simple sign-up/login flow so your preferences are remembered across visits.

**Live in this repo:** [`pageturner/`](./pageturner)

## ✨ Features

- **Book discovery** — Browse a built-in database of 100+ books spanning Fiction, Fantasy, Thriller, Romance, Self-Help, Sci-Fi, Historical, Mystery, Biography, Horror, Philosophy, and Classics.
- **Smart filtering** — Filter by genre, mood (Happy, Dark, Adventure, Suspenseful, etc.), and minimum star rating.
- **Search & sort** — Search by title or author, and sort results by title, author, or highest rating.
- **Book details modal** — Click any book to see a full synopsis in a modal window.
- **Pagination** — Results are paginated for easy browsing.
- **Authentication (demo)** — Register and log in with a two-step sign-up form (including a live password-strength meter), session persistence, and a "remember me" option.
- **Dark / light mode** — Toggle themes, with your preference saved for next time.
- **Fully responsive** — Built with vanilla HTML, CSS, and JavaScript — no frameworks or build step required.

## 🗂️ Project Structure

```
pageturner/
├── index.html      # Main app — hero, filters, book grid, modal
├── login.html       # Login page
├── register.html    # Registration page (two-step form)
├── script.js         # Book database, filtering/sorting/search, pagination, modal logic
├── auth.js            # Login/registration handling, theme toggle, session management
└── style.css           # All app styling (dark/light themes included)
```

## 🚀 Getting Started

No build tools, dependencies, or server required — it's a static site.

1. **Clone the repository**
   ```bash
   git clone https://github.com/huzaifa1183/page-tuner.git
   cd page-tuner/pageturner
   ```

2. **Open it in your browser**
   - Simply double-click `index.html`, **or**
   - Serve it locally for the best experience (recommended, since some browsers restrict local file access):
     ```bash
     # Using Python
     python3 -m http.server 8000

     # Using Node.js (npx)
     npx serve .
     ```
   - Then visit `http://localhost:8000` in your browser.

## 🧭 Usage

1. Open `index.html` to browse the book catalog.
2. Use the **Genre**, **Mood**, **Min Rating**, and **Search** filters — or the **Sort By** dropdown — to narrow down results, then click **Recommend Books**.
3. Click any book card to view its full summary in a modal.
4. Click **Sign In** to create an account (`register.html`) or log in (`login.html`). Once signed in, your session and favorite genre are remembered.
5. Toggle the ☀️ / 🌙 icon in the header to switch between dark and light mode.

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (custom properties for theming, no CSS framework)
- **Vanilla JavaScript** (ES6+, no external JS frameworks)
- **Google Fonts** — Playfair Display & DM Sans
- **Open Library Covers API** — used for book cover images

## ⚠️ Notes

- Authentication is implemented client-side using `localStorage`/`sessionStorage` for demo purposes only. Passwords are stored in plain text in the browser — **do not use this as-is in production** or with real user credentials.
- All book data is static and hardcoded in `script.js`; there is no backend or database.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request with improvements — additional books, new filters, accessibility fixes, or a real backend for authentication are all great places to start.

## 📄 License

No license file is currently included in this repository. Consider adding one (e.g., MIT) to clarify how others can use this project.
