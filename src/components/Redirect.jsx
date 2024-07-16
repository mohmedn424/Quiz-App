import { redirect } from 'react-router-dom';

export default async function Loader() {
  const user = await getUser();
  if (!user) {
    return redirect('/login');
  }
  return redirect('/signup');
}
