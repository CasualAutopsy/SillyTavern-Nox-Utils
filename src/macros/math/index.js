import { initSimpleMath } from './simple.js';
import { initSciMath } from './science.js';
import { initStatsMath } from './statistics.js';

export async function initMathMacros() {
    initSimpleMath();
    initSciMath();
    initStatsMath();
}
