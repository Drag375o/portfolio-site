import Image from 'next/image';
import { profile } from '@/content/profile';

/**
 * The portrait is treated as a specimen plate, hairline frame, corner marks,
 * metadata caption, rather than a rounded avatar card. The duotone is applied
 * here in CSS, so drop an unedited photo at public/portrait.jpg.
 *
 * Until that file exists, this renders a labelled placeholder instead of a
 * broken image.
 */
const HAS_PORTRAIT = true; // set false to show the placeholder plate again

export default function PortraitPlate() {
  return (
    <figure className="relative m-0 border border-line bg-ink-raised p-2.5">
      <span aria-hidden className="absolute -left-px -top-px h-2.5 w-2.5 border-l border-t border-ice/50" />
      <span aria-hidden className="absolute -bottom-px -right-px h-2.5 w-2.5 border-b border-r border-ice/50" />

      <div className="relative aspect-4/5 overflow-hidden border border-line">
        {HAS_PORTRAIT ? (
          <>
            <Image
              src="/portrait.jpg"
              alt={`${profile.name}, ${profile.location}`}
              fill
              priority
              sizes="(min-width: 960px) 420px, 100vw"
              className="object-cover contrast-[1.03] grayscale-[0.12] saturate-[0.95]"
            />
            {/* a cool cast, not a duotone: soft-light tints without replacing hue */}
            <div aria-hidden className="absolute inset-0 bg-[#0b2b3a] mix-blend-soft-light opacity-25" />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(174,205,226,0.14) 0 1px, transparent 1px 4px)',
              }}
            />
          </>
        ) : (
          <div
            className="flex h-full items-center justify-center bg-linear-160 from-ink-surface to-ink-void"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(174,205,226,0.045) 0 1px, transparent 1px 4px)',
            }}
          >
            <p className="meta px-5 text-center leading-loose">
              portrait plate
              <br />
              add public/portrait.jpg
              <br />
              4 : 5 · unedited
            </p>
          </div>
        )}
      </div>

      <figcaption className="mt-2.5 flex justify-between gap-3 border-t border-line px-0.5 pt-2.5">
        <div>
          <strong className="block text-[13px] font-medium text-fg">{profile.name}</strong>
          <span className="meta">{profile.location}</span>
        </div>
        <div className="text-right">
          <strong className="block text-[13px] font-medium text-fg">NSU · CSE</strong>
          <span className="meta">2022 to present</span>
        </div>
      </figcaption>
    </figure>
  );
}
