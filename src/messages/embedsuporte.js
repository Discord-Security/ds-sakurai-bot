const discord = require("discord.js");

module.exports = async (client, message) => {
	message.delete();
	const row = new discord
		.ActionRowBuilder()
		.addComponents(
			new discord.ButtonBuilder()
				.setLabel("Criar Ticket")
				.setCustomId("ticket")
				.setStyle(discord.ButtonStyle.Primary)
		);
 
	message.channel.send({
		embeds: [
			{
				title: "<:CS_9:1107973443456094219> Olá a todos! Bem-vindos ao canal de suporte da Central Sakurai!",
				description:
					"<:CS_2:1107972385023471626> *Estamos aqui para ajudá-los com qualquer problema ou dúvida que possam ter em relação ao servidor ou suas funcionalidades. Nossa equipe de suporte está para garantir que suas necessidades sejam atendidas o mais rápido possível.\n\n<:CS_2:1107972385023471626> Por favor, antes de fazer sua pergunta, verifique se ela já não foi respondida anteriormente. Para isso, você pode usar a aba de pesquisa ou verificar os tópicos anteriores do canal.\n\n<:CS_2:1107972385023471626>Caso não encontre a resposta para sua pergunta, por favor, faça-a no canal e um de nossos membros da equipe de suporte irá responder o mais rápido possível. Para agilizar o processo, tente fornecer o máximo de informações possível sobre o problema ou dúvida.\n\n<:CS_2:1107972385023471626>Agradecemos por fazer parte de nossa aliança e esperamos que possamos ajudá-los da melhor maneira possível.*",
				color: parseInt(client.cor.slice(1), 16),
				footer: {
					text: "©️ 桜井 Central Sakurai Todos os direitos reservados.",
				},
			},
		],
		components: [row],
	});
};
