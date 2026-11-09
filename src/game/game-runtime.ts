import type { ProdCanvasGameState } from "../features/prod-canvas-game/prod-canvas-game.types";

export interface GameRuntime {
  render(state: ProdCanvasGameState): void;
  destroy(): void;
}

/** A small, deterministic canvas renderer; no autonomous state transitions. */
export function createGameRuntime(canvas: HTMLCanvasElement): GameRuntime {
  let context: CanvasRenderingContext2D | null = null;
  let destroyed = false;

  try {
    context = canvas.getContext("2d");
  } catch {
    context = null;
  }

  return {
    render(state) {
      if (destroyed || !context) return;

      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#020617";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "#1e293b";
      context.lineWidth = 2;
      for (let x = 48; x < width; x += 48) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = 48; y < height; y += 48) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      const playing = state.application.status === "playing";
      context.fillStyle = playing ? "#38bdf8" : "#64748b";
      context.beginPath();
      context.arc(width / 2, height / 2, playing ? 24 : 16, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = "#94a3b8";
      context.font = "16px ui-monospace, monospace";
      context.textAlign = "center";
      context.fillText(
        playing ? "GAME IN PROGRESS" : "READY TO PLAY",
        width / 2,
        height / 2 + 64,
      );
    },

    destroy() {
      destroyed = true;
      context = null;
    },
  };
}
