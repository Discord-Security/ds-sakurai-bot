const discord = require("discord.js");

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName("unban")
		.setNameLocalizations({
			"pt-BR": "desbanir",
			"en-US": "unban",
		})
		.setDescription("Realize um desbanimento")
		.setDefaultMemberPermissions(discord.PermissionFlagsBits.BanMembers)
		.addUserOption((option) =>
			option
				.setName("usuário")
				.setNameLocalizations({
					"pt-BR": "usuário",
					"en-US": "user",
				})
				.setDescription("Identifique o ID do utilizador")
				.setRequired(true)
		),
	async execute(interaction, client) {
		const usuario = interaction.options.getUser("usuário");
		await interaction.guild.members.unban(usuario).then(
			interaction.reply({
				content: "Desbanido com sucesso apenas neste servidor.",
				ephemeral: true,
			})
		);
	},
};
