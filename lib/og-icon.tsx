export function IconMark({ size }: { size: number }) {
  const inner = size * 0.62;
  const gap = size * 0.08;
  const dot = (inner - gap) / 2;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", width: inner, height: inner, gap }}>
        <div
          style={{
            width: dot,
            height: dot,
            borderRadius: dot * 0.35,
            background: "white",
          }}
        />
        <div
          style={{
            width: dot,
            height: dot,
            borderRadius: dot * 0.35,
            background: "white",
            opacity: 0.55,
          }}
        />
        <div
          style={{
            width: dot,
            height: dot,
            borderRadius: dot * 0.35,
            background: "white",
            opacity: 0.55,
          }}
        />
        <div
          style={{
            width: dot,
            height: dot,
            borderRadius: dot * 0.35,
            background: "white",
          }}
        />
      </div>
    </div>
  );
}
