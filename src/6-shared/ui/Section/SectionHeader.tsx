import { cva, VariantProps } from 'class-variance-authority';

import type { Headings } from '../../api';
import { cn } from '../../lib';

const sectionHeaderVariants = cva('*:w-full h-full first-letter:uppercase', {
  variants: {
    level: {
      pageTitle:
        'h-24 text-base font-semibold md:h-32 md:text-xl [&_h1]:mt-1 md:[&_h1]:mt-2',
      sectionTitle: 'h-24 text-base md:text-xl [&_h2]:mt-1 md:[&_h2]:mt-2',
      subTitle:
        'h-auto text-xs opacity-70 md:text-sm font-semibold [&_[role="doc-subtitle"]]:hidden sm:[&_[role="doc-subtitle"]]:block',
    },
    side: {
      left: '*:pr-0',
      right: '*:text-end *:pl-0',
    },
  },
  compoundVariants: [
    {
      level: 'sectionTitle',
      side: 'right',
      class:
        'font-semibold *:text-start md:*:text-end [&_[role="doc-subtitle"]]:px-6 [&_h2]:pr-0',
    },
  ],
  defaultVariants: {
    level: 'sectionTitle',
    side: 'left',
  },
});

type Props = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof sectionHeaderVariants> & {
    headings: Headings;
  };

export function SectionHeader({
  headings,
  level = 'sectionTitle',
  side,
  className,
  children,
  ...props
}: Props) {
  return (
    <header
      className={cn(sectionHeaderVariants({ level, side, className }))}
      {...props}
    >
      <p role="doc-subtitle" className="px-6 opacity-80 md:px-12">
        {headings?.secondary}
      </p>
      {level === 'pageTitle' ? (
        <h1>{headings?.primary}</h1>
      ) : level === 'sectionTitle' ? (
        <h2>{headings?.primary}</h2>
      ) : (
        <h4>{headings?.primary}</h4>
      )}
    </header>
  );
}
