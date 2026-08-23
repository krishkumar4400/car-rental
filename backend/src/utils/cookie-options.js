export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "development" ? "strict" : "lax",
  maxAge: process.env.COOKIE_MAX_AGE,
};
