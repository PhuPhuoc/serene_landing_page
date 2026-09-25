// server/types/strapi.ts
export type StrapiMedia = {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: Record<
    string,
    {
      url: string;
      width?: number;
      height?: number;
    }
  >;
};

export type StrapiLink = {
  id: number;
  label: string;
  externalUrl?: string | null;
  openInNewTab?: boolean | null;
  page?: {
    slug: string;
  } | null;
};

export type StrapiTag = {
  id: number;
  label: string;
};

export type StrapiHeader = {
  logo: StrapiMedia;
  mainLinks?: StrapiLink[];
  utilityLink?: StrapiLink | null;
  cta?: StrapiLink | null;
};

export type StrapiHeroBlock = {
  __component: "blocks.hero";
  id: number;
  eyebrow?: string | null;
  title: string;
  subtitle?: string | null;
  backgroundImage: StrapiMedia;
  imageCaption?: string | null;
  primaryCta?: StrapiLink | null;
  secondaryCta?: StrapiLink | null;
};

export type StrapiIntroBlock = {
  __component: "blocks.intro";
  id: number;
  eyebrow?: string | null;
  heading: string;
  body?: string | null;
  tags?: StrapiTag[];
  cta?: StrapiLink | null;
};

export type StrapiPageBlock = StrapiHeroBlock | StrapiIntroBlock;

export type StrapiPage = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  locale: string;
  hidden?: boolean;
  blocks?: StrapiPageBlock[];
};
