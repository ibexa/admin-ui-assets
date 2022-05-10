const path = require('path');

module.exports = (Encore) => {
    Encore.addAliases({
        '@react-dom': path.resolve('../pubic/vendors/react-dom'),
    });
};
