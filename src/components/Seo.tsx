import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl, canonicalPath } from "./lib/seo";

type JsonLd = Record<string, unknown>;

interface SeoProps {
  title: string;
  description: string;
  /** Path for the canonical URL. Defaults to the current route. */
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: JsonLd | JsonLd[];
}

export default function Seo({ title, description, path, image, type = "website", noindex, jsonLd }: SeoProps) {
  const { pathname } = useLocation();
  const url = absoluteUrl(canonicalPath(path ?? pathname));
  const ogImage = absoluteUrl(image ?? DEFAULT_OG_IMAGE);
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : <link rel="canonical" href={url} />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_AE" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify({ "@context": "https://schema.org", ...schema })}
        </script>
      ))}
    </Helmet>
  );
}
