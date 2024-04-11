'use client';
import axios from 'axios';
import React, { useRef, useState } from 'react';

const signupPage = () => {
  const [signupState, setSignupState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const emailCheckHandler = async () => {
    try {
      const checkComplate = await axios.post(`/api/login/emailCheck`, {
        email: signupState.email,
      });

      console.log(checkComplate.data);
    } catch (error) {
      console.log(error);
    }
  };

  const inputChangeHandler = (key: string, value: string) => {
    setSignupState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <main className='flex min-h-screen flex-col items-center space-y-10 p-12'>
      <h4 className='text-3xl font-semibold'>Sign Up</h4>
      <div>
        <div className='w-96'>
          <label
            htmlFor='email'
            className='block text-sm text-gray-800 dark:text-gray-200'
          >
            Email
          </label>
          <div className='flex w-full'>
            <div className='mt-1 mr-1'>
              <input
                ref={emailRef}
                onChange={(e: any) => {
                  inputChangeHandler('email', e.target.value);
                }}
                value={signupState.email}
                id='email'
                name='email'
                type='email'
                required
                autoFocus={true}
                className='mt-2 mr-1 block w-75 rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
              />
            </div>
            <button
              className='w-1/6 font-bold pt-3'
              onClick={emailCheckHandler}
            >
              중복체크
            </button>
          </div>
        </div>

        <div className='mt-4'>
          <label
            htmlFor='password'
            className='block text-sm text-gray-800 dark:text-gray-200'
          >
            Password
          </label>
          <div className='mt-1'>
            <input
              type='password'
              id='password'
              name='password'
              ref={passwordRef}
              onChange={(e: any) => (passwordRef.current = e.target.value)}
              className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
            />
          </div>
        </div>

        <div className='mt-4'>
          <label
            htmlFor='name'
            className='block text-sm text-gray-800 dark:text-gray-200'
          >
            name
          </label>
          <div className='mt-1'>
            <input
              type='text'
              id='name'
              name='name'
              ref={passwordRef}
              onChange={(e: any) => (passwordRef.current = e.target.value)}
              className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
            />
          </div>
        </div>

        <div className='mt-6'>
          <button className='w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
            회원가입
          </button>
        </div>
      </div>
    </main>
  );
};

export default signupPage;
