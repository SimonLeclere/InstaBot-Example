module.exports = {
    name: 'help',
    description: 'Permet d\'obtenir la liste des commandes ou bien des informations à propos d\'une commande',
    usage: '[commande]',
    aliases: ['aide'],
    displayedOnHelp: true,
	execute(message, client) {

        if(!message.args.length) {
            message.author.send(`Liste des commandes : \n${client.commands.filter(cmd => cmd.displayedOnHelp === true).map(cmd => cmd.name).join('\n')}\n\nUtilisez la commande !help <commande> pour obtenir plus d'informations à propos d'une commande.`);
        }

        else {
            const name = message.args[0].toLowerCase();
		    let command = client.commands.get(name) || client.commands.find(c => c.aliases && c.aliases.includes(name));
            message.author.send(`Nom : ${command.name}\n\nUtilisation : ${client.config.prefix + command.name + ' ' + command.usage}\n\nDescription : ${command.description}`)
        }

	},
};
