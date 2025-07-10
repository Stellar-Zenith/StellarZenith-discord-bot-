// commands/serverinfo.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Tampilkan info server'),
  async execute(interaction) {
    const { guild } = interaction;
    return interaction.reply(`Nama server: **${guild.name}**
Jumlah member: **${guild.memberCount}**`);
  },
};