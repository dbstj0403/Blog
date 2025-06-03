'use client';

import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import searchIcon from '@/assets/icons/searchIcon.svg';
import { useDeleteUser } from '@/hooks/admin/useDeleteUser';
import { useFetchUsers } from '@/hooks/admin/useFetchUsers';
import convertDateFormat from '@/utils/convertDateFormat';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
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

export default function AdminUserTable() {
  const { data: session } = useSession();
  const { users, loading, error, refetch } = useFetchUsers();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { deleteUser, loading: deleting } = useDeleteUser(session?.user?.id ?? null, {
    onSuccess: () => {
      setShowDeleteModal(false);
      setSelectedUserId(null);
      refetch();
    },
    onError: (msg) => {
      alert(msg);
    },
  });

  const filteredUsers = users.filter((u) =>
    `${u.name ?? ''} ${u.email ?? ''}`.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card className='p-6 shadow-sm mt-6'>
      <div className='flex justify-center items-center flex-col'>
        {!loading && <p className='text-sm text-gray-500 mb-2'>로딩 중...</p>}
        {!error && (
          <p className='text-sm text-red-500 mb-2'>
            {error} <button onClick={refetch}>다시 시도</button>
          </p>
        )}
      </div>

      <div className='flex justify-end mb-4 items-center gap-3'>
        <Image src={searchIcon} alt='search' className='w-5 h-5' />
        <Input
          type='text'
          placeholder='닉네임 또는 이메일 검색'
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
              <TableHead className='px-4 py-2'>닉네임</TableHead>
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
                  {convertDateFormat(u.created_at)}
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
            label: deleting ? '삭제 중...' : '삭제하기',
            onClick: () => selectedUserId && deleteUser(selectedUserId),
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
