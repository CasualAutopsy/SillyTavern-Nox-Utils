import { initSlashStringOps } from './cmds/string-ops/index.js';

import { initCondMacros } from './macros/conditionals/index.js';
import { initBoolMacros } from './macros/boolean/index.js';
import { initMathMacros } from './macros/math/index.js';
import { initRandMacros } from './macros/random/index.js';
import { initStringOpsMacros } from './macros/string-ops/index.js';
import { initChatMacros } from './macros/chat/index.js';
import { initWIMacros } from './macros/world-info/index.js';
import { initCacheMacros } from './macros/cache/index.js';


initSlashStringOps();

initBoolMacros();
initCondMacros();
initMathMacros();
initRandMacros();
initStringOpsMacros();
initChatMacros();
initWIMacros();
initCacheMacros();
