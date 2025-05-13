import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const shop = searchParams.get('shop');

    if (code && shop) {
      // Simulate successful auth
      const timer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
        <h2 className="mt-4 text-lg font-semibold text-gray-900">
          Completing authentication...
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Please wait while we set up your account
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;