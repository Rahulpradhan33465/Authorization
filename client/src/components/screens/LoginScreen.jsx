import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from './CustomInput';
const LoginScreen = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  useEffect(() => {
    if (token) {
      navigate('/');
    }
    setToken(localStorage.getItem('authToken'));
  }, [token]);

  const [error, setError] = useState('');

  const handlerLogin = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post('/api/auth/login', formData, config);

      localStorage.setItem('authToken', data.token);

      navigate('/');
    } catch (error) {
      setError(error.response.data.error);
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="container ">
      <form onSubmit={handlerLogin} className="form__box">
        <h3>Login Here</h3>
        {error && <span className="error_message">{error}</span>}

        <CustomInput
          id="email"
          label="Email"
          value={formData.email}
          placeholder="Enter Email"
          onChangeHandler={onChangeHandler}
          type="email"
        />
        <CustomInput
          id="password"
          label="Password"
          value={formData.password}
          placeholder="Enter Password"
          onChangeHandler={onChangeHandler}
          type="password"
        />

        <button className="btn__submit">Login</button>
        <p className="bottom_text">
          <Link to="/forgotpassword">forgot password</Link>{' '}
        </p>
        <p className="bottom_text">
          don not have an account ? <Link to="/register">register</Link>{' '}
        </p>
      </form>
    </div>
  );
};

export default LoginScreen;
