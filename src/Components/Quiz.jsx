import React, { useState, useRef, useEffect } from "react";
import "./Quiz.css";
import { data } from "../assets/data";

function Quiz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    setQuestion(data[index]);
    setLock(false);
  }, [index]);

  const checkAns = (e, answered) => {
    if (!lock) {
      if (question.ans === answered) {
        e.target.classList.add("correct");
        setScore(score + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  const nextQuestion = () => {
    if (index === data.length - 1) {
      setResult(true);
    } else if (lock) {
      setIndex(index + 1);
      option_array.forEach((option) => {
        option.current.classList.remove("wrong", "correct");
      });
    }
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>
            🎉 You Scored {score} out of {data.length}
          </h2>
          <button onClick={resetQuiz}>Restart Quiz</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={nextQuestion}>
            {index === data.length - 1 ? "See Result" : "Next"}
          </button>
          <div className="index">
            Question {index + 1} of {data.length}
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
