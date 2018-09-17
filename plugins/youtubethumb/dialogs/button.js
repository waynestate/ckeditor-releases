CKEDITOR.dialog.add( 'youtubethumbdialog', function( editor ) {
    return {
        title: 'YouTube Thumbnail Properties',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'text',
                        id: 'url',
                        label: 'Video URL',
                        validate: CKEDITOR.dialog.validate.notEmpty( "URL field cannot be empty" )
                    },
                    {
                        type: 'text',
                        id: 'alt',
                        label: 'Alternate Text',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Alternate text cannot be empty" )
                    },
                    {
                        type: 'checkbox',
                        id: 'center',
                        label: 'Center'
                    }
                ]
            },
        ],
        onOk: function() {
            var dialog = this;
            var url = dialog.getValueOf( 'tab-basic', 'url' );
            var video = ytVidId(url);
            var alt = dialog.getValueOf( 'tab-basic', 'alt' );
            var center = dialog.getValueOf( 'tab-basic', 'center' );

            var block = '<p';
            if (center != false){
                block += ' style="text-align: center;margin: 1em 0;"';
            }
            block += '>';

            editor.insertHtml(block +
            '<a href="' + url + '" style="text-decoration:none;">' +
            '<img src="https://i.wayne.edu/youtube/' + video + '" width="480" height="270" alt="' + alt + '" border="0">' +
            '</a>' +
            '</p>');
        }
    };
});

/**
 * JavaScript function to match (and return) the video Id
 * of any valid Youtube Url, given as input string.
 * @author: Stephan Schmitz <eyecatchup@gmail.com>
 * @url: http://stackoverflow.com/a/10315969/624466
 */
function ytVidId( url )
{
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return ( url.match( p ) ) ? RegExp.$1 : false;
}
