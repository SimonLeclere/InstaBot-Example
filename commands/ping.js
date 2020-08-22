module.exports = {
	name: 'ping',
    description: 'Permet d\'obtenir la latence du bot',
    usage: '',
    aliases: ['latency'],
    displayedOnHelp: false,
	execute(message, client) {

        const start = Date.now();

		message.author.send('Test de latence...').then(() => {
			const diff = (Date.now() - start);
			message.author.send(`Latence du bot : ${diff}ms.`);
        })
	},
};