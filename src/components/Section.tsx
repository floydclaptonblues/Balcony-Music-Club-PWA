import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  );
}
