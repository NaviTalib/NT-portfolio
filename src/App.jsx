import profileImage from './assets/navi_t_pr.png';
import ntResume from './assets/resume.pdf';
import React, { useState, useEffect, useRef } from 'react';

// Matrix Digital Rain Background Component
function MatrixRain({ isRunning }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters: Katakana, Numbers, Cyber Characters
    const chars = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789ABCDEF<>[]{}/*+=~#$_';
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);

    // Track drop Y positions for each column
    let drops = Array(columns).fill(1);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      // Semi-transparent black fill to leave trailing fading effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fontSize = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = chars.charAt(Math.floor(Math.random() * chars.length));

        // Highlight head char with cyan/white, trail with emerald/cyan
        const isHead = Math.random() > 0.85;
        ctx.fillStyle = isHead ? '#67e8f9' : '#06b6d4';

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop to top randomly once it passes screen height
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      if (isRunning) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    if (isRunning) {
      draw();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRunning]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-25"
    />
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [matrixActive, setMatrixActive] = useState(true);

  // Social Profile Configuration
  const socialLinks = [
    { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/navi-talib-107b55203/', icon: 'in' },
    { label: 'UPWORK', url: 'https://www.upwork.com/freelancers/~01d8be7e856b84373e?mp_source=share', icon: 'up' },
    { label: 'GITHUB', url: 'https://github.com/NaviTalib/', icon: 'gh' }
  ];

  // Mouse tracking for interactive spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth Scroll Helper
  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyContact = () => {
    navigator.clipboard.writeText('navit30009@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const skills = [
    { category: 'Frontend Engine', items: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Redux Toolkit', 'HTML5/CSS3'] },
    { category: 'Backend System', items: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Auth', 'Middleware'] },
    { category: 'Data Architecture', items: ['MongoDB', 'Mongoose', 'MySQL', 'Schema Design'] },
    { category: 'DevOps & Tooling', items: ['Git / GitHub', 'Postman', 'Vite', 'Vercel', 'NPM / Yarn'] }
  ];

  const projects = [
    {
      title: 'Full-Stack E-Commerce Platform',
      category: 'fullstack',
      description: 'End-to-end MERN architecture with real-time state management, JWT security, and admin telemetry dashboard.',
      tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Tailwind'],
      github: '#',
      demo: '#'
    },
    {
      title: 'RESTful API & Auth Gateway',
      category: 'backend',
      description: 'High-concurrency backend engine with role-based access control (RBAC) and automated error handling pipelines.',
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Postman'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Interactive Dashboard HUD',
      category: 'frontend',
      description: 'Responsive frontend interface featuring dynamic chart visualization, theme toggles, and state persistence.',
      tech: ['React', 'Tailwind CSS', 'Redux Toolkit', 'Vite'],
      github: '#',
      demo: '#'
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  const tickerText = "// SYSTEM STATUS: ONLINE • MATRIX ANIMATION ACTIVE • MERN PROTOCOL • FULL STACK ARCHITECTURE • ";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Dynamic Matrix Rain Canvas */}
      <MatrixRain isRunning={matrixActive} />

      {/* Interactive Mouse Glow Light */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.08), transparent 80%)`
        }}
      />

      {/* Cyber Grid Background & Scanning Line */}
      <div className="fixed inset-0 bg-cyber-grid pointer-events-none z-0"></div>
      <div className="fixed inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 animate-scanline pointer-events-none z-0"></div>

      {/* Glowing Backdrop Lights */}
      <div className="fixed top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Navigation HUD */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/30 py-3 shadow-[0_4px_25px_rgba(6,182,212,0.15)]' 
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center relative z-10">
          
          {/* Animated Hex Logo */}
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="relative group flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500 rounded rotate-45 opacity-20 group-hover:opacity-60 transition-all duration-500 group-hover:rotate-90 shadow-[0_0_15px_#06b6d4]"></div>
              <div className="absolute inset-[1px] bg-slate-950 rounded rotate-45"></div>
              <span className="relative z-10 font-black text-cyan-400 text-sm tracking-wider group-hover:scale-110 transition-transform">NT</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-widest text-slate-100 group-hover:text-cyan-400 transition-colors uppercase">
                Navi Talib
              </span>
              <span className="text-[10px] text-cyan-500/80 tracking-tighter">DEV_ID // MERN_01</span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 text-xs tracking-wider">
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, item.toLowerCase())}
                className="relative text-slate-400 hover:text-cyan-400 transition-colors py-1 group uppercase"
              >
                <span className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors mr-1">&gt;</span>
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_#06b6d4] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}

            {/* Matrix Animation Toggle Button */}
            <button
              onClick={() => setMatrixActive(!matrixActive)}
              className="text-[10px] px-3 py-1.5 rounded border border-cyan-500/30 bg-slate-900/60 hover:border-cyan-400 text-cyan-400 transition flex items-center gap-1.5"
            >
              <span className={`w-2 h-2 rounded-full ${matrixActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></span>
              MATRIX: {matrixActive ? 'ON' : 'OFF'}
            </button>

            {/* Download / View CV Button */}
            <a 
              href={ntResume} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative px-4 py-2 text-xs font-bold text-emerald-400 border border-emerald-500/50 bg-emerald-950/20 rounded hover:bg-emerald-500 hover:text-slate-950 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-300 flex items-center gap-1.5 active:scale-95 uppercase tracking-wider"
            >
              <span>GET_CV</span>
              <span className="text-[10px]">⤓</span>
            </a>

            {/* Action Trigger Button */}
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="relative px-5 py-2.5 text-xs font-bold text-cyan-400 border border-cyan-500/50 bg-cyan-950/30 rounded hover:bg-cyan-500 hover:text-slate-950 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300 active:scale-95 uppercase tracking-widest"
            >
              INITIALIZE_COMM
            </a>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-cyan-400 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-cyan-400 rounded transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-cyan-400 rounded transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-cyan-400 rounded transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 bg-slate-950/95 border-b border-cyan-500/30 backdrop-blur-xl ${
            mobileMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
          }`}
        >
          <div className="flex flex-col gap-4 px-6 text-xs uppercase tracking-wider">
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, item.toLowerCase())}
                className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <span className="text-cyan-500">&gt;</span> {item}
              </a>
            ))}

            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2 font-bold py-1 border-t border-slate-800 pt-3"
            >
              <span className="text-emerald-500">⤓</span> DOWNLOAD_CV [PDF]
            </a>

            <button
              onClick={() => setMatrixActive(!matrixActive)}
              className="text-[10px] px-3 py-2 rounded border border-cyan-500/30 bg-slate-900/60 text-cyan-400 w-fit flex items-center gap-2"
            >
              <span className={`w-2 h-2 rounded-full ${matrixActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></span>
              MATRIX RAIN: {matrixActive ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="relative z-10">
        
        {/* Ticker Banner */}
        <div className="absolute top-28 left-0 w-full overflow-hidden bg-slate-900/60 border-y border-cyan-500/20 py-2.5 z-0">
          <div className="animate-scrollText text-cyan-400 text-xs font-bold tracking-widest text-glow-cyan">
            {tickerText.repeat(8)}
          </div>
        </div>

        {/* Hero Section */}
        <section id="about" className="pt-52 pb-20 px-6 max-w-6xl mx-auto min-h-screen flex flex-col justify-center scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/40 bg-cyan-950/40 text-cyan-400 text-xs tracking-wider mb-6 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                SYSTEM: ONLINE
              </div>
              
              <h1 className="text-5xl sm:text-7xl font-black text-slate-100 tracking-tight mb-3 uppercase leading-none">
                Navi Talib
              </h1>
              
              <h2 className="text-xl sm:text-3xl font-semibold text-cyan-400 mb-6 tracking-wide">
                FULL STACK <span className="text-emerald-400 text-glow-emerald">[MERN]</span> DEVELOPER
              </h2>
              
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                Engineered for full-stack precision using MongoDB, Express.js, React, and Node.js. Dedicated to constructing high-efficiency REST APIs and fluid web interfaces.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <a 
                  href="#projects" 
                  onClick={(e) => scrollToSection(e, 'projects')}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase px-6 py-3.5 rounded shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] transition duration-300"
                >
                  EXECUTE_PROJECTS
                </a>

                {/* Cyberpunk CV Download Button in Hero */}
                <a 
                  href={ntResume}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-emerald-500/60 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-bold text-xs uppercase px-6 py-3.5 rounded shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transition duration-300 flex items-center gap-2"
                >
                  <span>FETCH_CV</span>
                  <span>⤓</span>
                </a>

                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="border border-slate-700 hover:border-cyan-500/60 bg-slate-900/50 text-slate-300 hover:text-cyan-400 font-semibold text-xs uppercase px-6 py-3.5 rounded transition duration-300"
                >
                  INITIATE_CONTACT
                </a>
              </div>

              {/* Social Profiles Chips */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/80 w-full max-w-xl">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest mr-2">// NETWORK:</span>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/50 bg-slate-900/40 px-3 py-1.5 rounded transition flex items-center gap-1.5 uppercase"
                  >
                    <span className="text-cyan-500 text-[10px]">&gt;</span>
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Profile Frame */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative group w-64 h-64 sm:w-80 sm:h-80">
                
                {/* HUD Corner Accents */}
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400 z-20 group-hover:scale-110 transition-transform"></div>
                <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400 z-20 group-hover:scale-110 transition-transform"></div>
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-400 z-20 group-hover:scale-110 transition-transform"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400 z-20 group-hover:scale-110 transition-transform"></div>

                {/* Animated Outer Glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded blur-md opacity-30 group-hover:opacity-80 transition duration-500"></div>
                
                {/* Image Frame */}
                <div className="relative w-full h-full rounded overflow-hidden border border-cyan-500/40 bg-slate-950">
                  <img 
                    src={profileImage} 
                    alt="Navi Talib" 
                    className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:grayscale-0 transition duration-500 scale-100 group-hover:scale-105"
                  />
                  
                  {/* Digital Grid Overlay */}
                  <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none"></div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 max-w-6xl mx-auto border-t border-cyan-500/20 relative scroll-mt-24">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-cyan-500 text-xs font-bold">[01]</span>
            <h2 className="text-2xl font-black text-slate-100 tracking-wider uppercase">CORE_CAPABILITIES</h2>
          </div>
          <p className="text-slate-500 mb-12 text-xs tracking-wider uppercase">MODULAR TECHNICAL STACK AND INFRASTRUCTURE</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {skills.map((group, idx) => (
              <div 
                key={idx} 
                className="glass-hud border border-slate-800 rounded p-6 hover:border-cyan-500/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition duration-300 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/10 transition"></div>
                <h3 className="text-sm font-bold text-cyan-400 mb-4 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="bg-slate-950/90 text-slate-300 text-xs px-3 py-1.5 rounded border border-slate-800 group-hover:border-cyan-900/60 transition hover:text-cyan-400 hover:border-cyan-500/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 max-w-6xl mx-auto border-t border-cyan-500/20 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-cyan-500 text-xs font-bold">[02]</span>
                <h2 className="text-2xl font-black text-slate-100 tracking-wider uppercase">PROJECT_DEPLOYMENTS</h2>
              </div>
              <p className="text-slate-500 text-xs tracking-wider uppercase">VERIFIED FULL-STACK DEPLOYED REPOSITORIES</p>
            </div>
            
            {/* Filter Toggle */}
            <div className="flex gap-2 bg-slate-950 p-1 rounded border border-slate-800">
              {['all', 'fullstack', 'backend', 'frontend'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded text-[11px] font-bold uppercase transition duration-200 ${
                    activeTab === tab 
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <div 
                key={idx} 
                className="glass-hud border border-slate-800 rounded p-6 flex flex-col justify-between hover:border-cyan-500/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:-translate-y-1 transition duration-300 group"
              >
                <div>
                  <div className="text-[10px] text-cyan-500/80 mb-2 font-mono">// MODULE_0{idx + 1}</div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 mb-3 transition uppercase">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t, tIdx) => (
                      <span key={tIdx} className="text-[10px] bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 pt-4 border-t border-slate-800/80 text-xs font-bold">
                  <a href={project.github} className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition uppercase">
                    <span>SOURCE_CODE</span> &rarr;
                  </a>
                  <a href={project.demo} className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition uppercase">
                    <span>LIVE_DEMO</span> &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 max-w-3xl mx-auto text-center border-t border-cyan-500/20 scroll-mt-24">
          <div className="inline-block text-cyan-500 text-xs font-bold mb-2 tracking-widest uppercase">[03] ESTABLISH_LINK</div>
          <h2 className="text-3xl font-black mb-4 text-slate-100 uppercase tracking-wider">COMMUNICATION_TERMINAL</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto text-xs leading-relaxed uppercase tracking-wide">
            TRANSMIT MESSAGES OR INQUIRIES REGARDING FULL-STACK ROLES AND TECHNICAL COLLABORATION.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            <a 
              href="mailto:navit30009@gmail.com" 
              className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase px-8 py-4 rounded shadow-[0_0_20px_rgba(6,182,212,0.4)] transition"
            >
              TRANSMIT_EMAIL
            </a>
            <button
              onClick={copyContact}
              className="w-full sm:w-auto border border-cyan-500/50 bg-cyan-950/30 hover:bg-cyan-900/40 text-cyan-400 font-semibold text-xs uppercase px-6 py-4 rounded transition"
            >
              {copied ? 'COPIED_TO_CLIPBOARD!' : 'COPY_ADDRESS'}
            </button>
          </div>

          {/* Social Terminals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-900">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-hud p-4 rounded border border-slate-800 hover:border-cyan-500/60 hover:bg-cyan-950/20 transition flex flex-col items-center justify-center gap-1 group"
              >
                <span className="text-[10px] text-cyan-500/70 font-mono">// EXTERNAL_NODE</span>
                <span className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 uppercase tracking-widest">
                  {social.label}
                </span>
                <span className="text-[10px] text-slate-500 group-hover:text-emerald-400 transition">CONNECT &rarr;</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-900 text-center text-[10px] text-slate-600 uppercase tracking-widest">
        © {new Date().getFullYear()} NAVI TALIB // SYSTEM STATUS: OPERATIONAL
      </footer>
    </div>
  );
}