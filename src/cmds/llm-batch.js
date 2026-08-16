// @ts-nocheck
const { SlashCommand, SlashCommandParser, SlashCommandArgument, SlashCommandNamedArgument, ARGUMENT_TYPE } = SillyTavern.getContext();

const { llmBatchFetch } = NoxLib;

/**
 * @import {} from '../../global'
 */


async function llmBatchCallback(args, val) {
    const batch_promise = await llmBatchFetch(args.baseURL, args.endPoint, JSON.parse(val), JSON.parse(args.params));

    console.error(batch_promise);

    return await Promise.all(batch_promise);
}

export async function initLLMBatch() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        "name": 'llm-batch',
        "callback": llmBatchCallback,
        "namedArgumentList": [
            SlashCommandNamedArgument.fromProps({
                "name": "baseURL",
            }),
            SlashCommandNamedArgument.fromProps({
                "name": "endPoint",
            }),
            SlashCommandNamedArgument.fromProps({
                "name": "params",
            }),
        ],
        "unnamedArgumentList": [
            SlashCommandArgument.fromProps({
                "name": "prompts",
                "type": ARGUMENT_TYPE.STRING,
            }),
        ],
        "splitUnnamedArgument": false
    }));
}
