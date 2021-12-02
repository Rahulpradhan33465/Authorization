import { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const PrivateScreen = () => {
  const [error, setError] = useState('');
  const [privateData, setPrivateData] = useState('');
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
    setAuthToken(localStorage.getItem('authToken'));
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };

      try {
        const { data } = await axios.get('/api/private', config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem('authToken');
        setError('You are not authorized please login');
      }
    };

    fetchPrivateDate();
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };
  return (
    <div className="container_box">
      <h3>{privateData}</h3>
      <button className="btn__submit" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default PrivateScreen;
