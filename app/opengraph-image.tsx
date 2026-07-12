import { ImageResponse } from "next/og";
import { IconMark } from "@/lib/og-icon";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export const alt =
  "サブネットマスク電卓 - IPアドレスとサブネットマスクからネットワーク情報を即座に計算";

const TITLE = "サブネットマスク電卓";
const SUBTITLE = "IPアドレスとサブネットマスクからネットワーク情報を即座に計算";
const SAMPLE = "192.168.1.0/24";

async function loadGoogleFont(text: string, weight: 400 | 700): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (
    await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" } })
  ).text();
  const match = css.match(/src: url\(([^)]+)\)/);

  if (match) {
    const fontResponse = await fetch(match[1]);
    if (fontResponse.ok) {
      return fontResponse.arrayBuffer();
    }
  }

  throw new Error(`Failed to load Noto Sans JP font (weight ${weight})`);
}

export default async function OgImage() {
  const [boldFont, regularFont] = await Promise.all([
    loadGoogleFont(TITLE, 700),
    loadGoogleFont(SUBTITLE + SAMPLE, 400),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 40 }}>
          <IconMark size={88} />
          <span
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#18181b",
              fontFamily: "Noto Sans JP",
            }}
          >
            {TITLE}
          </span>
        </div>
        <span
          style={{
            fontSize: 30,
            fontWeight: 400,
            color: "#3f3f46",
            fontFamily: "Noto Sans JP",
            maxWidth: 900,
          }}
        >
          {SUBTITLE}
        </span>
        <div style={{ display: "flex", marginTop: 48 }}>
          <div
            style={{
              display: "flex",
              padding: "12px 24px",
              borderRadius: 12,
              background: "#4338ca",
              color: "white",
              fontSize: 28,
              fontWeight: 400,
              fontFamily: "Noto Sans JP",
            }}
          >
            {SAMPLE}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans JP", data: boldFont, weight: 700, style: "normal" },
        { name: "Noto Sans JP", data: regularFont, weight: 400, style: "normal" },
      ],
    }
  );
}
