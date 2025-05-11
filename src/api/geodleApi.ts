import { getSessionId, saveSessionId } from "../services/session";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";
  
export interface StartGameResponse {
  message: string;
  session_id: string;
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

export async function validateAnswer(fullAnswer: string): Promise<boolean> {
  const sessionId = getSessionId();
  if (!sessionId) throw new Error("Session ID missing. Please start a new game.");

  const response = await fetch(`${API_BASE_URL}/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Session-ID": sessionId,
    },
    body: JSON.stringify({ full_answer: fullAnswer }),
  });

  if (!response.ok) {
    throw new Error("Validation request failed.");
  }

  const data = await response.json();
  return data.is_game_over;
}

export async function logSession(sessionId: string): Promise<void> {
  const time = new Date().toISOString();

  try {
    const response = await fetch(`${API_BASE_URL}/log-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, time }),
    });

    if (!response.ok) {
      throw new Error(`Failed to log session: ${response.statusText}`);
    }
  } catch (err) {
    console.error("Error logging session:", err);
  }
}
