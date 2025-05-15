const path = require('path');

module.exports = (Encore) => {
    Encore.addAliases({
        '@ibexa-admin-ui-assets': path.resolve(
            './vendor/ibexa/admin-ui-assets'
        ),
    });
};
