// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Play Page - Canvas Game
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Preserve the generated action-input state and exact payload transport
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state


export type PlayPageCanvasGameActionId = "start-game-1";

export interface PlayPageCanvasGameProps {
  actions?: {
    "start-game-1"?: () => void;
  };

}

export type PlayPageCanvasGameActionCallbacks = NonNullable<PlayPageCanvasGameProps["actions"]>;

export function PlayPageCanvasGame({ actions }: PlayPageCanvasGameProps) {
  return (
    <>
      {/* Root Surface: SURF_PLAY_PAGE */}
        <main data-surface-id="SURF_PLAY_PAGE" className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 w-full max-w-6xl mx-auto" data-setfarm-element-ref="E000001" data-observable-refs="OBS_START_GAME_REMAINS_ON_PLAY_ROUTE">
          
          {/* Header Brand Chrome (Non-actionable decorative header) */}
          <header className="w-full flex items-center justify-between py-4 px-6 mb-8 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center font-black text-white text-lg tracking-wider shadow-md shadow-sky-500/20">
                C
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight">Canvas Game</h1>
                <p className="text-xs text-slate-400">Play Mode</p>
              </div>
            </div>
            
            {/* Stats Display Area containing high score surface */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2">
                <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">High Score:</span>
                {/* Contained Surface: SURF_HIGH_SCORE_VALUE */}
                {/* Before phase assertion expects empty visible_text "" */}
                <span data-surface-id="SURF_HIGH_SCORE_VALUE" className="font-mono text-sm font-bold text-sky-400 min-w-[12px] inline-block" data-setfarm-element-ref="E000002" data-observable-refs="OBS_START_GAME_PERSISTED_HIGH_SCORE_DISPLAY"></span>
              </div>
            </div>
          </header>
      
          {/* Game Viewport Container */}
          <section className="w-full flex flex-col items-center bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            {/* Glow ambient light background effect */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
            {/* Action Toolbar with Start Button & Status Message */}
            <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Declared Primary Button: CSLOT_START_GAME_START_BUTTON / ACT_START_GAME */}
                <button type="button" data-action="ACT_START_GAME" data-control-slot="CSLOT_START_GAME_START_BUTTON" className="px-8 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-base rounded-xl shadow-lg shadow-sky-500/25 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-95 cursor-pointer" data-setfarm-element-ref="E000003" data-observable-refs="OBS_START_GAME_START_BUTTON_REMAINS_USABLE" data-action-id="start-game-1" onClick={actions?.["start-game-1"]}>
                  Start Game
                </button>
              </div>
      
              {/* Contained Surface: SURF_STATUS_MESSAGE */}
              {/* Expected before: empty text; after: "Game started" */}
              <div className="flex items-center min-h-[44px]">
                <div data-surface-id="SURF_STATUS_MESSAGE" className="text-sm font-medium text-slate-300 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2 min-h-[38px] flex items-center justify-center" data-setfarm-element-ref="E000004" data-observable-refs="OBS_START_GAME_GAME_STARTED_MESSAGE"></div>
              </div>
            </div>
      
            {/* Contained Surface: SURF_GAME_CANVAS */}
            {/* The game arena / canvas container */}
            <div className="w-full max-w-3xl flex justify-center items-center">
              <canvas data-surface-id="SURF_GAME_CANVAS" width="768" height="480" className="w-full aspect-[16/10] bg-slate-950 border-2 border-slate-800 rounded-2xl shadow-inner block object-contain" data-setfarm-element-ref="E000005" data-observable-refs="OBS_START_GAME_CANVAS_REMAINS_VISIBLE">
              </canvas>
            </div>
      
            {/* Instructions chrome (strictly non-actionable elements) */}
            <div className="w-full max-w-3xl mt-6 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Ready to play
              </span>
              <span className="tracking-wide">Interactive Canvas Environment</span>
            </div>
          </section>
        </main>
    </>
  );
}
