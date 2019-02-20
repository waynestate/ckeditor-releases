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
                html = `<table border="0" cellpadding="0" cellspacing="0" style="width:100%">
                <tbody>
                  <tr>
                    <td>
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                          <tr>
                            <td bgcolor="#fdd891" style="border-radius:5px;background-color:#fdd891">
                              <a
                                href="${url}"
                                style="border-radius:5px; border:1px solid #fdd891; color:#0c5449; display:inline-block; font-family:Helvetica,Arial,sans-serif; font-size:16px; font-weight:bold; padding:12px 18px; text-decoration:none"
                                target="_blank"
                                rel="noopener"
                                class="buttonwayne"
                                >${label}</a
                              >
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>`;

                editor.insertHtml(html);
            }
            else {
                html = `<table border="0" cellpadding="0" cellspacing="0" style="width:100%">
                <tbody>
                  <tr>
                    <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                          <tr>
                            <td bgcolor="#fdd891" style="border-radius:5px;background-color:#fdd891">
                              <a
                                href="${url}"
                                style="border-radius:5px; border:1px solid #fdd891; color:#0c5449; display:inline-block; font-family:Helvetica,Arial,sans-serif; font-size:16px; padding:12px 18px; font-weight:bold; text-decoration:none"
                                target="_blank"
                                rel="noopener"
                                class="buttonwayne"
                                >${label}
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>`;

                editor.insertHtml(html);
            }
        }
    };
});
