require('dotenv').config()
const tmi = require('tmi.js')

const client = new tmi.Client({
    options: { debug: true },
    connection: {
        secure: true,
        reconnect: true,
    },
    identity: {
        username: process.env.USER_NAME,
        password: process.env.OAUTH_TOKEN,
    },
    channels: [process.env.CHANNEL, 'ashoktamil'],
})

const commands = [
    '!hello',
    '!throw',
    '!shout @userName',
    //' !title "Title Name"',
    '!hug @userName',
    //'!sovip',
    '!dice',
    '!toss',
    '!grn',
]

client.connect()
const vips = ['ashoktamil', 'kimmylatteee', 'lunna800']
client.on('message', (channel, tags, message, self) => {
    // Ignore echoed messages.
    if (self) return

    if (message.toLowerCase() === '!hello') {
        client.say(channel, `@${tags.username}, Yo what's up`)
    } else if (message.toLowerCase() === '!throw') {
        client.say(channel, 'there is no throw game in this chat LUL !!')
    } else if (message.toLowerCase() === '!commands') {
        client.say(channel, commands.join(' , '))
    } else if (message.toLowerCase().includes('!shout')) {
        let txt = message.toLowerCase().split(' ')
        if (Array.isArray(txt)) {
            txt = txt[1].slice(1)
            client.say(
                channel,
                `Everyone go and check out yours truly @${txt}! they are streaming on  https://twitch.tv/${txt} next time we should not miss their stream guys!!!!!!! `
            )
        } else
            client.say(channel, `@${tags.username}, plz user !shout @userName`)
    } else if (message.toLowerCase().includes('!hug')) {
        let txt = message.toLowerCase().split(' ') || null
        if (Array.isArray(txt) && txt[1]) {
            txt = txt[1].slice(1)
            client.say(
                channel,
                ` @${tags.username} hugged @${txt}!!! Good for them GivePLZ TakeNRG`
            )
        } else client.say(channel, `@${tags.username}, plz user !hug @userName`)
    } else if (message.toLowerCase().includes('!sovip')) {
        for (const vip of vips)
            client.say(
                channel,
                `@${vip}, follow them on  https://twitch.tv/${vip} \n`
            )
    } else if (message.toLowerCase() === '!dice') {
        client.say(channel, `@${tags.username} YOU GOT ${dice()}`)
    } else if (message.toLowerCase() === '!grn') {
        client.say(
            channel,
            `@${tags.username} number you got is ${randomNumber1to1000()}`
        )
    } else if (message.toLowerCase() === '!toss') {
        let side = ''
        if (randomNumber1to1000() % 2 === 0) side = 'HEAD'
        else side = 'TAIL'
        client.say(channel, `@${tags.username} you got ${side}`)
    }
})

function dice() {
    return Math.floor(Math.random() * 6) + 1
}

function randomNumber1to1000() {
    return Math.floor(Math.random() * 1000) + 1
}
