//js kekomi/scripts/build.js

load("steal/rhino/rhino.js");
steal('steal/build').then('steal/build/scripts','steal/build/styles',function(){
	steal.build('kekomi/scripts/build.html',{to: 'kekomi'});
});
