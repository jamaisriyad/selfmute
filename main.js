const { Client } = require('discord.js-selfbot-v13')
const client = new Client({ checkUpdate: false });
const config = require('./config')
const temps = require('./temps')

const tokenself = config.token
const guild = config.guild
const commande = config.commande

console.clear()

process.on("unhandledRejection", err => {
    return console.log(err)
});
process.on("rejectionHandled", err => {
    return console.log(err)
});
process.on("uncaughtException", err => {
    return console.log(err)
});
process.on("uncaughtExceptionMonitor", err => {
    return console.log(err)
});
client.on('ready', async () => {
    console.log('\x1b[32m%s\x1b[0m', `${client.user.tag} est prêt !`);
})

client.on("messageCreate", async function (message) {
    if (!message.content || !message || !message.author || !message.author.id || !message.author.bot || message.author.id !== client.user.id || !message.guildId || message.guildId !== guild) return
    let m = message.content.split(" ")
    if (m[0] == commande) {
        const muter = message.mentions.users.first();
        if (muter === undefined) {
            return; // Do not proceed, there is no user.
        }
        if(!temps.m[1]) return;
        client.channels.cache.get(message.channel.id).send(`-tempmute <@${muter.id}> ${m[1]} ${temps.m[1]}`)
        setTimeout(() => message.delete(), 2000)
    }
})