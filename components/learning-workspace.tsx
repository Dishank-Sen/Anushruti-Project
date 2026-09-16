'use client';
/* oxlint-disable react/react-compiler, next/no-html-link-for-pages, next/no-img-element -- Intentional post-hydration browser storage load and full document demo navigation. React Compiler is not enabled. */
import { useEffect, useState } from 'react';
import { useLearningTools } from '@/hooks/use-learning-tools';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Hand,
  Sparkles,
  Trophy,
  Play,
  RotateCcw,
} from 'lucide-react';
import { lessons, type Lesson, scienceImages } from '@/lib/lessons';
import { ScienceLab, SciencePhoto } from '@/components/science-lab';
import {
  emptyProgress,
  parseProgress,
  completeLesson,
  storageKey,
  type ProgressData,
} from '@/lib/progress';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
export function LearningWorkspace({
  view,
  grade,
}: {
  view: string;
  grade: number;
}) {
  const [progress, setProgress] = useState<ProgressData>(emptyProgress);
  const [ready, setReady] = useState(false);
  const [storageWarning, setStorageWarning] = useState('');
  const [subject, setSubject] = useState('All');
  const [sciencePath, setSciencePath] = useState('ncert');
  const [lessonId, setLessonId] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [notice, setNotice] = useState('');
  useLearningTools(progress, ready);
  useEffect(() => {
    setProgress(parseProgress(localStorageSafe()));
    const q = new URLSearchParams(location.search);
    setSubject(
      q.get('subject') === 'Maths'
        ? 'Maths'
        : q.get('subject') === 'Science'
          ? 'Science'
          : 'All',
    );
    setLessonId(q.get('id') || '');
    setReady(true);
  }, []);
  function localStorageSafe() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      setStorageWarning(
        'This browser cannot save progress. You can still learn during this visit.',
      );
      return null;
    }
  }
  function save(next: ProgressData) {
    setProgress(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      setStorageWarning(
        'Progress could not be saved on this device. Keep this page open to continue.',
      );
    }
  }
  const lesson = lessons.find((l) => l.id === lessonId);
  const filtered = lessons.filter(
    (l) =>
      l.grade === grade &&
      (subject === 'All' || l.subject === subject) &&
      !(
        grade === 1 &&
        subject === 'Science' &&
        (sciencePath === 'ncert'
          ? !l.curriculum
          : sciencePath === 'extras'
            ? !!l.curriculum
            : false)
      ),
  );
  const step = lesson ? progress.steps[lesson.id] || 0 : 0;
  function moveStep(next: number) {
    if (!lesson) return;
    save({ ...progress, steps: { ...progress.steps, [lesson.id]: next } });
    setSelected(null);
    setChecked(false);
    setNotice('');
  }
  function answer(l: Lesson) {
    if (selected === null) return;
    const correct = selected === l.question.answer;
    save({ ...progress, answers: { ...progress.answers, [l.id]: correct } });
    setChecked(true);
  }
  function card(l: Lesson, activity = false) {
    const done = progress.completed.includes(l.id);
    return (
      <a
        key={l.id}
        className={`lesson-card ${l.subject.toLowerCase()}`}
        href={`/?view=${activity ? 'activity' : 'lesson'}&id=${l.id}&grade=${l.grade}`}
      >
        <div className="lesson-visual" aria-hidden="true">
          {l.science ? (
            <img
              className="science-card-photo"
              src={scienceImages[l.science.image].src}
              alt=""
              loading="lazy"
            />
          ) : (
            l.steps[0].visual
          )}
        </div>
        <div className="lesson-card-body">
          <span className="subject-tag">
            {l.curriculum
              ? 'NCERT topic'
              : l.science
                ? 'Extra · ' + l.science.topic
                : l.subject}{' '}
            · Class {l.grade}
          </span>
          <h3>{l.title}</h3>
          <p>{l.description}</p>
          <div className="card-bottom">
            <span>
              {activity
                ? 'Picture challenge'
                : `${l.minutes} min · ${l.steps.length} visual steps`}
            </span>
            {done && !activity ? (
              <CheckCircle aria-label="Completed" />
            ) : (
              <ArrowRight />
            )}
          </div>
        </div>
      </a>
    );
  }
  function question(l: Lesson) {
    return (
      <section className="question-box">
        <span className="eyebrow">YOUR TURN · NO TIMER</span>
        <h2>{l.question.prompt}</h2>
        <fieldset className="answer-options" aria-label="Answer choices">
          {l.question.options.map((option, i) => (
            <button
              key={option}
              className={`answer-option ${selected === i ? 'chosen' : ''}`}
              aria-pressed={selected === i}
              onClick={() => {
                setSelected(i);
                setChecked(false);
              }}
            >
              <span>{String.fromCharCode(65 + i)}</span>
              {option}
            </button>
          ))}
        </fieldset>
        <button
          className="primary"
          disabled={selected === null || checked}
          onClick={() => answer(l)}
        >
          Check my answer <CheckCircle size={18} />
        </button>
        <div aria-live="polite">
          {checked && (
            <div
              className={`feedback ${selected === l.question.answer ? 'correct' : ''}`}
            >
              <strong>
                {selected === l.question.answer
                  ? '✓ You’ve got it!'
                  : '↻ Let’s look again.'}
              </strong>
              <p>{l.question.hint}</p>
              {selected !== l.question.answer && (
                <button
                  className="secondary"
                  onClick={() => {
                    setChecked(false);
                    setSelected(null);
                  }}
                >
                  Try again
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }
  if (!ready)
    return <output className="panel">Opening your learning space…</output>;
  return (
    <div className="workspace">
      {storageWarning && <output className="notice">{storageWarning}</output>}
      {(view === 'lessons' || view === 'activities') && (
        <>
          <div className="page-heading">
            <div>
              <p className="eyebrow">CLASS {grade} · YOUR PACE, YOUR WAY</p>
              <h1>
                {view === 'lessons'
                  ? 'Little lessons. Big discoveries.'
                  : 'Let’s learn by playing.'}
              </h1>
              <p>
                {view === 'lessons'
                  ? 'Pick a lesson. Look, explore and try.'
                  : 'Choose a picture challenge. Try as many times as you like.'}
              </p>
            </div>
          </div>
          <Tabs value={subject} onValueChange={(v) => setSubject(String(v))}>
            <TabsList className="subject-tabs" aria-label="Subject">
              <TabsTrigger value="All">All subjects</TabsTrigger>
              <TabsTrigger value="Maths">Maths</TabsTrigger>
              <TabsTrigger value="Science">Science</TabsTrigger>
            </TabsList>
            {['All', 'Maths', 'Science'].map((s) => (
              <TabsContent key={s} value={s}>
                {grade === 1 && s === 'Science' && (
                  <div className="science-welcome">
                    <span>🌿 + 🪐</span>
                    <div>
                      <p className="eyebrow">LITTLE SCIENTISTS · CLASS 1</p>
                      <h2>Discover the world around you.</h2>
                      <p>NCERT topic practice, plus extra discoveries.</p>
                    </div>
                  </div>
                )}
                {grade === 1 && s === 'Science' && (
                  <>
                    <fieldset
                      className="science-paths"
                      aria-label="Science learning path"
                    >
                      {[
                        ['ncert', 'NCERT topics'],
                        ['extras', 'Extra discoveries'],
                        ['all', 'All science'],
                      ].map(([value, label]) => (
                        <button
                          key={value}
                          className={
                            sciencePath === value ? 'primary' : 'secondary'
                          }
                          aria-pressed={sciencePath === value}
                          onClick={() => setSciencePath(value)}
                        >
                          {label}
                        </button>
                      ))}
                    </fieldset>
                    <details className="curriculum-map">
                      <summary>NCERT Class 1 topic list & lesson map</summary>
                      <p>
                        Class 1 environmental learning is integrated with
                        language and maths. These are our activities mapped to
                        NCERT topics, not official textbook chapters. Extra
                        discoveries include space and photosynthesis.
                      </p>
                      <a
                        href="https://ncert.nic.in/pdf/publication/otherpublications/Learning_Outcome_for_the_Foundational_Stage.pdf#page=53"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Read NCERT’s foundational-stage syllabus ↗
                      </a>
                      <ul>
                        {lessons
                          .filter((l) => l.curriculum)
                          .map((l) => (
                            <li key={l.id}>
                              <a href={`/?view=lesson&id=${l.id}&grade=1`}>
                                {l.curriculum!.label} → {l.title}
                              </a>
                              <small>
                                NCERT printed p. {l.curriculum!.page}
                              </small>
                            </li>
                          ))}
                      </ul>
                      <p>
                        Educator review is still needed. Screen activities
                        supplement real-world learning and do not certify
                        physical or sensory competencies.
                      </p>
                    </details>
                  </>
                )}
                <div className="lesson-grid">
                  {filtered.map((l) => card(l, view === 'activities'))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <p className="content-note">
            A small collection of sample lessons. More adventures will grow
            here.
          </p>
        </>
      )}
      {(view === 'lesson' || view === 'activity') &&
        (lesson ? (
          <>
            <a
              className="back-link"
              href={`/?view=${view === 'activity' ? 'activities' : 'lessons'}&grade=${lesson.grade}`}
            >
              <ArrowLeft size={17} /> Back to{' '}
              {view === 'activity' ? 'activities' : 'lessons'}
            </a>
            <div className="page-heading">
              <div>
                <p className="eyebrow">
                  {lesson.subject} · CLASS {lesson.grade}
                </p>
                <h1>{lesson.title}</h1>
                <p>{lesson.description}</p>
              </div>
              <span className="pill">
                {view === 'activity' ? 'Picture challenge' : 'Visual lesson'}
              </span>
            </div>
            {lesson.science && lesson.grade === 1 && (
              <>
                <ScienceLab key={lesson.id} lesson={lesson} />
                {!lesson.guided && (
                  <SciencePhoto image={lesson.science.image} />
                )}
              </>
            )}
            {view === 'lesson' && (
              <>
                <div className="lesson-layout">
                  <section className="player">
                    <div className="player-top">
                      <span>
                        STEP {step + 1} OF {lesson.steps.length}
                      </span>
                      <span>Go at your own pace</span>
                    </div>
                    <div
                      className="teaching-visual"
                      key={step}
                      aria-label={lesson.steps[step].title}
                    >
                      {lesson.steps[step].visual}
                    </div>
                    <div className="step-copy" aria-live="polite">
                      <h2>{lesson.steps[step].title}</h2>
                      <p>{lesson.steps[step].text}</p>
                    </div>
                    <Progress
                      value={((step + 1) / lesson.steps.length) * 100}
                      aria-label="Lesson steps viewed"
                    />
                    <div className="player-controls">
                      <button
                        className="secondary"
                        disabled={step === 0}
                        onClick={() => moveStep(step - 1)}
                      >
                        <ArrowLeft size={17} /> Back
                      </button>
                      {step < lesson.steps.length - 1 ? (
                        <button
                          className="primary"
                          onClick={() => moveStep(step + 1)}
                        >
                          Next step <ArrowRight size={17} />
                        </button>
                      ) : (
                        <button
                          className="primary"
                          onClick={() => {
                            save(completeLesson(progress, lesson.id));
                            setNotice(
                              '✓ Lesson complete! Your garden is growing.',
                            );
                          }}
                        >
                          Finish lesson <CheckCircle size={17} />
                        </button>
                      )}
                    </div>
                    <output className="success-note">
                      {notice ||
                        (progress.completed.includes(lesson.id)
                          ? '✓ You completed this visual lesson. You can revisit it any time.'
                          : '')}
                    </output>
                  </section>
                  <aside className="lesson-aside">
                    <h3>
                      <BookOpen size={19} /> In this lesson
                    </h3>
                    {lesson.steps.map((s, i) => (
                      <button
                        className={step === i ? 'current-step' : ''}
                        key={s.title}
                        onClick={() => moveStep(i)}
                      >
                        <span>{i + 1}</span>
                        {s.title}
                      </button>
                    ))}
                    <div className="media-note">
                      <Hand />
                      <strong>Sign-language video</strong>
                      <p>
                        Coming with educator-reviewed ISL clips. This sample
                        uses pictures and text.
                      </p>
                    </div>
                  </aside>
                </div>
                <details className="transcript">
                  <summary>Read the full lesson</summary>
                  {lesson.steps.map((s) => (
                    <div key={s.title}>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  ))}
                </details>
              </>
            )}
            {question(lesson)}
            {view === 'activity' && (
              <a
                className="back-link"
                href={`/?view=lesson&id=${lesson.id}&grade=${lesson.grade}`}
              >
                <BookOpen size={18} /> Explore the lesson first
              </a>
            )}
          </>
        ) : (
          <section className="panel">
            <h1>We couldn’t find this lesson.</h1>
            <a className="primary" href="/?view=lessons">
              Choose another lesson
            </a>
          </section>
        ))}
      {view === 'progress' && (
        <>
          <div className="page-heading">
            <div>
              <p className="eyebrow">EVERY LITTLE STEP COUNTS</p>
              <h1>
                Look how you’re growing <span>🌱</span>
              </h1>
              <p>Your learning, saved on this device.</p>
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat">
              <BookOpen />
              <strong>{progress.completed.length}</strong>
              <span>Lessons completed</span>
            </div>
            <div className="stat">
              <Sparkles />
              <strong>{Object.keys(progress.answers).length}</strong>
              <span>Activities tried</span>
            </div>
            <div className="stat">
              <Trophy />
              <strong>
                {Object.values(progress.answers).filter(Boolean).length}
              </strong>
              <span>Activities understood</span>
            </div>
          </div>
          <section className="panel">
            <h2>Your learning path</h2>
            {['Maths', 'Science'].map((s) => {
              const total = lessons.filter((l) => l.subject === s);
              const count = total.filter((l) =>
                progress.completed.includes(l.id),
              ).length;
              return (
                <div className="subject-progress" key={s}>
                  <div>
                    <strong>{s}</strong>
                    <span>
                      {count} of {total.length} sample lessons
                    </span>
                  </div>
                  <Progress
                    value={(count / total.length) * 100}
                    aria-label={`${s} completed lessons`}
                  />
                </div>
              );
            })}
          </section>
          {progress.completed.length === 0 ? (
            <section className="empty-state">
              <SproutIcon />
              <h2>Your first discovery is waiting.</h2>
              <p>Finish a lesson and see your progress grow here.</p>
              <a className="primary" href={`/?view=lessons&grade=${grade}`}>
                Find a lesson <ArrowRight size={17} />
              </a>
            </section>
          ) : (
            <section className="panel">
              <h2>Look what you explored</h2>
              {lessons
                .filter((l) => progress.completed.includes(l.id))
                .map((l) => (
                  <a
                    className="completed-row"
                    key={l.id}
                    href={`/?view=lesson&id=${l.id}&grade=${l.grade}`}
                  >
                    <CheckCircle />
                    <span>
                      {l.title}
                      <small>
                        {l.curriculum
                          ? 'NCERT topic'
                          : l.science
                            ? 'Extra · ' + l.science.topic
                            : l.subject}{' '}
                        · Class {l.grade}
                      </small>
                    </span>
                    <span>Visit again →</span>
                  </a>
                ))}
            </section>
          )}
          <p className="content-note">
            Activities understood counts your latest correct answer for each
            activity. This is practice feedback, not a grade. No video watch
            data is collected.
          </p>
          <AlertDialog>
            <AlertDialogTrigger className="text-button">
              <RotateCcw size={16} /> Reset this device’s progress
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Start a fresh garden?</AlertDialogTitle>
              <AlertDialogDescription>
                This clears lesson and activity progress on this browser. It
                cannot be undone.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep my progress</AlertDialogCancel>
                <AlertDialogAction onClick={() => save(emptyProgress())}>
                  Reset progress
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
      {view === 'communication' && (
        <>
          <p className="eyebrow">EXPRESS YOURSELF, YOUR WAY</p>
          <h1>There’s more than one way to say it.</h1>
          <p className="intro-copy">
            Point to a card to show someone what you need.
          </p>
          <div className="communication-grid">
            {[
              ['🙋', 'I need help'],
              ['🔁', 'Show me again'],
              ['☕', 'I need a break'],
              ['😊', 'I understand'],
            ].map(([symbol, label]) => (
              <button
                className="communication-card"
                key={label}
                onClick={() => setNotice(`${symbol} ${label}`)}
              >
                <span aria-hidden="true">{symbol}</span>
                <strong>{label}</strong>
              </button>
            ))}
          </div>
          <output className="communication-output" aria-live="polite">
            {notice || 'Your message will appear here.'}
          </output>
          <section className="panel">
            <Hand />
            <h2>More ways to practise, coming later</h2>
            <p>
              Sign-language stories and optional speech practice will be added
              with educators. You will always be able to learn without speaking.
            </p>
            <p className="content-note">
              These are picture-and-text cards, not sign-language instructions.
            </p>
          </section>
        </>
      )}
      {view === 'team' && (
        <>
          <p className="eyebrow">FOR THE PEOPLE HELPING THIS GARDEN GROW</p>
          <h1>Team workspace</h1>
          <p className="intro-copy">
            Plan, review and care for every learning experience.
          </p>
          <p className="notice">
            Prototype workspace · No sign-in or admin permissions are connected.
            Content changes happen through GitHub pull requests.
          </p>
          <Tabs defaultValue="content">
            <TabsList className="subject-tabs">
              <TabsTrigger value="content">Content library</TabsTrigger>
              <TabsTrigger value="workflow">Roles & workflow</TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <section className="panel">
                <h2>Sample curriculum</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lesson</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Review</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lessons.map((l) => (
                      <TableRow key={l.id}>
                        <TableCell>
                          {l.title}
                          <small className="table-subject">{l.subject}</small>
                        </TableCell>
                        <TableCell>{l.grade}</TableCell>
                        <TableCell>
                          <span className="status-chip">
                            Sample · needs review
                          </span>
                        </TableCell>
                        <TableCell>
                          <a
                            className="back-link"
                            href={`/?view=lesson&id=${l.id}&grade=${l.grade}`}
                          >
                            <Play size={15} /> Preview
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </section>
            </TabsContent>
            <TabsContent value="workflow">
              <div className="role-grid">
                {[
                  [
                    '01',
                    'Intern / contributor',
                    'Create a focused branch. Add content or code. Open a draft PR.',
                  ],
                  [
                    '02',
                    'Mentor / reviewer',
                    'Check accuracy, accessibility and tests. Help the contributor improve.',
                  ],
                  [
                    '03',
                    'Maintainer / admin',
                    'Approve reviewed work, merge PRs, and manage releases and access.',
                  ],
                ].map(([n, title, body]) => (
                  <section className="panel" key={n}>
                    <span className="role-number">{n}</span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </section>
                ))}
              </div>
              <section className="panel">
                <h2>Before a lesson reaches a child</h2>
                <p>
                  Educational content and ISL media need specialist review with
                  deaf educators. Every flow must work with sound off, support
                  keyboard use, and give visible feedback.
                </p>
                <a
                  className="primary"
                  href="https://github.com/calmsky2811/Anushruti-Project"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open project on GitHub <ArrowRight size={17} />
                </a>
              </section>
            </TabsContent>
          </Tabs>
        </>
      )}
      {![
        'lessons',
        'activities',
        'lesson',
        'activity',
        'progress',
        'communication',
        'team',
      ].includes(view) && (
        <section className="panel">
          <h1>Let’s find your way back.</h1>
          <a className="primary" href="/">
            Go to my garden
          </a>
        </section>
      )}
    </div>
  );
}
function SproutIcon() {
  return (
    <span className="empty-icon" aria-hidden="true">
      🌱
    </span>
  );
}
