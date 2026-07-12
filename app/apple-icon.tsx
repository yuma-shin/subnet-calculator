import { ImageResponse } from "next/og";
import { IconMark } from "@/lib/og-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function AppleIcon() {
  return new ImageResponse(<IconMark size={180} />, { ...size });
}
