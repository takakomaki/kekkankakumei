export function HeroSection() {
  return (
    <section
      className="relative isolate w-full overflow-hidden"
      style={{
        backgroundColor: "#080A10",
        backgroundImage:
          "radial-gradient(900px 600px at 28% 22%, rgba(242,242,242,0.07), transparent 65%), radial-gradient(700px 500px at 75% 85%, rgba(184,161,120,0.06), transparent 60%)",
      }}
    >
      {/* Vascular Cosmos lines (decorative) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          role="img"
          aria-label=""
        >
          <defs>
            {/* Mist-like reveal (stronger near bottom-right) */}
            <radialGradient id="vc-mist" cx="92%" cy="88%" r="78%">
              <stop offset="0%" stopColor="white" stopOpacity="0.95" />
              <stop offset="35%" stopColor="white" stopOpacity="0.55" />
              <stop offset="65%" stopColor="white" stopOpacity="0.15" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="vc-reveal">
              <rect width="1200" height="800" fill="url(#vc-mist)" />
            </mask>

            <linearGradient id="vc-gold" x1="1200" y1="800" x2="560" y2="380">
              <stop offset="0%" stopColor="#B8A178" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#B8A178" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#B8A178" stopOpacity="0.08" />
            </linearGradient>

            <filter id="vc-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.55" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0"
              />
            </filter>
          </defs>

          <g mask="url(#vc-reveal)" filter="url(#vc-soft)">
            {/* Main chart line */}
            <path
              d="M1200 760 L1035 650 L940 575 L860 520 L790 468 L720 420 L640 392 L560 372"
              fill="none"
              stroke="url(#vc-gold)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Secondary branches */}
            <path
              d="M940 575 L900 510 L860 452 L820 410"
              fill="none"
              stroke="url(#vc-gold)"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
            <path
              d="M860 520 L900 540 L950 565"
              fill="none"
              stroke="url(#vc-gold)"
              strokeWidth="0.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.55"
            />
            <path
              d="M790 468 L760 520 L735 585"
              fill="none"
              stroke="url(#vc-gold)"
              strokeWidth="0.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.55"
            />
            <path
              d="M720 420 L690 460 L660 505"
              fill="none"
              stroke="url(#vc-gold)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.42"
            />

            {/* Carmine pulse points */}
            <g>
              <circle
                cx="940"
                cy="575"
                r="2.2"
                className="vc-breath"
                style={{ animationDuration: "5.6s" }}
                fill="#960018"
              />
              <circle
                cx="860"
                cy="520"
                r="2.0"
                className="vc-breath"
                style={{ animationDuration: "4.8s" }}
                fill="#960018"
              />
              <circle
                cx="790"
                cy="468"
                r="2.0"
                className="vc-breath"
                style={{ animationDuration: "5.2s" }}
                fill="#960018"
              />
              <circle
                cx="720"
                cy="420"
                r="1.9"
                className="vc-breath"
                style={{ animationDuration: "4.4s" }}
                fill="#960018"
              />
              <circle
                cx="640"
                cy="392"
                r="1.8"
                className="vc-breath"
                style={{ animationDuration: "6.0s" }}
                fill="#960018"
              />
              <circle
                cx="560"
                cy="372"
                r="1.7"
                className="vc-breath"
                style={{ animationDuration: "4.9s" }}
                fill="#960018"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl px-6">
        <div className="w-full">
          <div className="relative pt-[14svh] sm:pt-[16svh] lg:pt-[18svh]">
            <div className="max-w-[34rem]">
              <h1
                className="text-[#F2F2F2] font-extralight leading-[2] tracking-[0.3em]"
                style={{
                  fontFamily:
                    '"Hiragino Mincho ProN","Yu Mincho","YuMincho","MS Mincho",serif',
                  fontWeight: 200,
                  fontSize: "clamp(28px, 3.2vw, 52px)",
                }}
              >
                血管は、あなたの未来の地図。
              </h1>
              <p
                className="mt-8 text-[#F2F2F2]/72 font-extralight leading-[2] tracking-[0.28em]"
                style={{
                  fontFamily:
                    '"Hiragino Mincho ProN","Yu Mincho","YuMincho","MS Mincho",serif',
                  fontWeight: 200,
                  fontSize: "clamp(12px, 1.05vw, 14px)",
                }}
              >
                薬に頼り続ける人生に、静かな違和感を覚えているあなたへ。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle scroll hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="text-[#F2F2F2]/45 font-extralight tracking-[0.35em] text-[10px]">
          Scroll
        </div>
      </div>

      <style>{`
        .vc-breath {
          transform-origin: center;
          animation-name: vcBreath;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          opacity: 0.25;
          filter: drop-shadow(0 0 6px rgba(150, 0, 24, 0.35));
        }
        @keyframes vcBreath {
          0%,
          100% {
            opacity: 0.18;
            transform: scale(0.92);
          }
          50% {
            opacity: 1;
            transform: scale(1.12);
          }
        }
      `}</style>
    </section>
  )
}


