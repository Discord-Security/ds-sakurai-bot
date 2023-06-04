const discord = require('discord.js');
const ms = require('ms-pt-br');

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName('mute')
    .setNameLocalizations({
      'pt-BR': 'silenciar',
      'en-US': 'mute',
    })
    .setDescription('Castigue um utilizador de falar no chat temporariamente.')
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.ModerateMembers)
    .addUserOption(option =>
      option
        .setName('usuário')
        .setNameLocalizations({
          'pt-BR': 'usuário',
          'en-US': 'user',
        })
        .setDescription('Mencione ou utilize um ID')
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName('tempo')
        .setNameLocalizations({
          'pt-BR': 'tempo',
          'en-US': 'time',
        })
        .setDescription('Identifique um tempo. Exemplo: 1d, 1h, 1m')
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName('motivo')
        .setNameLocalizations({
          'pt-BR': 'motivo',
          'en-US': 'reason',
        })
        .setDescription('Identifique o motivo do castigo'),
    ),
  async execute(interaction, client) {
    const member = interaction.options.getMember('usuário');
    const reason =
      interaction.options.getString('motivo') ??
      'Sem motivo definido. - Punido por: ' + interaction.member.user.tag;
    const time = ms(interaction.options.getString('tempo'));

    if (!time) {
      return interaction.reply({
        content:
          'O tempo que foi dado não é válido. Você deve usar d para dias, h para horas e m para minutos.',
      });
    }
    if (!member || member.bot || member.id === interaction.member.user.id)
      return interaction.reply({
        content: 'Não se pode banir bots oficiais ou a si mesmo.',
      });
    await member.timeout(time, reason).catch(error => {
      if (error)
        return interaction.reply({
          content: 'É impossível realizar tal ação contra este usuário.',
        });
    });
    return interaction.reply({
      content: `${member} foi mutado por ${ms(time, { long: true })}`,
      ephemeral: true,
    });
  },
};
