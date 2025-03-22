import { getSessionId, saveSessionId } from "../services/session";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";
  
export interface StartGameResponse {
  message: string;
  session_id: string;
  secret_country: string; // TODO: Remove this from UI later!
  context: string;
}


export const startGame = async (): Promise<StartGameResponse> => {
  const response = await fetch(`${API_BASE_URL}/start_game`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) throw new Error("Failed to start game");
  const responseJson = await response.json();
  saveSessionId(responseJson.session_id);
  return await responseJson;
};

export async function askQuestion(question: string, onMessageChunk: (chunk: string) => void) {
  // Check session is set
  const sessionId = getSessionId();
  if (!sessionId) throw new Error("Session ID missing. Please start a new game.");
  
  const response = await fetch(`${API_BASE_URL}/ask_stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Session-ID": sessionId,
    },
    body: JSON.stringify({ question }),
  });

  if (!response.body) {
    throw new Error("Response body is empty.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullMessage = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    fullMessage += chunk;
    onMessageChunk(chunk);  // Update UI with each chunk progressively
  }

  return fullMessage;
  
}
