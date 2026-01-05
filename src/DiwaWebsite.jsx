import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Zap, Users, Shield, GitBranch, Clock, ArrowRight, Check, X, Menu, Star, Github, Play, ChevronRight, Hexagon, Brain, Cpu, Eye, Layers, Lock, Globe, BarChart3, Sparkles, Code2, RefreshCw, FileText, MessageSquare, AlertTriangle, Target, Briefcase, Heart, ExternalLink } from 'lucide-react';

// Animated Hexagon Background Component
const HexagonBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <path
              d="M28 66L0 50V16L28 0L56 16V50L28 66Z"
              fill="none"
              stroke="url(#hexGradient)"
              strokeWidth="0.5"
              className="animate-pulse"
            />
          </pattern>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
        <circle cx="20%" cy="30%" r="300" fill="url(#glowGradient)" className="animate-pulse" style={{ animationDuration: '4s' }} />
        <circle cx="80%" cy="70%" r="400" fill="url(#glowGradient)" className="animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </svg>
    </div>
  );
};

// Floating Memory Nodes Animation
const FloatingNodes = () => {
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute rounded-full bg-gradient-to-br from-indigo-500/20 to-amber-500/10 backdrop-blur-sm"
          style={{
            width: node.size,
            height: node.size,
            left: `${node.x}%`,
            top: `${node.y}%`,
            animation: `float ${node.duration}s ease-in-out infinite`,
            animationDelay: `${node.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// Waitlist Modal Component
const WaitlistModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('developer');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.target);

    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "form-name": "waitlist",
        "email": email,
        "role": role
      }).toString()
    })
      .then(() => {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setEmail('');
          setRole('developer');
        }, 2000);
      })
      .catch((error) => {
        console.error('Form submission failed:', error);
        setStatus('error'); // You might want to handle this state in UI
        setTimeout(() => setStatus('idle'), 3000);
      });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl transform transition-all animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
              <p className="text-slate-400">We'll let you know when DIWA is ready for you.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/10 rounded-xl mb-4">
                  <Sparkles className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Join the Waitlist</h3>
                <p className="text-slate-400">
                  Be the first to get persistent memory for your AI workflow.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-1.5">
                    I am a...
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none"
                  >
                    <option value="developer">Developer</option>
                    <option value="manager">Engineering Manager</option>
                    <option value="founder">Founder</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Adding you...
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-center text-slate-500 mt-6">
                We respect your inbox. No spam, ever.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
const Navigation = ({ currentPage, setCurrentPage, onJoinWaitlist }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'platform', label: 'Platform' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'enterprise', label: 'Enterprise' },
    { id: 'about', label: 'About' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl shadow-indigo-500/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <img
                src="/diwa-icon-transparent.svg"
                alt="DIWA"
                className="w-10 h-10 transition-opacity hover:opacity-90"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-amber-200 bg-clip-text text-transparent tracking-tight">
              DIWA
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`relative text-sm font-medium transition-all duration-300 ${currentPage === item.id ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="https://github.com/diwahq/diwa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <button
              onClick={onJoinWaitlist}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-slate-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-slate-800/50 mt-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setMobileOpen(false); }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${currentPage === item.id ? 'bg-indigo-500/10 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = ({ onJoinWaitlist }) => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'docker run -d diwahq/diwa';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <FloatingNodes />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-sm text-slate-300">Open Source (MIT) • MCP Compatible • Self-Hosted</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-white">Your AI Tools </span>
            <span className="relative">
              <span className="bg-gradient-to-r from-slate-500 to-slate-600 bg-clip-text text-transparent line-through decoration-amber-500/50">Forget</span>
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-amber-400 bg-clip-text text-transparent">
              DIWA Remembers
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Persistent memory for AI coding assistants. Works with Claude, Cursor, Windsurf, and Copilot. Free and open source.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={onJoinWaitlist}
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1"
            >
              <Play className="w-5 h-5" />
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="https://github.com/diwahq/diwa" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm">
              <Star className="w-5 h-5 text-amber-500" />
              Star on GitHub
            </a>
          </div>

          <div className="relative max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-slate-500 font-mono ml-2">terminal</span>
              </div>
              <div className="p-5 font-mono text-sm">
                <span className="text-slate-500">$ </span>
                <span className="text-indigo-400">{typedText}</span>
                <span className="animate-blink text-amber-500">▋</span>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-400">
              Add to MCP config, start remembering.
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronRight className="w-6 h-6 text-slate-600 rotate-90" />
      </div>
    </section>
  );
};

// Problem Section
const ProblemSection = () => {
  const problems = [
    {
      icon: RefreshCw,
      title: 'Context Reset',
      description: 'Every new chat starts from zero. Explain your project structure, coding standards, and decisions again and again.',
      color: 'red',
    },
    {
      icon: Code2,
      title: 'Tool Switching',
      description: 'Change from Cursor to Claude? Start over. Your AI assistant forgets everything the moment you switch tools.',
      color: 'orange',
    },
    {
      icon: Users,
      title: 'Team Silos',
      description: 'Knowledge trapped in individual conversations. No shared understanding across your development team.',
      color: 'amber',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The Problem with AI Coding Today
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Your AI tools suffer from amnesia. Every session is a fresh start—and not in a good way.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-slate-600/50 transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-xl bg-${problem.color}-500/10 border border-${problem.color}-500/20 mb-6`}>
                <problem.icon className={`w-6 h-6 text-${problem.color}-500`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
              <p className="text-slate-400 leading-relaxed">{problem.description}</p>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${problem.color}-500/50 to-transparent rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Solution Section
const SolutionSection = () => {
  const pillars = [
    {
      icon: Brain,
      title: 'Persistent',
      description: 'Memory that survives sessions, restarts, and time. Your context is always there.',
      gradient: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: Layers,
      title: 'Universal',
      description: 'Works with any MCP-compatible tool. One memory layer for all your AI assistants.',
      gradient: 'from-indigo-400 to-amber-500',
    },
    {
      icon: Lock,
      title: 'Yours',
      description: 'Self-hosted, open source, and private. Your data never leaves your infrastructure.',
      gradient: 'from-amber-500 to-amber-600',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-indigo-300">The DIWA Solution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Memory That Works For You
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-px bg-gradient-to-b from-slate-700/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl h-full">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${pillar.gradient} mb-6 shadow-lg`}>
                  <pillar.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-slate-400 leading-relaxed">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Grid
const FeaturesSection = () => {
  const features = [
    { icon: FileText, title: 'Project Contexts', description: 'Organize knowledge by project, team, or domain.' },
    { icon: GitBranch, title: 'Decision Logs', description: 'Track architectural choices and their rationale.' },
    { icon: Target, title: 'Requirement Tracking', description: 'Never lose sight of what needs to be built.' },
    { icon: RefreshCw, title: 'Session Handoffs', description: 'Resume exactly where you left off, every time.' },
    { icon: AlertTriangle, title: 'Blocker Management', description: 'Flag and track blockers across sessions.' },
    { icon: Layers, title: 'Cross-Tool Sync', description: 'Same memory, any AI tool you prefer.' },
  ];

  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A complete memory infrastructure for modern AI-powered development.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-slate-800/20 hover:bg-slate-800/40 border border-slate-700/30 hover:border-indigo-500/30 rounded-xl transition-all duration-300"
            >
              <feature.icon className="w-8 h-8 text-indigo-400 mb-4 group-hover:text-amber-400 transition-colors" />
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Use Cases Section
const UseCasesSection = () => {
  const cases = [
    {
      title: 'The Handoff',
      scenario: 'Friday → Monday',
      description: 'Leave on Friday mid-debugging. Return Monday to a complete context—where you were, what you tried, what to do next.',
      icon: Clock,
    },
    {
      title: 'The New Hire',
      scenario: 'Instant Context',
      description: 'New team member? They get instant access to project decisions, patterns, and accumulated knowledge.',
      icon: Users,
    },
    {
      title: 'The Multi-Tool Team',
      scenario: 'Shared Memory',
      description: 'Half your team uses Cursor, half uses Claude. DIWA keeps everyone on the same page.',
      icon: Layers,
    },
    {
      title: 'The Audit',
      scenario: 'Decision Logs',
      description: 'Why did we choose PostgreSQL? Check the decision log. Complete rationale, recorded forever.',
      icon: FileText,
    },
  ];

  return (
    <section className="relative py-24 bg-slate-800/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Real Scenarios, Real Solutions
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((useCase, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 bg-slate-900/50 border border-slate-700/50 rounded-2xl h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-500/10 rounded-xl">
                    <useCase.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-amber-500 mb-1">{useCase.scenario}</div>
                    <h3 className="text-xl font-semibold text-white mb-3">{useCase.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{useCase.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Ecosystem Teaser
const EcosystemTeaser = ({ setCurrentPage }) => {
  const products = [
    { name: 'Command Center', status: 'Q2 2026', icon: Eye },
    { name: 'Agent Runtime', status: 'Q3 2026', icon: Cpu },
    { name: 'Enterprise Platform', status: 'Q4 2026', icon: Shield },
  ];

  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-3xl p-8 sm:p-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-amber-500/5 rounded-full blur-3xl" />

          <div className="relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                More Than Memory
              </h2>
              <p className="text-lg text-slate-400 max-w-xl mx-auto">
                DIWA is just the beginning. A complete AI development infrastructure is coming.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {products.map((product, index) => (
                <div key={index} className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl text-center">
                  <product.icon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
                  <span className="text-sm text-amber-500">{product.status}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setCurrentPage('platform')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-xl text-white font-medium transition-all duration-300"
              >
                Explore the Platform
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Pricing Preview
const PricingPreview = ({ setCurrentPage, onJoinWaitlist }) => {
  const tiers = [
    {
      name: 'Community',
      price: 'Free',
      description: 'Perfect for individual developers',
      features: ['3 Contexts', '1,000 Memories', 'Community Support'],
      highlighted: false,
    },
    {
      name: 'Team',
      price: '$29',
      period: '/user/mo',
      description: 'For growing development teams',
      features: ['Unlimited Contexts', '50,000 Memories', 'Team Sharing', 'Dashboard Access', 'Priority Support'],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For organizations at scale',
      features: ['Unlimited Everything', 'SSO/SAML', 'Dedicated Support', 'SLA Guarantee'],
      highlighted: false,
    },
  ];

  return (
    <section className="relative py-24 bg-slate-800/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-400">
            Start free. Scale as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl transition-all duration-300 ${tier.highlighted
                ? 'bg-gradient-to-b from-indigo-500/20 to-slate-900 border-2 border-indigo-500/50 scale-105'
                : 'bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50'
                }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full text-xs font-semibold text-white">
                  POPULAR
                </div>
              )}

              <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                {tier.period && <span className="text-slate-400">{tier.period}</span>}
              </div>
              <p className="text-slate-400 text-sm mb-6">{tier.description}</p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-indigo-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={onJoinWaitlist}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${tier.highlighted
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400'
                  : 'bg-slate-700/50 text-white hover:bg-slate-700'
                  }`}
              >
                {tier.price === 'Custom' ? 'Contact Sales' : 'Join Waitlist'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentPage('pricing')}
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            View full pricing details →
          </button>
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = ({ onJoinWaitlist }) => {
  return (
    <section className="relative py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to Give Your AI
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent">
            Perfect Memory?
          </span>
        </h2>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Join developers who are building smarter with persistent AI context. Get started in under 5 minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onJoinWaitlist}
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1"
          >
            <Terminal className="w-5 h-5" />
            Get Started Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="https://docs.diwa.one" className="flex items-center gap-2 px-8 py-4 text-slate-300 hover:text-white font-medium transition-colors">
            Read the Docs
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="border-t border-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 mb-6 group cursor-pointer transition-opacity hover:opacity-90">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <img
                  src="/diwa-icon-transparent.svg"
                  alt="DIWA"
                  className="w-8 h-8"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">DIWA</span>
            </button>
            <p className="text-sm text-slate-400 mb-4">
              Persistent memory infrastructure for AI-powered development.
            </p>
            <p className="text-xs text-slate-500 italic">
              "Ang wika ang kaluluwa ng bansa"
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('platform')} className="text-sm text-slate-400 hover:text-white transition-colors">Platform</button></li>
              <li><button onClick={() => setCurrentPage('pricing')} className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</button></li>
              <li><button onClick={() => setCurrentPage('enterprise')} className="text-sm text-slate-400 hover:text-white transition-colors">Enterprise</button></li>
              <li><a href="https://docs.diwa.one" className="text-sm text-slate-400 hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('about')} className="text-sm text-slate-400 hover:text-white transition-colors">About</button></li>
              <li><a href="/blog" className="text-sm text-slate-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="https://github.com/diwahq" className="text-sm text-slate-400 hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 DIWA. Built in the Philippines, for the world.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/diwahq" className="text-slate-500 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==================== PLATFORM PAGE ====================
const PlatformPage = () => {
  const stack = [
    {
      plane: 'Cloud Plane',
      description: 'Orchestration, Security, Observability',
      color: 'from-amber-500 to-amber-600',
      products: ['Enterprise Platform', 'Global Scale', 'Multi-Tenant'],
    },
    {
      plane: 'Node Plane',
      description: 'Agents, Memory, Supervision',
      color: 'from-indigo-400 to-indigo-500',
      products: ['Agent Runtime', 'Command Center', 'Team Collaboration'],
    },
    {
      plane: 'Kernel Plane',
      description: 'Isolation, Checkpointing',
      color: 'from-indigo-600 to-indigo-700',
      products: ['DIWA Core', 'MCP Protocol', 'Self-Hosted'],
    },
  ];

  const products = [
    {
      name: 'DIWA',
      tagline: 'Persistent Memory',
      status: 'Available Now',
      license: 'MIT',
      description: 'The foundation. Open source memory infrastructure that works with any MCP-compatible AI tool.',
      icon: Brain,
      available: true,
    },
    {
      name: 'Command Center',
      tagline: 'Visual Dashboard',
      status: 'Q2 2026',
      license: 'BSL',
      description: 'See your AI memory. Visual interface for managing contexts, decisions, and team knowledge.',
      icon: Eye,
      available: false,
    },
    {
      name: 'Agent Runtime',
      tagline: 'Autonomous Agents',
      status: 'Q3 2026',
      license: 'Apache Core',
      description: 'Run persistent AI agents with memory, supervision, and automatic recovery.',
      icon: Cpu,
      available: false,
    },
    {
      name: 'Enterprise Platform',
      tagline: 'Scale & Security',
      status: 'Q4 2026',
      license: 'Commercial',
      description: 'Enterprise-grade deployment with SSO, audit logs, and dedicated support.',
      icon: Shield,
      available: false,
    },
  ];

  return (
    <div className="pt-24">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-300">The DIWA Ecosystem</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              AI Infrastructure,
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent">
                Built for Scale
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A complete stack for AI-powered development. From individual memory to enterprise orchestration.
            </p>
          </div>

          <div className="mb-24">
            <h2 className="text-2xl font-bold text-white text-center mb-12">The Stack</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {stack.map((layer, index) => (
                <div key={index} className="relative">
                  <div className={`p-6 bg-gradient-to-r ${layer.color} rounded-xl`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white">{layer.plane}</h3>
                        <p className="text-white/80 text-sm">{layer.description}</p>
                      </div>
                      <div className="hidden sm:flex gap-2">
                        {layer.products.map((p, i) => (
                          <span key={i} className="px-3 py-1 bg-white/20 rounded-full text-xs text-white">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white text-center mb-12">Products</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className={`relative p-8 rounded-2xl border transition-all duration-300 ${product.available
                    ? 'bg-gradient-to-br from-indigo-500/10 to-slate-900 border-indigo-500/30'
                    : 'bg-slate-800/30 border-slate-700/50'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${product.available ? 'bg-indigo-500/20' : 'bg-slate-700/50'}`}>
                      <product.icon className={`w-6 h-6 ${product.available ? 'text-indigo-400' : 'text-slate-400'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white">{product.name}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${product.available ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                          {product.status}
                        </span>
                      </div>
                      <p className="text-sm text-amber-500 mb-3">{product.tagline}</p>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">{product.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-500">License: {product.license}</span>
                        {product.available && (
                          <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                            Get Started →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== PRICING PAGE ====================
const PricingPage = () => {
  const tiers = [
    {
      name: 'Community',
      price: 'Free',
      description: 'Perfect for individual developers exploring AI memory.',
      features: [
        { text: '3 Contexts', included: true },
        { text: '1,000 Memories', included: true },
        { text: 'MCP Integration', included: true },
        { text: 'Community Support', included: true },
        { text: 'Team Sharing', included: false },
        { text: 'Dashboard', included: false },
        { text: 'SSO/SAML', included: false },
        { text: 'Priority Support', included: false },
      ],
      cta: 'Get Started Free',
      highlighted: false,
    },
    {
      name: 'Team',
      price: '$29',
      period: '/user/mo',
      description: 'For teams building together with shared AI context.',
      features: [
        { text: 'Unlimited Contexts', included: true },
        { text: '50,000 Memories', included: true },
        { text: 'MCP Integration', included: true },
        { text: 'Team Sharing', included: true },
        { text: 'Dashboard Access', included: true },
        { text: 'Priority Support', included: true },
        { text: 'SSO/SAML', included: false },
        { text: 'Dedicated Support', included: false },
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For organizations requiring scale, security, and support.',
      features: [
        { text: 'Unlimited Contexts', included: true },
        { text: 'Unlimited Memories', included: true },
        { text: 'MCP Integration', included: true },
        { text: 'Team Sharing', included: true },
        { text: 'Dashboard Access', included: true },
        { text: 'SSO/SAML', included: true },
        { text: 'Dedicated Support', included: true },
        { text: 'SLA Guarantee', included: true },
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="pt-24">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl transition-all duration-300 ${tier.highlighted
                  ? 'bg-gradient-to-b from-indigo-500/20 to-slate-900 border-2 border-indigo-500/50 scale-105'
                  : 'bg-slate-800/30 border border-slate-700/50'
                  }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full text-xs font-semibold text-white">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">{tier.price}</span>
                  {tier.period && <span className="text-slate-400">{tier.period}</span>}
                </div>
                <p className="text-slate-400 mb-8">{tier.description}</p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-indigo-400" />
                      ) : (
                        <X className="w-5 h-5 text-slate-600" />
                      )}
                      <span className={feature.included ? 'text-slate-300' : 'text-slate-500'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${tier.highlighted
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-500/25'
                    : 'bg-slate-700/50 text-white hover:bg-slate-700'
                    }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-400 mb-4">Need something different?</p>
            <a href="mailto:hello@diwa.one" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Talk to us about custom requirements →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== ENTERPRISE PAGE ====================
const EnterprisePage = () => {
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('loading');

    const formData = new FormData(e.target);

    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
      .then(() => {
        setFormStatus('success');
      })
      .catch((error) => {
        console.error('Submission failed:', error);
        setFormStatus('error');
      });
  };

  const capabilities = [
    {
      icon: BarChart3,
      title: 'Intelligent Monitoring',
      description: 'Real-time visibility into AI agent behavior, memory usage, and system health.',
    },
    {
      icon: Users,
      title: 'Automatic Onboarding',
      description: 'New team members get instant access to accumulated project knowledge and context.',
    },
    {
      icon: Shield,
      title: 'Consistency Assurance',
      description: 'Ensure AI outputs align with your standards, patterns, and architectural decisions.',
    },
    {
      icon: Lock,
      title: 'Security & Compliance',
      description: 'SOC 2 Type II, SSO/SAML, audit logs, and data residency controls.',
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Deploy across regions with automatic failover and low-latency access worldwide.',
    },
    {
      icon: Eye,
      title: 'Full Observability',
      description: 'Trace every decision, every memory access, every agent action.',
    },
  ];

  return (
    <div className="pt-24">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
              <Shield className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Enterprise Ready</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              AI Infrastructure
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent">
                Built for Enterprise
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Deploy DIWA at scale with the security, compliance, and support your organization needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {capabilities.map((cap, index) => (
              <div key={index} className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:border-indigo-500/30 transition-colors">
                <cap.icon className="w-8 h-8 text-indigo-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{cap.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Talk to Our Team</h2>

            {formStatus === 'success' ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Message Sent</h3>
                <p className="text-slate-400">
                  Thanks for reaching out. Our enterprise team will be in touch shortly.
                </p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white text-sm transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="form-name" value="enterprise-contact" />

                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="first-name"
                    placeholder="First name"
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    name="last-name"
                    placeholder="Last name"
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Work email"
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <textarea
                  name="message"
                  placeholder="Tell us about your needs"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                />
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === 'loading' ? 'Sending...' : 'Contact Sales'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== ABOUT PAGE ====================
const AboutPage = () => {
  return (
    <div className="pt-24">
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
              <Heart className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-indigo-300">Our Story</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent">
                The Soul
              </span>
              {" "}of AI Systems
            </h1>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 mb-12">
              <p className="text-2xl text-center text-slate-300 italic mb-4">
                "Ang wika ang kaluluwa ng bansa"
              </p>
              <p className="text-center text-slate-500">
                "Language is the soul of a nation" — Filipino proverb
              </p>
            </div>

            <div className="space-y-6 text-slate-300">
              <p>
                <strong className="text-white">DIWA</strong> (pronounced DEE-wah) is a Filipino word meaning "spirit," "essence," or "soul." It represents the animating force that gives meaning to thought and action.
              </p>

              <p>
                In the context of AI systems, we believe memory is that soul. Without persistent memory, AI tools are hollow—brilliant in the moment, but incapable of building understanding over time. They forget your decisions. They lose your context. They cannot learn from your journey.
              </p>

              <p>
                DIWA was born from frustration. As AI coding assistants became more capable, their amnesia became more apparent. Every session started fresh. Every tool switch meant explaining everything again. Team knowledge remained siloed in individual conversations that vanished like morning mist.
              </p>

              <div className="bg-gradient-to-r from-indigo-500/10 to-amber-500/10 border border-indigo-500/20 rounded-xl p-6 my-8">
                <h3 className="text-xl font-semibold text-white mb-3">Our Mission</h3>
                <p className="text-slate-300 mb-0">
                  To give AI systems the persistent memory they need to be truly useful—memory that survives sessions, spans tools, and scales with teams.
                </p>
              </div>

              <p>
                We're building DIWA in public, as open source software. We believe that memory infrastructure is too fundamental to be locked behind proprietary walls. The core should be free, forever.
              </p>

              <p>
                Built in the Philippines, for the world. Our naming reflects our heritage—DIWA (soul), SINAG (ray of light), TANAW (view)—because we believe technology should carry culture with it.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800">
              <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:hello@diwa.one" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  hello@diwa.one
                </a>
                <a href="https://github.com/diwahq" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors">
                  <Github className="w-5 h-5" />
                  github.com/diwahq
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== HOME PAGE ====================
const HomePage = ({ setCurrentPage, onJoinWaitlist }) => {
  return (
    <>
      <HeroSection onJoinWaitlist={onJoinWaitlist} />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <UseCasesSection />
      <EcosystemTeaser setCurrentPage={setCurrentPage} />
      <PricingPreview
        setCurrentPage={setCurrentPage}
        onJoinWaitlist={onJoinWaitlist}
      />
      <CTASection onJoinWaitlist={onJoinWaitlist} />
    </>
  );
};

// ==================== MAIN APP ====================
export default function DiwaWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const openWaitlist = () => setIsWaitlistOpen(true);

  const renderPage = () => {
    switch (currentPage) {
      case 'platform':
        return <PlatformPage />;
      case 'pricing':
        // Pass openWaitlist if PricingPage needs it (assuming checking Home only for now)
        return <PricingPage />;
      case 'enterprise':
        return <EnterprisePage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage
          setCurrentPage={setCurrentPage}
          onJoinWaitlist={openWaitlist}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>

      <HexagonBackground />
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onJoinWaitlist={openWaitlist}
      />

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />

      <main className="relative z-10">
        {renderPage()}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
