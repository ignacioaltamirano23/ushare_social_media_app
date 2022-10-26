import React from 'react';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useMainContext } from '../context/mainContext';

const ThemeButton = () => {
  const { darkTheme, toggleDarkTheme } = useMainContext();
  return (
    <button className="theme-btn" onClick={toggleDarkTheme}>
      {darkTheme ? <BsSunFill /> : <BsMoonFill />}
    </button>
  );
};

export default ThemeButton;
