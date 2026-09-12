export const navItems = [
  { label: 'Work', href: '/#work' },
  { label: 'Research', href: '/#research' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
] as const;

/** Section ids the desktop nav watches to show an active indicator. */
export const sectionIds = ['work', 'research', 'about', 'contact'] as const;
