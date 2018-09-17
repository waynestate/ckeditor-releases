CKEDITOR.plugins.add( 'buttonwayne', {
    icons: 'buttonwayne',
    init: function( editor ) {
        editor.addCommand( 'buttondialog', new CKEDITOR.dialogCommand( 'buttondialog',{
        	allowedContent: 'div{text-align};' +
				'table[cellpadding,cellspacing];'+
				'tbody tr td[align,bgcolor,height,width]{border-*-radius,background-*,padding,text-align,display};' +
				'a[class="buttonwayne",href]{color,display,font-size,font-weight,font-family,line-height,text-decoration,text-shadow}'
		}));
        editor.ui.addButton( 'ButtonWayne', {
            label: 'Insert Button',
            command: 'buttondialog',
            toolbar: 'links,90'
        });

        CKEDITOR.dialog.add( 'buttondialog', this.path + 'dialogs/button.js' );
    }
});
