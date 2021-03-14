import React, { ReactElement, useEffect, useState } from 'react';
import Quiz from '../components/quiz';
import LoadingView from '../components/LoadingView';

export interface IQuiz {
  answers: string[];
  question: string;
  correct: number;
}

export const Match = (): ReactElement => {
  const [error, setError] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<IQuiz[] | null>(null);
  const [victory, setVictory] = useState(false);
  const [defeat, setDefeat] = useState(false);
  const [current, setCurrent] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = async () => {
    const quizzes = await fetchQuizzes(3);
    if (!quizzes) setError(`Error when connecting to server`);
    else {
      setError(null);
      setQuiz(quizzes);
      setVictory(false);
      setDefeat(false);
      setCurrent(0);
      setLength(quizzes.length);
    }
  };

  const fetchQuizzes = async (numberOfQuizzes: number) => {
    if (numberOfQuizzes < 1)
      throw 'Invalid number of requested quizzes: ' + numberOfQuizzes;
    try {
      const response = await fetch('/api/matches', { method: 'post' });
      if (response.status !== 201) return null;
      return await response.json();
    } catch (err) {
      return null;
    }
  };

  const handleClick = (x: boolean): void => {
    if (x) {
      if (current === length - 1) setVictory(true);
      else setCurrent(current + 1);
    } else setDefeat(true);
  };

  if (error) return <h2>{error}</h2>;
  if (!quiz) return <LoadingView />;

  if (victory) {
    return (
      <div>
        <h2>You Won!</h2>
        <div>
          <button className='quiz' onClick={startGame}>
            New Match
          </button>
        </div>
      </div>
    );
  }

  if (defeat) {
    return (
      <div>
        <h2>Wrong Answer! You Lost!</h2>
        <div>
          <button className={'quiz'} onClick={startGame}>
            New Match
          </button>
        </div>
      </div>
    );
  }

  if (quiz) {
    return <Quiz quiz={quiz[current]} handleClick={handleClick} />;
  }
  return <></>;
};
