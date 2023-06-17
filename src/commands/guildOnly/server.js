const discord = require("discord.js");

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName("server")
		.setDescription("Coisas para servidores!")
		.setDefaultMemberPermissions(discord.PermissionFlagsBits.Administrator)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("info")
				.setDescription("Informações sobre um servidor guardadas.")
				.addStringOption((option) =>
					option
						.setName("server")
						.setNameLocalizations({
							"en-US": "server",
							"pt-BR": "servidor",
						})
						.setDescription("ID de um servidor")
						.setAutocomplete(true)
						.setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("change_invite")
				.setNameLocalizations({
					"pt-BR": "editar_invite",
					"en-US": "change_invite",
				})
				.setDescription("Altere o convite do servidor")
				.addStringOption((option) =>
					option
						.setName("server")
						.setNameLocalizations({
							"en-US": "server",
							"pt-BR": "servidor",
						})
						.setDescription("ID de um servidor")
						.setAutocomplete(true)
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("invite")
						.setDescription("Defina um invite novo")
						.setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand.setName("embed").setDescription("Coloque a embed")
		),
	async autocomplete(interaction, client) {
		const focusedValue = interaction.options.getFocused(true);
		const guild = await client.db.Guilds.find({});

		if (guild) {
			await interaction.respond(
				guild
					.filter((sv) => sv._id.includes(focusedValue.value))
					.map((choice) => ({
						name: choice._id,
						value: choice._id,
					}))
			);
		} else {
			await interaction.respond({
				name: "Não há nada listado.",
				value: "Não há nada listado.",
			});
		}
	},
	async execute(interaction, client) {
		const server = interaction.options.getString("server") || null;
		switch (interaction.options._subcommand) {
			case "info": {
				const doc = await client.db.Guilds.findOne({ _id: server });
				if (doc) {
					const emb = new discord.EmbedBuilder()
						.setTitle("Info do servidor " + server)
						.setDescription(
							`Invite: ${doc.invite}\nAprovado: ${doc.approved}\nCargo: <@&${doc.roleId}>\nRepresentante: ${doc.representative}`
						)
						.setColor(client.cor);
					interaction.reply({ embeds: [emb] });
				} else {
					interaction.reply({
						content: "Não há nada encontrado por minha parte.",
					});
				}
				break;
			}
			case "change_invite": {
				const doc = await client.db.Guilds.findOne({ _id: server });
				if (doc) {
					doc.invite = interaction.options.getString("invite");
					doc.save();
					interaction.reply({ content: "Sucesso!" });
				} else {
					interaction.reply({
						content:
							"Não foi possível encontrar um servidor no meu banco de dados... estranho!",
					});
				}
				break;
			}
			case "embed": {
				const doc = await client.db.Guilds.find({ approved: true });
				const hanabi = [];
				const hana = [];
				const sakura = [];
				const kareru = [];
				const hatsuga = [];
				const koeda = [];
				const tsubomi = [];
				const saku = [];
				await doc.map(async (server) => {
					const guild = await client.guilds.fetch(server._id);
					if (guild && server.invite) {
						console.log(guild.memberCount);
						const message = `[${guild.name}](${server.invite})`;
						if (guild.memberCount > 10000)
							return hanabi.push(message);
						if (guild.memberCount > 8000) return hana.push(message);
						if (guild.memberCount > 6000)
							return sakura.push(message);
						if (guild.memberCount > 4000)
							return kareru.push(message);
						if (guild.memberCount > 2000)
							return hatsuga.push(message);
						if (guild.memberCount > 1000)
							return koeda.push(message);
						if (guild.memberCount > 500)
							return tsubomi.push(message);
						if (guild.memberCount > 100 && guild.memberCount <= 500)
							return saku.push(message);
						else return 0;
					} else return 0;
				});
				const emb = new discord.EmbedBuilder()
					.setTitle(
						"***<:central_sakurai:1107736400050278420> |桜井 Central Sakurai***"
					)
					.setDescription(
						"> <:Cs_10:1108104342109696000>**_Boas-vindas, somos a 桜井  Central Sakurai, temos como objetivo tornar a nossa comunidade animes & games um lugar melhor para todos, visando o Respeito entre todos,a 桜井 C.S é um ótimo lugar pra aprender a administrar vosso servidor, temos donos e staff competentes e experientes dispostos a ajudar com o seu servidor. _**\n> <:CS_7:1107973357531570216>**_Caso queira ingressar preencha o [Formulário](https://forms.gle/qYz39M1ZUhr8VzXT6) _**"
					)
					.addFields(
						{
							name: "<:Cs_10:1108104342109696000>  | Hanabi",
							value: hanabi.join("\n"),
						},
						{
							name: "<:Cs_10:1108104342109696000> | Hana",
							value: hana.join("\n"),
						},
						{
							name: "<:Cs_10:1108104342109696000> | Sakura",
							value: sakura.join("\n"),
						},
						{
							name: "<:Cs_10:1108104342109696000> | Kareru",
							value: kareru.join("\n"),
						},
						{
							name: "<:Cs_10:1108104342109696000> | Hatsuga",
							value: hatsuga.join("\n"),
						},
						{
							name: "<:Cs_10:1108104342109696000> | Koeda",
							value: koeda.join("\n"),
						},
						{
							name: "<:Cs_10:1108104342109696000> | Tsubomi",
							value: tsubomi.join("\n"),
						},
						{
							name: "<:Cs_10:1108104342109696000> | Saku",
							value: saku.join("\n"),
						}
					)
					.setColor("#e2adad")
					.setImage("https://imgur.com/5ahR9Yp.gif")
					.setFooter({
						text: "© 2023 桜井 Central Sakurai Todos os direitos reservados.",
					});
				interaction.reply({ content: "Sucesso!", ephemeral: true });
				interaction.channel.send({
					embeds: [emb],
				});
				break;
			}
		}
	},
};
