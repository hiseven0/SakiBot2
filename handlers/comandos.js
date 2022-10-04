const fs = require('fs');

module.exports = (client) => {
    fs.readdirSync('./comandos/').forEach(dir => {
        const files = fs.readdirSync(`./comandos/${dir}/`).filter(file => file.endsWith('.js'));

        if(!files || files.legnth <= 0) console.log("0 Comandos Encontrados")

        files.forEach((file) => {
            let comando = require(`../comandos/${dir}/${file}`)

            if(comando) {
                client.comandos.set(comando.name, comando)

                if(comando.aliases && Array.isArray(comando.aliases)) {
                    comando.aliases.forEach(alias => {
                        client.aliases.set(alias, comando.name)
                    })
                }
            }
        })
    })
}