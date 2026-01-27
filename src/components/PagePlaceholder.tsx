// components/PagePlaceholder.jsx

import React from 'react';

interface PagePlaceholderProps {
  title: string;
}

const PagePlaceholder = ({ title }: PagePlaceholderProps) => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', padding: '20px' }}>
      <h1>{title}</h1>
      <p>This page content is currently a placeholder. Please check back later!</p>
    </div>
  );
};

export default PagePlaceholder;