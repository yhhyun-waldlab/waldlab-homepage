import WaldblattLogo from "@/components/ui/WaldblattLogo";

export default function LogoTestPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", flexDirection: "column", alignItems: "center", gap: 64, padding: 64 }}>

      <h1 style={{ fontFamily: "sans-serif", fontSize: 14, color: "#6b7280", letterSpacing: 4, textTransform: "uppercase" }}>
        WALD LAB Logo Animation Test
      </h1>

      {/* ① 심볼 단독 · 초대형 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <WaldblattLogo height={240} markOnly={true} animated={true} />
        </div>
        <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "#9ca3af" }}>
          ① 심볼 height=240 · 잎이 흔들려야 함 · 마우스 올리면 노드 빛남
        </p>
      </div>

      {/* ② 전체 로고 · 큰 사이즈 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: "32px 48px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <WaldblattLogo height={80} animated={true} />
        </div>
        <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "#9ca3af" }}>
          ② 전체 로고 height=80
        </p>
      </div>

      {/* ③ 다크 배경 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ background: "#1a4731", borderRadius: 24, padding: "32px 48px" }}>
          <WaldblattLogo height={80} variant="light" animated={true} />
        </div>
        <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "#9ca3af" }}>
          ③ light variant (다크 배경)
        </p>
      </div>

      {/* ④ 정적 비교 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", opacity: 0.5 }}>
          <WaldblattLogo height={240} markOnly={true} animated={false} />
        </div>
        <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "#9ca3af" }}>
          ④ animated=false 비교 (움직이지 않아야 정상)
        </p>
      </div>

    </div>
  );
}
