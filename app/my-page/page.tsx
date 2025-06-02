import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import ProfileContent from './_components/ProfileContent';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return <ProfileContent user={session?.user} />;
}
