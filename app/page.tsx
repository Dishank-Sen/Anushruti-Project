'use client';
/* oxlint-disable react/react-compiler, next/no-html-link-for-pages -- Browser query hydration is intentional; full document links reset each demo view and read its local progress. React Compiler is not enabled. */
import { useState, useEffect } from 'react';
import { LearningWorkspace } from '@/components/learning-workspace';
import { VoiceStudio } from '@/components/voice-studio';
import { TextToSignPlayer } from '@/components/isl/TextToSignPlayer';
import { AppShell } from '@/components/shell/AppShell';
import {
  ArrowRight,
  Calculator,
  FlaskConical,
  Leaf,
  Sparkles,
  Sprout,
  Mic,
  Trophy,
} from 'lucide-react';

export default function Page() {
  const [grade, setGrade] = useState(1);
  const [view, setView] = useState('garden');

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    setView(q.get('view') || 'garden');
    const g = Number(q.get('grade'));
    if (g >= 1 && g <= 5 && Number.isInteger(g)) setGrade(g);
  }, []);

  function changeGrade(next: number) {
    setGrade(next);
    const url = new URL(location.href);
    url.searchParams.set('grade', String(next));
    history.replaceState(null, '', url);
  }

  function handleNavigate(nextView: string) {
    setView(nextView);
    const url = new URL(location.href);
    url.searchParams.set('view', nextView);
    history.replaceState(null, '', url);
  }

  return (
    <AppShell
      view={view}
      grade={grade}
      onGradeChange={changeGrade}
      onNavigate={handleNavigate}
    >
      {view !== 'garden' ? (
        <>
          {view === 'voice' ? (
            <VoiceStudio grade={grade} />
          ) : view === 'sign-studio' ? (
            <TextToSignPlayer />
          ) : (
            <LearningWorkspace view={view} grade={grade} />
          )}
        </>
      ) : (
        <>
          <div className="page-heading">
            <div>
              <h1>
                Hello, little learner <span>☀️</span>
              </h1>
            </div>
          </div>

          <section className="welcome">
            <div>
              <h2>
                See it. Learn it.
                <br />
                At your own pace.
              </h2>
              <p>Choose a lesson and explore.</p>
              <a className="primary" href={`/?view=lessons&grade=${grade}`}>
                Explore lessons <ArrowRight size={18} />
              </a>
            </div>
            <div
              className="math-art"
              aria-label="Two circles plus one circle equals three"
            >
              <div className="art-label">small steps, big learning</div>
              <div className="equation">
                <span>●●</span>
                <b>+</b>
                <span>●</span>
              </div>
              <div className="equation answer">
                <b>=</b>
                <span>●●●</span>
              </div>
              <span className="art-footer">
                Let&apos;s count together <Sparkles size={20} />
              </span>
            </div>
          </section>

          <div className="section-heading">
            <h2>Choose a subject</h2>
          </div>

          <div className="subject-grid">
            <a
              className="subject maths"
              href={`/?view=lessons&subject=Maths&grade=${grade}`}
            >
              <div className="subject-symbol">
                <Calculator size={40} />
                <span>1 2 3</span>
              </div>
              <div className="subject-body">
                <span className="subject-tag">NCERT JOYFUL MATHEMATICS</span>
                <h3>Magic of maths</h3>
                <p>
                  {grade === 1
                    ? 'Count, compare, and explore shapes.'
                    : 'Numbers, shapes, and patterns.'}
                </p>
                <div className="card-bottom">
                  <span>Class {grade} · Visual lessons</span>
                  <ArrowRight />
                </div>
              </div>
            </a>
            <a
              className="subject science"
              href={`/?view=lessons&subject=Science&grade=${grade}`}
            >
              <div className="subject-symbol">
                <FlaskConical size={40} />
                <Leaf size={42} />
              </div>
              <div className="subject-body">
                <span className="subject-tag">LET’S ASK WHY</span>
                <h3>Wonderful science</h3>
                <p>Plants, animals, and our world.</p>
                <div className="card-bottom">
                  <span>Class 1–5 · Explore &amp; try</span>
                  <ArrowRight />
                </div>
              </div>
            </a>
          </div>

          <section className="home-tools" aria-label="Practice tools">
            <a href={`/?view=voice&grade=${grade}`} className="home-voice">
              <Mic size={28} />
              <div>
                <h2>Voice Garden</h2>
                <p>Optional voice practice with visual feedback.</p>
              </div>
              <ArrowRight size={22} />
            </a>
            <a href={`/?view=progress&grade=${grade}`}>
              <Trophy size={26} />
              <span>My progress</span>
              <ArrowRight size={20} />
            </a>
          </section>
          <section className="activity-strip">
            <span className="activity-icon">
              <Sparkles />
            </span>
            <div>
              <h3>Take a quick picture challenge.</h3>
              <p>No timer. Just explore and play.</p>
            </div>
            <a className="secondary" href={`/?view=activities&grade=${grade}`}>
              Let’s play <ArrowRight size={17} />
            </a>
          </section>

          <footer className="page-footer">
            <span>
              <Sprout size={16} /> Every learner moves at their pace.
            </span>
            <span>Free for everyone to learn.</span>
          </footer>
        </>
      )}
    </AppShell>
  );
}
