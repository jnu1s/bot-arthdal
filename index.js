const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// COLOQUE O ID DO CANAL AQUI
const CHANNEL_ID = 'COLOQUE_AQUI';

const mensagens = [
    {
        horario: '15 0 * * 1-6',
        texto: '@everyone 🌌 Atenção! A Invasão Estelar começará em 10 minutos.'
    },
    {
        horario: '50 0 * * *',
        texto: '@everyone ⚔️ Os Bosses Mundiais aparecerão em 10 minutos.'
    },
    {
        horario: '50 1 * * *',
        texto: '@everyone 🌑 Os Bosses Errantes surgirão na Ilha da Noite Sombria em 10 minutos. Lembre-se de não acertar o last hit.'
    },
    {
        horario: '20 7 * * *',
        texto: '@everyone 🌑 Os Bosses Errantes surgirão na Ilha da Noite Sombria em 10 minutos. Lembre-se de não acertar o last hit.'
    },
    {
        horario: '50 7 * * *',
        texto: '@everyone ⚔️ Os Bosses Mundiais aparecerão em 10 minutos.'
    },
    {
        horario: '15 8 * * 1-6',
        texto: '@everyone 🌌 A Invasão Estelar começará em 10 minutos.'
    },
    {
        horario: '20 9 * * 1-5',
        texto: '@everyone 🌑 Os Bosses da Ilha da Noite Sombria aparecerão em 10 minutos. Não percam pois esses são os bosses que vão melhorar muito seu char.'
    }
];

client.once('ready', async () => {
    console.log(`Bot online como ${client.user.tag}`);

    const canal = await client.channels.fetch(CHANNEL_ID);

    mensagens.forEach(msg => {
        cron.schedule(msg.horario, async () => {
            try {
                await canal.send(msg.texto);
                console.log(`Mensagem enviada: ${msg.texto}`);
            } catch (err) {
                console.error(err);
            }
        }, {
            timezone: 'America/Sao_Paulo'
        });
    });
});

client.login(process.env.TOKEN);
