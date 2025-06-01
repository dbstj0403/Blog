// src/components/ui/button.tsx
'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 font-medium',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 font-medium',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 font-medium',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 font-medium',
        link: 'text-primary underline-offset-4 hover:underline font-medium',

        login:
          'bg-[var(--hana-green)] text-white cursor-pointer ' +
          'px-2 py-0.5 ' +
          'sm:px-6 sm:py-1 sm:text-sm ' +
          'rounded-md hover:bg-[var(--hana-green-80)] focus-visible:ring-0 shadow-none font-normal',

        signup:
          'bg-[#f2f4f6] text-[#3b3b3b] cursor-pointer ' +
          'px-2 py-0.5 ' +
          'sm:px-6 sm:py-1 sm:text-sm ' +
          'rounded-md hover:bg-[#e4e6e8] focus-visible:ring-0 shadow-none font-normal',
      },
      size: {
        default: 'h-8 px-3 py-2 text-xs sm:text-base has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
