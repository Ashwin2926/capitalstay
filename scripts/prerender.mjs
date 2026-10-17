// Runs after `vite build` and `vite build --ssr`: writes one static HTML file per route,
// plus sitemap.xml, the per-page redirect rules in .htaccess and the page list in llms.txt.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, routes, notFoundRoute, areaPages, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-html-->")) throw new Error("index.html is missing the <!--app-html--> placeholder");

const fileFor = (route) => (route === "/" ? "index.html" : `${route.slice(1)}.html`);

async function writePage(route, file) {
  const { html, head } = await render(route);
  const page = template
    .replace(/<title>[\s\S]*?<\/title>/, head)
    .replace("<!--app-html-->", html);
  const out = path.join(dist, file);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, page);
  console.log(`  ${route} -> ${file}`);
}

console.log("Prerendering pages:");
for (const route of routes) await writePage(route, fileFor(route));
await writePage(notFoundRoute, "404.html");

// sitemap.xml: generated from the same route list, so it can't drift from the real pages
const urls = routes
  .map((route) => `  <url>\n    <loc>${SITE_URL}${route}</loc>\n  </url>`)
  .join("\n");
await fs.writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

// .htaccess: 301 any other casing or a trailing slash to the lowercase URL.
// The condition is case-sensitive, so the exact URL itself never redirects.
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const redirects = routes
  .filter((route) => route !== "/")
  .map((route) => {
    const pattern = escape(route.slice(1));
    return `  RewriteCond %{REQUEST_URI} !^${escape(route)}$\n  RewriteRule ^${pattern}/?$ ${route} [NC,R=301,L]`;
  })
  .join("\n");
const htaccessPath = path.join(dist, ".htaccess");
const htaccess = await fs.readFile(htaccessPath, "utf8");
if (!htaccess.includes("# @prerender-redirects")) throw new Error(".htaccess is missing the # @prerender-redirects marker");
await fs.writeFile(htaccessPath, htaccess.replace("  # @prerender-redirects", redirects));

// llms.txt: append every neighbourhood guide with its summary
const llmsPath = path.join(dist, "llms.txt");
const areaList = areaPages
  .map((page) => `- [${page.title.replace(/\s*\|.*$/, "")}](${SITE_URL}${page.path}): ${page.description}`)
  .join("\n");
await fs.appendFile(llmsPath, `\n## Neighbourhood guides\n${areaList}\n`);

await fs.rm(ssrDir, { recursive: true, force: true });
console.log(`Done: ${routes.length + 1} pages, sitemap.xml, .htaccess redirects, llms.txt`);
