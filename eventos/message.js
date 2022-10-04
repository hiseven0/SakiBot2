const emj = require('../configs/emojis.json');

const { db } = require('../configs/firebase');

const { Collection, PermissionsBitField } = require('discord.js');
const moment = require('moment');
require('moment-duration-format')
const client = require('..');
const config = require('../configs/config.json');
const prefix = client.prefix;
const cooldown = new Collection();

module.exports = {
  name: "messageCreate",
  once: false,
  executar(message, client) {
    if(message.author.bot) return;
    if(message.channel.type !== 0) return;
    if(!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if(cmd.length == 0 ) return;
    let comando = client.comandos.get(cmd)
    
    if(!comando) comando = client.comandos.get(client.aliases.get(cmd));
    
    if(comando) {
      if(comando.cooldown) {
        if(cooldown.has(`${comando.name}${message.author.id}`))
        return message.channel.send(`${emj.error} \` ERROR 404 \`
        
> \`[ ERROR ]\` Você precisa esperar ${moment.duration(cooldown.get(`${comando.name}${message.author.id}`) - Date.now()).format('h[h], m[m], s[s]')} para executar este comando novamente.`);

        if(comando.userPerms || comando.botPerms) {
       if(!message.member.permissions.has(PermissionsBitField.resolve(comando.userPerms || []))) {
         return message.reply(`${emj.error} \`  ERROR 404  \`
> \`[ ERROR ]\` Você não possui a permissão: **${comando.userPerms}** para executar este comando.`);
       }
       if(!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(comando.botPerms || []))) {
         return message.channel.send(`${emj.error} \`  ERROR 404  \`
         
> \`[ ERROR ]\` Eu não possuo a permissão: **${comando.botPerms}** para executar este comando.`);
       }
     }
     comando.executar(client, message, args)
       cooldown.set(`${comando.name}${message.author.id}`, Date.now() + comando.cooldown)
            setTimeout(() => {
                cooldown.delete(`${comando.name}${message.author.id}`)
            }, comando.cooldown)
      } else {
        if(comando.userPerms || comando.botPerms) {
       if(!message.member.permissions.has(PermissionsBitField.resolve(comando.userPerms || []))) {
         return message.reply(`${emj.error} \`  ERROR 404  \`
> \`[ ERROR ]\` Você não possui a permissão: **${comando.userPerms}** para executar este comando.`);
       }
       if(!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(comando.botPerms || []))) {
         return message.channel.send(`${emj.error} \`  ERROR 404  \`
         
> \`[ ERROR ]\` Eu não possuo a permissão: **${comando.botPerms}** para executar este comando.`)
       }
     }
     comando.executar(client, message, db, args)
      }
    }
  }
}