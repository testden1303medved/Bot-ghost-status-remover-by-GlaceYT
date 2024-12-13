const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();
const express = require('express');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ],
});

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const imagePath = path.join(__dirname, 'index.html');
  res.sendFile(imagePath);
});
app.listen(port, () => {
  console.log('\x1b[36m[ SERVER ]\x1b[0m', '\x1b[32m SH : http://localhost:' + port + ' ✅\x1b[0m');
});

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log('[ LOGIN ]', `Logged in as: ${client.user.tag} ✅`);
    console.log('[ INFO  ]', `Bot ID: ${client.user.id}`);
    console.log('[ INFO  ]', `Connected to ${client.guilds.cache.size} server(s)`);
  } catch (error) {
    console.error('[ ERROR ]', 'Failed to log in:', error);
    process.exit(1);
  }
}

function updateStatus() {
  client.user.setPresence({
    activities: [{ name: "Смотрит по всему серверу", type: ActivityType.Custom }],
    status: 'idle',
  });
}

function heartbeat() {
  setInterval(() => {
    console.log('[ HEARTBEAT ]', `Bot is alive at ${new Date().toLocaleTimeString()}`);
  }, 30000);
}

client.once('ready', () => {
  console.log('[ INFO  ]', `Ping: ${client.ws.ping} ms`);
  updateStatus();
  setInterval(updateStatus, 10000);
  heartbeat();
});

login();
