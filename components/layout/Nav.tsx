'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { navItems, sectionIds } from '@/lib/nav';
import { profile } from '@/content/profile';
import { cn } from '@/lib/cn';
import NavMobile from './NavMobile';

export default function Nav() {
  const [lifted, setLifted] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Backdrop only appears once the page has scrolled, over the hero the nav
  // sits on the raw background so nothing competes with the headline.
  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-[320ms] ease-ui lg:pl-rail',
        lifted
          ? 'border-line bg-ink-void/80 backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="wrap flex h-[68px] items-center justify-between gap-6">
        <Link
          href="/"
          className="font-mono text-[13px] tracking-[0.08em] text-fg transition-colors hover:text-ice"
        >
          atahar<span className="text-fg-low">.piash</span>
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const id = item.href.split('#')[1];
            const isActive = active === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative px-3.5 py-2 text-[14px] transition-colors duration-[180ms]',
                  isActive ? 'text-fg' : 'text-fg-low hover:text-fg',
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    'absolute bottom-1 left-1/2 h-px -translate-x-1/2 bg-ice transition-[width,opacity] duration-[320ms] ease-out-expo',
                    isActive ? 'w-4 opacity-100' : 'w-0 opacity-0',
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.links.resume}
            className="hidden rounded-md border border-line-hi px-3.5 py-2 font-mono text-[11.5px] tracking-[0.06em] text-fg transition-colors duration-[180ms] hover:border-ice hover:text-ice sm:block"
          >
            Résumé
          </a>
          <NavMobile active={active} />
        </div>
      </div>
    </header>
  );
}
