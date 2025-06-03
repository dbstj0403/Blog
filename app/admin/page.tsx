import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminUserTable from './_components/AdminUserTable';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // 관리자가 아닐 경우 메인 화면으로 리다이렉트
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className='py-16 px-6 mx-auto w-full max-w-6xl mt-10'>
      <p className='text-3xl font-bold mb-6 text-center'>회원 관리</p>
      <AdminUserTable />
    </div>
  );
}
