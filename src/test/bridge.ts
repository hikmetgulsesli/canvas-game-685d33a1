import {
  ACT_START_GAME,
  actStartGame,
} from "../features/surf-play-page/act_start_game";
import type { ProdCanvasGameStore } from "../features/prod-canvas-game/prod-canvas-game.store";
import type {
  ActionInvocationRequest,
  ActionInvocationResult,
  EvidenceStates,
  EvidenceStateSnapshot,
} from "../features/prod-canvas-game/prod-canvas-game.types";

export interface SetfarmTestBridge {
  readonly states: EvidenceStates;
  getState(): EvidenceStateSnapshot;
  invokeAction(
    action: string | ActionInvocationRequest,
    input?: Record<string, unknown>,
  ): Promise<ActionInvocationResult>;
}

declare global {
  interface Window {
    __SETFARM_TEST_BRIDGE__?: SetfarmTestBridge;
    __SETFARM_SCENARIO_MODE__?: string;
  }
}

/** Installs the sealed browser capture surface over genuine application state. */
export function installTestBridge(store: ProdCanvasGameStore): () => void {
  const previousBridge = window.__SETFARM_TEST_BRIDGE__;
  const previousScenarioMode = window.__SETFARM_SCENARIO_MODE__;

  const bridge: SetfarmTestBridge = {
    get states() {
      return store.getEvidenceState().states;
    },

    getState() {
      return store.getEvidenceState();
    },

    async invokeAction(action, _input = {}) {
      const actionRef =
        typeof action === "string" ? action : action.actionRef;
      if (actionRef !== ACT_START_GAME) {
        throw new Error(`Unsupported Setfarm action: ${actionRef}`);
      }

      const state = actStartGame(store);
      return {
        ok: true,
        actionRef: ACT_START_GAME,
        state,
        states: store.getEvidenceState().states,
      };
    },
  };

  window.__SETFARM_TEST_BRIDGE__ = bridge;
  window.__SETFARM_SCENARIO_MODE__ = "manual";

  return () => {
    if (window.__SETFARM_TEST_BRIDGE__ === bridge) {
      if (previousBridge) {
        window.__SETFARM_TEST_BRIDGE__ = previousBridge;
      } else {
        delete window.__SETFARM_TEST_BRIDGE__;
      }
    }
    if (previousScenarioMode === undefined) {
      delete window.__SETFARM_SCENARIO_MODE__;
    } else {
      window.__SETFARM_SCENARIO_MODE__ = previousScenarioMode;
    }
  };
}
