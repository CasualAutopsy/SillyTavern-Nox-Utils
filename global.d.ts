import getContext from '../../../st-context.js';
import libs from '../../../../lib.js';

import CoercionAndShorthand from '../STLibs-Nox-Library/lib/coercion.js';
import MacroCoercionAndShorthand from '../STLibs-Nox-Library/lib/coercion-macros.js';
import MacroHelpers from '../STLibs-Nox-Library/lib/macro-helpers.js';
import StringOps from '../STLibs-Nox-Library/lib/string-ops.js';
import ChatLogManipulation from '../STLibs-Nox-Library/lib/chat-logs.js';
import KoboAPI from '../STLibs-Nox-Library/lib/kobo-endpoint.js';

declare global {
    var SillyTavern: {
        getContext(): typeof getContext;
        libs: typeof libs;
    }

    var NoxLib: {
        CoercionAndShorthand: typeof CoercionAndShorthand;
        MacroCoercionAndShorthand: typeof MacroCoercionAndShorthand;

        MacroHelpers: typeof MacroHelpers;

        StringOps: typeof StringOps;

        ChatLogManipulation: typeof ChatLogManipulation;

        KoboAPI: typeof KoboAPI;
    }
}
