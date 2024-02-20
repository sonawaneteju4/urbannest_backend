import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import navRouter from "./routes/navMenu.routes.js";
import contactUsRouter from "./routes/contactus.router.js";

app.use("/api/v1/navmenu", navRouter);
app.use("/api/v1/contacus", contactUsRouter);

app.get("/api/v1/", (req, res) => {
  res.send("Hello You Connect To Server");
});

export { app };
