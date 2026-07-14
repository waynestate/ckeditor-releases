/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';

    config.versionCheck = false;

    config.extraPlugins = 'buttonwayne,image2,youtube,youtubethumb,abbr,wsuformat';

    config.skin = 'moono';
    config.image2_altRequired = false;
    config.image2_captionedClass = 'figure';
    config.pasteFromWordRemoveFontStyles = true;

    // Allow `lang` attribute to be applied
    config.language_list = [ 'ar:Arabic:rtl', 'zh:Chinese', 'fr:French', 'de:German', 'id:Indonesian', 'it:Italian', 'ja:Japanese', 'ko:Korean', 'la:Latin', 'pt:Portuguese', 'es:Spanish', 'th:Thai', 'tr:Turkish', 'vi:Vietnamese'];

    // ACF rules not allowed by any plugins
    config.extraAllowedContent = '*(*)[data-*,aria-*];' + // allow all classes and any data or aria attribute on all elements
        'iframe{*}[width,height,src,allowfullscreen,title,allow,frameborder];' + // Don't require the attributes that the YouTube Plugin required
        'img{margin*,padding*}[usemap];' + // Allow margins and padding on <img> to be modifiable
        'blockquote cite;' + // Allow <cite> to be within the <blockquote>
        'dl dd dt;' + // Allow <dl> <dd> and <dt> elements due to old Accordion code on older sites, can be removed in the future when not needed
        'script(*)[*];' + // Allow script tags to be inserted
        'h1{line-height};h2{line-height};h3{line-height};h4{line-height};' + // Allow headers in the HTML editor to have line-heights
        'a[aria-label];' + // Allow aria-label on anchors
        'map[id,name];area[shape,coords,href,alt];' + // Allow map and area elements
        'span;' // Allow span elements
    ;

    // Only allow specific link targets
    CKEDITOR.on('dialogDefinition', function(evt) {
        var dialogName = evt.data.name;
        var dialogDefinition = evt.data.definition;

        // When viewing the Link dialog box
        if (dialogName == 'link') {
            // Set the https protocol as the default
            var infoTab = dialogDefinition.getContents('info');
            var protocolField = infoTab.get('protocol');
            protocolField.default = 'https://';

            // Set only specific targets when viewing the Link dialog box
            var targetTab = dialogDefinition.getContents('target');
            var targetField = targetTab.get('linkTargetType');
            targetField.items = targetField.items.filter(target => ['_blank', '_self', '_top', '_parent', 'notSet'].includes(target[1]));
        }

        // Table Dialog default settings Cell Padding is null, Border is null and width is 100%
        if(dialogName === 'table') {
            var infoTab = dialogDefinition.getContents('info');

            var cellPadding = infoTab.get('txtCellPad');
            cellPadding['default'] = "";
            var cellSpacing = infoTab.get('txtCellSpace');
            cellSpacing['default'] = "";
            var border = infoTab.get('txtBorder');
            border['default'] = "";
            var width = infoTab.get('txtWidth');
            width['default'] = "100%";
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
        if ( evt.editor.dataProcessor && evt.editor.dataProcessor.htmlFilter ) {
            evt.editor.dataProcessor.htmlFilter.addRules({
                elements: {
                    $: function (element) {
                        const textTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li'];

                        if (textTags.includes(element.name) && element.children) {
                            element.children.forEach(function (child) {
                                if (child.type === CKEDITOR.NODE_TEXT) {
                                    child.value = child.value.replace(/&nbsp;/g, ' ');
                                }
                            });
                        }
                    }
                },
            }, {
                applyToAll: true,
            });
        }

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
                        return el.attributes.alt && el.attributes.alt.length !== 0 && el.attributes.alt.indexOf('"') !== -1;
                    },
                    right: function(el){
                        el.attributes.alt = el.attributes.alt.replace(/"/ig, '');
                    }
                },
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
                        return el.parent && el.parent.classes.indexOf('figure') !== -1;
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
                },
                {
                    element: 'figure',
                    left: function(el) {
                        return el.find('img');
                    },
                    right: function(el) {
                        var imgs = el.find('img');

                        if (imgs.length > 0) {
                            imgs.forEach(function (img) {
                                if (img.attributes.align) {
                                    delete (img.attributes.align);
                                }
                            });
                        }
                    }
                }
            ]
        ]);
    });

    config.toolbar_page = [
        ['Source','-','Cut','Copy','Paste','PasteText','PasteFromWord','-','Print'],
        ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
        ['Image','Table','HorizontalRule','SpecialChar','Abbr','PageBreak'],
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
        ['Source','-','Cut','Copy','Paste','PasteText','PasteFromWord','-','Print'],
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
        ['Source','-','Cut','Copy','Paste','PasteText','PasteFromWord','-','Print'],
        ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
        ['Image','Table','HorizontalRule','SpecialChar','PageBreak'],
        '/',
        ['Bold','Italic','Strike','-','Subscript','Superscript'],
        ['NumberedList','BulletedList','-'],
        ['JustifyLeft','JustifyCenter','JustifyRight'],
        ['Language','Link','Unlink','Anchor','ButtonWayne','YoutubeThumb'],
        '/',
        ['WSUFormat','FontSize','TextColor'],
        ['Maximize', 'ShowBlocks','-','About']
    ];
    config.toolbar_newsroom = [
        ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo'],
        ['Language','Link','Unlink','Anchor'],
        ['Image','Table','HorizontalRule','SpecialChar', 'Youtube'],
        ['Maximize'],
        ['Source'],
        '/',
        ['Bold','Italic','Strike','RemoveFormat','-','Subscript','Superscript'],
        ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
        ['Format'],
        ['About']
    ];
    config.toolbar_forms = [
        ['Bold','Italic','Underline', 'Strike','-','JustifyLeft','JustifyCenter','JustifyRight','BulletedList','NumberedList', 'Undo', 'Redo', 'Link', 'Unlink', 'Image', '-', 'PasteText', 'RemoveFormat', 'Source'],
    ];
    config.toolbar_events = [
        ['Bold','Italic','Underline', 'Strike','-','JustifyLeft','JustifyCenter','JustifyRight','BulletedList','NumberedList', 'Undo', 'Redo', 'Link', 'Unlink', 'Image', '-', 'PasteText', 'RemoveFormat', 'Source'],
    ];
};
