import React from 'react';
import '../index.css'; // Ensure this file contains the CSS rules

const ImageComponent: React.FC = () => {
  return (
    <div className="image-block">
      <img src="path/to/your/image.jpg" alt="Description" />
    </div>
  );
};

export default ImageComponent;