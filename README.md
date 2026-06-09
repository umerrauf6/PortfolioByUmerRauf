<div align="center">

# 🚀 Umer Rauf — Interactive 3D Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/placeholder/deploy-status)](https://umer-rauf-portfolio.netlify.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?logo=threedotjs)](https://threejs.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)

**[🌐 Live Demo](https://umer-rauf-portfolio.netlify.app)** · **[📧 Contact](mailto:umerrauf6@gmail.com)** · **[💼 LinkedIn](https://linkedin.com/in/umer-rauf-953689176)**

*A cyberpunk-inspired, fully 3D interactive developer portfolio built with React, Three.js, and Framer Motion.*

</div>

---

## 👤 About Me

**Umer Rauf** is a Full-Stack Developer and M.Sc. Computer Science student at the University of Siegen, Germany. With 1+ year of professional experience building B2B web applications, I specialize in React, TypeScript, Node.js, and LLM API integrations.

| Detail | Info |
|---|---|
| 📍 Location | Siegen, Germany |
| 🎓 Education | M.Sc. Computer Science — University of Siegen (2024–2026) |
| 💼 Experience | Associate Software Engineer — Allied Consultants (2023–2024) |
| 📧 Email | umerrauf6@gmail.com |
| 📞 Phone | +49 172 591 4540 |
| 🌐 Portfolio | [umer-rauf-portfolio.netlify.app](https://umer-rauf-portfolio.netlify.app) |

---

## ✨ Portfolio Features

### 🎮 3D Interactive Design
- **Hero**: Wireframe icosahedron core + 3 orbiting rings (cyan/purple/pink) + 10 floating crystal octahedra + animated grid floor + 3,500-particle field
- **Skills**: Spinning wireframe 3D gem per skill category with glowing emissive core
- **About**: Floating 3D geometric shape in background
- **Projects**: 3D floating laptop mockup screens with perspective tilt
- **Contact**: Animated 3D sphere/ring element
- **Footer**: Ambient particle effect

### 🎨 Visual Aesthetic
- Dark cyberpunk theme (`#05050f` background)
- Subtle cyan grid lines throughout the page
- Barely-visible scanline texture
- **Octagonal clip-path** cards (game HUD style)
- Corner bracket decorators with hover expand
- Holographic neon borders
- Framer Motion scroll-triggered animations
- Glassmorphism panels with backdrop blur

### ⚡ Performance
- Built with Vite 8 for instant HMR
- React Three Fiber for declarative 3D
- All 3D components use `useFrame` (60fps R3F loop)
- Code-split Three.js bundle
- Smooth 60fps animations throughout

---

## 🛠 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss&logoColor=white)

### 3D & Animation
![Three.js](https://img.shields.io/badge/Three.js-black?logo=threedotjs)
![React Three Fiber](https://img.shields.io/badge/@react--three/fiber-8-black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-white?logo=framer)

### Professional Skills
| Category | Technologies |
|---|---|
| **Frontend** | React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS |
| **Backend** | Node.js, NestJS, REST APIs, Express, MongoDB, PostgreSQL |
| **AI & Tools** | LLM APIs, GitHub Copilot, Claude Code, Git, Agile/Scrum, CI/CD |
| **Languages** | English (C1), German (A2) |

---

## 🏗 Project Structure

```
umer-rauf-portfolio/
├── public/
│   └── favicon.svg            # Custom gradient SVG icon
├── src/
│   ├── components/
│   │   ├── Navbar.tsx         # Glassmorphic sticky nav
│   │   ├── Hero.tsx           # 3D particle + wireframe scene
│   │   ├── About.tsx          # Timeline + certifications + 3D bg
│   │   ├── Skills.tsx         # 3D gem skill cards
│   │   ├── Projects.tsx       # 3D floating mockup screens
│   │   ├── Contact.tsx        # Contact form + 3D sphere
│   │   └── Footer.tsx         # Social links + ambient particles
│   ├── App.tsx                # Root layout, ambient orbs
│   ├── index.css              # Global styles, design tokens
│   └── main.tsx               # React entry point
├── index.html                 # Entry HTML with meta tags
├── tailwind.config.js         # Custom Tailwind config
├── vite.config.ts             # Vite build config
└── tsconfig.json              # TypeScript config
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/umerrauf6/PortfolioByUmerRauf.git
cd PortfolioByUmerRauf

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is in the `dist/` folder. Deploy to Netlify by dragging the `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop).

---

## 📦 Deployment

This portfolio is deployed on **Netlify** with automatic deploys from the `main` branch.

To deploy manually:
1. Run `npm run build`
2. Drag `dist/` to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Or use the Netlify CLI: `npx netlify-cli deploy --prod --dir dist`

---

## 📬 Contact

| Channel | Link |
|---|---|
| 📧 Email | [umerrauf6@gmail.com](mailto:umerrauf6@gmail.com) |
| 💼 LinkedIn | [linkedin.com/in/umer-rauf-953689176](https://linkedin.com/in/umer-rauf-953689176) |
| 🐙 GitHub | [github.com/umerrauf6](https://github.com/umerrauf6) |
| 🌐 Portfolio | [umer-rauf-portfolio.netlify.app](https://umer-rauf-portfolio.netlify.app) |
| 📞 Phone | +49 172 591 4540 |

---

<div align="center">

Built with ❤️ by **Umer Rauf** · React · Three.js · Framer Motion

</div>
