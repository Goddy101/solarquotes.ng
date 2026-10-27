import { SERVICES } from '../data/services';
import { NIGERIA_LOCATIONS } from '../data/locations';
import type { APIRoute } from 'astro';

// CRITICAL: Tells Astro to build this once at build-time.
export const prerender = true;

// Ensure NO trailing slash here to prevent double-slashes in the loop
const SITE_URL = 'https://solarquotes.com.ng'; 

export const GET: APIRoute = async () => {
  const urls: string[] = [];
  
  // Best Practice: Hardcode the last major content update date for the locations data.
  // Only change this date when you actually update text/pricing in locations.ts.
  const contentLastModified = '2026-10-24'; 

  // 1. Add the Homepage
  urls.push(`
    <url>
      <loc>${SITE_URL}/</loc>
      <lastmod>${contentLastModified}</lastmod>
    </url>
  `);

  // 2. Dynamically Generate all Programmatic SEO Routes
  for (const service of SERVICES) {
    for (const state of NIGERIA_LOCATIONS) {
      for (const district of state.districts) {
        
        // We enforce a trailing slash at the end of the path. 
        // (Ensure your astro.config.mjs is set to trailingSlash: 'always' for consistency).
        const path = `${service.slug}/${state.slug}/${district.slug}/`;
        
        urls.push(`
    <url>
      <loc>${SITE_URL}/${path}</loc>
      <lastmod>${contentLastModified}</lastmod>
    </url>
        `);
      }
    }
  }

  // 3. Construct the XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

  // 4. Return as a valid XML response
  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};