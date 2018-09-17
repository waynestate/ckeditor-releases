CKEDITOR.plugins.add( 'youtubethumb', {
    icons: 'youtubethumb',
    init: function( editor ) {
        editor.addCommand( 'youtubethumbdialog', new CKEDITOR.dialogCommand( 'youtubethumbdialog' ) );
        editor.ui.addButton( 'YoutubeThumb', {
            label: 'Insert YouTube Thumbnail',
            command: 'youtubethumbdialog',
            toolbar: 'links,100'
        });

        CKEDITOR.dialog.add( 'youtubethumbdialog', this.path + 'dialogs/button.js' );
    }
});
