const { macros } = SillyTavern.getContext();

const { splitOnTopLevelElse, GlobalCondMacroList } = NoxLib.MacroHelpers.Conditionals

export const CATCH_MARKER = '\u0000\u001FCATCH\u001F\u0000';

export const ERROR_MARKER_DICT = {
    "error": '%%@ERROR%%',
    "type_error": '%%@TYPE_ERROR%%',
}

export async function initErrorHandlingMacros() {
    macros.register(
        'catch',
        {
            "category": 'Nox Utils - Error Handling',
            "handler": () => CATCH_MARKER,
        }
    );

    macros.register(
        'errorSignal',
        {
            "category": 'Nox Utils - Error Handling',
            "handler": () => ERROR_MARKER_DICT.error,
        }
    );

    macros.register(
        'typeErrorSignal',
        {
            "category": 'Nox Utils - Error Handling',
            "handler": () => ERROR_MARKER_DICT.type_error,
        }
    );

    macros.register(
        'tryResolve',
        {
            "category": 'Nox Utils - Error Handling',
            "unnamedArgs": [
                {
                    "name": 'try',
                },
                {
                    "name": 'check',
                },
            ],
            "handler": ({unnamedArgs: [tryRaw, checkRaw], resolve}) => {


                return '';
            }
        }
    );
}
