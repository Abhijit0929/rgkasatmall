import React from 'react';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Sign In', description: 'Welcome back' },
    { id: 'register', label: 'Create Account', description: 'Join us today' }
  ];

  return (
    <div className="mb-8">
      <div className="flex bg-surface-100 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-smooth ${
              activeTab === tab.id
                ? 'bg-background text-primary shadow-soft'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <div className="text-center">
              <div className="font-semibold">{tab.label}</div>
              <div className="text-xs opacity-75 mt-0.5">{tab.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AuthTabs;