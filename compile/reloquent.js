#!/usr/bin/env node
'use strict';
const readline = require('readline');             
const m = readline.createInterface;
function n(a, b, d) {
  return setTimeout(() => {
    const f = Error(`${a ? a : "Promise"} has timed out after ${b}ms`);
    f.stack = `Error: ${f.message}`;
    d(f);
  }, b);
}
function p(a, b) {
  let d;
  const f = new Promise((c, e) => {
    d = n(a, b, e);
  });
  return {timeout:d, a:f};
}
async function q(a, b, d) {
  if (!(a instanceof Promise)) {
    throw Error("Promise expected");
  }
  if (!b) {
    throw Error("Timeout must be a number");
  }
  if (0 > b) {
    throw Error("Timeout cannot be negative");
  }
  const {a:f, timeout:c} = p(d, b);
  try {
    return await Promise.race([a, f]);
  } finally {
    clearTimeout(c);
  }
}
;function r(a, b = {}) {
  const {timeout:d, password:f = !1, output:c = process.stdout, input:e = process.stdin, ...g} = b;
  b = m({input:e, output:c, ...g});
  if (f) {
    const l = b.output;
    b._writeToOutput = k => {
      if (["\r\n", "\n", "\r"].includes(k)) {
        return l.write(k);
      }
      k = k.split(a);
      "2" == k.length ? (l.write(a), l.write("*".repeat(k[1].length))) : l.write("*");
    };
  }
  var h = new Promise(b.question.bind(b, a));
  h = d ? q(h, d, `reloquent: ${a}`) : h;
  b.promise = t(h, b);
  return b;
}
const t = async(a, b) => {
  try {
    return await a;
  } finally {
    b.close();
  }
};
async function u(a, b) {
  if ("object" != typeof a) {
    throw Error("Please give an object with questions");
  }
  return await Object.keys(a).reduce(async(d, f) => {
    d = await d;
    var c = a[f];
    switch(typeof c) {
      case "object":
        c = {...c};
        break;
      case "string":
        c = {text:c};
        break;
      default:
        throw Error("A question must be a string or an object.");
    }
    c.text = `${c.text}${c.text.endsWith("?") ? "" : ":"} `;
    var e;
    if (c.defaultValue) {
      var g = c.defaultValue;
    }
    c.getDefault && (e = await c.getDefault());
    let h = g || "";
    g && e && g != e ? h = `\x1b[90m${g}\x1b[0m` : g && g == e && (h = "");
    g = e || "";
    ({promise:g} = r(`${c.text}${h ? `[${h}] ` : ""}${g ? `[${g}] ` : ""}`, {timeout:b, password:c.password, ...c}));
    e = await g || e || c.defaultValue;
    "function" == typeof c.validation && c.validation(e);
    "function" == typeof c.postProcess && (e = await c.postProcess(e));
    return {...d, [f]:e};
  }, {});
}
;module.exports = {_askSingle:async function(a, b) {
  ({question:a} = await u({question:a}, b));
  return a;
}, _confirm:async function(a, b = {}) {
  const {defaultYes:d = !0, timeout:f} = b;
  a = "string" == typeof a ? {text:a} : a;
  b = a.text;
  const c = b.endsWith("?");
  ({question:a} = await u({question:{defaultValue:d ? "y" : "n", ...a, text:`${c ? b.replace(/\?$/, "") : b} (y/n)${c ? "?" : ""}`}}, f));
  return "y" == a;
}, _askQuestions:async function(a, b) {
  return await u(a, b);
}};


//# sourceMappingURL=reloquent.js.map