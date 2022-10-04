const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('./configs/config.json')
const fs = require('fs')

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

client.eventos = new Collection();
client.comandos = new Collection();
client.aliases = new Collection();
client.prefix = config.prefix
module.exports = client;
client.categories = fs.readdirSync("./comandos/");

["comandos"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const { Eventos } = require('./handlers/eventos');
Eventos(client, '/eventos/');

client.login(config.token)