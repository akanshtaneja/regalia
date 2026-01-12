const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 10000;

server.use(middlewares);
server.use(jsonServer.bodyParser);


server.use("/api", router);


server.get("/", (req, res) => {
  res.send("JSON Server is running");
});

server.listen(PORT, () => {
  console.log("JSON Server running on port", PORT);
});
