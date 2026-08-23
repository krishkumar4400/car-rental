import "dotenv/config";
import app from "./src/app.js";
import http from "http";
import connectToDB from "./src/config/database.js";

const server = http.createServer(app);

const port = process.env.PORT || 5000;

await connectToDB();

server.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
