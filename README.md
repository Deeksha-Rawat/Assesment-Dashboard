# Aspire Dashboard (React + TypeScript + Vite)

A responsive dashboard UI (desktop + mobile) built with React 19, TypeScript, Tailwind CSS, and Vite.

## Prerequisites

- Node.js 18+ recommended
- npm (comes with Node)

## Setup

```bash
npm install
```

## Run the app (development)

```bash
npm run dev
```

Vite prints the local URL in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

The production build is generated in `dist/`.

## Preview the production build locally

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## How to use the app

- **Card carousel**: swipe/drag between cards (mobile + desktop)
- **New card**: click “New card” and submit a name to add a new card
- **Freeze / Unfreeze**: toggles the selected card’s frozen state
- **Cancel card**: removes the selected card and updates the UI
- **Transactions panel**: shows card details and recent transactions sections

## Data persistence

- Cards are stored in `localStorage` under the key `cards`.
- Actions like add / freeze / cancel update `localStorage` immediately.
