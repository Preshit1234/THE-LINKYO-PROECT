// Helper functions

/**
 * Checks whether the object is empty or not
 * @param {Object} object A javascript/json object.
 * @returns {Boolean}
 */
function isObjectEmpty(object) {
    if (object === undefined) {
        return true;
    } else if (object === null) {
        return true;
    } else {
        return Object.keys(object).length > 0 ? false : true;
    }
}

/**
 * Checks whether the string is empty or not.
 * @param {Object} string A string.
 * @returns {Boolean}
 */
function isStringEmpty(string) {
    if (string === undefined) {
        return true;
    } else if (string === null) {
        return true;
    } else {
        return string.length > 0 ? false : true;
    }
}

/**
 * Checks whether the data is from the mongodb database or not.
 * @param {Object} databaseResponse Database response data.
 * @param {String} databaseResponse._id Id assigned by the database.
 * @param {Number} databaseResponse.__v Internal version number assigned by database.
 * @returns {Boolean}
 */
function isDataFromOurDatabase(databaseResponse) {
    if('_id' in databaseResponse && '__v' in databaseResponse && databaseResponse._id.length > 0) { return true; } else { return false; };
}

/**
 * Checks whether the email is valid or not.
 * @param {String} email Email string.
 * @returns {Boolean}
 */
function isEmailValid(email = "") {
    if(
        email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ) {
        return true;
    } else {
        return false;
    }
}

module.exports = { isObjectEmpty, isStringEmpty, isDataFromOurDatabase, isEmailValid };