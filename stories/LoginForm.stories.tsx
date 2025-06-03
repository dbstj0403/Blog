import { useState } from 'react';
import ConfirmLinkModal from '@/app/auth/confirm-link/_components/ConfirmModal';
import LoginForm from '@/app/login/_components/LoginForm';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof LoginForm> = {
  title: 'Auth/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof LoginForm>;

/**
 * 실제 useLogin 훅 없이 UI만 보기 위한 mock 버전
 */
export const UIOnly: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    return (
      <>
        <div className='max-w-md mx-auto p-6 space-y-6 pt-16 mt-10'>
          <div className='flex gap-2 items-center'>
            <div className='w-12 h-12 bg-gray-300 rounded' /> {/* 이미지 대체 */}
            <p className='font-semibold text-sm'>Digital Hanaro Tech</p>
          </div>
          <p className='text-2xl font-semibold text-gray-600'>로그인</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('로그인 시도');
            }}
            className='space-y-8'
          >
            <div>
              <label className='block mb-1 text-sm text-gray-500'>이메일 주소</label>
              <input
                name='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full p-2 border rounded-lg'
              />
            </div>

            <div>
              <label className='block mb-1 text-sm text-gray-500'>비밀번호</label>
              <input
                name='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='w-full p-2 border rounded-lg'
              />
            </div>

            <button type='submit' className='w-full py-3 bg-hana-green text-white rounded-lg'>
              로그인
            </button>
          </form>

          <hr />

          <button
            onClick={() => console.log('GitHub 로그인')}
            className='w-full py-3 bg-gray-800 text-white rounded-lg'
          >
            Github 계정으로 로그인
          </button>
          <p
            className='text-sm text-gray-500 underline text-center cursor-pointer'
            onClick={() => console.log('회원가입 이동')}
          >
            회원가입
          </p>
        </div>

        <ConfirmLinkModal
          isOpen={modalOpen}
          email='example@domain.com'
          onConfirm={() => {
            console.log('계정 연결 확인');
            setModalOpen(false);
          }}
          onCancel={() => {
            console.log('계정 연결 취소');
            setModalOpen(false);
          }}
        />
      </>
    );
  },
};
