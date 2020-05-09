var PastebinAPI = require('pastebin-js');
pastebin = new PastebinAPI();
pastebin.getPaste('GVBPw8Pc').then(function(data) {
    console.log("good");
  }).fail(function(err) {
    console.log("bad");
  })
