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

	client.channels.cache.get("1107376183412269056").send({ embeds: [embed] });
};