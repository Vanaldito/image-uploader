import express from "express";
import path from "path";

import assetsRouter from "./src/routes/assets";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(assetsRouter);
}

/* Add you routes here */

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
