import { initCondMacros } from './macros/conds.js';
import { initBoolMacros } from './macros/boolean/index.js';
import { initRandMacros } from './macros/rand.js';
import { initMathMacros } from './macros/math.js';
import { initStringOpsMacros } from './macros/string.js';
import { initChatLogMacros } from './macros/chat-logs.js';
import { initPowerPromptingMacros } from './macros/prompt.js';
import { initKVCacheMacros } from './macros/kvcache-helpers.js';


initCondMacros();
initBoolMacros();
initRandMacros();
initMathMacros();
initStringOpsMacros();
initChatLogMacros();
initPowerPromptingMacros();
initKVCacheMacros();
