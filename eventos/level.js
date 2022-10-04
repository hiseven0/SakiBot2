const { db } = require('../configs/firebase');

module.exports = {
  name: 'messageCreate',
  once: false,
  async executar(message, client) {
    if(message.channel.type !== 0) return;
    if(message.author.bot) return;

    db.ref(`Global/Levels/${message.author.id}`).once('value').then(async (dbf) => {
      if(dbf.val() == null) {
        db.ref(`Global/Levels/${message.author.id}`).set({
          xp: 0,
          lvl: 1,
        })
      } else {
        const GerarXP = Math.floor(Math.random() * 10) + 1;

        if(dbf.val().lvl*100 <= dbf.val().xp) {
          db.ref(`Global/Levels/${message.author.id}`).update({
            xp: 0,
            lvl: dbf.val().lvl + 1
          });
        } else {
          db.ref(`Global/Levels/${message.author.id}`).update({
            xp: dbf.val().xp + GerarXP,
          });
        }
      }
    })
   }
}