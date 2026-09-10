import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { SignalPoster } from "./SignalPoster";

const SignalForm = lazy(() => import("./SignalForm").then((module) => ({ default: module.SignalForm })));

type Theme = "light" | "dark";
type StaticReason = "reduced-motion" | "mobile-policy" | "webgl-unavailable" | "context-lost" | null;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function readFixedProgress() {
  const value = new URLSearchParams(window.location.search).get("progress");
  if (value === null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? clamp(parsed) : null;
}

function readState(name: string, fallback: number) {
  const parsed = Number(new URLSearchParams(window.location.search).get(name));
  return Number.isFinite(parsed) ? Math.max(0, Math.min(6, Math.round(parsed))) : fallback;
}

function hasWebGL2() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("signal-proof-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const fixedProgress = useMemo(readFixedProgress, []);
  const fromState = useMemo(() => readState("from", 0), []);
  const toState = useMemo(() => readState("to", 1), []);
  const [progress, setProgress] = useState(fixedProgress ?? 0);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [metrics, setMetrics] = useState({ calls: 0, triangles: 0 });
  const [contextLost, setContextLost] = useState(false);
  const [threeReady, setThreeReady] = useState(false);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobilePolicy = window.innerWidth < 700;
  const staticReason: StaticReason = contextLost
    ? "context-lost"
    : reduced
      ? "reduced-motion"
      : mobilePolicy
        ? "mobile-policy"
        : !hasWebGL2()
          ? "webgl-unavailable"
          : null;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("signal-proof-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (fixedProgress !== null) return;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(clamp(window.scrollY / max));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [fixedProgress]);

  useEffect(() => {
    if (staticReason) return;
    const schedule = window.requestIdleCallback ?? ((callback: IdleRequestCallback) => window.setTimeout(callback, 180));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = schedule(() => setThreeReady(true), { timeout: 500 });
    return () => cancel(id);
  }, [staticReason]);

  const labels = ["HOME", "01 KAIROS", "02 AYAM KALINTANG", "03 SAMBUT", "04 COLORS", "05 AETHER3D", "06 N.A.R.A."];
  const activeState = progress < 0.5 ? fromState : toState;
  const chapter = labels[activeState];
  const posterState = activeState;

  return (
    <main
      onPointerMove={(event) => {
        if (staticReason) return;
        setPointer({
          x: (event.clientX / window.innerWidth - 0.5) * 2,
          y: (event.clientY / window.innerHeight - 0.5) * 2,
        });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <header className="nav-shell">
        <a className="identity-link" href="#hero" aria-label="Valensius Alven, home">VA</a>
        <span className="chapter-label" aria-label={chapter}>{chapter}</span>
        <div className="chapter-track" aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(0.03, progress)})` }} />
        </div>
        <a className="contact-link" href="mailto:alvenvalensius93@gmail.com">Contact</a>
        <button
          className="theme-control"
          type="button"
          role="switch"
          aria-label="Dark theme"
          aria-checked={theme === "dark"}
          onClick={() => setTheme((value) => (value === "light" ? "dark" : "light"))}
        >
          <span className="eclipse" aria-hidden="true"><span /></span>
        </button>
      </header>

      <div className="actor-shell" aria-label="Signal Form system proof">
        {staticReason || !threeReady ? (
          <SignalPoster state={posterState} />
        ) : (
          <Suspense fallback={<SignalPoster state={posterState} />}>
            <SignalForm
              progress={progress}
              fromState={fromState}
              toState={toState}
              pointer={pointer}
              onContextLost={() => setContextLost(true)}
              onMetrics={(next) =>
                setMetrics((current) =>
                  current.calls === next.calls && current.triangles === next.triangles ? current : next,
                )
              }
            />
          </Suspense>
        )}
      </div>

      <section className="chapter hero" id="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="kicker">Informatics Engineering · Universitas Padjadjaran</p>
          <h1 id="hero-title">Valensius<br />Alven</h1>
          <p className="scope">Software, AI systems and student-led project work.</p>
        </div>
        <p className="proof-note">V2.2 isolated state proof · one actor across 00–06</p>
      </section>

      <section className="chapter kairos" id="kairos" aria-labelledby="kairos-title">
        <div className="chapter-intro">
          <p className="kicker">01 · Featured work</p>
          <h2 id="kairos-title">KAIROS</h2>
          <p className="problem">Dispatcher decision-support for reviewing pickup promises within limited human review capacity.</p>
        </div>

        <div className="artifact-placeholder" role="img" aria-label="Internal placeholder for a real KAIROS review-interface capture">
          <span>REAL KAIROS ARTIFACT PENDING</span>
          <strong>Review queue · cutoff · human decision context</strong>
          <small>Internal proof placeholder. No product interface is simulated.</small>
        </div>

        <div className="evidence-grid">
          <div>
            <p className="meta">Role and context</p>
            <p><strong>Team Lead</strong><br />COMPFEST 18 AI Innovation Challenge, 2026</p>
          </div>
          <div>
            <p className="meta">Personal contribution</p>
            <p>Input validation, invariant tests and reproducibility records.</p>
          </div>
          <div>
            <p className="meta">Decision boundary</p>
            <p>The dispatcher retains every operational decision. KAIROS is a team-built local competition MVP.</p>
          </div>
          <div>
            <p className="meta">Technical context</p>
            <p>CatBoost scores order review cases evaluated on public LaDe pickup data.</p>
          </div>
        </div>

        <nav className="project-actions" aria-label="KAIROS links">
          <a href="/work/kairos">Read KAIROS case study</a>
          <a href="https://github.com/vlnvn/kairos-ai">Inspect source</a>
        </nav>
      </section>

      <aside className="runtime-readout" aria-label="Experiment runtime readout" data-metrics={`${metrics.calls},${metrics.triangles},${staticReason ?? "webgl"}`}>
        <span>{Math.round(progress * 100)}%</span>
        <span>{staticReason ? `static · ${staticReason}` : `${metrics.calls || 9} calls · demand`}</span>
      </aside>
    </main>
  );
}



