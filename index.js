const Insta = require('@androz2091/insta.js');
const Collection = require('@discordjs/collection');
const fs = require('fs');

const client = new Insta.Client();

client.commands = new Collection();
client.config = require('./config.json');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.on('connected', () => {
    console.log(`Logged in as ${client.user.username}`);
});

client.on('messageCreate', (message) => {
    if (message.authorID === client.user.id || !message.content.startsWith(client.config.prefix)) return

	message.args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
	const commandName = message.args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	try {
		command.execute(message, client);
	} catch (error) {
		console.error(error);
		message.author.send('Erreur durant l\'exécution de la commande.');
    }
});

client.login(client.config.username, client.config.password);