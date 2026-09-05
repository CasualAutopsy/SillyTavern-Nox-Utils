// @ts-check
const { chatLastRoleInstance, chatLastNMessages } = NoxLib.ChatMessageMethods.ChatRetrieval;

const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../global'
 *
 * @typedef {import('../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

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

/**
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String}
 */
function handlerLastMsgByRole({unnamedArgs: [role]}) {
    /** @type {RoleTuple} */
    const role_tuple = ['system', 'assistant'].includes(role)
        ? role === 'system'
            ? ROLETUPLE.system
            : ROLETUPLE.assistant
        : ROLETUPLE.user;

    const msg = chatLastRoleInstance(role_tuple)?.mes;

    return msg !== undefined
        ? msg
        : '';
}

/**
 *
 * @param {MacroExecutionContext} param0 - Macro context.
 * @returns {String}
 */
function handlerLastNMessages({unnamedArgs: [n]}) {
    const msgs = chatLastNMessages(
        argH.parse(n, "int")
    );

    return msgs.map(msg => msg.mes).join('\n\n');
}

export { handlerLastMsgByRole, handlerLastNMessages };
