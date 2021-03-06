VirtuNewsletter.window.NewsletterTest = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        url: VirtuNewsletter.config.connectorUrl,
        autoHeight: true,
        preventRender: true,
        saveBtnText: _('send'),
        fields: [
            {
                xtype: 'hidden',
                name: 'id',
                value: config.record &&
                        config.record.id ? config.record.id : 0
            }, {
                xtype: 'textfield',
                fieldLabel: _('virtunewsletter.email') + ':',
                name: 'email',
                allowBlank:  false,
                anchor: '100%'
            }
        ]
    });
    VirtuNewsletter.window.NewsletterTest.superclass.constructor.call(this, config);
};
Ext.extend(VirtuNewsletter.window.NewsletterTest, MODx.Window);
Ext.reg('virtunewsletter-window-newsletter-test', VirtuNewsletter.window.NewsletterTest);