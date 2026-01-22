import { seminar } from "../../content/seminar"

export function HeroSection() {
  const isApplicationOpen = Boolean(seminar.applicationUrl)
  const primaryCtaLabel = isApplicationOpen ? "今すぐ申込" : "受付準備中"

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
            {/* Mist-like reveal (balanced to show up-left too) */}
            <radialGradient id="vc-mist" cx="62%" cy="56%" r="96%">
              <stop offset="0%" stopColor="white" stopOpacity="0.98" />
              <stop offset="45%" stopColor="white" stopOpacity="0.78" />
              <stop offset="82%" stopColor="white" stopOpacity="0.36" />
              <stop offset="100%" stopColor="white" stopOpacity="0.16" />
            </radialGradient>
            <mask id="vc-reveal">
              <rect width="1200" height="800" fill="url(#vc-mist)" />
            </mask>

            <linearGradient id="vc-gold" x1="1200" y1="800" x2="560" y2="380">
              <stop offset="0%" stopColor="#B8A178" stopOpacity="1" />
              <stop offset="62%" stopColor="#B8A178" stopOpacity="0.62" />
              <stop offset="100%" stopColor="#B8A178" stopOpacity="0.26" />
            </linearGradient>

            <filter id="vc-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.7" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0"
              />
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="2.2"
                floodColor="#B8A178"
                floodOpacity="0.28"
              />
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="7.5"
                floodColor="#B8A178"
                floodOpacity="0.14"
              />
            </filter>
          </defs>

            <g mask="url(#vc-reveal)" filter="url(#vc-soft)" opacity="0.98">
            {/* Main chart line */}
            <path
              d="M1200 760 L1035 650 L940 575 L860 520 L790 468 L720 420 L640 392 L560 372 L500 332 L450 296 L400 262 L360 232 L320 206 L300 186 L280 166"
              fill="none"
              stroke="url(#vc-gold)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Secondary branches */}
            <path
              d="M940 575 L900 510 L860 452 L820 410"
              fill="none"
              stroke="url(#vc-gold)"
              strokeWidth="1.15"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />
            <path
              d="M860 520 L900 540 L950 565"
              fill="none"
              stroke="url(#vc-gold)"
              strokeWidth="1.05"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.75"
            />

            {/* Carmine pulse points */}
            <g>
              <circle
                cx="940"
                cy="575"
                r="3.1"
                className="vc-breath"
                style={{ animationDuration: "5.6s" }}
                fill="#960018"
              />
              <circle
                cx="860"
                cy="520"
                r="2.9"
                className="vc-breath"
                style={{ animationDuration: "4.8s" }}
                fill="#960018"
              />
              <circle
                cx="790"
                cy="468"
                r="2.8"
                className="vc-breath"
                style={{ animationDuration: "5.2s" }}
                fill="#960018"
              />
              <circle
                cx="720"
                cy="420"
                r="2.7"
                className="vc-breath"
                style={{ animationDuration: "4.4s" }}
                fill="#960018"
              />
              <circle
                cx="640"
                cy="392"
                r="2.6"
                className="vc-breath"
                style={{ animationDuration: "6.0s" }}
                fill="#960018"
              />
              <circle
                cx="560"
                cy="372"
                r="2.4"
                className="vc-breath"
                style={{ animationDuration: "4.9s" }}
                fill="#960018"
              />
            </g>

            {/* Bottom-left pulses (to feel like it starts from lower-left) */}
            <g>
              <circle
                cx="120"
                cy="740"
                r="3.2"
                className="vc-breath"
                style={{ animationDuration: "5.9s" }}
                fill="#960018"
              />
              <circle
                cx="220"
                cy="680"
                r="3.0"
                className="vc-breath"
                style={{ animationDuration: "4.6s" }}
                fill="#960018"
              />
              <circle
                cx="320"
                cy="620"
                r="2.9"
                className="vc-breath"
                style={{ animationDuration: "5.1s" }}
                fill="#960018"
              />
              <circle
                cx="420"
                cy="560"
                r="2.7"
                className="vc-breath"
                style={{ animationDuration: "4.3s" }}
                fill="#960018"
              />
              <circle
                cx="520"
                cy="500"
                r="2.6"
                className="vc-breath"
                style={{ animationDuration: "6.2s" }}
                fill="#960018"
              />
            </g>

            {/* Pulses near the extended up-left segment */}
            <g>
              <circle
                cx="500"
                cy="332"
                r="2.8"
                className="vc-breath"
                style={{ animationDuration: "5.4s" }}
                fill="#960018"
              />
              <circle
                cx="400"
                cy="262"
                r="2.7"
                className="vc-breath"
                style={{ animationDuration: "4.7s" }}
                fill="#960018"
              />
              <circle
                cx="320"
                cy="206"
                r="2.6"
                className="vc-breath"
                style={{ animationDuration: "5.8s" }}
                fill="#960018"
              />
              <circle
                cx="280"
                cy="166"
                r="2.5"
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
              <div className="-mt-4 inline-flex items-center sm:-mt-6">
                <span
                  className="rounded-full border border-[#B8A178]/45 bg-[#B8A178]/10 px-4 py-2 text-[10px] tracking-[0.35em] text-[#F2F2F2]/85"
                  style={{
                    fontFamily:
                      '"Hiragino Mincho ProN","Yu Mincho","YuMincho","MS Mincho",serif',
                    fontWeight: 200,
                  }}
                >
                  {seminar.title}
                </span>
              </div>
              <h1
                className="mt-10 text-[#F2F2F2] font-extralight leading-[2] tracking-[0.48em]"
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
                className="mt-8 text-[#F2F2F2]/75 font-extralight leading-[2] tracking-[0.3em]"
                style={{
                  fontFamily:
                    '"Hiragino Mincho ProN","Yu Mincho","YuMincho","MS Mincho",serif',
                  fontWeight: 200,
                  fontSize: "clamp(15px, 1.35vw, 18px)",
                }}
              >
                薬に頼り続ける人生に、静かな違和感を覚えているあなたへ。
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                {isApplicationOpen ? (
                  <a
                    href={seminar.applicationUrl!}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[#B8A178] px-7 text-[11px] tracking-[0.28em] text-[#080A10] transition-colors hover:bg-[#d3c09b]"
                    style={{
                      fontFamily:
                        '"Hiragino Mincho ProN","Yu Mincho","YuMincho","MS Mincho",serif',
                      fontWeight: 200,
                    }}
                  >
                    {primaryCtaLabel}
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex h-11 cursor-not-allowed items-center justify-center rounded-full bg-[#B8A178]/35 px-7 text-[11px] tracking-[0.28em] text-[#080A10]/70"
                    style={{
                      fontFamily:
                        '"Hiragino Mincho ProN","Yu Mincho","YuMincho","MS Mincho",serif',
                      fontWeight: 200,
                    }}
                    aria-disabled="true"
                    title="申込URLが未確定のため準備中です"
                  >
                    {primaryCtaLabel}
                  </button>
                )}

                {seminar.lineUrl ? (
                  <a
                    href={seminar.lineUrl}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-[#F2F2F2]/20 bg-[#080A10]/20 px-7 text-[11px] tracking-[0.28em] text-[#F2F2F2] transition-colors hover:border-[#F2F2F2]/35"
                    style={{
                      fontFamily:
                        '"Hiragino Mincho ProN","Yu Mincho","YuMincho","MS Mincho",serif',
                      fontWeight: 200,
                    }}
                  >
                    まずはLINEで受け取る
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle scroll hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="text-[#F2F2F2]/50 font-extralight tracking-[0.35em] text-[10px]">
          Scroll
        </div>
      </div>

      <style>{`
        .vc-breath {
          transform-origin: center;
          animation-name: vcBreath;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          opacity: 0.78;
          filter: drop-shadow(0 0 14px rgba(200, 0, 32, 0.75))
            drop-shadow(0 0 28px rgba(200, 0, 32, 0.35));
        }
        @keyframes vcBreath {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.35);
          }
        }
      `}</style>
    </section>
  )
}


