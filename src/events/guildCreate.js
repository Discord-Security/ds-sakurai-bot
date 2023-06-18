const discord = require("discord.js");

module.exports = async (client, guild) => {
	const embed = new discord.EmbedBuilder()
		.setTitle(guild.name)
		.addFields([
			{ name: "👑 Dono:", value: guild.ownerId, inline: true },
			{
				name: "👥 Usuários:",
				value: guild.memberCount.toString(),
				inline: true,
			},
			{ name: "🆔", value: guild.id.toString(), inline: true },
		])
		.setThumbnail(guild.iconURL({ dynamic: true }))
		.setColor(client.cor);

	client.channels.cache.get(client.canais.logs).send({ embeds: [embed] });
	const db = await client.db.Guilds.findOne({ _id: guild.id });
	if (!db) new client.db.Guilds({ _id: guild.id }).save();
};
