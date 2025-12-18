# Scrum-Tadimi-Bekkar

This repository contains two separate pieces of work:

- A legacy root-level JavaScript example (`calc.js`, Jest, etc.)
- The main project: **ScrumParty**, a React/Vite "Planning Poker" app with JSDoc documentation and Vitest tests

The instructions below focus on the **ScrumParty** project.

---

## 1. Prerequisites

- **Node.js**: v18+ (CI uses Node 22)
- **npm**: comes with Node

Check your versions:

```bash
node -v
npm -v
```

---

## 2. Project structure (ScrumParty)

```text
Scrum-Tadimi-Bekkar/
  ScrumParty/
    package.json        # Vite + React + Vitest + JSDoc config
    vite.config.js      # Vite + Vitest test configuration
    jsdoc.json          # JSDoc configuration (docs for src/**/*.js|jsx)
    src/
      App.jsx
      main.jsx
      index.css
      context/GameContext.jsx
      components/
        Card.jsx
        PlayerVoteStatus.jsx
      pages/
        Home.jsx
        Setup.jsx
        Game.jsx
        Results.jsx
      setupTests.js     # Vitest + React Testing Library setup
    out/                # (generated) JSDoc HTML output (not needed in git)
```

---

## 3. Installing dependencies

From the repository root:

```bash
cd ScrumParty
npm install
```

This installs all dependencies for the React app, Vitest, Testing Library, and JSDoc.

---

## 4. Running the app locally

From inside `ScrumParty`:

```bash
npm run dev
```

Then open the URL that Vite prints in the terminal, usually:

- `http://localhost:5173/`

You should see the **Planning Poker** home screen.

---

## 5. Running unit tests (ScrumParty only)

The project uses **Vitest** with **React Testing Library**.

From `ScrumParty`:

```bash
npm test
```

This will:

- Run tests under `src/**/*.test.jsx`
- Use a `jsdom` environment
- Load matchers from `@testing-library/jest-dom/vitest` via `src/setupTests.js`

Key test files:

- `src/App.test.jsx` – basic smoke test for the app root
- `src/components/Card.test.jsx` – tests the planning poker card component
- `src/components/PlayerVoteStatus.test.jsx` – tests the vote status panel
- `src/context/GameContext.test.jsx` – tests initial context state

You can also run coverage:

```bash
npm run test:coverage
```

---

## 6. Generating JSDoc documentation

JSDoc is configured to document the **ScrumParty** React code (and ignore the legacy `calc.js`).

From `ScrumParty`:

```bash
npm run docs
```

This uses `jsdoc.json` to:

- Scan `src/**/*.js` and `src/**/*.jsx`
- Generate HTML docs into `../out`

To view the docs locally, open from the repo root:

```bash
cd ..
# in file explorer or browser, open:
out/index.html
```

---

## 7. Running everything from scratch

From a fresh clone:

```bash
git clone https://github.com/soooofiane/Scrum-Tadimi-Bekkar.git
cd Scrum-Tadimi-Bekkar

cd ScrumParty
npm install       # install deps
npm run dev       # start the app
npm test          # run unit tests
npm run docs      # generate JSDoc docs
```
