# Diwa (v1.0)

**The official website for the Diwa Ecosystem.**
Live at: [https://diwa.one](https://diwa.one)

> "Ang wika ang kaluluwa ng bansa" — Language is the soul of a nation.
> **Memory is the soul of AI systems.**

## 🌟 The Diwa Ecosystem

Diwa provides persistent memory infrastructure for AI-powered development. It works with any MCP-compatible tool (Claude, Cursor, Windsurf) to solve the "amnesia problem" of modern AI coding assistants.

### Core Products

1.  **DIWA (The Foundation)**
    *   **Status:** Available Now (Open Source / MIT)
    *   **Description:** The core memory infrastructure. A self-hosted Model Context Protocol (MCP) server that gives your AI tools persistent memory. Works across sessions, restarts, and tools.

2.  **Command Center (TANAW)**
    *   **Status:** Coming Q2 2026
    *   **Description:** A visual dashboard to "see" your AI's memory. Manage project contexts, review decision logs, and curate team knowledge graphically.

3.  **Agent Runtime (SINAG)**
    *   **Status:** Coming Q3 2026
    *   **Description:** A BEAM-inspired runtime for autonomous AI agents. Run persistent agents with built-in supervision trees, fault tolerance, and automatic recovery.

4.  **Enterprise Platform**
    *   **Status:** Coming Q4 2026
    *   **Description:** The OS-level "kernel" for AI. Provides enterprise-grade security, SSO/SAML, audit logs, and global state management for large organizations.

---

## 🛠 Tech Stack

This website is built with:
-   **Framework:** React 19 + Vite
-   **Styling:** Tailwind CSS 4.0 (Vanilla CSS configuration)
-   **Icons:** Lucide React
-   **Deployment:** Netlify (SPA Routing configured)

## 🚀 Running Locally

1.  **Clone the repository**
    ```bash
    git clone https://github.com/diwahq/diwa-web.git
    cd diwa-web
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

## 📦 Deployment

The project is configured for **Netlify** with a `netlify.toml` file to handle SPA routing (redirecting `/*` to `/index.html`).

**Netlify Forms** are used for:
-   **Waitlist:** Captures email, role, and team size.
-   **Enterprise Contact:** Captures detailed lead information.

These forms are defined in `index.html` (hidden) and submitted via `fetch` in the React application.

---

© 2026 Diwa. Built in the Philippines, for the world.
