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
    channels: [process.env.USER_NAME],
})

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
        client.say(
            channel,
            '!hello, !throw, !shout @userName, !title "Title Name", !huh @userName, !sovip'
        )
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
    } /* else if (message.toLowerCase().includes('!title')) {
        let txt = message.toLowerCase().split(' ')
        if (Array.isArray(txt)) {
            txt = txt[1].slice(1)
            console.log(client.getOptions().channels.entries())
        } else
            client.say(channel, `@${tags.username}, plz user !shout @userName`)
    } */ else if (message.toLowerCase().includes('!hug')) {
        let txt = message.toLowerCase().split(' ')
        if (Array.isArray(txt)) {
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
    }
})
