// @ts-nocheck
const { macros } = await import(/* webpackIgnore: True */'/scripts/macros/macro-system.js');

const { parseValue } = await import(/* webpackIgnore: True */'/scripts/extensions/third-party/STLibs-Nox-Library/scripts/parsing.js')

export async function initRepeatMacros() {
    macros.register(
        'repeat',
        {
            category: 'Nox Utils - Repitition',
            unnamedArgs: [
                {
                    name: 'resolve-after',
                    optional: false,
                    description: 'Whether to resolve nested macros after repeating text content.',
                },
                {
                    name: 'n',
                    optional: false,
                    description: 'Number of times the text content should be repeated.',
                },
                {
                    name: 'seperator',
                    optional: false,
                    description: 'Text to inject between each repeat.'
                },
                {
                    name: 'content',
                    optional: false,
                    description: 'The text content to be repeated.'
                }
            ],
            description: 'Repeat the given text content N number of times.',
            return: 'The repeated text content.',
            delayArgResolution: true,
            handler: ({
                unnamedArgs: [resolveAfter, nRepeat, seperator, textContent],
                flags: {preserveWhitespace},
                trimContent,
                resolve
            }) => {

                const
                    doAfter = parseValue(resolveAfter) == true // TODO: Implement allowing empty strings.
                        ? true
                        : false,
                    doN = parseValue(nRepeat);

                if (doN === 1) {
                    return preserveWhitespace
                        ? resolve(textContent)
                        : trimContent(
                            resolve(textContent),
                            { trimIndent: false }
                        );
                } else if (doN <= 0) {
                    return '';
                }

                let text = undefined;
                if (doAfter) {
                    text = textContent;
                    text += (seperator + textContent).repeat(doN-1);
                    text = resolve(text);
                } else {
                    text = resolve(textContent);
                    text += (resolve(seperator) + text).repeat(doN);
                }

                return preserveWhitespace
                    ? text
                    : trimContent(
                        text,
                        { trimIndent: false }
                    );
            }
        }
    )
}
