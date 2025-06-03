'use client';

import logo from '@/assets/icons/logoIcon.png';
import Image from 'next/image';
import useLogin from '@/hooks/login/useLogin';
import ConfirmLinkModal from '@/app/auth/confirm-link/_components/ConfirmModal';

const LoginForm = () => {
  const { formValues, loading, error, handleChange, handleCredentialsLogin, handleGithubLogin } =
    useLogin();

  return (
    <>
      <div className='max-w-md mx-auto p-6 space-y-6 pt-16 mt-10'>
        <div className='flex gap-2 items-center'>
          <Image src={logo} alt='logo' className='w-12 h-12' />
          <p className='font-semibold text-sm'>Digital Hanaro Tech</p>
        </div>
        <p className='text-2xl font-semibold text-gray-600'>로그인</p>

        <form onSubmit={handleCredentialsLogin} className='space-y-8'>
          <div>
            <label className='block mb-1 text-sm text-gray-500'>이메일 주소</label>
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
              className='w-full p-2 border rounded-lg'
            />
          </div>

          {error && <p className='text-red-600 text-xs'>{error}</p>}

          <button
            type='submit'
            disabled={loading}
            className='w-full py-3 bg-hana-green text-white rounded-lg cursor-pointer'
          >
            {loading ? '로그인 처리 중입니다...' : '로그인'}
          </button>
        </form>

        <hr />

        <button
          onClick={handleGithubLogin}
          className='w-full py-3 bg-gray-800 text-white rounded-lg cursor-pointer'
        >
          Github 계정으로 로그인
        </button>
        <p
          className='text-sm text-gray-500 underline text-center cursor-pointer'
          onClick={() => window.location.replace('/signup')}
        >
          회원가입
        </p>
      </div>

      <ConfirmLinkModal
        isOpen={showConfirmModal}
        email={confirmEmail}
        onConfirm={handleConfirmLink}
        onCancel={handleCancelLink}
      />
    </>
  );
};

export default LoginForm;
