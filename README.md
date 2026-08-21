<<<<<<< HEAD
```markdown
=======

>>>>>>> a387584a7407d336e9d796cf724f3b2c12a451e9
# ⚡ NAVI TALIB // MERN STACK PORTFOLIO HUD

<div align="center">

  ![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=black)
  ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![License](https://img.shields.io/badge/License-MIT-00E5FF?style=for-the-badge)

  <p align="center">
    <b>A high-performance, responsive Cyberpunk / Sci-Fi HUD portfolio built with React & Tailwind CSS.</b>
    <br />
    Includes an interactive Matrix Rain canvas background, mouse-tracking spotlight effects, project filter tabs, and full responsiveness.
  </p>

</div>

---

## 🚀 System Features

* **Matrix Digital Rain Engine**: Custom HTML5 Canvas matrix rain background with Katakana, numerical, and cyber character streams (includes ON/OFF toggle).
* **Interactive Spotlight HUD**: Dynamic mouse-tracking gradient lighting and animated cyber scanlines.
* **Modular Portfolio Architecture**: Categorized technical capabilities, filtered project showcases, and a social network hub.
* **Resume/CV Dispatch**: Direct links to view/download PDF credentials from both header navigation and hero action bars.
* **Responsive HUD Navigation**: Mobile-friendly navigation drawer with animated state toggles.

---

## 🛠️ Tech Stack

- **Framework**: [React.js](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons & Graphics**: HTML5 Canvas (Matrix Simulation) & Custom SVG Elements
- **Build Tool**: [Vite](https://vitejs.dev/)

---

## 📦 Project Directory Structure

```text
├── public/
│   └── resume.pdf            # Resume file accessed by GET_CV links
├── src/
│   ├── assets/
│   │   └── navi_t_pr.png     # Profile Image asset
│   ├── App.jsx               # Main HUD Component & Matrix Engine
│   ├── main.jsx              # Application Entry Point
│   └── index.css             # Global Styles & Custom Animations
├── package.json
└── README.md

```

---

## 💻 Local Setup & Deployment

### Prerequisites

Make sure you have **Node.js** (v16+ recommended) and **npm** installed on your machine.

### Installation Steps

1. **Clone the repository**
```bash
git clone [https://github.com/NaviTalib/your-repo-name.git](https://github.com/NaviTalib/your-repo-name.git)
cd your-repo-name

```


2. **Install dependencies**
```bash
npm install

```


3. **Configure static assets**
* Place your profile picture in `src/assets/navi_t_pr.png`.
* Place your resume PDF in `public/resume.pdf`.


4. **Launch local development server**
```bash
npm run dev

```



---

## 🎨 Customizing TailWind Animations

Ensure your `tailwind.config.js` includes the following animations for the scanline and ticker tape effects:

```javascript
module.exports = {
  theme: {
    extend: {
      animation: {
        scanline: 'scanline 8s linear infinite',
        scrollText: 'scrollText 25s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        scrollText: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
};

```

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more details.
