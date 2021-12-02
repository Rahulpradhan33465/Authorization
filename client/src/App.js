import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import ForgotPassword from './components/screens/ForgotPassword';
import LoginScreen from './components/screens/LoginScreen';
import Register from './components/screens/Register';
import ResetPassword from './components/screens/ResetPassword';
import PrivateScreen from './components/screens/PrivateScreen';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PrivateScreen />} />

        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/passwordreset/:resetToken"
          element={<ResetPassword />}
        />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
