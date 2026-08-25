import { handlerKWFocuser } from './keywords-adv-handlers.js';

const { macros } = SillyTavern.getContext();

/**
 * @import {} from '../../../global'
 */

/**
 * Initiate Advance keyword behavior macros.
 */
export async function initAdvKeywordBehavior() {
    macros.register(
        "kwFocuser",
        {
            category: "Nox Utils - Adv. Keyword Behavior",
            unnamedArgs: [
                {
                    name: "scan_content",
                    optional: false,
                    description: "The content to scan for the keyword focuser.",
                },
                {
                    name: "whole_words",
                    optional: false,
                    description: "Whether or not to scan keywords with word boundaries.",
                    defaultValue: 'true',
                },
                {
                    name: "prefix",
                    optional: false,
                    description: "The match prefix when a keyword is matched.",
                },
                {
                    name: "suffix",
                    optional: false,
                    description: "The match suffix when a keyword is matched.",
                },
            ],
            list: {
                min: 1
            },
            description: "Injects that matched keyword into the prompt with the desired prefix and suffix.",
            returns: "The formatted matched keyword, otherwise an empty string.",
            handler: handlerKWFocuser,
        }
    )
}
