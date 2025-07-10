// commands/avatar.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Liat avatar user')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('User yang mau diliat avatarnya')
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    await interaction.reply(user.displayAvatarURL({ dynamic: true, size: 1024 }));
  },
};