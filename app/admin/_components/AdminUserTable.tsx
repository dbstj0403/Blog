'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
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
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data);
  };

  const handleDelete = (userId: number) => {
    setDeleteTargetId(userId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;

    const res = await fetch(`/api/admin/users/${deleteTargetId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      await fetchUsers(); // 목록 새로고침
    } else {
      const data = await res.json();
      alert(data.message || '삭제에 실패했습니다.');
    }

    setShowModal(false);
    setDeleteTargetId(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Card className='p-6 shadow-sm mt-6'>
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
              {users.map((u) => (
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
                    {u.provider === 'LOCAL'
                      ? '이메일'
                      : u.provider === 'GITHUB'
                      ? '깃허브'
                      : u.provider}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-sm'>
                    {new Date(u.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className='px-2 py-2 text-sm'>
                    <Button
                      className='cursor-pointer'
                      variant='destructive'
                      size='sm'
                      onClick={() => handleDelete(u.id)}
                    >
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        actions={[
          {
            label: '삭제',
            onClick: confirmDelete,
            className: 'bg-red-600 text-white hover:bg-red-700',
          },
          {
            label: '취소',
            onClick: () => setShowModal(false),
            className: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
          },
        ]}
      >
        해당 유저를 정말 삭제하시겠습니까?
      </Modal>
    </>
  );
}
