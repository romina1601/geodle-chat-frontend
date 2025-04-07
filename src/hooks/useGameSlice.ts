import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export function useGameSlice() {
  const game = useSelector((state: RootState) => state.game);

  return {
    sessionStarted: game?.sessionStarted ?? false,
    gameOver: game?.gameOver ?? false,
    messages: game?.messages ?? [],
  };
}
