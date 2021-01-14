// require your server and start

require("dotenv").config();

const server = require("./api/server.js");

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`\n* Server Running on ${PORT}*\n`);
});
