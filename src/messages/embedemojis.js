module.exports = async (client, message) => {
	message.delete();
	message.channel.send({
		embeds: [
			{
				title: "**<:CS_7:1107973357531570216> Recomendações de sites para emojis/stickers**",
				description:
					'O site https://stickers.gg/ é especializado em adesivos. Adesivos são imagens que usamos como "figurinha", funciona quase da mesma forma que os emojis aqui no Discord só que com uma escala de tamanho maior. Ao visitar o site, você encontrará uma ampla seleção de figurinhas organizados em categorias, como animes, memes, música, personagens famosos, entre outros. Esses adesivos podem ser facilmente baixados e usados no servidores/dm\n\nJá o site https://emoji.gg/ é uma plataforma dedicada a emojis. Emojis são pequenos ícones ou símbolos usados para expressar emoções, ideias ou contextos em mensagens de texto ou em postagens nos chats da plataforma, organizados em categorias no site',
				color: parseInt(client.cor.slice(1), 16),
				footer: {
					text: "©️ 桜井 Central Sakurai Todos os direitos reservados.",
				},
			},
		],
	});
};
