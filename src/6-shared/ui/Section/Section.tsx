import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import type { Headings, ParentLink } from '../../api';
import { cn } from '../../lib';
import { Skeleton } from '../Skeleton';

import { SectionHeader } from './SectionHeader';

const sectionVariants = cva(
  'relative h-full grid-cols-1 grid grid-rows-[auto_minmax(22rem,auto)]',
  {
    variants: {
      background: {
        light: 'text-foreground',
        dark: 'text-background [&_h1]:font-semibold [&_h2]:font-semibold',
      },
      height: {
        fixed: '[&>div]:items-center',
        default: '',
      },
      type: {
        main: 'pt-8 pb-12 md:pb-24',
        additional: 'py-12 md:py-24',
      },
    },
    defaultVariants: {
      background: 'light',
      height: 'default',
      type: 'additional',
    },
  },
);

type Props = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof sectionVariants> & {
    headings: Headings;
    href?: string;
    parentLink?: ParentLink;
  };

export function Section({
  headings,
  href,
  parentLink,
  background,
  height,
  type,
  className,
  children,
  ...props
}: Props) {
  const headerSide = background === 'dark' ? 'left' : 'right';

  // TODO Add fallback to ErrorBoundary

  return (
    <ErrorBoundary fallback={null}>
      <Suspense
        fallback={<Skeleton className="mx-36 mb-16 mt-36 flex min-h-16" />}
      >
        <section
          className={cn(
            sectionVariants({ background, height, type, className }),
          )}
          {...props}
        >
          {type === 'main' ? (
            <div>
              {parentLink && (
                <Link href={parentLink.href}>
                  <SectionHeader
                    headings={parentLink.headings}
                    level="subTitle"
                    side="right"
                  />
                </Link>
              )}
              <SectionHeader headings={headings} level="pageTitle" />
            </div>
          ) : href ? (
            <Link href={href}>
              <SectionHeader headings={headings} side={headerSide} />
            </Link>
          ) : (
            <SectionHeader headings={headings} side={headerSide} />
          )}

          <div className="flex flex-col justify-center">{children}</div>
        </section>
      </Suspense>
    </ErrorBoundary>
  );
}
