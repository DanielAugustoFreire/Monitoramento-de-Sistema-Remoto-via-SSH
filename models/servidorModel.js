import { Client } from 'ssh2';


export default class ServidorModel {

    async ConectInicial(hoster, porter, userer, passworder, commands) {
        return new Promise((resolve, reject) => {
            const conn = new Client();
            
            conn.on('error', (error) => {
                console.error('Erro na conexão SSH:\n\n', error);
                reject(error); // Rejeita a Promise com o erro
            });

            conn.on('ready', () => {
                console.log('Client :: ready');
                conn.exec(`${commands}`, (err, stream) => {
                    if (err) {
                        conn.end();
                        return reject(err);
                    }
                    let data = '';
                    stream.on('close', (code, signal) => {
                        console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                        conn.end();
                        resolve({ code, signal, data });
                    }).on('data', (chunk) => {
                        data += chunk;
                    }).stderr.on('data', (stderr) => {
                        console.error('STDERR: ' + stderr);
                        data += stderr;
                    });
                });
            }).connect({
                host: hoster,
                port: porter,
                username: userer,
                password: passworder
            });
        });
    }
}
