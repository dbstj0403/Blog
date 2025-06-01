// src/components/ui/tabs.tsx
'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

/* ─────────── Radix Tabs 래퍼 ─────────── */
export function Tabs(props: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot='tabs'
      className={cn('flex flex-col gap-2', props.className)}
      {...props}
    />
  );
}

export function TabsList(props: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      className={cn(
        /* flex 배치 + 탭 간격 + 전체 바닥선 + relative(밑줄 위치 기준) */
        'relative flex w-full space-x-8 border-b border-gray-200',
        props.className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger(props: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(
        /* ── 공통(비활성/기본) 스타일 ───────────────────────────────── */
        'relative pb-2 text-sm font-normal transition-colors',
        'text-gray-500' /* 비활성: 연한 회색 텍스트 */,
        'hover:text-gray-700' /* hover 시 조금 진해짐 */,
        'border-0' /* 글로벌 border를 완전히 제거 */,

        /* ── 활성 상태 텍스트만 강조 (밑줄은 외부 Indicator가 담당) ───── */
        'data-[state=active]:!text-gray-900',
        'data-[state=active]:!font-semibold',
        'flex-1',

        props.className,
      )}
      {...props}
    />
  );
}

export function TabsContent(props: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className={cn('flex-1 outline-none', props.className)}
      {...props}
    />
  );
}
