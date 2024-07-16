import React, { useState } from 'react';
import { useQuizContext } from '../context/QuizContext';
import { useNavigate, useParams } from 'react-router-dom';
import {
  buildStyles,
  CircularProgressbar,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Radio } from 'antd';

function Quiz() {
  const { level } = useParams();
  const navigate = useNavigate();

  const { questions, currentQuestion, setCurrentQuestion } =
    useQuizContext();

  const [isNextButton, setIsNextButton] = useState(false);
  const [isResultButton, setIsResultButton] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isResult, setIsResult] = useState(false);

  const selectAnswer = (index) => {
    if (currentQuestion === questions[level].length - 1) {
      setIsNextButton(false);
      setIsResultButton(true);
    } else {
      setIsNextButton(true);
    }
    setSelectedIndex(index);
  };

  const nextQuestion = (index) => {
    if (currentQuestion >= questions[level].length - 1) {
      addAnswer(index);
      setCurrentQuestion(0);
      setIsResult(true);
    } else {
      setIsNextButton(false);
      addAnswer(index);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedIndex();
    }
  };

  const addAnswer = (index) => {
    const selectedAnswer =
      questions[level][currentQuestion].answers[index];

    const newAnswers = [...selectedAnswers, selectedAnswer];
    setSelectedAnswers(newAnswers);
  };

  return isResult ? (
    navigate('/result', {
      state: {
        answers: selectedAnswers,
        questions: questions[level],
        level,
      },
    })
  ) : (
    <div className="cont">
      <div className="quiz-cont">
        <div className="progress-box">
          <div className="progress-top">
            <div className="progress-texts">
              <p className="progress-description">
                اختبار كلية {level}
              </p>
            </div>
          </div>
          <CircularProgressbar
            className="progress-circle"
            styles={buildStyles({
              pathColor: '#3ac7a5',
              trailColor: 'rgba(0, 0, 0, 0.5)',
              textColor: 'var(--text-color)',
              strokeLinecap: 'round',
            })}
            value={
              ((currentQuestion + 1) / questions[level].length) * 100
            }
            text={`${currentQuestion + 1} / ${
              questions[level].length
            }`}
          >
            {currentQuestion + 1} / {questions[level].length}
          </CircularProgressbar>
        </div>
        <div className="question-box">
          <div className="question-text">
            <h2 className="question-title">
              السؤال رقم: {currentQuestion + 1}
            </h2>
            <h3 className="question">
              {questions[level][currentQuestion].question}
            </h3>
          </div>

          {/* TIMER */}
          {/* <div
          className="progress-circle time"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ '--value': (time / 30) * 100 }}
        >
          <span className="time">{time}</span>
        </div> */}
        </div>

        <div className="answers-boxes">
          {questions[level][currentQuestion].answers.map(
            (answer, index) => {
              return (
                <Radio.Button
                  className={
                    selectedIndex === index
                      ? 'answer-label selected'
                      : 'answer-label'
                  }
                  id={index}
                  key={index}
                  name="answer"
                  onClick={() => selectAnswer(index)}
                >
                  {answer.answer}
                </Radio.Button>
              );
            }
          )}
        </div>
      </div>

      <div className="next">
        {isResultButton ? (
          <button
            onClick={() => nextQuestion(selectedIndex)}
            type="button"
            className="next-btn result-btn"
          >
            <div className="icon">
              <i className="bi bi-bar-chart"></i>
            </div>
            عرض النتيجة
          </button>
        ) : (
          <button
            disabled={!isNextButton}
            onClick={() => nextQuestion(selectedIndex)}
            type="button"
            className="next-btn"
          >
            <div className="icon">
              <i className="bi bi-arrow-left"></i>
            </div>
            السؤال التالي
          </button>
        )}
      </div>

      <div className="next"></div>
    </div>
  );
}

export default Quiz;
