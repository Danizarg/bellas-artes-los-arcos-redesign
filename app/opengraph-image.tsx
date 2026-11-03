import { ImageResponse } from "next/og";
import { business } from "@/lib/site";

export const alt = `${business.name} — Donde comienza la creatividad`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PIGMENTS = ["#1b3fd8", "#ff5a3c", "#6d2fd4", "#ffc219"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8f3e9",
          padding: 72,
          position: "relative",
        }}
      >
        {/* The arch, echoing the shop's name. */}
        <div
          style={{
            position: "absolute",
            right: -60,
            bottom: -120,
            width: 520,
            height: 620,
            borderTopLeftRadius: 260,
            borderTopRightRadius: 260,
            background: "linear-gradient(150deg, #1b3fd8 0%, #6d2fd4 42%, #ff5a3c 78%, #ffc219 100%)",
            opacity: 0.9,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex" }}>
            {PIGMENTS.map((hex) => (
              <div
                key={hex}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 999,
                  background: hex,
                  marginLeft: -6,
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6d6153",
            }}
          >
            Especialistas desde 1990 · Marbella
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <div
            style={{
              fontSize: 104,
              lineHeight: 0.94,
              letterSpacing: -4,
              color: "#15110d",
              fontWeight: 600,
            }}
          >
            Donde comienza
          </div>
          <div
            style={{
              fontSize: 104,
              lineHeight: 0.94,
              letterSpacing: -4,
              color: "#1b3fd8",
              fontWeight: 600,
            }}
          >
            la creatividad.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#3d352c",
          }}
        >
          <div>Bellas Artes Los Arcos</div>
          <div style={{ color: "#6d6153" }}>Calle Galveston 9 · 952 86 05 54</div>
        </div>
      </div>
    ),
    size,
  );
}
