import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Mail',
      color: 'bg-white border-border text-text-primary hover:bg-surface-50',
      iconColor: 'text-red-500'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700',
      iconColor: 'text-white'
    }
  ];

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-muted">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            onClick={() => handleSocialLogin(provider.id)}
            disabled={isLoading}
            className={`${provider.color} transition-smooth`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon 
                name={provider.icon} 
                size={18} 
                className={provider.iconColor}
              />
              <span className="font-medium">{provider.name}</span>
            </div>
          </Button>
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs text-text-muted">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;