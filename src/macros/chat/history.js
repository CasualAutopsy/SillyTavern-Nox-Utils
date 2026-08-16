import { handlerLastMsgByRole, handlerLastNMessages } from './history-handlers.js';

const { macros } = SillyTavern.getContext();

/**
 * @import {} from '../../../global'
 */

export async function initChatHistory() {
    macros.register(
        'lastMsgByRole',
        {
            "category": 'Nox Utils - Chat History & Messages',
            "unnamedArgs": [
                {
                    "name": 'role',
                    "type": 'string',
                    "sampleValue": 'assistant, system, .localVar, $globalVar',
                    "description": 'The role to search for. Can be "user", "system", or "assistant".',
                    "defaultValue": 'user',
                    "optional": false,
                },
            ],
            "description": 'Gets the last message from the chat log by the given role.',
            "returns": 'The message content of the most recent message of a given role.',
            "returnType": 'string',
            "displayOverride": '{{lastMsgByRole::role}}',
            "exampleUsage": [
                '{{lastMsgByRole::assistant}}',
                '{{lastMsgByRole::}}',
                '{{lastMsgByRole::.localVar}}',
                '{{lastMsgByRole::$globalVar}}',
            ],
            "handler": handlerLastMsgByRole
        }
    );

    macros.register(
        'lastNMessages',
        {
            "category": 'Nox Utils - Chat History & Messages',
            "unnamedArgs": [
                {
                    "name": 'n',
                    "type": 'number',
                    "sampleValue": '1, 3, .localVar, $globalVar',
                    "description": 'The number of messages to return.',
                    "optional": false,
                },
            ],
            "description": 'Gets the last n messages from the chat log.',
            "returns": 'The message content of the most recent messages.',
            "returnType": 'string',
            "displayOverride": '{{lastNMessages::n}}',
            "exampleUsage": [
                '{{lastNMessages::1}}',
                '{{lastNMessages::3}}',
                '{{lastNMessages::.localVar}}',
                '{{lastNMessages::$globalVar}}',
            ],
            "handler": handlerLastNMessages
        }
    );
}
