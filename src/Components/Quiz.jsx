import React, { useState, useRef, useEffect } from "react";
import "./Quiz.css";
import { data } from "../assets/data";

function Quiz() {
  const [index, setIndex] = useState(0); // Start at the first question
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [result, setResult] = useState(false);
  const [score,setScore] = useState(0);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  // Update question when index changes
  useEffect(() => {
    setQuestion(data[index]);
    setLock(false); // Reset lock when moving to a new question
  }, [index]);

  const checkAns = (e, answered) => {
    if (!lock) {
      if (question.ans === answered) {
        e.target.classList.add("correct");
        setScore(score+1);
        setLock(true);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };
  
  const resetclick = () => {
    setIndex(0);  // Reset to the first question
    setScore(0);  // Reset the score
    setLock(false);  // Unlock the options
    setResult(false);  // Reset the result state
  };

  const clickHandler = () => {
    if (index === data.length - 1) {
      setResult(true);
      return 0;
    }
    if (index < data.length - 1 && lock === true) {
      setIndex(index + 1); // Go to the next question
    }

    option_array.map((option) => {
      option.current.classList.remove("wrong");
      option.current.classList.remove("correct");
      return null;
    });
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
        <h2>You Scored {score} out of {data.length}</h2>
        <button onClick={resetclick}>Reset</button>
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
          <button onClick={clickHandler}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
