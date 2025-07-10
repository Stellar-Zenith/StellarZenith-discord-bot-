const fs = require('node:fs');
const path = require('node:path');
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Collection,
  Partials,
  Events
} = require('discord.js');

const token = process.env['TOKEN'];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

// Load slash commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.data.name, command);
  }
}

// Bot ready
client.once(Events.ClientReady, () => {
  console.log(`✅ Bot aktif sebagai ${client.user.tag}`);
});

// Handle slash command
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: '⚠️ Terjadi error saat eksekusi.', ephemeral: true });
    } else {
      await interaction.reply({ content: '⚠️ Terjadi error saat eksekusi.', ephemeral: true });
    }
  }
});

// Welcome & Goodbye
const channelId = '1354493900261425222'; // Ganti sesuai ID channel kamu

client.on(Events.GuildMemberAdd, member => {
  const channel = member.guild.channels.cache.get(channelId);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle(`🎉 Selamat datang, ${member.user.username}!`)
    .setDescription(`Hai <@${member.id}>, selamat datang di **${member.guild.name}**!`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setColor(0x00AEFF)
    .setFooter({ text: 'StellarZenith Bot' });

  channel.send({ embeds: [embed] });
});

client.on(Events.GuildMemberRemove, member => {
  const channel = member.guild.channels.cache.get(channelId);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle(`👋 Selamat tinggal, ${member.user.username}`)
    .setDescription(`${member.user.tag} keluar dari **${member.guild.name}**`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setColor(0xFF0000)
    .setFooter({ text: 'StellarZenith Bot' });

  channel.send({ embeds: [embed] });
});

// Login
client.login(token);