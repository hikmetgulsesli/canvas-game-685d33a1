import {
  createProdCanvasGameRepo,
  HIGH_SCORE_STORAGE_KEY,
  type ProdCanvasGameRepo,
} from "../features/prod-canvas-game/prod-canvas-game.repo";
import {
  createProdCanvasGameStore,
  type ProdCanvasGameStore,
} from "../features/prod-canvas-game/prod-canvas-game.store";
import type { ProdCanvasGameState } from "../features/prod-canvas-game/prod-canvas-game.types";

export const PROD_CANVAS_GAME_INITIAL_STATE: ProdCanvasGameState = {
  application: { status: "ready" },
  gameProgress: { high_score: null },
};

export interface ProdCanvasGameFixture {
  storage: Storage;
  repo: ProdCanvasGameRepo;
  store: ProdCanvasGameStore;
  storageKey: string;
}

/** Isolated browser-storage fixture; the production path uses the same repo/store. */
export function createProdCanvasGameFixture(): ProdCanvasGameFixture {
  const values = new Map<string, string>();
  const storage: Storage = {
    get length() {
      return values.size;
    },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => Array.from(values.keys())[index] ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, String(value)),
  };
  const repo = createProdCanvasGameRepo(storage);

  return {
    storage,
    repo,
    store: createProdCanvasGameStore(repo),
    storageKey: HIGH_SCORE_STORAGE_KEY,
  };
}
