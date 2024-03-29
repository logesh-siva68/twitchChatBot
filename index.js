require('dotenv').config()
const tmi = require('tmi.js')
const moment = require('moment')
const express = require('express')
const axios = require('axios')

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000

const healthUrl = `http://localhost:${port}/health`;

const msg = "hope u doing good, reminder to hydrate and stretch, try these commands !dice, !toss, and !hello for fun theone353Love  theone353Love (Note: it is automated message!!)";

const channels = [
    "bridgie_bee#theone353Hey theone353Hey @bridgie_bee, " + msg,
    "missyruth#theone353Hey theone353Hey @missyruth, " + msg,
    "ashoktamil#theone353Hey theone353Hey @ashoktamil, " + msg,
    "chibi_mhay#theone353Hey theone353Hey @chibi_mhay Chibi Chibi, " + msg,
    "lumella#theone353Hey theone353Hey @lumella, " + msg,
    "orianaoreo#theone353Hey theone353Hey @orianaoreo, " + msg ,
    "alexasoto03#theone353Hey theone353Hey @alexasoto03, " + msg,
    "cherylywheryly#theone353Hey theone353Hey @cherylywheryly, " + msg,
    "spidermonkeybots#theone353Hey theone353Hey @spidermonkeybots, " + msg,
    "zpandymel#theone353Hey theone353Hey @zpandymel Senppaaiii, " + msg,
    "shkoofi_shkoofster#theone353Hey theone353Hey @shkoofi_shkoofster, " + msg, 
    "z3nsei_tv#theone353Hey theone353Hey @z3nsei_tv, " + msg,
    "icursor#theone353Hey theone353Hey @icursor bro, " + msg,
    "ladyversailles#theone353Hey theone353Hey @ladyversailles, " + msg,
    
];


const client = new tmi.Client({
    options: { debug: false },
    connection: {
        secure: true,
        reconnect: true,
    },
    identity: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
    },
    channels: makeGreat().map((item)=> item.channel)
})


const greatChannels = [...makeGreat()]
const commands = [
    '!hello',
    '!throw',
    '!shout @userName',
    //' !title "Title Name"',
    '!hug @userName',
    '!dice',
    '!toss',
    '!grn',
]

client.connect().then((data)=>{
    console.log("data------->",data)
})


client.on('message', (channel, tags, message, self) =>  {
    
    if(tags.username === 'theoneloki' || self ) return;

    //console.log(`$channel: ${channel} - $tags: ${tags.username} - $message: ${message} - $greatChannels : ${JSON.stringify(greatChannels)}` )
    let altCh = channel.split("#")[1] || "";
    //console.log("altCh",altCh)
    let channelObj = []
    let channelObjInx = greatChannels.findIndex((item)=> item.channel === altCh) 
    //console.log("channelObj",channelObjInx)
    if(channelObjInx === 0 ) channelObj.push({...greatChannels[0]})
    else if(channelObjInx > 0)  channelObj.push({...greatChannels[channelObjInx]})
    let isGreeted = channelObj[0].isGreeted || false
    //console.log(`$channelObj: ${JSON.stringify(channelObj)} - $isGreeted: ${isGreeted}` )

    
    if(!isGreeted && tags.username !== 'theoneloki'){
        client.say(channel, channelObj[0].message)
        setGreat(altCh)           
    } 
    else if(isGreeted && tags.username !== 'theoneloki'){
        let duration = moment(moment().format()).diff(channelObj[0].lastGreeted, 'hours')
        if(duration > 2){
            client.say(channel, channelObj[0].message)
            setGreat(altCh)
        }
        
    }
    if (message.toLowerCase() === '!dice') {
        //console.log("dice")
        client.say(channel, `@${tags.username} YOU GOT ${dice()}`)
    }
    if (message.toLowerCase() === '!hello') {
        //console.log("hello")
        client.say(channel, `@${tags.username}, Yo what's up`)
    }
    if (message.toLowerCase() === '!toss') {
        let side = ''
        if (randomNumber1to1000() % 2 === 0) side = 'HEAD'
        else side = 'TAIL'
        client.say(channel, `@${tags.username} you got ${side}`)
    }



    
   

    // Ignore echoed messages.
    

    /* if (message.toLowerCase() === '!hello') {
        client.say(channel, `@${tags.username}, Yo what's up`)
    } else if (message.toLowerCase() === '!throw') {
        client.say(channel, 'No one is throwing anyone in my view  LUL !!')
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
                ` Awww!!  @${tags.username} hugged @${txt}!!! Good for them GivePLZ TakeNRG`
            )
        } else client.say(channel, `@${tags.username}, plz user !hug @userName`)
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
    } */
})

function dice() {
    return Math.floor(Math.random() * 6) + 1
}

function randomNumber1to1000() {
    return Math.floor(Math.random() * 1000) + 1
}

function makeGreat(){
    let arr = []
    if(Array.isArray(channels)){
        for(let c of channels){
            arr.push({
                channel:c.split("#")[0],
                isGreeted:false,
                lastGreeted: moment().format(),
                message:c.split("#")[1]
            })
        }
    }
    //console.log(arr)
    return arr;
}

function setGreat(channel){
    for(let i of greatChannels){
        //console.log("1",i)
        //console.log("1x",channel)
        if(i.channel === channel){
            i.isGreeted = true;
            i.lastGreeted = moment().format()
        }
        //console.log("2",i)

    }

    //console.log(greatChannels)
}

app.get('/',(req,res)=>{
    let html = '<h1>The One Loki chat bot</h1> <ul>'
    for(let greet of greatChannels){
        html = html + `<li> ${greet.channel} -- ${greet.isGreeted ? "Yeah!!!" : "Nahhh"} -- ${moment(greet.lastGreeted).utcOffset("+05:30").format('MMMM Do YYYY, h:mm a')}</li>`
    }
    html = html + "</ul>"
    res.send(html)
})

app.get('/health', (req,res)=>{
    res.status(200).json({"message":"up and works fine in port " + port})
})
app.listen(port, async()=>{
    console.log("app running")
    try{
        let fetchData = await axios.get(healthUrl)
        console.log("fetchData--->", fetchData?.data || "nulls")
    } catch(err){
        console.log(err)
    }
    setInterval(async () => {
        try{
            let fetchData = await axios.get(healthUrl)
            console.log("fetchData--->", fetchData?.data || "nulls")
        } catch(err){
            console.log(err)
        }
    }, 780000);
})