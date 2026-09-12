import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'ghost' | 'quiet';

const base =
  'inline-flex items-center gap-2.5 font-medium tracking-[0.01em] transition-[background-color,border-color,color] duration-[180ms] ease-ui';

const variants: Record<Variant, string> = {
  primary:
    'rounded-md border border-transparent bg-ice px-[22px] py-[13px] text-[14.5px] text-[#04121a] hover:bg-ice-bright',
  ghost:
    'rounded-md border border-line-hi px-[22px] py-[13px] text-[14.5px] text-fg hover:border-ice hover:bg-ice/5 hover:text-ice',
  quiet:
    'meta border-b border-transparent px-0.5 py-1.5 hover:border-line-hi hover:text-fg',
};

interface Props {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
}

export default function Button({
  href,
  variant = 'primary',
  external,
  className,
  children,
  ...rest
}: Props) {
  const classes = cn(base, variants[variant], className);

  // Internal navigation goes through Link for prefetching; anything else
  // (anchors on the same page, PDFs, external links) uses a plain anchor.
  const isInternal = href.startsWith('/') && !href.includes('#') && !href.endsWith('.pdf');

  if (isInternal && !external) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
