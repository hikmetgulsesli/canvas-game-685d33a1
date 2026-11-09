export const HIGH_SCORE_STORAGE_KEY =
  "setfarm.canvas_game.high_score_local_storage.v1";

export interface ProdCanvasGameRepo {
  loadHighScore(): number | null;
  saveHighScore(highScore: number): void;
}

function getBrowserStorage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

function isValidHighScore(value: number): value is number {
  return Number.isSafeInteger(value) && value >= 0;
}

/** Browser-origin persistence for the one sealed Game Progress field. */
export function createProdCanvasGameRepo(
  storage?: Storage | null,
): ProdCanvasGameRepo {
  const target = storage === undefined ? getBrowserStorage() : storage;

  return {
    loadHighScore() {
      if (!target) return null;

      try {
        const raw = target.getItem(HIGH_SCORE_STORAGE_KEY);
        if (raw === null || raw.trim() === "") return null;
        const value = Number(raw);
        return isValidHighScore(value) ? value : null;
      } catch {
        return null;
      }
    },

    saveHighScore(highScore) {
      if (!target || !isValidHighScore(highScore)) return;

      try {
        target.setItem(HIGH_SCORE_STORAGE_KEY, String(highScore));
      } catch {
        // Storage can be unavailable in privacy-restricted browser contexts.
        // Runtime state still follows the action; normal browser storage persists it.
      }
    },
  };
}
