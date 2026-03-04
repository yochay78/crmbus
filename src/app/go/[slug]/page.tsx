import type { Metadata } from "next";
import { AFFILIATE_LINKS } from "@/constants";
import { GoRedirect } from "./GoRedirect";

const SLUGS = Object.keys(AFFILIATE_LINKS) as (keyof typeof AFFILIATE_LINKS)[];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function GoPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const url =
    AFFILIATE_LINKS[slug as keyof typeof AFFILIATE_LINKS] ?? "/";

  return <GoRedirect url={url} />;
}
