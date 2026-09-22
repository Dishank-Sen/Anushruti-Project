/** Dictionary lookup only. This does not translate English grammar into ISL. */
import { findOfficialSign } from './isl-sources.ts';
export type IslSignToken = {
  id: string;
  displayWord: string;
  available: boolean;
};
export function convertSentenceToISL(text: string): IslSignToken[] {
  return (text.match(/[A-Za-z]+|\d+/g) ?? []).slice(0, 40).map((word, i) => ({
    id: `${i}-${word.toUpperCase()}`,
    displayWord: word.toUpperCase(),
    available: !!findOfficialSign(word),
  }));
}
