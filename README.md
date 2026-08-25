# 🚀 Ashraff Mohamed Himas – Modern Developer Portfolio

<div align="center">

  <img src="public/favicon.png" alt="Portfolio Logo" width="80" height="80" />

  <h3>Full-Stack Developer • QA Automation Engineer • DevOps Enthusiast</h3>
  <p>A sleek, interactive, and high-performance developer portfolio built with <strong>React 19</strong>, <strong>Vite</strong>, and <strong>Tailwind CSS v4</strong>.</p>

  <p>
    <a href="https://github.com/Himas04/Portfolio_Mine"><img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repo" /></a>
    <a href="https://linkedin.com/in/ashraff-mohamed-himas"><img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin" alt="LinkedIn" /></a>
    <a href="mailto:himas0406@gmail.com"><img src="https://img.shields.io/badge/Email-Get_in_Touch-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-19.2.8-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/Vite-8.2.2-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4.3.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-13.1.1-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
  </p>

</div>

---

## 📖 Overview

This repository houses the personal portfolio website of **Ashraff Mohamed Himas**, a Computer Science Undergraduate and Full-Stack Developer Intern. It is engineered with a modern **Nordic Glacier** dark aesthetic, dynamic scrollytelling background animations, fluid micro-interactions, and a simulated QA test runner console that showcases end-to-end testing proficiency.

---

## ✨ Features

- **⚡ Blazing Fast Performance:** Powered by Vite 8 and React 19 for instant hot module replacement (HMR) and optimized production bundles.
- **🎨 Nordic Glacier UI Theme:** Tailored dark color palette (`#070D14`, `#38BDF8`, `#7DD3FC`) with glassmorphism cards and smooth border glows.
- **🧭 HUD Navigation & ScrollSpy:** Minimalist sticky navigation bar and floating side HUD with zero-overhead `IntersectionObserver` tracking.
- **🧪 Interactive QA Test Runner Demo:** Live terminal-style testing suite simulator demonstrating automated API & UI testing workflows.
- **💼 Project Showcase & Case Studies:** Filterable project cards with rich modal details, technology tags, and direct repository links.
- **📜 Verified Credentials & Certifications:** Carousel and grid of professional certifications with direct verification links.
- **✨ Micro-Interactions & Ambient FX:** Interactive cursor spotlight, particle background canvas, and confetti celebration effects.
- **📱 Fully Responsive:** Carefully optimized across all viewport breakpoints from mobile devices to ultra-wide displays.

---

## 🛠️ Tech Stack

### **Frontend & Framework**
- **[React 19](https://react.dev/):** Declarative UI components & state management
- **[Vite](https://vite.dev/):** Next-generation frontend build tool
- **[Tailwind CSS v4](https://tailwindcss.com/):** Modern utility-first CSS styling engine

### **Animation & UI Enhancements**
- **[Framer Motion](https://www.framer.com/motion/):** Smooth gesture animations and layout transitions
- **[Lucide React](https://lucide.dev/):** Consistent, high-quality icon set
- **[Canvas Confetti](https://www.npmjs.com/package/canvas-confetti):** Particle celebratory trigger effects

---

## 📂 Project Structure

```text
himas-portfolio/
├── 📁 public/                 # Static assets (favicons, PDFs, resume)
├── 📁 src/
│   ├── 📁 components/        # Reusable UI sections & interactive widgets
│   │   ├── About.jsx          # Bio, background, and stats
│   │   ├── BackgroundCanvas.jsx # Ambient dynamic canvas background
│   │   ├── BrandLogo.jsx      # Custom SVG brand mark
│   │   ├── Certificates.jsx   # Certification gallery & modal viewer
│   │   ├── Contact.jsx        # Contact form, direct links, and social channels
│   │   ├── CursorSpotlight.jsx# Interactive mouse-following light beam
│   │   ├── Education.jsx      # Academic history & milestones
│   │   ├── Experience.jsx     # Professional work & internship timeline
│   │   ├── Footer.jsx         # Footer with quick links & copyright
│   │   ├── Hero.jsx           # Landing intro with animated badges & CTA
│   │   ├── Navbar.jsx         # Fixed HUD header navigation
│   │   ├── ProjectModal.jsx   # Detailed project case study popup
│   │   ├── Projects.jsx       # Filterable projects grid
│   │   ├── Skills.jsx         # Technical stack categorized chips
│   │   └── TestRunnerDemo.jsx # Interactive QA automation terminal
│   ├── 📁 data/
│   │   └── resumeData.js      # Centralized source of truth for portfolio content
│   ├── 📁 utils/              # Helper utilities (smooth scrolling, etc.)
│   ├── App.jsx                # Main application component & section wiring
│   ├── index.css              # Global styling & Tailwind directives
│   └── main.jsx               # React DOM entry point
├── index.html                 # Main HTML template with SEO meta tags
├── package.json               # Dependencies and build scripts
├── tailwind.config.js         # Tailwind configuration
└── vite.config.js             # Vite configuration
```

---

## 🚀 Getting Started

Follow these steps to run the portfolio locally on your machine.

### **Prerequisites**
Ensure you have [Node.js](https://nodejs.org/) (version 18 or newer) installed.

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Himas04/Portfolio_Mine.git
   cd Portfolio_Mine
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` to preview the site.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## ⚙️ Customization

All portfolio data (personal details, projects, skills, certificates, and work history) is managed in a single structured configuration file:

📁 **[`src/data/resumeData.js`](src/data/resumeData.js)**

To customize:
1. Update `personal` object for contact information, headline, and social links.
2. Edit `experience` and `education` arrays to reflect your career path.
3. Add or update items in `projects` with your latest live demos and repositories.
4. Add new certifications to the `certificates` array.

---

## 👤 Author

**Ashraff Mohamed Himas**
- **Portfolio / GitHub:** [@Himas04](https://github.com/Himas04)
- **LinkedIn:** [ashraff-mohamed-himas](https://linkedin.com/in/ashraff-mohamed-himas)
- **Email:** [himas0406@gmail.com](mailto:himas0406@gmail.com)
- **Location:** Colombo, Sri Lanka

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.
