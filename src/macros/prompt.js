const YAML = SillyTavern.libs.yaml;

const { escapeRegExp } = SillyTavern.libs.lodash;

const { macros, variables } = SillyTavern.getContext();

const { toRegExp } = NoxLib.StringOps.RegExHelper;

const { shorthandStringResolver, shorthandLaxBoolResolver } = NoxLib.MacroCoercionAndShorthand.VarShorthand;

/**
 * @typedef {String | String[]} PromptActivations
 * @typedef {String[]} LinkActivations
 */

/**
 * @typedef {String[]} SwitchPriority
 *
 * @typedef {String[]} SwitchKeywords
 *
 * @typedef {{[x: String]: SwitchKeywords}} SwitchKWProps
 *
 * @typedef {SwitchKWProps & {priority: SwitchPriority}} SwitchKeys
 * @typedef {{[x: String]: String}} SwitchPrompts
 */

/**
 * @typedef {String[]} StackOrder
 * @typedef {String[]} StackLinks
 *
 * @typedef {String[]} StackKeywords
 *
 * @typedef {{[x: String]: { keys?: StackKeywords, links: StackLinks }}} StackKWProps
 *
 * @typedef {StackKWProps & {order: StackOrder}} StackKeys
 * @typedef {{[x: String]: String}} StackPrompts
 */


