import { ImageResponse } from "next/og";
import { IconMark } from "@/lib/og-icon";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Icon() {
  return new ImageResponse(<IconMark size={32} />, { ...size });
}
