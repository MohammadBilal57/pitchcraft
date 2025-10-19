import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpUser } from '../Config/Firebase.js';

export default function Registration() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      const result = await signUpUser(formData.email, formData.password);

      if (result.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          navigate('/signin');
        }, 2000);
      } else {
        alert(result.error);
        setErrors(prev => ({ ...prev, submit: result.error }));
      }

      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // ✅ Success Message
  if (isSubmitted) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ textAlign: 'center' }}>
            <svg style={styles.successIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 style={styles.successTitle}>Account Created!</h2>
            <p style={styles.successText}>You can now sign in to your account.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.subtitle}>Join us today and start your journey</p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name</label>
          <div style={styles.inputWrapper}>
            <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="off"
              style={{
                ...styles.input,
                ...(errors.fullName ? styles.inputError : {})
              }}
            />
          </div>
          {errors.fullName && <p style={styles.errorMessage}>{errors.fullName}</p>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address</label>
          <div style={styles.inputWrapper}>
            <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="off"
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {})
              }}
            />
          </div>
          {errors.email && <p style={styles.errorMessage}>{errors.email}</p>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <div style={styles.inputWrapper}>
            <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="off"
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {})
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.toggleButton}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && <p style={styles.errorMessage}>{errors.password}</p>}
        </div>

       <div style={styles.formGroup}>
          <label style={styles.label}>Confirm Password</label>
          <div style={styles.inputWrapper}>
            <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              autoComplete="off"
              style={{
                ...styles.input,
                ...(errors.confirmPassword ? styles.inputError : {})
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.toggleButton}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.confirmPassword && <p style={styles.errorMessage}>{errors.confirmPassword}</p>}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            ...styles.submitButton,
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        {/* Footer */}
        <div style={styles.footer}>
          <p>
            Already have an account?{' '}
            <Link to="/signin" style={styles.link}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// ✅ Clean UI Styles (same theme as Login)
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f4ff, #e8f0fe)',
    fontFamily: 'Poppins, sans-serif',
  },
  card: {
    width: '400px',
    background: '#fff',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
  },
  header: { textAlign: 'center', marginBottom: '25px' },
  title: { fontSize: '28px', fontWeight: '600', color: '#333', marginBottom: '5px' },
  subtitle: { fontSize: '14px', color: '#666' },
  formGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '6px', fontWeight: '500', color: '#444' },
  inputWrapper: { position: 'relative' },
  input: {
    width: '100%',
    padding: '12px 40px 12px 40px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  inputError: { borderColor: '#e74c3c' },
  icon: { position: 'absolute', left: '12px', top: '12px', width: '20px', height: '20px', color: '#999' },
  toggleButton: {
    position: 'absolute',
    right: '12px',
    top: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
  },
  errorMessage: { color: '#e74c3c', fontSize: '13px', marginTop: '4px' },
  submitButton: {
    width: '100%',
    background: '#4f46e5',
    color: '#fff',
    border: 'none',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background 0.3s ease',
  },
  footer: { textAlign: 'center', marginTop: '20px', color: '#555', fontSize: '14px' },
  link: { color: '#4f46e5', textDecoration: 'none', fontWeight: '500' },
  successIcon: {
    width: '50px',
    height: '50px',
    margin: 'auto',
    color: '#10b981',
    marginBottom: '15px',
  },
  successTitle: { fontSize: '22px', color: '#111', fontWeight: '600' },
  successText: { fontSize: '14px', color: '#666' },
};
