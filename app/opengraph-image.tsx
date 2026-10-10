import { ImageResponse } from "next/og";

export const alt = "Réputation — plus d’avis Google, sans relancer un par un";
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
          justifyContent: "center",
          padding: 80,
          background: "#14213D",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex" }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} width="72" height="72" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"
                fill="#D6336C"
              />
            </svg>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, marginTop: 36, lineHeight: 1.05 }}>
          Vos clients sont contents. Votre fiche Google ne le sait pas.
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 36, color: "#C9CEDA" }}>
          Réputation
        </div>
      </div>
    ),
    { ...size }
  );
}
