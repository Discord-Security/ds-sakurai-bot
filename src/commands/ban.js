const discord = require("discord.js");

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName("ban")
		.setNameLocalizations({
			"pt-BR": "banir",
			"en-US": "ban",
		})
		.setDescription("Realize um banimento")
		.setDefaultMemberPermissions(discord.PermissionFlagsBits.BanMembers)
		.addUserOption((option) =>
			option
				.setName("usuário")
				.setNameLocalizations({
					"pt-BR": "usuário",
					"en-US": "user",
				})
				.setDescription("Qual usuário?")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("motivo")
				.setNameLocalizations({ "pt-BR": "motivo", "en-US": "reason" })
				.setDescription("Identifique um motivo.")
		),
	async execute(interaction, client) {
		const usuario = interaction.options.getUser("usuário");
		const motivo =
			interaction.options.getString("motivo") ?? "Sem motivo informado.";
		if (usuario.bot || usuario.id === interaction.member.user.id)
			return interaction.reply({
				content: "Não se pode banir bots oficiais ou a si mesmo.",
			});
		const reason = `Banido com Sakurai, por ${interaction.member.user.tag} - ${motivo}`;
		interaction.guild.bans
			.create(usuario.id, {
				reason,
				deleteMessageSeconds: 1 * 24 * 60 * 60,
			})
			.catch((err) => {
				interaction.channel.send(`Erro: ${err}`);
			});
		interaction.reply({
			content: "Banido com sucesso apenas neste servidor.",
			ephemeral: true,
		});
	},
};
