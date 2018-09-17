CKEDITOR.dialog.add( 'buttondialog', function( editor ) {
    return {
        title: 'Button Properties',
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
                        label: 'URL',
                        validate: CKEDITOR.dialog.validate.notEmpty( "URL field cannot be empty" )
                    },
                    {
                        type: 'text',
                        id: 'label',
                        label: 'Label',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Label field cannot be empty" )
                    },
                     {
                        type: 'checkbox',
                        id: 'center',
                        label: 'Center'
                    }
                ]
            }
        ],
        onOk: function() {
            var dialog = this;
            var url = dialog.getValueOf( 'tab-basic', 'url' );
            var label = dialog.getValueOf( 'tab-basic', 'label' );
            var center = dialog.getValueOf( 'tab-basic', 'center' );
            var html = '';

            if(center == false){
                html = '<table cellpadding="0" cellspacing="0"><tbody><tr>' +
                    '<td align="center" bgcolor="#ffda8a" height="40" style="border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; border: 1px solid rgb(255, 223, 152); background-image: linear-gradient(rgb(253, 225, 163) 5%, rgb(245, 198, 80) 100%); text-align: center; background-position: initial initial; background-repeat: initial initial;padding: 0px 15px;" width="200">' +
                    '<a class="buttonwayne" href="' + url + '" style="color: #0a4b41; font-size: 16px; text-shadow:0px 1px 0px #ffee66; font-weight: bold; font-family: Arial, Helvetica, sans-serif; text-decoration: none; line-height: 40px; width: 100%; display: inline-block;">' +
                    label +
                    '</a></td></tr></tbody></table>';
                editor.insertHtml(html);
            }
            else {
                html = '<div style="text-align: center"><table style="margin:0; padding:0; display:inline-block;" cellpadding="0" cellspacing="0"><tbody><tr>' +
                    '<td bgcolor="#ffda8a" height="40" style="border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; border: 1px solid rgb(255, 223, 152); background-image: linear-gradient(rgb(253, 225, 163) 5%, rgb(245, 198, 80) 100%); text-align: center; background-position: initial initial; background-repeat: initial initial;padding: 0px 15px;" width="200">' +
                    '<a class="buttonwayne" href="' + url + '" style="color: #0a4b41; font-size: 16px; text-shadow:0px 1px 0px #ffee66; font-weight: bold; font-family: Arial, Helvetica, sans-serif; text-decoration: none; line-height: 26px; display: inline-block;">' +
                    label +
                    '</a></td></tr></tbody></table></div>';

	            editor.insertHtml(html);
            }
        }
    };
});
