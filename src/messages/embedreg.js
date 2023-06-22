const discord = require("discord.js");

module.exports = async (client, message) => {
	message.delete();
	const row = new discord.ActionRowBuilder().addComponents(
		new discord.StringSelectMenuBuilder()
			.setCustomId("pings")
			.setPlaceholder("Selecione 1 ping")
			.addOptions([
				{
					label: "Vagas staff",
					value: "1106772071276625941",
				},
				{
					label: "Ajuda",
					value: "1106772072539099166",
				},
				{
					label: "Avisos",
					value: "1106772073440890970",
				},
				{
					label: "Sugestões",
					value: "1120755171081854976",
				},

				{
					label: "Sorteio Patrocínio",
					value: "1106772074355245106",
				},
			])
	);

	const row2 = new discord.ActionRowBuilder().addComponents(
		new discord.StringSelectMenuBuilder()
			.setCustomId("cores")
			.setPlaceholder("Selecione 1 cor")
			.addOptions([
				{
					label: "Preto",
					value: "1106772065173913691",
				},
				{
					label: "Branco",
					value: "1106772066067283978",
				},
				{
					label: "Cinza",
					value: "1120757305886113933",
				},
				{
					label: "Azul",
					value: "1106772067958923315",
				},

				{
					label: "Amarelo claro",
					value: "1120757523272699979",
				},
				{
					label: "Laranja",
					value: "1120757437771821187",
				},

				{
					label: "Roxo",
					value: "1106772068822954044",
				},
			])
	);

	await message.channel.send({
		embeds: [
			{
				title: "***<:central_sakurai:1107736400050278420> |桜井 Central Sakurai-Registro***",
				description:
					"> <:Cs_10:1108104342109696000>**_Está gostando da nossa central então aproveite e faça seu registro aqui e agora no nosso bot (<@1109883065255329882>), para se registrar é Fácil basta clicar no v e selecionar os cargos no select menus do nosso bot  _**",
				color: 15175310,
				footer: {
					text: "©️ 2023 桜井 Central Sakurai Todos os direitos reservados.",
				},
				image: {
					url: "https://imgur.com/5ahR9Yp.gif",
				},
			},
		],
	});
	await message.channel.send({
		embeds: [
			{
				title: "桜井 Quais pings você deseja ter?",
				color: 15175310,
				footer: {
					text: "©️ 2023 桜井 Central Sakurai Todos os direitos reservados.",
				},
				image: {
					url: "https://i.imgur.com/zmg1wZN.png",
				},
			},
		],
		components: [row],
	});
	await message.channel.send({
		embeds: [
			{
				title: "桜井 Qual cor você deseja ter?",
				color: 15175310,
				footer: {
					text: "©️ 2023 桜井 Central Sakurai Todos os direitos reservados.",
				},
				image: {
					url: "https://i.imgur.com/zmg1wZN.png",
				},
			},
		],
		components: [row2],
	});
};
