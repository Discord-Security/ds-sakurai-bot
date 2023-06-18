module.exports = async (client, message) => {
	message.delete();
	message.channel.send({
		embeds: [
			{
				title: "**<:CS_7:1107973357531570216> Divulgação**",
				description:
					"Para conseguir membros o ideal é que façam sempre parcerias para divulgar vídeos servidor e conseguir membros que possam agregar a sua comunidade, as parcerias estão ligadas ao mov chat tbm pois com aumento de entradas de membros mais pessoas irão visualizar e querer conversar no chat, tornando assim uma comunidade mais ativa\n\nSorteios Patrocinados também é uma boa opção pra quem quer muitos membros em pouco tempo, porém fazer sorteios Patrocinados e patrocinar Sorteios matam muito o chat. Tanto pra que quer patrocinar tanto pra quem quer ganhar Membros, pois os membros que vem de sorteio Patrocinado querem entrar mais pela recompensa que irão ganhar do sorteio sem nenhuma pretensão de conversa na comunidade e pra quem faz sorteio e marca `@everyone` ou algum outro ping com vários membros, deve estar ciente que marca várias vezes esse tipo de ping mata a vossa comunidade e faz com que os membros saiam por muita marcação",
				color: parseInt(client.cor.slice(1), 16),
				footer: {
					text: "©️ 桜井 Central Sakurai Todos os direitos reservados.",
				},
			},
		],
	});
};
