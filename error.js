class dbAlreadyInit extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    };
};

class dbNotInit extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    };
};

class lackOfID extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    };
};

class missingFields extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}

module.exports = {
    dbAlreadyInit,
    dbNotInit,
    lackOfID,
    missingFields
};