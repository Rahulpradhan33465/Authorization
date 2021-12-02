import React from 'react';

const CustomInput = ({
  id,
  label,
  placeholder,
  onChangeHandler,
  value,
  type,
}) => {
  return (
    <div className="form_group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        required
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default CustomInput;
