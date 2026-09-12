'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { navItems } from '@/lib/nav';
import { profile } from '@/content/profile';
import { EASE } from '@/lib/motion';

export default function NavMobile({ active }: { active: string | null }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  // Escape closes, focus returns to the trigger, and the page behind is locked.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-line-hi text-fg md:hidden"
      >
        <span aria-hidden className="relative block h-[9px] w-4">
          <span
            className="absolute left-0 block h-px w-full bg-current transition-transform duration-[320ms] ease-out-expo"
            style={{ top: open ? 4 : 0, transform: open ? 'rotate(45deg)' : 'none' }}
          />
          <span
            className="absolute left-0 block h-px w-full bg-current transition-transform duration-[320ms] ease-out-expo"
            style={{ top: open ? 4 : 8, transform: open ? 'rotate(-45deg)' : 'none' }}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE.out }}
            className="fixed inset-x-0 top-[68px] z-40 border-y border-line bg-ink-void/95 backdrop-blur-md md:hidden"
          >
            <nav aria-label="Sections" className="wrap flex flex-col py-2">
              {navItems.map((item) => {
                const id = item.href.split('#')[1];
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === id ? 'true' : undefined}
                    className="flex items-center justify-between border-b border-line py-4 text-[17px] text-fg last:border-b-0"
                  >
                    {item.label}
                    <span aria-hidden className="meta">
                      {active === id ? '●' : ''}
                    </span>
                  </Link>
                );
              })}
              <div className="flex gap-5 py-5">
                <a href={profile.links.resume} className="meta hover:text-fg">
                  Résumé
                </a>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="meta hover:text-fg"
                >
                  GitHub
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="meta hover:text-fg"
                >
                  LinkedIn
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
