import clsx from 'clsx';
import React from 'react';

const Header = () => {
  return (
    <div className={clsx('p-3 shadow-md text-2xl font-bold font-mono bg-white dark:bg-gray-900')}>
      <div className="max-w-5xl m-auto">
        <p className="">top20locations</p>
      </div>
    </div>
  );
};

export default Header;
