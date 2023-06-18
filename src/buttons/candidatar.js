const discord = require("discord.js");

module.exports = async (client, interaction) => {
	const modal = new discord.ModalBuilder()
		.setCustomId("candidatar")
		.setTitle("Formulário de candidatação");

	const IdadeInput = new discord.TextInputBuilder()
		.setCustomId("IdadeInput")
		.setLabel("Qual sua idade?")
		.setStyle(discord.TextInputStyle.Short)
		.setRequired(true);

	const firstActionRow = new discord.ActionRowBuilder().addComponents(
		IdadeInput
	);

	const MotivoInput = new discord.TextInputBuilder()
		.setCustomId("MotivoInput")
		.setLabel("Porque você gostaria de se juntar á rede?")
		.setStyle(discord.TextInputStyle.Paragraph)
		.setMaxLength(512)
		.setRequired(true);

	const secondActionRow = new discord.ActionRowBuilder().addComponents(
		MotivoInput
	);

	const IDInput = new discord.TextInputBuilder()
		.setCustomId("IDInput")
		.setLabel("Qual o id do seu servidor?")
		.setStyle(discord.TextInputStyle.Paragraph)
		.setMaxLength(20)
		.setRequired(true);

	const thirdActionRow = new discord.ActionRowBuilder().addComponents(
		IDInput
	);

	const FuncaoInput = new discord.TextInputBuilder()
		.setCustomId("FunçãoInput")
		.setLabel("Qual a sua função no servidor?")
		.setStyle(discord.TextInputStyle.Paragraph)
		.setMaxLength(20)
		.setRequired(true);

	const fourActionRow = new discord.ActionRowBuilder().addComponents(
		FuncaoInput
	);

	modal.addComponents(
		firstActionRow,
		secondActionRow,
		thirdActionRow,
		fourActionRow
	);

	await interaction.showModal(modal);

	const i = await interaction
		.awaitModalSubmit({
			time: 300000,
			filter: (i) => i.user.id === interaction.user.id,
		})
		.catch((error) => {
			if (error) return null;
		});

	if (i) {
		i.reply({
			content:
				"Sua candidatação foi enviada com sucesso e está em análise.",
			ephemeral: true,
		});
		const motivo = i.fields.getTextInputValue("MotivoInput");
		const idade = i.fields.getTextInputValue("IdadeInput");
		const id = i.fields.getTextInputValue("IDInput");
		const funcao = i.fields.getTextInputValue("FunçãoInput");
		const member = interaction.member;
		const approve = new discord.ButtonBuilder()
			.setCustomId(`Registrar ${member.id} ${id} ${funcao}`)
			.setLabel("Registrar")
			.setStyle(2)
			.setEmoji("1026116735759302727");
		const row = new discord.ActionRowBuilder().setComponents(approve);
		const server = client.guilds.cache.get(id);
		const embed = new discord.EmbedBuilder()
			.setTitle(member.user.tag)
			.addFields([
				{
					name: "👑 Solicitador:",
					value: `ID: ${member.id}\nTag: ${member.user.tag}\nIdade: ${idade}\nMotivo: ${motivo}\nFunção: ${funcao}`,
				},
				{
					name: "📜 Servidor:",
					value: `ID: ${id.toString()} Servidor: ${
						server ? server.name : "Desconhecido ou Fora de rede"
					}`,
				},
			])
			.setThumbnail(member.displayAvatarURL({ dynamic: true }))
			.setColor(client.cor);

		client.channels.cache
			.get("1114990055044423782")
			.send({ embeds: [embed], components: [row] });
	}
};
