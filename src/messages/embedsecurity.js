module.exports = async (client, message) => {
	message.delete();
	message.channel.send({
		embeds: [
			{
				title: "**<:CS_7:1107973357531570216> Recomendações de bots para segurança**",
				description:
					"O <@992615467715940392> é um poderoso bot de moderação, projetado para manter a ordem em todos os servidores em conjunto. Com recursos como moderação interligada, parcerias automáticas, rss feeds, automensagems, podemos garantir um ambiente seguro e respeitoso para todos os servidores em conjunto.\n\nJá o <@536991182035746816> por sua vez além de fornecer recursos de moderação, também nos ajuda a personalizar o servidor de acordo com as nossas necessidades. Podemos configurar uma variedade de coisas para evitar todo o tipo de coisas perigosas que possam acontecer no seu servidor e até restringir spam e comportamentos indesejados.",
				color: parseInt(client.cor.slice(1), 16),
				footer: {
					text: "©️ 桜井 Central Sakurai Todos os direitos reservados.",
				},
			},
		],
	});
};
