'use client';

import React from 'react';

interface HandSignVisualProps {
  signKey: string;
  className?: string;
  size?: number;
}

/**
 * HandSignVisual: Renders authentic, precise vector SVG demonstrations of Indian Sign Language (ISL) hand shapes.
 * Color convention:
 * - Left Hand (Non-dominant): Soft Peach/Tan (#FED7AA, stroke: #C2410C)
 * - Right Hand (Dominant): Warm Sand/Gold (#FDE68A, stroke: #D97706)
 * - Contact / Touch Point: Red pulse circle / glow (#EF4444)
 * - Motion Path: Blue dashed motion arrows (#2563EB)
 */
export function HandSignVisual({ signKey, className = '', size = 220 }: HandSignVisualProps) {
  const key = signKey.toUpperCase().trim();

  // Helper renderers for common hand poses
  const renderHandContent = () => {
    switch (key) {
      // ----------------------------------------------------
      // VOWELS (A, E, I, O, U: Right index touching left fingertips)
      // ----------------------------------------------------
      case 'A': // Touch thumb
        return (
          <g transform="translate(20, 20)">
            {/* Left Hand: Open palm facing viewer, thumb out */}
            <path
              d="M 50 140 L 50 80 Q 50 65 60 65 Q 70 65 70 80 L 70 55 Q 70 40 80 40 Q 90 40 90 55 L 90 48 Q 90 32 100 32 Q 110 32 110 48 L 110 60 Q 110 48 120 48 Q 130 48 130 65 L 130 110 Q 130 150 90 150 Z"
              fill="#FED7AA" stroke="#C2410C" stroke-width="3" stroke-linejoin="round"
            />
            {/* Thumb extending left */}
            <path d="M 55 95 Q 30 90 22 75 Q 18 65 28 65 Q 40 65 52 82" fill="#FED7AA" stroke="#C2410C" stroke-width="3"/>
            
            {/* Right Hand: Pointing index finger touching the thumb */}
            <g transform="translate(-10, 10)">
              <path d="M 15 50 Q 22 65 26 70" stroke="#2563EB" stroke-width="3" stroke-dasharray="3,3" marker-end="url(#arrow)"/>
              <path d="M 0 35 L 20 65 Q 24 70 20 74 Q 16 76 10 70 L -5 45 Z" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            </g>
            {/* Touch Point */}
            <circle cx="25" cy="72" r="7" fill="#EF4444" opacity="0.85"/>
            <circle cx="25" cy="72" r="12" stroke="#EF4444" stroke-width="2" fill="none" stroke-dasharray="2,2"/>
          </g>
        );

      case 'E': // Touch index
        return (
          <g transform="translate(20, 20)">
            <path d="M 50 140 L 50 80 Q 50 65 60 65 Q 70 65 70 80 L 70 55 Q 70 40 80 40 Q 90 40 90 55 L 90 48 Q 90 32 100 32 Q 110 32 110 48 L 110 60 Q 110 48 120 48 Q 130 48 130 65 L 130 110 Q 130 150 90 150 Z" fill="#FED7AA" stroke="#C2410C" stroke-width="3"/>
            <path d="M 55 95 Q 30 90 22 75 Q 18 65 28 65 Q 40 65 52 82" fill="#FED7AA" stroke="#C2410C" stroke-width="3"/>
            {/* Touch Point on Index */}
            <circle cx="65" cy="62" r="7" fill="#EF4444" opacity="0.85"/>
            <path d="M 90 30 L 68 58" stroke="#2563EB" stroke-width="3" stroke-dasharray="3,3"/>
            <rect x="85" y="10" width="16" height="30" rx="6" transform="rotate(45 90 20)" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
          </g>
        );

      case 'I': // Touch middle finger
        return (
          <g transform="translate(20, 20)">
            <path d="M 50 140 L 50 80 Q 50 65 60 65 Q 70 65 70 80 L 70 55 Q 70 40 80 40 Q 90 40 90 55 L 90 48 Q 90 32 100 32 Q 110 32 110 48 L 110 60 Q 110 48 120 48 Q 130 48 130 65 L 130 110 Q 130 150 90 150 Z" fill="#FED7AA" stroke="#C2410C" stroke-width="3"/>
            <circle cx="85" cy="38" r="7" fill="#EF4444" opacity="0.85"/>
            <path d="M 115 10 L 88 35" stroke="#2563EB" stroke-width="3" stroke-dasharray="3,3"/>
            <rect x="110" y="-5" width="16" height="32" rx="6" transform="rotate(45 115 10)" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
          </g>
        );

      case 'O': // Touch ring finger
        return (
          <g transform="translate(20, 20)">
            <path d="M 50 140 L 50 80 Q 50 65 60 65 Q 70 65 70 80 L 70 55 Q 70 40 80 40 Q 90 40 90 55 L 90 48 Q 90 32 100 32 Q 110 32 110 48 L 110 60 Q 110 48 120 48 Q 130 48 130 65 L 130 110 Q 130 150 90 150 Z" fill="#FED7AA" stroke="#C2410C" stroke-width="3"/>
            <circle cx="105" cy="32" r="7" fill="#EF4444" opacity="0.85"/>
            <rect x="125" y="-5" width="16" height="32" rx="6" transform="rotate(45 125 -5)" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
          </g>
        );

      case 'U': // Touch little finger
        return (
          <g transform="translate(20, 20)">
            <path d="M 50 140 L 50 80 Q 50 65 60 65 Q 70 65 70 80 L 70 55 Q 70 40 80 40 Q 90 40 90 55 L 90 48 Q 90 32 100 32 Q 110 32 110 48 L 110 60 Q 110 48 120 48 Q 130 48 130 65 L 130 110 Q 130 150 90 150 Z" fill="#FED7AA" stroke="#C2410C" stroke-width="3"/>
            <circle cx="125" cy="48" r="7" fill="#EF4444" opacity="0.85"/>
            <rect x="145" y="10" width="16" height="32" rx="6" transform="rotate(45 145 10)" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
          </g>
        );

      // ----------------------------------------------------
      // CONSONANTS
      // ----------------------------------------------------
      case 'B': // Two hands flat palms touching
        return (
          <g transform="translate(35, 30)">
            {/* Left Hand */}
            <rect x="35" y="30" width="30" height="90" rx="14" fill="#FED7AA" stroke="#C2410C" stroke-width="3"/>
            {/* Right Hand */}
            <rect x="75" y="30" width="30" height="90" rx="14" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            {/* Contact line */}
            <line x1="70" y1="35" x2="70" y2="115" stroke="#EF4444" stroke-width="4" stroke-dasharray="4,3"/>
            {/* Arrows pointing inward */}
            <path d="M 15 75 L 30 75" stroke="#2563EB" stroke-width="3" marker-end="url(#arrow)"/>
            <path d="M 125 75 L 110 75" stroke="#2563EB" stroke-width="3" marker-end="url(#arrow)"/>
          </g>
        );

      case 'C': // C-shape curve
        return (
          <g transform="translate(50, 30)">
            <path
              d="M 85 30 Q 30 30 30 80 Q 30 130 85 130"
              fill="none" stroke="#D97706" stroke-width="26" stroke-linecap="round"
            />
            <path
              d="M 85 30 Q 30 30 30 80 Q 30 130 85 130"
              fill="none" stroke="#FDE68A" stroke-width="18" stroke-linecap="round"
            />
            <text x="60" y="85" font-family="'Baloo 2', sans-serif" font-weight="bold" font-size="16" fill="#78350F" text-anchor="middle">C-Shape</text>
          </g>
        );

      case 'D': // Left vertical index, right C shape
        return (
          <g transform="translate(35, 30)">
            {/* Left index straight vertical */}
            <rect x="40" y="20" width="18" height="110" rx="8" fill="#FED7AA" stroke="#C2410C" stroke-width="3"/>
            {/* Right C-arc touching left finger */}
            <path d="M 58 35 Q 110 35 110 75 Q 110 115 58 115" fill="none" stroke="#D97706" stroke-width="18" stroke-linecap="round"/>
            <path d="M 58 35 Q 110 35 110 75 Q 110 115 58 115" fill="none" stroke="#FDE68A" stroke-width="12" stroke-linecap="round"/>
            <circle cx="58" cy="35" r="6" fill="#EF4444"/>
            <circle cx="58" cy="115" r="6" fill="#EF4444"/>
          </g>
        );

      case 'V': // V-fingers on flat palm
        return (
          <g transform="translate(35, 35)">
            {/* Left flat palm */}
            <rect x="20" y="80" width="100" height="40" rx="12" fill="#FED7AA" stroke="#C2410C" stroke-width="3"/>
            {/* Right V-fingers */}
            <line x1="70" y1="80" x2="45" y2="25" stroke="#D97706" stroke-width="16" stroke-linecap="round"/>
            <line x1="70" y1="80" x2="45" y2="25" stroke="#FDE68A" stroke-width="10" stroke-linecap="round"/>
            <line x1="70" y1="80" x2="95" y2="25" stroke="#D97706" stroke-width="16" stroke-linecap="round"/>
            <line x1="70" y1="80" x2="95" y2="25" stroke="#FDE68A" stroke-width="10" stroke-linecap="round"/>
            <circle cx="70" cy="80" r="7" fill="#EF4444"/>
          </g>
        );

      // ----------------------------------------------------
      // NUMBERS (1, 2, 3, 4, 5, 10)
      // ----------------------------------------------------
      case 'ONE':
      case '1':
        return (
          <g transform="translate(60, 30)">
            <rect x="30" y="80" width="45" height="55" rx="12" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            {/* Index finger pointing up */}
            <rect x="42" y="15" width="20" height="75" rx="10" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            <text x="52" y="115" font-family="'Baloo 2', sans-serif" font-weight="900" font-size="22" fill="#92400E" text-anchor="middle">1</text>
          </g>
        );

      case 'TWO':
      case '2':
        return (
          <g transform="translate(60, 30)">
            <rect x="30" y="80" width="45" height="55" rx="12" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            {/* Two V fingers */}
            <line x1="45" y1="80" x2="35" y2="20" stroke="#D97706" stroke-width="16" stroke-linecap="round"/>
            <line x1="45" y1="80" x2="35" y2="20" stroke="#FDE68A" stroke-width="10" stroke-linecap="round"/>
            <line x1="60" y1="80" x2="70" y2="20" stroke="#D97706" stroke-width="16" stroke-linecap="round"/>
            <line x1="60" y1="80" x2="70" y2="20" stroke="#FDE68A" stroke-width="10" stroke-linecap="round"/>
            <text x="52" y="115" font-family="'Baloo 2', sans-serif" font-weight="900" font-size="22" fill="#92400E" text-anchor="middle">2</text>
          </g>
        );

      case 'THREE':
      case '3':
        return (
          <g transform="translate(50, 30)">
            <rect x="35" y="80" width="55" height="55" rx="12" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            <rect x="30" y="25" width="16" height="65" rx="8" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            <rect x="52" y="15" width="16" height="75" rx="8" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            <rect x="74" y="25" width="16" height="65" rx="8" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            <text x="62" y="115" font-family="'Baloo 2', sans-serif" font-weight="900" font-size="22" fill="#92400E" text-anchor="middle">3</text>
          </g>
        );

      case 'FIVE':
      case '5':
        return (
          <g transform="translate(45, 25)">
            <rect x="30" y="75" width="65" height="60" rx="14" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            <rect x="15" y="55" width="16" height="45" rx="8" transform="rotate(-30 15 55)" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            <rect x="30" y="20" width="14" height="65" rx="7" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            <rect x="48" y="15" width="14" height="70" rx="7" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            <rect x="66" y="20" width="14" height="65" rx="7" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            <rect x="84" y="32" width="14" height="55" rx="7" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            <text x="62" y="115" font-family="'Baloo 2', sans-serif" font-weight="900" font-size="22" fill="#92400E" text-anchor="middle">5</text>
          </g>
        );

      // ----------------------------------------------------
      // CORE VOCABULARY SIGNS
      // ----------------------------------------------------
      case 'CAT':
        return (
          <g transform="translate(30, 30)">
            {/* Whiskers pulling outward */}
            <circle cx="80" cy="80" r="38" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2"/>
            {/* Left Hand at cheek */}
            <path d="M 45 75 Q 20 65 5 70" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
            <path d="M 45 85 Q 15 85 0 90" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
            {/* Right Hand at cheek */}
            <path d="M 115 75 Q 140 65 155 70" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
            <path d="M 115 85 Q 145 85 160 90" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
            {/* Motion Arrows */}
            <path d="M 30 55 L 10 55" stroke="#2563EB" stroke-width="3" marker-end="url(#arrow)"/>
            <path d="M 130 55 L 150 55" stroke="#2563EB" stroke-width="3" marker-end="url(#arrow)"/>
            <text x="80" y="145" font-family="'Baloo 2', sans-serif" font-weight="bold" font-size="14" fill="#92400E" text-anchor="middle">Pull Whiskers Twice</text>
          </g>
        );

      case 'BOOK':
        return (
          <g transform="translate(35, 35)">
            {/* Both palms opening like book */}
            <polygon points="70,120 20,45 60,35 70,110" fill="#FED7AA" stroke="#C2410C" stroke-width="3"/>
            <polygon points="70,120 120,45 80,35 70,110" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            <circle cx="70" cy="115" r="6" fill="#EF4444"/>
            {/* Opening arc arrows */}
            <path d="M 45 35 Q 25 25 15 45" fill="none" stroke="#2563EB" stroke-width="3" stroke-dasharray="3,3" marker-end="url(#arrow)"/>
            <path d="M 95 35 Q 115 25 125 45" fill="none" stroke="#2563EB" stroke-width="3" stroke-dasharray="3,3" marker-end="url(#arrow)"/>
            <text x="70" y="145" font-family="'Baloo 2', sans-serif" font-weight="bold" font-size="14" fill="#78350F" text-anchor="middle">Open Hands (किताब खोलें)</text>
          </g>
        );

      case 'SCHOOL':
        return (
          <g transform="translate(35, 35)">
            {/* Left open palm */}
            <rect x="25" y="85" width="90" height="35" rx="10" fill="#FED7AA" stroke="#C2410C" stroke-width="3"/>
            {/* Right hand clapping down */}
            <rect x="35" y="25" width="35" height="60" rx="10" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            {/* Clap star bursts */}
            <path d="M 52 85 L 52 75" stroke="#EF4444" stroke-width="3"/>
            <path d="M 42 80 L 32 75" stroke="#EF4444" stroke-width="3"/>
            <path d="M 62 80 L 72 75" stroke="#EF4444" stroke-width="3"/>
            {/* Clap arrow */}
            <path d="M 52 45 L 52 75" stroke="#2563EB" stroke-width="4" marker-end="url(#arrow)"/>
            <text x="70" y="145" font-family="'Baloo 2', sans-serif" font-weight="bold" font-size="14" fill="#78350F" text-anchor="middle">Clap Palms Twice (ताली)</text>
          </g>
        );

      case 'COUNT':
        return (
          <g transform="translate(35, 35)">
            {/* Left Palm up */}
            <rect x="20" y="85" width="100" height="35" rx="10" fill="#FED7AA" stroke="#C2410C" stroke-width="3"/>
            {/* Right V-fingers hopping */}
            <circle cx="40" cy="85" r="5" fill="#EF4444"/>
            <circle cx="70" cy="85" r="5" fill="#EF4444"/>
            <circle cx="100" cy="85" r="5" fill="#EF4444"/>
            {/* Hop curve arrow */}
            <path d="M 35 70 Q 55 45 70 70 Q 85 45 100 70" fill="none" stroke="#2563EB" stroke-width="3" marker-end="url(#arrow)"/>
            <text x="70" y="145" font-family="'Baloo 2', sans-serif" font-weight="bold" font-size="14" fill="#78350F" text-anchor="middle">Tap Along Palm (गिनें)</text>
          </g>
        );

      // Generic Authentic Two-Handed ISL Sign Representation
      default:
        return (
          <g transform="translate(25, 30)">
            {/* Non-dominant left hand */}
            <rect x="20" y="70" width="60" height="50" rx="14" fill="#FED7AA" stroke="#C2410C" stroke-width="3"/>
            <text x="50" y="100" font-family="'Baloo 2', sans-serif" font-weight="bold" font-size="11" fill="#9A3412" text-anchor="middle">Left</text>

            {/* Dominant right hand */}
            <rect x="85" y="45" width="60" height="65" rx="14" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
            <text x="115" y="85" font-family="'Baloo 2', sans-serif" font-weight="bold" font-size="11" fill="#B45309" text-anchor="middle">Right</text>

            {/* Contact interaction marker */}
            <circle cx="82" cy="70" r="7" fill="#EF4444"/>
            <path d="M 115 25 L 85 45" stroke="#2563EB" stroke-width="3" stroke-dasharray="3,3" marker-end="url(#arrow)"/>
            <text x="80" y="145" font-family="'Baloo 2', sans-serif" font-weight="bold" font-size="13" fill="#78350F" text-anchor="middle">
              {key} Handshape
            </text>
          </g>
        );
    }
  };

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size * 0.85}
        viewBox="0 0 200 170"
        className="w-full h-auto max-w-[240px] drop-shadow-sm transition-transform"
      >
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB" />
          </marker>
        </defs>

        {/* Backdrop stage */}
        <rect width="200" height="170" rx="20" fill="#FFFDF8" stroke="#E2DCD5" stroke-width="2"/>

        {/* Hand Illustration */}
        {renderHandContent()}

        {/* Hand Legend Tags */}
        <g transform="translate(10, 155)">
          <circle cx="6" cy="-4" r="4" fill="#FED7AA" stroke="#C2410C"/>
          <text x="14" y="0" font-family="'Baloo 2', sans-serif" font-size="9" font-weight="bold" fill="#78350F">Left</text>
          <circle cx="50" cy="-4" r="4" fill="#FDE68A" stroke="#D97706"/>
          <text x="58" y="0" font-family="'Baloo 2', sans-serif" font-size="9" font-weight="bold" fill="#78350F">Right</text>
          <circle cx="98" cy="-4" r="3" fill="#EF4444"/>
          <text x="105" y="0" font-family="'Baloo 2', sans-serif" font-size="9" font-weight="bold" fill="#78350F">Touch</text>
        </g>
      </svg>
    </div>
  );
}
