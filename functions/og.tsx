import React from "react";
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";

export const onRequest = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  
  const title = url.searchParams.get('title') || 'Tier 1 Solar Engineering';
  const subtitle = url.searchParams.get('subtitle') || 'Solar Quotes Nigeria';
  const bgImage = url.searchParams.get('bg') || 'commercial-1.webp';

  const r2ImageUrl = `https://cdn.solarquotes.com.ng/${bgImage}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backgroundImage: `url(${r2ImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.1))',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '80px',
            position: 'relative',
          }}
        >
          <div style={{ color: '#10b981', fontSize: 36, fontWeight: 700, marginBottom: '20px', textTransform: 'uppercase' }}>
            {subtitle}
          </div>
          <div style={{ color: 'white', fontSize: 72, fontWeight: 900, lineHeight: 1.1 }}>
            {title}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
};