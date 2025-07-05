import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ForgotPassword = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email address is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      if (onSubmit) {
        onSubmit(email);
        setIsSubmitted(true);
      }
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-text-primary bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-strong max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Reset Password
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-text-muted hover:text-text-primary transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Lock" size={32} className="text-primary" />
              </div>
              <p className="text-text-secondary">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="resetEmail" className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <Input
                  id="resetEmail"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleInputChange}
                  className={error ? 'border-error' : ''}
                />
                {error && (
                  <p className="mt-1 text-sm text-error flex items-center">
                    <Icon name="AlertCircle" size={16} className="mr-1" />
                    {error}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={handleClose}
                className="text-sm text-text-secondary hover:text-text-primary transition-smooth"
              >
                Back to Sign In
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Check Your Email
            </h3>
            <p className="text-text-secondary mb-6">
              We've sent a password reset link to{' '}
              <span className="font-medium text-text-primary">{email}</span>
            </p>
            <div className="space-y-3">
              <Button
                variant="primary"
                fullWidth
                onClick={handleClose}
              >
                Back to Sign In
              </Button>
              <p className="text-xs text-text-muted">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary hover:text-primary-600 transition-smooth"
                >
                  try again
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;