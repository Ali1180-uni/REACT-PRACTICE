/*
FINAL CHALLENGE! Fully type the Keyboard component
1. Type the return value of Keyboard
2. Type the props 
3. Explictly type all variables inside of Keyboard
*/

import { clsx } from "clsx";
import type { JSX } from "react/jsx-runtime";
type keyboardType = {
  alphabet: string;
  guessedLetters: string[];
  currentWord: string;
  isGameOver: boolean;
  addGuessedLetter: (letter: string) => void
};

export default function Keyboard({
  alphabet,
  guessedLetters,
  currentWord,
  isGameOver,
  addGuessedLetter,
}: keyboardType): JSX.Element {
  const keyboardElements: Array<JSX.Element> = alphabet.split("").map((letter: string): JSX.Element => {
    const isGuessed: boolean = guessedLetters.includes(letter);
    const isCorrect: boolean = isGuessed && currentWord.includes(letter);
    const isWrong: boolean = isGuessed && !currentWord.includes(letter);
    const className: string = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        key={letter}
        disabled={isGameOver}
        aria-disabled={isGuessed}
        aria-label={`Letter ${letter}`}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  return <section className="keyboard">{keyboardElements}</section>;
}
