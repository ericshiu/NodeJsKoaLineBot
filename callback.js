const Koa = require('koa');
const _ = require('koa-route');
const app = new Koa();
const request = require("request")
let lineReplyUrl = "https://api.line.me/v2/bot/message/reply";
let CHANNEL_ACCESS_TOKEN = "Ug3MjiKipDjvlLyx/MKs4mFwCneDyrDg9admVL95+k+qBPh7RfwqcB7aCXI46NELIPfUWUPN6ZJJA+qUzRDBp4ioUeVmtnsjABdhc5nA35IGNfWuXT0+6HsgCg0vz/9is2qfs5Jfo7iz84jZ4UIZ+wdB04t89/1O/w1cDnyilFU=";
var options = {
  url: lineReplyUrl,
  method: 'POST',
  headers: {
    "content-type": "application/json",
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {'+CHANNEL_ACCESS_TOKEN+'}'
  }
};
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());
app.use(_.post('/line/msg',async(ctx) => {
  console.log(ctx.request.body);
  postLineMsgReply(getReplyToken(ctx.request.body));
  ctx.body = 'ok';
}));
app.listen(process.env.PORT || 3000);
console.log('服務器啟動',process.env.PORT || 3000);

function getReplyToken(body){
  console.log('此次回傳ReplyToken : ' , body.events[0].replyToken);
  return body.events[0].replyToken;
}

function postLineMsgReply(replyToken){
  let form = "{" + "\"replyToken\": \"" + replyToken + "\"," + "\"messages\": [{\"type\": \"text\","
  + "\"text\": \"0x100027 Hello, user\"" + "}]}";
  options.form = form;
  console.log(options);
  request(options, function (error, response, body) {  
    console.log(body);
  });
}