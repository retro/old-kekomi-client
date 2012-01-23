//js kekomi/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs").then(function(){
	DocumentJS('kekomi/kekomi.html', {
		markdown : ['kekomi']
	});
});