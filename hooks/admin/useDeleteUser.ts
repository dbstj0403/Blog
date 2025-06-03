import { useState } from 'react';
import { signOut } from 'next-auth/react';

interface UseDeleteUserOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export const useDeleteUser = (sessionUserId: string | null, options?: UseDeleteUserOptions) => {
  const [loading, setLoading] = useState(false);

  const deleteUser = async (userId: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || '삭제에 실패했습니다.');
      }

      const isSelf = sessionUserId === userId.toString();

      if (isSelf) {
        alert('본인 계정이 삭제되어 로그아웃됩니다.');
        await signOut({ callbackUrl: '/' });
      } else {
        options?.onSuccess?.(); // 성공 콜백 실행
      }
    } catch (err: any) {
      options?.onError?.(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading };
};
