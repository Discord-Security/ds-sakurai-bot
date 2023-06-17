const discord = require("discord.js");

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName("candidatar")
		.setNameLocalizations({
			"pt-BR": "candidatar",
			"en-US": "apply",
		})
		.setDescription("Candidate o seu servidor á rede.")
		.setDefaultMemberPermissions(discord.PermissionFlagsBits.ManageGuild),
	async execute(interaction, client) {
		if (interaction.guild.id === "1106771396757037076") {
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

			const secondActionRow =
				new discord.ActionRowBuilder().addComponents(MotivoInput);

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
				const row = new discord.ActionRowBuilder().setComponents(
					approve
				);
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
								server
									? server.name
									: "Desconhecido ou Fora de rede"
							}`,
						},
					])
					.setThumbnail(member.displayAvatarURL({ dynamic: true }))
					.setColor(client.cor);

				client.channels.cache
					.get("1114990055044423782")
					.send({ embeds: [embed], components: [row] });
			}
		} else {
			const guild = await client.db.Guilds.findOne({
				_id: interaction.guild.id,
			});

			if (guild && guild.approved === true)
				return interaction.reply({
					content: "Este servidor já foi aprovado dentro da rede.",
					ephemeral: true,
				});

			const modal = new discord.ModalBuilder()
				.setCustomId("candidatar")
				.setTitle("Formulário de candidatação");

			const TOSInput = new discord.TextInputBuilder()
				.setCustomId("TOSInput")
				.setLabel("Você e seus membros staff seguem a TOS?")
				.setStyle(discord.TextInputStyle.Short)
				.setMinLength(3)
				.setMaxLength(3)
				.setRequired(true);

			const MotivoInput = new discord.TextInputBuilder()
				.setCustomId("MotivoInput")
				.setLabel("Porque você gostaria de entrar na Sakurai?")
				.setStyle(discord.TextInputStyle.Paragraph)
				.setMaxLength(512)
				.setRequired(true);

			modal.addComponents(
				new discord.ActionRowBuilder().addComponents(MotivoInput),
				new discord.ActionRowBuilder().addComponents(TOSInput)
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
				const invite = await interaction.channel.createInvite({
					maxAge: 0,
					maxUses: 0,
				});
				const motivo = i.fields.getTextInputValue("MotivoInput");
				const tos = i.fields.getTextInputValue("TOSInput");
				const server = interaction.guild;
				const member = interaction.member;
				const row = new discord.ActionRowBuilder().setComponents(
					new discord.ButtonBuilder()
						.setCustomId("approve-" + server.id)
						.setLabel("Aprovar")
						.setStyle(2),
					new discord.ButtonBuilder()
						.setCustomId("reject-" + server.id)
						.setLabel("Rejeitar")
						.setStyle(2)
				);

				client.channels.cache.get("1114990055044423782").send({
					content: "@everyone",
					embeds: [
						{
							title: "Candidatura 桜井 Central Sakurai",
							color: 14643613,
							fields: [
								{
									name: "<:Cs_10:1108104342109696000> Representante id",
									value: `**${member.id}**`,
									inline: true,
								},
								{
									name: "<:Cs_10:1108104342109696000> Server id",
									value: `**${server.id}**`,
									inline: true,
								},
								{
									name: "<:Cs_10:1108104342109696000> Invite server",
									value: `**${invite.url}**`,
									inline: true,
								},
								{
									name: "<:Cs_10:1108104342109696000> Porque gostaria de entrar na 桜井 Central Sakurai?",
									value: `**R: ${motivo}**`,
								},
								{
									name: "<:Cs_10:1108104342109696000> Você e seus membros staff seguem a TOS do Discord?",
									value: `**R: ${tos}**`,
								},
							],
							footer: {
								text: "©️ 2023 桜井 Central Sakurai Todos os direitos reservados.",
							},
						},
					],
					components: [row],
				});
				guild.representative = member.id;
				guild.invite = invite.url;
				guild.save();
			}
		}
	},
};
