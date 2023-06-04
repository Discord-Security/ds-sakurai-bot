const discord = require("discord.js");

module.exports = async (client, interaction) => {
	const tagger = interaction.user.tag;
	if (interaction.guild.channels.cache.find((c) => c.name === `${tagger}`)) {
		const c = interaction.guild.channels.cache.find(
			(c) => c.name === `${tagger}-suporte`
		);
		interaction.reply({
			content: `Você já possui um ticket aberto em ${c}.`,
			ephemeral: true,
		});
	} else {
		interaction.guild.channels
			.create({
				name: `${tagger}-suporte`,
				type: 0,
				parent: "1106772087592456304",
				permissionOverwrites: [
					{
						id: interaction.guild.id,
						deny: [discord.PermissionFlagsBits.ViewChannel],
					},
					{
						id: interaction.user.id,
						allow: [
							discord.PermissionFlagsBits.ViewChannel,
							discord.PermissionFlagsBits.SendMessages,
							discord.PermissionFlagsBits.AttachFiles,
							discord.PermissionFlagsBits.AddReactions,
						],
					},
					{
						id: "1107130006209056859",
						allow: [
							discord.PermissionFlagsBits.ViewChannel,
							discord.PermissionFlagsBits.SendMessages,
							discord.PermissionFlagsBits.AttachFiles,
							discord.PermissionFlagsBits.AddReactions,
						],
					},
				],
			})
			.then((c) => {
				interaction.reply({
					content: `Seu ticket foi aberto em ${c}.`,
					ephemeral: true,
				});

				const embed = new discord.EmbedBuilder()
					.setAuthor({
						name: interaction.guild.name,
						iconURL: interaction.guild.iconURL({ dynamic: true }),
					})
					.setColor(client.cor)
					.setDescription(
						`Olá, ${interaction.user.username}, boas vindas ao seu ticket!\nAguarde alguns instantes para receber ajuda.`
					);

				const botao = new discord.ActionRowBuilder().addComponents(
					new discord.ButtonBuilder()
						.setCustomId("ft")
						.setEmoji("🔒")
						.setLabel("Fechar Ticket")
						.setStyle(2)
				);

				c.send({
					content: "<@&1107130006209056859>",
					embeds: [embed],
					components: [botao],
				}).then((msg) => msg.pin());
			});
	}
};
