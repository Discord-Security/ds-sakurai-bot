module.exports = (client, interaction) => {
	if (interaction.isStringSelectMenu()) {
		if (/^\d{19}$/.test(interaction.values[0])) {
			const role = interaction.guild.roles.cache.get(
				interaction.values[0]
			);
			if (interaction.member.roles.cache.has(role.id)) {
				interaction.member.roles.remove(role);
				interaction.reply({
					content: `Removido <@&${role.id}> com sucesso.`,
					ephemeral: true,
				});
			} else {
				interaction.reply({
					content: `Adicionado <@&${role.id}> com sucesso.`,
					ephemeral: true,
				});
				interaction.member.roles.add(role);
			}
		} else {
			require("../menu/" + interaction.customId)(client, interaction);
		}
	}
	if (interaction.isButton()) {
		if (interaction.customId.startsWith("approve"))
			return require("../buttons/approve")(client, interaction);
		if (interaction.customId.startsWith("reject"))
			return require("../buttons/reject")(client, interaction);
		if (interaction.customId.startsWith("Registrar"))
			return require("../buttons/registrar")(client, interaction);
		if (interaction.customId.endsWith("confirm")) return;
		require("../buttons/" + interaction.customId)(client, interaction);
	}
	if (interaction.isAutocomplete()) {
		const command = client.commands.get(interaction.commandName);
		if (!command) {
			const guildOnlyCommand = client.commandsGuild.get(
				interaction.commandName
			);
			guildOnlyCommand.autocomplete(interaction, client);
		} else command.autocomplete(interaction, client);
	}
	if (interaction.isChatInputCommand()) {
		const command = client.commands.get(interaction.commandName);
		if (!command) {
			const guildOnlyCommand = client.commandsGuild.get(
				interaction.commandName
			);
			if (!guildOnlyCommand) return;
			try {
				guildOnlyCommand.execute(interaction, client);
			} catch (err) {
				if (err) return interaction.reply(err);
			}
		} else {
			try {
				command.execute(interaction, client);
			} catch (err) {
				if (err) console.error(err);
				interaction.reply({
					content: "Um erro foi executado no meu grande algoritmo.",
					ephemeral: true,
				});
			}
		}
	}
};
