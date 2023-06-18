const discord = require("discord.js");

module.exports = async (client, message) => {
	message.delete();
	const row = new discord.ActionRowBuilder().addComponents(
		new discord.ButtonBuilder()
			.setLabel("Candidatar-se")
			.setCustomId("candidatar")
			.setStyle(discord.ButtonStyle.Primary)
	);

	message.channel.send({
		embeds: [
			{
				title: "**<:central_sakurai:1107736400050278420> |** ***Requisitos para permanecer/entrar na Central Sakurai!***",
				description:
					"** <:CS_1:1107972349673869382> – Membros: A quantidade de membros importa, pois ambos servidores estarão se ajudando na Central Sakurai, e para isso o servidor precisa ter mais de 100 membros para entrar na Aliança.\n\n <:CS_1:1107972349673869382>– Ser ativo : Para participar da Aliança Sakurai necessita ter um servidor ativo e permanecer atualizado aqui na central sobre nossos anúncios \n\n<:CS_1:1107972349673869382> – Tema do servidor: Não aceitamos servidores de Web-Hyper, de lojas como; Nitro, ganhar seguidores no Instagram, Sonhos, Hackers etc...\n\n<:CS_1:1107972349673869382>– Compromisso: O servidor que for entrar na nossa aliança precisa ter compromisso, ou seja, sempre participar das reuniões, permanecer apenas na nossa Central entre outros.**",
				color: parseInt(client.cor.slice(1), 16),
				image: { url: "https://i.imgur.com/1X3SJ9n.png" },
				footer: {
					text: "©️ 桜井 Central Sakurai Todos os direitos reservados.",
				},
			},
		],
		components: [row],
	});
};
