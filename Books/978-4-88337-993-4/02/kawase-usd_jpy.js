
var API = 'http://api.aoikujira.com/kawase/get.php?code=USD&format=json';

var request = require('request');
var fs = require('fs');

// web api にアクセス
request(API, (err, response, body) => {
  // HTTPのエラーチェック
  if (err || response.statusCode != 200) {
    console.log('ERROR', err);
    return ;
  }

  // JSON を JS のオブジェクトに変換
  var r = JSON.parse(body);
  var jpy = r['JPY'];
  // 為替レートをファイルへ保存(ファイル名には日付を入れる)
  var t = new Date();
  var fname = 'USD_JPY_' + t.getFullYear() + '-' + (t.getMonth() + 1) +
    '-' + t.getDay() + '.txt';
  var text = '1usd=' + jpy + 'jpy';
  console.log(text);
  fs.writeFile(fname, text);
});