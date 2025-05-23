function GradientShadow({
  top = '0 0 0 0',
  bottom = '0 0 0 0',
  topOpacity = 20,
  bottomOpacity = 60,
}) {
  // Parse the position values (top, right, bottom, left)
  const parsePosition = (position: string) => {
    const [t, r, b, l] = position.split(' ');

    const parseValue = (value: string) => {
      if (value === '0') return '0';

      // Check if value already has a unit (px, rem, em, etc.)
      if (/\d+(px|rem|em|%|vh|vw)$/.test(value)) {
        return value;
      }

      // If no unit, default to px
      return `${value}px`;
    };

    return {
      top: parseValue(t),
      right: parseValue(r),
      bottom: parseValue(b),
      left: parseValue(l),
    };
  };

  const topStyle = parsePosition(top);
  const bottomStyle = parsePosition(bottom);

  return (
    <>
      {/* Top gradient */}
      <div
        className="absolute rounded-lg"
        style={{
          ...topStyle,
          background: `linear-gradient(to bottom, rgba(33, 33, 33, ${topOpacity / 100}), transparent)`,
        }}
      />
      {/* Bottom gradient */}
      <div
        className="absolute rounded-lg"
        style={{
          ...bottomStyle,
          background: `linear-gradient(to top, rgba(33, 33, 33, ${bottomOpacity / 100}), transparent)`,
        }}
      />
    </>
  );
}

export default GradientShadow;
