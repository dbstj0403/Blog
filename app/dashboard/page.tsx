import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) return <p>로그인 필요</p>;

  return <div>안녕하세요, {session.user?.email}</div>;
}
