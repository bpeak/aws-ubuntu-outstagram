const types = require('./schemaTypes')

const user = {
    id : {
        type : types.STRING
    },
    pw : {
        type : types.STRING
    },
    likes : {
        type : types.ARRAY
    }
}

module.exports = user