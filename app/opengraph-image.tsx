import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";

export default async function OpengraphImage() {
  const { width, height } = size;
  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(180deg, #fafafa 0%, #f4f4f5 100%)",
          color: "#0a0a0a",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 999,
              background: "#111827",
            }}
          />
          <span style={{ fontSize: 28, letterSpacing: -0.5 }}>iPocket Brasil</span>
        </div>
        <h1
          style={{
            fontSize: 72,
            lineHeight: 1.05,
            letterSpacing: -1.2,
            margin: 0,
            fontWeight: 300,
          }}
        >
          Seu iPhone, seu bolso de design.
        </h1>
        <p
          style={{
            fontSize: 28,
            marginTop: 16,
            color: "#3f3f46",
          }}
        >
          Inspirado no iPhone Pocket. Feito no Brasil. Pague via PIX.
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
