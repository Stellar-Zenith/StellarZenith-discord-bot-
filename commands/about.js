const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Info bot'),
  async execute(interaction) {
    return interaction.reply({
      content: `✨ **StellarZenith Bot**  
Bot Discord ini dibuat sama <@923031186496958544> buat bantu server kamu jadi lebih keren.

Dev: \`@stellarzenith_\``
    });
  },
};