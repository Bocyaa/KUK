import { useState, useRef, useEffect } from 'react';

interface AutoScrollingTextProps {
  text: string;
  className?: string;
  speed?: number; // animation duration in seconds
  capitalize?: boolean; // capitalize first letter option
}

const AutoScrollingText = ({
  text,
  className = '',
  speed = 15,
  capitalize = false,
}: AutoScrollingTextProps) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [scrollDistance, setScrollDistance] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if text is overflowing and calculate scroll distance
  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current && containerRef.current) {
        const textWidth = textRef.current.scrollWidth;
        const containerWidth = containerRef.current.clientWidth;
        const isTextOverflowing = textWidth > containerWidth;

        setIsOverflowing(isTextOverflowing);

        // Calculate exact scroll distance needed (don't scroll more than necessary)
        if (isTextOverflowing) {
          setScrollDistance(textWidth - containerWidth);
        }
      }
    };

    checkOverflow();

    // Also check on window resize
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  const displayText =
    capitalize && text ? text.charAt(0).toUpperCase() + text.slice(1) : text;

  // Create a unique animation name for this instance based on scroll distance
  const animationName = `scrollText-${scrollDistance}`;

  // Create the keyframe animation dynamically with proper scroll distance
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
        paddingRight: '15px',
      }
    : {};

  return (
    <>
      {isOverflowing && <style>{keyframes}</style>}
      <div
        ref={containerRef}
        className="no-scrollbar relative w-full overflow-hidden"
      >
        <span
          ref={textRef}
          className={`inline-block min-w-max whitespace-nowrap ${isPaused ? 'paused' : ''} ${className}`}
          style={scrollingStyle}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {displayText}
        </span>
      </div>
    </>
  );
};

export default AutoScrollingText;
