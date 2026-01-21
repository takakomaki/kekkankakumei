"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";
type Rotation = 0 | 1 | 2 | 3;
type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; // 0 empty, 1..7 pieces

type Piece = {
  type: TetrominoType;
  rot: Rotation;
  x: number;
  y: number;
};

const WIDTH = 10;
const HEIGHT = 20;

const PIECE_INDEX: Record<TetrominoType, Cell> = {
  I: 1,
  O: 2,
  T: 3,
  S: 4,
  Z: 5,
  J: 6,
  L: 7,
};

const CELL_CLASS: Record<Cell, string> = {
  0: "bg-transparent",
  1: "bg-cyan-400",
  2: "bg-yellow-300",
  3: "bg-purple-400",
  4: "bg-emerald-400",
  5: "bg-rose-400",
  6: "bg-blue-400",
  7: "bg-orange-400",
};

// 4x4座標系のオフセット（[x,y]）
const SHAPES: Record<TetrominoType, Array<Array<[number, number]>>> = {
  I: [
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
    ],
  ],
  O: [
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [2, 1],
    ],
  ],
  T: [
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [2, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [1, 2],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
  ],
  S: [
    [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [2, 1],
      [2, 2],
    ],
    [
      [1, 1],
      [2, 1],
      [0, 2],
      [1, 2],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
  ],
  Z: [
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [2, 0],
      [1, 1],
      [2, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 2],
      [2, 2],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
    ],
  ],
  J: [
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 2],
      [1, 2],
    ],
  ],
  L: [
    [
      [2, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
  ],
};

function makeEmptyBoard(): Cell[][] {
  return Array.from({ length: HEIGHT }, () =>
    Array.from({ length: WIDTH }, () => 0 as Cell),
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function nextBag(): TetrominoType[] {
  return shuffle(["I", "O", "T", "S", "Z", "J", "L"]);
}

function spawnPiece(type: TetrominoType): Piece {
  // 4x4の中心寄せ（見た目のため微調整）
  return { type, rot: 0, x: Math.floor(WIDTH / 2) - 2, y: -2 };
}

function cellsOf(piece: Piece): Array<[number, number]> {
  return SHAPES[piece.type][piece.rot].map(([dx, dy]) => [
    piece.x + dx,
    piece.y + dy,
  ]);
}

function isValid(board: Cell[][], piece: Piece): boolean {
  for (const [x, y] of cellsOf(piece)) {
    if (x < 0 || x >= WIDTH) return false;
    if (y >= HEIGHT) return false;
    if (y >= 0 && board[y][x] !== 0) return false;
  }
  return true;
}

function mergePiece(board: Cell[][], piece: Piece): Cell[][] {
  const next = board.map((row) => [...row]) as Cell[][];
  const idx = PIECE_INDEX[piece.type];
  for (const [x, y] of cellsOf(piece)) {
    if (y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH) {
      next[y][x] = idx;
    }
  }
  return next;
}

function clearLines(board: Cell[][]): { board: Cell[][]; cleared: number } {
  const kept: Cell[][] = [];
  let cleared = 0;
  for (let y = 0; y < HEIGHT; y += 1) {
    const full = board[y].every((c) => c !== 0);
    if (full) cleared += 1;
    else kept.push(board[y]);
  }
  while (kept.length < HEIGHT) {
    kept.unshift(Array.from({ length: WIDTH }, () => 0 as Cell));
  }
  return { board: kept, cleared };
}

function scoreFor(cleared: number, level: number): number {
  const base = [0, 100, 300, 500, 800][cleared] ?? 0;
  return base * (level + 1);
}

function dropIntervalMs(level: number): number {
  return Math.max(90, 800 - level * 60);
}

function rotateWithKick(board: Cell[][], piece: Piece, dir: 1 | -1): Piece {
  const nextRot = (((piece.rot + dir) % 4) + 4) % 4;
  const rotated: Piece = { ...piece, rot: nextRot as Rotation };
  const kicks = [0, -1, 1, -2, 2];
  for (const dx of kicks) {
    const kicked = { ...rotated, x: rotated.x + dx };
    if (isValid(board, kicked)) return kicked;
  }
  return piece;
}

function hardDropDistance(board: Cell[][], piece: Piece): number {
  let d = 0;
  let test = { ...piece };
  while (true) {
    const down = { ...test, y: test.y + 1 };
    if (!isValid(board, down)) return d;
    test = down;
    d += 1;
  }
}

export default function TetrisGame() {
  const [board, setBoard] = useState<Cell[][]>(() => makeEmptyBoard());
  const [queue, setQueue] = useState<TetrominoType[]>(() => [
    ...nextBag(),
    ...nextBag(),
  ]);
  const [current, setCurrent] = useState<Piece>(() =>
    spawnPiece(queue[0] ?? "I"),
  );
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const level = Math.floor(lines / 10);
  const intervalRef = useRef<number | null>(null);

  const nextType = queue[1] ?? "I";

  const displayBoard = useMemo(() => {
    // current を重ね描き
    const overlay = board.map((row) => [...row]) as Cell[][];
    if (!gameOver) {
      const idx = PIECE_INDEX[current.type];
      for (const [x, y] of cellsOf(current)) {
        if (y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH) {
          overlay[y][x] = idx;
        }
      }
    }
    return overlay;
  }, [board, current, gameOver]);

  const takeFromQueueAndSpawn = useCallback((nextQueue: TetrominoType[]): {
    piece: Piece;
    queue: TetrominoType[];
  } => {
    let q = nextQueue;
    if (q.length < 8) q = [...q, ...nextBag()];
    const type = q[0] ?? "I";
    const piece = spawnPiece(type);
    return { piece, queue: q };
  }, []);

  const reset = useCallback(() => {
    const q = [...nextBag(), ...nextBag()];
    setBoard(makeEmptyBoard());
    setQueue(q);
    setCurrent(spawnPiece(q[0] ?? "I"));
    setScore(0);
    setLines(0);
    setPaused(false);
    setGameOver(false);
  }, []);

  const tryMove = useCallback((dx: number, dy: number) => {
    setCurrent((p) => {
      const moved = { ...p, x: p.x + dx, y: p.y + dy };
      if (isValid(board, moved)) return moved;
      return p;
    });
  }, [board]);

  const lockAndAdvance = useCallback((fallen: Piece) => {
    const merged = mergePiece(board, fallen);
    const { board: clearedBoard, cleared } = clearLines(merged);
    const newLines = lines + cleared;
    const newLevel = Math.floor(newLines / 10);

    // 次ピース
    const qAfterPop = queue.slice(1);
    const { piece: nextPiece, queue: ensured } = takeFromQueueAndSpawn(
      qAfterPop,
    );

    // ゲームオーバー判定（スポーンできない）
    const canSpawn = isValid(clearedBoard, nextPiece);
    if (!canSpawn) {
      setBoard(clearedBoard);
      setLines(newLines);
      setScore((s) => s + scoreFor(cleared, newLevel));
      setGameOver(true);
      setPaused(false);
      return;
    }

    setBoard(clearedBoard);
    setLines(newLines);
    setScore((s) => s + scoreFor(cleared, newLevel));
    setQueue(ensured);
    setCurrent(nextPiece);
  }, [board, lines, queue, takeFromQueueAndSpawn]);

  const tick = useCallback(() => {
    if (paused || gameOver) return;
    setCurrent((p) => {
      const down = { ...p, y: p.y + 1 };
      if (isValid(board, down)) return down;
      // ロックして次へ（setCurrent の外で board を更新したいので一旦そのまま返す）
      window.setTimeout(() => lockAndAdvance(p), 0);
      return p;
    });
  }, [paused, gameOver, board, lockAndAdvance]);

  useEffect(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    if (paused || gameOver) return;
    intervalRef.current = window.setInterval(tick, dropIntervalMs(level));
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [paused, gameOver, level, tick]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        reset();
        return;
      }
      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        if (!gameOver) setPaused((v) => !v);
        return;
      }
      if (paused || gameOver) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          tryMove(-1, 0);
          break;
        case "ArrowRight":
          e.preventDefault();
          tryMove(1, 0);
          break;
        case "ArrowDown":
          e.preventDefault();
          tryMove(0, 1);
          break;
        case "ArrowUp":
        case "x":
        case "X":
          e.preventDefault();
          setCurrent((p) => rotateWithKick(board, p, 1));
          break;
        case "z":
        case "Z":
          e.preventDefault();
          setCurrent((p) => rotateWithKick(board, p, -1));
          break;
        case " ":
          e.preventDefault();
          setCurrent((p) => {
            const d = hardDropDistance(board, p);
            const dropped = { ...p, y: p.y + d };
            window.setTimeout(() => lockAndAdvance(dropped), 0);
            setScore((s) => s + d * 2);
            return dropped;
          });
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [board, paused, gameOver, lockAndAdvance, reset, tryMove]); // boardは衝突判定に使う

  const nextPreview = useMemo(() => {
    const type = nextType;
    const cells = SHAPES[type][0];
    const grid: Cell[][] = Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => 0 as Cell),
    );
    for (const [x, y] of cells) {
      if (x >= 0 && x < 4 && y >= 0 && y < 4) grid[y][x] = PIECE_INDEX[type];
    }
    return grid;
  }, [nextType]);

  const statusText = gameOver ? "GAME OVER" : paused ? "PAUSED" : "PLAYING";

  return (
    <div className="grid gap-6 md:grid-cols-[auto_1fr]">
      <div className="w-fit">
        <div className="relative">
          <div
            className="grid gap-px rounded-xl bg-white/10 p-2"
            style={{
              gridTemplateColumns: `repeat(${WIDTH}, 24px)`,
              gridTemplateRows: `repeat(${HEIGHT}, 24px)`,
            }}
            aria-label="Tetris board"
            role="application"
          >
            {displayBoard.flatMap((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className={[
                    "h-6 w-6 rounded-[4px] ring-1 ring-white/10",
                    CELL_CLASS[cell],
                  ].join(" ")}
                />
              )),
            )}
          </div>

          {(paused || gameOver) && (
            <div className="absolute inset-0 grid place-items-center rounded-xl bg-black/60">
              <div className="text-center">
                <div className="text-lg font-semibold">{statusText}</div>
                <div className="mt-2 text-xs opacity-80">
                  {gameOver ? "R でリスタート" : "P で再開"}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2 md:hidden">
          <button
            className="rounded-lg bg-white/10 px-3 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15"
            onClick={() => !paused && !gameOver && tryMove(-1, 0)}
            type="button"
          >
            ←
          </button>
          <button
            className="rounded-lg bg-white/10 px-3 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15"
            onClick={() => !paused && !gameOver && tryMove(1, 0)}
            type="button"
          >
            →
          </button>
          <button
            className="rounded-lg bg-white/10 px-3 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15"
            onClick={() =>
              !paused && !gameOver && setCurrent((p) => rotateWithKick(board, p, 1))
            }
            type="button"
          >
            回転
          </button>
          <button
            className="rounded-lg bg-white/10 px-3 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15"
            onClick={() => !paused && !gameOver && tryMove(0, 1)}
            type="button"
          >
            ↓
          </button>
          <button
            className="rounded-lg bg-white/10 px-3 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15"
            onClick={() => {
              if (paused || gameOver) return;
              setCurrent((p) => {
                const d = hardDropDistance(board, p);
                const dropped = { ...p, y: p.y + d };
                window.setTimeout(() => lockAndAdvance(dropped), 0);
                setScore((s) => s + d * 2);
                return dropped;
              });
            }}
            type="button"
          >
            落下
          </button>
          <button
            className="rounded-lg bg-white/10 px-3 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15"
            onClick={() => {
              if (gameOver) return;
              setPaused((v) => !v);
            }}
            type="button"
          >
            {paused ? "再開" : "一時停止"}
          </button>
          <button
            className="rounded-lg bg-white/10 px-3 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15"
            onClick={reset}
            type="button"
          >
            リセット
          </button>
        </div>
      </div>

      <aside className="grid content-start gap-4">
        <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
          <div className="text-xs font-medium opacity-70">ステータス</div>
          <div className="mt-1 text-sm font-semibold">{statusText}</div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-xs opacity-70">スコア</div>
              <div className="font-semibold tabular-nums">{score}</div>
            </div>
            <div>
              <div className="text-xs opacity-70">レベル</div>
              <div className="font-semibold tabular-nums">{level}</div>
            </div>
            <div>
              <div className="text-xs opacity-70">消した行</div>
              <div className="font-semibold tabular-nums">{lines}</div>
            </div>
            <div>
              <div className="text-xs opacity-70">速度</div>
              <div className="font-semibold tabular-nums">
                {Math.round(1000 / dropIntervalMs(level))} drops/s
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs font-medium opacity-70">次のミノ</div>
            <div className="mt-2 inline-grid gap-px rounded-lg bg-white/10 p-2">
              {nextPreview.flatMap((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={`n-${x}-${y}`}
                    className={[
                      "h-5 w-5 rounded-[4px] ring-1 ring-white/10",
                      CELL_CLASS[cell],
                    ].join(" ")}
                  />
                )),
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              className="rounded-lg bg-white/10 px-3 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15"
              onClick={() => {
                if (gameOver) return;
                setPaused((v) => !v);
              }}
              type="button"
            >
              {paused ? "再開 (P)" : "一時停止 (P)"}
            </button>
            <button
              className="rounded-lg bg-white/10 px-3 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15"
              onClick={reset}
              type="button"
            >
              リスタート (R)
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 p-4 text-sm ring-1 ring-white/10">
          <div className="text-xs font-medium opacity-70">操作</div>
          <ul className="mt-2 space-y-1 opacity-90">
            <li>← → : 移動</li>
            <li>↑ / X : 回転（時計回り）</li>
            <li>Z : 回転（反時計回り）</li>
            <li>↓ : ソフトドロップ</li>
            <li>Space : ハードドロップ</li>
            <li>P : 一時停止</li>
            <li>R : リスタート</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

