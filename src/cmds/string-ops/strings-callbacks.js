// @ts-check

/**
 * @import {} from '../../../global'
 *
 * @typedef {import('../../../../../../slash-commands/SlashCommand').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../slash-commands/SlashCommand').UnnamedArguments} UnnamedArguments
 */

/**
 * Capitalizes the first letter of a string.
 *
 * @param {NamedArguments} _ - Named arguments.
 * @param {String} val - Unnamed arguments.
 *
 * @returns {Promise<String>} The capitalized string.
 */
async function capitalizeCallback(_, val) {
    return val.charAt(0).toUpperCase() + val.substring(1);
}

/**
 * Capitalizes the first letter of each word in a string.
 *
 * @param {NamedArguments} _ - Named arguments.
 * @param {String} val - Unnamed arguments.
 *
 * @returns {Promise<String>} The capitalized string.
 */
async function titleizeCallback(_, val) {
    return val.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.substring(1)
    ).join(' ');
}

export { capitalizeCallback, titleizeCallback };
