'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Modal from '@/components/common/Modal';

export default function AdminUserTable() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async () => {
    if (!selectedUserId) return;

    const res = await fetch(`/api/admin/users/${selectedUserId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setShowDeleteModal(false);
      setSelectedUserId(null);
      fetchUsers();
    } else {
      const data = await res.json();
      alert(data.message || '삭제에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) =>
    `${u.name ?? ''} ${u.email ?? ''}`.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card className='p-6 shadow-sm mt-6'>
      <div className='flex justify-end mb-4'>
        <Input
          type='text'
          placeholder='이름 또는 이메일 검색'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full sm:w-64'
        />
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='px-4 py-2'>ID</TableHead>
              <TableHead className='px-4 py-2'>이름</TableHead>
              <TableHead className='px-4 py-2'>이메일</TableHead>
              <TableHead className='px-4 py-2'>권한</TableHead>
              <TableHead className='px-4 py-2'>가입경로</TableHead>
              <TableHead className='px-4 py-2'>가입일</TableHead>
              <TableHead className='px-4 py-2'>관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((u) => (
              <TableRow key={u.id}>
                <TableCell className='px-4 py-2 text-sm'>{u.id}</TableCell>
                <TableCell className='px-4 py-2 text-sm break-all'>
                  {u.name ?? '이름 없음'}
                </TableCell>
                <TableCell className='px-4 py-2 text-sm break-all'>{u.email}</TableCell>
                <TableCell className='px-4 py-2 text-sm'>
                  {u.role === 'ADMIN' ? '관리자' : '일반'}
                </TableCell>
                <TableCell className='px-4 py-2 text-sm'>
                  {u.provider === 'github' ? 'GitHub' : 'Email'}
                </TableCell>
                <TableCell className='px-4 py-2 text-sm'>
                  {new Date(u.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className='px-2 py-2 text-sm'>
                  <Button
                    variant='destructive'
                    className='cursor-pointer'
                    size='sm'
                    onClick={() => {
                      setSelectedUserId(u.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        actions={[
          {
            label: '삭제하기',
            onClick: deleteUser,
            className: 'bg-red-600 text-white hover:bg-red-700',
          },
          {
            label: '취소',
            onClick: () => setShowDeleteModal(false),
            className: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
          },
        ]}
      >
        해당 유저를 정말 삭제하시겠습니까?
      </Modal>
    </Card>
  );
}
