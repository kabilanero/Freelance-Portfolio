import { useEffect, useRef, useMemo } from 'react';
// BlobBackground.tsx
import React from "react";
import { useScroll, useTransform, motion } from "framer-motion";

type Props = {
  containerRef: React.RefObject<HTMLElement>;
  seed?: number | string;
  count?: number;
  zIndex?: number;
};

function mulberry32(a: number) {
  // simple deterministic PRNG
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

const BlobBackground: React.FC<Props> = ({
  containerRef,
  seed = 1337,
  count = 5,
  zIndex = 5,
}) => {
  // scroll tied to the same containerRef passed from HeroOrbit
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Map scroll progress to a value [0..1] to drive hue shift
  const hueShift = useTransform(scrollYProgress, [0, 0.5, 1], [0, 40, -20]);

  // Build deterministic blobs once
  const blobs = useMemo(() => {
    // ensure numeric seed
    let s = typeof seed === "string" ? seed.split("").reduce((p, c) => p + c.charCodeAt(0), 0) : Number(seed || 0);
    const rnd = mulberry32(s + 1);

    const list = new Array(count).fill(null).map((_, i) => {
      const sizeVw = Math.round((10 + rnd() * 18) * 10) / 10; // 10 - 28 vw
      const left = Math.round(rnd() * 90 * 10) / 10; // 0 - 90%
      const top = Math.round(rnd() * 90 * 10) / 10; // 0 - 90%
      const blur = Math.round((20 + rnd() * 40) * 10) / 10; // 20 - 60 px
      const baseHue = Math.round((rnd() * 360) * 10) / 10;
      const opacity = (0.12 + rnd() * 0.25).toFixed(3);
      const duration = (10 + rnd() * 20).toFixed(2); // 10 - 30s
      const delay = (-(rnd() * 10)).toFixed(2); // negative so animations are offset
      const amplitude = Math.round((6 + rnd() * 24) * 10) / 10; // px vertical amplitude
      return {
        id: `blob-${i}`,
        sizeVw,
        left,
        top,
        blur,
        baseHue,
        opacity,
        duration,
        delay,
        amplitude,
      };
    });

    return list;
  }, [seed, count]);

  // Convert hueShift motion value to CSS custom property using onChange
  // We'll use inline motion.div for each blob to accept hue transform
  return (
    <>
      {/* keyframes — injected so you don't need to add to a stylesheet */}
      <style>
        {`
        @keyframes blobFloat {
          0% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(var(--amplitude)) translateX(calc(var(--amplitude) / 6 * -1)) scale(1.02); }
          100% { transform: translateY(0px) translateX(0px) scale(1); }
        }
      `}
      </style>

      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex }}
      >
        {blobs.map((b, idx) => {
          // Create an inline style object using CSS vars for amplitude etc.
          const style: React.CSSProperties = {
            position: "absolute",
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: `min(${b.sizeVw}vw, ${b.sizeVw}vh)`,
            height: `min(${b.sizeVw}vw, ${b.sizeVw}vh)`,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            filter: `blur(${b.blur}px)`,
            opacity: Number(b.opacity),
            // We'll animate with keyframes
            animation: `blobFloat ${b.duration}s ease-in-out ${b.delay}s infinite`,
            // animationDirection 'alternate' gives smooth up/down
            animationDirection: "alternate",
            // allow CSS custom props used inside background
            // set an initial background using baseHue; hueShift will update via motion
            background: `radial-gradient(circle at 35% 25%, hsla(${b.baseHue}, 85%, 65%, 0.95) 0%, hsla(${(b.baseHue + 30) % 360}, 75%, 55%, 0.85) 35%, hsla(${(b.baseHue + 60) % 360}, 70%, 45%, 0.7) 100%)`,
            mixBlendMode: "screen",
            pointerEvents: "none",
            willChange: "transform, background",
            // expose amplitude variable for keyframes calc
            // negative amplitude to move up (we'll use positive pixel string)
            // we attach it to style as CSS var used by keyframes
            // e.g. --amplitude: -12px
            // Use negative so 50% moves up
            // don't set hue here; we'll use Framer Motion to update background via style
            // but we still supply background as fallback.
          };

          return (
            <motion.div
              key={b.id}
              style={{
                ...style,
                // we map hueShift to a dynamic hue delta to create scroll-based color morph
                // motion will provide the numeric hueShift; we then recompute background below
              }}
              // Use onChange to update the element's style background based on scroll
              // but since we don't have direct access to motion value here, we'll attach a child motion div
            >
              <ScrollColorBlob
                baseHue={b.baseHue}
                hueShift={hueShift}
                amplitude={b.amplitude}
                // pass inner style so we keep blur/size/position on the wrapper
                innerStyle={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  filter: `blur(${b.blur}px)`,
                  opacity: b.opacity,
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default BlobBackground;

/**
 * ScrollColorBlob:
 * - receives baseHue and a motion value hueShift
 * - subscribes to the motion value and updates the inline background style
 */
function ScrollColorBlob({
  baseHue,
  hueShift,
  amplitude,
  innerStyle,
}: {
  baseHue: number;
  hueShift: any; // MotionValue
  amplitude: number;
  innerStyle?: React.CSSProperties;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // Subscribe to hueShift changes and update background accordingly
    const unsubscribe = hueShift.on("change", (v: number) => {
      // compute new hues based on baseHue + v
      const h1 = Math.round((baseHue + v) % 360);
      const h2 = Math.round((baseHue + 30 + v) % 360);
      const h3 = Math.round((baseHue + 60 + v) % 360);

      if (ref.current) {
        ref.current.style.background = `radial-gradient(circle at 35% 25%, hsla(${h1}, 85%, 65%, 0.98) 0%, hsla(${h2}, 75%, 55%, 0.88) 35%, hsla(${h3}, 70%, 45%, 0.75) 100%)`;
        // update CSS variable amplitude for the float keyframes
        ref.current.style.setProperty("--amplitude", `-${amplitude}px`);
      }
    });

    // initialize immediately
    // call once with current value
    // If hueShift.get exists
    try {
      const current = hueShift.get();
      const h1 = Math.round((baseHue + current) % 360);
      const h2 = Math.round((baseHue + 30 + current) % 360);
      const h3 = Math.round((baseHue + 60 + current) % 360);
      if (ref.current) {
        ref.current.style.background = `radial-gradient(circle at 35% 25%, hsla(${h1}, 85%, 65%, 0.98) 0%, hsla(${h2}, 75%, 55%, 0.88) 35%, hsla(${h3}, 70%, 45%, 0.75) 100%)`;
        ref.current.style.setProperty("--amplitude", `-${amplitude}px`);
      }
    } catch (e) {
      // ignore
    }

    return () => unsubscribe();
  }, [baseHue, hueShift, amplitude]);

  return <div ref={ref} style={innerStyle} />;
}
