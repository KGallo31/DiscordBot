require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const cheerio = require('cheerio');

async function makeGetRequest(url, m) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      m.reply("That url stinks")
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const rawHtml = await response.text()
    const loadedHtml = cheerio.load(rawHtml)
    const pageInfoClassText = loadedHtml("div.workshopBrowsePagingInfo").text()
    const totalEntires = pageInfoClassText.substring(pageInfoClassText.length-9 ,pageInfoClassText.length-8)
    m.reply("The current total amount of entires for that user is: " + totalEntires)
  }catch (error) {
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

const interval = 1000;

client.on("messageCreate", (m) => {
  if (m.author.bot) {
    return;
  } 
  if (m.content.toLowerCase().includes("wake up sped")){
    GetTotalEntires(m)
  }else{
    m.reply("Ngl you're gonna have to say the magic phrase")
  }
});

client.login( process.env.TOKEN
);
