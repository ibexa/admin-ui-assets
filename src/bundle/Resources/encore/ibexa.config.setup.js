const path = require('path');

module.exports = (Encore) => {
    Encore.addAliases({
        '@react-dom': path.resolve('./public/bundles/ibexaadminuiassets/vendors/react-dom'),
    });
};
