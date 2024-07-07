import { links } from '@/data/links';
import { Router } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.user);

  return isAuthenticated ? children : <Router href={links.login} />;
};

export default PrivateRoute;
