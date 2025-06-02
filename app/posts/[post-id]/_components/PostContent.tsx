'use client';

import { useSession } from 'next-auth/react';
import { useState, useTransition, useCallback } from 'react';
import { convertDateTimeFormat } from '@/utils/convertDateFormat';
import Image from 'next/image';
import Modal from '@/components/common/Modal';

import thumbsup from '@/assets/icons/thumbsupIcon.svg';
import thumbsdown from '@/assets/icons/thumbsdownIcon.svg';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useUser } from '@/app/context/UserContext';

interface Author {
  id: number;
  name: string | null;
  image: string | null;
}

interface PostContentProps {
  post: {
    id: number;
    author: Author;
    title: string;
    content: string | null;
    created_at: Date | string;
    modified_at: Date | string;
    like_count: number;
    dislike_count: number;
    myReaction?: 'LIKE' | 'DISLIKE' | null;
    categories: Array<{
      categoryId: number;
      category: { category_name: string };
    }>;
  };
}

export default function PostContent({ post }: PostContentProps) {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const { user } = useUser();
  const {
    id,
    title,
    author,
    content,
    created_at,
    modified_at,
    like_count,
    dislike_count,
    myReaction: initialReaction,
    categories,
  } = post;

  const [likes, setLikes] = useState(like_count);
  const [dislikes, setDislikes] = useState(dislike_count);
  const [myReaction, setMyReaction] = useState<'LIKE' | 'DISLIKE' | null>(initialReaction ?? null);
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content ?? '');
  const [editCategories, setEditCategories] = useState(
    categories.map((c) => c.category.category_name).join(', '),
  );

  const created = convertDateTimeFormat(created_at);
  const modified = convertDateTimeFormat(modified_at);

  const request = useCallback(
    async (type: 'LIKE' | 'DISLIKE') => {
      const res = await fetch('/api/reaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id, type }),
      });

      if (res.status === 401) throw new Error('Unauthorized');
      if (!res.ok) throw new Error('Failed');

      return (await res.json()) as {
        like_count: number;
        dislike_count: number;
        myReaction: 'LIKE' | 'DISLIKE' | null;
      };
    },
    [id],
  );

  const handle = (type: 'LIKE' | 'DISLIKE') => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

    const prevLike = likes;
    const prevDislike = dislikes;
    const prevReaction = myReaction;

    let dLike = 0;
    let dDis = 0;
    let next: 'LIKE' | 'DISLIKE' | null = myReaction;

    if (myReaction === type) {
      next = null;
      if (type === 'LIKE') dLike = -1;
      else dDis = -1;
    } else {
      next = type;
      if (type === 'LIKE') {
        dLike = 1;
        if (myReaction === 'DISLIKE') dDis = -1;
      } else {
        dDis = 1;
        if (myReaction === 'LIKE') dLike = -1;
      }
    }

    setLikes((v) => v + dLike);
    setDislikes((v) => v + dDis);
    setMyReaction(next);

    startTransition(async () => {
      try {
        const latest = await request(type);
        setLikes(latest.like_count);
        setDislikes(latest.dislike_count);
        setMyReaction(latest.myReaction);
      } catch (err: any) {
        if (err instanceof Error && err.message === 'Unauthorized') {
          setShowModal(true);
        } else {
          setLikes(prevLike);
          setDislikes(prevDislike);
          setMyReaction(prevReaction);
          alert('오류가 발생했습니다.');
        }
      }
    });
  };

  const submitEdit = async () => {
    // 공백 제거 & 빈 문자열 필터링
    const categoryNames = editCategories
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean);

    if (categoryNames.length === 0) {
      setShowCatModal(true); // ← 모달 열기
      return;
    }

    const res = await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, content: editContent, categoryNames }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert('게시글 수정에 실패했습니다.');
    }
  };

  return (
    <>
      <div className='pt-16 mt-10 flex justify-center px-6 pb-15'>
        <div className='max-w-3xl w-full flex flex-col gap-5'>
          <div className='flex justify-between'>
            {editMode ? (
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className='text-2xl font-bold w-[90%]'
              />
            ) : (
              <p className='font-bold text-3xl'>{title}</p>
            )}
            {user?.role === 'ADMIN' && (
              <div className='flex justify-end gap-2'>
                {editMode ? (
                  <>
                    <button
                      onClick={submitEdit}
                      className='text-sm text-hana-green cursor-pointer hover:underline'
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className='text-sm text-gray-500 cursor-pointer hover:underline'
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditMode(true)}
                      className='text-sm text-gray-500 hover:underline'
                    >
                      수정
                    </button>
                    <button
                      className='text-sm text-gray-500 hover:underline'
                      onClick={() => {
                        if (confirm('정말 삭제하시겠습니까?')) {
                          fetch(`/api/posts/${id}`, {
                            method: 'DELETE',
                          }).then(() => (window.location.href = '/'));
                        }
                      }}
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {editMode ? (
            <Input
              value={editCategories}
              onChange={(e) => setEditCategories(e.target.value)}
              placeholder='카테고리를 쉼표로 구분하여 입력하세요'
            />
          ) : (
            <div className='flex gap-2'>
              {categories.map((c) => (
                <span
                  key={c.categoryId}
                  className='rounded-full bg-gray-200 px-3 py-2 text-sm text-gray-700'
                >
                  #{c.category.category_name}
                </span>
              ))}
            </div>
          )}

          <div className='text-sm text-gray-600 flex flex-col gap-1 pl-2 mb-10'>
            <span>{author?.name ?? '익명'}</span>
            <div className='flex gap-2 mt-2'>
              <span>작성일 : {created}</span>
              <span>마지막 수정일 : {modified}</span>
            </div>
          </div>

          {editMode ? (
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={10}
              className='min-h-[200px]'
            />
          ) : (
            <div className='pl-3 whitespace-pre-wrap leading-relaxed text-justify'>{content}</div>
          )}

          {!editMode && (
            <div className='mt-15 flex gap-4 justify-center'>
              <button
                disabled={isPending}
                onClick={() => handle('LIKE')}
                className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm cursor-pointer font-medium transition ${
                  myReaction === 'LIKE'
                    ? 'bg-hana-green text-white shadow'
                    : 'bg-white text-hana-green border-[2px] border-hana-green'
                } disabled:opacity-50 focus:outline-none`}
              >
                <Image src={thumbsup} alt='like' className='w-5 h-5' />
                <span>{likes}</span>
              </button>

              <button
                disabled={isPending}
                onClick={() => handle('DISLIKE')}
                className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm cursor-pointer font-medium transition ${
                  myReaction === 'DISLIKE'
                    ? 'bg-gray-400 text-white shadow'
                    : 'bg-white text-gray-700 border-[2px] border-gray-400'
                } disabled:opacity-50 focus:outline-none`}
              >
                <Image src={thumbsdown} alt='dislike' className='w-5 h-5' />
                <span>{dislikes}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        actions={[
          {
            label: '로그인하러 가기',
            onClick: () => (window.location.href = '/login'),
          },
          {
            label: '닫기',
            onClick: () => setShowModal(false),
            className: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
          },
        ]}
      >
        로그인이 필요한 기능입니다. 로그인 후 다시 시도해주세요.
      </Modal>

      <Modal
        isOpen={showCatModal}
        onClose={() => setShowCatModal(false)}
        actions={[{ label: '확인', onClick: () => setShowCatModal(false) }]}
      >
        카테고리를 하나 이상 입력해주세요.
      </Modal>
    </>
  );
}
