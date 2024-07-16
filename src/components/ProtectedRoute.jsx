import { Navigate } from 'react-router-dom';
import pb from '../../lib/pocketbase';

export default function ProtectedRoute({
  children,
  url = '/login',
  reverse = false,
}) {
  // Needs Refactoring
  if (reverse) {
    if (pb.authStore.isValid) {
      return <Navigate to={url} />;
    }
    return children;
  } else {
    if (pb.authStore.isValid) {
      return children;
    }
    return <Navigate to={url} />;
  }
}
