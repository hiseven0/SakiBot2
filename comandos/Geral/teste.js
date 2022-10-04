const jimp = require('jimp');

module.exports = {
    name: 'level',
    aliases: ['rank'],
    description: "Apenas um Comando Teste!",
    usage: '?level',
    category: 'Geral',
    cooldown: 5000,
	userPerms: ['Administrator'],
	botPerms: ['Administrator'],

	executar: async (client, message, db, args) => {
    const fundo = new jimp(934, 282, '#344feb');
  const coisa = await jimp.read('../../../fundo.png');
  const masc = await jimp.read('../../../mask.png');
  const avatar = await jimp.read(message.author.avatarURL({dynamic: true, format: 'png', size: 1024}));

  masc.resize(255, 255)
  avatar.resize(255, 255)
  avatar.mask(masc, 0, 0)

  coisa.composite(avatar, -10, 9)
  fundo.composite(coisa, 0, 0)
    .write('level.png')
    message.channel.send('', {files: ['level.png']})
    
  }
}