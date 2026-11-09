export type ApplicationStatus = "ready" | "playing";

export interface ApplicationState {
  status: ApplicationStatus;
}

export interface GameProgressState {
  high_score: number | null;
}

export interface ProdCanvasGameState {
  application: ApplicationState;
  gameProgress: GameProgressState;
}

export interface EvidenceStates {
  STATE_APPLICATION: ApplicationState;
  STATE_GAME_PROGRESS: GameProgressState;
}

export interface EvidenceStateSnapshot {
  states: EvidenceStates;
}

export interface ActionInvocationRequest {
  actionRef: string;
  input?: Record<string, unknown>;
  payload?: Record<string, unknown>;
}

export interface ActionInvocationResult extends EvidenceStateSnapshot {
  ok: true;
  actionRef: "ACT_START_GAME";
  state: ProdCanvasGameState;
}
