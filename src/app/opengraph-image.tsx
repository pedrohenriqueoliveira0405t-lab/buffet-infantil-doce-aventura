import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand, contact, hero, numbers, rating, seo } from "@/content/site";
import { palette } from "@/content/theme";
import { stripHighlight } from "@/lib/format";

/** Imagem de compartilhamento (Open Graph) gerada no build a partir de `site.ts` e da logo oficial. */
export const alt = seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A logo não depende da requisição: lida uma vez, no build.
const logoData = await readFile(join(process.cwd(), "public", brand.logo.src), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

const LOGO_HEIGHT = 200;

export default function OpengraphImage() {
  const { width, height, crop } = brand.logo;
  // Mostra só a área útil da logo (o arquivo tem margens transparentes).
  const scale = LOGO_HEIGHT / crop.height;

  const chips = [
    `${contact.address.city} – ${contact.address.state}`,
    `+${numbers.parties.toLocaleString("pt-BR")} festas`,
    `${rating.display} no Google`,
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: palette.warmWhite,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: palette.babyBlue,
            opacity: 0.45,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -140,
            width: 460,
            height: 460,
            borderRadius: 9999,
            background: palette.mint,
            opacity: 0.4,
          }}
        />

        <div
          style={{
            display: "flex",
            position: "relative",
            overflow: "hidden",
            width: crop.width * scale,
            height: LOGO_HEIGHT,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- JSX do ImageResponse (Satori), não do navegador. */}
          <img
            src={logoSrc}
            alt={brand.name}
            width={width * scale}
            height={height * scale}
            style={{ position: "absolute", left: -crop.x * scale, top: -crop.y * scale }}
          />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.08,
            color: palette.deepBlue,
            maxWidth: 1000,
          }}
        >
          {stripHighlight(hero.title)}
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {chips.map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 600,
                color: palette.graphite,
                background: palette.softYellow,
                borderRadius: 9999,
                padding: "12px 28px",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
