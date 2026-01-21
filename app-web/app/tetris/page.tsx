import TetrisGame from "../components/tetris/tetris-game";

export default function TetrisPage() {
  return (
    <main className="min-h-dvh px-4 py-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6">
          <h1 className="text-balance text-2xl font-semibold tracking-tight">
            Tetris
          </h1>
          <p className="mt-2 text-sm opacity-80">
            キー操作: ←→ 移動 / ↑ or X 回転 / ↓ ソフトドロップ / Space ハードドロップ
            / P 一時停止 / R リスタート
          </p>
        </div>

        <TetrisGame />
      </div>
    </main>
  );
}

