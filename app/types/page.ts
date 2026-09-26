// app/types/page.ts
export type NavLink = {
  id: number;
  label: string;
  external: boolean;
  to: string;
  newTab: boolean;
};

export type Navigation = {
  logo: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  mainLinks: NavLink[];
  utilityLink: NavLink | null;
  cta: NavLink | null;
};

export type PageTag = {
  id: number;
  label: string;
};

export type HeroBlock = {
  __component: "blocks.hero";
  id: number;
  eyebrow?: string | null;
  title: string;
  subtitle?: string | null;
  backgroundImage: {
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
    formats?: Record<
      string,
      {
        url: string;
      }
    >;
  };
  imageCaption?: string | null;
  primaryCta?: NavLink | null;
  secondaryCta?: NavLink | null;
};

export type IntroBlock = {
  __component: "blocks.intro";
  id: number;
  eyebrow?: string | null;
  heading: string;
  body?: string | null;
  tags?: PageTag[];
  cta?: NavLink | null;
};

export type DayItem = {
  id: number;
  period: string;
  title: string;
  image: {
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
    formats?: Record<string, { url: string }>;
  } | null;
  imageCaption?: string | null;
  description: string;
  cta?: NavLink | null;
};

export type DayInLifeBlock = {
  __component: "blocks.day-in-life";
  id: number;
  eyebrow?: string | null;
  heading: string;
  items: DayItem[];
};

export type PageBlock = HeroBlock | IntroBlock | DayInLifeBlock;

export type PageResponse = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  locale: string;
  hidden?: boolean;
  blocks?: PageBlock[];
  alternateSlugs: Record<string, string | null>;
};
