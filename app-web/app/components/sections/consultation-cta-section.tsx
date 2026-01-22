import { seminar } from "../../content/seminar"

export function ConsultationCtaSection() {
  const isApplicationOpen = Boolean(seminar.applicationUrl)

  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-[0_16px_60px_rgba(0,0,0,0.06)] sm:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold tracking-tight">
                まず、あなたの状態を一緒に整理しませんか
              </h2>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                数値や薬の不安を「一度、言語化」してから。血管・血流という軸で、
                これからの選択肢を増やすためのセミナーです。
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                {isApplicationOpen ? (
                  <a
                    href={seminar.applicationUrl!}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-900 px-7 text-[13px] font-semibold text-white transition-colors hover:bg-neutral-800"
                  >
                    セミナーに申し込む
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex h-11 cursor-not-allowed items-center justify-center rounded-full bg-neutral-900/30 px-7 text-[13px] font-semibold text-white/80"
                    aria-disabled="true"
                    title="申込URLが未確定のため準備中です"
                  >
                    申込受付は準備中です
                  </button>
                )}

                {seminar.lineUrl ? (
                  <a
                    href={seminar.lineUrl}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-7 text-[13px] font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
                  >
                    公式LINEで受け取る
                  </a>
                ) : null}
              </div>
            </div>

            <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-neutral-50 p-6">
              <div className="text-[12px] font-semibold tracking-wider text-neutral-900">
                開催概要
              </div>
              <dl className="mt-4 space-y-3 text-[13px] text-neutral-800">
                <div className="flex items-start justify-between gap-6">
                  <dt className="text-neutral-600">タイトル</dt>
                  <dd className="text-right font-medium">{seminar.title}</dd>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <dt className="text-neutral-600">開催</dt>
                  <dd className="text-right">
                    {seminar.date}／{seminar.time}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <dt className="text-neutral-600">形式</dt>
                  <dd className="text-right">
                    {seminar.format}
                    {seminar.venue ? `（${seminar.venue}）` : ""}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <dt className="text-neutral-600">参加費</dt>
                  <dd className="text-right">{seminar.price}</dd>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <dt className="text-neutral-600">定員</dt>
                  <dd className="text-right">{seminar.capacity}</dd>
                </div>
                <div className="pt-2 text-[11px] text-neutral-500">
                  更新 {seminar.updatedAt}
                </div>
              </dl>
            </div>
          </div>

          {(seminar.forWhom?.length ?? 0) > 0 ? (
            <div className="mt-10">
              <div className="text-[12px] font-semibold tracking-wider text-neutral-900">
                こんな方へ
              </div>
              <ul className="mt-4 grid gap-2 text-[13px] text-neutral-700 sm:grid-cols-2">
                {seminar.forWhom!.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full bg-neutral-900" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {(seminar.disclaimer?.length ?? 0) > 0 ? (
            <div className="mt-10 rounded-xl border border-neutral-200 bg-white p-6">
              <div className="text-[12px] font-semibold tracking-wider text-neutral-900">
                ご注意（免責）
              </div>
              <ul className="mt-4 space-y-2 text-[12px] leading-relaxed text-neutral-600">
                {seminar.disclaimer!.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-neutral-600">
            {seminar.youtubeUrl ? (
              <a className="underline underline-offset-4" href={seminar.youtubeUrl}>
                YouTube
              </a>
            ) : null}
            {seminar.bookUrl ? (
              <a className="underline underline-offset-4" href={seminar.bookUrl}>
                書籍「血管革命」
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}


