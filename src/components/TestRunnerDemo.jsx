import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const TEST_SUITES = [
  {
    id: 'e2e',
    name: 'Playwright E2E Auth & Cart Suite',
    framework: 'Playwright v1.42 (Chromium / Firefox / WebKit)',
    tests: [
      { name: 'POST /api/auth/login with valid JWT credentials', duration: '142ms' },
      { name: 'Form validation & CSRF token presence check', duration: '88ms' },
      { name: 'Dynamic Cart state persistence across page refresh', duration: '310ms' },
      { name: 'Stripe webhook payment intent validation mock', duration: '205ms' },
    ]
  },
  {
    id: 'api',
    name: 'Postman REST API Security & Performance Suite',
    framework: 'Postman / Newman CI v6.1',
    tests: [
      { name: 'GET /api/v1/projects latency < 120ms (Actual: 44ms)', duration: '44ms' },
      { name: 'Rate limiting 429 Throttle enforcement test', duration: '190ms' },
      { name: 'SQL Injection payload sanitizer assertion', duration: '62ms' },
      { name: 'GraphQL query depth limit rule verification', duration: '115ms' },
    ]
  },
  {
    id: 'db',
    name: 'PostgreSQL / Supabase Row-Level Security (RLS)',
    framework: 'pgTAP / Supabase Security Analyzer',
    tests: [
      { name: 'RLS Policy: User can only read own private records', duration: '35ms' },
      { name: 'Foreign key cascade integrity on profile deletion', duration: '50ms' },
      { name: 'Encrypted column verification for user metadata', duration: '28ms' },
    ]
  },
  {
    id: 'devops',
    name: 'Docker Container & GitHub Actions CI Health',
    framework: 'Docker Compose / Act runner',
    tests: [
      { name: 'Multi-stage Dockerfile build cache efficiency > 90%', duration: '410ms' },
      { name: 'Production environment variable secret masking', duration: '15ms' },
      { name: 'Health check endpoint returns HTTP 200 OK', duration: '32ms' },
    ]
  }
];

