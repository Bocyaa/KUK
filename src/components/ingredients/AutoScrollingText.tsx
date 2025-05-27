import { useState, useRef, useEffect, ReactNode } from 'react';

interface AutoScrollingProps {
  children: ReactNode; // <-- Accept any valid React child
  className?: string; // Additional classes
  speed?: number; // Animation duration in seconds
}

const AutoScrollingText = ({
  children,
  className = '',
  speed = 15,
}: AutoScrollingProps) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure if content is overflowing
  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current && containerRef.current) {
        const contentWidth = contentRef.current.scrollWidth;
        const containerWidth = containerRef.current.clientWidth;
        const overflowing = contentWidth > containerWidth;

        setIsOverflowing(overflowing);
        if (overflowing) {
          setScrollDistance(contentWidth - containerWidth);
        }
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [children]);

  // Unique animation name
  const animationName = `scrollContent-${scrollDistance}`;

  // Keyframes based on scrollDistance
  const keyframes = isOverflowing
    ? `
    @keyframes ${animationName} {
      0%, 20% { transform: translateX(0); }
      40%, 60% { transform: translateX(-${scrollDistance}px); }
      80%, 100% { transform: translateX(0); }
    }
  `
    : '';

  const scrollingStyle = isOverflowing
    ? {
        animationDuration: `${speed}s`,
        animationName: animationName,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        paddingRight: '5px',
      }
    : {};

  return (
    <>
      {isOverflowing && <style>{keyframes}</style>}
      <div
        ref={containerRef}
        className="no-scrollbar relative w-full overflow-hidden"
      >
        <div
          ref={contentRef}
          className={`inline-block min-w-max ${isPaused ? 'paused' : ''} ${className}`}
          style={scrollingStyle}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default AutoScrollingText;
