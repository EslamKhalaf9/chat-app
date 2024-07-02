import LoginForm from '@/components/auth/login-form'
import React from 'react'

const LoginPage = async () => {

  async function loginAction(email: string, password: string): Promise<{ success: boolean, error?: string }> {
    'use server';

    console.log(email, password);

    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    console.log("data", data);

    if (!response.ok) {
      return {
        success: false,
        error: data.message
      }
    }

    return {
      success: true
    }
    // console.log(data)
  }

  return (
    <div className='h-[90vh] flex items-center justify-center'>
      <LoginForm loginAction={loginAction} />
    </div>
  )
}

export default LoginPage