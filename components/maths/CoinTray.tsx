'use client';

import React, { useState } from 'react';
import { RotateCcw, Check, Sparkles } from 'lucide-react';

interface CoinTrayProps {
  targetAmount?: number;
  itemToBuy?: { name: string; icon: string; price: number };
}

export function CoinTray({
  targetAmount = 5,
  itemToBuy = { name: 'Shiny Pencil', icon: '✏️', price: 5 },
}: CoinTrayProps) {
  const [coins, setCoins] = useState<number[]>([]);

  const availableCoins = [1, 2, 5, 10];

  function addCoin(val: number) {
    setCoins([...coins, val]);
  }

  function removeCoin(index: number) {
    setCoins(coins.filter((_, i) => i !== index));
  }

  function reset() {
    setCoins([]);
  }

  const total = coins.reduce((acc, c) => acc + c, 0);
  const isExact = total === targetAmount;

  return (
    <div className="p-6 rounded-3xl bg-[var(--surface)] border-2 border-[var(--line)] shadow-sm my-4">
      {/* Target Item Card */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg)] border-2 border-[var(--line)] mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{itemToBuy.icon}</span>
          <div>
            <h4 className="font-bold text-base m-0 text-[var(--ink)]">{itemToBuy.name}</h4>
            <span className="text-xs text-[var(--ink-soft)] font-medium">Price in Indian Rupees</span>
          </div>
        </div>
        <div className="px-4 py-2 rounded-xl bg-[var(--maths-tint)] text-[var(--maths)] font-bold text-lg border-2 border-[var(--maths)]">
          ₹{targetAmount}
        </div>
      </div>

      {/* Available Coins Bar */}
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-2">
          Tap a coin to add to purse:
        </p>
        <div className="flex flex-wrap gap-3">
          {availableCoins.map((coinVal) => (
            <button
              key={coinVal}
              type="button"
              onClick={() => addCoin(coinVal)}
              className="min-w-[56px] min-h-[56px] px-4 py-2 rounded-2xl bg-gradient-to-b from-[#F6F7F9] to-[#E2E5EB] border-2 border-[#CBD0DD] text-[var(--ink)] font-bold text-lg shadow-[0_3px_0_#A8B0C0] active:translate-y-[2px] active:shadow-none transition flex items-center gap-1.5"
              aria-label={`Add ₹${coinVal} coin`}
            >
              <span>🪙</span>
              <span>₹{coinVal}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Purse & Selected Coins */}
      <div className="p-4 rounded-2xl bg-[var(--bg)] border-2 border-[var(--line)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">👛</span>
            <span className="font-bold text-sm text-[var(--ink)]">Your Purse:</span>
            <span
              className={`font-bold px-2.5 py-0.5 rounded-lg text-sm ${
                isExact
                  ? 'bg-[var(--ok-tint)] text-[var(--ok)] border border-[var(--ok)]'
                  : 'bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)]'
              }`}
            >
              Total: ₹{total}
            </span>
          </div>
          {coins.length > 0 && (
            <button
              type="button"
              onClick={reset}
              className="text-xs font-bold text-[var(--ink-soft)] hover:text-[var(--retry)] flex items-center gap-1"
            >
              <RotateCcw size={12} /> Clear
            </button>
          )}
        </div>

        {coins.length === 0 ? (
          <p className="text-xs text-[var(--ink-soft)] italic m-0 text-center py-4">
            Tap coins above to place them in your purse.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {coins.map((coin, index) => (
              <button
                key={index}
                type="button"
                onClick={() => removeCoin(index)}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#CBD0DD] text-xs font-bold shadow-xs hover:border-[var(--retry)] transition flex items-center gap-1"
                aria-label={`Remove ₹${coin} coin`}
              >
                <span>🪙 ₹{coin}</span>
                <span className="text-red-500 font-normal ml-1">×</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {isExact && (
        <div className="mt-4 p-3 rounded-2xl bg-[var(--ok-tint)] text-[var(--ok)] font-bold text-sm flex items-center justify-center gap-2 border border-[var(--ok)] animate-in fade-in">
          <Check size={18} />
          <span>Exact amount paid! You bought the {itemToBuy.name}!</span>
          <Sparkles size={16} />
        </div>
      )}
    </div>
  );
}
