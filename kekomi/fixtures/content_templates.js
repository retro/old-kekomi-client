steal('jquery/dom/fixture', function(){
	$.fixture.make("content_template", 1, function(i, content_template){

		return {
			id : 1,
			name: "article",
			label : "Article",
			fields : {
				lead : {
					fields : 'rte',
					label : 'Lead'
				},
				body : {
					label : 'Body',
					fields : {
						paragraph : {
							type : 'rte',
							label : 'Paragraph'
						},
						image : {
							type : 'image',
							label : 'Image',
						},
						image : {
							type : 'image',
							label : 'Left mage',
						},
						gallery : {
							type : 'image_gallery',
							label : 'Gallery'
						},
						gallery : {
							type : 'file_attachments',
							label : 'Files'
						},
						youtube_video : {
							type : 'code',
							label : 'Youtube video'
						},
						gallery_with_thumb_and_title : {
							type : 'gallery_with_thumb_and_description',
							label : 'Gallery with thumb and description'
						}
					}
				},
				image_gallery : {
					fields : 'image_gallery',
					label : 'Image Gallery'
				}
			}
		}
	})
})