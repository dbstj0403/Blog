import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import WriteForm from './_components/WriteFrom';

export default async function WritePage() {
  const session = await getServerSession(authOptions);

  // 관리자가 아닐 경우 메인 화면으로 리다이렉트
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }
  return (
    <>
      <WriteForm />
    </>
  );
}
