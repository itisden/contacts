const tokensKey = "tokens";

export const setTokens = (idToken: string, refreshToken: string) => {
  localStorage.setItem(tokensKey, JSON.stringify({ idToken, refreshToken }));
};

export const getTokens = (): {
  idToken: string;
  refreshToken: string;
} | null => {
  const tokens = localStorage.getItem(tokensKey);

  if (!tokens) {
    return null;
  }

  return JSON.parse(tokens);
};

export const clearTokens = () => {
  localStorage.removeItem(tokensKey);
};
