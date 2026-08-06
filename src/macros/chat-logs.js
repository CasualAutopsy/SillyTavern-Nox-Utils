const { macros } = SillyTavern.getContext();

const { getLastChatInstanceRole, getLastNChatMessages } = NoxLib.ChatLogManipulation.ChatInfo;

const { shorthandStringResolver, shorthandIntResolver } = NoxLib.MacroCoercionAndShorthand.VarShorthand;

/**
 * @typedef {[isUser: Boolean, isSystem: Boolean]} RoleTuple
 *
 * @typedef {Object} RoleEnum
 * @property {RoleTuple} user
 * @property {RoleTuple} system
 * @property {RoleTuple} assistant
 */


/**
 * @type {RoleEnum}
 */
const ROLETUPLE = {
    "user":         [true,  false],
    "system":       [false, true],
    "assistant":    [false, false],
}

export async function initChatLogMacros() {
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
            "handler": ({unnamedArgs: [roleRaw], resolve}) => {
                roleRaw = shorthandStringResolver(roleRaw, resolve);

                const
                    role = ['system', 'assistant'].includes(roleRaw)
                        ? roleRaw === 'system'
                            ? ROLETUPLE.system
                            : ROLETUPLE.assistant
                        : ROLETUPLE.user;

                const msg = getLastChatInstanceRole(role)?.mes;

                return msg !== undefined
                    ? msg
                    : '';
            }
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
            "handler": ({unnamedArgs: [nRaw], resolve}) => {
                const
                    n = shorthandIntResolver(nRaw, resolve),
                    msgs = getLastNChatMessages(n);

                return msgs.map(msg => msg.mes).join('\n\n');
            }
        }
    );
}
