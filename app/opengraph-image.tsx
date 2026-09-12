import { ImageResponse } from 'next/og';
import { profile } from '@/content/profile';

export const alt = `${profile.name} | AI/ML, Software & Research`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Generated at build time, so there is no image file to keep in sync with the
 * copy. Kept deliberately plain: a social card is read at thumbnail size, so
 * the name and one line are all that survive.
 */
export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0E15',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#7FD8F7' }} />
          <div style={{ fontSize: 24, color: '#788697', letterSpacing: 2 }}>
            {profile.location}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: '#EEF3F8',
              letterSpacing: -3,
              lineHeight: 1.02,
            }}
          >
            Atahar Hossain
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: '#EEF3F8',
              letterSpacing: -3,
              lineHeight: 1.02,
            }}
          >
            Piash
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: '#7FD8F7', letterSpacing: 4 }}>
            AI / ML × Software × Research
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 24, color: '#788697' }}>
          CSE undergraduate, North South University · NSU Trimodal AI Lab
        </div>
      </div>
    ),
    size,
  );
}
