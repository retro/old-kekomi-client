steal('jquery/dom/fixture', function(){
	var blocks = [
		{
			type: 'rte',
			fields: 'rte'
		},
		{
			type: 'image',
			fields: 'image'
		},
		{
			type: 'file_attachments',
			fields: 'file_attachments'
		},
		{
			type: 'code',
			fields: 'code'
		},
		{
			type: 'image_gallery',
			fields: 'image_gallery'
		},
		{
			type:'gallery_with_thumb_and_description',
			fields: [
				{
					name: 'thumb',
					label: 'Thumb',
					type: 'image'
				},
				{
					name: 'image_gallery',
					label: 'Image gallery',
					type: 'image_gallery'
				},
				{
					name: 'description',
					label: 'Description',
					type: 'rte'
				}
			]
		}
	];
	$.fixture.make("block", blocks.length, function(i, block){
		var block = blocks[i];
		block.id = i + 1;
		console.log(block)
		return block
	}, function(block, settings){
		if(settings.data.type){
			return block.type === settings.data.type;
		}
	})
});