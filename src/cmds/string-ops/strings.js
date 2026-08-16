// @ts-nocheck
import { capitalizeCallback, titleizeCallback } from './strings-callbacks.js';

const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE
} = SillyTavern.getContext();

/**
 * @import {} from '../../global'
 */


/**
 * Initialize the string op slash commands.
 */
export async function initStringOps() {
    /********************************************
     * === capitalize ===                       *
     * Capitalize the first letter of a string. *
     ********************************************/
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        "name": 'capitalize',
        "aliases": ['cap', 'nox-cap'],
        "callback": capitalizeCallback,
        "unnamedArgumentList": [
            SlashCommandArgument.fromProps({
                "description": 'The string to capitalize.',
                "typeList": [ARGUMENT_TYPE.STRING],
                "isRequired": true,
            }),
        ],
        "splitUnnamedArgument": false,
        "helpString": `Capitalize the first letter of a string.`,
        "returns": 'The capitalized string',
    }));

    /*********************************************************
     * === titleize ===                                      *
     * Capitalize the first letter of each word in a string. *
     *********************************************************/
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        "name": 'titleize',
        "aliases": ['title', 'nox-title'],
        "callback": titleizeCallback,
        "unnamedArgumentList": [
            SlashCommandArgument.fromProps({
                "description": 'The string to titleize.',
                "typeList": [ARGUMENT_TYPE.STRING],
                "isRequired": true,
            }),
        ],
        "splitUnnamedArgument": false,
        "helpString": `Capitalize the first letter of each word in a string.`,
        "returns": 'The titleized string',
    }));
}
