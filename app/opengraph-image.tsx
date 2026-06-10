import { ImageResponse } from "next/og";

export const alt = "Tennex Express — Real tennis gear, real prices";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Yellow accent circle */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#E8D44A",
            marginBottom: 36,
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-3px",
            lineHeight: 1,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Tennex Express
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            textAlign: "center",
            letterSpacing: "-0.5px",
          }}
        >
          Real tennis gear, real prices.
        </div>

        {/* Domain */}
        <div
          style={{
            fontSize: 16,
            color: "#475569",
            marginTop: 40,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          tennexexpress.com
        </div>
      </div>
    ),
    size
  );
}
