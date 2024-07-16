import { ConfigProvider, theme } from 'antd';
import SignupForm from './components/SignupForm.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import SignInForm from './components/SignInForm.jsx';
import Home from './components/Home.jsx';

import { Provider } from './context/QuizContext';
import Quiz from './components/Quiz.jsx';
import Result from './components/Result.jsx';

import './assets/css/style.css';
import './assets/css/result.css';
import './assets/css/home.css';
import './assets/css/quiz.css';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',

    element: (
      <ProtectedRoute url="/signup">
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <ProtectedRoute reverse={true}>
        <SignupForm />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute reverse={true}>
        <SignInForm />
      </ProtectedRoute>
    ),
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/quiz/:level',
    element: (
      <ProtectedRoute>
        <Quiz />
      </ProtectedRoute>
    ),
  },
  {
    path: '/result',
    element: (
      <ProtectedRoute>
        <Result />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Provider>
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
