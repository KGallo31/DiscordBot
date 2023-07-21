require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");



async function makeGetRequest(url, m) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      m.reply("That url stinks")
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();

    const entireEntryString = data.substring(data.indexOf("workshopBrowsePagingInfo") + 26, data.indexOf("workshopBrowsePagingInfo") + 50).trim()

    const totalEntires = entireEntryString.substring(entireEntryString.indexOf("of") + 2,entireEntryString.indexOf("of") + 5).trim()

    m.reply("The current total amount of entires for that user is: " + totalEntires)

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function GetTotalEntires(m) {
  try {
    const url = 'https://steamcommunity.com/profiles/76561198906367092/myworkshopfiles/?appid=311210';
    await makeGetRequest(url,m);
  } catch (error) {
    m.reply("Oh shit I broke")
  }
}

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});


client.on("messageCreate", (m) => {
  if (m.author.bot) {
    return;
  } 
  if (m.content.includes("wake up sped")){
    // TODO: Allow the bot to read the message before it replies. It will look for a specific key word before it replies with the total amount of entires.  
    GetTotalEntires(m)
  }
});

client.login( process.env.TOKEN );
