import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import youtubeLogo from '../../assets/youtube-logo.png'; // Ensure this path is correct
import './Register.css';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const fileReader = new FileReader();
    fileReader.onloadend = async () => {
      const newUser = {
        username: data.username,
        password: data.password,
        email: data.email,
        profilePicture: fileReader.result // Store the base64 encoded image
      };

      try {
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser)
        });

        if (response.ok) {
          alert("Registration successful!");
          navigate('/login'); // Redirect to login page
        } else if (response.status === 409) {
          alert("Username or email already exists.");
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert("An error occurred. Please try again.");
      }
    };

    if (data.profilePicture[0]) {
      fileReader.readAsDataURL(data.profilePicture[0]);
    } else {
      alert("Please upload a valid image file (JPEG or PNG)");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image file (JPEG or PNG)");
    }
  };

  return (
    <div className="register-page">
      <div className="left-section">
        <img src={youtubeLogo} alt="YouTube Logo" className="logo" />
      </div>
      <div className="right-section">
        <div className="form-container">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="input-label">
              <div className="input-wrapper">
                <i className="fa fa-user icon"></i>
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 5,
                      message: "Username must have at least 5 characters"
                    }
                  })}
                />
              </div>
              {errors.username && <p className="error-message">{errors.username.message}</p>}
            </label>

            <label className="input-label">
              <div className="input-wrapper">
                <i className="fa fa-envelope icon"></i>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Entered value does not match email format"
                    }
                  })}
                />
              </div>
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </label>

            <label className="input-label">
              <div className="input-wrapper">
                <i className="fa fa-lock icon"></i>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters"
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                      message: "Password must contain one uppercase, one lowercase, and one number"
                    }
                  })}
                />
              </div>
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </label>

            <label className="input-label">
              <div className="input-wrapper">
                <i className="fa fa-lock icon"></i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("passwordConfirm", {
                    validate: value =>
                      value === watch('password') || "Passwords do not match"
                  })}
                />
              </div>
              {errors.passwordConfirm && <p className="error-message">{errors.passwordConfirm.message}</p>}
            </label>

            <label className="input-label">
              <div className="input-wrapper">
                <i className="fa fa-camera icon"></i>
                <input
                  type="file"
                  accept="image/*"
                  {...register("profilePicture", { required: "Profile picture is required" })}
                  onChange={handleImageUpload}
                />
              </div>
              {errors.profilePicture && <p className="error-message">{errors.profilePicture.message}</p>}
            </label>

            {imagePreview && <img src={imagePreview} alt="Profile Preview" className="image-preview" />}

            <button type="submit" className="register-btn">Get Started</button>
          </form>
          <p>Already have an account? <span className="sign-in-link" onClick={() => navigate('/login')}>Sign In</span></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
