import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  sessionStarted: boolean;
  gameOver: boolean;
  messages: string[];
}

const initialState: GameState = {
  sessionStarted: false,
  gameOver: false,
  messages: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSessionStarted(state, action: PayloadAction<boolean>) {
      state.sessionStarted = action.payload;
    },
    setGameOver(state, action: PayloadAction<boolean>) {
      state.gameOver = action.payload;
    },
    addMessage(state, action: PayloadAction<string>) {
      state.messages.push(action.payload);
    },
    resetMessages(state) {
      state.messages = [];
    },
    // Reducer for appending chunks
    updateLastMessage(state, action: PayloadAction<string>) {
      if (state.messages.length > 0) {
        state.messages[state.messages.length - 1] += action.payload;
      }
    },
  },
});

export const { setSessionStarted, setGameOver, addMessage, resetMessages, updateLastMessage } = gameSlice.actions;
export default gameSlice.reducer;
