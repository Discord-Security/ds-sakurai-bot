const discord = require("discord.js");

module.exports = async (client, guild) => {
	const embed = new discord.EmbedBuilder()
		.setTitle(guild.name)
		.addFields([{ name: "🆔", value: guild.id.toString(), inline: true }])
		.setThumbnail(guild.iconURL({ dynamic: true }))
		.setColor(client.cor);

	client.channels.cache.get("1107376183412269056").send({ embeds: [embed] });
};
