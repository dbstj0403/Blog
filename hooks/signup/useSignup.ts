import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface UseSignupResult {
  formValues: SignupFormValues;
  error: string | null;
  loading: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const useSignup = (): UseSignupResult => {
  const router = useRouter();

  const [formValues, setFormValues] = useState<SignupFormValues>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { name, email, password, passwordConfirm } = formValues;

    if (name.length > 10) {
      alert('닉네임은 10자 이하로 설정해 주세요.');
      setLoading(false);
      return;
    }
    if (password !== passwordConfirm) {
      alert('비밀번호 확인과 비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push('/login');
        return;
      }

      const body = await res.json();

      if (res.status === 400) {
        // 이미 가입된 이메일
        setError('이미 가입된 이메일입니다.');
        return;
      }

      if (res.status === 409 && body.code === 'GITHUB_EXIST') {
        const proceed = window.confirm(body.message);
        if (proceed) {
          await signIn('github', {
            callbackUrl: '/',
            authorizationParams: { login: '' },
          });
        }
        setLoading(false);
        return;
      }
    } catch (error: any) {
      console.log(error);
      setError('서버 요청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formValues,
    error,
    loading,
    handleChange,
    handleSubmit,
  };
};

export default useSignup;
