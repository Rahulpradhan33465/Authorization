import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from './CustomInput';
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
    setToken(localStorage.getItem('authToken'));
  }, [token]);

  const handlerRegister = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    if (formData.password !== formData.confirmPassword) {
      setFormData({ ...formData, password: '', confirmPassword: '' });

      setTimeout(() => {
        setError('');
      }, 5000);

      return setError('Password and confirm must be same');
    }

    try {
      const { data } = await axios.post('/api/auth/register', formData, config);

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
      <form onSubmit={handlerRegister} className="form__box">
        <h3>Register Here</h3>
        {error && <span className="error_message">{error}</span>}
        <CustomInput
          id="username"
          label="Username"
          value={formData.username}
          placeholder="Enter Username"
          onChangeHandler={onChangeHandler}
          type="text"
        />
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
        <CustomInput
          id="confirmPassword"
          label="Password"
          value={formData.confirmPassword}
          placeholder="Enter Password"
          onChangeHandler={onChangeHandler}
          type="password"
        />
        <button className="btn__submit">Register</button>
        <p className="bottom_text">
          already have an account ? <Link to="/login">Login</Link>{' '}
        </p>
      </form>
    </div>
  );
};

export default Register;
