const ALLOWED_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://dn-d-inky.vercel.app, https://dn-d-johanjafet4-gmailcoms-projects.vercel.app"
    : "http://localhost:5173";

export default ALLOWED_ORIGIN;
