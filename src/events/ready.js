const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { readdirSync } = require("fs");
require("dotenv").config();
const { ChalkAdvanced } = require("chalk-advanced");

module.exports = async (client) => {
	const commandFiles = readdirSync("./src/commands/").filter((file) =>
		file.endsWith(".js")
	);
	const commands = [];
	const commandGuildFiles = readdirSync("./src/commands/guildOnly/").filter(
		(file) => file.endsWith(".js")
	);
	const commandsGuild = [];

	for (const file of commandFiles) {
		const command = require(`../commands/${file}`);
		commands.push(command.data.toJSON());
		client.commands.set(command.data.name, command);
	}

	for (const file of commandGuildFiles) {
		const commandGuild = require(`../commands/guildOnly/${file}`);
		commandsGuild.push(commandGuild.data.toJSON());
		client.commandsGuild.set(commandGuild.data.name, commandGuild);
	}

	const rest = new REST({
		version: "10",
	}).setToken(process.env.TOKEN);

	(async () => {
		try {
			await rest.put(Routes.applicationCommands(client.user.id), {
				body: commands,
			});
			console.log(
				`${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green(
					"Sucesso registrado comandos globalmente"
				)}`
			);
			await rest.put(
				Routes.applicationGuildCommands(
					client.user.id,
					"1106771396757037076"
				),
				{
					body: commandsGuild,
				}
			);

			console.log(
				`${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green(
					"Sucesso registrado comandos localmente"
				)}`
			);
		} catch (err) {
			if (err) console.error(err);
		}
	})();
	client.user.setPresence({
		activities: [{ name: `Sakuraizando!`, type: 0 }],
		status: "dnd",
	});
};
