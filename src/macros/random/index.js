import { initRNG } from './rng.js';
import { initRandText } from './text.js';
import { initSampling } from './sampling.js';

export async function initRandMacros() {
    initRNG();
    initRandText();
    initSampling();
}
