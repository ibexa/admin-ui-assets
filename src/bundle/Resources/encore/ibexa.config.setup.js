const path = require('path');

module.exports = (Encore) => {
    Encore.addAliases({
        '@ibexa-admin-ui-assets': path.resolve('./vendor/ibexa/admin-ui-assets'),
        '@ds-assets': path.resolve('./vendor/ibexa/admin-ui-assets/src/bundle/Resources/public/vendors/design-system-assets/dist'),
        '@ds-components': path.resolve('./vendor/ibexa/admin-ui-assets/src/bundle/Resources/public/vendors/design-system-components/dist'),
    });
};
