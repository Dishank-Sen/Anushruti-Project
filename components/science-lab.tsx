'use client';
/* oxlint-disable next/no-img-element, jsx-a11y/prefer-tag-over-role -- Local static photographs and a labelled inline SVG diagram. */
import { useState } from 'react';
import {
  LeafFactory,
  LivingSort,
  BodyMatch,
  WeatherPack,
} from './science-more';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RotateCcw, Sparkles } from 'lucide-react';
import {
  scienceImages,
  butterflyStages,
  spaceObjects,
  type Lesson,
} from '@/lib/lessons';

export function SciencePhoto({ image }: { image: keyof typeof scienceImages }) {
  const photo = scienceImages[image];
  return (
    <figure className="science-photo">
      <img
        src={photo.src}
        alt={photo.alt}
        width={1200}
        height={900}
        loading="lazy"
      />
      <figcaption>
        {image === 'body' ? 'Picture model' : 'Real-world window'}{' '}
        <a href={photo.source} target="_blank" rel="noreferrer">
          {photo.credit} ↗
        </a>
      </figcaption>
    </figure>
  );
}
export function ScienceLab({ lesson }: { lesson: Lesson }) {
  const [round, setRound] = useState(0);
  if (!lesson.science || lesson.grade !== 1) return null;
  return (
    <section
      className={`science-lab science-${lesson.science.activity}`}
      aria-label="Discovery lab"
    >
      <header>
        <div>
          <span className="eyebrow">LOOK · TOUCH · DISCOVER</span>
          <h2>Your little discovery lab</h2>
        </div>
        <Button variant="outline" onClick={() => setRound((n) => n + 1)}>
          <RotateCcw size={16} /> Start again
        </Button>
      </header>
      <div key={round}>
        {lesson.science.activity === 'grow' ? (
          <Grow />
        ) : lesson.science.activity === 'cycle' ? (
          <Cycle />
        ) : lesson.science.activity === 'space' ? (
          <Space />
        ) : lesson.science.activity === 'food' ? (
          <LeafFactory />
        ) : lesson.science.activity === 'living' ? (
          <LivingSort />
        ) : lesson.science.activity === 'body' ? (
          <BodyMatch />
        ) : lesson.science.activity === 'weather' ? (
          <WeatherPack />
        ) : (
          <Day />
        )}
      </div>
    </section>
  );
}
function Reward({
  children,
  complete = false,
}: {
  children: React.ReactNode;
  complete?: boolean;
}) {
  return (
    <output
      className={`science-feedback ${complete ? 'celebrate' : ''}`}
      aria-live="polite"
    >
      <Sparkles aria-hidden="true" size={24} />
      <span>{children}</span>
    </output>
  );
}
function Grow() {
  const [needs, setNeeds] = useState<string[]>([]);
  const [grown, setGrown] = useState(false);
  const [part, setPart] = useState('');
  const ready = needs.length === 3;
  const parts = {
    Roots: 'Roots hold the plant and take in water.',
    Stem: 'The stem holds the plant up and carries water.',
    Leaves: 'Leaves use light to help make food.',
  };
  return (
    <div className="science-experiment">
      <div className={`plant-scene ${grown ? 'grown' : ''}`}>
        <span className="scene-badge">
          {grown ? 'A growing plant' : 'Your tiny seedling'}
        </span>
        <div className="plant-weather" aria-hidden="true">
          {needs.includes('Light') ? '☀️' : '☁️'}{' '}
          {needs.includes('Water') ? '💧' : ''}{' '}
          {needs.includes('Air') ? '〰' : ''}
        </div>
        <svg
          viewBox="0 0 400 320"
          aria-label="Plant with roots below the soil, a stem and leaves"
          role="img"
        >
          <path d="M0 250 Q100 235 200 250 T400 250 V320 H0Z" fill="#bb8760" />
          <g
            className="plant-roots"
            stroke="#f6e6bf"
            strokeWidth="5"
            fill="none"
          >
            <path d="M200 248V300 M200 275L170 291 M200 264L225 286" />
          </g>
          <g className="plant-growth">
            <path
              d="M200 250 Q190 180 200 85"
              fill="none"
              stroke="#2e8555"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M198 190 Q125 185 130 132 Q185 129 198 190 M199 145 Q264 140 269 95 Q214 88 199 145"
              fill="#65b66c"
            />
            <circle cx="201" cy="83" r="14" fill="#f3c759" />
          </g>
        </svg>
        {grown && (
          <div className="plant-labels">
            {Object.keys(parts).map((name) => (
              <Button
                key={name}
                variant={part === name ? 'default' : 'outline'}
                onClick={() => setPart(name)}
              >
                {name}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="experiment-controls">
        <h3>{grown ? 'Meet the plant parts' : 'What does our plant need?'}</h3>
        <p>
          {grown
            ? 'Tap a part to discover its job.'
            : 'Add all three. Then let time pass.'}
        </p>
        <div className="science-choice-row">
          {[
            ['Light', '☀️'],
            ['Water', '💧'],
            ['Air', '〰'],
          ].map(([name, symbol]) => (
            <Button
              key={name}
              variant={needs.includes(name) ? 'default' : 'outline'}
              aria-pressed={needs.includes(name)}
              disabled={grown}
              onClick={() =>
                setNeeds((n) =>
                  n.includes(name) ? n.filter((x) => x !== name) : [...n, name],
                )
              }
            >
              <span>{symbol}</span> {name} {needs.includes(name) ? '✓' : '+'}
            </Button>
          ))}
        </div>
        <Progress
          value={(needs.length / 3) * 100}
          aria-label="Plant needs added"
        />
        <Button disabled={!ready || grown} onClick={() => setGrown(true)}>
          Let days pass →
        </Button>
        <Reward complete={grown}>
          {grown
            ? part
              ? parts[part as keyof typeof parts]
              : '★ You helped it grow! Real plants take days and weeks.'
            : ready
              ? '✓ Light, water and air. Ready to grow!'
              : `${needs.length} of 3 needs added`}
        </Reward>
        <small>
          Soil supports this plant and supplies nutrients. This is a simplified
          model.
        </small>
      </div>
    </div>
  );
}
function Cycle() {
  const [order, setOrder] = useState<number[]>([]);
  const [message, setMessage] = useState(
    'Start with the egg. What comes next?',
  );
  const complete = order.length === 4;
  function choose(index: number) {
    if (index === order.length) {
      setOrder([...order, index]);
      setMessage(
        index === 3
          ? '★ A whole life cycle! A butterfly can lay eggs again.'
          : butterflyStages[index].text,
      );
    } else
      setMessage(
        `Try ${butterflyStages[order.length].label.toLowerCase()} next. You can try again.`,
      );
  }
  return (
    <>
      <div className="cycle-track">
        {butterflyStages.map((stage, i) => (
          <div
            className={`cycle-slot ${order.includes(i) ? 'revealed' : ''}`}
            key={stage.label}
          >
            <span className="cycle-number">{i + 1}</span>
            <span className="cycle-symbol" aria-hidden="true">
              {order.includes(i) ? i === 2 ? <Chrysalis /> : stage.symbol : '?'}
            </span>
            <strong>
              {order.includes(i) ? stage.label : 'What comes next?'}
            </strong>
            {i < 3 && (
              <span className="cycle-arrow" aria-hidden="true">
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="science-choice-row">
        {[2, 0, 3, 1].map((i) => (
          <Button
            key={i}
            variant="outline"
            disabled={order.includes(i)}
            onClick={() => choose(i)}
          >
            {i === 2 ? '◈' : butterflyStages[i].symbol}{' '}
            {butterflyStages[i].label} {order.includes(i) ? '✓' : ''}
          </Button>
        ))}
      </div>
      <Reward complete={complete}>{message}</Reward>
      <p className="science-model-note">
        Picture symbols show the stages. The photograph shows real adult monarch
        butterflies.
      </p>
    </>
  );
}
function Space() {
  const [selected, setSelected] = useState(0);
  const [found, setFound] = useState<number[]>([]);
  const [message, setMessage] = useState('Tap a neighbour. Look closely!');
  const [challenge, setChallenge] = useState(false);
  const item = spaceObjects[selected];
  const complete = found.length === 3;
  function choose(index: number) {
    setSelected(index);
    if (!challenge || complete) return;
    if (index === found.length) {
      setFound([...found, index]);
      setMessage(
        found.length === 2
          ? '★ Three space neighbours discovered!'
          : `✓ That is ${spaceObjects[index].label}!`,
      );
    } else setMessage('Look again. You can try another neighbour.');
  }
  return (
    <>
      <div className="space-stage">
        <div className="space-objects">
          {spaceObjects.map((object, i) => (
            <button
              key={object.label}
              className={`space-object ${selected === i ? 'selected' : ''}`}
              aria-pressed={selected === i}
              onClick={() => choose(i)}
            >
              {object.image ? (
                <img src={scienceImages[object.image].src} alt="" />
              ) : (
                <span className="model-sun" aria-hidden="true">
                  ☀
                </span>
              )}
              <strong>{object.label}</strong>
            </button>
          ))}
        </div>
        <p>Picture model · sizes and distances are not to scale</p>
      </div>
      <div className="space-fact" aria-live="polite">
        <h3>{item.label}</h3>
        <p>{item.fact}</p>
      </div>
      {!challenge ? (
        <Button
          onClick={() => {
            setChallenge(true);
            setMessage('Find each neighbour.');
          }}
        >
          Play find-it <Sparkles size={17} />
        </Button>
      ) : (
        <h3 className="science-task">
          {complete
            ? 'All found! Explore again above.'
            : spaceObjects[found.length].task}
        </h3>
      )}
      <Reward complete={complete}>
        {message}
        {challenge && ` · ${found.length}/3 found`}
      </Reward>
      <details className="science-credits">
        <summary>Photo credits</summary>
        {(['earth', 'moon'] as const).map((key) => (
          <p key={key}>
            <a
              href={scienceImages[key].source}
              target="_blank"
              rel="noreferrer"
            >
              {scienceImages[key].credit}
            </a>
          </p>
        ))}
      </details>
    </>
  );
}
function Day() {
  const [turn, setTurn] = useState(0);
  const [visited, setVisited] = useState(false);
  const [answer, setAnswer] = useState('');
  const night = turn % 2 === 1;
  return (
    <>
      <div className="day-model">
        <div className="day-sun" aria-hidden="true">
          ☀
        </div>
        <div className="sun-rays" aria-hidden="true">
          → → →
        </div>
        <div className="turning-earth">
          <div
            className="earth-land"
            style={{ transform: `rotate(${turn * 180}deg)` }}
          >
            <span className="explorer-dot" aria-label="Our place">
              ★
            </span>
          </div>
          <div className="earth-shadow" />
          <span className="earth-caption">Earth</span>
        </div>
      </div>
      <div className="day-caption" aria-live="polite">
        <strong>
          {night ? '🌃 Night at our place' : '☀️ Day at our place'}
        </strong>
        <p>
          {night
            ? 'Our star marker faces away from the Sun.'
            : 'Our star marker faces the Sun.'}
        </p>
      </div>
      <div className="science-choice-row">
        <Button
          onClick={() => {
            setTurn((n) => n + 1);
            setVisited(true);
            setAnswer('');
          }}
        >
          Turn Earth halfway ↻
        </Button>
      </div>
      <p className="science-model-note">
        View from above · simplified model · one full turn takes about a day.
      </p>
      {visited && (
        <div className="day-question">
          <h3>Is the Sun still shining at night?</h3>
          <div className="science-choice-row">
            <Button variant="outline" onClick={() => setAnswer('yes')}>
              Yes ☀️
            </Button>
            <Button variant="outline" onClick={() => setAnswer('no')}>
              No
            </Button>
          </div>
        </div>
      )}
      <Reward complete={answer === 'yes'}>
        {answer === 'yes'
          ? '★ Yes! Earth turns. The Sun keeps shining.'
          : answer === 'no'
            ? 'Look at the Sun in the model. It stays bright. Try again.'
            : 'Follow the ★ marker as Earth turns.'}
      </Reward>
    </>
  );
}

function Chrysalis() {
  return (
    <svg className="chrysalis-diagram" viewBox="0 0 80 100" aria-hidden="true">
      <path
        d="M10 10H70 M40 10V26"
        stroke="#76553a"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M40 24C23 28 19 45 25 63L40 89L55 63C61 45 57 28 40 24Z"
        fill="#85bb8c"
        stroke="#3d775a"
        strokeWidth="2"
      />
      <path
        d="M25 43Q40 53 55 43"
        fill="none"
        stroke="#e4ca6f"
        strokeWidth="4"
      />
      <path
        d="M32 57L40 79L48 57"
        fill="none"
        stroke="#5d986d"
        strokeWidth="2"
      />
    </svg>
  );
}
