VirtuNewsletter.window.ImportCsv = function (config) {
    config = config || {};

    var check = Ext.getCmp('virtunewsletter-window-importcsv');
    if (check) {
        check.destroy();
    }

    var allCategories = [];
    if (config.record && config.record.allCategories) {
        for (var key in config.record.allCategories) {
            key = Number(key);
            if (config.record.allCategories.hasOwnProperty(key)) {
                allCategories.push({
                    xtype: 'xcheckbox',
                    boxLabel: config.record.allCategories[key],
                    name: 'categories['+key+']',
                    value: key
                });
            }
        }
    }

    Ext.applyIf(config, {
        id: 'virtunewsletter-window-importcsv',
        title: _('virtunewsletter.select_file'),
        width: 800,
        height: 'auto',
        modal: true,
        preventRender: true,
        fileUpload: true,
        layout: 'form',
        labelWidth: 100,
        labelAlign: 'left',
        fields: [
            {
                layout: 'column',
                defaults: {
                    columnWidth: .5,
                    layout: 'form',
//                    labelWidth: 100,
                    labelAlign: 'left'
                },
                items: [
                    {
                        items: [
                            {
                                html: '<p>' + _('virtunewsletter.import_desc') + '</p>',
                                bodyCssClass: 'panel-desc'
                            }, {
                                fieldLabel: _('virtunewsletter.select_file'),
                                xtype: 'fileuploadfield',
                                id: 'virtunewsletter-input-file',
                                emptyText: '',
                                name: 'file',
                                buttonText: _('virtunewsletter.browse'),
                                allowBlank: false,
                                anchor: '100%'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: _('virtunewsletter.delimiter'),
                                name: 'delimiter',
                                emptyText: ',',
                                anchor: '100%'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: _('virtunewsletter.enclosure'),
                                name: 'enclosure',
                                emptyText: '"',
                                anchor: '100%'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: _('virtunewsletter.escape'),
                                name: 'escape',
                                emptyText: '\\\\',
                                anchor: '100%'
                            }
                        ]
                    }, {
                        items: [
                            {
                                html: '<p>' + _('virtunewsletter.fieldnames_conversion') + '</p>',
                                bodyCssClass: 'panel-desc'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: _('virtunewsletter.name_field'),
                                name: 'name',
                                anchor: '100%'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: _('virtunewsletter.email_field'),
                                name: 'email',
                                anchor: '100%'
                            }, {
                                fieldLabel: _('virtunewsletter.categories'),
                                itemCls: 'x-check-group-alt',
                                items: allCategories
                            }, {
                                xtype: 'xcheckbox',
                                fieldLabel: _('virtunewsletter.active'),
                                name: 'is_active',
                                anchor: '100%'
                            }
                        ]
                    }
                ]
            }
        ],
        buttons: [
            {
                text: _('upload'),
                handler: this.upload,
                scope: this
            }, {
                text: _('reset'),
                handler: this.reset,
                scope: this
            }, {
                text: config.cancelBtnText || _('cancel'),
                handler: function () {
                    config.closeAction !== 'close' ? this.hide() : this.close();
                },
                scope: this
            }
        ]
    });
    VirtuNewsletter.window.ImportCsv.superclass.constructor.call(this, config);
};

Ext.extend(VirtuNewsletter.window.ImportCsv, MODx.Window, {
    upload: function () {
        var form = this.fp.getForm();
        if (form.isValid()) {
            var file = Ext.get('virtunewsletter-input-file').getValue();
            if (!file) {
                Ext.MessageBox.alert(_('virtunewsletter.error'), _('virtunewsletter.file_err_ns'));
                return false;
            }
            var _this = this;
            return form.submit({
                url: VirtuNewsletter.config.connectorUrl,
                params: {
                    action: 'mgr/subscribers/importcsv'
                },
                waitMsg: _('virtunewsletter.waiting_msg'),
                success: function (fp, o) {
                    Ext.MessageBox.alert(_('virtunewsletter.succeeded'), o.result.message);
                    fp.reset();
                    _this.config.closeAction !== 'close' ? _this.hide() : _this.close();
                    var subscribersGrid = Ext.getCmp('virtunewsletter-grid-subscribers');
                    return subscribersGrid.refresh();
                },
                failure: function (fp, o) {
                    Ext.MessageBox.alert(_('virtunewsletter.failed'), o.result.message);
                    fp.reset();
                }
            });
        }
    }
});
Ext.reg('virtunewsletter-window-importcsv', VirtuNewsletter.window.ImportCsv);