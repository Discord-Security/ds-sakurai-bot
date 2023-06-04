const discord = require('discord.js');

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName('unmute')
    .setNameLocalizations({
      'pt-BR': 'desmutar',
      'en-US': 'unmute',
    })
    .setDescription('Retire o castigo de um usuário')
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.ModerateMembers)
    .addUserOption(option =>
      option
        .setName('usuário')
        .setNameLocalizations({
          'pt-BR': 'usuário',
          'en-US': 'user',
        })
        .setDescription('Identifique o usuário')
        .setRequired(true),
    ),
  async execute(interaction, client) {
    const member = interaction.options.getMember('usuário');
    const reason = 'Removido por: ' + interaction.member.user.tag;
    if (!member) {
      return interaction.reply({
        content:
          'O membro que foi dado não é válido, você deve mencionar alguém dentro do servidor.',
      });
    }
    await member.timeout(null, reason).catch(error => {
      if (error)
        return interaction.reply({
          content: 'É impossível realizar tal ação contra este usuário.',
        });
    });
    return interaction.reply({
      content: `Foi retirado o castigo a ${member}.`,
      ephemeral: true,
    });
  },
};
