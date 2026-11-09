import { useEffect, useMemo, useRef, useState } from "react";
import {
  createProdCanvasGameStore,
  ProdCanvasGameProvider,
  useProdCanvasGameState,
  useProdCanvasGameStore,
} from "./features/prod-canvas-game/prod-canvas-game.store";
import { actStartGame } from "./features/surf-play-page/act_start_game";
import { createGameRuntime, type GameRuntime } from "./game/game-runtime";
import { PlayPageCanvasGame } from "./screens/PlayPageCanvasGame";
import { installTestBridge } from "./test/bridge";

function CanvasGame() {
  const store = useProdCanvasGameStore();
  const state = useProdCanvasGameState();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runtimeRef = useRef<GameRuntime | null>(null);

  const actions = useMemo(
    () => ({
      "start-game-1": () => {
        actStartGame(store);
      },
    }),
    [store],
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const runtime = createGameRuntime(canvasRef.current);
    runtimeRef.current = runtime;
    runtime.render(store.getSnapshot());

    return () => {
      runtime.destroy();
      runtimeRef.current = null;
    };
  }, [store]);

  useEffect(() => {
    runtimeRef.current?.render(state);
  }, [state]);

  return (
    <PlayPageCanvasGame
      actions={actions}
      canvasRef={canvasRef}
      highScore={state.gameProgress.high_score}
      statusMessage={
        state.application.status === "playing" ? "Game started" : ""
      }
    />
  );
}

export default function App() {
  const [store] = useState(() => createProdCanvasGameStore());

  useEffect(() => installTestBridge(store), [store]);

  return (
    <ProdCanvasGameProvider store={store}>
      <div
        data-setfarm-root="canvas-game"
        data-testid="setfarm-app-root"
        className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-sky-500 selection:text-white flex flex-col"
      >
        <CanvasGame />
      </div>
    </ProdCanvasGameProvider>
  );
}
