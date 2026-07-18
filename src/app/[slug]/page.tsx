// app/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDesigner } from "@/lib/designers";
import DesignerV1 from "@/templates/designers-v1";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const designer = getDesigner(slug);

  if (!designer) {
    return {};
  }

  return {
    title: designer.seo.title,
    description: designer.seo.description,
    keywords: designer.seo.keywords,
    alternates: {
      canonical: designer.seo.canonical,
    },
    openGraph: {
      title: designer.seo.title,
      description: designer.seo.description,
      images: [designer.seo.image],
    },
    twitter: {
      card: "summary_large_image",
      title: designer.seo.title,
      description: designer.seo.description,
      images: [designer.seo.image],
    },
  };
}

export default async function DesignerPage({ params }: Props) {
  const { slug } = await params;

  const designer = getDesigner(slug);

  if (!designer) {
    notFound();
  }

  return <DesignerV1 designer={designer} />;
}