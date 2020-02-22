#!/usr/bin/env node
'use strict';
const readline = require('readline');             
const m = readline.createInterface;
function n(c, a, d) {
  return setTimeout(() => {
    const f = Error(`${c ? c : "Promise"} has timed out after ${a}ms`);
    f.stack = `Error: ${f.message}`;
    d(f);
  }, a);
}
function p(c, a) {
  let d;
  const f = new Promise((b, e) => {
    d = n(c, a, e);
  });
  return {timeout:d, a:f};
}
async function q(c, a, d) {
  if (!(c instanceof Promise)) {
    throw Error("Promise expected");
  }
  if (!a) {
    throw Error("Timeout must be a number");
  }
  if (0 > a) {
    throw Error("Timeout cannot be negative");
  }
  const {a:f, timeout:b} = p(d, a);
  try {
    return await Promise.race([c, f]);
  } finally {
    clearTimeout(b);
  }
}
;function r(c, a = {}) {
  const {timeout:d, password:f = !1, output:b = process.stdout, input:e = process.stdin, ...g} = a;
  a = m({input:e, output:b, ...g});
  if (f) {
    const l = a.output;
    a._writeToOutput = k => {
      if (["\r\n", "\n", "\r"].includes(k)) {
        return l.write(k);
      }
      k = k.split(c);
      "2" == k.length ? (l.write(c), l.write("*".repeat(k[1].length))) : l.write("*");
    };
  }
  var h = new Promise(a.question.bind(a, c));
  h = d ? q(h, d, `reloquent: ${c}`) : h;
  a.promise = t(h, a);
  return a;
}
const t = async(c, a) => {
  try {
    return await c;
  } finally {
    a.close();
  }
};
async function u(c, a) {
  if ("object" != typeof c) {
    throw Error("Please give an object with questions");
  }
  return await Object.keys(c).reduce(async(d, f) => {
    d = await d;
    var b = c[f];
    switch(typeof b) {
      case "object":
        b = {...b};
        break;
      case "string":
        b = {text:b};
        break;
      default:
        throw Error("A question must be a string or an object.");
    }
    b.text = `${b.text}${b.text.endsWith("?") ? "" : ":"} `;
    var e;
    if (b.defaultValue) {
      var g = b.defaultValue;
    }
    b.getDefault && (e = await b.getDefault());
    let h = g || "";
    g && e && g != e ? h = `\x1b[90m${g}\x1b[0m` : g && g == e && (h = "");
    g = e || "";
    ({promise:g} = r(`${b.text}${h ? `[${h}] ` : ""}${g ? `[${g}] ` : ""}`, {timeout:a, password:b.password, ...b}));
    e = await g || e || b.defaultValue;
    "function" == typeof b.validation && b.validation(e);
    "function" == typeof b.postProcess && (e = await b.postProcess(e));
    return {...d, [f]:e};
  }, {});
}
;module.exports = {_askSingle:async function(c, a) {
  ({question:c} = await u({question:c}, a));
  return c;
}, _confirm:async function(c, a = {}) {
  const {defaultYes:d = !0, timeout:f} = a;
  a = c.text;
  const b = a.endsWith("?");
  ({question:c} = await u({question:{defaultValue:d ? "y" : "n", ...c, text:`${b ? a.replace(/\?$/, "") : a} (y/n)${b ? "?" : ""}`}}, f));
  return "y" == c;
}};


//# sourceMappingURL=reloquent.js.map