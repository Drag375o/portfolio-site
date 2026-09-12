import { profile } from '@/content/profile';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-6 py-9 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[15px] font-medium text-fg">{profile.name}</p>
          <p className="meta mt-1.5">{profile.roleLine}</p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <nav aria-label="Elsewhere" className="flex flex-wrap gap-5">
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="meta hover:text-fg">
              GitHub
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="meta hover:text-fg">
              LinkedIn
            </a>
            <a href={profile.links.resume} className="meta hover:text-fg">
              Résumé
            </a>
            <a href={`mailto:${profile.email}`} className="meta hover:text-fg">
              Email
            </a>
          </nav>
          <p className="meta">© {year} {profile.name}</p>
        </div>
      </div>
    </footer>
  );
}
