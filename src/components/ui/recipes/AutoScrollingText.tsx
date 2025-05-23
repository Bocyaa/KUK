import { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';

type AllowedElements =
  | 'span'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'div';

interface AutoScrollingTextProps {
  children?: ReactNode;
  text?: string;
  as?: AllowedElements;
  className?: string;
  style?: CSSProperties;
  speed?: number; // animation duration in seconds
  capitalize?: boolean; // capitalize first letter option
  pauseOnHover?: boolean;
  gap?: number; // gap between scroll cycles (px)
  [key: string]: any; // Allow any other props to be passed through
}

const AutoScrollingText = ({
  children,
  text,
  as: Element = 'span',
  className = '',
  style = {},
  speed = 15,
  capitalize = false,
  pauseOnHover = true,
  gap = 15,
  ...restProps
}: AutoScrollingTextProps) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const textRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get content to display
  const content = children || text || '';

  // Apply capitalization if needed
  const getDisplayContent = () => {
    if (!capitalize) return content;

    if (typeof content === 'string') {
      return content.charAt(0).toUpperCase() + content.slice(1);
    }

    return content;
  };

  // Check if text is overflowing and calculate scroll distance
  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current && containerRef.current) {
        const textWidth = textRef.current.scrollWidth;
        const containerWidth = containerRef.current.clientWidth;
        const isTextOverflowing = textWidth > containerWidth;

        setIsOverflowing(isTextOverflowing);

        // Calculate exact scroll distance needed
        if (isTextOverflowing) {
          setScrollDistance(textWidth - containerWidth + gap);
        }
      }
    };

    // Use setTimeout to ensure DOM is fully rendered
    const timeoutId = setTimeout(checkOverflow, 0);

    // Also check on window resize
    const handleResize = () => setTimeout(checkOverflow, 0);
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [content, gap]);

  // Create a unique animation name for this instance
  const animationName = `autoScroll-${Math.random().toString(36).substr(2, 9)}`;

  // Create the keyframe animation dynamically
  const keyframes = isOverflowing
    ? `
    @keyframes ${animationName} {
      0%, 20% { transform: translateX(0); }
      40%, 60% { transform: translateX(-${scrollDistance}px); }
      80%, 100% { transform: translateX(0); }
    }
  `
    : '';

  // Combine user styles with scrolling styles
  const combinedStyle: CSSProperties = {
    ...style,
    ...(isOverflowing
      ? {
          animationDuration: `${speed}s`,
          animationName: animationName,
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationPlayState: isPaused ? 'paused' : 'running',
          display: 'inline-block',
          minWidth: 'max-content',
          whiteSpace: 'nowrap',
        }
      : {
          display: style.display || undefined, // Preserve original display if not overflowing
        }),
  };

  // Handle mouse events for pause functionality
  const handleMouseEnter = (e: React.MouseEvent) => {
    if (pauseOnHover) setIsPaused(true);
    if (restProps.onMouseEnter) restProps.onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (pauseOnHover) setIsPaused(false);
    if (restProps.onMouseLeave) restProps.onMouseLeave(e);
  };

  // Create the inner element with all props
  const innerElement = (
    <Element
      ref={textRef as any}
      className={className}
      style={combinedStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...restProps}
    >
      {getDisplayContent()}
    </Element>
  );

  // If not overflowing, return element without container
  if (!isOverflowing) {
    return innerElement;
  }

  // If overflowing, wrap in container
  return (
    <>
      <style>{keyframes}</style>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{
          display: 'inherit',
          width: 'inherit',
          maxWidth: 'inherit',
          minWidth: 'inherit',
        }}
      >
        {innerElement}
      </div>
    </>
  );
};

export default AutoScrollingText;
