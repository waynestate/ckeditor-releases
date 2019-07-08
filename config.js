/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';

    config.extraPlugins = 'buttonwayne,image2,youtube,youtubethumb';

    config.skin = 'moono';
    config.image2_altRequired = false;
    config.image2_captionedClass = 'figure';
    config.pasteFromWordRemoveFontStyles = true;

    // Allow `lang` attribute to be applied
    config.language_list = [ 'ar:Arabic:rtl', 'zh:Chinese', 'fr:French', 'de:German', 'id:Indonesian', 'it:Italian', 'ja:Japanese', 'ko:Korean', 'la:Latin', 'pt:Portuguese', 'es:Spanish', 'th:Thai', 'tr:Turkish', 'vi:Vietnamese'];

    // ACF rules not allowed by any plugins
    config.extraAllowedContent = '*(*)[data-*];' + // allow all classes and any data attribute on all elements
        'iframe{*}[width,height,src,allowfullscreen,title];' + // Don't require the attributes that the YouTube Plugin required
        'img{margin*,padding*};' + // Allow margins and padding on <img> to be modifiable
        'blockquote cite;' + // Allow <cite> to be within the <blockquote>
        'dl dd dt;' + // Allow <dl> <dd> and <dt> elements due to old Accordion code on older sites, can be removed in the future when not needed
        'script(*)[*];' // Allow script tags to be inserted
    ;

    // Only allow specific link targets
    CKEDITOR.on('dialogDefinition', function(evt) {
        var dialogName = evt.data.name;
        if (dialogName == 'link') {
            var dialogDefinition = evt.data.definition;
            var informationTab = dialogDefinition.getContents('target');
            var targetField = informationTab.get('linkTargetType');

            targetField.items = targetField.items.filter(target => ['_blank', '_self', '_top', '_parent', 'notSet'].includes(target[1]));
        }
    });

    // Remove allowed margins when pasting from Word
    this.on('afterPasteFromWord', function(evt){
        var filter = evt.editor.filter.clone(),
            fragment = CKEDITOR.htmlParser.fragment.fromHtml( evt.data.dataValue ),
            writer = new CKEDITOR.htmlParser.basicWriter();

        // Disallow certain styles.
        filter.disallow( 'p{margin-*};*(Mso*)' );

        // Process, and overwrite evt.data.dataValue.
        filter.applyTo( fragment );
        fragment.writeHtml( writer );
        evt.data.dataValue = writer.getHtml();
    });

    this.on('instanceReady', function (evt){
        evt.editor.filter.addTransformations([
            [
                {
                    element: 'a',
                    left: function(el) {
                        var is_external = (el.attributes.hasOwnProperty('href') && el.attributes.href.substr(0, 4) === 'http' && el.attributes.target === '_blank');

                        return is_external && !el.attributes.rel;
                    },
                    right: function(el){
                        el.attributes.rel = 'noopener';
                    }
                }
            ],
            [
                {
                    element: 'img',
                    left: function(el) {
                        return Object.keys(el.styles).length === 0;
                    },
                    right: function(el){
                        el.styles['padding'] = '10px';
                    }
                },
                {
                    element: 'img',
                    left: function(el) {
                        return el.parent && el.parent.attributes && el.parent.attributes.hasOwnProperty('data-flickr-embed') && el.parent.attributes['data-flickr-embed'];
                    },
                    right: function(el) {
                        el.styles['padding'] = 0;
                    }
                },
                {
                    element: 'img',
                    left: function(el) {
                        return el.parent && el.parent.classes.indexOf('figure');
                    },
                    right: function(el) {
                        delete (el.styles['padding']);
                        el.styles['padding-bottom'] = '10px';
                    }
                },
            ],
            [
                {
                    element: 'figure',
                    left: function(el) {
                        return Object.keys(el.styles).length === 0;
                    },
                    right: function(el){
                        el.styles['padding'] = '10px';
                    }
                },
                {
                    element: 'figure',
                    left: function(el) {
                        return el.classes.indexOf('figure') === -1
                    },
                    right: function(el){
                        el.classes.push('figure');
                    }
                }
            ]
        ]);
    });

    config.toolbar_page = [
        ['Source','-','Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
        ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
        ['Image','Table','HorizontalRule','SpecialChar','PageBreak'],
        '/',
        ['Bold','Italic','Strike','-','Subscript','Superscript'],
        ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote','CreateDiv'],
        ['JustifyLeft','JustifyCenter','JustifyRight'],
        ['Language','Link','Unlink','Anchor','Youtube'],
        '/',
        ['Format'],
        ['Maximize', 'ShowBlocks','-','About']
    ];
    config.toolbar_newsletter = [
        ['Source','-','Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
        ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
        ['Image','Table','HorizontalRule','SpecialChar','PageBreak'],
        '/',
        ['Bold','Italic','Strike','-','Subscript','Superscript'],
        ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote','CreateDiv'],
        ['JustifyLeft','JustifyCenter','JustifyRight'],
        ['Language','Link','Unlink','Anchor','Youtube'],
        '/',
        ['Format','FontSize','TextColor'],
        ['Maximize', 'ShowBlocks','-','About']
    ];
    config.toolbar_email = [
        ['Source','-','Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
        ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
        ['Image','Table','HorizontalRule','SpecialChar','PageBreak'],
        '/',
        ['Bold','Italic','Strike','-','Subscript','Superscript'],
        ['NumberedList','BulletedList','-'],
        ['JustifyLeft','JustifyCenter','JustifyRight'],
        ['Language','Link','Unlink','Anchor','ButtonWayne','YoutubeThumb'],
        '/',
        ['Format','FontSize','TextColor'],
        ['Maximize', 'ShowBlocks','-','About']
    ];
    config.toolbar_newsroom = [
        ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo'],
        ['Scayt'],
        ['Language','Link','Unlink','Anchor'],
        ['Image','Table','HorizontalRule','SpecialChar'],
        ['Maximize'],
        ['Source'],
        '/',
        ['Bold','Italic','Strike','RemoveFormat','-','Subscript','Superscript'],
        ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
        ['Format'],
        ['About']
    ];
};
