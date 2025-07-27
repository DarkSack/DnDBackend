const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://dn-d-inky.vercel.app", "https://dn-d-johanjafet4-gmailcoms-projects.vercel.app"]
    : ["http://localhost:5173", "http://localhost:3001"];

export default allowedOrigins;