const { macros } = SillyTavern.getContext();

const { shorthandStringResolver } = NoxLib.MacroCoercionAndShorthand.VarShorthand;

const { boolCoercion, intParse } = NoxLib.MacroCoercionAndShorthand.ValCoercion;

export async function initRepeatMacros() {
    macros.register(
        'repeat',
        {
            "category": 'Nox Utils - Repitition',
            "unnamedArgs": [
                {
                    "name": 'resolve-after',
                    "optional": false,
                    "description": 'Whether to resolve nested macros after repeating text content.',
                },
                {
                    "name": 'n',
                    "optional": false,
                    "description": 'Number of times the text content should be repeated.',
                },
                {
                    "name": 'seperator',
                    "optional": false,
                    "description": 'Text to inject between each repeat.'
                },
                {
                    "name": 'content',
                    "optional": false,
                    "description": 'The text content to be repeated.'
                }
            ],
            "description": 'Repeat the given text content N number of times.',
            "returns": 'The repeated text content.',
            "delayArgResolution": true,
            handler: ({
                unnamedArgs: [resolveAfter, nRepeat, seperator, textContent],
                flags: {preserveWhitespace},
                trimContent,
                resolve
            }) => {
                const
                    doAfter = boolCoercion(resolveAfter),
                    doN = intParse(nRepeat);

                if (doN === 1) {
                    return preserveWhitespace
                        ? resolve(textContent)
                        : trimContent(resolve(textContent));
                } else if (doN <= 0) {
                    return '';
                }

                let text;
                if (doAfter) {
                    text = shorthandStringResolver(textContent, resolve, true);
                    text += (seperator + shorthandStringResolver(textContent, resolve, true)).repeat(doN-1);
                    text = resolve(text);
                } else {
                    seperator = resolve(seperator);
                    text = shorthandStringResolver(textContent, resolve, true);
                    text += (seperator + text).repeat(doN);
                }

                return preserveWhitespace
                    ? text
                    : trimContent(text);
            }
        }
    );
}
