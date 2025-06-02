'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';

interface LoginFormValues {
  email: string;
  password: string;
}

interface UseLoginResult {
  formValues: LoginFormValues;
  loading: boolean;
  error: string | null;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCredentialsLogin: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleGithubLogin: () => Promise<void>;
}

const useLogin = (): UseLoginResult => {
  const router = useRouter();
  const { status } = useSession();

  const [formValues, setFormValues] = useState<LoginFormValues>({ email: '', password: '' });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCredentialsLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { email, password } = formValues;

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
        callbackUrl: '/',
      });

      if (res?.ok && res.url) {
        router.push(res.url);
        return;
      } else {
        setError('이메일 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (err: any) {
      console.error(err);
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await signIn('github', {
        callbackUrl: window.location.origin,
      });
    } catch (err: any) {
      console.error(err);
      setError('Github 로그인 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  return { formValues, loading, error, handleChange, handleCredentialsLogin, handleGithubLogin };
};

export default useLogin;
