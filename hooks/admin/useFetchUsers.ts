import { useCallback, useEffect, useState } from 'react';

export interface UserItem {
  id: number;
  name: string | null;
  email: string | null;
  role: 'USER' | 'ADMIN';
  provider: 'local' | 'github';
  created_at: string;
}

export const useFetchUsers = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/users');
      if (!res.ok) {
        throw new Error('유저 목록을 불러오지 못했습니다.');
      }
      const data: UserItem[] = await res.json();
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
};
