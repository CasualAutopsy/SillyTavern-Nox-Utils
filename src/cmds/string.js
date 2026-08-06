import { commonEnumProviders } from '/scripts/slash-commands/SlashCommandCommonEnumsProvider.js';

const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    SlashCommandEnumValue, ARGUMENT_TYPE
} = SillyTavern.getContext();

const { zip } = SillyTavern.libs.lodash;

const { toRegExp } = NoxLib.StringOps.RegExHelper;
const { boolParse, jsonParse } = NoxLib.CoercionAndShorthand.ValCoercion;

const boolProvider = commonEnumProviders.boolean("trueFalse");

/**
 * Initializes the string operations slash commands.
 */
export async function initStringOpsCMDs(){
    /**
     * Matches all occurrences of a regex in a string and returns them as an array.
     */
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: "re-match-all",
        callback: async (args, val) => {
            const dedupe = typeof args.dedupe === 'string' && args.dedupe !== ''
                ? boolParse(args.dedupe)
                : false

            const find = typeof args.find === 'string' && args.find !== ''
                ? toRegExp(args.find)
                : null

            if (dedupe) {
                return JSON.stringify([...new Set(val.matchAll(toRegExp(args.find)).map(m => m[0]))]);
            } else {
                return JSON.stringify([...val.matchAll(toRegExp(args.find)).map(m => m[0])]);
            }
        },
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: "find",
                description: "Regex to match",
                typeList: [ARGUMENT_TYPE.STRING],
                isRequired: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: "dedupe",
                description: "Dedupe matches",
                typeList: [ARGUMENT_TYPE.BOOLEAN],
                enumProvider: boolProvider,
                isRequired: false,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: "Text to search",
                typeList: [ARGUMENT_TYPE.STRING],
                isRequired: true
            }),
        ],
        splitUnnamedArgument: false,
        helpString: "Finds all matches of a regex in a string",
        returns: "Array of matches",
    }));

    /**
     * Replaces all occurrences of a list of RegExps in a string with a list replacement strings.
     */
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: "re-foreach",
        callback: async (args, val) => {
            const fr_zip = zip(jsonCoercion(args.find), jsonCoercion(args.replace));

            fr_zip.forEach(([re_find, re_replace]) => {
                val = val.replaceAll(toRegExp(re_find), re_replace);
            });

            return val;
        },
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: "find",
                description: "Regex to match",
                typeList: [ARGUMENT_TYPE.LIST],
                isRequired: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: "replace",
                description: "Replacement string",
                typeList: [ARGUMENT_TYPE.LIST],
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: "Text to search",
                typeList: [ARGUMENT_TYPE.STRING],
                isRequired: true
            }),
        ],
        splitUnnamedArgument: false,
        helpString: "Replaces all occurrences of a list of RegExps in a string with a list replacement strings",
        returns: "String with replacements",
    }));

    /**
     * Replaces all substring occurrences of a list of strings with a list of strings.
     */
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: "ss-foreach",
        callback: async (args, val) => {
            const fr_zip = zip(jsonCoercion(args.find), jsonCoercion(args.replace));

            fr_zip.forEach(([str_find, str_replace]) => {
                val = val.replaceAll(str_find, str_replace);
            });

            return val;
        },
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: "find",
                description: "Array of strings to find",
                typeList: [ARGUMENT_TYPE.LIST],
                isRequired: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: "replace",
                description: "Array of strings to replace",
                typeList: [ARGUMENT_TYPE.LIST],
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: "Text to search",
                typeList: [ARGUMENT_TYPE.STRING],
                isRequired: true
            }),
        ],
        splitUnnamedArgument: false,
        helpString: "Replaces all substring occurrences of a list of strings with a list of strings",
        returns: "String with replacements",
    }));

}
