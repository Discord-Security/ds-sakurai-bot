module.exports = async (client, interaction) => {
	const argumentos = interaction.customId.split(" ");

	interaction.reply({ content: "Feito!" });

	const guild = await client.db.Guilds.findOne({ _id: argumentos[2] });
	if (guild) {
		guild.staffs.push({ _id: argumentos[1], function: argumentos[3] });
		const member = interaction.guild.members.cache.get(argumentos[1]);
		member.roles.add("1106772028280815707");
		if (guild.roleId && guild.roleId !== "") {
			member.roles.add(guild.roleId);
			guild.save();
		} else {
			const server = client.guilds.cache.get(argumentos[2]);
			interaction.guild.roles
				.create({
					name: server ? server.name : "Sakurai não detectou?",
					color: "#5d83b3",
					reason: "Novo cargo para registro do utilizador",
				})
				.then((role) => {
					member.roles.add(role);
					guild.roleId = role.id;
					guild.save();
				});
		}
	} else {
		return interaction.reply(
			"O servidor precisa ser registrado primeiro..."
		);
	}
};
