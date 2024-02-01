import React from 'react';

const useRevealPassword = () => {
  const [revealPassword, setRevealPassword] = React.useState(false);
  const togglePassword = e => {
    e.preventDefault();
    setRevealPassword(!revealPassword);
  };

  return {
    revealPassword,
    setRevealPassword,
    togglePassword,
  };
};

export { useRevealPassword };
