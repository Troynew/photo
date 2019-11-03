import React from 'react';

const handleClick = e => e.stopPropagation();

const NotBubbleBlock = ({ children }) => (
  <span onClick={handleClick} style={{ display: 'flex', alignItems: 'center' }}>
    {children}
  </span>
);

export default NotBubbleBlock;
