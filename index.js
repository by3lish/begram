const { Telegraf, Markup } = require('telegraf');
const Config = require('./config.json')
const save = require('instagram-save');
const bot = new Telegraf(Config.token);
var path = require('path');
const fs = require('fs-extra');
var prefix = "/";
var dir = './fayllar';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
    console.log("Fayllar qovlugu tapilmadi, qovlug yeniden yaradildi!")
}

bot.start((ctx) => ctx.reply("👋 Xoş Gördük!\nMən İnstagramdan video və şəkil yükləmək üçün hazırlanmış olan botam 📥\n İstifadə qaydasını görmək üçün /help yazın 🙏", Markup.inlineKeyboard(
    [
      Markup.button.url(
        "Developer 👨🏻‍💻",
        "instagram.com/whoiselish"),
    ],
    { columns: 1 }
  )));
bot.help((ctx) => ctx.reply('📎 Siz Sadəcə Mənə Paylaşımın linkini atın, Mən paylaşımı yükləyib sizə atacağam...'));

bot.on('text', (ctx) => {
let link = ctx.message.text;
if (link.startsWith("https://www.instagram.com/")){
save(`${link}`, 'fayllar/').then(res => {
if (path.extname(`fayllar/${res.file}`) === ".jpg"){
    ctx.replyWithPhoto({ source: `${res.file}`} , {caption: '@begrambot 🇦🇿'});
    fs.emptyDir('fayllar/', err => {
        if (err) return console.error(err)
        console.log("Qovluq Temizlendi")
    })
    };
    if (path.extname(`fayllar/${res.file}`) === ".mp4"){
        ctx.replyWithVideo({ source: `${res.file}`}, {caption: '@begram 🇦🇿' });
        fs.emptyDir('fayllar/', err => {
            if (err) return console.error(err)
            console.log("Qovluq Temizlendi")
            })
        };
}
);
} else {
    ctx.reply("❌ Linki Daxil etdiyinizdən və ya Linki düzgün daxil etdiyinizdən əmin olun!")
}

})

bot.launch();                                     