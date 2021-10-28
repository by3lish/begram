const { Telegraf, Markup } = require('telegraf');
const Config = require('./config.json')
const save = require('instagram-save');
const bot = new Telegraf(Config.token);
var path = require('path');
const fs = require('fs-extra');
var prefix = "/";
var dir = './paylasimlar';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
    console.log("[✓] ./paylasimlar qovluğu tapılmadı, qovluq yenidən yaradılır...")
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
ctx.reply("<i>Paylaşım Yüklənilir 📥 Zəhmət olmasa Səbrli olun və gözləyin...</i>", {parse_mode: "html"})
let link = ctx.message.text;
if (link.startsWith("https://www.instagram.com/")){
save(`${link}`, 'paylasimlar/').then(res => {
if (path.extname(`paylasimlar/${res.file}`) === ".jpg"){
    ctx.replyWithPhoto({ source: `${res.file}`} , {caption: '@begrambot 🇦🇿'});
    fs.emptyDir('paylasimlar/', err => {
        if (err) return console.error(err)
        console.log("[✓] Paylaşım Göndərildi, Qovluq Təmizləndi!")
    })
    };
    if (path.extname(`paylasimlar/${res.file}`) === ".mp4"){
        ctx.replyWithVideo({ source: `${res.file}`}, {caption: '@begrambot 🇦🇿' });
        fs.emptyDir('paylasimlar/', err => {
            if (err) return console.error(err)
            console.log("[✓] Paylaşım Göndərildi, Qovluq Təmizləndi!")
            })
        };
}
);
} else {
    ctx.reply("❌ Linki Daxil etdiyinizdən və ya Linki düzgün daxil etdiyinizdən əmin olun!")
}

})

bot.launch();
console.log("[✓] Bot istifadəyə Başladı. IG : by3lish")
