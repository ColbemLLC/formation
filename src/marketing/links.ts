// Where login/register live. Empty = same origin (colbe.cc).
// During maintenance set NEXT_PUBLIC_AUTH_URL=https://dash.colbe.cc
// and remove it (or set https://colbe.cc) when maintenance ends.
const AUTH_URL = (process.env.NEXT_PUBLIC_AUTH_URL ?? "").replace(/\/$/, "")

export const LOGIN_URL = `${AUTH_URL}/login`
export const REGISTER_URL = `${AUTH_URL}/register`