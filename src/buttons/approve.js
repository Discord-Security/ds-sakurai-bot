module.exports = async (client, interaction) => {
	const id = interaction.customId.replace("approve-", "");
	interaction.reply({
		content: `Prontinho, Servidor ${id} aprovado com sucesso!`,
	});
	const guildDoc = await client.db.Guilds.findOne({ _id: id });
	if (guildDoc) {
		guildDoc.approved = true;
		guildDoc.save();
	} else {
		new client.db.Guilds({ _id: id, approved: true }).save();
	}
};
