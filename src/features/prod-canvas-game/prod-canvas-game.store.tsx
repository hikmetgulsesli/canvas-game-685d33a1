import {
  createContext,
  useContext,
  useRef,
  useSyncExternalStore,
  type PropsWithChildren,
} from "react";
import {
  createProdCanvasGameRepo,
  type ProdCanvasGameRepo,
} from "./prod-canvas-game.repo";
import type {
  EvidenceStateSnapshot,
  ProdCanvasGameState,
} from "./prod-canvas-game.types";

type Listener = () => void;

export class ProdCanvasGameStore {
  private state: ProdCanvasGameState;
  private readonly listeners = new Set<Listener>();

  constructor(private readonly repo: ProdCanvasGameRepo) {
    this.state = {
      application: { status: "ready" },
      gameProgress: { high_score: this.repo.loadHighScore() },
    };
  }

  readonly getSnapshot = (): ProdCanvasGameState => this.state;

  readonly subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getEvidenceState(): EvidenceStateSnapshot {
    return {
      states: {
        STATE_APPLICATION: { ...this.state.application },
        STATE_GAME_PROGRESS: { ...this.state.gameProgress },
      },
    };
  }

  startGame(): ProdCanvasGameState {
    this.repo.saveHighScore(0);
    this.state = {
      application: { status: "playing" },
      gameProgress: { high_score: 0 },
    };
    this.listeners.forEach((listener) => listener());
    return this.state;
  }
}

export function createProdCanvasGameStore(
  repo: ProdCanvasGameRepo = createProdCanvasGameRepo(),
): ProdCanvasGameStore {
  return new ProdCanvasGameStore(repo);
}

const ProdCanvasGameStoreContext =
  createContext<ProdCanvasGameStore | null>(null);

export function ProdCanvasGameProvider({
  children,
  store,
}: PropsWithChildren<{ store?: ProdCanvasGameStore }>) {
  const storeRef = useRef<ProdCanvasGameStore | null>(null);
  if (storeRef.current === null) {
    storeRef.current = store ?? createProdCanvasGameStore();
  }

  return (
    <ProdCanvasGameStoreContext.Provider value={storeRef.current}>
      {children}
    </ProdCanvasGameStoreContext.Provider>
  );
}

export function useProdCanvasGameStore(): ProdCanvasGameStore {
  const store = useContext(ProdCanvasGameStoreContext);
  if (!store) {
    throw new Error(
      "useProdCanvasGameStore must be used inside ProdCanvasGameProvider",
    );
  }
  return store;
}

export function useProdCanvasGameState(): ProdCanvasGameState {
  const store = useProdCanvasGameStore();
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot,
  );
}
