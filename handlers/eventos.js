const { glob } = require('glob');
const { promisify } = require('util');
const pg = promisify(glob);
require('colors');

async function Eventos(client, path) {
  const ascii = require('ascii-table');
  const table = new ascii().setHeading("Eventos", "Status");
  const eventos = await pg(process.cwd() + path + '*js');

  await client.eventos.clear();

  eventos.forEach((file) => {
    const evento = require(file);

    const executar = (...args) => evento.executar(...args, client);

    if(evento.rest) {
      if(evento.once) client.rest.once(evento.name, executar);
      else
        client.rest.on(evento.name, executar);
    } else {
      if(evento.once) client.once(evento.name, executar);
      else
        client.on(evento.name, executar);
    }

    table.addRow(evento.name, "✅");
  });

  return console.log(table.toString(), "\nEventos carregados.".blue);
}

module.exports = { Eventos }