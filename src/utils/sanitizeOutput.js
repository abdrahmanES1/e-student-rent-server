/**
 * sanitizeOutput from paswords and secret informations
 * @param {Object} output 
 * @returns 
 */

const sanitizeOutput = (output) => {
    if (output.hasOwnProperty('password')) { delete output.password; console.log("sanitizeOutput --")}
    
    return output;
}
module.exports = sanitizeOutput;