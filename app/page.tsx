'use client';
/* oxlint-disable react/react-compiler, next/no-html-link-for-pages -- Browser query hydration is intentional; full document links reset each demo view and read its local progress. React Compiler is not enabled. */
import { useState, useEffect } from 'react';
import { LearningWorkspace } from '@/components/learning-workspace';
import { VoiceStudio } from '@/components/voice-studio';
import { Mic } from 'lucide-react';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  FlaskConical,
  Home,
  Leaf,
  Hand,
  Trophy,
  Settings,
  Sparkles,
  Sprout,
} from 'lucide-react';
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
const navigation = [
  { icon: Home, label: 'My garden', view: 'garden' },
  { icon: BookOpen, label: 'All lessons', view: 'lessons' },
  { icon: Sparkles, label: 'Activities', view: 'activities' },
  { icon: Trophy, label: 'My progress', view: 'progress' },
  { icon: Hand, label: 'Communication', view: 'communication' },
  { icon: Mic, label: 'Voice garden', view: 'voice' },
];
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
  return (
    <SidebarProvider>
      <a className="skip-link" href="#main">
        Skip to learning
      </a>
      <Sidebar>
        <SidebarHeader>
          <a className="brand" href="/">
            <span className="brand-icon">
              <Sprout />
            </span>
            <span>
              Anushruti<small>A little wonder, every day.</small>
            </span>
          </a>
        </SidebarHeader>
        <SidebarContent>
          <p className="nav-caption">MY LEARNING SPACE</p>
          <SidebarMenu>
            {navigation.map(({ icon: Icon, label, view: navView }) => (
              <SidebarMenuItem key={navView}>
                <SidebarMenuButton
                  render={
                    <a
                      aria-label={label}
                      href={`/?view=${navView}&grade=${grade}`}
                    />
                  }
                  isActive={
                    view === navView ||
                    (view === 'lesson' && navView === 'lessons') ||
                    (view === 'activity' && navView === 'activities')
                  }
                >
                  <Icon />
                  <span>{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="quiet-note">
            <Hand />
            <strong>Made for your way of learning</strong>
            <p>
              Look. Explore. Try.
              <br />
              Take all the time you need.
            </p>
          </div>
          <a className="team-link" href="/?view=team">
            <Settings size={18} /> Team workspace
          </a>
          <div className="profile">
            <span>🌻</span>
            <div>
              Curious explorer<small>Learning on this device</small>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="page-shell">
        <header className="topbar">
          <div>
            <SidebarTrigger />
            <span>Your learning garden</span>
          </div>
          <span className="sound-free">
            <Hand size={17} />{' '}
            {view === 'voice' ? 'No listening needed' : 'No sound needed'}
          </span>
        </header>
        <main id="main">
          {view !== 'garden' ? (
            <>
              {['lessons', 'activities', 'progress'].includes(view) && (
                <div className="workspace-grade">
                  <label className="grade-label">
                    Learning level
                    <select
                      value={grade}
                      onChange={(e) => changeGrade(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((g) => (
                        <option value={g} key={g}>
                          Class {g}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}
              {view === 'voice' ? (
                <VoiceStudio />
              ) : (
                <LearningWorkspace view={view} grade={grade} />
              )}
            </>
          ) : (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">LET’S GROW TOGETHER</p>
                  <h1>
                    Hello, curious explorer <span>☀️</span>
                  </h1>
                  <p>Big discoveries start with little steps.</p>
                </div>
                <label className="grade-label">
                  I’m learning in
                  <select
                    value={grade}
                    onChange={(e) => changeGrade(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((g) => (
                      <option key={g} value={g}>
                        Class {g}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <section className="welcome">
                <div>
                  <span className="pill">YOUR NEXT LITTLE ADVENTURE</span>
                  <h2>
                    A world of wonder.
                    <br />A way that’s yours.
                  </h2>
                  <p>
                    See it. Try it. Understand it.
                    <br />
                    Let’s discover something new today.
                  </p>
                  <a className="primary" href={`/?view=lessons&grade=${grade}`}>
                    Explore lessons <ArrowRight size={18} />
                  </a>
                </div>
                <div
                  className="math-art"
                  aria-label="Two circles plus one circle equals three"
                >
                  <div className="art-label">small steps, BIG discoveries</div>
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
                    Let’s count together! <Sparkles size={20} />
                  </span>
                </div>
              </section>
              <div className="section-heading">
                <h2>What will you discover?</h2>
                <span>CHOOSE YOUR ADVENTURE</span>
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
                    <span className="subject-tag">LET’S FIGURE IT OUT</span>
                    <h3>Magic of maths</h3>
                    <p>Numbers, shapes & little aha! moments.</p>
                    <div className="card-bottom">
                      <span>Class 1–5 · Visual lessons</span>
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
                    <p>Plants, our planet & everyday wonders.</p>
                    <div className="card-bottom">
                      <span>Class 1–5 · Explore & try</span>
                      <ArrowRight />
                    </div>
                  </div>
                </a>
              </div>
              <section className="activity-strip">
                <span className="activity-icon">
                  <Sparkles />
                </span>
                <div>
                  <span className="eyebrow">
                    A LITTLE PLAY, A LOT OF LEARNING
                  </span>
                  <h3>Ready for a brain break?</h3>
                  <p>Try a picture challenge. There’s no timer.</p>
                </div>
                <a
                  className="secondary"
                  href={`/?view=activities&grade=${grade}`}
                >
                  Let’s play <ArrowRight size={17} />
                </a>
              </section>
              <footer className="page-footer">
                <span>
                  <Sprout size={16} /> Every learner grows at their own pace.
                </span>
                <span>Free to learn. Open to everyone.</span>
              </footer>
            </>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
