require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const interval = 1000;

client.on("messageCreate", (m) => {
  if (m.author.bot) {
    return;
  }
  m.reply("hello");
});

client.login( process.env.TOKEN
);
