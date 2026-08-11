export const JWT_SECRET: string = process.env.JWT_SECRET ?? (() => {
    throw new Error("JWT_SECRET is not defined");
})();

export const JWT_SECRET_EXPIRY: string = process.env.JWT_SECRET_EXPIRY ?? "7d";
