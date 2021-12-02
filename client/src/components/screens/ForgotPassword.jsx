import React, { useState } from 'react';
import axios from 'axios';
import CustomInput from './CustomInput';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      'Content-Type': 'application/json',
    };
    try {
      const { data } = await axios.post(
        '/api/auth/forgotpassword',
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail('');

      setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
    }
  };

  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={forgotPasswordHandler} className="form__box">
        {error && <span className="error_message">{error}</span>}
        {success && <span className="success_message">{success}</span>}
        <h3>Forgot Password</h3>
        <div className="form_group">
          <p>
            {' '}
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
          </p>
        </div>
        <CustomInput
          id="email"
          label="Email"
          value={email}
          placeholder="Enter Email"
          onChangeHandler={onChangeHandler}
          type="email"
        />
        <button className="btn__submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
