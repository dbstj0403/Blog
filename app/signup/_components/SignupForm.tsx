'use client';

import logo from '@/assets/icons/logoIcon.png';
import Image from 'next/image';
import useSignup from '@/hooks/signup/useSignup';

const SignupForm = () => {
  const { formValues, error, loading, handleChange, handleSubmit } = useSignup();

  return (
    <>
      <div className='max-w-md mx-auto space-y-6 p-6 pt-16 mt-10'>
        <div className='flex gap-2 items-center'>
          <Image src={logo} alt='logo' className='w-12 h-12' />
          <p className='font-semibold text-sm'>Digital Hanaro Tech</p>
        </div>
        <p className='text-2xl font-semibold text-gray-600 mb-4'>회원가입</p>
        {error && <p className='text-red-600 mb-4'>{error}</p>}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block mb-1 text-sm text-gray-500'>닉네임</label>
            <input
              name='name'
              value={formValues.name}
              onChange={handleChange}
              required
              className='w-full p-2 border rounded-lg'
            />
          </div>

          <div>
            <label className='block mb-1 text-sm text-gray-500'>이메일</label>
            <input
              name='email'
              type='email'
              value={formValues.email}
              onChange={handleChange}
              required
              className='w-full p-2 border rounded-lg'
            />
          </div>

          <div>
            <label className='block mb-1 text-sm text-gray-500'>비밀번호</label>
            <input
              name='password'
              type='password'
              value={formValues.password}
              onChange={handleChange}
              required
              minLength={8}
              className='w-full p-2 border rounded-lg'
            />
          </div>

          <div>
            <label className='block mb-1 text-sm text-gray-500'>비밀번호 확인</label>
            <input
              name='passwordConfirm'
              type='password'
              value={formValues.passwordConfirm}
              onChange={handleChange}
              required
              minLength={8}
              className='w-full p-2 border rounded-lg'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full py-3 bg-hana-green text-white rounded-lg cursor-pointer'
          >
            {loading ? '회원가입 처리 중입니다...' : '회원가입'}
          </button>

          <p className='text-gray-500 text-xs text-center'>
            이미 계정이 있으신가요?{' '}
            <span
              className='underline cursor-pointer'
              onClick={() => window.location.replace('/login')}
            >
              로그인
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
