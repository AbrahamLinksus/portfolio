import { ogImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "B.TECH CSE · SRM IST · 2027", title: "Jake", accent: "Roberts.", footer: site.role });
}
