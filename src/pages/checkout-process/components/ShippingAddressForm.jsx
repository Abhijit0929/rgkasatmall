import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShippingAddressForm = ({ onNext, savedAddresses = [] }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pinCode: '',
    addressType: 'home'
  });
  const [errors, setErrors] = useState({});

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const mockSavedAddresses = [
    {
      id: 1,
      fullName: 'Priya Sharma',
      phoneNumber: '+91 98765 43210',
      addressLine1: '123 MG Road',
      addressLine2: 'Near City Mall',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400001',
      addressType: 'home',
      isDefault: true
    },
    {
      id: 2,
      fullName: 'Priya Sharma',
      phoneNumber: '+91 98765 43210',
      addressLine1: 'Office Complex, Floor 5',
      addressLine2: 'Bandra Kurla Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400051',
      addressType: 'office',
      isDefault: false
    }
  ];

  const addresses = savedAddresses.length > 0 ? savedAddresses : mockSavedAddresses;

  const validatePinCode = (pinCode) => {
    return /^[1-9][0-9]{5}$/.test(pinCode);
  };

  const validatePhoneNumber = (phone) => {
    return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone);
  };

  const handleInputChange = (field, value) => {
    setNewAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newAddress.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!newAddress.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(newAddress.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Indian phone number';
    }

    if (!newAddress.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address line 1 is required';
    }

    if (!newAddress.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!newAddress.state) {
      newErrors.state = 'State is required';
    }

    if (!newAddress.pinCode.trim()) {
      newErrors.pinCode = 'PIN code is required';
    } else if (!validatePinCode(newAddress.pinCode)) {
      newErrors.pinCode = 'Please enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAddress = () => {
    if (validateForm()) {
      // Save address logic here
      setShowNewAddressForm(false);
      setSelectedAddress({ ...newAddress, id: Date.now() });
    }
  };

  const handleNext = () => {
    if (selectedAddress || (showNewAddressForm && validateForm())) {
      onNext(selectedAddress || newAddress);
    }
  };

  return (
    <div className="bg-background">
      <div className="mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Shipping Address
        </h2>
        <p className="text-text-secondary">
          Choose a delivery address or add a new one
        </p>
      </div>

      {/* Saved Addresses */}
      {addresses.length > 0 && !showNewAddressForm && (
        <div className="space-y-4 mb-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`p-4 border rounded-lg cursor-pointer transition-smooth ${
                selectedAddress?.id === address.id
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
              }`}
              onClick={() => setSelectedAddress(address)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-text-primary">
                      {address.fullName}
                    </h3>
                    {address.isDefault && (
                      <span className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded">
                        Default
                      </span>
                    )}
                    <span className="px-2 py-1 text-xs bg-surface-200 text-text-secondary rounded capitalize">
                      {address.addressType}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm mb-1">
                    {address.addressLine1}
                    {address.addressLine2 && `, ${address.addressLine2}`}
                  </p>
                  <p className="text-text-secondary text-sm mb-1">
                    {address.city}, {address.state} - {address.pinCode}
                  </p>
                  <p className="text-text-secondary text-sm">
                    Phone: {address.phoneNumber}
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedAddress?.id === address.id
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {selectedAddress?.id === address.id && (
                    <Icon name="Check" size={12} className="text-primary-foreground" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Address Button */}
      {!showNewAddressForm && (
        <Button
          variant="outline"
          onClick={() => setShowNewAddressForm(true)}
          iconName="Plus"
          className="mb-6"
        >
          Add New Address
        </Button>
      )}

      {/* New Address Form */}
      {showNewAddressForm && (
        <div className="border border-border rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-text-primary">
              Add New Address
            </h3>
            <Button
              variant="ghost"
              onClick={() => setShowNewAddressForm(false)}
              iconName="X"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Full Name *
              </label>
              <Input
                type="text"
                placeholder="Enter full name"
                value={newAddress.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={errors.fullName ? 'border-error' : ''}
              />
              {errors.fullName && (
                <p className="text-error text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Phone Number *
              </label>
              <Input
                type="tel"
                placeholder="+91 98765 43210"
                value={newAddress.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className={errors.phoneNumber ? 'border-error' : ''}
              />
              {errors.phoneNumber && (
                <p className="text-error text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-1">
                Address Line 1 *
              </label>
              <Input
                type="text"
                placeholder="House/Flat/Office No., Building Name"
                value={newAddress.addressLine1}
                onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                className={errors.addressLine1 ? 'border-error' : ''}
              />
              {errors.addressLine1 && (
                <p className="text-error text-sm mt-1">{errors.addressLine1}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-1">
                Address Line 2
              </label>
              <Input
                type="text"
                placeholder="Area, Landmark (Optional)"
                value={newAddress.addressLine2}
                onChange={(e) => handleInputChange('addressLine2', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                City *
              </label>
              <Input
                type="text"
                placeholder="Enter city"
                value={newAddress.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={errors.city ? 'border-error' : ''}
              />
              {errors.city && (
                <p className="text-error text-sm mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                State *
              </label>
              <select
                value={newAddress.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.state ? 'border-error' : 'border-border'
                }`}
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-error text-sm mt-1">{errors.state}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                PIN Code *
              </label>
              <Input
                type="text"
                placeholder="400001"
                value={newAddress.pinCode}
                onChange={(e) => handleInputChange('pinCode', e.target.value)}
                className={errors.pinCode ? 'border-error' : ''}
                maxLength={6}
              />
              {errors.pinCode && (
                <p className="text-error text-sm mt-1">{errors.pinCode}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Address Type
              </label>
              <select
                value={newAddress.addressType}
                onChange={(e) => handleInputChange('addressType', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="home">Home</option>
                <option value="office">Office</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <Button
              variant="primary"
              onClick={handleSaveAddress}
              iconName="Save"
            >
              Save Address
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowNewAddressForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!selectedAddress && !showNewAddressForm}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Delivery
        </Button>
      </div>
    </div>
  );
};

export default ShippingAddressForm;