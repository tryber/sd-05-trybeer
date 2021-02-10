import React from 'react';

const Input = ({
  type = 'text', className, placeholder, onChange, test, name, label
}) => (
  <div style={{ width: '100%' }}>
    <label htmlFor={`input_${label || name}`}>
      { label }
      <input
        id={`input_${label || name}`}
        type={type}
        className={ className }
        name={ name }
        onChange={ onChange }
        data-testid={test}
        placeholder={ placeholder || '' }
      />     
    </label>
  </div>
);

export default Input;
