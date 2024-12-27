import React, { useState } from 'react';
import useAuthStore from '../store/useAuthStore.js';
import { toast } from 'react-toastify';
import { BsChatHeart, BsEyeFill, BsEyeSlashFill, BsKey } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
import InlineLoader from '../components/skeletons/InlineLoader.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const { isLoggingIn, login } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(formData);
    if (success) {
      const { redirectPath } = useAuthStore.getState();
      navigate(redirectPath, { replace: true });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'password':
        setFormData({ ...formData, password: value });
        break;
      case 'email':
        setFormData({ ...formData, email: value });
        break;
    }
  };
  return (
    <div className="grid min-h-[calc(100vh-8rem)]">
      {/* left side */}
      <div className="flex flex-col justify-center items-center">
        <div className="w-full max-w-md space-y-6 text-center">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-3xl">Welcome back</h1>
            <h1 className="text-xl">Sign in to your account</h1>
            <label className="input input-bordered flex items-center gap-2">
              <IoIosMail />
              <input
                type="text"
                className="grow"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </label>
            <label className="relative input input-bordered flex items-center gap-2">
              <BsKey />
              <input
                type={showPassword ? 'text' : 'password'}
                className="grow"
                placeholder="•••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </button>
            </label>
            <button className="btn btn-primary w-full" type="submit" disabled={isLoggingIn}>
              {isLoggingIn ? <InlineLoader /> : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
