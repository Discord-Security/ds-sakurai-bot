module.exports = async (client, interaction) => {
	const id = interaction.customId.replace("approve-", "");
	interaction.reply({
		content: `Prontinho, Servidor ${id} aprovado com sucesso!`,
	});
	const guild = await client.db.Guilds.findOne({ _id: id });
	if (guild) {
		guild.approved = true;
		guild.save();
	} else {
		new client.db.Guilds({ _id: id, approved: true }).save();
	}
};
