import { Manrope } from 'next/font/google';

import { cn } from '~/shared/lib';

import './globals.css';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'] });

type Props = Readonly<{
  children: React.ReactNode;
}>;

export function TemporaryRootLayout({ children }: Props) {
  return (
    <html lang="uk">
      <body
        className={cn(
          manrope.className,
          'relative bg-background leading-relaxed text-foreground',
        )}
      >
        <div className="mx-auto flex max-w-384 flex-col">
          <main className="relative flex flex-col">{children}</main>
        </div>
      </body>
    </html>
  );
}
