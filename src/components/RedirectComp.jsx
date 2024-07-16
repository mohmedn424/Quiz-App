import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RedirectComp({ url }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${url}`);
  }, []);

  return <div>Redirecting to {url}...</div>;
}
