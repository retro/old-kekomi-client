// load('kekomi/scripts/crawl.js')

load('steal/rhino/rhino.js')

steal('steal/html/crawl', function(){
  steal.html.crawl("kekomi/kekomi.html","kekomi/out")
});
