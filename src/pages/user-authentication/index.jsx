import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import OTPVerification from './components/OTPVerification';
import ForgotPassword from './components/ForgotPassword';
import AuthTabs from './components/AuthTabs';
import GuestCheckout from './components/GuestCheckout';

const UserAuthentication = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Mock credentials for testing
  const mockCredentials = {
    email: "customer@rgkasat.com",
    phone: "9876543210",
    password: "password123",
    otp: "123456"
  };

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/homepage';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication logic
      const isValidEmail = formData.emailOrPhone === mockCredentials.email;
      const isValidPhone = formData.emailOrPhone === mockCredentials.phone;
      const isValidPassword = formData.password === mockCredentials.password;
      
      if ((isValidEmail || isValidPhone) && isValidPassword) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', isValidEmail ? mockCredentials.email : `${mockCredentials.phone}@phone.com`);
        localStorage.setItem('userName', 'Priya Sharma');
        
        setAuthSuccess('Login successful! Redirecting...');
        
        setTimeout(() => {
          const from = location.state?.from?.pathname || '/homepage';
          navigate(from, { replace: true });
        }, 1000);
      } else {
        setAuthError(`Invalid credentials. Use email: ${mockCredentials.email} or phone: ${mockCredentials.phone} with password: ${mockCredentials.password}`);
      }
    } catch (error) {
      setAuthError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show OTP verification for phone registration
      setPhoneNumber(formData.phone);
      setShowOTPModal(true);
    } catch (error) {
      setAuthError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async (otp) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (otp === mockCredentials.otp) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', `${phoneNumber}@phone.com`);
        localStorage.setItem('userName', 'New Customer');
        
        setShowOTPModal(false);
        setAuthSuccess('Account created successfully! Redirecting...');
        
        setTimeout(() => {
          const from = location.state?.from?.pathname || '/homepage';
          navigate(from, { replace: true });
        }, 1000);
      } else {
        setAuthError(`Invalid OTP. Use: ${mockCredentials.otp}`);
      }
    } catch (error) {
      setAuthError('OTP verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPResend = async () => {
    // Simulate resend OTP
    await new Promise(resolve => setTimeout(resolve, 500));
    setAuthSuccess('OTP resent successfully!');
    setTimeout(() => setAuthSuccess(''), 3000);
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      localStorage.setItem('userName', `${provider} User`);
      
      setAuthSuccess(`${provider} login successful! Redirecting...`);
      
      setTimeout(() => {
        const from = location.state?.from?.pathname || '/homepage';
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      setAuthError(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    setIsLoading(true);
    
    try {
      // Simulate password reset email
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAuthSuccess('Password reset link sent successfully!');
    } catch (error) {
      setAuthError('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setAuthError('');
    setAuthSuccess('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/homepage" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-smooth group-hover:bg-primary-600">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-heading font-semibold text-primary">
                  R.G Kasat
                </h1>
                <p className="text-xs text-text-secondary font-caption -mt-1">
                  Saree Mall
                </p>
              </div>
            </Link>
            
            <Link
              to="/homepage"
              className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-smooth"
            >
              <Icon name="ArrowLeft" size={18} />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left Panel - Desktop Only */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
          
          <div className="relative z-10 flex flex-col justify-center px-12 py-16">
            <div className="max-w-md">
              <h2 className="text-3xl font-heading font-bold text-primary mb-4">
                Welcome to R.G Kasat Saree Mall
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Discover the finest collection of traditional and contemporary sarees, 
                crafted with love and heritage spanning generations.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Star" size={16} className="text-primary-foreground" />
                  </div>
                  <span className="text-text-secondary">Premium Quality Fabrics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="Truck" size={16} className="text-secondary-foreground" />
                  </div>
                  <span className="text-text-secondary">Free Shipping Across India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="Shield" size={16} className="text-accent-foreground" />
                  </div>
                  <span className="text-text-secondary">Secure & Trusted Shopping</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Saree Image */}
          <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400"
              alt="Traditional Saree"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Panel - Authentication Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md w-full space-y-8">
            {/* Mobile Header */}
            <div className="lg:hidden text-center">
              <h2 className="text-2xl font-heading font-bold text-primary mb-2">
                Welcome Back
              </h2>
              <p className="text-text-secondary">
                Sign in to your account or create a new one
              </p>
            </div>

            {/* Success/Error Messages */}
            {authSuccess && (
              <div className="bg-success-50 border border-success-200 rounded-lg p-4 flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0" />
                <span className="text-success-600 font-medium">{authSuccess}</span>
              </div>
            )}
            
            {authError && (
              <div className="bg-error-50 border border-error-200 rounded-lg p-4 flex items-start space-x-3">
                <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="text-error-600 font-medium block">{authError}</span>
                  <button
                    onClick={clearMessages}
                    className="text-error-500 hover:text-error-600 text-sm mt-1 transition-smooth"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {/* Auth Tabs */}
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Auth Forms */}
            <div className="bg-surface-50 rounded-lg p-6 shadow-soft">
              {activeTab === 'login' ? (
                <LoginForm
                  onSubmit={handleLogin}
                  isLoading={isLoading}
                  onForgotPassword={() => setShowForgotPassword(true)}
                  onSwitchToRegister={() => setActiveTab('register')}
                />
              ) : (
                <RegisterForm
                  onSubmit={handleRegister}
                  isLoading={isLoading}
                  onSwitchToLogin={() => setActiveTab('login')}
                />
              )}
            </div>

            {/* Social Login */}
            <SocialLogin
              onSocialLogin={handleSocialLogin}
              isLoading={isLoading}
            />

            {/* Guest Checkout */}
            <GuestCheckout />

            {/* Footer Links */}
            <div className="text-center space-y-2">
              <div className="flex justify-center space-x-6 text-sm">
                <a href="#" className="text-text-muted hover:text-primary transition-smooth">
                  Privacy Policy
                </a>
                <a href="#" className="text-text-muted hover:text-primary transition-smooth">
                  Terms of Service
                </a>
                <a href="#" className="text-text-muted hover:text-primary transition-smooth">
                  Help Center
                </a>
              </div>
              <p className="text-xs text-text-muted">
                © {new Date().getFullYear()} R.G Kasat Saree Mall. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <OTPVerification
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={handleOTPVerification}
        onResend={handleOTPResend}
        phoneNumber={phoneNumber}
        isLoading={isLoading}
      />

      {/* Forgot Password Modal */}
      <ForgotPassword
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSubmit={handleForgotPassword}
        isLoading={isLoading}
      />
    </div>
  );
};

export default UserAuthentication;