import type { JSX } from "react/jsx-runtime";
type NewGameButtonProps = {
  isGameOver: boolean;
  startNewGame: () => void; // This is How we can manage the Function Prop it have no any parameter 
  // If the Function have parameter so it looks like that
  // startNewGame: (name: string) => number; // Take string name and return number
};

// eg: This Function is Passed as a Prop which return type is void
// function startNewGame():void {
//     setCurrentWord(getRandomWord())
//     setGuessedLetters([])
// }
{
  /* <NewGameButton isGameOver={isGameOver} startNewGame={startNewGame} />; */
}

export default function NewGameButton({
  isGameOver,
  startNewGame,
}: NewGameButtonProps): JSX.Element | null {
  if (!isGameOver) {
    return null;
  } else {
    return (
      <button className="new-game" onClick={startNewGame}>
        New Game
      </button>
    );
  }
}
