steal('jquery/dom/fixture', function(){
	var assetFolders = {};
	$.fixture.make("asset", 200, function(i, asset){
		var types        = ["image", "document", "video"],
				exts         = {
					"document" : ['doc', 'pdf', 'xls', 'txt'],
					"image"    : ['jpg', 'png', 'gif'],
					"video"    : ['avi', 'flv', 'mov']
				},
				images       = 'image1 image2 image3 image4'.split(' '),
				tags         = "video content image football basketball funny featured reddit twitter new".split(" "),
				type         = $.fixture.rand( types , 1)[0],
				ext          = "." + $.fixture.rand( exts[type], 1)[0],
				assetTags    = tags.slice(Math.floor(Math.random()*11), Math.floor(Math.random()*5)),
				placeholders = {
					"document" : steal.root.join("kekomi/placeholders/document.txt"),
					"image"    : steal.root.join("kekomi/placeholders/" + $.fixture.rand( images, 1)[0] + ".jpg"),
					"video"    : steal.root.join("kekomi/placeholders/video.flv")
				},
				filename     = placeholders[type],
				folder_id    = Math.floor(Math.random()*31),
				contentTypes = {
					"document" : "text/plain",
					"image"    : "image/jpeg",
					"video"    : "video/x-flv"
				}
		if(!assetFolders[folder_id]){
			assetFolders[folder_id] = 0;
		}
		assetFolders[folder_id]++;
		return {
			name : "asset_"+i + ext,
			type : type,
			size : Math.floor(Math.random()*100001),
			tags : assetTags,
			filename : filename,
			folder_id : folder_id,
			created_at : "2011-07-16T19:20:30+01:00",
			content_type : contentTypes[type]
		}
	}, function(item, settings){
		var should = true;
		if(settings.data.type && should){
			should = (item.type == settings.data.type);
		}
		if(settings.data.key && should){
			var regex = new RegExp("^"+settings.data.key);
			should = regex.test(item.name);
		}
		return should;
	})

	var ids = [];
	var folders = {}
	$.fixture.make("asset_folder", 30, function(i, asset){
		var parent_id = null;
		if(i > 5){
			parent_id = $.fixture.rand(ids)[0];
		}
		ids.push(i);
		var folder = {
			name : "Folder " + i,
			parent_id : parent_id,
			asset_count : assetFolders[i] || 0,
			child_count : 0
		};
		folders[i] = folder;
		if(parent_id) folders[parent_id].child_count++;
		return folder;
	})


})