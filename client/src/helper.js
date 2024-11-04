// Helper functions

/**
 * Checks whether the object is empty or not
 * @param {Object} object A javascript/json object.
 * @returns {Boolean}
 */
export function isObjectEmpty(object) {
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
export function isStringEmpty(string) {
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
export function isDataFromOurDatabase(databaseResponse) {
    if('_id' in databaseResponse && '__v' in databaseResponse && databaseResponse._id.length > 0) { return true; } else { return false; };
}

/**
 * Checks whether the email is valid or not.
 * @param {String} email Email string.
 * @returns {Boolean}
 */
export function isEmailValid(email) {
    if(
        email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ) {
        return true;
    } else {
        return false;
    }
}

/**
 * Generates a random string of given length
 * Credits: Code posted in 'https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript' post by the user 'csharptest.net'
 * @param {Integer} length Length of the generated random string
 * @returns {String} A random string of given length
 */
export function createRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}