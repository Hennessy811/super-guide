import React from 'react';
import { FC } from 'react';
import Header from './Header';

const Layout: FC = ({ children }) => {
  return (
    <div className="pb-9">
      <Header />

      <div className="max-w-5xl m-auto py-44">{children}</div>
    </div>
  );
};

export default Layout;
