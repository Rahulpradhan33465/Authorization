import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import CustomInput from './CustomInput';
const ResetPassword = ({ match }) => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [success, setSuccess] = useState('');

  const resetPassword = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    if (formData.password !== formData.confirmPassword) {
      setFormData({ password: '', confirmPassword: '' });

      setTimeout(() => {
        setError('');
      }, 5000);
      return setError("Password doesn't matched");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/passwordreset/${match.params.resetToken}`,
        formData,
        config
      );

      setSuccess(data);
    } catch (error) {
      setError(error.response.data.error);

      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  const onChangeHandler = (e) => {
    setFormData({ ...FormData, [e.target.id]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={resetPassword} className="form__box">
        <h3>Forgot Password</h3>
        {error && <span className="error_message">{error} </span>}
        {success && (
          <span className="success_message">
            {success}
            <Link to="/login"> Login </Link>
          </span>
        )}
        <CustomInput
          id="password"
          label="Password"
          value={formData.password}
          placeholder="Enter Password"
          onChangeHandler={onChangeHandler}
          type="text"
        />
        <CustomInput
          id="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          onChangeHandler={onChangeHandler}
          type="password"
        />
        <button className="btn__submit">Submit</button>
      </form>
    </div>
  );
};

export default ResetPassword;
