const path = require('path');

module.exports = (Encore) => {
    Encore.addAliases({
        '@ibexa-admin-ui-assets': path.resolve('./vendor/ibexa/admin-ui-assets'),
        '@ids-assets': path.resolve('./vendor/ibexa/admin-ui-assets/src/bundle/Resources/public/vendors/ids-assets/dist'),
        '@ids-components': path.resolve('./vendor/ibexa/admin-ui-assets/src/bundle/Resources/public/vendors/ids-components/dist'),
        '@ids-core': path.resolve('./vendor/ibexa/admin-ui-assets/src/bundle/Resources/public/vendors/ids-core/dist'),
        '@popperjs/core': path.resolve('./vendor/ibexa/admin-ui-assets/src/bundle/Resources/public/vendors/@popperjs/core/lib'),
    });
};
