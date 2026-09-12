import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[70svh] flex-col justify-center pb-24 pt-33">
      <p className="meta">404</p>
      <h1 className="mt-3 max-w-[18ch] text-[clamp(28px,4.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em] text-fg">
        That page does not exist.
      </h1>
      <p className="mt-4 max-w-[48ch] text-[16px] text-fg-mid">
        It may have moved, or it may be a section that has not been written yet.
      </p>
      <div className="mt-7 flex gap-6">
        <Link href="/" className="text-[14px] font-medium text-fg hover:text-ice">
          Home
        </Link>
        <Link href="/projects" className="meta hover:text-fg">
          All projects
        </Link>
      </div>
    </div>
  );
}
