'use client';
/* oxlint-disable next/no-img-element, jsx-a11y/prefer-tag-over-role -- Local educational artwork and labelled SVG model. */
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { livingCards, bodyCards, weatherCards } from '@/lib/lessons';
function Feedback({ text, done = false }: { text: string; done?: boolean }) {
  return (
    <output
      aria-live="polite"
      className={`science-feedback ${done ? 'celebrate' : ''}`}
    >
      {text}
    </output>
  );
}
export function LeafFactory() {
  const [inputs, setInputs] = useState<string[]>([]);
  const [made, setMade] = useState(false);
  const ingredients = [
    ['Sunlight', '☀️'],
    ['Water', '💧'],
    ['Carbon dioxide', '〰'],
  ];
  return (
    <div className="science-experiment">
      <div className={`leaf-factory ${made ? 'food-made' : ''}`}>
        <span className="scene-badge">Inside a green leaf · picture model</span>
        <svg
          viewBox="0 0 400 290"
          role="img"
          aria-label={
            made
              ? 'A leaf has made sugar and released oxygen'
              : 'A green leaf waiting for light, water and carbon dioxide'
          }
        >
          <path
            d="M75 250C10 80 190 15 335 40C370 195 235 295 75 250Z"
            fill="#79b56b"
          />
          <path
            d="M55 275L300 70M135 195L110 105M195 140L270 155"
            stroke="#386947"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <g className="food-sugar" opacity={made ? 1 : 0}>
            <path
              d="M150 135L170 155L150 175L130 155Z M230 95L250 115L230 135L210 115Z"
              fill="#ffe399"
            />
            <circle cx="300" cy="205" r="17" fill="#e1f6f5" />
          </g>
        </svg>
        <div className="factory-output">
          {made ? '◇ Sugar (food) + ○ oxygen' : '☀ + 💧 + gas from air → 🍃'}
        </div>
      </div>
      <div className="experiment-controls">
        <h3>Power the leaf food factory</h3>
        <p>Choose all three helpers.</p>
        <div className="science-choice-row">
          {ingredients.map(([name, symbol]) => (
            <Button
              key={name}
              aria-pressed={inputs.includes(name)}
              disabled={made}
              variant={inputs.includes(name) ? 'default' : 'outline'}
              onClick={() =>
                setInputs((v) =>
                  v.includes(name) ? v.filter((x) => x !== name) : [...v, name],
                )
              }
            >
              {symbol} {name} {inputs.includes(name) ? '✓' : '+'}
            </Button>
          ))}
        </div>
        <small>Carbon dioxide is a gas in the air.</small>
        <Button
          disabled={inputs.length !== 3 || made}
          onClick={() => setMade(true)}
        >
          Make plant food →
        </Button>
        <Feedback
          done={made}
          text={
            made
              ? '★ The leaf made sugar! This is photosynthesis.'
              : `${inputs.length}/3 helpers ready`
          }
        />
        <p className="science-model-note">
          Light supplies energy. Water and carbon dioxide become sugar and
          oxygen. Real leaves make food over time.
        </p>
      </div>
    </div>
  );
}
export function LivingSort() {
  const [index, setIndex] = useState(0);
  const [solved, setSolved] = useState(false);
  const [message, setMessage] = useState(
    'Does it grow and have the needs of a living thing?',
  );
  const card = livingCards[index];
  const complete = solved && index === livingCards.length - 1;
  function pick(living: boolean) {
    if (living === card.living) {
      setSolved(true);
      setMessage(`✓ ${card.why}`);
    } else setMessage(`Try again. ${card.why}`);
  }
  return (
    <>
      <Progress
        value={((index + Number(solved)) / livingCards.length) * 100}
        aria-label="Objects sorted"
      />
      <div className="sorting-object" key={card.name}>
        <span aria-hidden="true">{card.symbol}</span>
        <h3>{card.name}</h3>
        <small>
          Object {index + 1} of {livingCards.length}
        </small>
      </div>
      <div className="science-choice-row">
        <Button variant="outline" disabled={solved} onClick={() => pick(true)}>
          🌱 Living
        </Button>
        <Button variant="outline" disabled={solved} onClick={() => pick(false)}>
          🪨 Non-living
        </Button>
        {solved && !complete && (
          <Button
            onClick={() => {
              setIndex((n) => n + 1);
              setSolved(false);
              setMessage('Look at the next object.');
            }}
          >
            Next object →
          </Button>
        )}
      </div>
      <Feedback
        done={complete}
        text={
          complete
            ? '★ All six sorted! Living things have needs and grow.'
            : message
        }
      />
    </>
  );
}
export function BodyMatch() {
  const [index, setIndex] = useState(0);
  const [solved, setSolved] = useState(false);
  const [message, setMessage] = useState('Choose a picture.');
  const [chosen, setChosen] = useState('');
  const complete = index === bodyCards.length - 1 && solved;
  return (
    <div className="science-experiment">
      <div className="body-picture">
        <img
          src="/images/science/body.svg"
          alt="Illustrated child with eyes, nose and hands"
        />
        <span className="body-highlight" aria-hidden="true">
          {chosen && bodyCards.find((x) => x.name === chosen)?.symbol}
        </span>
      </div>
      <div>
        <span className="eyebrow">MATCH {index + 1} OF 3</span>
        <h3>{bodyCards[index].task}</h3>
        <div className="science-choice-row">
          {[1, 2, 0].map((i) => (
            <Button
              key={i}
              variant="outline"
              disabled={solved}
              onClick={() => {
                setChosen(bodyCards[i].name);
                if (i === index) {
                  setSolved(true);
                  setMessage(`✓ ${bodyCards[i].fact}`);
                } else
                  setMessage('Try another part. You can look at the picture.');
              }}
            >
              {bodyCards[i].symbol} {bodyCards[i].name}
            </Button>
          ))}
        </div>
        {solved && !complete && (
          <Button
            onClick={() => {
              setIndex((n) => n + 1);
              setSolved(false);
              setChosen('');
              setMessage('Choose a picture.');
            }}
          >
            Next match →
          </Button>
        )}
        <Feedback
          done={complete}
          text={complete ? '★ Three matches! Every body belongs.' : message}
        />
        <p className="science-model-note">
          Bodies and abilities differ. This is a picture game; you do not need
          to perform any action.
        </p>
      </div>
    </div>
  );
}
export function WeatherPack() {
  const [index, setIndex] = useState(0);
  const [packed, setPacked] = useState(false);
  const [message, setMessage] = useState(
    'Choose something useful for this weather.',
  );
  const card = weatherCards[index];
  const complete = packed && index === 2;
  return (
    <>
      <div className={`weather-scene weather-${index}`} key={index}>
        <span className="weather-icon" aria-hidden="true">
          {card.symbol}
        </span>
        <div className="weather-hills" aria-hidden="true" />
        <h3>A {card.name.toLowerCase()} day</h3>
        <span
          className="weather-bag"
          aria-label={packed ? `Packed: ${card.item}` : 'Bag is empty'}
        >
          {packed ? card.itemSymbol : '🎒'}
        </span>
      </div>
      <h3>What shall we pack?</h3>
      <div className="science-choice-row">
        {[2, 0, 1].map((i) => (
          <Button
            key={i}
            disabled={packed}
            variant="outline"
            onClick={() => {
              if (index === i) {
                setPacked(true);
                setMessage(`✓ ${card.fact}`);
              } else setMessage('Try another item for this weather.');
            }}
          >
            {weatherCards[i].itemSymbol} {weatherCards[i].item}
          </Button>
        ))}
      </div>
      {packed && !complete && (
        <Button
          onClick={() => {
            setIndex((n) => n + 1);
            setPacked(false);
            setMessage('The weather has changed. Choose an item.');
          }}
        >
          Next day →
        </Button>
      )}
      <Feedback
        done={complete}
        text={complete ? '★ Packed for three kinds of weather!' : message}
      />
      <p className="science-model-note">
        Weather can mix: a sunny day can also be cold. These pictures show one
        useful choice for each scene.
      </p>
    </>
  );
}
