import type { ProdCanvasGameStore } from "../prod-canvas-game/prod-canvas-game.store";
import type { ProdCanvasGameState } from "../prod-canvas-game/prod-canvas-game.types";

export const ACT_START_GAME = "ACT_START_GAME" as const;

/** The single application path used by both the rendered button and test bridge. */
export function actStartGame(
  store: ProdCanvasGameStore,
): ProdCanvasGameState {
  return store.startGame();
}
