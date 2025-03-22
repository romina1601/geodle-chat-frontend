const SESSION_ID_KEY = process.env.REACT_APP_SESSION_ID_KEY || "default_session_key";

export function saveSessionId(id: string) {
  localStorage.setItem(SESSION_ID_KEY, id);
}

export function getSessionId(): string | null {
  return localStorage.getItem(SESSION_ID_KEY);
}
