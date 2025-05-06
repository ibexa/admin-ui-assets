const path = require('path');

module.exports = (Encore) => {
    Encore.addAliases({
        '@react-dom': path.resolve('./public/bundles/ibexaadminuiassets/vendors/react-dom'),
        '@ibexa-admin-ui-assets': path.resolve('./vendor/ibexa/admin-ui-assets'),
        '@ids-assets': path.resolve('./vendor/ibexa/admin-ui-assets/src/bundle/Resources/public/vendors/design-system-assets/dist'),
        '@ids-components': path.resolve('./vendor/ibexa/admin-ui-assets/src/bundle/Resources/public/vendors/design-system-components/dist'),
    });
};
