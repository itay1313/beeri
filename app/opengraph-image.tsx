import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const alt = `${site.name} – ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Satori has no bidi support: reverse pure-Hebrew strings so they render right-to-left. */
const rtl = (t: string) => Array.from(t).reverse().join("");

export default async function OpenGraphImage() {
  const font = await readFile(path.join(process.cwd(), "assets/fonts/ploni-demibold-aaa.woff"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c1117",
          color: "#f2ede3",
          padding: 72,
          fontFamily: "Ploni",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 26, color: "#e39a2e", letterSpacing: 2 }}>{"BE'ERI ENERGY SOLUTIONS"}</div>
          <div style={{ display: "flex", alignItems: "flex-end", width: 160, height: 80, position: "relative" }}>
            <div style={{ width: 160, height: 80, borderRadius: "160px 160px 0 0", background: "#e39a2e" }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", fontSize: 96, lineHeight: 1, letterSpacing: -1 }}>
          <span>{rtl("פתרונות אנרגיה")}</span>
          <span>{rtl("לנחלות, לאגרו ולתעשייה")}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between", fontSize: 26, color: "rgba(242,237,227,0.7)", borderTop: "1px solid rgba(242,237,227,0.2)", paddingTop: 24 }}>
          <span>{rtl("תכנון · ליווי רגולטורי · הקמה מלאה")}</span>
          <span>beeri-energy.com</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Ploni", data: font, weight: 600, style: "normal" }] },
  );
}
