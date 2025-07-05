import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const OTPVerification = ({ 
  isOpen, 
  onClose, 
  onVerify, 
  onResend, 
  phoneNumber, 
  isLoading 
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [isOpen, timeLeft]);

  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '', '', '']);
      setTimeLeft(60);
      setCanResend(false);
      setError('');
    }
  }, [isOpen]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }
    
    if (onVerify) {
      onVerify(otpValue);
    }
  };

  const handleResend = () => {
    if (canResend && onResend) {
      onResend();
      setTimeLeft(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-text-primary bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-strong max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Verify Phone Number
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Smartphone" size={32} className="text-primary" />
          </div>
          <p className="text-text-secondary">
            We've sent a 6-digit verification code to
          </p>
          <p className="font-medium text-text-primary">
            +91 {phoneNumber}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3 text-center">
              Enter Verification Code
            </label>
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-lg font-semibold ${
                    error ? 'border-error' : ''
                  }`}
                />
              ))}
            </div>
            {error && (
              <p className="mt-2 text-sm text-error text-center flex items-center justify-center">
                <Icon name="AlertCircle" size={16} className="mr-1" />
                {error}
              </p>
            )}
          </div>

          <div className="text-center">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-primary hover:text-primary-600 font-medium transition-smooth"
              >
                Resend Code
              </button>
            ) : (
              <p className="text-text-muted">
                Resend code in {formatTime(timeLeft)}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
            disabled={isLoading || otp.join('').length !== 6}
          >
            {isLoading ? 'Verifying...' : 'Verify & Continue'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-sm text-text-secondary hover:text-text-primary transition-smooth"
          >
            Use different phone number
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;