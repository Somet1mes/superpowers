(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/// <reference path="../../../default/typescript/typescriptAPI/TypeScriptAPIPlugin.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });

SupCore.system.registerPlugin("typescriptAPI", "rng", {
    defs: "/**\n * Seedable random number generator functions.\n * @version 1.0.0\n * @license Public Domain\n *\n * @example\n * var rng = new RNG('Example');\n * rng.random(40, 50);  // =>  42\n * rng.uniform();       // =>  0.7972798995050903\n * rng.normal();        // => -0.6698504543216376\n * rng.exponential();   // =>  1.0547367609131555\n * rng.poisson(4);      // =>  2\n * rng.gamma(4);        // =>  2.781724687386858\n */\ndeclare class RNG {\n\n  /**\n   * Create a new random number generator with optional seed. If the\n   * provided seed is a function (i.e. Math.random) it will be used as\n   * the uniform number generator.\n   * @param seed An arbitrary object used to seed the generator.\n   * @constructor\n   */\n  constructor(seed?: string);\n\n  /**\n   * @returns {number} Uniform random number between 0 and 255.\n   */\n  nextByte(): number;\n\n  /**\n   * @returns {number} Uniform random number between 0 and 1.\n   */\n  uniform(): number;\n\n  /**\n   * Produce a random integer within [n, m).\n   * @param {number} [n=0]\n   * @param {number} m\n   *\n   */\n  random(n?: number, m?: number): number;\n\n  /**\n   * Generates numbers using this.uniform() with the Box-Muller transform.\n   * @returns {number} Normally-distributed random number of mean 0, variance 1.\n   */\n  normal(): number;\n\n  /**\n   * Generates numbers using this.uniform().\n   * @returns {number} Number from the exponential distribution, lambda = 1.\n   */\n  exponential(): number;\n\n  /**\n   * Generates numbers using this.uniform() and Knuth's method.\n   * @param {number} [mean=1]\n   * @returns {number} Number from the Poisson distribution.\n   */\n  poisson(mean?: number): number;\n\n  /**\n   * Generates numbers using this.uniform(), this.normal(),\n   * this.exponential(), and the Marsaglia-Tsang method.\n   * @param {number} a\n   * @returns {number} Number from the gamma distribution.\n   */\n  gamma(a: number): number;\n\n  /**\n   * Accepts a dice rolling notation string and returns a generator\n   * function for that distribution. The parser is quite flexible.\n   * @param {string} expr A dice-rolling, expression i.e. '2d6+10'.\n   * @param {RNG} rng An optional RNG object.\n   * @returns {Function}\n   */\n  static roller(expr: string, rng?: RNG): number;\n}\n",
    code: ""
});

},{}]},{},[1]);
