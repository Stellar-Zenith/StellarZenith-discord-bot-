// commands/userinfo.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Info tentang user')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('User yang mau diliat infonya')
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('target') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);
    await interaction.reply(`🧍‍♂️ **Username:** ${user.tag}\n🆔 **ID:** ${user.id}\n📆 **Join Date:** ${member.joinedAt}`);
  },
};