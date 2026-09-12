'use client';

import { motion } from 'framer-motion';
import { reveal } from '@/lib/motion';

/**
 * The only scroll animation on the site. Deliberately a 6px lift that fires
 * once, enough to mark that a new section has arrived, not enough to make
 * the page feel like it is assembling itself around the reader.
 *
 * framer-motion's whileInView respects prefers-reduced-motion through the
 * MotionConfig default, and `once` means nothing re-animates on scroll back.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      {...reveal}
      transition={{ ...reveal.transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