export default function TestRunnerDemo() {
  const [selectedSuiteId, setSelectedSuiteId] = useState('e2e');
  const [isRunning, setIsRunning] = useState(false);
  const [completedTests, setCompletedTests] = useState([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(-1);
  const [logs, setLogs] = useState([
    '[system] QA Test Runner Initialized.',
    '[system] Ready to execute automated test assertions in headless worker container.'
  ]);
  const terminalBoxRef = useRef(null);

  const activeSuite = TEST_SUITES.find(s => s.id === selectedSuiteId) || TEST_SUITES[0];

  // Auto-scroll ONLY inside the terminal box while tests run
  useEffect(() => {
    if (isRunning && terminalBoxRef.current) {
      terminalBoxRef.current.scrollTop = terminalBoxRef.current.scrollHeight;
    }
  }, [logs, isRunning]);

  const handleRunTests = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCompletedTests([]);
    setCurrentTestIndex(0);
    setLogs([
      `[worker-01] Starting test runner for: ${activeSuite.name}...`,
      `[worker-01] Engine: ${activeSuite.framework}`,
      `[worker-01] Spawning 4 parallel worker threads...`
    ]);

    let step = 0;
    const interval = setInterval(() => {
      if (step < activeSuite.tests.length) {
        const test = activeSuite.tests[step];
        setCompletedTests(prev => [...prev, test.name]);
        setCurrentTestIndex(step + 1);
        setLogs(prev => [
          ...prev,
          `  ✓ PASS: ${test.name} (${test.duration})`
        ]);
        step++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setLogs(prev => [
          ...prev,
          `[worker-01] ==========================================`,
          `[worker-01] ✨ SUITE SUMMARY: ${activeSuite.tests.length}/${activeSuite.tests.length} tests passed (100% success rate)`,
          `[worker-01] Coverage: 98.4% stmts | 96.2% branch | 100% lines`,
          `[worker-01] Build status: PASSING (Exit code: 0)`
        ]);

        // Celebration Confetti
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#38BDF8', '#2DD4BF', '#7DD3FC', '#F0F9FF']
        });
      }
    }, 550);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCompletedTests([]);
    setCurrentTestIndex(-1);
    setLogs([
      `[system] Switched suite to: ${activeSuite.name}`,
      `[system] Ready to execute automated tests.`
    ]);
  };

  const handleSelectSuite = (suiteId) => {
    setSelectedSuiteId(suiteId);
    setIsRunning(false);
    setCompletedTests([]);
    setCurrentTestIndex(-1);
    const newSuite = TEST_SUITES.find(s => s.id === suiteId);
    setLogs([
      `[system] Switched test suite to: ${newSuite?.name}`,
      `[system] Framework: ${newSuite?.framework}`,
      `[system] Press "Run Test Suite" to execute live simulation.`
    ]);
  };

  const progressPercent = activeSuite.tests.length > 0 
    ? Math.round((completedTests.length / activeSuite.tests.length) * 100) 
    : 0;

  return (
    <div className="bg-[#050C16]/25 hover:bg-[#050C16]/40 p-6 sm:p-8 rounded-3xl border border-[#38BDF8]/30 hover:border-[#38BDF8]/70 transition-all duration-300 space-y-6 shadow-2xl backdrop-blur-md">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/[0.05] text-[#7DD3FC] border border-[#38BDF8]/30 backdrop-blur-sm">
              Interactive QA Simulator
            </span>
            <span className="text-xs font-mono text-[#2DD4BF] flex items-center gap-1">
              ● Live Demo
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F0F9FF]">
            Automated QA & CI/CD Test Pipeline
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Experience live test automation assertions simulated across UI, APIs, and containerized microservices.
          </p>
        </div>

        {/* Action Run Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleRunTests}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#070D14] bg-[#38BDF8] hover:bg-[#7DD3FC] shadow-lg shadow-[#38BDF8]/20 transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100 cursor-pointer"
          >
            <Play className={`w-4 h-4 text-[#070D14] ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running Tests...' : 'Run Test Suite'}</span>
          </button>

          <button
            onClick={handleReset}
            disabled={isRunning}
            className="p-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-[#94A3B8] hover:text-[#F0F9FF] transition-colors cursor-pointer"
            title="Reset Terminal"
          >
            <RotateCcw className="w-4 h-4 text-[#38BDF8]" />
          </button>
        </div>
      </div>

      {/* Suite Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {TEST_SUITES.map((suite) => {
          const isSelected = suite.id === selectedSuiteId;
          return (
            <button
              key={suite.id}
              onClick={() => handleSelectSuite(suite.id)}
              className={`p-3 rounded-2xl text-left transition-all border cursor-pointer backdrop-blur-sm ${
                isSelected
                  ? 'bg-[#38BDF8]/20 border-[#38BDF8] shadow-md shadow-[#38BDF8]/20 text-[#F0F9FF]'
                  : 'bg-white/[0.03] border-white/10 hover:border-[#38BDF8]/50 hover:bg-white/[0.06] text-[#94A3B8]'
              }`}
            >
              <div className="text-[11px] font-mono text-[#7DD3FC] truncate">{suite.framework.split(' ')[0]}</div>
              <div className="text-xs font-bold text-[#F0F9FF] truncate mt-0.5">{suite.name.split(' ')[0]} {suite.name.split(' ')[1]}</div>
            </button>
          );
        })}
      </div>

      {/* Live Assertions List & Real-time Terminal Log View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column: Assertions Checklist */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#7DD3FC] uppercase tracking-wider font-bold">Suite Assertions</span>
            <span className="text-[#94A3B8]">{completedTests.length}/{activeSuite.tests.length} Complete ({progressPercent}%)</span>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-[#1E3A5F] via-[#38BDF8] to-[#2DD4BF] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Test items */}
          <div className="space-y-2 pt-1">
            {activeSuite.tests.map((test, idx) => {
              const isPassed = completedTests.includes(test.name);
              const isCurrent = currentTestIndex === idx && isRunning;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border text-xs font-mono transition-all flex items-center justify-between gap-3 backdrop-blur-sm ${
                    isPassed
                      ? 'bg-[#2DD4BF]/10 border-[#2DD4BF]/50 text-[#F0F9FF]'
                      : isCurrent
                      ? 'bg-[#38BDF8]/15 border-[#38BDF8] text-[#7DD3FC] animate-pulse'
                      : 'bg-white/[0.03] border-white/10 text-[#94A3B8]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-[#38BDF8] border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
                    )}
                    <span className="truncate">{test.name}</span>
                  </div>

                  <span className="text-[10px] text-[#7DD3FC] shrink-0">{test.duration}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Terminal Log Console */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-[#050C16]/60 border border-[#38BDF8]/30 p-4 shadow-inner space-y-3 backdrop-blur-md">
            
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-[#94A3B8] ml-2">test-worker-01.log</span>
              </div>
              <span className="text-[10px] font-mono text-[#38BDF8]">UTF-8 • Headless</span>
            </div>

            {/* Log Output Stream */}
            <div 
              ref={terminalBoxRef}
              className="font-mono text-xs text-[#F0F9FF] h-48 overflow-y-auto space-y-1.5 pr-2 select-text"
            >
              {logs.map((line, idx) => {
                const isPassLine = line.includes('✓ PASS');
                const isSummary = line.includes('✨ SUITE SUMMARY');

                return (
                  <div 
                    key={idx} 
                    className={`${
                      isPassLine 
                        ? 'text-[#2DD4BF] font-semibold' 
                        : isSummary 
                        ? 'text-[#7DD3FC] font-bold' 
                        : 'text-[#94A3B8]'
                    }`}
                  >
                    {line}
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
