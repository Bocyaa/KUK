import React, { ReactNode, useEffect, useRef } from 'react';

export interface RecipeCarouselProps {
  children: ReactNode;
  gap?: string;
}

const CARD_WIDTH = 320; // Tailwind w‑80 (20rem)
const GAP_DEFAULT = 16; // Tailwind gap‑4  (1rem)
const DRAG_THRESHOLD = 0.15; // 15 % swipe needed to turn page

const RecipeCardCarousel: React.FC<RecipeCarouselProps> = ({
  children,
  gap = 'gap-4',
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // ----- Measurements ----------------------------------------------------
    const computedGap =
      parseInt(getComputedStyle(track).columnGap, 10) || GAP_DEFAULT;
    const firstChild = track.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild?.offsetWidth ?? CARD_WIDTH;

    // ----- Gesture variables ----------------------------------------------
    let dragStartX = 0;
    let scrollStartX = 0;
    const maxIdx = track.children.length - 1;

    const onPointerDown = (e: PointerEvent): void => {
      dragStartX = e.clientX;
      scrollStartX = track.scrollLeft;
      track.setPointerCapture?.(e.pointerId);
    };

    const onPointerUp = (e: PointerEvent): void => {
      const dragDelta = dragStartX - e.clientX;
      const direction = Math.sign(dragDelta); //  1 ➜ next | ‑1 ➜ prev

      let idx = Math.round(scrollStartX / (cardWidth + computedGap));
      if (Math.abs(dragDelta) > cardWidth * DRAG_THRESHOLD) idx += direction;
      idx = Math.max(0, Math.min(idx, maxIdx));

      track.scrollTo({
        left: idx * (cardWidth + computedGap),
        behavior: 'smooth',
      });

      track.releasePointerCapture?.(e.pointerId);
    };

    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('pointerup', onPointerUp);
    return () => {
      track.removeEventListener('pointerdown', onPointerDown);
      track.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  // ----- Render -----------------------------------------------------------
  return (
    <div className="w-full overflow-hidden">
      <div
        ref={trackRef}
        // px-[max(calc((100vw-360px)/2),1rem)]
        className={`no-scrollbar flex snap-x snap-mandatory ${gap} overflow-x-auto scroll-smooth bg-transparent pb-2 first:pl-5 last:pr-5`}
      >
        {children}
      </div>
    </div>
  );
};

export default RecipeCardCarousel;
