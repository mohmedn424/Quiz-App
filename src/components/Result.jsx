import { Link, useLocation } from 'react-router-dom';
import pb from '../../lib/pocketbase';
import { useAsyncEffect } from 'ahooks';
import ReactConfetti from 'react-confetti';
import cfSound from '../assets/Voicy_Confetti sound effect 2.mp3';
import useSound from 'use-sound';
import { useEffect } from 'react';

function Result() {
  const [play] = useSound(cfSound);

  const location = useLocation();
  const allAnswers = location.state.answers;
  const allQuestions = location.state.questions;
  const level = location.state.level;

  let percentile = 0;

  allAnswers.forEach((item) => {
    if (item.trueAnswer) {
      percentile += 1;
    }
  });

  useEffect(() => {
    play();
  }, []);
  useAsyncEffect(async () => {
    const user = await pb
      .collection('users')
      .getOne(pb.authStore.model.id);

    const record = await pb
      .collection('users')
      .update(pb.authStore.model.id, {
        scores: { ...user.scores, [level]: percentile },
      });
  }, []);

  return (
    <div className="result">
      <ReactConfetti
        recycle={false}
        numberOfPieces={1000}
        tweenDuration={10000}
      />
      <div className="result-box">
        <div className="result-bg">
          <span className="percentile">
            {Math.round((percentile / allQuestions.length) * 100)}%
          </span>
        </div>
        <p className="result-detail">
          انت جاوبت صح على {percentile} من اصل {allQuestions.length}{' '}
          سؤال
        </p>
        <Link to="/" className="new-quiz">
          الصفحة الرئيسية
        </Link>
      </div>
      <div>
        <h2 className="check-answers-title">نتيجة الاختبار</h2>

        <div className="check-answers-boxes">
          {allQuestions.map((item, key) => {
            console.log();
            return (
              <div
                key={key}
                className={
                  allAnswers[key].trueAnswer
                    ? 'check-answer-box correct'
                    : 'check-answer-box wrong'
                }
              >
                <div className="check-answer-top">
                  <div className="check-texts">
                    <p className="check-answer-count">
                      السؤال: {key + 1}
                    </p>
                    <h3 className="check-answer-question">
                      {item.question}
                    </h3>
                  </div>
                  <div className="check-icon">
                    <i
                      className={
                        allAnswers[key].trueAnswer
                          ? 'bi bi-check'
                          : 'bi bi-x'
                      }
                    ></i>
                  </div>
                </div>
                <div className="check-answer-bottom">
                  <div className="answer-box">
                    <span className="answer-title">اجابتك</span>
                    <span className="answer-text">
                      {allAnswers[key].answer}
                    </span>
                  </div>
                  <div className="answer-box">
                    <span className="answer-title">
                      الاجابة الصحيحة
                    </span>
                    <span className="answer-text">
                      {item.answers.map((ans) => {
                        return ans.trueAnswer ? ans.answer : null;
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Result;
