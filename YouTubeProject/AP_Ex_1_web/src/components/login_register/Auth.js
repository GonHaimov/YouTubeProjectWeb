import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Auth.css';

const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

const registrationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  displayName: yup.string().required('Display Name is required'),
  image: yup.mixed().required('Image is required')
});

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const loginForm = useForm({
    resolver: yupResolver(loginSchema)
  });

  const registrationForm = useForm({
    resolver: yupResolver(registrationSchema)
  });

  const handleLoginSubmit = (data) => {
    console.log('Login Data:', data);
  };

  const handleRegistrationSubmit = (data) => {
    console.log('Registration Data:', data);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/youtube-logo.png" alt="YouTube Logo" className="logo" />
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {isLogin ? (
          <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)}>
            <div className="input-group">
              <label>Username</label>
              <input name="username" ref={loginForm.register} />
              {loginForm.formState.errors.username && <p className="error">{loginForm.formState.errors.username.message}</p>}
            </div>
            <div className="input-group">
              <label>Password</label>
              <input name="password" type="password" ref={loginForm.register} />
              {loginForm.formState.errors.password && <p className="error">{loginForm.formState.errors.password.message}</p>}
            </div>
            <button type="submit" className="auth-button">Login</button>
          </form>
        ) : (
          <form onSubmit={registrationForm.handleSubmit(handleRegistrationSubmit)}>
            <div className="input-group">
              <label>Username</label>
              <input name="username" ref={registrationForm.register} />
              {registrationForm.formState.errors.username && <p className="error">{registrationForm.formState.errors.username.message}</p>}
            </div>
            <div className="input-group">
              <label>Password</label>
              <input name="password" type="password" ref={registrationForm.register} />
              {registrationForm.formState.errors.password && <p className="error">{registrationForm.formState.errors.password.message}</p>}
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input name="confirmPassword" type="password" ref={registrationForm.register} />
              {registrationForm.formState.errors.confirmPassword && <p className="error">{registrationForm.formState.errors.confirmPassword.message}</p>}
            </div>
            <div className="input-group">
              <label>Display Name</label>
              <input name="displayName" ref={registrationForm.register} />
              {registrationForm.formState.errors.displayName && <p className="error">{registrationForm.formState.errors.displayName.message}</p>}
            </div>
            <div className="input-group">
              <label>Image</label>
              <input name="image" type="file" ref={registrationForm.register} onChange={handleImageChange} />
              {registrationForm.formState.errors.image && <p className="error">{registrationForm.formState.errors.image.message}</p>}
            </div>
            {selectedImage && <img src={selectedImage} alt="Selected" className="selected-image" />}
            <button type="submit" className="auth-button">Register</button>
          </form>
        )}
        <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
    </div>
  );
}

export default Auth;
