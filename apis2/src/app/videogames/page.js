'use client';

import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const VideojuegosTrivia = () => {
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrivia = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple');
        if (!response.ok) {
          throw new Error('Error en la solicitud de la API');
        }
        const data = await response.json();
        const questionsWithShuffledAnswers = data.results.map(question => ({
          ...question,
          all_answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }));

        setTriviaQuestions(questionsWithShuffledAnswers);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchTrivia();
  }, []);

  const showAnswer = (index) => {
    setSelectedAnswers(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div>
      <NavBar />
      <h1>Trivia de Videojuegos</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {triviaQuestions.map((question, index) => (
            <li key={index}>
              <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
              <ul>
                {question.all_answers.map((answer, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: answer }} />
                ))}
              </ul>
              <button onClick={() => showAnswer(index)}>Ver Respuesta Correcta</button>
              {selectedAnswers[index] && (
                <p dangerouslySetInnerHTML={{ __html: `Respuesta Correcta: ${question.correct_answer}` }} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VideojuegosTrivia;
