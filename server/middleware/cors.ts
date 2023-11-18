import cors from "cors";

export const middlewareCORS = () =>
  cors({
    origin: (
      origin: string | undefined,
      callback: (error: null | Error, isAllowed?: boolean) => void
    ) => {
      const ALLOWED_ORIGINS = [
        "http://localhost:8080",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://ellocoqueama.com",
        "https://anime-mern-api.vercel.app",
      ];

      if (!origin) {
        return callback(null, true);
      } else if (ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
  });
