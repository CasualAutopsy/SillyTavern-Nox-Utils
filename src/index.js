import { initSlashStringOps } from './cmds/string-ops/index.js';
// import { initLLMBatch } from './cmds/llm-batch.js';

import { initCondMacros } from './macros/conditionals/index.js';
import { initBoolMacros } from './macros/boolean/index.js';
import { initMathMacros } from './macros/math/index.js';
import { initRandMacros } from './macros/random/index.js';
import { initChatMacros } from './macros/chat/index.js';
import { initStringOpsMacros } from './macros/string-ops/index.js';
// import { initPowerPromptingMacros } from './macros/prompt.js';
import { initCacheMacros } from './macros/cache/index.js';


initSlashStringOps();
// initLLMBatch();

initBoolMacros();
initCondMacros();
initMathMacros();
initRandMacros();
initChatMacros();
initStringOpsMacros();
// initPowerPromptingMacros();
initCacheMacros();
