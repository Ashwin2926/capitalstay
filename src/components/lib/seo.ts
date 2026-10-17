// public/.htaccess 301s www to this host, so every
// canonical, og:url and schema URL must use this exact origin.
export const SITE_URL = "https://capitalstayuae.com";
export const SITE_NAME = "Capital Stay";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-image.jpg`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

// Lowercase, no trailing slash: one URL per page, whatever casing was typed.
export const canonicalPath = (pathname: string) => {
  const clean = pathname.toLowerCase().replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
};

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
