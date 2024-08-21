import { Client } from 'ssh2';

export default class ServidorModel {
    
    ConectInicial(hoster, porter, userer, passworder, commands) {
      const commandList = commands.split(';').map(cmd => cmd.trim()).filter(cmd => cmd.length > 0);

        const conn = new Client();
        conn.on('ready', () => {
          console.log('Client :: ready');
          conn.shell((err, stream) => {
            if (err) throw err;
            stream.on('close', () => {
              console.log('Stream :: close');
              conn.end();
            }).on('data', (data) => {
              console.log('OUTPUT: ' + data);
            });
            stream.end(`${commands}\nexit\n`);
          });
        }).connect({
            host: hoster,       // IP do servidor
            port: porter,       // Porta padrão do SSH
            username: userer,   // Nome de usuário
            password: passworder // Senha
        });
    }
}