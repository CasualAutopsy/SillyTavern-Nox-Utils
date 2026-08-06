// @ts-nocheck
const { macros } = SillyTavern.getContext();

const { shorthandStringResolver, shorthandLaxBoolResolver } = NoxLib.MacroCoercionAndShorthand.VarShorthand;
const { toRegExp } = NoxLib.StringOps.RegExHelper;

export async function initStringOpsMacros() {
    macros.register(
        'reMatchAll',
        {
            "category": "Nox Utils - String Operations",
            "unnamedArgs": [
                {
                    "name": "find",
                    "optional": false,
                    "type": ["string"],
                    "description": "The regex to match against",
                },
                {
                    "name": "dedupe",
                    "optional": false,
                    "type": ["boolean"],
                    "description": "Whether to dedupe the results",
                },
                {
                    "name": "text",
                    "optional": false,
                    "type": ["string"],
                    "description": "The text to match against",
                }
            ],
            "description": "Match all instances of a regex in a string",
            "returns": "A list of matches",
            "handler": ({unnamedArgs:[findRaw, dedupeRaw, textRaw], flags, resolve, trimContent}) => {
                const find = toRegExp(shorthandStringResolver(findRaw, resolve));
                const dedupe = shorthandLaxBoolResolver(dedupeRaw, resolve);
                const text = shorthandStringResolver(textRaw, resolve);

                if (dedupe) {
                    return JSON.stringify([...new Set(text.matchAll(find).map(m => m[0]))])
                } else {
                    return JSON.stringify([...text.matchAll(find).map(m => m[0])])
                }
            }
        }
    );
}