export async function initPowerPromptingMacros() {
    macros.register(
        'promptSwitch',
        {
            "category": 'Nox Utils - Power Prompting',
            "unnamedArgs": [
                {
                    "name": 'scanned_text',
                    "optional": false,
                    "type": ['string'],
                    "sampleValue": '{{lastMessage}}, {{getvar::varName}}, Example Text',
                    "description": 'Text to scan for keywords.',
                },
                {
                    "name": 'sticky_var',
                    "optional": false,
                    "description": 'The chat variable to save the prompt to.',
                },
                {
                    "name": "var_scope",
                    "optional": false,
                    "type": ['string'],
                    "defaultValue": 'local',
                    "sampleValue": 'global, local',
                    "description": 'The scope to save the prompt to.',
                },
                {
                    "name": 'whole_words',
                    "optional": false,
                    "type": ['boolean'],
                    "defaultValue": 'true',
                    "sampleValue": 'true, 0, off, .localVar, $globalVar',
                    "description": 'Whether or not to match whole words.'
                },
                {
                    "name": 'keywords_yaml',
                    "optional": false,
                    "description": 'Keywords to scan for in yaml format.',
                },
                {
                    "name": 'prompts_yaml',
                    "optional": false,
                    "description": 'The prompts for the keyword prompt switcher in yaml format.',
                }
            ],
            "displayOverride": '{{promptSwitch::scanned_text::sticky_var::var_scope::keywords_yaml::prompts_yaml}}',
            "returns": 'The activated prompt or the sticky prompt if a variable is provided.',
            "returnType": 'string',
            "handler": ({unnamedArgs: [scanned_text, stickyRaw, scopeRaw, wholeWordsRaw, keywordsRaw, promptsRaw], resolve}) => {
                scanned_text = scanned_text.startsWith('.') || scanned_text.startsWith('$')
                    ? shorthandStringResolver(scanned_text, resolve)
                    : scanned_text;

                /** @type {PromptActivations} */
                let activated_info = "";

                const
                    var_scope = scopeRaw === 'global'
                        ? 'global'
                        : 'local',

                    sticky_var = stickyRaw !== ''
                        ? `kwSwitch_${stickyRaw}`
                        : null;

                if (scanned_text) {

                    const codefence_re = /^```ya?ml\n+|\n+```$/g;
                    keywordsRaw = keywordsRaw.startsWith('```')
                        ? keywordsRaw.replaceAll(codefence_re, '')
                        : keywordsRaw;

                    promptsRaw = promptsRaw.startsWith('```')
                        ? promptsRaw.replaceAll(codefence_re, '')
                        : promptsRaw;


                    const whole_words = wholeWordsRaw !== ''
                        ? shorthandLaxBoolResolver(wholeWordsRaw, resolve)
                        : true;

                    try {
                        const
                            /** @type {SwitchKeys} */       keywords_yaml   = YAML.parse(keywordsRaw),
                            /** @type {SwitchPrompts} */    prompts_yaml    = YAML.parse(promptsRaw);

                        const kwKeys = keywords_yaml.priority;


                        for (const key of kwKeys) {
                            const
                                keywords = keywords_yaml[key],
                                prompt = prompts_yaml[key];

                            for (let kw of keywords) {
                                /** @type {RegExp|undefined} */
                                let re_kw;

                                /** @type {Boolean} */
                                let isRegExp = kw.match(/^\/(.+)\/([a-z]*)$/) !== null

                                if (whole_words && !isRegExp) {
                                    re_kw = new RegExp('\\b' + escapeRegExp(kw) + '\\b');

                                    isRegExp = true;
                                }


                                if (isRegExp) {
                                    if (!(re_kw instanceof RegExp)) re_kw = toRegExp(kw);

                                    if (re_kw.test(scanned_text)) {
                                        activated_info = prompt;
                                        break;
                                    }
                                } else {

                                    if (scanned_text.indexOf(kw) !== -1 ) {
                                        activated_info = prompt;
                                        break;
                                    }
                                }
                            }

                            if (activated_info !== "") {
                                break;
                            }
                        }
                    } catch {
                        console.error('[Nox-Utils]|[Macro: promptSwitch] Malformed YAML. Outputting an empty string.');

                        return '';
                    }
                } else {
                    if (var_scope === 'global' && sticky_var !== null) {

                        return variables.global.get(sticky_var);
                    } else if (sticky_var !== null) {

                        return variables.local.get(sticky_var);
                    }

                    return '';
                }

                if (activated_info !== "") {

                    if (var_scope === 'global' && sticky_var !== null) {
                        variables.global.set(sticky_var, activated_info);
                    } else if (sticky_var !== null) {
                        variables.local.set(sticky_var, activated_info);
                    }

                    return activated_info;
                } else if (var_scope === 'global' && sticky_var !== null) {

                    return variables.global.get(sticky_var);
                } else if (sticky_var !== null) {

                    return variables.local.get(sticky_var);
                }

                return '';
            }
        }
    );

    macros.register(
        'promptStack',
        {
            "category": 'Nox Utils - Power Prompting',
            "unnamedArgs": [
                {
                    "name": 'scanned_text',
                    "optional": false,
                    "type": ['string'],
                    "sampleValue": '{{lastMessage}}, {{getvar::varName}}, Example Text',
                    "description": 'Text to scan for keywords.',
                },
                {
                    "name": 'whole_words',
                    "optional": false,
                    "type": ['boolean'],
                    "defaultValue": 'true',
                    "sampleValue": 'true, 0, off, .localVar, $globalVar',
                    "description": 'Whether or not to match whole words.'
                },
                {
                    "name": 'keywords_yaml',
                    "optional": false,
                    "description": 'Keywords to scan for in yaml format.',
                },
                {
                    "name": 'prompts_yaml',
                    "optional": false,
                    "description": 'The prompts for the keyword prompt switcher in yaml format.',
                },

            ],
            "displayOverride": '{{promptStack::scanned_text::whole_words::keywords_yaml::prompts_yaml}}',
            "returns": 'The activated prompts stacked in the specified order.',
            "handler": ({unnamedArgs: [scanned_text, wholeWordsRaw, keywordsRaw, promptsRaw], resolve}) => {
                scanned_text = scanned_text.startsWith('.') || scanned_text.startsWith('$')
                    ? shorthandStringResolver(scanned_text, resolve)
                    : scanned_text;

                /** @type {PromptActivations} */
                let activated_info = [];

                if (scanned_text) {
                    const codefence_re = /^```ya?ml\n+|\n+```$/g;
                    keywordsRaw = keywordsRaw.startsWith('```')
                        ? keywordsRaw.replaceAll(codefence_re, '')
                        : keywordsRaw;

                    promptsRaw = promptsRaw.startsWith('```')
                        ? promptsRaw.replaceAll(codefence_re, '')
                        : promptsRaw;


                    const whole_words = wholeWordsRaw !== ''
                        ? shorthandLaxBoolResolver(wholeWordsRaw, resolve)
                        : true;

                    try {
                        const
                            /** @type {StackKeys} */    keywords_yaml   = YAML.parse(keywordsRaw),
                            /** @type {StackPrompts} */ prompts_yaml    = YAML.parse(promptsRaw);

                        const kwOrder = keywords_yaml.order
                            ? keywords_yaml.order.toReversed()
                            : null;

                        if (kwOrder === null) {
                            console.error('[Nox-Utils]|[Macro: promptStack] No prompt order specified. Outputting an empty string.');

                            return '';
                        }

                        /** @type {LinkActivations} */
                        let kwLinks = [];
                        for (const key of kwOrder) {
                            const
                                keywords    = keywords_yaml[key].keys,
                                links       = keywords_yaml[key].links,
                                prompt      = prompts_yaml[key];

                            if (links.includes(key)) {
                                activated_info.unshift(prompt);
                                kwLinks.push(...links);
                                continue;
                            }

                            if (keywords) {
                                for (let kw of keywords) {
                                    /** @type {RegExp|undefined} */
                                    let re_kw;

                                    /** @type {Boolean} */
                                    let isRegExp = kw.match(/^\/(.+)\/([a-z]*)$/) !== null

                                    if (whole_words && !isRegExp) {
                                        re_kw = new RegExp('\\b' + escapeRegExp(kw) + '\\b');

                                        isRegExp = true;
                                    }


                                    if (isRegExp) {
                                        if (!(re_kw instanceof RegExp)) re_kw = toRegExp(kw);

                                        if (re_kw.test(scanned_text)) {
                                            activated_info.unshift(prompt);
                                            kwLinks.push(...links);
                                            break;
                                        }
                                    } else {

                                        if (scanned_text.indexOf(kw) !== -1) {
                                            activated_info.unshift(prompt);
                                            kwLinks.push(...links);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    } catch {
                        console.error('[Nox-Utils]|[Macro: promptStack] Malformed YAML. Outputting an empty string.');

                        return '';
                    }
                } else {
                    return '';
                }

                return activated_info.length !== 0
                    ? activated_info.join('\n')
                    : '';
            }
        }
    );
}

