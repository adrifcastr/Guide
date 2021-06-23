const fs = require('fs');
const Discord = require('discord.js');
const { token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;

	if (!client.commands.has(interaction.commandName)) return;

	try {
		await client.commands.get(interaction.commandName).run(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while running this command!', ephemeral: true });
	}
});

client.login(token);