import React from 'react';
import LoginForm from '@/Components/LoginForm/LoginForm';
import AuthLayout from '../../../layouts/layout';

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
