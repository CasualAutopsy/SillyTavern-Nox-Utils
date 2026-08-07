import { initBoolLogic } from './logic.js';
import { initBoolTruthyFalsy } from './truthy.js';

export async function initBoolMacros() {
    initBoolLogic();
    initBoolTruthyFalsy();
}
