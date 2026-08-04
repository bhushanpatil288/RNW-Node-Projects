const morgan = require('morgan');

const morganMiddleware = morgan('dev');

const info = (message, meta = {}) => {
    console.log(message, meta);
};

const error = (message, meta = {}) => {
    console.error(message, meta);
};

module.exports = {
    morganMiddleware,
    info,
    error,
};
