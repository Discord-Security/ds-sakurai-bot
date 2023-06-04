const discord = require("discord.js");

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName("massban")
		.setNameLocalizations({
			"pt-BR": "banir_em_massa",
			"en-US": "massban",
		})
		.setDescription("Realize múltiplos banimentos")
		.setDefaultMemberPermissions(discord.PermissionFlagsBits.BanMembers)
		.addStringOption((option) =>
			option
				.setName("ids")
				.setDescription(
					"Liste os ID's separando-os com espaços e não vírgulas."
				)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("motivo")
				.setNameLocalizations({ "pt-BR": "motivo", "en-US": "reason" })
				.setDescription("Identifique um motivo.")
				.setAutocomplete(true)
		),
	async execute(interaction, client) {
		const usuario = interaction.options.getString("ids").split(" ");
		const motivo =
			interaction.options.getString("motivo") ?? "Sem motivo informado.";
		const reason = `Banido com Sakurai, por ${interaction.member.user.tag} - ${motivo}`;
		await interaction.deferReply({ ephemeral: true });
		const guild = client.guilds.cache.get(interaction.guild.id);
		usuario.forEach((banido) =>
			guild.bans.create(banido, {
				reason,
				deleteMessageSeconds: 1 * 24 * 60 * 60,
			})
		);
		interaction.editReply({
			content: "Banidos com sucesso.",
		});
	},
};
