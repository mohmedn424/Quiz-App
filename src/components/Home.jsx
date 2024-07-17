import { useAsyncEffect } from 'ahooks';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pb from '../../lib/pocketbase';
import { Tag } from 'antd';

// needs refactoring it sucks

function Home() {
  const [scores, setScores] = useState({});

  const [user, setUser] = useState({});

  const [totalScore, setTotalScore] = useState(0);

  useAsyncEffect(async () => {
    const record = await pb
      .collection('users')
      .getOne(pb.authStore.model.id);

    if (record) {
      setUser(record);
      setScores(record.scores);
    }

    pb.collection('users').subscribe(record.id, function (e) {
      setUser(e.record);
      setScores(e.record.scores);
      Object.keys(e.record.scores).length === 0
        ? setTotalScore(0)
        : setTotalScore(
            Object.values(e.record.scores).reduce(
              (total, currentElement) => total + currentElement
            )
          );
    });
  }, []);

  useEffect(() => {
    if (Object.keys(user).length > 0)
      Object.keys(user?.scores).length === 0
        ? setTotalScore(0)
        : setTotalScore(
            Object.values(user.scores).reduce(
              (total, currentElement) => total + currentElement
            )
          );
  }, [user]);

  return (
    <div className="home">
      <div className="intro-box">
        <div className="intro-texts">
          <h1 className="intro-title">Quiz App</h1>
          <h5 className="intro-description">
            description for the quiz
          </h5>
        </div>
        <div className="total">
          <h2>Total Points</h2>
          <h1 className="total-score">{totalScore}</h1>
        </div>
      </div>

      <div className="level-boxes">
        <div
          className={
            scores.hasOwnProperty('cs')
              ? 'level-box done'
              : 'level-box'
          }
        >
          <div className="level-text">
            <span>كلية</span>
            <h2 className="level-name">حاسبات ومعلومات</h2>
          </div>

          {scores.hasOwnProperty('cs') ? (
            <Tag
              style={{ userSelect: 'none' }}
              color="green"
              className="level-link"
            >
              تم اجتياز الاختبار
            </Tag>
          ) : (
            <Link className="level-link" to="/quiz/cs">
              <i className="bi bi-arrow-left"></i>
              <span>ابدأ الاختبار</span>
            </Link>
          )}
        </div>

        <div
          className={
            scores.hasOwnProperty('A2')
              ? 'level-box done'
              : 'level-box'
          }
        >
          <div className="level-text">
            <span>كلية</span>
            <h2 className="level-name">اداب - قسم انجليزي</h2>
          </div>
          {scores.hasOwnProperty('A2') ? (
            <Tag
              style={{ userSelect: 'none' }}
              color="green"
              className="level-link"
            >
              تم اجتياز الاختبار
            </Tag>
          ) : (
            <Link className="level-link" to="/quiz/A2">
              <i className="bi bi-arrow-left"></i>
              <span>ابدأ الاختبار</span>
            </Link>
          )}
        </div>

        <div className="level-box">
          <div className="level-text">
            <span>كلية</span>
            <h2 className="level-name">B1</h2>
          </div>
          <Link className="level-link" to="/quiz/B1">
            <span>ابدأ الاختبار</span>{' '}
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>
        <div className="level-box">
          <div className="level-text">
            <span>كلية</span>
            <h2 className="level-name">B2</h2>
          </div>
          <Link className="level-link" to="/quiz/B2">
            <span>ابدأ الاختبار</span>{' '}
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>
        <div className="level-box">
          <div className="level-text">
            <span>كلية</span>
            <h2 className="level-name">C1</h2>
          </div>
          <Link className="level-link" to="/quiz/C1">
            <span>ابدأ الاختبار</span>
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>
        <div className="level-box">
          <div className="level-text">
            <span>كلية</span>
            <h2 className="level-name">C2</h2>
          </div>
          <Link className="level-link" to="/quiz/C2">
            <span>ابدأ الاختبار</span>
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>
        <div className="level-box">
          <div className="level-text">
            <span>كلية</span>
            <h2 className="level-name">C2</h2>
          </div>
          <Link className="level-link" to="/quiz/C2">
            <span>ابدأ الاختبار</span>
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>
        <div className="level-box">
          <div className="level-text">
            <span>كلية</span>
            <h2 className="level-name">C2</h2>
          </div>
          <Link className="level-link" to="/quiz/C2">
            <span>ابدأ الاختبار</span>
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
