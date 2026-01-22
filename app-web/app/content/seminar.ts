export type SeminarInfo = {
  /** 表示名（LP上のイベント名） */
  title: string
  /** サブタイトル（任意） */
  subtitle?: string

  /** 申込URL（未確定なら null） */
  applicationUrl: string | null
  /** 公式LINE（未確定なら null） */
  lineUrl: string | null
  /** YouTube（未確定なら null） */
  youtubeUrl: string | null
  /** 書籍ページなど（未確定なら null） */
  bookUrl: string | null

  /** 開催日（未確定なら "未定" でも可） */
  date: string
  /** 開催時間（未確定なら "未定" でも可） */
  time: string
  /** 開催形式（例: オンライン/会場） */
  format: string
  /** 会場（任意） */
  venue?: string
  /** 定員（未確定なら "未定" でも可） */
  capacity: string
  /** 参加費（未確定なら "未定" でも可） */
  price: string

  /** 想定対象者（任意） */
  forWhom?: string[]
  /** 特典（任意） */
  bonuses?: string[]
  /** 注意事項（任意） */
  notes?: string[]
  /** 免責（任意） */
  disclaimer?: string[]

  /** 情報更新日（表示用） */
  updatedAt: string
}

/**
 * セミナー固有情報（＝差し替え項目）をここに集約します。
 * 未確定項目は null / "未定" を入れておき、UI側で「受付準備中」等に変換します。
 */
export const seminar: SeminarInfo = {
  title: "加藤雅俊特別セミナー",
  subtitle: "血管からはじめる、薬に頼り続けない未来へ",

  applicationUrl: null,
  lineUrl: null,
  youtubeUrl: null,
  bookUrl: null,

  date: "未定",
  time: "未定",
  format: "オンライン（予定）",
  venue: "未定",
  capacity: "未定",
  price: "未定",

  forWhom: [
    "薬が増え続けることに、静かな違和感がある方",
    "検査数値に追われず、根本から整えたい方",
    "血管・血流の重要性を、体系的に理解したい方",
  ],
  bonuses: ["特典は準備中です（確定次第更新します）"],
  notes: [
    "内容・日程は変更となる場合があります。",
    "服薬中の方は、自己判断での中止・変更はお控えください。",
  ],
  disclaimer: [
    "本セミナーは医療行為・診断・治療を目的としたものではありません。",
    "気になる症状がある場合は、医療機関へご相談ください。",
  ],

  updatedAt: "2026-01-22",
}

