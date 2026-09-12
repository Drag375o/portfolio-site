export default function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-sm border border-line px-2 py-1 font-mono text-[11px] text-fg-low">
      {children}
    </li>
  );
}
