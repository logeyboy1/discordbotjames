const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const yt = require('ytdl-core');
const tokens = require('./tokens.json');
const prefix = config.prefix
const token = config.token
const Version = config.Version
const AuthorId = config.AuthorId
const hook = new Discord.WebhookClient('331895453186523139', 'LVMqqYtnklRO-c_dMhUzNO_WKUnpyy8maI09568Y58dW2wxCDtpQ1HZsc-ILses0iE9r');
// ^ HF
const hook2 = new Discord.WebhookClient('331992846330757122', 'EKFRFt5c2H6G_-L2ci7jnfn187PU2m0-kCyuq-yV5P-1OdeNbrhdv__cnoJOjyLF5KTG');
// ^ wolf pack
const admins = ("172204933850857472", "174377607750483968");

client.on('ready', () => {
  client.user.setPresence({ game: { name: "Made By James#8506", type: 0 } });
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Welcome`)
  console.log(`James`)
  console.log(`Version Number`)
  console.log(Version);
  console.log(`Armed`);
  console.log(`And`);
  console.log(`Ready`);
});

/// Normal Commands
/*
if (message.content.startsWith(prefix + "ping2")) {
  if(message.author.id !== message.author.id) return;
     message.channel.sendMessage(`msg to send`) }
*/
client.on('message', msg => {
  if (msg.content === prefix + 'ping') {
    client.message.send(author, "pong");
  }

  if (msg.content === (prefix + 'Who made you')) {
    msg.channel.sendMessage('I Was made by James#8506 from scratch');
    msg.channel.sendMessage(`I am in Version ` + Version)
  }

  if (msg.content === (prefix + 'roll')) {
    msg.channel.sendMessage(Math.floor((Math.random() * 10) + 1));
  }

});

// ADMIN Commands
client.on("message", message => {
/*
if (message.content.startsWith(prefix + "PT")) {
  if(admins !== message.author.id) return;
  message.channel.sendMessage(`msg to send`)
}
*/

if (message.content.startsWith(prefix + "PT")) {
  if("172204933850857472" !== message.author.id) return;
  message.channel.sendMessage(`Hello Darkness i am a loyal discord bot made by James`)
  if("174377607750483968" !== message.author.id) return;
  message.channel.sendMessage(`Hello Darkness i am a loyal discord bot made by James`)
}

});
//AuthorCommands
/*
if (message.content.startsWith(prefix + "PT")) {
  if(AuthorId !== message.author.id) return;
  message.channel.sendMessage(`msg to send`)
}
*/
client.on("message", message => {
  if (message.content.startsWith(prefix + "ping1")) {
    if(AuthorId !== message.author.id) return;
     try {
       message.channel.sendMessage(`pong2`)

   } catch (err) {
     message.channel.sendMessage(`noperms`)
   }
  }

  if (message.content.startsWith(prefix + "WHPHF")) {
  if(AuthorId !== message.author.id) return
  let args = message.content.split(" ").slice(1);
  let thingToEchoPushWeebhook = args.join(" ")
  message.channel.sendMessage(`Pushed to HellsFallen | ` + thingToEchoPushWeebhook)
  hook.send(thingToEchoPushWeebhook)
}

if (message.content.startsWith(prefix + "WHPWF")) {
if(AuthorId !== message.author.id) return
let args = message.content.split(" ").slice(1);
let thingToEchoPushWeebhook = args.join(" ")
message.channel.sendMessage(`Pushed to Nightshade wolfpack | ` + thingToEchoPushWeebhook)
hook2.send(thingToEchoPushWeebhook)
}

if (message.content.startsWith(prefix + "WHPALL")) {
if(AuthorId !== message.author.id) return
let args = message.content.split(" ").slice(1);
let thingToEchoPushWeebhook = args.join(" ")
message.channel.sendMessage(`Pushed | ` + thingToEchoPushWeebhook)
hook.send(thingToEchoPushWeebhook)
hook2.send(thingToEchoPushWeebhook)
}

if (message.content.startsWith(prefix + "RunString")) {
if(AuthorId !== message.author.id) return
let args = message.content.split(" ").slice(1);
let commandtorun = args.join(" ")
const Command = commandtorun
message.channel.sendMessage(commandtorun)
eval(Command)
}

});

const commands = {
	'play': (msg) => {
		if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`Add some songs to the queue first with ${tokens.prefix}add`);
		if (!msg.guild.voiceConnection) return commands.join(msg).then(() => commands.play(msg));
		if (queue[msg.guild.id].playing) return msg.channel.sendMessage('Already Playing');
		let dispatcher;
		queue[msg.guild.id].playing = true;

		console.log(queue);
		(function play(song) {
			console.log(song);
			if (song === undefined) return msg.channel.sendMessage('Queue is empty').then(() => {
				queue[msg.guild.id].playing = false;
				msg.member.voiceChannel.leave();
			});
			msg.channel.sendMessage(`Playing: **${song.title}** as requested by: **${song.requester}**`);
			dispatcher = msg.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : tokens.passes });
			let collector = msg.channel.createCollector(m => m);
			collector.on('message', m => {
				if (m.content.startsWith(tokens.prefix + 'pause')) {
					msg.channel.sendMessage('paused').then(() => {dispatcher.pause();});
				} else if (m.content.startsWith(tokens.prefix + 'resume')){
					msg.channel.sendMessage('resumed').then(() => {dispatcher.resume();});
				} else if (m.content.startsWith(tokens.prefix + 'skip')){
					msg.channel.sendMessage('skipped').then(() => {dispatcher.end();});
				} else if (m.content.startsWith(tokens.prefix + 'time')){
					msg.channel.sendMessage(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
				}
			});
			dispatcher.on('end', () => {
				collector.stop();
				play(queue[msg.guild.id].songs.shift());
			});
			dispatcher.on('error', (err) => {
				return msg.channel.sendMessage('error: ' + err).then(() => {
					collector.stop();
					play(queue[msg.guild.id].songs.shift());
				});
			});
		})(queue[msg.guild.id].songs.shift());
	},
	'join': (msg) => {
		return new Promise((resolve, reject) => {
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('I couldn\'t connect to your voice channel...');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	},
	'add': (msg) => {
		let url = msg.content.split(' ')[1];
		if (url == '' || url === undefined) return msg.channel.sendMessage(`You must add a YouTube video url, or id after ${tokens.prefix}add`);
		yt.getInfo(url, (err, info) => {
			if(err) return msg.channel.sendMessage('Invalid YouTube Link: ' + err);
			if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].playing = false, queue[msg.guild.id].songs = [];
			queue[msg.guild.id].songs.push({url: url, title: info.title, requester: msg.author.username});
			msg.channel.sendMessage(`added **${info.title}** to the queue`);
		});
	},
	'queue': (msg) => {
		if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`Add some songs to the queue first with ${tokens.prefix}add`);
		let tosend = [];
		queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
		msg.channel.sendMessage(`__**${msg.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
	},
	'help': (msg) => {
		let tosend = ['```xl', tokens.prefix + 'join : "Join Voice channel of msg sender"',	tokens.prefix + 'add : "Add a valid youtube link to the queue"', tokens.prefix + 'queue : "Shows the current queue, up to 15 songs shown."', tokens.prefix + 'play : "Play the music queue if already joined to a voice channel"', '', 'the following commands only function while the play command is running:'.toUpperCase(), tokens.prefix + 'pause : "pauses the music"',	tokens.prefix + 'resume : "resumes the music"', tokens.prefix + 'skip : "skips the playing song"', tokens.prefix + 'time : "Shows the playtime of the song."',	'```'];
		msg.channel.sendMessage(tosend.join('\n'));
	},
	'reboot': (msg) => {
		if (msg.author.id == tokens.adminID) process.exit(); //Requires a node module like Forever to work.
	}
};

client.on('ready', () => {
	console.log('ready!');
});

client.on('message', msg => {
	if (!msg.content.startsWith(tokens.prefix)) return;
	if (commands.hasOwnProperty(msg.content.toLowerCase().slice(tokens.prefix.length).split(' ')[0])) commands[msg.content.toLowerCase().slice(tokens.prefix.length).split(' ')[0]](msg);
});
client.login(tokens.d_token);



client.login(token);
