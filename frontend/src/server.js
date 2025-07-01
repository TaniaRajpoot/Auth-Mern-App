const dev = window.location.hostname === "localhost";

export const backend_url = dev
  ? "http://localhost:8080"
  : "https://auth-mern-api-livid.vercel.app";
