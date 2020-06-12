const express = require("express");
const app = express();
const port = 3000;

const Discord = require("discord.js");
const client = new Discord.Client();

let auth;

try {
  auth = require("./auth.json");
} catch (error) {
  auth = { token: process.env.TOKEN };
}

client.login(auth.token);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/bot-info", (req, res, next) => {
  let data = client.toJSON();

  let guilds = data["guilds"];
  let channels = data["channels"];
  let users = data["users"];

  res.send({
    guilds_count: guilds.length,
    channels_count: channels.length,
    users_count: users.length,
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
