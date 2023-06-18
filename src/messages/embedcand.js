const discord = require("discord.js");

module.exports = async (client, message) => {
	message.delete();
	const row = new discord.ActionRowBuilder().addComponents(
		new discord.ButtonBuilder()
			.setLabel("Candidatar-se")
			.setCustomId("candidatar")
			.setStyle(discord.ButtonStyle.Primary)
	);

	message.channel.send({
		embeds: [
			{
				title: "<:CS_9:1107973443456094219> Candidate-se aqui!",
				description:
					"<:CS_2:1107972385023471626> AAAAAAAA",
				color: parseInt(client.cor.slice(1), 16),
				footer: {
					text: "©️ 桜井 Central Sakurai Todos os direitos reservados.",
				},
			},
		],
		components: [row],
	});
};
