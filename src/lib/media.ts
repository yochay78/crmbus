export type ContentSection = "blog" | "review" | "industry";

export type MediaEntry = {
  section: ContentSection;
  slug: string;
  /**
   * Path to the hero/thumbnail image under /public.
   * Example (blog article):
   *   "/blog/crm-trial-playbook-14-days/hero.png"
   * Example (shared media folder):
   *   "/media/blog-crm-trial-playbook-14-days-hero.png"
   */
  image?: string;
  /**
   * Full YouTube URL, e.g. "https://youtu.be/hnq_rlACmhc"
   */
  youtubeUrl?: string;
  /**
   * Full podcast episode URL.
   * For RedCircle, this should be the show/episode URL like:
   * "https://redcircle.com/shows/.../episodes/..."
   */
  podcastUrl?: string;
};

/**
 * Central place to manage per-content media (image, YouTube, podcast)
 * for blog posts, reviews, and industry pages.
 *
 * Edit this file to add or change media for any piece of content.
 * - section: "blog" | "review" | "industry"
 * - slug: blog slug, CRM slug (for reviews), or industry slug
 */
export const MEDIA: MediaEntry[] = [
  {
    section: "blog",
    slug: "highlevel-vs-hubspot",
    image: "/media/blog-highlevel-vs-hubspot-hero.png",
    youtubeUrl: "https://youtu.be/d_FkJBclZNg",
    podcastUrl:
      "https://redcircle.com/shows/3c30275c-667f-4329-94b0-74b210c86bd4/episodes/cbd3c02e-1159-4204-94c7-4723eb3bf14e",
  },
  {
    section: "blog",
    slug: "keap-vs-activecampaign",
  },
  {
    section: "blog",
    slug: "does-hubspot-have-ai-lead-scoring",
    image: "/media/blog-does-hubspot-have-ai-lead-scoring-hero.png",
    youtubeUrl: "https://youtu.be/IVTEPl0K_Wc",
    podcastUrl:
      "https://redcircle.com/shows/3c30275c-667f-4329-94b0-74b210c86bd4/episodes/b29aa64d-5e19-4b84-9187-bbb008108980",
  },
  {
    section: "blog",
    slug: "best-ai-crm-for-real-estate",
  },
  {
    section: "blog",
    slug: "ai-crm-pricing-compared-2026",
  },
  {
    section: "blog",
    slug: "salesforce-vs-hubspot",
  },
  {
    section: "blog",
    slug: "capsule-vs-pipedrive",
  },
  {
    section: "blog",
    slug: "does-highlevel-have-email-marketing",
  },
  {
    section: "blog",
    slug: "does-keap-support-ecommerce-automation",
  },
  {
    section: "blog",
    slug: "best-ai-crm-digital-marketing-agencies",
  },
  {
    section: "blog",
    slug: "best-free-ai-crm-startups",
  },
  {
    section: "blog",
    slug: "does-capsule-integrate-gmail-outlook",
  },
  {
    section: "blog",
    slug: "zoho-vs-freshsales",
  },
  {
    section: "blog",
    slug: "crm-trial-playbook-14-days",
    image: "/media/blog-crm-trial-playbook-14-days-hero.png",
    youtubeUrl: "https://youtu.be/hnq_rlACmhc",
    podcastUrl:
      "https://redcircle.com/shows/3c30275c-667f-4329-94b0-74b210c86bd4/episodes/d54179bf-1152-4509-aef4-a5ceffccf536",
  },
  {
    section: "blog",
    slug: "is-ai-crm-worth-it-team-of-one",
  },
  {
    section: "review",
    slug: "highlevel",
    image: "/media/review-highlevel-hero.png",
    youtubeUrl: "https://youtu.be/dwIPNkMqXzg",
    podcastUrl:
      "https://redcircle.com/shows/3c30275c-667f-4329-94b0-74b210c86bd4/episodes/d5af87a8-08de-43b3-981a-1297a4c3be13",
  },
  {
    section: "review",
    slug: "crmone",
    image: "/media/review-crmone-hero.png",
    youtubeUrl: "https://youtu.be/YhjClf5ZG4o",
    podcastUrl:
      "https://redcircle.com/shows/3c30275c-667f-4329-94b0-74b210c86bd4/episodes/54a8c9d3-0020-44c6-833d-d7dfb7d8b953",
  },
  {
    section: "review",
    slug: "centripe",
    image: "/media/review-centripe-hero.png",
    youtubeUrl: "https://youtu.be/boLNd4TonFc",
    podcastUrl:
      "https://redcircle.com/shows/3c30275c-667f-4329-94b0-74b210c86bd4/episodes/bc164cb5-d8e8-449c-afa6-7004f58014b8",
  },
  {
    section: "industry",
    slug: "real-estate",
    image: "/media/industry-real-estate-hero.png",
    youtubeUrl: "https://youtu.be/HIDYX1HS0Qo",
    podcastUrl:
      "https://redcircle.com/shows/3c30275c-667f-4329-94b0-74b210c86bd4/episodes/ac115cc0-7c82-47a1-ae3d-07bd774e0cd2",
  },
];

export function getMedia(
  section: ContentSection,
  slug: string,
): MediaEntry | undefined {
  return MEDIA.find((m) => m.section === section && m.slug === slug);
}

export function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);

    // youtu.be/<id>
    if (u.hostname === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    // youtube.com/watch?v=<id>
    if (u.hostname.endsWith("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;

      // youtube.com/embed/<id>
      const parts = u.pathname.split("/").filter(Boolean);
      const embedIndex = parts.indexOf("embed");
      if (embedIndex !== -1 && embedIndex + 1 < parts.length) {
        return parts[embedIndex + 1];
      }
    }
  } catch {
    // If it's not a full URL, assume it's already an ID
    if (url && !url.includes("http")) return url;
  }

  return null;
}

export function parseRedcircleIds(
  url: string,
): { showId: string; episodeId: string } | null {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    const showsIndex = parts.indexOf("shows");
    const episodesIndex = parts.indexOf("episodes");

    if (
      showsIndex !== -1 &&
      episodesIndex !== -1 &&
      showsIndex + 1 < parts.length &&
      episodesIndex + 1 < parts.length
    ) {
      return {
        showId: parts[showsIndex + 1],
        episodeId: parts[episodesIndex + 1],
      };
    }
  } catch {
    // fall through
  }

  return null;
}

