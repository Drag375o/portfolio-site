import { identity } from '@/content/profile';

/**
 * The credential strip. Each cell states an area of work and, on hover or
 * focus, a plain-language clarifier, so these read as what he actually does
 * rather than as a wall of expertise badges.
 */
export default function IdentityRail() {
  return (
    <section aria-label="Areas of work" className="border-y border-line bg-ink-void">
      <ul className="grid list-none grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {identity.map((item) => (
          <li key={item.area} className="group min-h-30 border-b border-r border-line">
            <div className="h-full p-5 transition-colors duration-[320ms] ease-ui group-hover:bg-ink-raised group-focus-within:bg-ink-raised">
              <span className="block text-[14.5px] font-medium tracking-[-0.005em] text-fg">
                {item.area}
              </span>
              <span
                aria-hidden
                className="my-3.5 block h-px w-3.5 bg-ice-deep transition-all duration-[320ms] ease-out-expo group-hover:w-8.5 group-hover:bg-ice group-focus-within:w-8.5 group-focus-within:bg-ice"
              />
              <span className="meta block leading-relaxed">{item.note}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
