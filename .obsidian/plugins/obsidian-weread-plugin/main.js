/*! For license information please see main.js.LICENSE.txt */
(() => {
  var e = {
      1073: (e) => {
        e.exports = {
          trueFunc: function () {
            return !0;
          },
          falseFunc: function () {
            return !1;
          },
        };
      },
      996: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.attributeRules = void 0);
        var n = r(1073),
          i = /[-[\]{}()*+?.,\\^$|#\s]/g;
        function o(e) {
          return e.replace(i, "\\$&");
        }
        var a = new Set([
          "accept",
          "accept-charset",
          "align",
          "alink",
          "axis",
          "bgcolor",
          "charset",
          "checked",
          "clear",
          "codetype",
          "color",
          "compact",
          "declare",
          "defer",
          "dir",
          "direction",
          "disabled",
          "enctype",
          "face",
          "frame",
          "hreflang",
          "http-equiv",
          "lang",
          "language",
          "link",
          "media",
          "method",
          "multiple",
          "nohref",
          "noresize",
          "noshade",
          "nowrap",
          "readonly",
          "rel",
          "rev",
          "rules",
          "scope",
          "scrolling",
          "selected",
          "shape",
          "target",
          "text",
          "type",
          "valign",
          "valuetype",
          "vlink",
        ]);
        function s(e, t) {
          return "boolean" == typeof e.ignoreCase
            ? e.ignoreCase
            : "quirks" === e.ignoreCase
            ? !!t.quirksMode
            : !t.xmlMode && a.has(e.name);
        }
        t.attributeRules = {
          equals: function (e, t, r) {
            var n = r.adapter,
              i = t.name,
              o = t.value;
            return s(t, r)
              ? ((o = o.toLowerCase()),
                function (t) {
                  var r = n.getAttributeValue(t, i);
                  return (
                    null != r &&
                    r.length === o.length &&
                    r.toLowerCase() === o &&
                    e(t)
                  );
                })
              : function (t) {
                  return n.getAttributeValue(t, i) === o && e(t);
                };
          },
          hyphen: function (e, t, r) {
            var n = r.adapter,
              i = t.name,
              o = t.value,
              a = o.length;
            return s(t, r)
              ? ((o = o.toLowerCase()),
                function (t) {
                  var r = n.getAttributeValue(t, i);
                  return (
                    null != r &&
                    (r.length === a || "-" === r.charAt(a)) &&
                    r.substr(0, a).toLowerCase() === o &&
                    e(t)
                  );
                })
              : function (t) {
                  var r = n.getAttributeValue(t, i);
                  return (
                    null != r &&
                    (r.length === a || "-" === r.charAt(a)) &&
                    r.substr(0, a) === o &&
                    e(t)
                  );
                };
          },
          element: function (e, t, r) {
            var i = r.adapter,
              a = t.name,
              l = t.value;
            if (/\s/.test(l)) return n.falseFunc;
            var c = new RegExp(
              "(?:^|\\s)".concat(o(l), "(?:$|\\s)"),
              s(t, r) ? "i" : ""
            );
            return function (t) {
              var r = i.getAttributeValue(t, a);
              return null != r && r.length >= l.length && c.test(r) && e(t);
            };
          },
          exists: function (e, t, r) {
            var n = t.name,
              i = r.adapter;
            return function (t) {
              return i.hasAttrib(t, n) && e(t);
            };
          },
          start: function (e, t, r) {
            var i = r.adapter,
              o = t.name,
              a = t.value,
              l = a.length;
            return 0 === l
              ? n.falseFunc
              : s(t, r)
              ? ((a = a.toLowerCase()),
                function (t) {
                  var r = i.getAttributeValue(t, o);
                  return (
                    null != r &&
                    r.length >= l &&
                    r.substr(0, l).toLowerCase() === a &&
                    e(t)
                  );
                })
              : function (t) {
                  var r;
                  return (
                    !!(null === (r = i.getAttributeValue(t, o)) || void 0 === r
                      ? void 0
                      : r.startsWith(a)) && e(t)
                  );
                };
          },
          end: function (e, t, r) {
            var i = r.adapter,
              o = t.name,
              a = t.value,
              l = -a.length;
            return 0 === l
              ? n.falseFunc
              : s(t, r)
              ? ((a = a.toLowerCase()),
                function (t) {
                  var r;
                  return (
                    (null === (r = i.getAttributeValue(t, o)) || void 0 === r
                      ? void 0
                      : r.substr(l).toLowerCase()) === a && e(t)
                  );
                })
              : function (t) {
                  var r;
                  return (
                    !!(null === (r = i.getAttributeValue(t, o)) || void 0 === r
                      ? void 0
                      : r.endsWith(a)) && e(t)
                  );
                };
          },
          any: function (e, t, r) {
            var i = r.adapter,
              a = t.name,
              l = t.value;
            if ("" === l) return n.falseFunc;
            if (s(t, r)) {
              var c = new RegExp(o(l), "i");
              return function (t) {
                var r = i.getAttributeValue(t, a);
                return null != r && r.length >= l.length && c.test(r) && e(t);
              };
            }
            return function (t) {
              var r;
              return (
                !!(null === (r = i.getAttributeValue(t, a)) || void 0 === r
                  ? void 0
                  : r.includes(l)) && e(t)
              );
            };
          },
          not: function (e, t, r) {
            var n = r.adapter,
              i = t.name,
              o = t.value;
            return "" === o
              ? function (t) {
                  return !!n.getAttributeValue(t, i) && e(t);
                }
              : s(t, r)
              ? ((o = o.toLowerCase()),
                function (t) {
                  var r = n.getAttributeValue(t, i);
                  return (
                    (null == r ||
                      r.length !== o.length ||
                      r.toLowerCase() !== o) &&
                    e(t)
                  );
                })
              : function (t) {
                  return n.getAttributeValue(t, i) !== o && e(t);
                };
          },
        };
      },
      8866: function (e, t, r) {
        "use strict";
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.compileToken = t.compileUnsafe = t.compile = void 0);
        var i = r(7763),
          o = r(1073),
          a = n(r(7353)),
          s = r(7177),
          l = r(3621),
          c = r(1768);
        function u(e, t, r) {
          return m("string" == typeof e ? (0, i.parse)(e) : e, t, r);
        }
        function p(e) {
          return (
            "pseudo" === e.type &&
            ("scope" === e.name ||
              (Array.isArray(e.data) &&
                e.data.some(function (e) {
                  return e.some(p);
                })))
          );
        }
        (t.compile = function (e, t, r) {
          var n = u(e, t, r);
          return (0, c.ensureIsTag)(n, t.adapter);
        }),
          (t.compileUnsafe = u);
        var d = { type: i.SelectorType.Descendant },
          f = { type: "_flexibleDescendant" },
          h = { type: i.SelectorType.Pseudo, name: "scope", data: null };
        function m(e, t, r) {
          var n;
          (e = e.filter(function (e) {
            return e.length > 0;
          })).forEach(a.default),
            (r = null !== (n = t.context) && void 0 !== n ? n : r);
          var i = Array.isArray(r),
            u = r && (Array.isArray(r) ? r : [r]);
          !(function (e, t, r) {
            for (
              var n = t.adapter,
                i = !!(null == r
                  ? void 0
                  : r.every(function (e) {
                      var t = n.isTag(e) && n.getParent(e);
                      return e === c.PLACEHOLDER_ELEMENT || (t && n.isTag(t));
                    })),
                o = 0,
                a = e;
              o < a.length;
              o++
            ) {
              var l = a[o];
              if (
                l.length > 0 &&
                (0, s.isTraversal)(l[0]) &&
                "descendant" !== l[0].type
              );
              else {
                if (!i || l.some(p)) continue;
                l.unshift(d);
              }
              l.unshift(h);
            }
          })(e, t, u);
          var v = !1,
            b = e
              .map(function (e) {
                if (e.length >= 2) {
                  var r = e[0],
                    n = e[1];
                  "pseudo" !== r.type ||
                    "scope" !== r.name ||
                    (i && "descendant" === n.type
                      ? (e[1] = f)
                      : ("adjacent" !== n.type && "sibling" !== n.type) ||
                        (v = !0));
                }
                return (function (e, t, r) {
                  var n;
                  return e.reduce(
                    function (e, n) {
                      return e === o.falseFunc
                        ? o.falseFunc
                        : (0, l.compileGeneralSelector)(e, n, t, r, m);
                    },
                    null !== (n = t.rootFunc) && void 0 !== n ? n : o.trueFunc
                  );
                })(e, t, u);
              })
              .reduce(g, o.falseFunc);
          return (b.shouldTestNextSiblings = v), b;
        }
        function g(e, t) {
          return t === o.falseFunc || e === o.trueFunc
            ? e
            : e === o.falseFunc || t === o.trueFunc
            ? t
            : function (r) {
                return e(r) || t(r);
              };
        }
        t.compileToken = m;
      },
      3621: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.compileGeneralSelector = void 0);
        var n = r(996),
          i = r(8677),
          o = r(7763);
        t.compileGeneralSelector = function (e, t, r, a, s) {
          var l = r.adapter,
            c = r.equals;
          switch (t.type) {
            case o.SelectorType.PseudoElement:
              throw new Error(
                "Pseudo-elements are not supported by css-select"
              );
            case o.SelectorType.ColumnCombinator:
              throw new Error(
                "Column combinators are not yet supported by css-select"
              );
            case o.SelectorType.Attribute:
              if (null != t.namespace)
                throw new Error(
                  "Namespaced attributes are not yet supported by css-select"
                );
              return (
                (r.xmlMode && !r.lowerCaseAttributeNames) ||
                  (t.name = t.name.toLowerCase()),
                n.attributeRules[t.action](e, t, r)
              );
            case o.SelectorType.Pseudo:
              return (0, i.compilePseudoSelector)(e, t, r, a, s);
            case o.SelectorType.Tag:
              if (null != t.namespace)
                throw new Error(
                  "Namespaced tag names are not yet supported by css-select"
                );
              var u = t.name;
              return (
                (r.xmlMode && !r.lowerCaseTags) || (u = u.toLowerCase()),
                function (t) {
                  return l.getName(t) === u && e(t);
                }
              );
            case o.SelectorType.Descendant:
              if (!1 === r.cacheResults || "undefined" == typeof WeakSet)
                return function (t) {
                  for (var r = t; (r = l.getParent(r)); )
                    if (l.isTag(r) && e(r)) return !0;
                  return !1;
                };
              var p = new WeakSet();
              return function (t) {
                for (var r = t; (r = l.getParent(r)); )
                  if (!p.has(r)) {
                    if (l.isTag(r) && e(r)) return !0;
                    p.add(r);
                  }
                return !1;
              };
            case "_flexibleDescendant":
              return function (t) {
                var r = t;
                do {
                  if (l.isTag(r) && e(r)) return !0;
                } while ((r = l.getParent(r)));
                return !1;
              };
            case o.SelectorType.Parent:
              return function (t) {
                return l.getChildren(t).some(function (t) {
                  return l.isTag(t) && e(t);
                });
              };
            case o.SelectorType.Child:
              return function (t) {
                var r = l.getParent(t);
                return null != r && l.isTag(r) && e(r);
              };
            case o.SelectorType.Sibling:
              return function (t) {
                for (var r = l.getSiblings(t), n = 0; n < r.length; n++) {
                  var i = r[n];
                  if (c(t, i)) break;
                  if (l.isTag(i) && e(i)) return !0;
                }
                return !1;
              };
            case o.SelectorType.Adjacent:
              return l.prevElementSibling
                ? function (t) {
                    var r = l.prevElementSibling(t);
                    return null != r && e(r);
                  }
                : function (t) {
                    for (
                      var r, n = l.getSiblings(t), i = 0;
                      i < n.length;
                      i++
                    ) {
                      var o = n[i];
                      if (c(t, o)) break;
                      l.isTag(o) && (r = o);
                    }
                    return !!r && e(r);
                  };
            case o.SelectorType.Universal:
              if (null != t.namespace && "*" !== t.namespace)
                throw new Error(
                  "Namespaced universal selectors are not yet supported by css-select"
                );
              return e;
          }
        };
      },
      5366: function (e, t, r) {
        "use strict";
        var n =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    !("get" in i
                      ? !t.__esModule
                      : i.writable || i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          i =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          o =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  "default" !== r &&
                    Object.prototype.hasOwnProperty.call(e, r) &&
                    n(t, e, r);
              return i(t, e), t;
            };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.aliases =
            t.pseudos =
            t.filters =
            t.is =
            t.selectOne =
            t.selectAll =
            t.prepareContext =
            t._compileToken =
            t._compileUnsafe =
            t.compile =
              void 0);
        var a = o(r(9432)),
          s = r(1073),
          l = r(8866),
          c = r(1768),
          u = function (e, t) {
            return e === t;
          },
          p = { adapter: a, equals: u };
        function d(e) {
          var t,
            r,
            n,
            i,
            o = null != e ? e : p;
          return (
            (null !== (t = o.adapter) && void 0 !== t) || (o.adapter = a),
            (null !== (r = o.equals) && void 0 !== r) ||
              (o.equals =
                null !==
                  (i =
                    null === (n = o.adapter) || void 0 === n
                      ? void 0
                      : n.equals) && void 0 !== i
                  ? i
                  : u),
            o
          );
        }
        function f(e) {
          return function (t, r, n) {
            var i = d(r);
            return e(t, i, n);
          };
        }
        function h(e) {
          return function (t, r, n) {
            var i = d(n);
            "function" != typeof t && (t = (0, l.compileUnsafe)(t, i, r));
            var o = m(r, i.adapter, t.shouldTestNextSiblings);
            return e(t, o, i);
          };
        }
        function m(e, t, r) {
          return (
            void 0 === r && (r = !1),
            r &&
              (e = (function (e, t) {
                for (
                  var r = Array.isArray(e) ? e.slice(0) : [e],
                    n = r.length,
                    i = 0;
                  i < n;
                  i++
                ) {
                  var o = (0, c.getNextSiblings)(r[i], t);
                  r.push.apply(r, o);
                }
                return r;
              })(e, t)),
            Array.isArray(e) ? t.removeSubsets(e) : t.getChildren(e)
          );
        }
        (t.compile = f(l.compile)),
          (t._compileUnsafe = f(l.compileUnsafe)),
          (t._compileToken = f(l.compileToken)),
          (t.prepareContext = m),
          (t.selectAll = h(function (e, t, r) {
            return e !== s.falseFunc && t && 0 !== t.length
              ? r.adapter.findAll(e, t)
              : [];
          })),
          (t.selectOne = h(function (e, t, r) {
            return e !== s.falseFunc && t && 0 !== t.length
              ? r.adapter.findOne(e, t)
              : null;
          })),
          (t.is = function (e, t, r) {
            var n = d(r);
            return ("function" == typeof t ? t : (0, l.compile)(t, n))(e);
          }),
          (t.default = t.selectAll);
        var g = r(8677);
        Object.defineProperty(t, "filters", {
          enumerable: !0,
          get: function () {
            return g.filters;
          },
        }),
          Object.defineProperty(t, "pseudos", {
            enumerable: !0,
            get: function () {
              return g.pseudos;
            },
          }),
          Object.defineProperty(t, "aliases", {
            enumerable: !0,
            get: function () {
              return g.aliases;
            },
          });
      },
      7177: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.isTraversal = t.procedure = void 0),
          (t.procedure = {
            universal: 50,
            tag: 30,
            attribute: 1,
            pseudo: 0,
            "pseudo-element": 0,
            "column-combinator": -1,
            descendant: -1,
            child: -1,
            parent: -1,
            sibling: -1,
            adjacent: -1,
            _flexibleDescendant: -1,
          }),
          (t.isTraversal = function (e) {
            return t.procedure[e.type] < 0;
          });
      },
      2968: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.aliases = void 0),
          (t.aliases = {
            "any-link": ":is(a, area, link)[href]",
            link: ":any-link:not(:visited)",
            disabled:
              ":is(\n        :is(button, input, select, textarea, optgroup, option)[disabled],\n        optgroup[disabled] > option,\n        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)\n    )",
            enabled: ":not(:disabled)",
            checked:
              ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
            required: ":is(input, select, textarea)[required]",
            optional: ":is(input, select, textarea):not([required])",
            selected:
              "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
            checkbox: "[type=checkbox]",
            file: "[type=file]",
            password: "[type=password]",
            radio: "[type=radio]",
            reset: "[type=reset]",
            image: "[type=image]",
            submit: "[type=submit]",
            parent: ":not(:empty)",
            header: ":is(h1, h2, h3, h4, h5, h6)",
            button: ":is(button, input[type=button])",
            input: ":is(input, textarea, select, button)",
            text: "input:is(:not([type!='']), [type=text])",
          });
      },
      7689: function (e, t, r) {
        "use strict";
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.filters = void 0);
        var i = n(r(7540)),
          o = r(1073);
        function a(e, t) {
          return function (r) {
            var n = t.getParent(r);
            return null != n && t.isTag(n) && e(r);
          };
        }
        function s(e) {
          return function (t, r, n) {
            var i = n.adapter[e];
            return "function" != typeof i
              ? o.falseFunc
              : function (e) {
                  return i(e) && t(e);
                };
          };
        }
        t.filters = {
          contains: function (e, t, r) {
            var n = r.adapter;
            return function (r) {
              return e(r) && n.getText(r).includes(t);
            };
          },
          icontains: function (e, t, r) {
            var n = r.adapter,
              i = t.toLowerCase();
            return function (t) {
              return e(t) && n.getText(t).toLowerCase().includes(i);
            };
          },
          "nth-child": function (e, t, r) {
            var n = r.adapter,
              s = r.equals,
              l = (0, i.default)(t);
            return l === o.falseFunc
              ? o.falseFunc
              : l === o.trueFunc
              ? a(e, n)
              : function (t) {
                  for (
                    var r = n.getSiblings(t), i = 0, o = 0;
                    o < r.length && !s(t, r[o]);
                    o++
                  )
                    n.isTag(r[o]) && i++;
                  return l(i) && e(t);
                };
          },
          "nth-last-child": function (e, t, r) {
            var n = r.adapter,
              s = r.equals,
              l = (0, i.default)(t);
            return l === o.falseFunc
              ? o.falseFunc
              : l === o.trueFunc
              ? a(e, n)
              : function (t) {
                  for (
                    var r = n.getSiblings(t), i = 0, o = r.length - 1;
                    o >= 0 && !s(t, r[o]);
                    o--
                  )
                    n.isTag(r[o]) && i++;
                  return l(i) && e(t);
                };
          },
          "nth-of-type": function (e, t, r) {
            var n = r.adapter,
              s = r.equals,
              l = (0, i.default)(t);
            return l === o.falseFunc
              ? o.falseFunc
              : l === o.trueFunc
              ? a(e, n)
              : function (t) {
                  for (
                    var r = n.getSiblings(t), i = 0, o = 0;
                    o < r.length;
                    o++
                  ) {
                    var a = r[o];
                    if (s(t, a)) break;
                    n.isTag(a) && n.getName(a) === n.getName(t) && i++;
                  }
                  return l(i) && e(t);
                };
          },
          "nth-last-of-type": function (e, t, r) {
            var n = r.adapter,
              s = r.equals,
              l = (0, i.default)(t);
            return l === o.falseFunc
              ? o.falseFunc
              : l === o.trueFunc
              ? a(e, n)
              : function (t) {
                  for (
                    var r = n.getSiblings(t), i = 0, o = r.length - 1;
                    o >= 0;
                    o--
                  ) {
                    var a = r[o];
                    if (s(t, a)) break;
                    n.isTag(a) && n.getName(a) === n.getName(t) && i++;
                  }
                  return l(i) && e(t);
                };
          },
          root: function (e, t, r) {
            var n = r.adapter;
            return function (t) {
              var r = n.getParent(t);
              return (null == r || !n.isTag(r)) && e(t);
            };
          },
          scope: function (e, r, n, i) {
            var o = n.equals;
            return i && 0 !== i.length
              ? 1 === i.length
                ? function (t) {
                    return o(i[0], t) && e(t);
                  }
                : function (t) {
                    return i.includes(t) && e(t);
                  }
              : t.filters.root(e, r, n);
          },
          hover: s("isHovered"),
          visited: s("isVisited"),
          active: s("isActive"),
        };
      },
      8677: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.compilePseudoSelector =
            t.aliases =
            t.pseudos =
            t.filters =
              void 0);
        var n = r(1073),
          i = r(7763),
          o = r(7689);
        Object.defineProperty(t, "filters", {
          enumerable: !0,
          get: function () {
            return o.filters;
          },
        });
        var a = r(7221);
        Object.defineProperty(t, "pseudos", {
          enumerable: !0,
          get: function () {
            return a.pseudos;
          },
        });
        var s = r(2968);
        Object.defineProperty(t, "aliases", {
          enumerable: !0,
          get: function () {
            return s.aliases;
          },
        });
        var l = r(1768);
        t.compilePseudoSelector = function (e, t, r, c, u) {
          var p = t.name,
            d = t.data;
          if (Array.isArray(d)) return l.subselects[p](e, d, r, c, u);
          if (p in s.aliases) {
            if (null != d)
              throw new Error(
                "Pseudo ".concat(p, " doesn't have any arguments")
              );
            var f = (0, i.parse)(s.aliases[p]);
            return l.subselects.is(e, f, r, c, u);
          }
          if (p in o.filters) return o.filters[p](e, d, r, c);
          if (p in a.pseudos) {
            var h = a.pseudos[p];
            return (
              (0, a.verifyPseudoArgs)(h, p, d),
              h === n.falseFunc
                ? n.falseFunc
                : e === n.trueFunc
                ? function (e) {
                    return h(e, r, d);
                  }
                : function (t) {
                    return h(t, r, d) && e(t);
                  }
            );
          }
          throw new Error("unmatched pseudo-class :".concat(p));
        };
      },
      7221: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.verifyPseudoArgs = t.pseudos = void 0),
          (t.pseudos = {
            empty: function (e, t) {
              var r = t.adapter;
              return !r.getChildren(e).some(function (e) {
                return r.isTag(e) || "" !== r.getText(e);
              });
            },
            "first-child": function (e, t) {
              var r = t.adapter,
                n = t.equals,
                i = r.getSiblings(e).find(function (e) {
                  return r.isTag(e);
                });
              return null != i && n(e, i);
            },
            "last-child": function (e, t) {
              for (
                var r = t.adapter,
                  n = t.equals,
                  i = r.getSiblings(e),
                  o = i.length - 1;
                o >= 0;
                o--
              ) {
                if (n(e, i[o])) return !0;
                if (r.isTag(i[o])) break;
              }
              return !1;
            },
            "first-of-type": function (e, t) {
              for (
                var r = t.adapter,
                  n = t.equals,
                  i = r.getSiblings(e),
                  o = r.getName(e),
                  a = 0;
                a < i.length;
                a++
              ) {
                var s = i[a];
                if (n(e, s)) return !0;
                if (r.isTag(s) && r.getName(s) === o) break;
              }
              return !1;
            },
            "last-of-type": function (e, t) {
              for (
                var r = t.adapter,
                  n = t.equals,
                  i = r.getSiblings(e),
                  o = r.getName(e),
                  a = i.length - 1;
                a >= 0;
                a--
              ) {
                var s = i[a];
                if (n(e, s)) return !0;
                if (r.isTag(s) && r.getName(s) === o) break;
              }
              return !1;
            },
            "only-of-type": function (e, t) {
              var r = t.adapter,
                n = t.equals,
                i = r.getName(e);
              return r.getSiblings(e).every(function (t) {
                return n(e, t) || !r.isTag(t) || r.getName(t) !== i;
              });
            },
            "only-child": function (e, t) {
              var r = t.adapter,
                n = t.equals;
              return r.getSiblings(e).every(function (t) {
                return n(e, t) || !r.isTag(t);
              });
            },
          }),
          (t.verifyPseudoArgs = function (e, t, r) {
            if (null === r) {
              if (e.length > 2)
                throw new Error(
                  "pseudo-selector :".concat(t, " requires an argument")
                );
            } else if (2 === e.length)
              throw new Error(
                "pseudo-selector :".concat(t, " doesn't have any arguments")
              );
          });
      },
      1768: function (e, t, r) {
        "use strict";
        var n =
          (this && this.__spreadArray) ||
          function (e, t, r) {
            if (r || 2 === arguments.length)
              for (var n, i = 0, o = t.length; i < o; i++)
                (!n && i in t) ||
                  (n || (n = Array.prototype.slice.call(t, 0, i)),
                  (n[i] = t[i]));
            return e.concat(n || Array.prototype.slice.call(t));
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.subselects =
            t.getNextSiblings =
            t.ensureIsTag =
            t.PLACEHOLDER_ELEMENT =
              void 0);
        var i = r(1073),
          o = r(7177);
        function a(e, t) {
          return e === i.falseFunc
            ? i.falseFunc
            : function (r) {
                return t.isTag(r) && e(r);
              };
        }
        function s(e, t) {
          var r = t.getSiblings(e);
          if (r.length <= 1) return [];
          var n = r.indexOf(e);
          return n < 0 || n === r.length - 1
            ? []
            : r.slice(n + 1).filter(t.isTag);
        }
        (t.PLACEHOLDER_ELEMENT = {}),
          (t.ensureIsTag = a),
          (t.getNextSiblings = s);
        var l = function (e, t, r, n, i) {
          var o = i(
            t,
            { xmlMode: !!r.xmlMode, adapter: r.adapter, equals: r.equals },
            n
          );
          return function (t) {
            return o(t) && e(t);
          };
        };
        t.subselects = {
          is: l,
          matches: l,
          where: l,
          not: function (e, t, r, n, o) {
            var a = o(
              t,
              { xmlMode: !!r.xmlMode, adapter: r.adapter, equals: r.equals },
              n
            );
            return a === i.falseFunc
              ? e
              : a === i.trueFunc
              ? i.falseFunc
              : function (t) {
                  return !a(t) && e(t);
                };
          },
          has: function (e, r, l, c, u) {
            var p = l.adapter,
              d = { xmlMode: !!l.xmlMode, adapter: p, equals: l.equals },
              f = r.some(function (e) {
                return e.some(o.isTraversal);
              })
                ? [t.PLACEHOLDER_ELEMENT]
                : void 0,
              h = u(r, d, f);
            if (h === i.falseFunc) return i.falseFunc;
            if (h === i.trueFunc)
              return function (t) {
                return p.getChildren(t).some(p.isTag) && e(t);
              };
            var m = a(h, p),
              g = h.shouldTestNextSiblings,
              v = void 0 !== g && g;
            return f
              ? function (t) {
                  f[0] = t;
                  var r = p.getChildren(t),
                    i = v ? n(n([], r, !0), s(t, p), !0) : r;
                  return e(t) && p.existsOne(m, i);
                }
              : function (t) {
                  return e(t) && p.existsOne(m, p.getChildren(t));
                };
          },
        };
      },
      7353: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var n = r(7763),
          i = r(7177),
          o = {
            exists: 10,
            equals: 8,
            not: 7,
            start: 6,
            end: 6,
            any: 5,
            hyphen: 4,
            element: 4,
          };
        function a(e) {
          var t = i.procedure[e.type];
          if (e.type === n.SelectorType.Attribute)
            (t = o[e.action]) === o.equals && "id" === e.name && (t = 9),
              e.ignoreCase && (t >>= 1);
          else if (e.type === n.SelectorType.Pseudo)
            if (e.data)
              if ("has" === e.name || "contains" === e.name) t = 0;
              else if (Array.isArray(e.data)) {
                t = 0;
                for (var r = 0; r < e.data.length; r++)
                  if (1 === e.data[r].length) {
                    var s = a(e.data[r][0]);
                    if (0 === s) {
                      t = 0;
                      break;
                    }
                    s > t && (t = s);
                  }
                e.data.length > 1 && t > 0 && (t -= 1);
              } else t = 1;
            else t = 3;
          return t;
        }
        t.default = function (e) {
          for (var t = e.map(a), r = 1; r < e.length; r++) {
            var n = t[r];
            if (!(n < 0))
              for (var i = r - 1; i >= 0 && n < t[i]; i--) {
                var o = e[i + 1];
                (e[i + 1] = e[i]), (e[i] = o), (t[i + 1] = t[i]), (t[i] = n);
              }
          }
        };
      },
      7763: (e, t, r) => {
        "use strict";
        var n;
        r.r(t),
          r.d(t, {
            AttributeAction: () => o,
            IgnoreCaseMode: () => i,
            SelectorType: () => n,
            isTraversal: () => u,
            parse: () => g,
            stringify: () => T,
          }),
          (function (e) {
            (e.Attribute = "attribute"),
              (e.Pseudo = "pseudo"),
              (e.PseudoElement = "pseudo-element"),
              (e.Tag = "tag"),
              (e.Universal = "universal"),
              (e.Adjacent = "adjacent"),
              (e.Child = "child"),
              (e.Descendant = "descendant"),
              (e.Parent = "parent"),
              (e.Sibling = "sibling"),
              (e.ColumnCombinator = "column-combinator");
          })(n || (n = {}));
        const i = {
          Unknown: null,
          QuirksMode: "quirks",
          IgnoreCase: !0,
          CaseSensitive: !1,
        };
        var o;
        !(function (e) {
          (e.Any = "any"),
            (e.Element = "element"),
            (e.End = "end"),
            (e.Equals = "equals"),
            (e.Exists = "exists"),
            (e.Hyphen = "hyphen"),
            (e.Not = "not"),
            (e.Start = "start");
        })(o || (o = {}));
        const a = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,
          s = /\\([\da-f]{1,6}\s?|(\s)|.)/gi,
          l = new Map([
            [126, o.Element],
            [94, o.Start],
            [36, o.End],
            [42, o.Any],
            [33, o.Not],
            [124, o.Hyphen],
          ]),
          c = new Set([
            "has",
            "not",
            "matches",
            "is",
            "where",
            "host",
            "host-context",
          ]);
        function u(e) {
          switch (e.type) {
            case n.Adjacent:
            case n.Child:
            case n.Descendant:
            case n.Parent:
            case n.Sibling:
            case n.ColumnCombinator:
              return !0;
            default:
              return !1;
          }
        }
        const p = new Set(["contains", "icontains"]);
        function d(e, t, r) {
          const n = parseInt(t, 16) - 65536;
          return n != n || r
            ? t
            : n < 0
            ? String.fromCharCode(n + 65536)
            : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320);
        }
        function f(e) {
          return e.replace(s, d);
        }
        function h(e) {
          return 39 === e || 34 === e;
        }
        function m(e) {
          return 32 === e || 9 === e || 10 === e || 12 === e || 13 === e;
        }
        function g(e) {
          const t = [],
            r = v(t, `${e}`, 0);
          if (r < e.length)
            throw new Error(`Unmatched selector: ${e.slice(r)}`);
          return t;
        }
        function v(e, t, r) {
          let i = [];
          function s(e) {
            const n = t.slice(r + e).match(a);
            if (!n) throw new Error(`Expected name, found ${t.slice(r)}`);
            const [i] = n;
            return (r += e + i.length), f(i);
          }
          function d(e) {
            for (r += e; r < t.length && m(t.charCodeAt(r)); ) r++;
          }
          function g() {
            const e = (r += 1);
            let n = 1;
            for (; n > 0 && r < t.length; r++)
              40 !== t.charCodeAt(r) || b(r)
                ? 41 !== t.charCodeAt(r) || b(r) || n--
                : n++;
            if (n) throw new Error("Parenthesis not matched");
            return f(t.slice(e, r - 1));
          }
          function b(e) {
            let r = 0;
            for (; 92 === t.charCodeAt(--e); ) r++;
            return 1 == (1 & r);
          }
          function y() {
            if (i.length > 0 && u(i[i.length - 1]))
              throw new Error("Did not expect successive traversals.");
          }
          function w(e) {
            i.length > 0 && i[i.length - 1].type === n.Descendant
              ? (i[i.length - 1].type = e)
              : (y(), i.push({ type: e }));
          }
          function E(e, t) {
            i.push({
              type: n.Attribute,
              name: e,
              action: t,
              value: s(1),
              namespace: null,
              ignoreCase: "quirks",
            });
          }
          function x() {
            if (
              (i.length && i[i.length - 1].type === n.Descendant && i.pop(),
              0 === i.length)
            )
              throw new Error("Empty sub-selector");
            e.push(i);
          }
          if ((d(0), t.length === r)) return r;
          e: for (; r < t.length; ) {
            const e = t.charCodeAt(r);
            switch (e) {
              case 32:
              case 9:
              case 10:
              case 12:
              case 13:
                (0 !== i.length && i[0].type === n.Descendant) ||
                  (y(), i.push({ type: n.Descendant })),
                  d(1);
                break;
              case 62:
                w(n.Child), d(1);
                break;
              case 60:
                w(n.Parent), d(1);
                break;
              case 126:
                w(n.Sibling), d(1);
                break;
              case 43:
                w(n.Adjacent), d(1);
                break;
              case 46:
                E("class", o.Element);
                break;
              case 35:
                E("id", o.Equals);
                break;
              case 91: {
                let e;
                d(1);
                let a = null;
                124 === t.charCodeAt(r)
                  ? (e = s(1))
                  : t.startsWith("*|", r)
                  ? ((a = "*"), (e = s(2)))
                  : ((e = s(0)),
                    124 === t.charCodeAt(r) &&
                      61 !== t.charCodeAt(r + 1) &&
                      ((a = e), (e = s(1)))),
                  d(0);
                let c = o.Exists;
                const u = l.get(t.charCodeAt(r));
                if (u) {
                  if (((c = u), 61 !== t.charCodeAt(r + 1)))
                    throw new Error("Expected `=`");
                  d(2);
                } else 61 === t.charCodeAt(r) && ((c = o.Equals), d(1));
                let p = "",
                  g = null;
                if ("exists" !== c) {
                  if (h(t.charCodeAt(r))) {
                    const e = t.charCodeAt(r);
                    let n = r + 1;
                    for (; n < t.length && (t.charCodeAt(n) !== e || b(n)); )
                      n += 1;
                    if (t.charCodeAt(n) !== e)
                      throw new Error("Attribute value didn't end");
                    (p = f(t.slice(r + 1, n))), (r = n + 1);
                  } else {
                    const e = r;
                    for (
                      ;
                      r < t.length &&
                      ((!m(t.charCodeAt(r)) && 93 !== t.charCodeAt(r)) || b(r));

                    )
                      r += 1;
                    p = f(t.slice(e, r));
                  }
                  d(0);
                  const e = 32 | t.charCodeAt(r);
                  115 === e ? ((g = !1), d(1)) : 105 === e && ((g = !0), d(1));
                }
                if (93 !== t.charCodeAt(r))
                  throw new Error("Attribute selector didn't terminate");
                r += 1;
                const v = {
                  type: n.Attribute,
                  name: e,
                  action: c,
                  value: p,
                  namespace: a,
                  ignoreCase: g,
                };
                i.push(v);
                break;
              }
              case 58: {
                if (58 === t.charCodeAt(r + 1)) {
                  i.push({
                    type: n.PseudoElement,
                    name: s(2).toLowerCase(),
                    data: 40 === t.charCodeAt(r) ? g() : null,
                  });
                  continue;
                }
                const e = s(1).toLowerCase();
                let o = null;
                if (40 === t.charCodeAt(r))
                  if (c.has(e)) {
                    if (h(t.charCodeAt(r + 1)))
                      throw new Error(`Pseudo-selector ${e} cannot be quoted`);
                    if (
                      ((o = []), (r = v(o, t, r + 1)), 41 !== t.charCodeAt(r))
                    )
                      throw new Error(
                        `Missing closing parenthesis in :${e} (${t})`
                      );
                    r += 1;
                  } else {
                    if (((o = g()), p.has(e))) {
                      const e = o.charCodeAt(0);
                      e === o.charCodeAt(o.length - 1) &&
                        h(e) &&
                        (o = o.slice(1, -1));
                    }
                    o = f(o);
                  }
                i.push({ type: n.Pseudo, name: e, data: o });
                break;
              }
              case 44:
                x(), (i = []), d(1);
                break;
              default: {
                if (t.startsWith("/*", r)) {
                  const e = t.indexOf("*/", r + 2);
                  if (e < 0) throw new Error("Comment was not terminated");
                  (r = e + 2), 0 === i.length && d(0);
                  break;
                }
                let o,
                  l = null;
                if (42 === e) (r += 1), (o = "*");
                else if (124 === e) {
                  if (((o = ""), 124 === t.charCodeAt(r + 1))) {
                    w(n.ColumnCombinator), d(2);
                    break;
                  }
                } else {
                  if (!a.test(t.slice(r))) break e;
                  o = s(0);
                }
                124 === t.charCodeAt(r) &&
                  124 !== t.charCodeAt(r + 1) &&
                  ((l = o),
                  42 === t.charCodeAt(r + 1)
                    ? ((o = "*"), (r += 2))
                    : (o = s(1))),
                  i.push(
                    "*" === o
                      ? { type: n.Universal, namespace: l }
                      : { type: n.Tag, name: o, namespace: l }
                  );
              }
            }
          }
          return x(), r;
        }
        const b = ["\\", '"'],
          y = [...b, "(", ")"],
          w = new Set(b.map((e) => e.charCodeAt(0))),
          E = new Set(y.map((e) => e.charCodeAt(0))),
          x = new Set(
            [
              ...y,
              "~",
              "^",
              "$",
              "*",
              "+",
              "!",
              "|",
              ":",
              "[",
              "]",
              " ",
              ".",
            ].map((e) => e.charCodeAt(0))
          );
        function T(e) {
          return e.map((e) => e.map(k).join("")).join(", ");
        }
        function k(e, t, r) {
          switch (e.type) {
            case n.Child:
              return 0 === t ? "> " : " > ";
            case n.Parent:
              return 0 === t ? "< " : " < ";
            case n.Sibling:
              return 0 === t ? "~ " : " ~ ";
            case n.Adjacent:
              return 0 === t ? "+ " : " + ";
            case n.Descendant:
              return " ";
            case n.ColumnCombinator:
              return 0 === t ? "|| " : " || ";
            case n.Universal:
              return "*" === e.namespace &&
                t + 1 < r.length &&
                "name" in r[t + 1]
                ? ""
                : `${A(e.namespace)}*`;
            case n.Tag:
              return _(e);
            case n.PseudoElement:
              return `::${N(e.name, x)}${
                null === e.data ? "" : `(${N(e.data, E)})`
              }`;
            case n.Pseudo:
              return `:${N(e.name, x)}${
                null === e.data
                  ? ""
                  : `(${"string" == typeof e.data ? N(e.data, E) : T(e.data)})`
              }`;
            case n.Attribute: {
              if (
                "id" === e.name &&
                e.action === o.Equals &&
                "quirks" === e.ignoreCase &&
                !e.namespace
              )
                return `#${N(e.value, x)}`;
              if (
                "class" === e.name &&
                e.action === o.Element &&
                "quirks" === e.ignoreCase &&
                !e.namespace
              )
                return `.${N(e.value, x)}`;
              const t = _(e);
              return e.action === o.Exists
                ? `[${t}]`
                : `[${t}${(function (e) {
                    switch (e) {
                      case o.Equals:
                        return "";
                      case o.Element:
                        return "~";
                      case o.Start:
                        return "^";
                      case o.End:
                        return "$";
                      case o.Any:
                        return "*";
                      case o.Not:
                        return "!";
                      case o.Hyphen:
                        return "|";
                      case o.Exists:
                        throw new Error("Shouldn't be here");
                    }
                  })(e.action)}="${N(e.value, w)}"${
                    null === e.ignoreCase ? "" : e.ignoreCase ? " i" : " s"
                  }]`;
            }
          }
        }
        function _(e) {
          return `${A(e.namespace)}${N(e.name, x)}`;
        }
        function A(e) {
          return null !== e ? `${"*" === e ? "*" : N(e, x)}|` : "";
        }
        function N(e, t) {
          let r = 0,
            n = "";
          for (let i = 0; i < e.length; i++)
            t.has(e.charCodeAt(i)) &&
              ((n += `${e.slice(r, i)}\\${e.charAt(i)}`), (r = i + 1));
          return n.length > 0 ? n + e.slice(r) : e;
        }
      },
      7837: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.attributeNames = t.elementNames = void 0),
          (t.elementNames = new Map([
            ["altglyph", "altGlyph"],
            ["altglyphdef", "altGlyphDef"],
            ["altglyphitem", "altGlyphItem"],
            ["animatecolor", "animateColor"],
            ["animatemotion", "animateMotion"],
            ["animatetransform", "animateTransform"],
            ["clippath", "clipPath"],
            ["feblend", "feBlend"],
            ["fecolormatrix", "feColorMatrix"],
            ["fecomponenttransfer", "feComponentTransfer"],
            ["fecomposite", "feComposite"],
            ["feconvolvematrix", "feConvolveMatrix"],
            ["fediffuselighting", "feDiffuseLighting"],
            ["fedisplacementmap", "feDisplacementMap"],
            ["fedistantlight", "feDistantLight"],
            ["fedropshadow", "feDropShadow"],
            ["feflood", "feFlood"],
            ["fefunca", "feFuncA"],
            ["fefuncb", "feFuncB"],
            ["fefuncg", "feFuncG"],
            ["fefuncr", "feFuncR"],
            ["fegaussianblur", "feGaussianBlur"],
            ["feimage", "feImage"],
            ["femerge", "feMerge"],
            ["femergenode", "feMergeNode"],
            ["femorphology", "feMorphology"],
            ["feoffset", "feOffset"],
            ["fepointlight", "fePointLight"],
            ["fespecularlighting", "feSpecularLighting"],
            ["fespotlight", "feSpotLight"],
            ["fetile", "feTile"],
            ["feturbulence", "feTurbulence"],
            ["foreignobject", "foreignObject"],
            ["glyphref", "glyphRef"],
            ["lineargradient", "linearGradient"],
            ["radialgradient", "radialGradient"],
            ["textpath", "textPath"],
          ])),
          (t.attributeNames = new Map([
            ["definitionurl", "definitionURL"],
            ["attributename", "attributeName"],
            ["attributetype", "attributeType"],
            ["basefrequency", "baseFrequency"],
            ["baseprofile", "baseProfile"],
            ["calcmode", "calcMode"],
            ["clippathunits", "clipPathUnits"],
            ["diffuseconstant", "diffuseConstant"],
            ["edgemode", "edgeMode"],
            ["filterunits", "filterUnits"],
            ["glyphref", "glyphRef"],
            ["gradienttransform", "gradientTransform"],
            ["gradientunits", "gradientUnits"],
            ["kernelmatrix", "kernelMatrix"],
            ["kernelunitlength", "kernelUnitLength"],
            ["keypoints", "keyPoints"],
            ["keysplines", "keySplines"],
            ["keytimes", "keyTimes"],
            ["lengthadjust", "lengthAdjust"],
            ["limitingconeangle", "limitingConeAngle"],
            ["markerheight", "markerHeight"],
            ["markerunits", "markerUnits"],
            ["markerwidth", "markerWidth"],
            ["maskcontentunits", "maskContentUnits"],
            ["maskunits", "maskUnits"],
            ["numoctaves", "numOctaves"],
            ["pathlength", "pathLength"],
            ["patterncontentunits", "patternContentUnits"],
            ["patterntransform", "patternTransform"],
            ["patternunits", "patternUnits"],
            ["pointsatx", "pointsAtX"],
            ["pointsaty", "pointsAtY"],
            ["pointsatz", "pointsAtZ"],
            ["preservealpha", "preserveAlpha"],
            ["preserveaspectratio", "preserveAspectRatio"],
            ["primitiveunits", "primitiveUnits"],
            ["refx", "refX"],
            ["refy", "refY"],
            ["repeatcount", "repeatCount"],
            ["repeatdur", "repeatDur"],
            ["requiredextensions", "requiredExtensions"],
            ["requiredfeatures", "requiredFeatures"],
            ["specularconstant", "specularConstant"],
            ["specularexponent", "specularExponent"],
            ["spreadmethod", "spreadMethod"],
            ["startoffset", "startOffset"],
            ["stddeviation", "stdDeviation"],
            ["stitchtiles", "stitchTiles"],
            ["surfacescale", "surfaceScale"],
            ["systemlanguage", "systemLanguage"],
            ["tablevalues", "tableValues"],
            ["targetx", "targetX"],
            ["targety", "targetY"],
            ["textlength", "textLength"],
            ["viewbox", "viewBox"],
            ["viewtarget", "viewTarget"],
            ["xchannelselector", "xChannelSelector"],
            ["ychannelselector", "yChannelSelector"],
            ["zoomandpan", "zoomAndPan"],
          ]));
      },
      7220: function (e, t, r) {
        "use strict";
        var n =
            (this && this.__assign) ||
            function () {
              return (
                (n =
                  Object.assign ||
                  function (e) {
                    for (var t, r = 1, n = arguments.length; r < n; r++)
                      for (var i in (t = arguments[r]))
                        Object.prototype.hasOwnProperty.call(t, i) &&
                          (e[i] = t[i]);
                    return e;
                  }),
                n.apply(this, arguments)
              );
            },
          i =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r),
                    Object.defineProperty(e, n, {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    });
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          o =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          a =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  "default" !== r &&
                    Object.prototype.hasOwnProperty.call(e, r) &&
                    i(t, e, r);
              return o(t, e), t;
            };
        Object.defineProperty(t, "__esModule", { value: !0 });
        var s = a(r(9960)),
          l = r(5863),
          c = r(7837),
          u = new Set([
            "style",
            "script",
            "xmp",
            "iframe",
            "noembed",
            "noframes",
            "plaintext",
            "noscript",
          ]),
          p = new Set([
            "area",
            "base",
            "basefont",
            "br",
            "col",
            "command",
            "embed",
            "frame",
            "hr",
            "img",
            "input",
            "isindex",
            "keygen",
            "link",
            "meta",
            "param",
            "source",
            "track",
            "wbr",
          ]);
        function d(e, t) {
          void 0 === t && (t = {});
          for (
            var r = ("length" in e) ? e : [e], n = "", i = 0;
            i < r.length;
            i++
          )
            n += f(r[i], t);
          return n;
        }
        function f(e, t) {
          switch (e.type) {
            case s.Root:
              return d(e.children, t);
            case s.Directive:
            case s.Doctype:
              return "<" + e.data + ">";
            case s.Comment:
              return "\x3c!--" + e.data + "--\x3e";
            case s.CDATA:
              return (function (e) {
                return "<![CDATA[" + e.children[0].data + "]]>";
              })(e);
            case s.Script:
            case s.Style:
            case s.Tag:
              return (function (e, t) {
                var r;
                "foreign" === t.xmlMode &&
                  ((e.name =
                    null !== (r = c.elementNames.get(e.name)) && void 0 !== r
                      ? r
                      : e.name),
                  e.parent &&
                    h.has(e.parent.name) &&
                    (t = n(n({}, t), { xmlMode: !1 }))),
                  !t.xmlMode &&
                    m.has(e.name) &&
                    (t = n(n({}, t), { xmlMode: "foreign" }));
                var i = "<" + e.name,
                  o = (function (e, t) {
                    if (e)
                      return Object.keys(e)
                        .map(function (r) {
                          var n,
                            i,
                            o = null !== (n = e[r]) && void 0 !== n ? n : "";
                          return (
                            "foreign" === t.xmlMode &&
                              (r =
                                null !== (i = c.attributeNames.get(r)) &&
                                void 0 !== i
                                  ? i
                                  : r),
                            t.emptyAttrs || t.xmlMode || "" !== o
                              ? r +
                                '="' +
                                (!1 !== t.decodeEntities
                                  ? l.encodeXML(o)
                                  : o.replace(/"/g, "&quot;")) +
                                '"'
                              : r
                          );
                        })
                        .join(" ");
                  })(e.attribs, t);
                return (
                  o && (i += " " + o),
                  0 === e.children.length &&
                  (t.xmlMode
                    ? !1 !== t.selfClosingTags
                    : t.selfClosingTags && p.has(e.name))
                    ? (t.xmlMode || (i += " "), (i += "/>"))
                    : ((i += ">"),
                      e.children.length > 0 && (i += d(e.children, t)),
                      (!t.xmlMode && p.has(e.name)) ||
                        (i += "</" + e.name + ">")),
                  i
                );
              })(e, t);
            case s.Text:
              return (function (e, t) {
                var r = e.data || "";
                return (
                  !1 === t.decodeEntities ||
                    (!t.xmlMode && e.parent && u.has(e.parent.name)) ||
                    (r = l.encodeXML(r)),
                  r
                );
              })(e, t);
          }
        }
        t.default = d;
        var h = new Set([
            "mi",
            "mo",
            "mn",
            "ms",
            "mtext",
            "annotation-xml",
            "foreignObject",
            "desc",
            "title",
          ]),
          m = new Set(["svg", "math"]);
      },
      9960: (e, t) => {
        "use strict";
        var r;
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.Doctype =
            t.CDATA =
            t.Tag =
            t.Style =
            t.Script =
            t.Comment =
            t.Directive =
            t.Text =
            t.Root =
            t.isTag =
            t.ElementType =
              void 0),
          (function (e) {
            (e.Root = "root"),
              (e.Text = "text"),
              (e.Directive = "directive"),
              (e.Comment = "comment"),
              (e.Script = "script"),
              (e.Style = "style"),
              (e.Tag = "tag"),
              (e.CDATA = "cdata"),
              (e.Doctype = "doctype");
          })((r = t.ElementType || (t.ElementType = {}))),
          (t.isTag = function (e) {
            return (
              e.type === r.Tag || e.type === r.Script || e.type === r.Style
            );
          }),
          (t.Root = r.Root),
          (t.Text = r.Text),
          (t.Directive = r.Directive),
          (t.Comment = r.Comment),
          (t.Script = r.Script),
          (t.Style = r.Style),
          (t.Tag = r.Tag),
          (t.CDATA = r.CDATA),
          (t.Doctype = r.Doctype);
      },
      7915: function (e, t, r) {
        "use strict";
        var n =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var i = Object.getOwnPropertyDescriptor(t, r);
                  (i &&
                    !("get" in i
                      ? !t.__esModule
                      : i.writable || i.configurable)) ||
                    (i = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, i);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          i =
            (this && this.__exportStar) ||
            function (e, t) {
              for (var r in e)
                "default" === r ||
                  Object.prototype.hasOwnProperty.call(t, r) ||
                  n(t, e, r);
            };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.DomHandler = void 0);
        var o = r(9960),
          a = r(7790);
        i(r(7790), t);
        var s = /\s+/g,
          l = {
            normalizeWhitespace: !1,
            withStartIndices: !1,
            withEndIndices: !1,
            xmlMode: !1,
          },
          c = (function () {
            function e(e, t, r) {
              (this.dom = []),
                (this.root = new a.Document(this.dom)),
                (this.done = !1),
                (this.tagStack = [this.root]),
                (this.lastNode = null),
                (this.parser = null),
                "function" == typeof t && ((r = t), (t = l)),
                "object" == typeof e && ((t = e), (e = void 0)),
                (this.callback = null != e ? e : null),
                (this.options = null != t ? t : l),
                (this.elementCB = null != r ? r : null);
            }
            return (
              (e.prototype.onparserinit = function (e) {
                this.parser = e;
              }),
              (e.prototype.onreset = function () {
                (this.dom = []),
                  (this.root = new a.Document(this.dom)),
                  (this.done = !1),
                  (this.tagStack = [this.root]),
                  (this.lastNode = null),
                  (this.parser = null);
              }),
              (e.prototype.onend = function () {
                this.done ||
                  ((this.done = !0),
                  (this.parser = null),
                  this.handleCallback(null));
              }),
              (e.prototype.onerror = function (e) {
                this.handleCallback(e);
              }),
              (e.prototype.onclosetag = function () {
                this.lastNode = null;
                var e = this.tagStack.pop();
                this.options.withEndIndices &&
                  (e.endIndex = this.parser.endIndex),
                  this.elementCB && this.elementCB(e);
              }),
              (e.prototype.onopentag = function (e, t) {
                var r = this.options.xmlMode ? o.ElementType.Tag : void 0,
                  n = new a.Element(e, t, void 0, r);
                this.addNode(n), this.tagStack.push(n);
              }),
              (e.prototype.ontext = function (e) {
                var t = this.options.normalizeWhitespace,
                  r = this.lastNode;
                if (r && r.type === o.ElementType.Text)
                  t ? (r.data = (r.data + e).replace(s, " ")) : (r.data += e),
                    this.options.withEndIndices &&
                      (r.endIndex = this.parser.endIndex);
                else {
                  t && (e = e.replace(s, " "));
                  var n = new a.Text(e);
                  this.addNode(n), (this.lastNode = n);
                }
              }),
              (e.prototype.oncomment = function (e) {
                if (
                  this.lastNode &&
                  this.lastNode.type === o.ElementType.Comment
                )
                  this.lastNode.data += e;
                else {
                  var t = new a.Comment(e);
                  this.addNode(t), (this.lastNode = t);
                }
              }),
              (e.prototype.oncommentend = function () {
                this.lastNode = null;
              }),
              (e.prototype.oncdatastart = function () {
                var e = new a.Text(""),
                  t = new a.NodeWithChildren(o.ElementType.CDATA, [e]);
                this.addNode(t), (e.parent = t), (this.lastNode = e);
              }),
              (e.prototype.oncdataend = function () {
                this.lastNode = null;
              }),
              (e.prototype.onprocessinginstruction = function (e, t) {
                var r = new a.ProcessingInstruction(e, t);
                this.addNode(r);
              }),
              (e.prototype.handleCallback = function (e) {
                if ("function" == typeof this.callback)
                  this.callback(e, this.dom);
                else if (e) throw e;
              }),
              (e.prototype.addNode = function (e) {
                var t = this.tagStack[this.tagStack.length - 1],
                  r = t.children[t.children.length - 1];
                this.options.withStartIndices &&
                  (e.startIndex = this.parser.startIndex),
                  this.options.withEndIndices &&
                    (e.endIndex = this.parser.endIndex),
                  t.children.push(e),
                  r && ((e.prev = r), (r.next = e)),
                  (e.parent = t),
                  (this.lastNode = null);
              }),
              e
            );
          })();
        (t.DomHandler = c), (t.default = c);
      },
      7790: function (e, t, r) {
        "use strict";
        var n,
          i =
            (this && this.__extends) ||
            ((n = function (e, t) {
              return (
                (n =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (e, t) {
                      e.__proto__ = t;
                    }) ||
                  function (e, t) {
                    for (var r in t)
                      Object.prototype.hasOwnProperty.call(t, r) &&
                        (e[r] = t[r]);
                  }),
                n(e, t)
              );
            }),
            function (e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Class extends value " +
                    String(t) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = e;
              }
              n(e, t),
                (e.prototype =
                  null === t
                    ? Object.create(t)
                    : ((r.prototype = t.prototype), new r()));
            }),
          o =
            (this && this.__assign) ||
            function () {
              return (
                (o =
                  Object.assign ||
                  function (e) {
                    for (var t, r = 1, n = arguments.length; r < n; r++)
                      for (var i in (t = arguments[r]))
                        Object.prototype.hasOwnProperty.call(t, i) &&
                          (e[i] = t[i]);
                    return e;
                  }),
                o.apply(this, arguments)
              );
            };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.cloneNode =
            t.hasChildren =
            t.isDocument =
            t.isDirective =
            t.isComment =
            t.isText =
            t.isCDATA =
            t.isTag =
            t.Element =
            t.Document =
            t.NodeWithChildren =
            t.ProcessingInstruction =
            t.Comment =
            t.Text =
            t.DataNode =
            t.Node =
              void 0);
        var a = r(9960),
          s = new Map([
            [a.ElementType.Tag, 1],
            [a.ElementType.Script, 1],
            [a.ElementType.Style, 1],
            [a.ElementType.Directive, 1],
            [a.ElementType.Text, 3],
            [a.ElementType.CDATA, 4],
            [a.ElementType.Comment, 8],
            [a.ElementType.Root, 9],
          ]),
          l = (function () {
            function e(e) {
              (this.type = e),
                (this.parent = null),
                (this.prev = null),
                (this.next = null),
                (this.startIndex = null),
                (this.endIndex = null);
            }
            return (
              Object.defineProperty(e.prototype, "nodeType", {
                get: function () {
                  var e;
                  return null !== (e = s.get(this.type)) && void 0 !== e
                    ? e
                    : 1;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "parentNode", {
                get: function () {
                  return this.parent;
                },
                set: function (e) {
                  this.parent = e;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "previousSibling", {
                get: function () {
                  return this.prev;
                },
                set: function (e) {
                  this.prev = e;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "nextSibling", {
                get: function () {
                  return this.next;
                },
                set: function (e) {
                  this.next = e;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (e.prototype.cloneNode = function (e) {
                return void 0 === e && (e = !1), x(this, e);
              }),
              e
            );
          })();
        t.Node = l;
        var c = (function (e) {
          function t(t, r) {
            var n = e.call(this, t) || this;
            return (n.data = r), n;
          }
          return (
            i(t, e),
            Object.defineProperty(t.prototype, "nodeValue", {
              get: function () {
                return this.data;
              },
              set: function (e) {
                this.data = e;
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })(l);
        t.DataNode = c;
        var u = (function (e) {
          function t(t) {
            return e.call(this, a.ElementType.Text, t) || this;
          }
          return i(t, e), t;
        })(c);
        t.Text = u;
        var p = (function (e) {
          function t(t) {
            return e.call(this, a.ElementType.Comment, t) || this;
          }
          return i(t, e), t;
        })(c);
        t.Comment = p;
        var d = (function (e) {
          function t(t, r) {
            var n = e.call(this, a.ElementType.Directive, r) || this;
            return (n.name = t), n;
          }
          return i(t, e), t;
        })(c);
        t.ProcessingInstruction = d;
        var f = (function (e) {
          function t(t, r) {
            var n = e.call(this, t) || this;
            return (n.children = r), n;
          }
          return (
            i(t, e),
            Object.defineProperty(t.prototype, "firstChild", {
              get: function () {
                var e;
                return null !== (e = this.children[0]) && void 0 !== e
                  ? e
                  : null;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "lastChild", {
              get: function () {
                return this.children.length > 0
                  ? this.children[this.children.length - 1]
                  : null;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "childNodes", {
              get: function () {
                return this.children;
              },
              set: function (e) {
                this.children = e;
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })(l);
        t.NodeWithChildren = f;
        var h = (function (e) {
          function t(t) {
            return e.call(this, a.ElementType.Root, t) || this;
          }
          return i(t, e), t;
        })(f);
        t.Document = h;
        var m = (function (e) {
          function t(t, r, n, i) {
            void 0 === n && (n = []),
              void 0 === i &&
                (i =
                  "script" === t
                    ? a.ElementType.Script
                    : "style" === t
                    ? a.ElementType.Style
                    : a.ElementType.Tag);
            var o = e.call(this, i, n) || this;
            return (o.name = t), (o.attribs = r), o;
          }
          return (
            i(t, e),
            Object.defineProperty(t.prototype, "tagName", {
              get: function () {
                return this.name;
              },
              set: function (e) {
                this.name = e;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "attributes", {
              get: function () {
                var e = this;
                return Object.keys(this.attribs).map(function (t) {
                  var r, n;
                  return {
                    name: t,
                    value: e.attribs[t],
                    namespace:
                      null === (r = e["x-attribsNamespace"]) || void 0 === r
                        ? void 0
                        : r[t],
                    prefix:
                      null === (n = e["x-attribsPrefix"]) || void 0 === n
                        ? void 0
                        : n[t],
                  };
                });
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })(f);
        function g(e) {
          return (0, a.isTag)(e);
        }
        function v(e) {
          return e.type === a.ElementType.CDATA;
        }
        function b(e) {
          return e.type === a.ElementType.Text;
        }
        function y(e) {
          return e.type === a.ElementType.Comment;
        }
        function w(e) {
          return e.type === a.ElementType.Directive;
        }
        function E(e) {
          return e.type === a.ElementType.Root;
        }
        function x(e, t) {
          var r;
          if ((void 0 === t && (t = !1), b(e))) r = new u(e.data);
          else if (y(e)) r = new p(e.data);
          else if (g(e)) {
            var n = t ? T(e.children) : [],
              i = new m(e.name, o({}, e.attribs), n);
            n.forEach(function (e) {
              return (e.parent = i);
            }),
              null != e.namespace && (i.namespace = e.namespace),
              e["x-attribsNamespace"] &&
                (i["x-attribsNamespace"] = o({}, e["x-attribsNamespace"])),
              e["x-attribsPrefix"] &&
                (i["x-attribsPrefix"] = o({}, e["x-attribsPrefix"])),
              (r = i);
          } else if (v(e)) {
            n = t ? T(e.children) : [];
            var s = new f(a.ElementType.CDATA, n);
            n.forEach(function (e) {
              return (e.parent = s);
            }),
              (r = s);
          } else if (E(e)) {
            n = t ? T(e.children) : [];
            var l = new h(n);
            n.forEach(function (e) {
              return (e.parent = l);
            }),
              e["x-mode"] && (l["x-mode"] = e["x-mode"]),
              (r = l);
          } else {
            if (!w(e)) throw new Error("Not implemented yet: ".concat(e.type));
            var c = new d(e.name, e.data);
            null != e["x-name"] &&
              ((c["x-name"] = e["x-name"]),
              (c["x-publicId"] = e["x-publicId"]),
              (c["x-systemId"] = e["x-systemId"])),
              (r = c);
          }
          return (
            (r.startIndex = e.startIndex),
            (r.endIndex = e.endIndex),
            null != e.sourceCodeLocation &&
              (r.sourceCodeLocation = e.sourceCodeLocation),
            r
          );
        }
        function T(e) {
          for (
            var t = e.map(function (e) {
                return x(e, !0);
              }),
              r = 1;
            r < t.length;
            r++
          )
            (t[r].prev = t[r - 1]), (t[r - 1].next = t[r]);
          return t;
        }
        (t.Element = m),
          (t.isTag = g),
          (t.isCDATA = v),
          (t.isText = b),
          (t.isComment = y),
          (t.isDirective = w),
          (t.isDocument = E),
          (t.hasChildren = function (e) {
            return Object.prototype.hasOwnProperty.call(e, "children");
          }),
          (t.cloneNode = x);
      },
      6996: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.getFeed = void 0);
        var n = r(3346),
          i = r(3905);
        t.getFeed = function (e) {
          var t = l(p, e);
          return t
            ? "feed" === t.name
              ? (function (e) {
                  var t,
                    r = e.children,
                    n = {
                      type: "atom",
                      items: (0, i.getElementsByTagName)("entry", r).map(
                        function (e) {
                          var t,
                            r = e.children,
                            n = { media: s(r) };
                          u(n, "id", "id", r), u(n, "title", "title", r);
                          var i =
                            null === (t = l("link", r)) || void 0 === t
                              ? void 0
                              : t.attribs.href;
                          i && (n.link = i);
                          var o = c("summary", r) || c("content", r);
                          o && (n.description = o);
                          var a = c("updated", r);
                          return a && (n.pubDate = new Date(a)), n;
                        }
                      ),
                    };
                  u(n, "id", "id", r), u(n, "title", "title", r);
                  var o =
                    null === (t = l("link", r)) || void 0 === t
                      ? void 0
                      : t.attribs.href;
                  o && (n.link = o), u(n, "description", "subtitle", r);
                  var a = c("updated", r);
                  return (
                    a && (n.updated = new Date(a)),
                    u(n, "author", "email", r, !0),
                    n
                  );
                })(t)
              : (function (e) {
                  var t,
                    r,
                    n =
                      null !==
                        (r =
                          null === (t = l("channel", e.children)) ||
                          void 0 === t
                            ? void 0
                            : t.children) && void 0 !== r
                        ? r
                        : [],
                    o = {
                      type: e.name.substr(0, 3),
                      id: "",
                      items: (0, i.getElementsByTagName)(
                        "item",
                        e.children
                      ).map(function (e) {
                        var t = e.children,
                          r = { media: s(t) };
                        u(r, "id", "guid", t),
                          u(r, "title", "title", t),
                          u(r, "link", "link", t),
                          u(r, "description", "description", t);
                        var n = c("pubDate", t);
                        return n && (r.pubDate = new Date(n)), r;
                      }),
                    };
                  u(o, "title", "title", n),
                    u(o, "link", "link", n),
                    u(o, "description", "description", n);
                  var a = c("lastBuildDate", n);
                  return (
                    a && (o.updated = new Date(a)),
                    u(o, "author", "managingEditor", n, !0),
                    o
                  );
                })(t)
            : null;
        };
        var o = ["url", "type", "lang"],
          a = [
            "fileSize",
            "bitrate",
            "framerate",
            "samplingrate",
            "channels",
            "duration",
            "height",
            "width",
          ];
        function s(e) {
          return (0, i.getElementsByTagName)("media:content", e).map(function (
            e
          ) {
            for (
              var t = e.attribs,
                r = { medium: t.medium, isDefault: !!t.isDefault },
                n = 0,
                i = o;
              n < i.length;
              n++
            )
              t[(c = i[n])] && (r[c] = t[c]);
            for (var s = 0, l = a; s < l.length; s++) {
              var c;
              t[(c = l[s])] && (r[c] = parseInt(t[c], 10));
            }
            return t.expression && (r.expression = t.expression), r;
          });
        }
        function l(e, t) {
          return (0, i.getElementsByTagName)(e, t, !0, 1)[0];
        }
        function c(e, t, r) {
          return (
            void 0 === r && (r = !1),
            (0, n.textContent)((0, i.getElementsByTagName)(e, t, r, 1)).trim()
          );
        }
        function u(e, t, r, n, i) {
          void 0 === i && (i = !1);
          var o = c(r, n, i);
          o && (e[t] = o);
        }
        function p(e) {
          return "rss" === e || "feed" === e || "rdf:RDF" === e;
        }
      },
      4975: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.uniqueSort = t.compareDocumentPosition = t.removeSubsets = void 0);
        var n = r(7915);
        function i(e, t) {
          var r = [],
            i = [];
          if (e === t) return 0;
          for (var o = (0, n.hasChildren)(e) ? e : e.parent; o; )
            r.unshift(o), (o = o.parent);
          for (o = (0, n.hasChildren)(t) ? t : t.parent; o; )
            i.unshift(o), (o = o.parent);
          for (
            var a = Math.min(r.length, i.length), s = 0;
            s < a && r[s] === i[s];

          )
            s++;
          if (0 === s) return 1;
          var l = r[s - 1],
            c = l.children,
            u = r[s],
            p = i[s];
          return c.indexOf(u) > c.indexOf(p)
            ? l === t
              ? 20
              : 4
            : l === e
            ? 10
            : 2;
        }
        (t.removeSubsets = function (e) {
          for (var t = e.length; --t >= 0; ) {
            var r = e[t];
            if (t > 0 && e.lastIndexOf(r, t - 1) >= 0) e.splice(t, 1);
            else
              for (var n = r.parent; n; n = n.parent)
                if (e.includes(n)) {
                  e.splice(t, 1);
                  break;
                }
          }
          return e;
        }),
          (t.compareDocumentPosition = i),
          (t.uniqueSort = function (e) {
            return (
              (e = e.filter(function (e, t, r) {
                return !r.includes(e, t + 1);
              })),
              e.sort(function (e, t) {
                var r = i(e, t);
                return 2 & r ? -1 : 4 & r ? 1 : 0;
              }),
              e
            );
          });
      },
      9432: function (e, t, r) {
        "use strict";
        var n =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r),
                    Object.defineProperty(e, n, {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    });
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          i =
            (this && this.__exportStar) ||
            function (e, t) {
              for (var r in e)
                "default" === r ||
                  Object.prototype.hasOwnProperty.call(t, r) ||
                  n(t, e, r);
            };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.hasChildren =
            t.isDocument =
            t.isComment =
            t.isText =
            t.isCDATA =
            t.isTag =
              void 0),
          i(r(3346), t),
          i(r(5010), t),
          i(r(6765), t),
          i(r(8043), t),
          i(r(3905), t),
          i(r(4975), t),
          i(r(6996), t);
        var o = r(7915);
        Object.defineProperty(t, "isTag", {
          enumerable: !0,
          get: function () {
            return o.isTag;
          },
        }),
          Object.defineProperty(t, "isCDATA", {
            enumerable: !0,
            get: function () {
              return o.isCDATA;
            },
          }),
          Object.defineProperty(t, "isText", {
            enumerable: !0,
            get: function () {
              return o.isText;
            },
          }),
          Object.defineProperty(t, "isComment", {
            enumerable: !0,
            get: function () {
              return o.isComment;
            },
          }),
          Object.defineProperty(t, "isDocument", {
            enumerable: !0,
            get: function () {
              return o.isDocument;
            },
          }),
          Object.defineProperty(t, "hasChildren", {
            enumerable: !0,
            get: function () {
              return o.hasChildren;
            },
          });
      },
      3905: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.getElementsByTagType =
            t.getElementsByTagName =
            t.getElementById =
            t.getElements =
            t.testElement =
              void 0);
        var n = r(7915),
          i = r(8043),
          o = {
            tag_name: function (e) {
              return "function" == typeof e
                ? function (t) {
                    return (0, n.isTag)(t) && e(t.name);
                  }
                : "*" === e
                ? n.isTag
                : function (t) {
                    return (0, n.isTag)(t) && t.name === e;
                  };
            },
            tag_type: function (e) {
              return "function" == typeof e
                ? function (t) {
                    return e(t.type);
                  }
                : function (t) {
                    return t.type === e;
                  };
            },
            tag_contains: function (e) {
              return "function" == typeof e
                ? function (t) {
                    return (0, n.isText)(t) && e(t.data);
                  }
                : function (t) {
                    return (0, n.isText)(t) && t.data === e;
                  };
            },
          };
        function a(e, t) {
          return "function" == typeof t
            ? function (r) {
                return (0, n.isTag)(r) && t(r.attribs[e]);
              }
            : function (r) {
                return (0, n.isTag)(r) && r.attribs[e] === t;
              };
        }
        function s(e, t) {
          return function (r) {
            return e(r) || t(r);
          };
        }
        function l(e) {
          var t = Object.keys(e).map(function (t) {
            var r = e[t];
            return Object.prototype.hasOwnProperty.call(o, t)
              ? o[t](r)
              : a(t, r);
          });
          return 0 === t.length ? null : t.reduce(s);
        }
        (t.testElement = function (e, t) {
          var r = l(e);
          return !r || r(t);
        }),
          (t.getElements = function (e, t, r, n) {
            void 0 === n && (n = 1 / 0);
            var o = l(e);
            return o ? (0, i.filter)(o, t, r, n) : [];
          }),
          (t.getElementById = function (e, t, r) {
            return (
              void 0 === r && (r = !0),
              Array.isArray(t) || (t = [t]),
              (0, i.findOne)(a("id", e), t, r)
            );
          }),
          (t.getElementsByTagName = function (e, t, r, n) {
            return (
              void 0 === r && (r = !0),
              void 0 === n && (n = 1 / 0),
              (0, i.filter)(o.tag_name(e), t, r, n)
            );
          }),
          (t.getElementsByTagType = function (e, t, r, n) {
            return (
              void 0 === r && (r = !0),
              void 0 === n && (n = 1 / 0),
              (0, i.filter)(o.tag_type(e), t, r, n)
            );
          });
      },
      6765: (e, t) => {
        "use strict";
        function r(e) {
          if (
            (e.prev && (e.prev.next = e.next),
            e.next && (e.next.prev = e.prev),
            e.parent)
          ) {
            var t = e.parent.children;
            t.splice(t.lastIndexOf(e), 1);
          }
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.prepend =
            t.prependChild =
            t.append =
            t.appendChild =
            t.replaceElement =
            t.removeElement =
              void 0),
          (t.removeElement = r),
          (t.replaceElement = function (e, t) {
            var r = (t.prev = e.prev);
            r && (r.next = t);
            var n = (t.next = e.next);
            n && (n.prev = t);
            var i = (t.parent = e.parent);
            if (i) {
              var o = i.children;
              o[o.lastIndexOf(e)] = t;
            }
          }),
          (t.appendChild = function (e, t) {
            if (
              (r(t), (t.next = null), (t.parent = e), e.children.push(t) > 1)
            ) {
              var n = e.children[e.children.length - 2];
              (n.next = t), (t.prev = n);
            } else t.prev = null;
          }),
          (t.append = function (e, t) {
            r(t);
            var n = e.parent,
              i = e.next;
            if (((t.next = i), (t.prev = e), (e.next = t), (t.parent = n), i)) {
              if (((i.prev = t), n)) {
                var o = n.children;
                o.splice(o.lastIndexOf(i), 0, t);
              }
            } else n && n.children.push(t);
          }),
          (t.prependChild = function (e, t) {
            if (
              (r(t),
              (t.parent = e),
              (t.prev = null),
              1 !== e.children.unshift(t))
            ) {
              var n = e.children[1];
              (n.prev = t), (t.next = n);
            } else t.next = null;
          }),
          (t.prepend = function (e, t) {
            r(t);
            var n = e.parent;
            if (n) {
              var i = n.children;
              i.splice(i.indexOf(e), 0, t);
            }
            e.prev && (e.prev.next = t),
              (t.parent = n),
              (t.prev = e.prev),
              (t.next = e),
              (e.prev = t);
          });
      },
      8043: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.findAll =
            t.existsOne =
            t.findOne =
            t.findOneChild =
            t.find =
            t.filter =
              void 0);
        var n = r(7915);
        function i(e, t, r, o) {
          for (var a = [], s = 0, l = t; s < l.length; s++) {
            var c = l[s];
            if (e(c) && (a.push(c), --o <= 0)) break;
            if (r && (0, n.hasChildren)(c) && c.children.length > 0) {
              var u = i(e, c.children, r, o);
              if ((a.push.apply(a, u), (o -= u.length) <= 0)) break;
            }
          }
          return a;
        }
        (t.filter = function (e, t, r, n) {
          return (
            void 0 === r && (r = !0),
            void 0 === n && (n = 1 / 0),
            Array.isArray(t) || (t = [t]),
            i(e, t, r, n)
          );
        }),
          (t.find = i),
          (t.findOneChild = function (e, t) {
            return t.find(e);
          }),
          (t.findOne = function e(t, r, i) {
            void 0 === i && (i = !0);
            for (var o = null, a = 0; a < r.length && !o; a++) {
              var s = r[a];
              (0, n.isTag)(s) &&
                (t(s)
                  ? (o = s)
                  : i && s.children.length > 0 && (o = e(t, s.children)));
            }
            return o;
          }),
          (t.existsOne = function e(t, r) {
            return r.some(function (r) {
              return (
                (0, n.isTag)(r) &&
                (t(r) || (r.children.length > 0 && e(t, r.children)))
              );
            });
          }),
          (t.findAll = function (e, t) {
            for (var r, i, o = [], a = t.filter(n.isTag); (i = a.shift()); ) {
              var s =
                null === (r = i.children) || void 0 === r
                  ? void 0
                  : r.filter(n.isTag);
              s && s.length > 0 && a.unshift.apply(a, s), e(i) && o.push(i);
            }
            return o;
          });
      },
      3346: function (e, t, r) {
        "use strict";
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.innerText =
            t.textContent =
            t.getText =
            t.getInnerHTML =
            t.getOuterHTML =
              void 0);
        var i = r(7915),
          o = n(r(7220)),
          a = r(9960);
        function s(e, t) {
          return (0, o.default)(e, t);
        }
        (t.getOuterHTML = s),
          (t.getInnerHTML = function (e, t) {
            return (0, i.hasChildren)(e)
              ? e.children
                  .map(function (e) {
                    return s(e, t);
                  })
                  .join("")
              : "";
          }),
          (t.getText = function e(t) {
            return Array.isArray(t)
              ? t.map(e).join("")
              : (0, i.isTag)(t)
              ? "br" === t.name
                ? "\n"
                : e(t.children)
              : (0, i.isCDATA)(t)
              ? e(t.children)
              : (0, i.isText)(t)
              ? t.data
              : "";
          }),
          (t.textContent = function e(t) {
            return Array.isArray(t)
              ? t.map(e).join("")
              : (0, i.hasChildren)(t) && !(0, i.isComment)(t)
              ? e(t.children)
              : (0, i.isText)(t)
              ? t.data
              : "";
          }),
          (t.innerText = function e(t) {
            return Array.isArray(t)
              ? t.map(e).join("")
              : (0, i.hasChildren)(t) &&
                (t.type === a.ElementType.Tag || (0, i.isCDATA)(t))
              ? e(t.children)
              : (0, i.isText)(t)
              ? t.data
              : "";
          });
      },
      5010: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.prevElementSibling =
            t.nextElementSibling =
            t.getName =
            t.hasAttrib =
            t.getAttributeValue =
            t.getSiblings =
            t.getParent =
            t.getChildren =
              void 0);
        var n = r(7915),
          i = [];
        function o(e) {
          var t;
          return null !== (t = e.children) && void 0 !== t ? t : i;
        }
        function a(e) {
          return e.parent || null;
        }
        (t.getChildren = o),
          (t.getParent = a),
          (t.getSiblings = function (e) {
            var t = a(e);
            if (null != t) return o(t);
            for (var r = [e], n = e.prev, i = e.next; null != n; )
              r.unshift(n), (n = n.prev);
            for (; null != i; ) r.push(i), (i = i.next);
            return r;
          }),
          (t.getAttributeValue = function (e, t) {
            var r;
            return null === (r = e.attribs) || void 0 === r ? void 0 : r[t];
          }),
          (t.hasAttrib = function (e, t) {
            return (
              null != e.attribs &&
              Object.prototype.hasOwnProperty.call(e.attribs, t) &&
              null != e.attribs[t]
            );
          }),
          (t.getName = function (e) {
            return e.name;
          }),
          (t.nextElementSibling = function (e) {
            for (var t = e.next; null !== t && !(0, n.isTag)(t); ) t = t.next;
            return t;
          }),
          (t.prevElementSibling = function (e) {
            for (var t = e.prev; null !== t && !(0, n.isTag)(t); ) t = t.prev;
            return t;
          });
      },
      4076: function (e, t, r) {
        "use strict";
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.decodeHTML = t.decodeHTMLStrict = t.decodeXML = void 0);
        var i = n(r(9323)),
          o = n(r(9591)),
          a = n(r(2586)),
          s = n(r(26)),
          l = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
        function c(e) {
          var t = p(e);
          return function (e) {
            return String(e).replace(l, t);
          };
        }
        (t.decodeXML = c(a.default)), (t.decodeHTMLStrict = c(i.default));
        var u = function (e, t) {
          return e < t ? 1 : -1;
        };
        function p(e) {
          return function (t) {
            if ("#" === t.charAt(1)) {
              var r = t.charAt(2);
              return "X" === r || "x" === r
                ? s.default(parseInt(t.substr(3), 16))
                : s.default(parseInt(t.substr(2), 10));
            }
            return e[t.slice(1, -1)] || t;
          };
        }
        t.decodeHTML = (function () {
          for (
            var e = Object.keys(o.default).sort(u),
              t = Object.keys(i.default).sort(u),
              r = 0,
              n = 0;
            r < t.length;
            r++
          )
            e[n] === t[r] ? ((t[r] += ";?"), n++) : (t[r] += ";");
          var a = new RegExp(
              "&(?:" + t.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)",
              "g"
            ),
            s = p(i.default);
          function l(e) {
            return ";" !== e.substr(-1) && (e += ";"), s(e);
          }
          return function (e) {
            return String(e).replace(a, l);
          };
        })();
      },
      26: function (e, t, r) {
        "use strict";
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        var i = n(r(3600)),
          o =
            String.fromCodePoint ||
            function (e) {
              var t = "";
              return (
                e > 65535 &&
                  ((e -= 65536),
                  (t += String.fromCharCode(((e >>> 10) & 1023) | 55296)),
                  (e = 56320 | (1023 & e))),
                t + String.fromCharCode(e)
              );
            };
        t.default = function (e) {
          return (e >= 55296 && e <= 57343) || e > 1114111
            ? "�"
            : (e in i.default && (e = i.default[e]), o(e));
        };
      },
      7322: function (e, t, r) {
        "use strict";
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.escapeUTF8 =
            t.escape =
            t.encodeNonAsciiHTML =
            t.encodeHTML =
            t.encodeXML =
              void 0);
        var i = u(n(r(2586)).default),
          o = p(i);
        t.encodeXML = g(i);
        var a,
          s,
          l = u(n(r(9323)).default),
          c = p(l);
        function u(e) {
          return Object.keys(e)
            .sort()
            .reduce(function (t, r) {
              return (t[e[r]] = "&" + r + ";"), t;
            }, {});
        }
        function p(e) {
          for (
            var t = [], r = [], n = 0, i = Object.keys(e);
            n < i.length;
            n++
          ) {
            var o = i[n];
            1 === o.length ? t.push("\\" + o) : r.push(o);
          }
          t.sort();
          for (var a = 0; a < t.length - 1; a++) {
            for (
              var s = a;
              s < t.length - 1 &&
              t[s].charCodeAt(1) + 1 === t[s + 1].charCodeAt(1);

            )
              s += 1;
            var l = 1 + s - a;
            l < 3 || t.splice(a, l, t[a] + "-" + t[s]);
          }
          return (
            r.unshift("[" + t.join("") + "]"), new RegExp(r.join("|"), "g")
          );
        }
        (t.encodeHTML =
          ((a = l),
          (s = c),
          function (e) {
            return e
              .replace(s, function (e) {
                return a[e];
              })
              .replace(d, h);
          })),
          (t.encodeNonAsciiHTML = g(l));
        var d =
            /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
          f =
            null != String.prototype.codePointAt
              ? function (e) {
                  return e.codePointAt(0);
                }
              : function (e) {
                  return (
                    1024 * (e.charCodeAt(0) - 55296) +
                    e.charCodeAt(1) -
                    56320 +
                    65536
                  );
                };
        function h(e) {
          return (
            "&#x" +
            (e.length > 1 ? f(e) : e.charCodeAt(0)).toString(16).toUpperCase() +
            ";"
          );
        }
        var m = new RegExp(o.source + "|" + d.source, "g");
        function g(e) {
          return function (t) {
            return t.replace(m, function (t) {
              return e[t] || h(t);
            });
          };
        }
        (t.escape = function (e) {
          return e.replace(m, h);
        }),
          (t.escapeUTF8 = function (e) {
            return e.replace(o, h);
          });
      },
      5863: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.decodeXMLStrict =
            t.decodeHTML5Strict =
            t.decodeHTML4Strict =
            t.decodeHTML5 =
            t.decodeHTML4 =
            t.decodeHTMLStrict =
            t.decodeHTML =
            t.decodeXML =
            t.encodeHTML5 =
            t.encodeHTML4 =
            t.escapeUTF8 =
            t.escape =
            t.encodeNonAsciiHTML =
            t.encodeHTML =
            t.encodeXML =
            t.encode =
            t.decodeStrict =
            t.decode =
              void 0);
        var n = r(4076),
          i = r(7322);
        (t.decode = function (e, t) {
          return (!t || t <= 0 ? n.decodeXML : n.decodeHTML)(e);
        }),
          (t.decodeStrict = function (e, t) {
            return (!t || t <= 0 ? n.decodeXML : n.decodeHTMLStrict)(e);
          }),
          (t.encode = function (e, t) {
            return (!t || t <= 0 ? i.encodeXML : i.encodeHTML)(e);
          });
        var o = r(7322);
        Object.defineProperty(t, "encodeXML", {
          enumerable: !0,
          get: function () {
            return o.encodeXML;
          },
        }),
          Object.defineProperty(t, "encodeHTML", {
            enumerable: !0,
            get: function () {
              return o.encodeHTML;
            },
          }),
          Object.defineProperty(t, "encodeNonAsciiHTML", {
            enumerable: !0,
            get: function () {
              return o.encodeNonAsciiHTML;
            },
          }),
          Object.defineProperty(t, "escape", {
            enumerable: !0,
            get: function () {
              return o.escape;
            },
          }),
          Object.defineProperty(t, "escapeUTF8", {
            enumerable: !0,
            get: function () {
              return o.escapeUTF8;
            },
          }),
          Object.defineProperty(t, "encodeHTML4", {
            enumerable: !0,
            get: function () {
              return o.encodeHTML;
            },
          }),
          Object.defineProperty(t, "encodeHTML5", {
            enumerable: !0,
            get: function () {
              return o.encodeHTML;
            },
          });
        var a = r(4076);
        Object.defineProperty(t, "decodeXML", {
          enumerable: !0,
          get: function () {
            return a.decodeXML;
          },
        }),
          Object.defineProperty(t, "decodeHTML", {
            enumerable: !0,
            get: function () {
              return a.decodeHTML;
            },
          }),
          Object.defineProperty(t, "decodeHTMLStrict", {
            enumerable: !0,
            get: function () {
              return a.decodeHTMLStrict;
            },
          }),
          Object.defineProperty(t, "decodeHTML4", {
            enumerable: !0,
            get: function () {
              return a.decodeHTML;
            },
          }),
          Object.defineProperty(t, "decodeHTML5", {
            enumerable: !0,
            get: function () {
              return a.decodeHTML;
            },
          }),
          Object.defineProperty(t, "decodeHTML4Strict", {
            enumerable: !0,
            get: function () {
              return a.decodeHTMLStrict;
            },
          }),
          Object.defineProperty(t, "decodeHTML5Strict", {
            enumerable: !0,
            get: function () {
              return a.decodeHTMLStrict;
            },
          }),
          Object.defineProperty(t, "decodeXMLStrict", {
            enumerable: !0,
            get: function () {
              return a.decodeXML;
            },
          });
      },
      6492: function (e, t, r) {
        var n;
        (e = r.nmd(e)),
          (function (i) {
            var o = (e && e.exports, "object" == typeof global && global);
            o.global !== o && o.window;
            var a = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
              s = /[\x01-\x7F]/g,
              l =
                /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,
              c =
                /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g,
              u = {
                "­": "shy",
                "‌": "zwnj",
                "‍": "zwj",
                "‎": "lrm",
                "⁣": "ic",
                "⁢": "it",
                "⁡": "af",
                "‏": "rlm",
                "​": "ZeroWidthSpace",
                "⁠": "NoBreak",
                "̑": "DownBreve",
                "⃛": "tdot",
                "⃜": "DotDot",
                "\t": "Tab",
                "\n": "NewLine",
                " ": "puncsp",
                " ": "MediumSpace",
                " ": "thinsp",
                " ": "hairsp",
                " ": "emsp13",
                " ": "ensp",
                " ": "emsp14",
                " ": "emsp",
                " ": "numsp",
                " ": "nbsp",
                "  ": "ThickSpace",
                "‾": "oline",
                _: "lowbar",
                "‐": "dash",
                "–": "ndash",
                "—": "mdash",
                "―": "horbar",
                ",": "comma",
                ";": "semi",
                "⁏": "bsemi",
                ":": "colon",
                "⩴": "Colone",
                "!": "excl",
                "¡": "iexcl",
                "?": "quest",
                "¿": "iquest",
                ".": "period",
                "‥": "nldr",
                "…": "mldr",
                "·": "middot",
                "'": "apos",
                "‘": "lsquo",
                "’": "rsquo",
                "‚": "sbquo",
                "‹": "lsaquo",
                "›": "rsaquo",
                '"': "quot",
                "“": "ldquo",
                "”": "rdquo",
                "„": "bdquo",
                "«": "laquo",
                "»": "raquo",
                "(": "lpar",
                ")": "rpar",
                "[": "lsqb",
                "]": "rsqb",
                "{": "lcub",
                "}": "rcub",
                "⌈": "lceil",
                "⌉": "rceil",
                "⌊": "lfloor",
                "⌋": "rfloor",
                "⦅": "lopar",
                "⦆": "ropar",
                "⦋": "lbrke",
                "⦌": "rbrke",
                "⦍": "lbrkslu",
                "⦎": "rbrksld",
                "⦏": "lbrksld",
                "⦐": "rbrkslu",
                "⦑": "langd",
                "⦒": "rangd",
                "⦓": "lparlt",
                "⦔": "rpargt",
                "⦕": "gtlPar",
                "⦖": "ltrPar",
                "⟦": "lobrk",
                "⟧": "robrk",
                "⟨": "lang",
                "⟩": "rang",
                "⟪": "Lang",
                "⟫": "Rang",
                "⟬": "loang",
                "⟭": "roang",
                "❲": "lbbrk",
                "❳": "rbbrk",
                "‖": "Vert",
                "§": "sect",
                "¶": "para",
                "@": "commat",
                "*": "ast",
                "/": "sol",
                undefined: null,
                "&": "amp",
                "#": "num",
                "%": "percnt",
                "‰": "permil",
                "‱": "pertenk",
                "†": "dagger",
                "‡": "Dagger",
                "•": "bull",
                "⁃": "hybull",
                "′": "prime",
                "″": "Prime",
                "‴": "tprime",
                "⁗": "qprime",
                "‵": "bprime",
                "⁁": "caret",
                "`": "grave",
                "´": "acute",
                "˜": "tilde",
                "^": "Hat",
                "¯": "macr",
                "˘": "breve",
                "˙": "dot",
                "¨": "die",
                "˚": "ring",
                "˝": "dblac",
                "¸": "cedil",
                "˛": "ogon",
                ˆ: "circ",
                ˇ: "caron",
                "°": "deg",
                "©": "copy",
                "®": "reg",
                "℗": "copysr",
                ℘: "wp",
                "℞": "rx",
                "℧": "mho",
                "℩": "iiota",
                "←": "larr",
                "↚": "nlarr",
                "→": "rarr",
                "↛": "nrarr",
                "↑": "uarr",
                "↓": "darr",
                "↔": "harr",
                "↮": "nharr",
                "↕": "varr",
                "↖": "nwarr",
                "↗": "nearr",
                "↘": "searr",
                "↙": "swarr",
                "↝": "rarrw",
                "↝̸": "nrarrw",
                "↞": "Larr",
                "↟": "Uarr",
                "↠": "Rarr",
                "↡": "Darr",
                "↢": "larrtl",
                "↣": "rarrtl",
                "↤": "mapstoleft",
                "↥": "mapstoup",
                "↦": "map",
                "↧": "mapstodown",
                "↩": "larrhk",
                "↪": "rarrhk",
                "↫": "larrlp",
                "↬": "rarrlp",
                "↭": "harrw",
                "↰": "lsh",
                "↱": "rsh",
                "↲": "ldsh",
                "↳": "rdsh",
                "↵": "crarr",
                "↶": "cularr",
                "↷": "curarr",
                "↺": "olarr",
                "↻": "orarr",
                "↼": "lharu",
                "↽": "lhard",
                "↾": "uharr",
                "↿": "uharl",
                "⇀": "rharu",
                "⇁": "rhard",
                "⇂": "dharr",
                "⇃": "dharl",
                "⇄": "rlarr",
                "⇅": "udarr",
                "⇆": "lrarr",
                "⇇": "llarr",
                "⇈": "uuarr",
                "⇉": "rrarr",
                "⇊": "ddarr",
                "⇋": "lrhar",
                "⇌": "rlhar",
                "⇐": "lArr",
                "⇍": "nlArr",
                "⇑": "uArr",
                "⇒": "rArr",
                "⇏": "nrArr",
                "⇓": "dArr",
                "⇔": "iff",
                "⇎": "nhArr",
                "⇕": "vArr",
                "⇖": "nwArr",
                "⇗": "neArr",
                "⇘": "seArr",
                "⇙": "swArr",
                "⇚": "lAarr",
                "⇛": "rAarr",
                "⇝": "zigrarr",
                "⇤": "larrb",
                "⇥": "rarrb",
                "⇵": "duarr",
                "⇽": "loarr",
                "⇾": "roarr",
                "⇿": "hoarr",
                "∀": "forall",
                "∁": "comp",
                "∂": "part",
                "∂̸": "npart",
                "∃": "exist",
                "∄": "nexist",
                "∅": "empty",
                "∇": "Del",
                "∈": "in",
                "∉": "notin",
                "∋": "ni",
                "∌": "notni",
                "϶": "bepsi",
                "∏": "prod",
                "∐": "coprod",
                "∑": "sum",
                "+": "plus",
                "±": "pm",
                "÷": "div",
                "×": "times",
                "<": "lt",
                "≮": "nlt",
                "<⃒": "nvlt",
                "=": "equals",
                "≠": "ne",
                "=⃥": "bne",
                "⩵": "Equal",
                ">": "gt",
                "≯": "ngt",
                ">⃒": "nvgt",
                "¬": "not",
                "|": "vert",
                "¦": "brvbar",
                "−": "minus",
                "∓": "mp",
                "∔": "plusdo",
                "⁄": "frasl",
                "∖": "setmn",
                "∗": "lowast",
                "∘": "compfn",
                "√": "Sqrt",
                "∝": "prop",
                "∞": "infin",
                "∟": "angrt",
                "∠": "ang",
                "∠⃒": "nang",
                "∡": "angmsd",
                "∢": "angsph",
                "∣": "mid",
                "∤": "nmid",
                "∥": "par",
                "∦": "npar",
                "∧": "and",
                "∨": "or",
                "∩": "cap",
                "∩︀": "caps",
                "∪": "cup",
                "∪︀": "cups",
                "∫": "int",
                "∬": "Int",
                "∭": "tint",
                "⨌": "qint",
                "∮": "oint",
                "∯": "Conint",
                "∰": "Cconint",
                "∱": "cwint",
                "∲": "cwconint",
                "∳": "awconint",
                "∴": "there4",
                "∵": "becaus",
                "∶": "ratio",
                "∷": "Colon",
                "∸": "minusd",
                "∺": "mDDot",
                "∻": "homtht",
                "∼": "sim",
                "≁": "nsim",
                "∼⃒": "nvsim",
                "∽": "bsim",
                "∽̱": "race",
                "∾": "ac",
                "∾̳": "acE",
                "∿": "acd",
                "≀": "wr",
                "≂": "esim",
                "≂̸": "nesim",
                "≃": "sime",
                "≄": "nsime",
                "≅": "cong",
                "≇": "ncong",
                "≆": "simne",
                "≈": "ap",
                "≉": "nap",
                "≊": "ape",
                "≋": "apid",
                "≋̸": "napid",
                "≌": "bcong",
                "≍": "CupCap",
                "≭": "NotCupCap",
                "≍⃒": "nvap",
                "≎": "bump",
                "≎̸": "nbump",
                "≏": "bumpe",
                "≏̸": "nbumpe",
                "≐": "doteq",
                "≐̸": "nedot",
                "≑": "eDot",
                "≒": "efDot",
                "≓": "erDot",
                "≔": "colone",
                "≕": "ecolon",
                "≖": "ecir",
                "≗": "cire",
                "≙": "wedgeq",
                "≚": "veeeq",
                "≜": "trie",
                "≟": "equest",
                "≡": "equiv",
                "≢": "nequiv",
                "≡⃥": "bnequiv",
                "≤": "le",
                "≰": "nle",
                "≤⃒": "nvle",
                "≥": "ge",
                "≱": "nge",
                "≥⃒": "nvge",
                "≦": "lE",
                "≦̸": "nlE",
                "≧": "gE",
                "≧̸": "ngE",
                "≨︀": "lvnE",
                "≨": "lnE",
                "≩": "gnE",
                "≩︀": "gvnE",
                "≪": "ll",
                "≪̸": "nLtv",
                "≪⃒": "nLt",
                "≫": "gg",
                "≫̸": "nGtv",
                "≫⃒": "nGt",
                "≬": "twixt",
                "≲": "lsim",
                "≴": "nlsim",
                "≳": "gsim",
                "≵": "ngsim",
                "≶": "lg",
                "≸": "ntlg",
                "≷": "gl",
                "≹": "ntgl",
                "≺": "pr",
                "⊀": "npr",
                "≻": "sc",
                "⊁": "nsc",
                "≼": "prcue",
                "⋠": "nprcue",
                "≽": "sccue",
                "⋡": "nsccue",
                "≾": "prsim",
                "≿": "scsim",
                "≿̸": "NotSucceedsTilde",
                "⊂": "sub",
                "⊄": "nsub",
                "⊂⃒": "vnsub",
                "⊃": "sup",
                "⊅": "nsup",
                "⊃⃒": "vnsup",
                "⊆": "sube",
                "⊈": "nsube",
                "⊇": "supe",
                "⊉": "nsupe",
                "⊊︀": "vsubne",
                "⊊": "subne",
                "⊋︀": "vsupne",
                "⊋": "supne",
                "⊍": "cupdot",
                "⊎": "uplus",
                "⊏": "sqsub",
                "⊏̸": "NotSquareSubset",
                "⊐": "sqsup",
                "⊐̸": "NotSquareSuperset",
                "⊑": "sqsube",
                "⋢": "nsqsube",
                "⊒": "sqsupe",
                "⋣": "nsqsupe",
                "⊓": "sqcap",
                "⊓︀": "sqcaps",
                "⊔": "sqcup",
                "⊔︀": "sqcups",
                "⊕": "oplus",
                "⊖": "ominus",
                "⊗": "otimes",
                "⊘": "osol",
                "⊙": "odot",
                "⊚": "ocir",
                "⊛": "oast",
                "⊝": "odash",
                "⊞": "plusb",
                "⊟": "minusb",
                "⊠": "timesb",
                "⊡": "sdotb",
                "⊢": "vdash",
                "⊬": "nvdash",
                "⊣": "dashv",
                "⊤": "top",
                "⊥": "bot",
                "⊧": "models",
                "⊨": "vDash",
                "⊭": "nvDash",
                "⊩": "Vdash",
                "⊮": "nVdash",
                "⊪": "Vvdash",
                "⊫": "VDash",
                "⊯": "nVDash",
                "⊰": "prurel",
                "⊲": "vltri",
                "⋪": "nltri",
                "⊳": "vrtri",
                "⋫": "nrtri",
                "⊴": "ltrie",
                "⋬": "nltrie",
                "⊴⃒": "nvltrie",
                "⊵": "rtrie",
                "⋭": "nrtrie",
                "⊵⃒": "nvrtrie",
                "⊶": "origof",
                "⊷": "imof",
                "⊸": "mumap",
                "⊹": "hercon",
                "⊺": "intcal",
                "⊻": "veebar",
                "⊽": "barvee",
                "⊾": "angrtvb",
                "⊿": "lrtri",
                "⋀": "Wedge",
                "⋁": "Vee",
                "⋂": "xcap",
                "⋃": "xcup",
                "⋄": "diam",
                "⋅": "sdot",
                "⋆": "Star",
                "⋇": "divonx",
                "⋈": "bowtie",
                "⋉": "ltimes",
                "⋊": "rtimes",
                "⋋": "lthree",
                "⋌": "rthree",
                "⋍": "bsime",
                "⋎": "cuvee",
                "⋏": "cuwed",
                "⋐": "Sub",
                "⋑": "Sup",
                "⋒": "Cap",
                "⋓": "Cup",
                "⋔": "fork",
                "⋕": "epar",
                "⋖": "ltdot",
                "⋗": "gtdot",
                "⋘": "Ll",
                "⋘̸": "nLl",
                "⋙": "Gg",
                "⋙̸": "nGg",
                "⋚︀": "lesg",
                "⋚": "leg",
                "⋛": "gel",
                "⋛︀": "gesl",
                "⋞": "cuepr",
                "⋟": "cuesc",
                "⋦": "lnsim",
                "⋧": "gnsim",
                "⋨": "prnsim",
                "⋩": "scnsim",
                "⋮": "vellip",
                "⋯": "ctdot",
                "⋰": "utdot",
                "⋱": "dtdot",
                "⋲": "disin",
                "⋳": "isinsv",
                "⋴": "isins",
                "⋵": "isindot",
                "⋵̸": "notindot",
                "⋶": "notinvc",
                "⋷": "notinvb",
                "⋹": "isinE",
                "⋹̸": "notinE",
                "⋺": "nisd",
                "⋻": "xnis",
                "⋼": "nis",
                "⋽": "notnivc",
                "⋾": "notnivb",
                "⌅": "barwed",
                "⌆": "Barwed",
                "⌌": "drcrop",
                "⌍": "dlcrop",
                "⌎": "urcrop",
                "⌏": "ulcrop",
                "⌐": "bnot",
                "⌒": "profline",
                "⌓": "profsurf",
                "⌕": "telrec",
                "⌖": "target",
                "⌜": "ulcorn",
                "⌝": "urcorn",
                "⌞": "dlcorn",
                "⌟": "drcorn",
                "⌢": "frown",
                "⌣": "smile",
                "⌭": "cylcty",
                "⌮": "profalar",
                "⌶": "topbot",
                "⌽": "ovbar",
                "⌿": "solbar",
                "⍼": "angzarr",
                "⎰": "lmoust",
                "⎱": "rmoust",
                "⎴": "tbrk",
                "⎵": "bbrk",
                "⎶": "bbrktbrk",
                "⏜": "OverParenthesis",
                "⏝": "UnderParenthesis",
                "⏞": "OverBrace",
                "⏟": "UnderBrace",
                "⏢": "trpezium",
                "⏧": "elinters",
                "␣": "blank",
                "─": "boxh",
                "│": "boxv",
                "┌": "boxdr",
                "┐": "boxdl",
                "└": "boxur",
                "┘": "boxul",
                "├": "boxvr",
                "┤": "boxvl",
                "┬": "boxhd",
                "┴": "boxhu",
                "┼": "boxvh",
                "═": "boxH",
                "║": "boxV",
                "╒": "boxdR",
                "╓": "boxDr",
                "╔": "boxDR",
                "╕": "boxdL",
                "╖": "boxDl",
                "╗": "boxDL",
                "╘": "boxuR",
                "╙": "boxUr",
                "╚": "boxUR",
                "╛": "boxuL",
                "╜": "boxUl",
                "╝": "boxUL",
                "╞": "boxvR",
                "╟": "boxVr",
                "╠": "boxVR",
                "╡": "boxvL",
                "╢": "boxVl",
                "╣": "boxVL",
                "╤": "boxHd",
                "╥": "boxhD",
                "╦": "boxHD",
                "╧": "boxHu",
                "╨": "boxhU",
                "╩": "boxHU",
                "╪": "boxvH",
                "╫": "boxVh",
                "╬": "boxVH",
                "▀": "uhblk",
                "▄": "lhblk",
                "█": "block",
                "░": "blk14",
                "▒": "blk12",
                "▓": "blk34",
                "□": "squ",
                "▪": "squf",
                "▫": "EmptyVerySmallSquare",
                "▭": "rect",
                "▮": "marker",
                "▱": "fltns",
                "△": "xutri",
                "▴": "utrif",
                "▵": "utri",
                "▸": "rtrif",
                "▹": "rtri",
                "▽": "xdtri",
                "▾": "dtrif",
                "▿": "dtri",
                "◂": "ltrif",
                "◃": "ltri",
                "◊": "loz",
                "○": "cir",
                "◬": "tridot",
                "◯": "xcirc",
                "◸": "ultri",
                "◹": "urtri",
                "◺": "lltri",
                "◻": "EmptySmallSquare",
                "◼": "FilledSmallSquare",
                "★": "starf",
                "☆": "star",
                "☎": "phone",
                "♀": "female",
                "♂": "male",
                "♠": "spades",
                "♣": "clubs",
                "♥": "hearts",
                "♦": "diams",
                "♪": "sung",
                "✓": "check",
                "✗": "cross",
                "✠": "malt",
                "✶": "sext",
                "❘": "VerticalSeparator",
                "⟈": "bsolhsub",
                "⟉": "suphsol",
                "⟵": "xlarr",
                "⟶": "xrarr",
                "⟷": "xharr",
                "⟸": "xlArr",
                "⟹": "xrArr",
                "⟺": "xhArr",
                "⟼": "xmap",
                "⟿": "dzigrarr",
                "⤂": "nvlArr",
                "⤃": "nvrArr",
                "⤄": "nvHarr",
                "⤅": "Map",
                "⤌": "lbarr",
                "⤍": "rbarr",
                "⤎": "lBarr",
                "⤏": "rBarr",
                "⤐": "RBarr",
                "⤑": "DDotrahd",
                "⤒": "UpArrowBar",
                "⤓": "DownArrowBar",
                "⤖": "Rarrtl",
                "⤙": "latail",
                "⤚": "ratail",
                "⤛": "lAtail",
                "⤜": "rAtail",
                "⤝": "larrfs",
                "⤞": "rarrfs",
                "⤟": "larrbfs",
                "⤠": "rarrbfs",
                "⤣": "nwarhk",
                "⤤": "nearhk",
                "⤥": "searhk",
                "⤦": "swarhk",
                "⤧": "nwnear",
                "⤨": "toea",
                "⤩": "tosa",
                "⤪": "swnwar",
                "⤳": "rarrc",
                "⤳̸": "nrarrc",
                "⤵": "cudarrr",
                "⤶": "ldca",
                "⤷": "rdca",
                "⤸": "cudarrl",
                "⤹": "larrpl",
                "⤼": "curarrm",
                "⤽": "cularrp",
                "⥅": "rarrpl",
                "⥈": "harrcir",
                "⥉": "Uarrocir",
                "⥊": "lurdshar",
                "⥋": "ldrushar",
                "⥎": "LeftRightVector",
                "⥏": "RightUpDownVector",
                "⥐": "DownLeftRightVector",
                "⥑": "LeftUpDownVector",
                "⥒": "LeftVectorBar",
                "⥓": "RightVectorBar",
                "⥔": "RightUpVectorBar",
                "⥕": "RightDownVectorBar",
                "⥖": "DownLeftVectorBar",
                "⥗": "DownRightVectorBar",
                "⥘": "LeftUpVectorBar",
                "⥙": "LeftDownVectorBar",
                "⥚": "LeftTeeVector",
                "⥛": "RightTeeVector",
                "⥜": "RightUpTeeVector",
                "⥝": "RightDownTeeVector",
                "⥞": "DownLeftTeeVector",
                "⥟": "DownRightTeeVector",
                "⥠": "LeftUpTeeVector",
                "⥡": "LeftDownTeeVector",
                "⥢": "lHar",
                "⥣": "uHar",
                "⥤": "rHar",
                "⥥": "dHar",
                "⥦": "luruhar",
                "⥧": "ldrdhar",
                "⥨": "ruluhar",
                "⥩": "rdldhar",
                "⥪": "lharul",
                "⥫": "llhard",
                "⥬": "rharul",
                "⥭": "lrhard",
                "⥮": "udhar",
                "⥯": "duhar",
                "⥰": "RoundImplies",
                "⥱": "erarr",
                "⥲": "simrarr",
                "⥳": "larrsim",
                "⥴": "rarrsim",
                "⥵": "rarrap",
                "⥶": "ltlarr",
                "⥸": "gtrarr",
                "⥹": "subrarr",
                "⥻": "suplarr",
                "⥼": "lfisht",
                "⥽": "rfisht",
                "⥾": "ufisht",
                "⥿": "dfisht",
                "⦚": "vzigzag",
                "⦜": "vangrt",
                "⦝": "angrtvbd",
                "⦤": "ange",
                "⦥": "range",
                "⦦": "dwangle",
                "⦧": "uwangle",
                "⦨": "angmsdaa",
                "⦩": "angmsdab",
                "⦪": "angmsdac",
                "⦫": "angmsdad",
                "⦬": "angmsdae",
                "⦭": "angmsdaf",
                "⦮": "angmsdag",
                "⦯": "angmsdah",
                "⦰": "bemptyv",
                "⦱": "demptyv",
                "⦲": "cemptyv",
                "⦳": "raemptyv",
                "⦴": "laemptyv",
                "⦵": "ohbar",
                "⦶": "omid",
                "⦷": "opar",
                "⦹": "operp",
                "⦻": "olcross",
                "⦼": "odsold",
                "⦾": "olcir",
                "⦿": "ofcir",
                "⧀": "olt",
                "⧁": "ogt",
                "⧂": "cirscir",
                "⧃": "cirE",
                "⧄": "solb",
                "⧅": "bsolb",
                "⧉": "boxbox",
                "⧍": "trisb",
                "⧎": "rtriltri",
                "⧏": "LeftTriangleBar",
                "⧏̸": "NotLeftTriangleBar",
                "⧐": "RightTriangleBar",
                "⧐̸": "NotRightTriangleBar",
                "⧜": "iinfin",
                "⧝": "infintie",
                "⧞": "nvinfin",
                "⧣": "eparsl",
                "⧤": "smeparsl",
                "⧥": "eqvparsl",
                "⧫": "lozf",
                "⧴": "RuleDelayed",
                "⧶": "dsol",
                "⨀": "xodot",
                "⨁": "xoplus",
                "⨂": "xotime",
                "⨄": "xuplus",
                "⨆": "xsqcup",
                "⨍": "fpartint",
                "⨐": "cirfnint",
                "⨑": "awint",
                "⨒": "rppolint",
                "⨓": "scpolint",
                "⨔": "npolint",
                "⨕": "pointint",
                "⨖": "quatint",
                "⨗": "intlarhk",
                "⨢": "pluscir",
                "⨣": "plusacir",
                "⨤": "simplus",
                "⨥": "plusdu",
                "⨦": "plussim",
                "⨧": "plustwo",
                "⨩": "mcomma",
                "⨪": "minusdu",
                "⨭": "loplus",
                "⨮": "roplus",
                "⨯": "Cross",
                "⨰": "timesd",
                "⨱": "timesbar",
                "⨳": "smashp",
                "⨴": "lotimes",
                "⨵": "rotimes",
                "⨶": "otimesas",
                "⨷": "Otimes",
                "⨸": "odiv",
                "⨹": "triplus",
                "⨺": "triminus",
                "⨻": "tritime",
                "⨼": "iprod",
                "⨿": "amalg",
                "⩀": "capdot",
                "⩂": "ncup",
                "⩃": "ncap",
                "⩄": "capand",
                "⩅": "cupor",
                "⩆": "cupcap",
                "⩇": "capcup",
                "⩈": "cupbrcap",
                "⩉": "capbrcup",
                "⩊": "cupcup",
                "⩋": "capcap",
                "⩌": "ccups",
                "⩍": "ccaps",
                "⩐": "ccupssm",
                "⩓": "And",
                "⩔": "Or",
                "⩕": "andand",
                "⩖": "oror",
                "⩗": "orslope",
                "⩘": "andslope",
                "⩚": "andv",
                "⩛": "orv",
                "⩜": "andd",
                "⩝": "ord",
                "⩟": "wedbar",
                "⩦": "sdote",
                "⩪": "simdot",
                "⩭": "congdot",
                "⩭̸": "ncongdot",
                "⩮": "easter",
                "⩯": "apacir",
                "⩰": "apE",
                "⩰̸": "napE",
                "⩱": "eplus",
                "⩲": "pluse",
                "⩳": "Esim",
                "⩷": "eDDot",
                "⩸": "equivDD",
                "⩹": "ltcir",
                "⩺": "gtcir",
                "⩻": "ltquest",
                "⩼": "gtquest",
                "⩽": "les",
                "⩽̸": "nles",
                "⩾": "ges",
                "⩾̸": "nges",
                "⩿": "lesdot",
                "⪀": "gesdot",
                "⪁": "lesdoto",
                "⪂": "gesdoto",
                "⪃": "lesdotor",
                "⪄": "gesdotol",
                "⪅": "lap",
                "⪆": "gap",
                "⪇": "lne",
                "⪈": "gne",
                "⪉": "lnap",
                "⪊": "gnap",
                "⪋": "lEg",
                "⪌": "gEl",
                "⪍": "lsime",
                "⪎": "gsime",
                "⪏": "lsimg",
                "⪐": "gsiml",
                "⪑": "lgE",
                "⪒": "glE",
                "⪓": "lesges",
                "⪔": "gesles",
                "⪕": "els",
                "⪖": "egs",
                "⪗": "elsdot",
                "⪘": "egsdot",
                "⪙": "el",
                "⪚": "eg",
                "⪝": "siml",
                "⪞": "simg",
                "⪟": "simlE",
                "⪠": "simgE",
                "⪡": "LessLess",
                "⪡̸": "NotNestedLessLess",
                "⪢": "GreaterGreater",
                "⪢̸": "NotNestedGreaterGreater",
                "⪤": "glj",
                "⪥": "gla",
                "⪦": "ltcc",
                "⪧": "gtcc",
                "⪨": "lescc",
                "⪩": "gescc",
                "⪪": "smt",
                "⪫": "lat",
                "⪬": "smte",
                "⪬︀": "smtes",
                "⪭": "late",
                "⪭︀": "lates",
                "⪮": "bumpE",
                "⪯": "pre",
                "⪯̸": "npre",
                "⪰": "sce",
                "⪰̸": "nsce",
                "⪳": "prE",
                "⪴": "scE",
                "⪵": "prnE",
                "⪶": "scnE",
                "⪷": "prap",
                "⪸": "scap",
                "⪹": "prnap",
                "⪺": "scnap",
                "⪻": "Pr",
                "⪼": "Sc",
                "⪽": "subdot",
                "⪾": "supdot",
                "⪿": "subplus",
                "⫀": "supplus",
                "⫁": "submult",
                "⫂": "supmult",
                "⫃": "subedot",
                "⫄": "supedot",
                "⫅": "subE",
                "⫅̸": "nsubE",
                "⫆": "supE",
                "⫆̸": "nsupE",
                "⫇": "subsim",
                "⫈": "supsim",
                "⫋︀": "vsubnE",
                "⫋": "subnE",
                "⫌︀": "vsupnE",
                "⫌": "supnE",
                "⫏": "csub",
                "⫐": "csup",
                "⫑": "csube",
                "⫒": "csupe",
                "⫓": "subsup",
                "⫔": "supsub",
                "⫕": "subsub",
                "⫖": "supsup",
                "⫗": "suphsub",
                "⫘": "supdsub",
                "⫙": "forkv",
                "⫚": "topfork",
                "⫛": "mlcp",
                "⫤": "Dashv",
                "⫦": "Vdashl",
                "⫧": "Barv",
                "⫨": "vBar",
                "⫩": "vBarv",
                "⫫": "Vbar",
                "⫬": "Not",
                "⫭": "bNot",
                "⫮": "rnmid",
                "⫯": "cirmid",
                "⫰": "midcir",
                "⫱": "topcir",
                "⫲": "nhpar",
                "⫳": "parsim",
                "⫽": "parsl",
                "⫽⃥": "nparsl",
                "♭": "flat",
                "♮": "natur",
                "♯": "sharp",
                "¤": "curren",
                "¢": "cent",
                $: "dollar",
                "£": "pound",
                "¥": "yen",
                "€": "euro",
                "¹": "sup1",
                "½": "half",
                "⅓": "frac13",
                "¼": "frac14",
                "⅕": "frac15",
                "⅙": "frac16",
                "⅛": "frac18",
                "²": "sup2",
                "⅔": "frac23",
                "⅖": "frac25",
                "³": "sup3",
                "¾": "frac34",
                "⅗": "frac35",
                "⅜": "frac38",
                "⅘": "frac45",
                "⅚": "frac56",
                "⅝": "frac58",
                "⅞": "frac78",
                𝒶: "ascr",
                𝕒: "aopf",
                𝔞: "afr",
                𝔸: "Aopf",
                𝔄: "Afr",
                𝒜: "Ascr",
                ª: "ordf",
                á: "aacute",
                Á: "Aacute",
                à: "agrave",
                À: "Agrave",
                ă: "abreve",
                Ă: "Abreve",
                â: "acirc",
                Â: "Acirc",
                å: "aring",
                Å: "angst",
                ä: "auml",
                Ä: "Auml",
                ã: "atilde",
                Ã: "Atilde",
                ą: "aogon",
                Ą: "Aogon",
                ā: "amacr",
                Ā: "Amacr",
                æ: "aelig",
                Æ: "AElig",
                𝒷: "bscr",
                𝕓: "bopf",
                𝔟: "bfr",
                𝔹: "Bopf",
                ℬ: "Bscr",
                𝔅: "Bfr",
                𝔠: "cfr",
                𝒸: "cscr",
                𝕔: "copf",
                ℭ: "Cfr",
                𝒞: "Cscr",
                ℂ: "Copf",
                ć: "cacute",
                Ć: "Cacute",
                ĉ: "ccirc",
                Ĉ: "Ccirc",
                č: "ccaron",
                Č: "Ccaron",
                ċ: "cdot",
                Ċ: "Cdot",
                ç: "ccedil",
                Ç: "Ccedil",
                "℅": "incare",
                𝔡: "dfr",
                ⅆ: "dd",
                𝕕: "dopf",
                𝒹: "dscr",
                𝒟: "Dscr",
                𝔇: "Dfr",
                ⅅ: "DD",
                𝔻: "Dopf",
                ď: "dcaron",
                Ď: "Dcaron",
                đ: "dstrok",
                Đ: "Dstrok",
                ð: "eth",
                Ð: "ETH",
                ⅇ: "ee",
                ℯ: "escr",
                𝔢: "efr",
                𝕖: "eopf",
                ℰ: "Escr",
                𝔈: "Efr",
                𝔼: "Eopf",
                é: "eacute",
                É: "Eacute",
                è: "egrave",
                È: "Egrave",
                ê: "ecirc",
                Ê: "Ecirc",
                ě: "ecaron",
                Ě: "Ecaron",
                ë: "euml",
                Ë: "Euml",
                ė: "edot",
                Ė: "Edot",
                ę: "eogon",
                Ę: "Eogon",
                ē: "emacr",
                Ē: "Emacr",
                𝔣: "ffr",
                𝕗: "fopf",
                𝒻: "fscr",
                𝔉: "Ffr",
                𝔽: "Fopf",
                ℱ: "Fscr",
                ﬀ: "fflig",
                ﬃ: "ffilig",
                ﬄ: "ffllig",
                ﬁ: "filig",
                fj: "fjlig",
                ﬂ: "fllig",
                ƒ: "fnof",
                ℊ: "gscr",
                𝕘: "gopf",
                𝔤: "gfr",
                𝒢: "Gscr",
                𝔾: "Gopf",
                𝔊: "Gfr",
                ǵ: "gacute",
                ğ: "gbreve",
                Ğ: "Gbreve",
                ĝ: "gcirc",
                Ĝ: "Gcirc",
                ġ: "gdot",
                Ġ: "Gdot",
                Ģ: "Gcedil",
                𝔥: "hfr",
                ℎ: "planckh",
                𝒽: "hscr",
                𝕙: "hopf",
                ℋ: "Hscr",
                ℌ: "Hfr",
                ℍ: "Hopf",
                ĥ: "hcirc",
                Ĥ: "Hcirc",
                ℏ: "hbar",
                ħ: "hstrok",
                Ħ: "Hstrok",
                𝕚: "iopf",
                𝔦: "ifr",
                𝒾: "iscr",
                ⅈ: "ii",
                𝕀: "Iopf",
                ℐ: "Iscr",
                ℑ: "Im",
                í: "iacute",
                Í: "Iacute",
                ì: "igrave",
                Ì: "Igrave",
                î: "icirc",
                Î: "Icirc",
                ï: "iuml",
                Ï: "Iuml",
                ĩ: "itilde",
                Ĩ: "Itilde",
                İ: "Idot",
                į: "iogon",
                Į: "Iogon",
                ī: "imacr",
                Ī: "Imacr",
                ĳ: "ijlig",
                Ĳ: "IJlig",
                ı: "imath",
                𝒿: "jscr",
                𝕛: "jopf",
                𝔧: "jfr",
                𝒥: "Jscr",
                𝔍: "Jfr",
                𝕁: "Jopf",
                ĵ: "jcirc",
                Ĵ: "Jcirc",
                ȷ: "jmath",
                𝕜: "kopf",
                𝓀: "kscr",
                𝔨: "kfr",
                𝒦: "Kscr",
                𝕂: "Kopf",
                𝔎: "Kfr",
                ķ: "kcedil",
                Ķ: "Kcedil",
                𝔩: "lfr",
                𝓁: "lscr",
                ℓ: "ell",
                𝕝: "lopf",
                ℒ: "Lscr",
                𝔏: "Lfr",
                𝕃: "Lopf",
                ĺ: "lacute",
                Ĺ: "Lacute",
                ľ: "lcaron",
                Ľ: "Lcaron",
                ļ: "lcedil",
                Ļ: "Lcedil",
                ł: "lstrok",
                Ł: "Lstrok",
                ŀ: "lmidot",
                Ŀ: "Lmidot",
                𝔪: "mfr",
                𝕞: "mopf",
                𝓂: "mscr",
                𝔐: "Mfr",
                𝕄: "Mopf",
                ℳ: "Mscr",
                𝔫: "nfr",
                𝕟: "nopf",
                𝓃: "nscr",
                ℕ: "Nopf",
                𝒩: "Nscr",
                𝔑: "Nfr",
                ń: "nacute",
                Ń: "Nacute",
                ň: "ncaron",
                Ň: "Ncaron",
                ñ: "ntilde",
                Ñ: "Ntilde",
                ņ: "ncedil",
                Ņ: "Ncedil",
                "№": "numero",
                ŋ: "eng",
                Ŋ: "ENG",
                𝕠: "oopf",
                𝔬: "ofr",
                ℴ: "oscr",
                𝒪: "Oscr",
                𝔒: "Ofr",
                𝕆: "Oopf",
                º: "ordm",
                ó: "oacute",
                Ó: "Oacute",
                ò: "ograve",
                Ò: "Ograve",
                ô: "ocirc",
                Ô: "Ocirc",
                ö: "ouml",
                Ö: "Ouml",
                ő: "odblac",
                Ő: "Odblac",
                õ: "otilde",
                Õ: "Otilde",
                ø: "oslash",
                Ø: "Oslash",
                ō: "omacr",
                Ō: "Omacr",
                œ: "oelig",
                Œ: "OElig",
                𝔭: "pfr",
                𝓅: "pscr",
                𝕡: "popf",
                ℙ: "Popf",
                𝔓: "Pfr",
                𝒫: "Pscr",
                𝕢: "qopf",
                𝔮: "qfr",
                𝓆: "qscr",
                𝒬: "Qscr",
                𝔔: "Qfr",
                ℚ: "Qopf",
                ĸ: "kgreen",
                𝔯: "rfr",
                𝕣: "ropf",
                𝓇: "rscr",
                ℛ: "Rscr",
                ℜ: "Re",
                ℝ: "Ropf",
                ŕ: "racute",
                Ŕ: "Racute",
                ř: "rcaron",
                Ř: "Rcaron",
                ŗ: "rcedil",
                Ŗ: "Rcedil",
                𝕤: "sopf",
                𝓈: "sscr",
                𝔰: "sfr",
                𝕊: "Sopf",
                𝔖: "Sfr",
                𝒮: "Sscr",
                "Ⓢ": "oS",
                ś: "sacute",
                Ś: "Sacute",
                ŝ: "scirc",
                Ŝ: "Scirc",
                š: "scaron",
                Š: "Scaron",
                ş: "scedil",
                Ş: "Scedil",
                ß: "szlig",
                𝔱: "tfr",
                𝓉: "tscr",
                𝕥: "topf",
                𝒯: "Tscr",
                𝔗: "Tfr",
                𝕋: "Topf",
                ť: "tcaron",
                Ť: "Tcaron",
                ţ: "tcedil",
                Ţ: "Tcedil",
                "™": "trade",
                ŧ: "tstrok",
                Ŧ: "Tstrok",
                𝓊: "uscr",
                𝕦: "uopf",
                𝔲: "ufr",
                𝕌: "Uopf",
                𝔘: "Ufr",
                𝒰: "Uscr",
                ú: "uacute",
                Ú: "Uacute",
                ù: "ugrave",
                Ù: "Ugrave",
                ŭ: "ubreve",
                Ŭ: "Ubreve",
                û: "ucirc",
                Û: "Ucirc",
                ů: "uring",
                Ů: "Uring",
                ü: "uuml",
                Ü: "Uuml",
                ű: "udblac",
                Ű: "Udblac",
                ũ: "utilde",
                Ũ: "Utilde",
                ų: "uogon",
                Ų: "Uogon",
                ū: "umacr",
                Ū: "Umacr",
                𝔳: "vfr",
                𝕧: "vopf",
                𝓋: "vscr",
                𝔙: "Vfr",
                𝕍: "Vopf",
                𝒱: "Vscr",
                𝕨: "wopf",
                𝓌: "wscr",
                𝔴: "wfr",
                𝒲: "Wscr",
                𝕎: "Wopf",
                𝔚: "Wfr",
                ŵ: "wcirc",
                Ŵ: "Wcirc",
                𝔵: "xfr",
                𝓍: "xscr",
                𝕩: "xopf",
                𝕏: "Xopf",
                𝔛: "Xfr",
                𝒳: "Xscr",
                𝔶: "yfr",
                𝓎: "yscr",
                𝕪: "yopf",
                𝒴: "Yscr",
                𝔜: "Yfr",
                𝕐: "Yopf",
                ý: "yacute",
                Ý: "Yacute",
                ŷ: "ycirc",
                Ŷ: "Ycirc",
                ÿ: "yuml",
                Ÿ: "Yuml",
                𝓏: "zscr",
                𝔷: "zfr",
                𝕫: "zopf",
                ℨ: "Zfr",
                ℤ: "Zopf",
                𝒵: "Zscr",
                ź: "zacute",
                Ź: "Zacute",
                ž: "zcaron",
                Ž: "Zcaron",
                ż: "zdot",
                Ż: "Zdot",
                Ƶ: "imped",
                þ: "thorn",
                Þ: "THORN",
                ŉ: "napos",
                α: "alpha",
                Α: "Alpha",
                β: "beta",
                Β: "Beta",
                γ: "gamma",
                Γ: "Gamma",
                δ: "delta",
                Δ: "Delta",
                ε: "epsi",
                ϵ: "epsiv",
                Ε: "Epsilon",
                ϝ: "gammad",
                Ϝ: "Gammad",
                ζ: "zeta",
                Ζ: "Zeta",
                η: "eta",
                Η: "Eta",
                θ: "theta",
                ϑ: "thetav",
                Θ: "Theta",
                ι: "iota",
                Ι: "Iota",
                κ: "kappa",
                ϰ: "kappav",
                Κ: "Kappa",
                λ: "lambda",
                Λ: "Lambda",
                μ: "mu",
                µ: "micro",
                Μ: "Mu",
                ν: "nu",
                Ν: "Nu",
                ξ: "xi",
                Ξ: "Xi",
                ο: "omicron",
                Ο: "Omicron",
                π: "pi",
                ϖ: "piv",
                Π: "Pi",
                ρ: "rho",
                ϱ: "rhov",
                Ρ: "Rho",
                σ: "sigma",
                Σ: "Sigma",
                ς: "sigmaf",
                τ: "tau",
                Τ: "Tau",
                υ: "upsi",
                Υ: "Upsilon",
                ϒ: "Upsi",
                φ: "phi",
                ϕ: "phiv",
                Φ: "Phi",
                χ: "chi",
                Χ: "Chi",
                ψ: "psi",
                Ψ: "Psi",
                ω: "omega",
                Ω: "ohm",
                а: "acy",
                А: "Acy",
                б: "bcy",
                Б: "Bcy",
                в: "vcy",
                В: "Vcy",
                г: "gcy",
                Г: "Gcy",
                ѓ: "gjcy",
                Ѓ: "GJcy",
                д: "dcy",
                Д: "Dcy",
                ђ: "djcy",
                Ђ: "DJcy",
                е: "iecy",
                Е: "IEcy",
                ё: "iocy",
                Ё: "IOcy",
                є: "jukcy",
                Є: "Jukcy",
                ж: "zhcy",
                Ж: "ZHcy",
                з: "zcy",
                З: "Zcy",
                ѕ: "dscy",
                Ѕ: "DScy",
                и: "icy",
                И: "Icy",
                і: "iukcy",
                І: "Iukcy",
                ї: "yicy",
                Ї: "YIcy",
                й: "jcy",
                Й: "Jcy",
                ј: "jsercy",
                Ј: "Jsercy",
                к: "kcy",
                К: "Kcy",
                ќ: "kjcy",
                Ќ: "KJcy",
                л: "lcy",
                Л: "Lcy",
                љ: "ljcy",
                Љ: "LJcy",
                м: "mcy",
                М: "Mcy",
                н: "ncy",
                Н: "Ncy",
                њ: "njcy",
                Њ: "NJcy",
                о: "ocy",
                О: "Ocy",
                п: "pcy",
                П: "Pcy",
                р: "rcy",
                Р: "Rcy",
                с: "scy",
                С: "Scy",
                т: "tcy",
                Т: "Tcy",
                ћ: "tshcy",
                Ћ: "TSHcy",
                у: "ucy",
                У: "Ucy",
                ў: "ubrcy",
                Ў: "Ubrcy",
                ф: "fcy",
                Ф: "Fcy",
                х: "khcy",
                Х: "KHcy",
                ц: "tscy",
                Ц: "TScy",
                ч: "chcy",
                Ч: "CHcy",
                џ: "dzcy",
                Џ: "DZcy",
                ш: "shcy",
                Ш: "SHcy",
                щ: "shchcy",
                Щ: "SHCHcy",
                ъ: "hardcy",
                Ъ: "HARDcy",
                ы: "ycy",
                Ы: "Ycy",
                ь: "softcy",
                Ь: "SOFTcy",
                э: "ecy",
                Э: "Ecy",
                ю: "yucy",
                Ю: "YUcy",
                я: "yacy",
                Я: "YAcy",
                ℵ: "aleph",
                ℶ: "beth",
                ℷ: "gimel",
                ℸ: "daleth",
              },
              p = /["&'<>`]/g,
              d = {
                '"': "&quot;",
                "&": "&amp;",
                "'": "&#x27;",
                "<": "&lt;",
                ">": "&gt;",
                "`": "&#x60;",
              },
              f = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/,
              h =
                /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
              m =
                /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g,
              g = {
                aacute: "á",
                Aacute: "Á",
                abreve: "ă",
                Abreve: "Ă",
                ac: "∾",
                acd: "∿",
                acE: "∾̳",
                acirc: "â",
                Acirc: "Â",
                acute: "´",
                acy: "а",
                Acy: "А",
                aelig: "æ",
                AElig: "Æ",
                af: "⁡",
                afr: "𝔞",
                Afr: "𝔄",
                agrave: "à",
                Agrave: "À",
                alefsym: "ℵ",
                aleph: "ℵ",
                alpha: "α",
                Alpha: "Α",
                amacr: "ā",
                Amacr: "Ā",
                amalg: "⨿",
                amp: "&",
                AMP: "&",
                and: "∧",
                And: "⩓",
                andand: "⩕",
                andd: "⩜",
                andslope: "⩘",
                andv: "⩚",
                ang: "∠",
                ange: "⦤",
                angle: "∠",
                angmsd: "∡",
                angmsdaa: "⦨",
                angmsdab: "⦩",
                angmsdac: "⦪",
                angmsdad: "⦫",
                angmsdae: "⦬",
                angmsdaf: "⦭",
                angmsdag: "⦮",
                angmsdah: "⦯",
                angrt: "∟",
                angrtvb: "⊾",
                angrtvbd: "⦝",
                angsph: "∢",
                angst: "Å",
                angzarr: "⍼",
                aogon: "ą",
                Aogon: "Ą",
                aopf: "𝕒",
                Aopf: "𝔸",
                ap: "≈",
                apacir: "⩯",
                ape: "≊",
                apE: "⩰",
                apid: "≋",
                apos: "'",
                ApplyFunction: "⁡",
                approx: "≈",
                approxeq: "≊",
                aring: "å",
                Aring: "Å",
                ascr: "𝒶",
                Ascr: "𝒜",
                Assign: "≔",
                ast: "*",
                asymp: "≈",
                asympeq: "≍",
                atilde: "ã",
                Atilde: "Ã",
                auml: "ä",
                Auml: "Ä",
                awconint: "∳",
                awint: "⨑",
                backcong: "≌",
                backepsilon: "϶",
                backprime: "‵",
                backsim: "∽",
                backsimeq: "⋍",
                Backslash: "∖",
                Barv: "⫧",
                barvee: "⊽",
                barwed: "⌅",
                Barwed: "⌆",
                barwedge: "⌅",
                bbrk: "⎵",
                bbrktbrk: "⎶",
                bcong: "≌",
                bcy: "б",
                Bcy: "Б",
                bdquo: "„",
                becaus: "∵",
                because: "∵",
                Because: "∵",
                bemptyv: "⦰",
                bepsi: "϶",
                bernou: "ℬ",
                Bernoullis: "ℬ",
                beta: "β",
                Beta: "Β",
                beth: "ℶ",
                between: "≬",
                bfr: "𝔟",
                Bfr: "𝔅",
                bigcap: "⋂",
                bigcirc: "◯",
                bigcup: "⋃",
                bigodot: "⨀",
                bigoplus: "⨁",
                bigotimes: "⨂",
                bigsqcup: "⨆",
                bigstar: "★",
                bigtriangledown: "▽",
                bigtriangleup: "△",
                biguplus: "⨄",
                bigvee: "⋁",
                bigwedge: "⋀",
                bkarow: "⤍",
                blacklozenge: "⧫",
                blacksquare: "▪",
                blacktriangle: "▴",
                blacktriangledown: "▾",
                blacktriangleleft: "◂",
                blacktriangleright: "▸",
                blank: "␣",
                blk12: "▒",
                blk14: "░",
                blk34: "▓",
                block: "█",
                bne: "=⃥",
                bnequiv: "≡⃥",
                bnot: "⌐",
                bNot: "⫭",
                bopf: "𝕓",
                Bopf: "𝔹",
                bot: "⊥",
                bottom: "⊥",
                bowtie: "⋈",
                boxbox: "⧉",
                boxdl: "┐",
                boxdL: "╕",
                boxDl: "╖",
                boxDL: "╗",
                boxdr: "┌",
                boxdR: "╒",
                boxDr: "╓",
                boxDR: "╔",
                boxh: "─",
                boxH: "═",
                boxhd: "┬",
                boxhD: "╥",
                boxHd: "╤",
                boxHD: "╦",
                boxhu: "┴",
                boxhU: "╨",
                boxHu: "╧",
                boxHU: "╩",
                boxminus: "⊟",
                boxplus: "⊞",
                boxtimes: "⊠",
                boxul: "┘",
                boxuL: "╛",
                boxUl: "╜",
                boxUL: "╝",
                boxur: "└",
                boxuR: "╘",
                boxUr: "╙",
                boxUR: "╚",
                boxv: "│",
                boxV: "║",
                boxvh: "┼",
                boxvH: "╪",
                boxVh: "╫",
                boxVH: "╬",
                boxvl: "┤",
                boxvL: "╡",
                boxVl: "╢",
                boxVL: "╣",
                boxvr: "├",
                boxvR: "╞",
                boxVr: "╟",
                boxVR: "╠",
                bprime: "‵",
                breve: "˘",
                Breve: "˘",
                brvbar: "¦",
                bscr: "𝒷",
                Bscr: "ℬ",
                bsemi: "⁏",
                bsim: "∽",
                bsime: "⋍",
                bsol: "\\",
                bsolb: "⧅",
                bsolhsub: "⟈",
                bull: "•",
                bullet: "•",
                bump: "≎",
                bumpe: "≏",
                bumpE: "⪮",
                bumpeq: "≏",
                Bumpeq: "≎",
                cacute: "ć",
                Cacute: "Ć",
                cap: "∩",
                Cap: "⋒",
                capand: "⩄",
                capbrcup: "⩉",
                capcap: "⩋",
                capcup: "⩇",
                capdot: "⩀",
                CapitalDifferentialD: "ⅅ",
                caps: "∩︀",
                caret: "⁁",
                caron: "ˇ",
                Cayleys: "ℭ",
                ccaps: "⩍",
                ccaron: "č",
                Ccaron: "Č",
                ccedil: "ç",
                Ccedil: "Ç",
                ccirc: "ĉ",
                Ccirc: "Ĉ",
                Cconint: "∰",
                ccups: "⩌",
                ccupssm: "⩐",
                cdot: "ċ",
                Cdot: "Ċ",
                cedil: "¸",
                Cedilla: "¸",
                cemptyv: "⦲",
                cent: "¢",
                centerdot: "·",
                CenterDot: "·",
                cfr: "𝔠",
                Cfr: "ℭ",
                chcy: "ч",
                CHcy: "Ч",
                check: "✓",
                checkmark: "✓",
                chi: "χ",
                Chi: "Χ",
                cir: "○",
                circ: "ˆ",
                circeq: "≗",
                circlearrowleft: "↺",
                circlearrowright: "↻",
                circledast: "⊛",
                circledcirc: "⊚",
                circleddash: "⊝",
                CircleDot: "⊙",
                circledR: "®",
                circledS: "Ⓢ",
                CircleMinus: "⊖",
                CirclePlus: "⊕",
                CircleTimes: "⊗",
                cire: "≗",
                cirE: "⧃",
                cirfnint: "⨐",
                cirmid: "⫯",
                cirscir: "⧂",
                ClockwiseContourIntegral: "∲",
                CloseCurlyDoubleQuote: "”",
                CloseCurlyQuote: "’",
                clubs: "♣",
                clubsuit: "♣",
                colon: ":",
                Colon: "∷",
                colone: "≔",
                Colone: "⩴",
                coloneq: "≔",
                comma: ",",
                commat: "@",
                comp: "∁",
                compfn: "∘",
                complement: "∁",
                complexes: "ℂ",
                cong: "≅",
                congdot: "⩭",
                Congruent: "≡",
                conint: "∮",
                Conint: "∯",
                ContourIntegral: "∮",
                copf: "𝕔",
                Copf: "ℂ",
                coprod: "∐",
                Coproduct: "∐",
                copy: "©",
                COPY: "©",
                copysr: "℗",
                CounterClockwiseContourIntegral: "∳",
                crarr: "↵",
                cross: "✗",
                Cross: "⨯",
                cscr: "𝒸",
                Cscr: "𝒞",
                csub: "⫏",
                csube: "⫑",
                csup: "⫐",
                csupe: "⫒",
                ctdot: "⋯",
                cudarrl: "⤸",
                cudarrr: "⤵",
                cuepr: "⋞",
                cuesc: "⋟",
                cularr: "↶",
                cularrp: "⤽",
                cup: "∪",
                Cup: "⋓",
                cupbrcap: "⩈",
                cupcap: "⩆",
                CupCap: "≍",
                cupcup: "⩊",
                cupdot: "⊍",
                cupor: "⩅",
                cups: "∪︀",
                curarr: "↷",
                curarrm: "⤼",
                curlyeqprec: "⋞",
                curlyeqsucc: "⋟",
                curlyvee: "⋎",
                curlywedge: "⋏",
                curren: "¤",
                curvearrowleft: "↶",
                curvearrowright: "↷",
                cuvee: "⋎",
                cuwed: "⋏",
                cwconint: "∲",
                cwint: "∱",
                cylcty: "⌭",
                dagger: "†",
                Dagger: "‡",
                daleth: "ℸ",
                darr: "↓",
                dArr: "⇓",
                Darr: "↡",
                dash: "‐",
                dashv: "⊣",
                Dashv: "⫤",
                dbkarow: "⤏",
                dblac: "˝",
                dcaron: "ď",
                Dcaron: "Ď",
                dcy: "д",
                Dcy: "Д",
                dd: "ⅆ",
                DD: "ⅅ",
                ddagger: "‡",
                ddarr: "⇊",
                DDotrahd: "⤑",
                ddotseq: "⩷",
                deg: "°",
                Del: "∇",
                delta: "δ",
                Delta: "Δ",
                demptyv: "⦱",
                dfisht: "⥿",
                dfr: "𝔡",
                Dfr: "𝔇",
                dHar: "⥥",
                dharl: "⇃",
                dharr: "⇂",
                DiacriticalAcute: "´",
                DiacriticalDot: "˙",
                DiacriticalDoubleAcute: "˝",
                DiacriticalGrave: "`",
                DiacriticalTilde: "˜",
                diam: "⋄",
                diamond: "⋄",
                Diamond: "⋄",
                diamondsuit: "♦",
                diams: "♦",
                die: "¨",
                DifferentialD: "ⅆ",
                digamma: "ϝ",
                disin: "⋲",
                div: "÷",
                divide: "÷",
                divideontimes: "⋇",
                divonx: "⋇",
                djcy: "ђ",
                DJcy: "Ђ",
                dlcorn: "⌞",
                dlcrop: "⌍",
                dollar: "$",
                dopf: "𝕕",
                Dopf: "𝔻",
                dot: "˙",
                Dot: "¨",
                DotDot: "⃜",
                doteq: "≐",
                doteqdot: "≑",
                DotEqual: "≐",
                dotminus: "∸",
                dotplus: "∔",
                dotsquare: "⊡",
                doublebarwedge: "⌆",
                DoubleContourIntegral: "∯",
                DoubleDot: "¨",
                DoubleDownArrow: "⇓",
                DoubleLeftArrow: "⇐",
                DoubleLeftRightArrow: "⇔",
                DoubleLeftTee: "⫤",
                DoubleLongLeftArrow: "⟸",
                DoubleLongLeftRightArrow: "⟺",
                DoubleLongRightArrow: "⟹",
                DoubleRightArrow: "⇒",
                DoubleRightTee: "⊨",
                DoubleUpArrow: "⇑",
                DoubleUpDownArrow: "⇕",
                DoubleVerticalBar: "∥",
                downarrow: "↓",
                Downarrow: "⇓",
                DownArrow: "↓",
                DownArrowBar: "⤓",
                DownArrowUpArrow: "⇵",
                DownBreve: "̑",
                downdownarrows: "⇊",
                downharpoonleft: "⇃",
                downharpoonright: "⇂",
                DownLeftRightVector: "⥐",
                DownLeftTeeVector: "⥞",
                DownLeftVector: "↽",
                DownLeftVectorBar: "⥖",
                DownRightTeeVector: "⥟",
                DownRightVector: "⇁",
                DownRightVectorBar: "⥗",
                DownTee: "⊤",
                DownTeeArrow: "↧",
                drbkarow: "⤐",
                drcorn: "⌟",
                drcrop: "⌌",
                dscr: "𝒹",
                Dscr: "𝒟",
                dscy: "ѕ",
                DScy: "Ѕ",
                dsol: "⧶",
                dstrok: "đ",
                Dstrok: "Đ",
                dtdot: "⋱",
                dtri: "▿",
                dtrif: "▾",
                duarr: "⇵",
                duhar: "⥯",
                dwangle: "⦦",
                dzcy: "џ",
                DZcy: "Џ",
                dzigrarr: "⟿",
                eacute: "é",
                Eacute: "É",
                easter: "⩮",
                ecaron: "ě",
                Ecaron: "Ě",
                ecir: "≖",
                ecirc: "ê",
                Ecirc: "Ê",
                ecolon: "≕",
                ecy: "э",
                Ecy: "Э",
                eDDot: "⩷",
                edot: "ė",
                eDot: "≑",
                Edot: "Ė",
                ee: "ⅇ",
                efDot: "≒",
                efr: "𝔢",
                Efr: "𝔈",
                eg: "⪚",
                egrave: "è",
                Egrave: "È",
                egs: "⪖",
                egsdot: "⪘",
                el: "⪙",
                Element: "∈",
                elinters: "⏧",
                ell: "ℓ",
                els: "⪕",
                elsdot: "⪗",
                emacr: "ē",
                Emacr: "Ē",
                empty: "∅",
                emptyset: "∅",
                EmptySmallSquare: "◻",
                emptyv: "∅",
                EmptyVerySmallSquare: "▫",
                emsp: " ",
                emsp13: " ",
                emsp14: " ",
                eng: "ŋ",
                ENG: "Ŋ",
                ensp: " ",
                eogon: "ę",
                Eogon: "Ę",
                eopf: "𝕖",
                Eopf: "𝔼",
                epar: "⋕",
                eparsl: "⧣",
                eplus: "⩱",
                epsi: "ε",
                epsilon: "ε",
                Epsilon: "Ε",
                epsiv: "ϵ",
                eqcirc: "≖",
                eqcolon: "≕",
                eqsim: "≂",
                eqslantgtr: "⪖",
                eqslantless: "⪕",
                Equal: "⩵",
                equals: "=",
                EqualTilde: "≂",
                equest: "≟",
                Equilibrium: "⇌",
                equiv: "≡",
                equivDD: "⩸",
                eqvparsl: "⧥",
                erarr: "⥱",
                erDot: "≓",
                escr: "ℯ",
                Escr: "ℰ",
                esdot: "≐",
                esim: "≂",
                Esim: "⩳",
                eta: "η",
                Eta: "Η",
                eth: "ð",
                ETH: "Ð",
                euml: "ë",
                Euml: "Ë",
                euro: "€",
                excl: "!",
                exist: "∃",
                Exists: "∃",
                expectation: "ℰ",
                exponentiale: "ⅇ",
                ExponentialE: "ⅇ",
                fallingdotseq: "≒",
                fcy: "ф",
                Fcy: "Ф",
                female: "♀",
                ffilig: "ﬃ",
                fflig: "ﬀ",
                ffllig: "ﬄ",
                ffr: "𝔣",
                Ffr: "𝔉",
                filig: "ﬁ",
                FilledSmallSquare: "◼",
                FilledVerySmallSquare: "▪",
                fjlig: "fj",
                flat: "♭",
                fllig: "ﬂ",
                fltns: "▱",
                fnof: "ƒ",
                fopf: "𝕗",
                Fopf: "𝔽",
                forall: "∀",
                ForAll: "∀",
                fork: "⋔",
                forkv: "⫙",
                Fouriertrf: "ℱ",
                fpartint: "⨍",
                frac12: "½",
                frac13: "⅓",
                frac14: "¼",
                frac15: "⅕",
                frac16: "⅙",
                frac18: "⅛",
                frac23: "⅔",
                frac25: "⅖",
                frac34: "¾",
                frac35: "⅗",
                frac38: "⅜",
                frac45: "⅘",
                frac56: "⅚",
                frac58: "⅝",
                frac78: "⅞",
                frasl: "⁄",
                frown: "⌢",
                fscr: "𝒻",
                Fscr: "ℱ",
                gacute: "ǵ",
                gamma: "γ",
                Gamma: "Γ",
                gammad: "ϝ",
                Gammad: "Ϝ",
                gap: "⪆",
                gbreve: "ğ",
                Gbreve: "Ğ",
                Gcedil: "Ģ",
                gcirc: "ĝ",
                Gcirc: "Ĝ",
                gcy: "г",
                Gcy: "Г",
                gdot: "ġ",
                Gdot: "Ġ",
                ge: "≥",
                gE: "≧",
                gel: "⋛",
                gEl: "⪌",
                geq: "≥",
                geqq: "≧",
                geqslant: "⩾",
                ges: "⩾",
                gescc: "⪩",
                gesdot: "⪀",
                gesdoto: "⪂",
                gesdotol: "⪄",
                gesl: "⋛︀",
                gesles: "⪔",
                gfr: "𝔤",
                Gfr: "𝔊",
                gg: "≫",
                Gg: "⋙",
                ggg: "⋙",
                gimel: "ℷ",
                gjcy: "ѓ",
                GJcy: "Ѓ",
                gl: "≷",
                gla: "⪥",
                glE: "⪒",
                glj: "⪤",
                gnap: "⪊",
                gnapprox: "⪊",
                gne: "⪈",
                gnE: "≩",
                gneq: "⪈",
                gneqq: "≩",
                gnsim: "⋧",
                gopf: "𝕘",
                Gopf: "𝔾",
                grave: "`",
                GreaterEqual: "≥",
                GreaterEqualLess: "⋛",
                GreaterFullEqual: "≧",
                GreaterGreater: "⪢",
                GreaterLess: "≷",
                GreaterSlantEqual: "⩾",
                GreaterTilde: "≳",
                gscr: "ℊ",
                Gscr: "𝒢",
                gsim: "≳",
                gsime: "⪎",
                gsiml: "⪐",
                gt: ">",
                Gt: "≫",
                GT: ">",
                gtcc: "⪧",
                gtcir: "⩺",
                gtdot: "⋗",
                gtlPar: "⦕",
                gtquest: "⩼",
                gtrapprox: "⪆",
                gtrarr: "⥸",
                gtrdot: "⋗",
                gtreqless: "⋛",
                gtreqqless: "⪌",
                gtrless: "≷",
                gtrsim: "≳",
                gvertneqq: "≩︀",
                gvnE: "≩︀",
                Hacek: "ˇ",
                hairsp: " ",
                half: "½",
                hamilt: "ℋ",
                hardcy: "ъ",
                HARDcy: "Ъ",
                harr: "↔",
                hArr: "⇔",
                harrcir: "⥈",
                harrw: "↭",
                Hat: "^",
                hbar: "ℏ",
                hcirc: "ĥ",
                Hcirc: "Ĥ",
                hearts: "♥",
                heartsuit: "♥",
                hellip: "…",
                hercon: "⊹",
                hfr: "𝔥",
                Hfr: "ℌ",
                HilbertSpace: "ℋ",
                hksearow: "⤥",
                hkswarow: "⤦",
                hoarr: "⇿",
                homtht: "∻",
                hookleftarrow: "↩",
                hookrightarrow: "↪",
                hopf: "𝕙",
                Hopf: "ℍ",
                horbar: "―",
                HorizontalLine: "─",
                hscr: "𝒽",
                Hscr: "ℋ",
                hslash: "ℏ",
                hstrok: "ħ",
                Hstrok: "Ħ",
                HumpDownHump: "≎",
                HumpEqual: "≏",
                hybull: "⁃",
                hyphen: "‐",
                iacute: "í",
                Iacute: "Í",
                ic: "⁣",
                icirc: "î",
                Icirc: "Î",
                icy: "и",
                Icy: "И",
                Idot: "İ",
                iecy: "е",
                IEcy: "Е",
                iexcl: "¡",
                iff: "⇔",
                ifr: "𝔦",
                Ifr: "ℑ",
                igrave: "ì",
                Igrave: "Ì",
                ii: "ⅈ",
                iiiint: "⨌",
                iiint: "∭",
                iinfin: "⧜",
                iiota: "℩",
                ijlig: "ĳ",
                IJlig: "Ĳ",
                Im: "ℑ",
                imacr: "ī",
                Imacr: "Ī",
                image: "ℑ",
                ImaginaryI: "ⅈ",
                imagline: "ℐ",
                imagpart: "ℑ",
                imath: "ı",
                imof: "⊷",
                imped: "Ƶ",
                Implies: "⇒",
                in: "∈",
                incare: "℅",
                infin: "∞",
                infintie: "⧝",
                inodot: "ı",
                int: "∫",
                Int: "∬",
                intcal: "⊺",
                integers: "ℤ",
                Integral: "∫",
                intercal: "⊺",
                Intersection: "⋂",
                intlarhk: "⨗",
                intprod: "⨼",
                InvisibleComma: "⁣",
                InvisibleTimes: "⁢",
                iocy: "ё",
                IOcy: "Ё",
                iogon: "į",
                Iogon: "Į",
                iopf: "𝕚",
                Iopf: "𝕀",
                iota: "ι",
                Iota: "Ι",
                iprod: "⨼",
                iquest: "¿",
                iscr: "𝒾",
                Iscr: "ℐ",
                isin: "∈",
                isindot: "⋵",
                isinE: "⋹",
                isins: "⋴",
                isinsv: "⋳",
                isinv: "∈",
                it: "⁢",
                itilde: "ĩ",
                Itilde: "Ĩ",
                iukcy: "і",
                Iukcy: "І",
                iuml: "ï",
                Iuml: "Ï",
                jcirc: "ĵ",
                Jcirc: "Ĵ",
                jcy: "й",
                Jcy: "Й",
                jfr: "𝔧",
                Jfr: "𝔍",
                jmath: "ȷ",
                jopf: "𝕛",
                Jopf: "𝕁",
                jscr: "𝒿",
                Jscr: "𝒥",
                jsercy: "ј",
                Jsercy: "Ј",
                jukcy: "є",
                Jukcy: "Є",
                kappa: "κ",
                Kappa: "Κ",
                kappav: "ϰ",
                kcedil: "ķ",
                Kcedil: "Ķ",
                kcy: "к",
                Kcy: "К",
                kfr: "𝔨",
                Kfr: "𝔎",
                kgreen: "ĸ",
                khcy: "х",
                KHcy: "Х",
                kjcy: "ќ",
                KJcy: "Ќ",
                kopf: "𝕜",
                Kopf: "𝕂",
                kscr: "𝓀",
                Kscr: "𝒦",
                lAarr: "⇚",
                lacute: "ĺ",
                Lacute: "Ĺ",
                laemptyv: "⦴",
                lagran: "ℒ",
                lambda: "λ",
                Lambda: "Λ",
                lang: "⟨",
                Lang: "⟪",
                langd: "⦑",
                langle: "⟨",
                lap: "⪅",
                Laplacetrf: "ℒ",
                laquo: "«",
                larr: "←",
                lArr: "⇐",
                Larr: "↞",
                larrb: "⇤",
                larrbfs: "⤟",
                larrfs: "⤝",
                larrhk: "↩",
                larrlp: "↫",
                larrpl: "⤹",
                larrsim: "⥳",
                larrtl: "↢",
                lat: "⪫",
                latail: "⤙",
                lAtail: "⤛",
                late: "⪭",
                lates: "⪭︀",
                lbarr: "⤌",
                lBarr: "⤎",
                lbbrk: "❲",
                lbrace: "{",
                lbrack: "[",
                lbrke: "⦋",
                lbrksld: "⦏",
                lbrkslu: "⦍",
                lcaron: "ľ",
                Lcaron: "Ľ",
                lcedil: "ļ",
                Lcedil: "Ļ",
                lceil: "⌈",
                lcub: "{",
                lcy: "л",
                Lcy: "Л",
                ldca: "⤶",
                ldquo: "“",
                ldquor: "„",
                ldrdhar: "⥧",
                ldrushar: "⥋",
                ldsh: "↲",
                le: "≤",
                lE: "≦",
                LeftAngleBracket: "⟨",
                leftarrow: "←",
                Leftarrow: "⇐",
                LeftArrow: "←",
                LeftArrowBar: "⇤",
                LeftArrowRightArrow: "⇆",
                leftarrowtail: "↢",
                LeftCeiling: "⌈",
                LeftDoubleBracket: "⟦",
                LeftDownTeeVector: "⥡",
                LeftDownVector: "⇃",
                LeftDownVectorBar: "⥙",
                LeftFloor: "⌊",
                leftharpoondown: "↽",
                leftharpoonup: "↼",
                leftleftarrows: "⇇",
                leftrightarrow: "↔",
                Leftrightarrow: "⇔",
                LeftRightArrow: "↔",
                leftrightarrows: "⇆",
                leftrightharpoons: "⇋",
                leftrightsquigarrow: "↭",
                LeftRightVector: "⥎",
                LeftTee: "⊣",
                LeftTeeArrow: "↤",
                LeftTeeVector: "⥚",
                leftthreetimes: "⋋",
                LeftTriangle: "⊲",
                LeftTriangleBar: "⧏",
                LeftTriangleEqual: "⊴",
                LeftUpDownVector: "⥑",
                LeftUpTeeVector: "⥠",
                LeftUpVector: "↿",
                LeftUpVectorBar: "⥘",
                LeftVector: "↼",
                LeftVectorBar: "⥒",
                leg: "⋚",
                lEg: "⪋",
                leq: "≤",
                leqq: "≦",
                leqslant: "⩽",
                les: "⩽",
                lescc: "⪨",
                lesdot: "⩿",
                lesdoto: "⪁",
                lesdotor: "⪃",
                lesg: "⋚︀",
                lesges: "⪓",
                lessapprox: "⪅",
                lessdot: "⋖",
                lesseqgtr: "⋚",
                lesseqqgtr: "⪋",
                LessEqualGreater: "⋚",
                LessFullEqual: "≦",
                LessGreater: "≶",
                lessgtr: "≶",
                LessLess: "⪡",
                lesssim: "≲",
                LessSlantEqual: "⩽",
                LessTilde: "≲",
                lfisht: "⥼",
                lfloor: "⌊",
                lfr: "𝔩",
                Lfr: "𝔏",
                lg: "≶",
                lgE: "⪑",
                lHar: "⥢",
                lhard: "↽",
                lharu: "↼",
                lharul: "⥪",
                lhblk: "▄",
                ljcy: "љ",
                LJcy: "Љ",
                ll: "≪",
                Ll: "⋘",
                llarr: "⇇",
                llcorner: "⌞",
                Lleftarrow: "⇚",
                llhard: "⥫",
                lltri: "◺",
                lmidot: "ŀ",
                Lmidot: "Ŀ",
                lmoust: "⎰",
                lmoustache: "⎰",
                lnap: "⪉",
                lnapprox: "⪉",
                lne: "⪇",
                lnE: "≨",
                lneq: "⪇",
                lneqq: "≨",
                lnsim: "⋦",
                loang: "⟬",
                loarr: "⇽",
                lobrk: "⟦",
                longleftarrow: "⟵",
                Longleftarrow: "⟸",
                LongLeftArrow: "⟵",
                longleftrightarrow: "⟷",
                Longleftrightarrow: "⟺",
                LongLeftRightArrow: "⟷",
                longmapsto: "⟼",
                longrightarrow: "⟶",
                Longrightarrow: "⟹",
                LongRightArrow: "⟶",
                looparrowleft: "↫",
                looparrowright: "↬",
                lopar: "⦅",
                lopf: "𝕝",
                Lopf: "𝕃",
                loplus: "⨭",
                lotimes: "⨴",
                lowast: "∗",
                lowbar: "_",
                LowerLeftArrow: "↙",
                LowerRightArrow: "↘",
                loz: "◊",
                lozenge: "◊",
                lozf: "⧫",
                lpar: "(",
                lparlt: "⦓",
                lrarr: "⇆",
                lrcorner: "⌟",
                lrhar: "⇋",
                lrhard: "⥭",
                lrm: "‎",
                lrtri: "⊿",
                lsaquo: "‹",
                lscr: "𝓁",
                Lscr: "ℒ",
                lsh: "↰",
                Lsh: "↰",
                lsim: "≲",
                lsime: "⪍",
                lsimg: "⪏",
                lsqb: "[",
                lsquo: "‘",
                lsquor: "‚",
                lstrok: "ł",
                Lstrok: "Ł",
                lt: "<",
                Lt: "≪",
                LT: "<",
                ltcc: "⪦",
                ltcir: "⩹",
                ltdot: "⋖",
                lthree: "⋋",
                ltimes: "⋉",
                ltlarr: "⥶",
                ltquest: "⩻",
                ltri: "◃",
                ltrie: "⊴",
                ltrif: "◂",
                ltrPar: "⦖",
                lurdshar: "⥊",
                luruhar: "⥦",
                lvertneqq: "≨︀",
                lvnE: "≨︀",
                macr: "¯",
                male: "♂",
                malt: "✠",
                maltese: "✠",
                map: "↦",
                Map: "⤅",
                mapsto: "↦",
                mapstodown: "↧",
                mapstoleft: "↤",
                mapstoup: "↥",
                marker: "▮",
                mcomma: "⨩",
                mcy: "м",
                Mcy: "М",
                mdash: "—",
                mDDot: "∺",
                measuredangle: "∡",
                MediumSpace: " ",
                Mellintrf: "ℳ",
                mfr: "𝔪",
                Mfr: "𝔐",
                mho: "℧",
                micro: "µ",
                mid: "∣",
                midast: "*",
                midcir: "⫰",
                middot: "·",
                minus: "−",
                minusb: "⊟",
                minusd: "∸",
                minusdu: "⨪",
                MinusPlus: "∓",
                mlcp: "⫛",
                mldr: "…",
                mnplus: "∓",
                models: "⊧",
                mopf: "𝕞",
                Mopf: "𝕄",
                mp: "∓",
                mscr: "𝓂",
                Mscr: "ℳ",
                mstpos: "∾",
                mu: "μ",
                Mu: "Μ",
                multimap: "⊸",
                mumap: "⊸",
                nabla: "∇",
                nacute: "ń",
                Nacute: "Ń",
                nang: "∠⃒",
                nap: "≉",
                napE: "⩰̸",
                napid: "≋̸",
                napos: "ŉ",
                napprox: "≉",
                natur: "♮",
                natural: "♮",
                naturals: "ℕ",
                nbsp: " ",
                nbump: "≎̸",
                nbumpe: "≏̸",
                ncap: "⩃",
                ncaron: "ň",
                Ncaron: "Ň",
                ncedil: "ņ",
                Ncedil: "Ņ",
                ncong: "≇",
                ncongdot: "⩭̸",
                ncup: "⩂",
                ncy: "н",
                Ncy: "Н",
                ndash: "–",
                ne: "≠",
                nearhk: "⤤",
                nearr: "↗",
                neArr: "⇗",
                nearrow: "↗",
                nedot: "≐̸",
                NegativeMediumSpace: "​",
                NegativeThickSpace: "​",
                NegativeThinSpace: "​",
                NegativeVeryThinSpace: "​",
                nequiv: "≢",
                nesear: "⤨",
                nesim: "≂̸",
                NestedGreaterGreater: "≫",
                NestedLessLess: "≪",
                NewLine: "\n",
                nexist: "∄",
                nexists: "∄",
                nfr: "𝔫",
                Nfr: "𝔑",
                nge: "≱",
                ngE: "≧̸",
                ngeq: "≱",
                ngeqq: "≧̸",
                ngeqslant: "⩾̸",
                nges: "⩾̸",
                nGg: "⋙̸",
                ngsim: "≵",
                ngt: "≯",
                nGt: "≫⃒",
                ngtr: "≯",
                nGtv: "≫̸",
                nharr: "↮",
                nhArr: "⇎",
                nhpar: "⫲",
                ni: "∋",
                nis: "⋼",
                nisd: "⋺",
                niv: "∋",
                njcy: "њ",
                NJcy: "Њ",
                nlarr: "↚",
                nlArr: "⇍",
                nldr: "‥",
                nle: "≰",
                nlE: "≦̸",
                nleftarrow: "↚",
                nLeftarrow: "⇍",
                nleftrightarrow: "↮",
                nLeftrightarrow: "⇎",
                nleq: "≰",
                nleqq: "≦̸",
                nleqslant: "⩽̸",
                nles: "⩽̸",
                nless: "≮",
                nLl: "⋘̸",
                nlsim: "≴",
                nlt: "≮",
                nLt: "≪⃒",
                nltri: "⋪",
                nltrie: "⋬",
                nLtv: "≪̸",
                nmid: "∤",
                NoBreak: "⁠",
                NonBreakingSpace: " ",
                nopf: "𝕟",
                Nopf: "ℕ",
                not: "¬",
                Not: "⫬",
                NotCongruent: "≢",
                NotCupCap: "≭",
                NotDoubleVerticalBar: "∦",
                NotElement: "∉",
                NotEqual: "≠",
                NotEqualTilde: "≂̸",
                NotExists: "∄",
                NotGreater: "≯",
                NotGreaterEqual: "≱",
                NotGreaterFullEqual: "≧̸",
                NotGreaterGreater: "≫̸",
                NotGreaterLess: "≹",
                NotGreaterSlantEqual: "⩾̸",
                NotGreaterTilde: "≵",
                NotHumpDownHump: "≎̸",
                NotHumpEqual: "≏̸",
                notin: "∉",
                notindot: "⋵̸",
                notinE: "⋹̸",
                notinva: "∉",
                notinvb: "⋷",
                notinvc: "⋶",
                NotLeftTriangle: "⋪",
                NotLeftTriangleBar: "⧏̸",
                NotLeftTriangleEqual: "⋬",
                NotLess: "≮",
                NotLessEqual: "≰",
                NotLessGreater: "≸",
                NotLessLess: "≪̸",
                NotLessSlantEqual: "⩽̸",
                NotLessTilde: "≴",
                NotNestedGreaterGreater: "⪢̸",
                NotNestedLessLess: "⪡̸",
                notni: "∌",
                notniva: "∌",
                notnivb: "⋾",
                notnivc: "⋽",
                NotPrecedes: "⊀",
                NotPrecedesEqual: "⪯̸",
                NotPrecedesSlantEqual: "⋠",
                NotReverseElement: "∌",
                NotRightTriangle: "⋫",
                NotRightTriangleBar: "⧐̸",
                NotRightTriangleEqual: "⋭",
                NotSquareSubset: "⊏̸",
                NotSquareSubsetEqual: "⋢",
                NotSquareSuperset: "⊐̸",
                NotSquareSupersetEqual: "⋣",
                NotSubset: "⊂⃒",
                NotSubsetEqual: "⊈",
                NotSucceeds: "⊁",
                NotSucceedsEqual: "⪰̸",
                NotSucceedsSlantEqual: "⋡",
                NotSucceedsTilde: "≿̸",
                NotSuperset: "⊃⃒",
                NotSupersetEqual: "⊉",
                NotTilde: "≁",
                NotTildeEqual: "≄",
                NotTildeFullEqual: "≇",
                NotTildeTilde: "≉",
                NotVerticalBar: "∤",
                npar: "∦",
                nparallel: "∦",
                nparsl: "⫽⃥",
                npart: "∂̸",
                npolint: "⨔",
                npr: "⊀",
                nprcue: "⋠",
                npre: "⪯̸",
                nprec: "⊀",
                npreceq: "⪯̸",
                nrarr: "↛",
                nrArr: "⇏",
                nrarrc: "⤳̸",
                nrarrw: "↝̸",
                nrightarrow: "↛",
                nRightarrow: "⇏",
                nrtri: "⋫",
                nrtrie: "⋭",
                nsc: "⊁",
                nsccue: "⋡",
                nsce: "⪰̸",
                nscr: "𝓃",
                Nscr: "𝒩",
                nshortmid: "∤",
                nshortparallel: "∦",
                nsim: "≁",
                nsime: "≄",
                nsimeq: "≄",
                nsmid: "∤",
                nspar: "∦",
                nsqsube: "⋢",
                nsqsupe: "⋣",
                nsub: "⊄",
                nsube: "⊈",
                nsubE: "⫅̸",
                nsubset: "⊂⃒",
                nsubseteq: "⊈",
                nsubseteqq: "⫅̸",
                nsucc: "⊁",
                nsucceq: "⪰̸",
                nsup: "⊅",
                nsupe: "⊉",
                nsupE: "⫆̸",
                nsupset: "⊃⃒",
                nsupseteq: "⊉",
                nsupseteqq: "⫆̸",
                ntgl: "≹",
                ntilde: "ñ",
                Ntilde: "Ñ",
                ntlg: "≸",
                ntriangleleft: "⋪",
                ntrianglelefteq: "⋬",
                ntriangleright: "⋫",
                ntrianglerighteq: "⋭",
                nu: "ν",
                Nu: "Ν",
                num: "#",
                numero: "№",
                numsp: " ",
                nvap: "≍⃒",
                nvdash: "⊬",
                nvDash: "⊭",
                nVdash: "⊮",
                nVDash: "⊯",
                nvge: "≥⃒",
                nvgt: ">⃒",
                nvHarr: "⤄",
                nvinfin: "⧞",
                nvlArr: "⤂",
                nvle: "≤⃒",
                nvlt: "<⃒",
                nvltrie: "⊴⃒",
                nvrArr: "⤃",
                nvrtrie: "⊵⃒",
                nvsim: "∼⃒",
                nwarhk: "⤣",
                nwarr: "↖",
                nwArr: "⇖",
                nwarrow: "↖",
                nwnear: "⤧",
                oacute: "ó",
                Oacute: "Ó",
                oast: "⊛",
                ocir: "⊚",
                ocirc: "ô",
                Ocirc: "Ô",
                ocy: "о",
                Ocy: "О",
                odash: "⊝",
                odblac: "ő",
                Odblac: "Ő",
                odiv: "⨸",
                odot: "⊙",
                odsold: "⦼",
                oelig: "œ",
                OElig: "Œ",
                ofcir: "⦿",
                ofr: "𝔬",
                Ofr: "𝔒",
                ogon: "˛",
                ograve: "ò",
                Ograve: "Ò",
                ogt: "⧁",
                ohbar: "⦵",
                ohm: "Ω",
                oint: "∮",
                olarr: "↺",
                olcir: "⦾",
                olcross: "⦻",
                oline: "‾",
                olt: "⧀",
                omacr: "ō",
                Omacr: "Ō",
                omega: "ω",
                Omega: "Ω",
                omicron: "ο",
                Omicron: "Ο",
                omid: "⦶",
                ominus: "⊖",
                oopf: "𝕠",
                Oopf: "𝕆",
                opar: "⦷",
                OpenCurlyDoubleQuote: "“",
                OpenCurlyQuote: "‘",
                operp: "⦹",
                oplus: "⊕",
                or: "∨",
                Or: "⩔",
                orarr: "↻",
                ord: "⩝",
                order: "ℴ",
                orderof: "ℴ",
                ordf: "ª",
                ordm: "º",
                origof: "⊶",
                oror: "⩖",
                orslope: "⩗",
                orv: "⩛",
                oS: "Ⓢ",
                oscr: "ℴ",
                Oscr: "𝒪",
                oslash: "ø",
                Oslash: "Ø",
                osol: "⊘",
                otilde: "õ",
                Otilde: "Õ",
                otimes: "⊗",
                Otimes: "⨷",
                otimesas: "⨶",
                ouml: "ö",
                Ouml: "Ö",
                ovbar: "⌽",
                OverBar: "‾",
                OverBrace: "⏞",
                OverBracket: "⎴",
                OverParenthesis: "⏜",
                par: "∥",
                para: "¶",
                parallel: "∥",
                parsim: "⫳",
                parsl: "⫽",
                part: "∂",
                PartialD: "∂",
                pcy: "п",
                Pcy: "П",
                percnt: "%",
                period: ".",
                permil: "‰",
                perp: "⊥",
                pertenk: "‱",
                pfr: "𝔭",
                Pfr: "𝔓",
                phi: "φ",
                Phi: "Φ",
                phiv: "ϕ",
                phmmat: "ℳ",
                phone: "☎",
                pi: "π",
                Pi: "Π",
                pitchfork: "⋔",
                piv: "ϖ",
                planck: "ℏ",
                planckh: "ℎ",
                plankv: "ℏ",
                plus: "+",
                plusacir: "⨣",
                plusb: "⊞",
                pluscir: "⨢",
                plusdo: "∔",
                plusdu: "⨥",
                pluse: "⩲",
                PlusMinus: "±",
                plusmn: "±",
                plussim: "⨦",
                plustwo: "⨧",
                pm: "±",
                Poincareplane: "ℌ",
                pointint: "⨕",
                popf: "𝕡",
                Popf: "ℙ",
                pound: "£",
                pr: "≺",
                Pr: "⪻",
                prap: "⪷",
                prcue: "≼",
                pre: "⪯",
                prE: "⪳",
                prec: "≺",
                precapprox: "⪷",
                preccurlyeq: "≼",
                Precedes: "≺",
                PrecedesEqual: "⪯",
                PrecedesSlantEqual: "≼",
                PrecedesTilde: "≾",
                preceq: "⪯",
                precnapprox: "⪹",
                precneqq: "⪵",
                precnsim: "⋨",
                precsim: "≾",
                prime: "′",
                Prime: "″",
                primes: "ℙ",
                prnap: "⪹",
                prnE: "⪵",
                prnsim: "⋨",
                prod: "∏",
                Product: "∏",
                profalar: "⌮",
                profline: "⌒",
                profsurf: "⌓",
                prop: "∝",
                Proportion: "∷",
                Proportional: "∝",
                propto: "∝",
                prsim: "≾",
                prurel: "⊰",
                pscr: "𝓅",
                Pscr: "𝒫",
                psi: "ψ",
                Psi: "Ψ",
                puncsp: " ",
                qfr: "𝔮",
                Qfr: "𝔔",
                qint: "⨌",
                qopf: "𝕢",
                Qopf: "ℚ",
                qprime: "⁗",
                qscr: "𝓆",
                Qscr: "𝒬",
                quaternions: "ℍ",
                quatint: "⨖",
                quest: "?",
                questeq: "≟",
                quot: '"',
                QUOT: '"',
                rAarr: "⇛",
                race: "∽̱",
                racute: "ŕ",
                Racute: "Ŕ",
                radic: "√",
                raemptyv: "⦳",
                rang: "⟩",
                Rang: "⟫",
                rangd: "⦒",
                range: "⦥",
                rangle: "⟩",
                raquo: "»",
                rarr: "→",
                rArr: "⇒",
                Rarr: "↠",
                rarrap: "⥵",
                rarrb: "⇥",
                rarrbfs: "⤠",
                rarrc: "⤳",
                rarrfs: "⤞",
                rarrhk: "↪",
                rarrlp: "↬",
                rarrpl: "⥅",
                rarrsim: "⥴",
                rarrtl: "↣",
                Rarrtl: "⤖",
                rarrw: "↝",
                ratail: "⤚",
                rAtail: "⤜",
                ratio: "∶",
                rationals: "ℚ",
                rbarr: "⤍",
                rBarr: "⤏",
                RBarr: "⤐",
                rbbrk: "❳",
                rbrace: "}",
                rbrack: "]",
                rbrke: "⦌",
                rbrksld: "⦎",
                rbrkslu: "⦐",
                rcaron: "ř",
                Rcaron: "Ř",
                rcedil: "ŗ",
                Rcedil: "Ŗ",
                rceil: "⌉",
                rcub: "}",
                rcy: "р",
                Rcy: "Р",
                rdca: "⤷",
                rdldhar: "⥩",
                rdquo: "”",
                rdquor: "”",
                rdsh: "↳",
                Re: "ℜ",
                real: "ℜ",
                realine: "ℛ",
                realpart: "ℜ",
                reals: "ℝ",
                rect: "▭",
                reg: "®",
                REG: "®",
                ReverseElement: "∋",
                ReverseEquilibrium: "⇋",
                ReverseUpEquilibrium: "⥯",
                rfisht: "⥽",
                rfloor: "⌋",
                rfr: "𝔯",
                Rfr: "ℜ",
                rHar: "⥤",
                rhard: "⇁",
                rharu: "⇀",
                rharul: "⥬",
                rho: "ρ",
                Rho: "Ρ",
                rhov: "ϱ",
                RightAngleBracket: "⟩",
                rightarrow: "→",
                Rightarrow: "⇒",
                RightArrow: "→",
                RightArrowBar: "⇥",
                RightArrowLeftArrow: "⇄",
                rightarrowtail: "↣",
                RightCeiling: "⌉",
                RightDoubleBracket: "⟧",
                RightDownTeeVector: "⥝",
                RightDownVector: "⇂",
                RightDownVectorBar: "⥕",
                RightFloor: "⌋",
                rightharpoondown: "⇁",
                rightharpoonup: "⇀",
                rightleftarrows: "⇄",
                rightleftharpoons: "⇌",
                rightrightarrows: "⇉",
                rightsquigarrow: "↝",
                RightTee: "⊢",
                RightTeeArrow: "↦",
                RightTeeVector: "⥛",
                rightthreetimes: "⋌",
                RightTriangle: "⊳",
                RightTriangleBar: "⧐",
                RightTriangleEqual: "⊵",
                RightUpDownVector: "⥏",
                RightUpTeeVector: "⥜",
                RightUpVector: "↾",
                RightUpVectorBar: "⥔",
                RightVector: "⇀",
                RightVectorBar: "⥓",
                ring: "˚",
                risingdotseq: "≓",
                rlarr: "⇄",
                rlhar: "⇌",
                rlm: "‏",
                rmoust: "⎱",
                rmoustache: "⎱",
                rnmid: "⫮",
                roang: "⟭",
                roarr: "⇾",
                robrk: "⟧",
                ropar: "⦆",
                ropf: "𝕣",
                Ropf: "ℝ",
                roplus: "⨮",
                rotimes: "⨵",
                RoundImplies: "⥰",
                rpar: ")",
                rpargt: "⦔",
                rppolint: "⨒",
                rrarr: "⇉",
                Rrightarrow: "⇛",
                rsaquo: "›",
                rscr: "𝓇",
                Rscr: "ℛ",
                rsh: "↱",
                Rsh: "↱",
                rsqb: "]",
                rsquo: "’",
                rsquor: "’",
                rthree: "⋌",
                rtimes: "⋊",
                rtri: "▹",
                rtrie: "⊵",
                rtrif: "▸",
                rtriltri: "⧎",
                RuleDelayed: "⧴",
                ruluhar: "⥨",
                rx: "℞",
                sacute: "ś",
                Sacute: "Ś",
                sbquo: "‚",
                sc: "≻",
                Sc: "⪼",
                scap: "⪸",
                scaron: "š",
                Scaron: "Š",
                sccue: "≽",
                sce: "⪰",
                scE: "⪴",
                scedil: "ş",
                Scedil: "Ş",
                scirc: "ŝ",
                Scirc: "Ŝ",
                scnap: "⪺",
                scnE: "⪶",
                scnsim: "⋩",
                scpolint: "⨓",
                scsim: "≿",
                scy: "с",
                Scy: "С",
                sdot: "⋅",
                sdotb: "⊡",
                sdote: "⩦",
                searhk: "⤥",
                searr: "↘",
                seArr: "⇘",
                searrow: "↘",
                sect: "§",
                semi: ";",
                seswar: "⤩",
                setminus: "∖",
                setmn: "∖",
                sext: "✶",
                sfr: "𝔰",
                Sfr: "𝔖",
                sfrown: "⌢",
                sharp: "♯",
                shchcy: "щ",
                SHCHcy: "Щ",
                shcy: "ш",
                SHcy: "Ш",
                ShortDownArrow: "↓",
                ShortLeftArrow: "←",
                shortmid: "∣",
                shortparallel: "∥",
                ShortRightArrow: "→",
                ShortUpArrow: "↑",
                shy: "­",
                sigma: "σ",
                Sigma: "Σ",
                sigmaf: "ς",
                sigmav: "ς",
                sim: "∼",
                simdot: "⩪",
                sime: "≃",
                simeq: "≃",
                simg: "⪞",
                simgE: "⪠",
                siml: "⪝",
                simlE: "⪟",
                simne: "≆",
                simplus: "⨤",
                simrarr: "⥲",
                slarr: "←",
                SmallCircle: "∘",
                smallsetminus: "∖",
                smashp: "⨳",
                smeparsl: "⧤",
                smid: "∣",
                smile: "⌣",
                smt: "⪪",
                smte: "⪬",
                smtes: "⪬︀",
                softcy: "ь",
                SOFTcy: "Ь",
                sol: "/",
                solb: "⧄",
                solbar: "⌿",
                sopf: "𝕤",
                Sopf: "𝕊",
                spades: "♠",
                spadesuit: "♠",
                spar: "∥",
                sqcap: "⊓",
                sqcaps: "⊓︀",
                sqcup: "⊔",
                sqcups: "⊔︀",
                Sqrt: "√",
                sqsub: "⊏",
                sqsube: "⊑",
                sqsubset: "⊏",
                sqsubseteq: "⊑",
                sqsup: "⊐",
                sqsupe: "⊒",
                sqsupset: "⊐",
                sqsupseteq: "⊒",
                squ: "□",
                square: "□",
                Square: "□",
                SquareIntersection: "⊓",
                SquareSubset: "⊏",
                SquareSubsetEqual: "⊑",
                SquareSuperset: "⊐",
                SquareSupersetEqual: "⊒",
                SquareUnion: "⊔",
                squarf: "▪",
                squf: "▪",
                srarr: "→",
                sscr: "𝓈",
                Sscr: "𝒮",
                ssetmn: "∖",
                ssmile: "⌣",
                sstarf: "⋆",
                star: "☆",
                Star: "⋆",
                starf: "★",
                straightepsilon: "ϵ",
                straightphi: "ϕ",
                strns: "¯",
                sub: "⊂",
                Sub: "⋐",
                subdot: "⪽",
                sube: "⊆",
                subE: "⫅",
                subedot: "⫃",
                submult: "⫁",
                subne: "⊊",
                subnE: "⫋",
                subplus: "⪿",
                subrarr: "⥹",
                subset: "⊂",
                Subset: "⋐",
                subseteq: "⊆",
                subseteqq: "⫅",
                SubsetEqual: "⊆",
                subsetneq: "⊊",
                subsetneqq: "⫋",
                subsim: "⫇",
                subsub: "⫕",
                subsup: "⫓",
                succ: "≻",
                succapprox: "⪸",
                succcurlyeq: "≽",
                Succeeds: "≻",
                SucceedsEqual: "⪰",
                SucceedsSlantEqual: "≽",
                SucceedsTilde: "≿",
                succeq: "⪰",
                succnapprox: "⪺",
                succneqq: "⪶",
                succnsim: "⋩",
                succsim: "≿",
                SuchThat: "∋",
                sum: "∑",
                Sum: "∑",
                sung: "♪",
                sup: "⊃",
                Sup: "⋑",
                sup1: "¹",
                sup2: "²",
                sup3: "³",
                supdot: "⪾",
                supdsub: "⫘",
                supe: "⊇",
                supE: "⫆",
                supedot: "⫄",
                Superset: "⊃",
                SupersetEqual: "⊇",
                suphsol: "⟉",
                suphsub: "⫗",
                suplarr: "⥻",
                supmult: "⫂",
                supne: "⊋",
                supnE: "⫌",
                supplus: "⫀",
                supset: "⊃",
                Supset: "⋑",
                supseteq: "⊇",
                supseteqq: "⫆",
                supsetneq: "⊋",
                supsetneqq: "⫌",
                supsim: "⫈",
                supsub: "⫔",
                supsup: "⫖",
                swarhk: "⤦",
                swarr: "↙",
                swArr: "⇙",
                swarrow: "↙",
                swnwar: "⤪",
                szlig: "ß",
                Tab: "\t",
                target: "⌖",
                tau: "τ",
                Tau: "Τ",
                tbrk: "⎴",
                tcaron: "ť",
                Tcaron: "Ť",
                tcedil: "ţ",
                Tcedil: "Ţ",
                tcy: "т",
                Tcy: "Т",
                tdot: "⃛",
                telrec: "⌕",
                tfr: "𝔱",
                Tfr: "𝔗",
                there4: "∴",
                therefore: "∴",
                Therefore: "∴",
                theta: "θ",
                Theta: "Θ",
                thetasym: "ϑ",
                thetav: "ϑ",
                thickapprox: "≈",
                thicksim: "∼",
                ThickSpace: "  ",
                thinsp: " ",
                ThinSpace: " ",
                thkap: "≈",
                thksim: "∼",
                thorn: "þ",
                THORN: "Þ",
                tilde: "˜",
                Tilde: "∼",
                TildeEqual: "≃",
                TildeFullEqual: "≅",
                TildeTilde: "≈",
                times: "×",
                timesb: "⊠",
                timesbar: "⨱",
                timesd: "⨰",
                tint: "∭",
                toea: "⤨",
                top: "⊤",
                topbot: "⌶",
                topcir: "⫱",
                topf: "𝕥",
                Topf: "𝕋",
                topfork: "⫚",
                tosa: "⤩",
                tprime: "‴",
                trade: "™",
                TRADE: "™",
                triangle: "▵",
                triangledown: "▿",
                triangleleft: "◃",
                trianglelefteq: "⊴",
                triangleq: "≜",
                triangleright: "▹",
                trianglerighteq: "⊵",
                tridot: "◬",
                trie: "≜",
                triminus: "⨺",
                TripleDot: "⃛",
                triplus: "⨹",
                trisb: "⧍",
                tritime: "⨻",
                trpezium: "⏢",
                tscr: "𝓉",
                Tscr: "𝒯",
                tscy: "ц",
                TScy: "Ц",
                tshcy: "ћ",
                TSHcy: "Ћ",
                tstrok: "ŧ",
                Tstrok: "Ŧ",
                twixt: "≬",
                twoheadleftarrow: "↞",
                twoheadrightarrow: "↠",
                uacute: "ú",
                Uacute: "Ú",
                uarr: "↑",
                uArr: "⇑",
                Uarr: "↟",
                Uarrocir: "⥉",
                ubrcy: "ў",
                Ubrcy: "Ў",
                ubreve: "ŭ",
                Ubreve: "Ŭ",
                ucirc: "û",
                Ucirc: "Û",
                ucy: "у",
                Ucy: "У",
                udarr: "⇅",
                udblac: "ű",
                Udblac: "Ű",
                udhar: "⥮",
                ufisht: "⥾",
                ufr: "𝔲",
                Ufr: "𝔘",
                ugrave: "ù",
                Ugrave: "Ù",
                uHar: "⥣",
                uharl: "↿",
                uharr: "↾",
                uhblk: "▀",
                ulcorn: "⌜",
                ulcorner: "⌜",
                ulcrop: "⌏",
                ultri: "◸",
                umacr: "ū",
                Umacr: "Ū",
                uml: "¨",
                UnderBar: "_",
                UnderBrace: "⏟",
                UnderBracket: "⎵",
                UnderParenthesis: "⏝",
                Union: "⋃",
                UnionPlus: "⊎",
                uogon: "ų",
                Uogon: "Ų",
                uopf: "𝕦",
                Uopf: "𝕌",
                uparrow: "↑",
                Uparrow: "⇑",
                UpArrow: "↑",
                UpArrowBar: "⤒",
                UpArrowDownArrow: "⇅",
                updownarrow: "↕",
                Updownarrow: "⇕",
                UpDownArrow: "↕",
                UpEquilibrium: "⥮",
                upharpoonleft: "↿",
                upharpoonright: "↾",
                uplus: "⊎",
                UpperLeftArrow: "↖",
                UpperRightArrow: "↗",
                upsi: "υ",
                Upsi: "ϒ",
                upsih: "ϒ",
                upsilon: "υ",
                Upsilon: "Υ",
                UpTee: "⊥",
                UpTeeArrow: "↥",
                upuparrows: "⇈",
                urcorn: "⌝",
                urcorner: "⌝",
                urcrop: "⌎",
                uring: "ů",
                Uring: "Ů",
                urtri: "◹",
                uscr: "𝓊",
                Uscr: "𝒰",
                utdot: "⋰",
                utilde: "ũ",
                Utilde: "Ũ",
                utri: "▵",
                utrif: "▴",
                uuarr: "⇈",
                uuml: "ü",
                Uuml: "Ü",
                uwangle: "⦧",
                vangrt: "⦜",
                varepsilon: "ϵ",
                varkappa: "ϰ",
                varnothing: "∅",
                varphi: "ϕ",
                varpi: "ϖ",
                varpropto: "∝",
                varr: "↕",
                vArr: "⇕",
                varrho: "ϱ",
                varsigma: "ς",
                varsubsetneq: "⊊︀",
                varsubsetneqq: "⫋︀",
                varsupsetneq: "⊋︀",
                varsupsetneqq: "⫌︀",
                vartheta: "ϑ",
                vartriangleleft: "⊲",
                vartriangleright: "⊳",
                vBar: "⫨",
                Vbar: "⫫",
                vBarv: "⫩",
                vcy: "в",
                Vcy: "В",
                vdash: "⊢",
                vDash: "⊨",
                Vdash: "⊩",
                VDash: "⊫",
                Vdashl: "⫦",
                vee: "∨",
                Vee: "⋁",
                veebar: "⊻",
                veeeq: "≚",
                vellip: "⋮",
                verbar: "|",
                Verbar: "‖",
                vert: "|",
                Vert: "‖",
                VerticalBar: "∣",
                VerticalLine: "|",
                VerticalSeparator: "❘",
                VerticalTilde: "≀",
                VeryThinSpace: " ",
                vfr: "𝔳",
                Vfr: "𝔙",
                vltri: "⊲",
                vnsub: "⊂⃒",
                vnsup: "⊃⃒",
                vopf: "𝕧",
                Vopf: "𝕍",
                vprop: "∝",
                vrtri: "⊳",
                vscr: "𝓋",
                Vscr: "𝒱",
                vsubne: "⊊︀",
                vsubnE: "⫋︀",
                vsupne: "⊋︀",
                vsupnE: "⫌︀",
                Vvdash: "⊪",
                vzigzag: "⦚",
                wcirc: "ŵ",
                Wcirc: "Ŵ",
                wedbar: "⩟",
                wedge: "∧",
                Wedge: "⋀",
                wedgeq: "≙",
                weierp: "℘",
                wfr: "𝔴",
                Wfr: "𝔚",
                wopf: "𝕨",
                Wopf: "𝕎",
                wp: "℘",
                wr: "≀",
                wreath: "≀",
                wscr: "𝓌",
                Wscr: "𝒲",
                xcap: "⋂",
                xcirc: "◯",
                xcup: "⋃",
                xdtri: "▽",
                xfr: "𝔵",
                Xfr: "𝔛",
                xharr: "⟷",
                xhArr: "⟺",
                xi: "ξ",
                Xi: "Ξ",
                xlarr: "⟵",
                xlArr: "⟸",
                xmap: "⟼",
                xnis: "⋻",
                xodot: "⨀",
                xopf: "𝕩",
                Xopf: "𝕏",
                xoplus: "⨁",
                xotime: "⨂",
                xrarr: "⟶",
                xrArr: "⟹",
                xscr: "𝓍",
                Xscr: "𝒳",
                xsqcup: "⨆",
                xuplus: "⨄",
                xutri: "△",
                xvee: "⋁",
                xwedge: "⋀",
                yacute: "ý",
                Yacute: "Ý",
                yacy: "я",
                YAcy: "Я",
                ycirc: "ŷ",
                Ycirc: "Ŷ",
                ycy: "ы",
                Ycy: "Ы",
                yen: "¥",
                yfr: "𝔶",
                Yfr: "𝔜",
                yicy: "ї",
                YIcy: "Ї",
                yopf: "𝕪",
                Yopf: "𝕐",
                yscr: "𝓎",
                Yscr: "𝒴",
                yucy: "ю",
                YUcy: "Ю",
                yuml: "ÿ",
                Yuml: "Ÿ",
                zacute: "ź",
                Zacute: "Ź",
                zcaron: "ž",
                Zcaron: "Ž",
                zcy: "з",
                Zcy: "З",
                zdot: "ż",
                Zdot: "Ż",
                zeetrf: "ℨ",
                ZeroWidthSpace: "​",
                zeta: "ζ",
                Zeta: "Ζ",
                zfr: "𝔷",
                Zfr: "ℨ",
                zhcy: "ж",
                ZHcy: "Ж",
                zigrarr: "⇝",
                zopf: "𝕫",
                Zopf: "ℤ",
                zscr: "𝓏",
                Zscr: "𝒵",
                zwj: "‍",
                zwnj: "‌",
              },
              v = {
                aacute: "á",
                Aacute: "Á",
                acirc: "â",
                Acirc: "Â",
                acute: "´",
                aelig: "æ",
                AElig: "Æ",
                agrave: "à",
                Agrave: "À",
                amp: "&",
                AMP: "&",
                aring: "å",
                Aring: "Å",
                atilde: "ã",
                Atilde: "Ã",
                auml: "ä",
                Auml: "Ä",
                brvbar: "¦",
                ccedil: "ç",
                Ccedil: "Ç",
                cedil: "¸",
                cent: "¢",
                copy: "©",
                COPY: "©",
                curren: "¤",
                deg: "°",
                divide: "÷",
                eacute: "é",
                Eacute: "É",
                ecirc: "ê",
                Ecirc: "Ê",
                egrave: "è",
                Egrave: "È",
                eth: "ð",
                ETH: "Ð",
                euml: "ë",
                Euml: "Ë",
                frac12: "½",
                frac14: "¼",
                frac34: "¾",
                gt: ">",
                GT: ">",
                iacute: "í",
                Iacute: "Í",
                icirc: "î",
                Icirc: "Î",
                iexcl: "¡",
                igrave: "ì",
                Igrave: "Ì",
                iquest: "¿",
                iuml: "ï",
                Iuml: "Ï",
                laquo: "«",
                lt: "<",
                LT: "<",
                macr: "¯",
                micro: "µ",
                middot: "·",
                nbsp: " ",
                not: "¬",
                ntilde: "ñ",
                Ntilde: "Ñ",
                oacute: "ó",
                Oacute: "Ó",
                ocirc: "ô",
                Ocirc: "Ô",
                ograve: "ò",
                Ograve: "Ò",
                ordf: "ª",
                ordm: "º",
                oslash: "ø",
                Oslash: "Ø",
                otilde: "õ",
                Otilde: "Õ",
                ouml: "ö",
                Ouml: "Ö",
                para: "¶",
                plusmn: "±",
                pound: "£",
                quot: '"',
                QUOT: '"',
                raquo: "»",
                reg: "®",
                REG: "®",
                sect: "§",
                shy: "­",
                sup1: "¹",
                sup2: "²",
                sup3: "³",
                szlig: "ß",
                thorn: "þ",
                THORN: "Þ",
                times: "×",
                uacute: "ú",
                Uacute: "Ú",
                ucirc: "û",
                Ucirc: "Û",
                ugrave: "ù",
                Ugrave: "Ù",
                uml: "¨",
                uuml: "ü",
                Uuml: "Ü",
                yacute: "ý",
                Yacute: "Ý",
                yen: "¥",
                yuml: "ÿ",
              },
              b = {
                0: "�",
                128: "€",
                130: "‚",
                131: "ƒ",
                132: "„",
                133: "…",
                134: "†",
                135: "‡",
                136: "ˆ",
                137: "‰",
                138: "Š",
                139: "‹",
                140: "Œ",
                142: "Ž",
                145: "‘",
                146: "’",
                147: "“",
                148: "”",
                149: "•",
                150: "–",
                151: "—",
                152: "˜",
                153: "™",
                154: "š",
                155: "›",
                156: "œ",
                158: "ž",
                159: "Ÿ",
              },
              y = [
                1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131,
                132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144,
                145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157,
                158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982,
                64983, 64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991,
                64992, 64993, 64994, 64995, 64996, 64997, 64998, 64999, 65e3,
                65001, 65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535,
                131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679,
                393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823,
                655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967,
                917502, 917503, 983038, 983039, 1048574, 1048575, 1114110,
                1114111,
              ],
              w = String.fromCharCode,
              E = {}.hasOwnProperty,
              x = function (e, t) {
                return E.call(e, t);
              },
              T = function (e, t) {
                if (!e) return t;
                var r,
                  n = {};
                for (r in t) n[r] = x(e, r) ? e[r] : t[r];
                return n;
              },
              k = function (e, t) {
                var r = "";
                return (e >= 55296 && e <= 57343) || e > 1114111
                  ? (t &&
                      N(
                        "character reference outside the permissible Unicode range"
                      ),
                    "�")
                  : x(b, e)
                  ? (t && N("disallowed character reference"), b[e])
                  : (t &&
                      (function (e, t) {
                        for (var r = -1, n = e.length; ++r < n; )
                          if (e[r] == t) return !0;
                        return !1;
                      })(y, e) &&
                      N("disallowed character reference"),
                    e > 65535 &&
                      ((r += w((((e -= 65536) >>> 10) & 1023) | 55296)),
                      (e = 56320 | (1023 & e))),
                    (r += w(e)));
              },
              _ = function (e) {
                return "&#x" + e.toString(16).toUpperCase() + ";";
              },
              A = function (e) {
                return "&#" + e + ";";
              },
              N = function (e) {
                throw Error("Parse error: " + e);
              },
              L = function (e, t) {
                (t = T(t, L.options)).strict &&
                  h.test(e) &&
                  N("forbidden code point");
                var r = t.encodeEverything,
                  n = t.useNamedReferences,
                  i = t.allowUnsafeSymbols,
                  o = t.decimal ? A : _,
                  d = function (e) {
                    return o(e.charCodeAt(0));
                  };
                return (
                  r
                    ? ((e = e.replace(s, function (e) {
                        return n && x(u, e) ? "&" + u[e] + ";" : d(e);
                      })),
                      n &&
                        (e = e
                          .replace(/&gt;\u20D2/g, "&nvgt;")
                          .replace(/&lt;\u20D2/g, "&nvlt;")
                          .replace(/&#x66;&#x6A;/g, "&fjlig;")),
                      n &&
                        (e = e.replace(c, function (e) {
                          return "&" + u[e] + ";";
                        })))
                    : n
                    ? (i ||
                        (e = e.replace(p, function (e) {
                          return "&" + u[e] + ";";
                        })),
                      (e = (e = e
                        .replace(/&gt;\u20D2/g, "&nvgt;")
                        .replace(/&lt;\u20D2/g, "&nvlt;")).replace(
                        c,
                        function (e) {
                          return "&" + u[e] + ";";
                        }
                      )))
                    : i || (e = e.replace(p, d)),
                  e
                    .replace(a, function (e) {
                      var t = e.charCodeAt(0),
                        r = e.charCodeAt(1);
                      return o(1024 * (t - 55296) + r - 56320 + 65536);
                    })
                    .replace(l, d)
                );
              };
            L.options = {
              allowUnsafeSymbols: !1,
              encodeEverything: !1,
              strict: !1,
              useNamedReferences: !1,
              decimal: !1,
            };
            var O = function (e, t) {
              var r = (t = T(t, O.options)).strict;
              return (
                r && f.test(e) && N("malformed character reference"),
                e.replace(m, function (e, n, i, o, a, s, l, c, u) {
                  var p, d, f, h, m, b;
                  return n
                    ? g[(m = n)]
                    : i
                    ? ((m = i),
                      (b = o) && t.isAttributeValue
                        ? (r &&
                            "=" == b &&
                            N("`&` did not start a character reference"),
                          e)
                        : (r &&
                            N(
                              "named character reference was not terminated by a semicolon"
                            ),
                          v[m] + (b || "")))
                    : a
                    ? ((f = a),
                      (d = s),
                      r &&
                        !d &&
                        N(
                          "character reference was not terminated by a semicolon"
                        ),
                      (p = parseInt(f, 10)),
                      k(p, r))
                    : l
                    ? ((h = l),
                      (d = c),
                      r &&
                        !d &&
                        N(
                          "character reference was not terminated by a semicolon"
                        ),
                      (p = parseInt(h, 16)),
                      k(p, r))
                    : (r &&
                        N(
                          "named character reference was not terminated by a semicolon"
                        ),
                      e);
                })
              );
            };
            O.options = { isAttributeValue: !1, strict: !1 };
            var S = {
              version: "1.2.0",
              encode: L,
              decode: O,
              escape: function (e) {
                return e.replace(p, function (e) {
                  return d[e];
                });
              },
              unescape: O,
            };
            void 0 ===
              (n = function () {
                return S;
              }.call(t, r, t, e)) || (e.exports = n);
          })();
      },
      6040: (e, t, r) => {
        e = r.nmd(e);
        var n = "__lodash_hash_undefined__",
          i = 9007199254740991,
          o = "[object Arguments]",
          a = "[object Array]",
          s = "[object Boolean]",
          l = "[object Date]",
          c = "[object Error]",
          u = "[object Function]",
          p = "[object Map]",
          d = "[object Number]",
          f = "[object Object]",
          h = "[object Promise]",
          m = "[object RegExp]",
          g = "[object Set]",
          v = "[object String]",
          b = "[object Symbol]",
          y = "[object WeakMap]",
          w = "[object ArrayBuffer]",
          E = "[object DataView]",
          x = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
          T = /^\w*$/,
          k = /^\./,
          _ =
            /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
          A = /\\(\\)?/g,
          N = /^\[object .+?Constructor\]$/,
          L = /^(?:0|[1-9]\d*)$/,
          O = {};
        (O["[object Float32Array]"] =
          O["[object Float64Array]"] =
          O["[object Int8Array]"] =
          O["[object Int16Array]"] =
          O["[object Int32Array]"] =
          O["[object Uint8Array]"] =
          O["[object Uint8ClampedArray]"] =
          O["[object Uint16Array]"] =
          O["[object Uint32Array]"] =
            !0),
          (O[o] =
            O[a] =
            O[w] =
            O[s] =
            O[E] =
            O[l] =
            O[c] =
            O[u] =
            O[p] =
            O[d] =
            O[f] =
            O[m] =
            O[g] =
            O[v] =
            O[y] =
              !1);
        var S =
            "object" == typeof global &&
            global &&
            global.Object === Object &&
            global,
          C = "object" == typeof self && self && self.Object === Object && self,
          D = S || C || Function("return this")(),
          q = t && !t.nodeType && t,
          R = q && e && !e.nodeType && e,
          j = R && R.exports === q && S.process,
          P = (function () {
            try {
              return j && j.binding("util");
            } catch (e) {}
          })(),
          B = P && P.isTypedArray;
        function F(e, t) {
          for (var r = -1, n = t.length, i = e.length; ++r < n; )
            e[i + r] = t[r];
          return e;
        }
        function M(e, t) {
          for (var r = -1, n = e ? e.length : 0; ++r < n; )
            if (t(e[r], r, e)) return !0;
          return !1;
        }
        function I(e) {
          var t = !1;
          if (null != e && "function" != typeof e.toString)
            try {
              t = !!(e + "");
            } catch (e) {}
          return t;
        }
        function U(e) {
          var t = -1,
            r = Array(e.size);
          return (
            e.forEach(function (e, n) {
              r[++t] = [n, e];
            }),
            r
          );
        }
        function V(e, t) {
          return function (r) {
            return e(t(r));
          };
        }
        function H(e) {
          var t = -1,
            r = Array(e.size);
          return (
            e.forEach(function (e) {
              r[++t] = e;
            }),
            r
          );
        }
        var G,
          K = Array.prototype,
          $ = Function.prototype,
          z = Object.prototype,
          Y = D["__core-js_shared__"],
          W = (G = /[^.]+$/.exec((Y && Y.keys && Y.keys.IE_PROTO) || ""))
            ? "Symbol(src)_1." + G
            : "",
          J = $.toString,
          X = z.hasOwnProperty,
          Z = z.toString,
          Q = RegExp(
            "^" +
              J.call(X)
                .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  "$1.*?"
                ) +
              "$"
          ),
          ee = D.Symbol,
          te = D.Uint8Array,
          re = V(Object.getPrototypeOf, Object),
          ne = z.propertyIsEnumerable,
          ie = K.splice,
          oe = Object.getOwnPropertySymbols,
          ae = V(Object.keys, Object),
          se = Re(D, "DataView"),
          le = Re(D, "Map"),
          ce = Re(D, "Promise"),
          ue = Re(D, "Set"),
          pe = Re(D, "WeakMap"),
          de = Re(Object, "create"),
          fe = Ke(se),
          he = Ke(le),
          me = Ke(ce),
          ge = Ke(ue),
          ve = Ke(pe),
          be = ee ? ee.prototype : void 0,
          ye = be ? be.valueOf : void 0,
          we = be ? be.toString : void 0;
        function Ee(e) {
          var t = -1,
            r = e ? e.length : 0;
          for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
          }
        }
        function xe(e) {
          var t = -1,
            r = e ? e.length : 0;
          for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
          }
        }
        function Te(e) {
          var t = -1,
            r = e ? e.length : 0;
          for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
          }
        }
        function ke(e) {
          var t = -1,
            r = e ? e.length : 0;
          for (this.__data__ = new Te(); ++t < r; ) this.add(e[t]);
        }
        function _e(e) {
          this.__data__ = new xe(e);
        }
        function Ae(e, t) {
          var r =
              We(e) || Ye(e)
                ? (function (e, t) {
                    for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
                    return n;
                  })(e.length, String)
                : [],
            n = r.length,
            i = !!n;
          for (var o in e)
            (!t && !X.call(e, o)) ||
              (i && ("length" == o || Fe(o, n))) ||
              r.push(o);
          return r;
        }
        function Ne(e, t) {
          for (var r = e.length; r--; ) if (ze(e[r][0], t)) return r;
          return -1;
        }
        function Le(e, t) {
          for (
            var r = 0, n = (t = Me(t, e) ? [t] : Ce(t)).length;
            null != e && r < n;

          )
            e = e[Ge(t[r++])];
          return r && r == n ? e : void 0;
        }
        function Oe(e, t) {
          return null != e && t in Object(e);
        }
        function Se(e, t, r, n, i) {
          return (
            e === t ||
            (null == e || null == t || (!Qe(e) && !et(t))
              ? e != e && t != t
              : (function (e, t, r, n, i, u) {
                  var h = We(e),
                    y = We(t),
                    x = a,
                    T = a;
                  h || (x = (x = Be(e)) == o ? f : x),
                    y || (T = (T = Be(t)) == o ? f : T);
                  var k = x == f && !I(e),
                    _ = T == f && !I(t),
                    A = x == T;
                  if (A && !k)
                    return (
                      u || (u = new _e()),
                      h || nt(e)
                        ? De(e, t, r, n, i, u)
                        : (function (e, t, r, n, i, o, a) {
                            switch (r) {
                              case E:
                                if (
                                  e.byteLength != t.byteLength ||
                                  e.byteOffset != t.byteOffset
                                )
                                  return !1;
                                (e = e.buffer), (t = t.buffer);
                              case w:
                                return !(
                                  e.byteLength != t.byteLength ||
                                  !n(new te(e), new te(t))
                                );
                              case s:
                              case l:
                              case d:
                                return ze(+e, +t);
                              case c:
                                return (
                                  e.name == t.name && e.message == t.message
                                );
                              case m:
                              case v:
                                return e == t + "";
                              case p:
                                var u = U;
                              case g:
                                var f = 2 & o;
                                if ((u || (u = H), e.size != t.size && !f))
                                  return !1;
                                var h = a.get(e);
                                if (h) return h == t;
                                (o |= 1), a.set(e, t);
                                var y = De(u(e), u(t), n, i, o, a);
                                return a.delete(e), y;
                              case b:
                                if (ye) return ye.call(e) == ye.call(t);
                            }
                            return !1;
                          })(e, t, x, r, n, i, u)
                    );
                  if (!(2 & i)) {
                    var N = k && X.call(e, "__wrapped__"),
                      L = _ && X.call(t, "__wrapped__");
                    if (N || L) {
                      var O = N ? e.value() : e,
                        S = L ? t.value() : t;
                      return u || (u = new _e()), r(O, S, n, i, u);
                    }
                  }
                  return (
                    !!A &&
                    (u || (u = new _e()),
                    (function (e, t, r, n, i, o) {
                      var a = 2 & i,
                        s = it(e),
                        l = s.length;
                      if (l != it(t).length && !a) return !1;
                      for (var c = l; c--; ) {
                        var u = s[c];
                        if (!(a ? u in t : X.call(t, u))) return !1;
                      }
                      var p = o.get(e);
                      if (p && o.get(t)) return p == t;
                      var d = !0;
                      o.set(e, t), o.set(t, e);
                      for (var f = a; ++c < l; ) {
                        var h = e[(u = s[c])],
                          m = t[u];
                        if (n)
                          var g = a ? n(m, h, u, t, e, o) : n(h, m, u, e, t, o);
                        if (!(void 0 === g ? h === m || r(h, m, n, i, o) : g)) {
                          d = !1;
                          break;
                        }
                        f || (f = "constructor" == u);
                      }
                      if (d && !f) {
                        var v = e.constructor,
                          b = t.constructor;
                        v == b ||
                          !("constructor" in e) ||
                          !("constructor" in t) ||
                          ("function" == typeof v &&
                            v instanceof v &&
                            "function" == typeof b &&
                            b instanceof b) ||
                          (d = !1);
                      }
                      return o.delete(e), o.delete(t), d;
                    })(e, t, r, n, i, u))
                  );
                })(e, t, Se, r, n, i))
          );
        }
        function Ce(e) {
          return We(e) ? e : He(e);
        }
        function De(e, t, r, n, i, o) {
          var a = 2 & i,
            s = e.length,
            l = t.length;
          if (s != l && !(a && l > s)) return !1;
          var c = o.get(e);
          if (c && o.get(t)) return c == t;
          var u = -1,
            p = !0,
            d = 1 & i ? new ke() : void 0;
          for (o.set(e, t), o.set(t, e); ++u < s; ) {
            var f = e[u],
              h = t[u];
            if (n) var m = a ? n(h, f, u, t, e, o) : n(f, h, u, e, t, o);
            if (void 0 !== m) {
              if (m) continue;
              p = !1;
              break;
            }
            if (d) {
              if (
                !M(t, function (e, t) {
                  if (!d.has(t) && (f === e || r(f, e, n, i, o)))
                    return d.add(t);
                })
              ) {
                p = !1;
                break;
              }
            } else if (f !== h && !r(f, h, n, i, o)) {
              p = !1;
              break;
            }
          }
          return o.delete(e), o.delete(t), p;
        }
        function qe(e, t) {
          var r,
            n,
            i = e.__data__;
          return (
            "string" == (n = typeof (r = t)) ||
            "number" == n ||
            "symbol" == n ||
            "boolean" == n
              ? "__proto__" !== r
              : null === r
          )
            ? i["string" == typeof t ? "string" : "hash"]
            : i.map;
        }
        function Re(e, t) {
          var r = (function (e, t) {
            return null == e ? void 0 : e[t];
          })(e, t);
          return (function (e) {
            return (
              !(!Qe(e) || ((t = e), W && W in t)) &&
              (Xe(e) || I(e) ? Q : N).test(Ke(e))
            );
            var t;
          })(r)
            ? r
            : void 0;
        }
        (Ee.prototype.clear = function () {
          this.__data__ = de ? de(null) : {};
        }),
          (Ee.prototype.delete = function (e) {
            return this.has(e) && delete this.__data__[e];
          }),
          (Ee.prototype.get = function (e) {
            var t = this.__data__;
            if (de) {
              var r = t[e];
              return r === n ? void 0 : r;
            }
            return X.call(t, e) ? t[e] : void 0;
          }),
          (Ee.prototype.has = function (e) {
            var t = this.__data__;
            return de ? void 0 !== t[e] : X.call(t, e);
          }),
          (Ee.prototype.set = function (e, t) {
            return (this.__data__[e] = de && void 0 === t ? n : t), this;
          }),
          (xe.prototype.clear = function () {
            this.__data__ = [];
          }),
          (xe.prototype.delete = function (e) {
            var t = this.__data__,
              r = Ne(t, e);
            return !(
              r < 0 || (r == t.length - 1 ? t.pop() : ie.call(t, r, 1), 0)
            );
          }),
          (xe.prototype.get = function (e) {
            var t = this.__data__,
              r = Ne(t, e);
            return r < 0 ? void 0 : t[r][1];
          }),
          (xe.prototype.has = function (e) {
            return Ne(this.__data__, e) > -1;
          }),
          (xe.prototype.set = function (e, t) {
            var r = this.__data__,
              n = Ne(r, e);
            return n < 0 ? r.push([e, t]) : (r[n][1] = t), this;
          }),
          (Te.prototype.clear = function () {
            this.__data__ = {
              hash: new Ee(),
              map: new (le || xe)(),
              string: new Ee(),
            };
          }),
          (Te.prototype.delete = function (e) {
            return qe(this, e).delete(e);
          }),
          (Te.prototype.get = function (e) {
            return qe(this, e).get(e);
          }),
          (Te.prototype.has = function (e) {
            return qe(this, e).has(e);
          }),
          (Te.prototype.set = function (e, t) {
            return qe(this, e).set(e, t), this;
          }),
          (ke.prototype.add = ke.prototype.push =
            function (e) {
              return this.__data__.set(e, n), this;
            }),
          (ke.prototype.has = function (e) {
            return this.__data__.has(e);
          }),
          (_e.prototype.clear = function () {
            this.__data__ = new xe();
          }),
          (_e.prototype.delete = function (e) {
            return this.__data__.delete(e);
          }),
          (_e.prototype.get = function (e) {
            return this.__data__.get(e);
          }),
          (_e.prototype.has = function (e) {
            return this.__data__.has(e);
          }),
          (_e.prototype.set = function (e, t) {
            var r = this.__data__;
            if (r instanceof xe) {
              var n = r.__data__;
              if (!le || n.length < 199) return n.push([e, t]), this;
              r = this.__data__ = new Te(n);
            }
            return r.set(e, t), this;
          });
        var je = oe ? V(oe, Object) : st,
          Pe = oe
            ? function (e) {
                for (var t = []; e; ) F(t, je(e)), (e = re(e));
                return t;
              }
            : st,
          Be = function (e) {
            return Z.call(e);
          };
        function Fe(e, t) {
          return (
            !!(t = null == t ? i : t) &&
            ("number" == typeof e || L.test(e)) &&
            e > -1 &&
            e % 1 == 0 &&
            e < t
          );
        }
        function Me(e, t) {
          if (We(e)) return !1;
          var r = typeof e;
          return (
            !(
              "number" != r &&
              "symbol" != r &&
              "boolean" != r &&
              null != e &&
              !tt(e)
            ) ||
            T.test(e) ||
            !x.test(e) ||
            (null != t && e in Object(t))
          );
        }
        function Ie(e) {
          var t = e && e.constructor;
          return e === (("function" == typeof t && t.prototype) || z);
        }
        function Ue(e) {
          return e == e && !Qe(e);
        }
        function Ve(e, t) {
          return function (r) {
            return null != r && r[e] === t && (void 0 !== t || e in Object(r));
          };
        }
        ((se && Be(new se(new ArrayBuffer(1))) != E) ||
          (le && Be(new le()) != p) ||
          (ce && Be(ce.resolve()) != h) ||
          (ue && Be(new ue()) != g) ||
          (pe && Be(new pe()) != y)) &&
          (Be = function (e) {
            var t = Z.call(e),
              r = t == f ? e.constructor : void 0,
              n = r ? Ke(r) : void 0;
            if (n)
              switch (n) {
                case fe:
                  return E;
                case he:
                  return p;
                case me:
                  return h;
                case ge:
                  return g;
                case ve:
                  return y;
              }
            return t;
          });
        var He = $e(function (e) {
          var t;
          e =
            null == (t = e)
              ? ""
              : (function (e) {
                  if ("string" == typeof e) return e;
                  if (tt(e)) return we ? we.call(e) : "";
                  var t = e + "";
                  return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
                })(t);
          var r = [];
          return (
            k.test(e) && r.push(""),
            e.replace(_, function (e, t, n, i) {
              r.push(n ? i.replace(A, "$1") : t || e);
            }),
            r
          );
        });
        function Ge(e) {
          if ("string" == typeof e || tt(e)) return e;
          var t = e + "";
          return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
        }
        function Ke(e) {
          if (null != e) {
            try {
              return J.call(e);
            } catch (e) {}
            try {
              return e + "";
            } catch (e) {}
          }
          return "";
        }
        function $e(e, t) {
          if ("function" != typeof e || (t && "function" != typeof t))
            throw new TypeError("Expected a function");
          var r = function () {
            var n = arguments,
              i = t ? t.apply(this, n) : n[0],
              o = r.cache;
            if (o.has(i)) return o.get(i);
            var a = e.apply(this, n);
            return (r.cache = o.set(i, a)), a;
          };
          return (r.cache = new ($e.Cache || Te)()), r;
        }
        function ze(e, t) {
          return e === t || (e != e && t != t);
        }
        function Ye(e) {
          return (
            (function (e) {
              return et(e) && Je(e);
            })(e) &&
            X.call(e, "callee") &&
            (!ne.call(e, "callee") || Z.call(e) == o)
          );
        }
        $e.Cache = Te;
        var We = Array.isArray;
        function Je(e) {
          return null != e && Ze(e.length) && !Xe(e);
        }
        function Xe(e) {
          var t = Qe(e) ? Z.call(e) : "";
          return t == u || "[object GeneratorFunction]" == t;
        }
        function Ze(e) {
          return "number" == typeof e && e > -1 && e % 1 == 0 && e <= i;
        }
        function Qe(e) {
          var t = typeof e;
          return !!e && ("object" == t || "function" == t);
        }
        function et(e) {
          return !!e && "object" == typeof e;
        }
        function tt(e) {
          return "symbol" == typeof e || (et(e) && Z.call(e) == b);
        }
        var rt,
          nt = B
            ? ((rt = B),
              function (e) {
                return rt(e);
              })
            : function (e) {
                return et(e) && Ze(e.length) && !!O[Z.call(e)];
              };
        function it(e) {
          return Je(e)
            ? Ae(e)
            : (function (e) {
                if (!Ie(e)) return ae(e);
                var t = [];
                for (var r in Object(e))
                  X.call(e, r) && "constructor" != r && t.push(r);
                return t;
              })(e);
        }
        function ot(e) {
          return Je(e)
            ? Ae(e, !0)
            : (function (e) {
                if (!Qe(e))
                  return (function (e) {
                    var t = [];
                    if (null != e) for (var r in Object(e)) t.push(r);
                    return t;
                  })(e);
                var t = Ie(e),
                  r = [];
                for (var n in e)
                  ("constructor" != n || (!t && X.call(e, n))) && r.push(n);
                return r;
              })(e);
        }
        function at(e) {
          return e;
        }
        function st() {
          return [];
        }
        e.exports = function (e, t) {
          return null == e
            ? {}
            : (function (e, t, r) {
                for (var n = -1, i = t.length, o = {}; ++n < i; ) {
                  var a = t[n],
                    s = e[a];
                  r(s, a) && (o[a] = s);
                }
                return o;
              })(
                e,
                (function (e) {
                  return (function (e, t, r) {
                    var n = t(e);
                    return We(e) ? n : F(n, r(e));
                  })(e, ot, Pe);
                })(e),
                "function" == typeof (r = t)
                  ? r
                  : null == r
                  ? at
                  : "object" == typeof r
                  ? We(r)
                    ? (function (e, t) {
                        return Me(e) && Ue(t)
                          ? Ve(Ge(e), t)
                          : function (r) {
                              var n = (function (e, t, r) {
                                var n = null == e ? void 0 : Le(e, t);
                                return void 0 === n ? void 0 : n;
                              })(r, e);
                              return void 0 === n && n === t
                                ? (function (e, t) {
                                    return (
                                      null != e &&
                                      (function (e, t, r) {
                                        for (
                                          var n,
                                            i = -1,
                                            o = (t = Me(t, e) ? [t] : Ce(t))
                                              .length;
                                          ++i < o;

                                        ) {
                                          var a = Ge(t[i]);
                                          if (!(n = null != e && r(e, a)))
                                            break;
                                          e = e[a];
                                        }
                                        return (
                                          n ||
                                          (!!(o = e ? e.length : 0) &&
                                            Ze(o) &&
                                            Fe(a, o) &&
                                            (We(e) || Ye(e)))
                                        );
                                      })(e, t, Oe)
                                    );
                                  })(r, e)
                                : Se(t, n, void 0, 3);
                            };
                      })(r[0], r[1])
                    : ((i = (function (e) {
                        for (var t = it(e), r = t.length; r--; ) {
                          var n = t[r],
                            i = e[n];
                          t[r] = [n, i, Ue(i)];
                        }
                        return t;
                      })((n = r))),
                      1 == i.length && i[0][2]
                        ? Ve(i[0][0], i[0][1])
                        : function (e) {
                            return (
                              e === n ||
                              (function (e, t, r, n) {
                                var i = r.length,
                                  o = i;
                                if (null == e) return !o;
                                for (e = Object(e); i--; ) {
                                  var a = r[i];
                                  if (a[2] ? a[1] !== e[a[0]] : !(a[0] in e))
                                    return !1;
                                }
                                for (; ++i < o; ) {
                                  var s = (a = r[i])[0],
                                    l = e[s],
                                    c = a[1];
                                  if (a[2]) {
                                    if (void 0 === l && !(s in e)) return !1;
                                  } else {
                                    var u,
                                      p = new _e();
                                    if (!(void 0 === u ? Se(c, l, n, 3, p) : u))
                                      return !1;
                                  }
                                }
                                return !0;
                              })(e, 0, i)
                            );
                          })
                  : Me((o = r))
                  ? ((a = Ge(o)),
                    function (e) {
                      return null == e ? void 0 : e[a];
                    })
                  : (function (e) {
                      return function (t) {
                        return Le(t, e);
                      };
                    })(o)
              );
          var r, n, i, o, a;
        };
      },
      7690: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.nodeHtmlParserConfig =
            t.aTagTranslatorConfig =
            t.defaultCodeBlockTranslators =
            t.tableCellTranslatorConfig =
            t.tableRowTranslatorConfig =
            t.tableTranslatorConfig =
            t.defaultTranslators =
            t.defaultOptions =
            t.contentlessElements =
            t.defaultIgnoreElements =
            t.defaultBlockElements =
              void 0);
        const n = r(998),
          i = r(4923);
        (t.defaultBlockElements = [
          "ADDRESS",
          "ARTICLE",
          "ASIDE",
          "AUDIO",
          "BLOCKQUOTE",
          "BODY",
          "CANVAS",
          "CENTER",
          "DD",
          "DIR",
          "DIV",
          "DL",
          "DT",
          "FIELDSET",
          "FIGCAPTION",
          "FIGURE",
          "FOOTER",
          "FORM",
          "FRAMESET",
          "H1",
          "H2",
          "H3",
          "H4",
          "H5",
          "H6",
          "HEADER",
          "HGROUP",
          "HR",
          "HTML",
          "ISINDEX",
          "LI",
          "MAIN",
          "MENU",
          "NAV",
          "NOFRAMES",
          "NOSCRIPT",
          "OL",
          "OUTPUT",
          "P",
          "PRE",
          "SECTION",
          "TABLE",
          "TBODY",
          "TD",
          "TFOOT",
          "TH",
          "THEAD",
          "TR",
          "UL",
        ]),
          (t.defaultIgnoreElements = [
            "AREA",
            "BASE",
            "COL",
            "COMMAND",
            "EMBED",
            "HEAD",
            "INPUT",
            "KEYGEN",
            "LINK",
            "META",
            "PARAM",
            "SCRIPT",
            "SOURCE",
            "STYLE",
            "TRACK",
            "WBR",
          ]),
          (t.contentlessElements = ["BR", "HR", "IMG"]),
          (t.defaultOptions = Object.freeze({
            preferNativeParser: !1,
            codeFence: "```",
            bulletMarker: "*",
            indent: "  ",
            codeBlockStyle: "fenced",
            emDelimiter: "_",
            strongDelimiter: "**",
            maxConsecutiveNewlines: 3,
            globalEscape: [/[\\`*_~\[\]]/gm, "\\$&"],
            lineStartEscape: [
              /^(\s*?)((?:\+\s)|(?:[=>-])|(?:#{1,6}\s))|(?:(\d+)(\.\s))/gm,
              "$1$3\\$2$4",
            ],
          })),
          (t.defaultTranslators = {
            pre: { noEscape: !0, preserveWhitespace: !0 },
            br: { content: "  \n", recurse: !1 },
            hr: { content: "---", recurse: !1 },
            "h1,h2,h3,h4,h5,h6": ({ node: e }) => ({
              prefix: "#".repeat(+e.tagName.charAt(1)) + " ",
            }),
            "strong,b": {
              spaceIfRepeatingChar: !0,
              postprocess: ({ content: e, options: { strongDelimiter: t } }) =>
                (0, n.isWhiteSpaceOnly)(e)
                  ? i.PostProcessResult.RemoveNode
                  : (0, n.tagSurround)(e, t),
            },
            "del,s,strike": {
              spaceIfRepeatingChar: !0,
              postprocess: ({ content: e }) =>
                (0, n.isWhiteSpaceOnly)(e)
                  ? i.PostProcessResult.RemoveNode
                  : (0, n.tagSurround)(e, "~~"),
            },
            "em,i": {
              spaceIfRepeatingChar: !0,
              postprocess: ({ content: e, options: { emDelimiter: t } }) =>
                (0, n.isWhiteSpaceOnly)(e)
                  ? i.PostProcessResult.RemoveNode
                  : (0, n.tagSurround)(e, t),
            },
            "ol,ul": ({ listKind: e }) => ({ surroundingNewlines: e ? 1 : 2 }),
            li: ({
              options: { bulletMarker: e },
              indentLevel: t,
              listKind: r,
              listItemNumber: o,
            }) => {
              const a = +(t || 0);
              return {
                prefix:
                  "   ".repeat(+(t || 0)) +
                  ("OL" === r && void 0 !== o ? `${o}. ` : `${e} `),
                surroundingNewlines: 1,
                postprocess: ({ content: e }) =>
                  (0, n.isWhiteSpaceOnly)(e)
                    ? i.PostProcessResult.RemoveNode
                    : e
                        .trim()
                        .replace(
                          /([^\r\n])(?:\r?\n)+/g,
                          `$1  \n${"   ".repeat(a)}`
                        )
                        .replace(/(\S+?)[^\S\r\n]+$/gm, "$1  "),
              };
            },
            blockquote: {
              postprocess: ({ content: e }) =>
                (0, n.trimNewLines)(e).replace(/^(>*)[^\S\r\n]?/gm, ">$1 "),
            },
            code: ({
              node: e,
              parent: t,
              options: { codeFence: r, codeBlockStyle: i },
              visitor: o,
            }) => {
              var a, s;
              return ["PRE", "WRAPPED-PRE"].includes(
                null == t ? void 0 : t.tagName
              ) && t.childNodes.length < 2
                ? "fenced" === i
                  ? {
                      noEscape: !0,
                      prefix:
                        r +
                        ((null ===
                          (s =
                            null === (a = e.getAttribute("class")) ||
                            void 0 === a
                              ? void 0
                              : a.match(/language-(\S+)/)) || void 0 === s
                          ? void 0
                          : s[1]) || "") +
                        "\n",
                      postfix: "\n" + r,
                      childTranslators: o.instance.codeBlockTranslators,
                    }
                  : {
                      noEscape: !0,
                      postprocess: ({ content: e }) => e.replace(/^/gm, "    "),
                      childTranslators: o.instance.codeBlockTranslators,
                    }
                : {
                    spaceIfRepeatingChar: !0,
                    noEscape: !0,
                    postprocess: ({ content: e }) => {
                      var t, r;
                      const i =
                          "`" +
                          ((null ===
                            (r =
                              null === (t = e.match(/`+/g)) || void 0 === t
                                ? void 0
                                : t.sort((e, t) => t.length - e.length)) ||
                          void 0 === r
                            ? void 0
                            : r[0]) || ""),
                        o = i.length > 1 ? " " : "";
                      return (0, n.surround)((0, n.surround)(e, o), i);
                    },
                  };
            },
            table: ({ visitor: e }) => ({
              surroundingNewlines: 2,
              childTranslators: e.instance.tableTranslators,
              postprocess: ({ content: e, nodeMetadata: t, node: r }) => {
                const o = (0, n.splitSpecial)(e).map(({ text: e }) =>
                    e.replace(/^(?:\|\s+)?(.+)\s*\|\s*$/, "$1")
                  ),
                  a = [];
                let s = [];
                for (const e of o) {
                  if (!e) continue;
                  const t = e
                    .split(" |")
                    .map(
                      (e, t) => (
                        (e = e.trim()),
                        (s.length < t + 1 || s[t] < e.length) &&
                          (s[t] = e.length),
                        e
                      )
                    );
                  a.push(t);
                }
                if (a.length < 1) return i.PostProcessResult.RemoveNode;
                const l = s.length;
                let c = "";
                const u = t.get(r).tableMeta.caption;
                return (
                  u && (c += u + "\n"),
                  a.forEach((e, t) => {
                    var r;
                    c += "| ";
                    for (let t = 0; t < l; t++) {
                      let n = null !== (r = e[t]) && void 0 !== r ? r : "";
                      (n += " ".repeat(Math.max(0, s[t] - n.length))),
                        (c += n + " |" + (t < l - 1 ? " " : ""));
                    }
                    (c += "\n"),
                      0 === t &&
                        (c +=
                          "|" +
                          s.map((e) => " " + "-".repeat(e) + " |").join("") +
                          "\n");
                  }),
                  c
                );
              },
            }),
            a: ({ node: e, options: t, visitor: r }) => {
              const n = e.getAttribute("href");
              if (!n) return {};
              let i = "";
              for (const e of n)
                switch (e) {
                  case "(":
                    i += "%28";
                    break;
                  case ")":
                    i += "%29";
                    break;
                  case "_":
                    i += "%5F";
                    break;
                  case "*":
                    i += "%2A";
                    break;
                  default:
                    i += e;
                }
              const o = e.getAttribute("title");
              return e.textContent === n
                ? { content: `<${i}>` }
                : {
                    postprocess: ({ content: e }) =>
                      e.replace(/(?:\r?\n)+/g, " "),
                    childTranslators: r.instance.aTagTranslators,
                    prefix: "[",
                    postfix:
                      "]" +
                      (t.useLinkReferenceDefinitions
                        ? `[${r.addOrGetUrlDefinition(i)}]`
                        : `(${i}${o ? ` "${o}"` : ""})`),
                  };
            },
            img: ({ node: e, options: t }) => {
              const r = e.getAttribute("src") || "";
              if (!r || (!t.keepDataImages && /^data:/i.test(r)))
                return { ignore: !0 };
              const n = e.getAttribute("alt") || "",
                i = e.getAttribute("title") || "";
              return { content: `![${n}](${r}${i && ` "${i}"`})`, recurse: !1 };
            },
          }),
          (t.tableTranslatorConfig = {
            caption: ({ visitor: e }) => ({
              surroundingNewlines: !1,
              childTranslators: e.instance.tableCellTranslators,
              postprocess: ({ content: e, nodeMetadata: t, node: r }) => {
                const n = e.replace(/(?:\r?\n)+/g, " ").trim();
                return (
                  n && (t.get(r).tableMeta.caption = "__" + n + "__"),
                  i.PostProcessResult.RemoveNode
                );
              },
            }),
            tr: ({ visitor: e }) => ({
              surroundingNewlines: !1,
              childTranslators: e.instance.tableRowTranslators,
              postfix: "\n",
              prefix: "| ",
              postprocess: ({ content: e }) =>
                / \|\s*$/.test(e) ? e : i.PostProcessResult.RemoveNode,
            }),
            "th,td": ({ visitor: e }) => ({
              surroundingNewlines: !1,
              childTranslators: e.instance.tableCellTranslators,
              prefix: " ",
              postfix: " |",
              postprocess: ({ content: e }) =>
                (0, n.trimNewLines)(e)
                  .replace("|", "\\|")
                  .replace(/(?:\r?\n)+/g, " ")
                  .trim(),
            }),
          }),
          (t.tableRowTranslatorConfig = {
            "th,td": t.tableTranslatorConfig["th,td"],
          }),
          (t.tableCellTranslatorConfig = {
            a: t.defaultTranslators.a,
            "strong,b": t.defaultTranslators["strong,b"],
            "del,s,strike": t.defaultTranslators["del,s,strike"],
            "em,i": t.defaultTranslators["em,i"],
            img: t.defaultTranslators.img,
          }),
          (t.defaultCodeBlockTranslators = {
            br: { content: "\n", recurse: !1 },
            hr: { content: "---", recurse: !1 },
            "h1,h2,h3,h4,h5,h6": { prefix: "[", postfix: "]" },
            "ol,ul": t.defaultTranslators["ol,ul"],
            li: t.defaultTranslators.li,
            tr: { surroundingNewlines: !0 },
            img: { recurse: !1 },
          }),
          (t.aTagTranslatorConfig = {
            br: { content: "\n", recurse: !1 },
            hr: { content: "\n", recurse: !1 },
            pre: t.defaultTranslators.pre,
            "strong,b": t.defaultTranslators["strong,b"],
            "del,s,strike": t.defaultTranslators["del,s,strike"],
            "em,i": t.defaultTranslators["em,i"],
            img: t.defaultTranslators.img,
          }),
          (t.nodeHtmlParserConfig = {
            lowerCaseTagName: !1,
            comment: !1,
            blockTextElements: { script: !1, noscript: !1, style: !1 },
          });
      },
      2245: (e, t, r) => {
        "use strict";
        t.dx = void 0;
        var n = r(7352);
        Object.defineProperty(t, "dx", {
          enumerable: !0,
          get: function () {
            return n.NodeHtmlMarkdown;
          },
        });
        r(4923);
      },
      7352: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.NodeHtmlMarkdown = void 0);
        const n = r(4923),
          i = r(7690),
          o = r(998),
          a = r(390);
        class s {
          constructor(e, t, r) {
            var o, a, s, l;
            (this.translators = new n.TranslatorCollection()),
              (this.aTagTranslators = new n.TranslatorCollection()),
              (this.codeBlockTranslators = new n.TranslatorCollection()),
              (this.tableTranslators = new n.TranslatorCollection()),
              (this.tableRowTranslators = new n.TranslatorCollection()),
              (this.tableCellTranslators = new n.TranslatorCollection()),
              (this.options = Object.assign(
                Object.assign({}, i.defaultOptions),
                e
              ));
            const c =
                null !==
                  (a =
                    null === (o = this.options.ignore) || void 0 === o
                      ? void 0
                      : o.concat(i.defaultIgnoreElements)) && void 0 !== a
                  ? a
                  : i.defaultIgnoreElements,
              u =
                null !==
                  (l =
                    null === (s = this.options.blockElements) || void 0 === s
                      ? void 0
                      : s.concat(i.defaultBlockElements)) && void 0 !== l
                  ? l
                  : i.defaultBlockElements;
            null == c ||
              c.forEach((e) => {
                this.translators.set(e, { ignore: !0, recurse: !1 }),
                  this.codeBlockTranslators.set(e, { ignore: !0, recurse: !1 });
              }),
              null == u ||
                u.forEach((e) => {
                  this.translators.set(e, { surroundingNewlines: 2 }),
                    this.codeBlockTranslators.set(e, {
                      surroundingNewlines: 2,
                    });
                });
            for (const [e, r] of Object.entries(
              Object.assign(Object.assign({}, i.defaultTranslators), t)
            ))
              this.translators.set(e, r, !0);
            for (const [e, t] of Object.entries(
              Object.assign(Object.assign({}, i.defaultCodeBlockTranslators), r)
            ))
              this.codeBlockTranslators.set(e, t, !0);
            for (const [e, t] of Object.entries(i.aTagTranslatorConfig))
              this.aTagTranslators.set(e, t, !0);
            for (const [e, t] of Object.entries(i.tableTranslatorConfig))
              this.tableTranslators.set(e, t, !0);
            for (const [e, t] of Object.entries(i.tableRowTranslatorConfig))
              this.tableRowTranslators.set(e, t, !0);
            for (const [e, t] of Object.entries(i.tableCellTranslatorConfig))
              this.tableCellTranslators.set(e, t, !0);
            this.options.textReplace || (this.options.textReplace = []),
              this.options.textReplace.push([/^<!DOCTYPE.*>/gim, ""]);
          }
          static translate(e, t, r, n) {
            return s.prototype.translateWorker.call(new s(t, r, n), e);
          }
          translate(e) {
            return this.translateWorker(e);
          }
          translateWorker(e) {
            const t = "string" != typeof e,
              r = t ? e : { default: e },
              n = {};
            for (const [e, t] of Object.entries(r)) {
              const r = (0, o.parseHTML)(t, this.options);
              n[e] = (0, a.getMarkdownForHtmlNodes)(
                this,
                r,
                "default" !== e ? e : void 0
              );
            }
            return t ? n : n.default;
          }
        }
        t.NodeHtmlMarkdown = s;
      },
      5089: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.isElementNode =
            t.isCommentNode =
            t.isTextNode =
            t.CommentNode =
            t.NodeType =
              void 0);
        const n = r(698);
        Object.defineProperty(t, "CommentNode", {
          enumerable: !0,
          get: function () {
            return n.CommentNode;
          },
        }),
          Object.defineProperty(t, "NodeType", {
            enumerable: !0,
            get: function () {
              return n.NodeType;
            },
          }),
          (t.isTextNode = (e) => e.nodeType === n.NodeType.TEXT_NODE),
          (t.isCommentNode = (e) => e.nodeType === n.NodeType.COMMENT_NODE),
          (t.isElementNode = (e) => e.nodeType === n.NodeType.ELEMENT_NODE);
      },
      4923: (e, t) => {
        "use strict";
        var r;
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.createTranslatorContext =
            t.isTranslatorConfig =
            t.TranslatorCollection =
            t.PostProcessResult =
              void 0),
          ((r = t.PostProcessResult || (t.PostProcessResult = {}))[
            (r.NoChange = 0)
          ] = "NoChange"),
          (r[(r.RemoveNode = 1)] = "RemoveNode"),
          (t.TranslatorCollection = class {
            get size() {
              return Object.keys(this).length;
            }
            set(e, r, n) {
              e.split(",").forEach((e) => {
                e = e.toUpperCase();
                let i = r;
                if (n) {
                  const n = this[e];
                  (0, t.isTranslatorConfig)(n) &&
                    (i = (0, t.isTranslatorConfig)(r)
                      ? Object.assign(Object.assign({}, n), r)
                      : Object.assign((...e) => r.apply(void 0, e), {
                          base: n,
                        }));
                }
                this[e] = i;
              });
            }
            get(e) {
              return this[e.toUpperCase()];
            }
            entries() {
              return Object.entries(this);
            }
            remove(e) {
              e.split(",").forEach((e) => delete this[e.toUpperCase()]);
            }
          }),
          (t.isTranslatorConfig = (e) => "object" == typeof e),
          (t.createTranslatorContext = function (e, t, r, n) {
            const { instance: i, nodeMetadata: o } = e;
            return Object.assign(
              {
                node: t,
                options: i.options,
                parent: t.parentNode,
                nodeMetadata: o,
                visitor: e,
                base: n,
              },
              r
            );
          });
      },
      998: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.perfStop =
            t.perfStart =
            t.getChildNodes =
            t.parseHTML =
            t.truthyStr =
            t.getTrailingWhitespaceInfo =
            t.tagSurround =
            t.splitSpecial =
            t.isWhiteSpaceOnly =
            t.surround =
            t.trimNewLines =
              void 0);
        const n = r(7690);
        function i(e) {
          const t = [],
            r = e.length;
          for (let n = 0, i = 0; n < r; ++n) {
            let o = e.charAt(n),
              a = "";
            "\r" === o
              ? (a = "\n" === e.charAt(n + 1) ? "\r\n" : o)
              : "\n" === o && (a = o);
            const s = a ? n : n === r - 1 ? n + 1 : void 0;
            void 0 !== s &&
              (t.push({ text: e.slice(i, s), newLineChar: a }),
              (i = s + a.length),
              a.length > 1 && ++n);
          }
          return t;
        }
        (t.trimNewLines = (e) => e.replace(/^\n+|\n+$/g, "")),
          (t.surround = (e, t) => `${t}${e}${t}`),
          (t.isWhiteSpaceOnly = (e) => !/\S/.test(e)),
          (t.splitSpecial = i),
          (t.tagSurround = function (e, t) {
            e.indexOf(t) >= 0 &&
              (e = e.replace(
                new RegExp(`([^\\\\])\\${t.split("").join("\\")}`, "gm"),
                "$1"
              ));
            const r = i(e);
            let n = "";
            for (const { text: e, newLineChar: i } of r) {
              let r,
                o,
                a = 0;
              for (; a >= 0 && a < e.length; )
                /[\S]/.test(e[a]) &&
                  (void 0 === r
                    ? ((r = a), (a = e.length))
                    : ((o = a), (a = NaN))),
                  void 0 === r ? ++a : --a;
              if (void 0 === r) {
                n += e + i;
                continue;
              }
              void 0 === o && (o = e.length - 1);
              const s = r > 0 ? e[r - 1] : "",
                l = o < e.length - 1 ? e[o + 1] : "";
              n += s + t + e.slice(r, o + 1) + t + l + i;
            }
            return n;
          }),
          (t.getTrailingWhitespaceInfo = (e) => {
            const t = { whitespace: 0, newLines: 0 },
              r = Math.max(e.length - 10, 0);
            for (let n = e.length - 1; n >= r; --n) {
              const r = e.slice(n, n + 1);
              if (!/\s/.test(r)) break;
              ++t.whitespace, ["\r", "\n"].includes(r) && ++t.newLines;
            }
            return t;
          }),
          (t.truthyStr = (e, t) => (e ? (void 0 !== t ? t : String(e)) : ""));
        const o = () => {
          try {
            return r(698).parse;
          } catch (e) {
            return;
          }
        };
        function a(e) {
          process.env.LOG_PERF && console.time(e);
        }
        function s(e) {
          process.env.LOG_PERF && console.timeEnd(e);
        }
        (t.parseHTML = function (e, t) {
          let r, i;
          if ((a("parse"), t.preferNativeParser))
            try {
              i = (function (e) {
                try {
                  if (
                    !(null === window || void 0 === window
                      ? void 0
                      : window.DOMParser) ||
                    !new window.DOMParser().parseFromString("", "text/html")
                  )
                    return;
                } catch (e) {
                  return;
                }
                let t;
                try {
                  t = document.implementation.createHTMLDocument("").open();
                } catch (e) {
                  const { ActiveXObject: t } = window;
                  if (t) {
                    const e = t("htmlfile");
                    return (e.designMode = "on"), e.open();
                  }
                  throw e;
                }
                return (
                  t.write("<node-html-markdown>" + e + "</node-html-markdown>"),
                  t.close(),
                  t.documentElement
                );
              })(e);
            } catch (e) {
              if (((r = o()), !r)) throw e;
              console.warn(
                "Native DOM parser encountered an error during parse",
                e
              );
            }
          else r = o();
          return i || (i = r(e, n.nodeHtmlParserConfig)), s("parse"), i;
        }),
          (t.getChildNodes = function (e) {
            if (
              null == (t = e.childNodes) &&
              "function" != typeof t[Symbol.iterator]
            )
              return e.childNodes;
            var t;
            const r = [];
            return e.childNodes.forEach((e) => r.push(e)), r;
          }),
          (t.perfStart = a),
          (t.perfStop = s);
      },
      390: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.getMarkdownForHtmlNodes = t.Visitor = void 0);
        const n = r(5089),
          i = r(998),
          o = r(4923),
          a = r(7690);
        class s {
          constructor(e, t, r) {
            (this.instance = e),
              (this.rootNode = t),
              (this.fileName = r),
              (this.nodeMetadata = new Map()),
              (this.urlDefinitions = []),
              (this.result = {
                text: "",
                trailingNewlineStats: { whitespace: 0, newLines: 0 },
              }),
              (this.options = e.options),
              this.optimizeTree(t),
              this.visitNode(t);
          }
          addOrGetUrlDefinition(e) {
            let t = this.urlDefinitions.findIndex((t) => t === e);
            return t < 0 && (t = this.urlDefinitions.push(e) - 1), t + 1;
          }
          appendResult(e, t, r) {
            if (!e && void 0 === t) return;
            const { result: n } = this;
            void 0 !== t && (n.text = n.text.substr(0, t)),
              (n.text += (r && n.text.slice(-1) === e[0] ? " " : "") + e),
              (n.trailingNewlineStats = (0, i.getTrailingWhitespaceInfo)(
                n.text
              ));
          }
          appendNewlines(e) {
            const { newLines: t } = this.result.trailingNewlineStats;
            this.appendResult("\n".repeat(Math.max(0, +e - t)));
          }
          optimizeTree(e) {
            (0, i.perfStart)("Optimize tree");
            const { translators: t } = this.instance;
            !(function e(r) {
              let o = !1;
              if (
                (0, n.isTextNode)(r) ||
                ((0, n.isElementNode)(r) &&
                  a.contentlessElements.includes(r.tagName))
              )
                o = !0;
              else {
                const n = (0, i.getChildNodes)(r);
                if (n.length) for (const t of n) o ? e(t) : (o = e(t));
                else {
                  const e = t[r.tagName];
                  ((null == e ? void 0 : e.preserveIfEmpty) ||
                    "function" == typeof e) &&
                    (o = !0);
                }
              }
              return (r.preserve = o);
            })(e),
              (0, i.perfStop)("Optimize tree");
          }
          processText(e, t) {
            let r = e;
            if (
              ((null == t ? void 0 : t.preserveWhitespace) ||
                (r = r.replace(/\s+/g, " ")),
              null == t ? void 0 : t.noEscape)
            )
              return r;
            const {
              lineStartEscape: n,
              globalEscape: i,
              textReplace: o,
            } = this.options;
            if (((r = r.replace(i[0], i[1]).replace(n[0], n[1])), o))
              for (const [e, t] of o) r = r.replace(e, t);
            return r;
          }
          visitNode(e, t, r) {
            var a, s;
            const { result: l } = this;
            if (!e.preserve) return;
            if ((0, n.isTextNode)(e))
              return e.isWhitespace &&
                !(null == r ? void 0 : r.preserveWhitespace)
                ? !l.text.length || l.trailingNewlineStats.whitespace > 0
                  ? void 0
                  : this.appendResult(" ")
                : this.appendResult(
                    this.processText(
                      (null == r ? void 0 : r.preserveWhitespace)
                        ? e.text
                        : e.trimmedText,
                      r
                    )
                  );
            if (t || !(0, n.isElementNode)(e)) return;
            const c = (null == r ? void 0 : r.translators)
              ? r.translators[e.tagName]
              : this.instance.translators[e.tagName];
            switch (e.tagName) {
              case "UL":
              case "OL":
                r = Object.assign(Object.assign({}, r), {
                  listItemNumber: 0,
                  listKind: e.tagName,
                  indentLevel:
                    (null !== (a = null == r ? void 0 : r.indentLevel) &&
                    void 0 !== a
                      ? a
                      : -1) + 1,
                });
                break;
              case "LI":
                "OL" === (null == r ? void 0 : r.listKind) &&
                  (r.listItemNumber =
                    (null !== (s = r.listItemNumber) && void 0 !== s ? s : 0) +
                    1);
                break;
              case "PRE":
                r = Object.assign(Object.assign({}, r), {
                  preserveWhitespace: !0,
                });
                break;
              case "TABLE":
                r = Object.assign(Object.assign({}, r), {
                  tableMeta: { node: e },
                });
            }
            if ((r && this.nodeMetadata.set(e, r), !c)) {
              for (const n of (0, i.getChildNodes)(e)) this.visitNode(n, t, r);
              return;
            }
            let u, p;
            if (
              ((0, o.isTranslatorConfig)(c)
                ? (u = c)
                : ((p = (0, o.createTranslatorContext)(this, e, r, c.base)),
                  (u = Object.assign(Object.assign({}, c.base), c(p)))),
              u.ignore)
            )
              return;
            u.noEscape &&
              !(null == r ? void 0 : r.noEscape) &&
              ((r = Object.assign(Object.assign({}, r), {
                noEscape: u.noEscape,
              })),
              this.nodeMetadata.set(e, r)),
              u.childTranslators &&
                u.childTranslators !== (null == r ? void 0 : r.translators) &&
                ((r = Object.assign(Object.assign({}, r), {
                  translators: u.childTranslators,
                })),
                this.nodeMetadata.set(e, r));
            const d = l.text.length;
            if (
              (u.surroundingNewlines &&
                this.appendNewlines(+u.surroundingNewlines),
              u.prefix && this.appendResult(u.prefix),
              "string" == typeof u.content)
            )
              this.appendResult(u.content, void 0, u.spaceIfRepeatingChar);
            else {
              const t = l.text.length;
              for (const t of (0, i.getChildNodes)(e))
                this.visitNode(t, !1 === u.recurse, r);
              if (u.postprocess) {
                const n = u.postprocess(
                  Object.assign(
                    Object.assign(
                      {},
                      p || (0, o.createTranslatorContext)(this, e, r)
                    ),
                    { content: l.text.substr(t) }
                  )
                );
                if (n === o.PostProcessResult.RemoveNode)
                  return (
                    "LI" === e.tagName &&
                      (null == r ? void 0 : r.listItemNumber) &&
                      --r.listItemNumber,
                    this.appendResult("", d)
                  );
                "string" == typeof n &&
                  this.appendResult(n, t, u.spaceIfRepeatingChar);
              }
            }
            u.postfix && this.appendResult(u.postfix),
              u.surroundingNewlines &&
                this.appendNewlines(+u.surroundingNewlines);
          }
        }
        (t.Visitor = s),
          (t.getMarkdownForHtmlNodes = function (e, t, r) {
            (0, i.perfStart)("walk");
            const n = new s(e, t, r);
            let o = n.result.text;
            (0, i.perfStop)("walk"),
              e.options.useLinkReferenceDefinitions &&
                (/[^\r\n]/.test(o.slice(-1)) && (o += "\n"),
                n.urlDefinitions.forEach((e, t) => {
                  o += `\n[${t + 1}]: ${e}`;
                }));
            const { maxConsecutiveNewlines: a } = e.options;
            return (
              a &&
                (o = o.replace(
                  new RegExp(
                    String.raw`(?:\r?\n\s*)+((?:\r?\n\s*){${a}})`,
                    "g"
                  ),
                  "$1"
                )),
              (0, i.trimNewLines)(o)
            );
          });
      },
      8701: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = function (e) {
            return e[e.length - 1];
          });
      },
      698: function (e, t, r) {
        "use strict";
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.NodeType =
            t.TextNode =
            t.Node =
            t.valid =
            t.default =
            t.parse =
            t.HTMLElement =
            t.CommentNode =
              void 0);
        var i = r(1271);
        Object.defineProperty(t, "CommentNode", {
          enumerable: !0,
          get: function () {
            return n(i).default;
          },
        });
        var o = r(4382);
        Object.defineProperty(t, "HTMLElement", {
          enumerable: !0,
          get: function () {
            return n(o).default;
          },
        });
        var a = r(8821);
        Object.defineProperty(t, "parse", {
          enumerable: !0,
          get: function () {
            return n(a).default;
          },
        }),
          Object.defineProperty(t, "default", {
            enumerable: !0,
            get: function () {
              return n(a).default;
            },
          });
        var s = r(6389);
        Object.defineProperty(t, "valid", {
          enumerable: !0,
          get: function () {
            return n(s).default;
          },
        });
        var l = r(4936);
        Object.defineProperty(t, "Node", {
          enumerable: !0,
          get: function () {
            return n(l).default;
          },
        });
        var c = r(7923);
        Object.defineProperty(t, "TextNode", {
          enumerable: !0,
          get: function () {
            return n(c).default;
          },
        });
        var u = r(9979);
        Object.defineProperty(t, "NodeType", {
          enumerable: !0,
          get: function () {
            return n(u).default;
          },
        });
      },
      80: function (e, t, r) {
        "use strict";
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        var i = n(r(9979));
        function o(e) {
          return e && e.nodeType === i.default.ELEMENT_NODE;
        }
        function a(e, t) {
          return o(e) ? e.getAttribute(t) : void 0;
        }
        function s(e) {
          return e && e.childNodes;
        }
        function l(e) {
          return e ? e.parentNode : null;
        }
        t.default = {
          isTag: o,
          getAttributeValue: a,
          getName: function (e) {
            return ((e && e.rawTagName) || "").toLowerCase();
          },
          getChildren: s,
          getParent: l,
          getText: function (e) {
            return e.text;
          },
          removeSubsets: function (e) {
            for (var t, r, n, i = e.length; --i > -1; ) {
              for (t = r = e[i], e[i] = null, n = !0; r; ) {
                if (e.indexOf(r) > -1) {
                  (n = !1), e.splice(i, 1);
                  break;
                }
                r = l(r);
              }
              n && (e[i] = t);
            }
            return e;
          },
          existsOne: function e(t, r) {
            return r.some(function (r) {
              return !!o(r) && (t(r) || e(t, s(r)));
            });
          },
          getSiblings: function (e) {
            var t = l(e);
            return t && s(t);
          },
          hasAttrib: function (e, t) {
            return void 0 !== a(e, t);
          },
          findOne: function e(t, r) {
            for (var n = null, i = 0, o = r.length; i < o && !n; i++) {
              var a = r[i];
              if (t(a)) n = a;
              else {
                var l = s(a);
                l && l.length > 0 && (n = e(t, l));
              }
            }
            return n;
          },
          findAll: function e(t, r) {
            for (var n = [], i = 0, a = r.length; i < a; i++)
              if (o(r[i])) {
                t(r[i]) && n.push(r[i]);
                var l = s(r[i]);
                l && (n = n.concat(e(t, l)));
              }
            return n;
          },
        };
      },
      1271: function (e, t, r) {
        "use strict";
        var n,
          i =
            (this && this.__extends) ||
            ((n = function (e, t) {
              return (
                (n =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (e, t) {
                      e.__proto__ = t;
                    }) ||
                  function (e, t) {
                    for (var r in t)
                      Object.prototype.hasOwnProperty.call(t, r) &&
                        (e[r] = t[r]);
                  }),
                n(e, t)
              );
            }),
            function (e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Class extends value " +
                    String(t) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = e;
              }
              n(e, t),
                (e.prototype =
                  null === t
                    ? Object.create(t)
                    : ((r.prototype = t.prototype), new r()));
            }),
          o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, "__esModule", { value: !0 });
        var a = o(r(4936)),
          s = o(r(9979)),
          l = (function (e) {
            function t(t, r, n) {
              var i = e.call(this, r, n) || this;
              return (i.rawText = t), (i.nodeType = s.default.COMMENT_NODE), i;
            }
            return (
              i(t, e),
              (t.prototype.clone = function () {
                return new t(this.rawText, null);
              }),
              Object.defineProperty(t.prototype, "text", {
                get: function () {
                  return this.rawText;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.toString = function () {
                return "\x3c!--".concat(this.rawText, "--\x3e");
              }),
              t
            );
          })(a.default);
        t.default = l;
      },
      4382: function (e, t, r) {
        "use strict";
        var n,
          i =
            (this && this.__extends) ||
            ((n = function (e, t) {
              return (
                (n =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (e, t) {
                      e.__proto__ = t;
                    }) ||
                  function (e, t) {
                    for (var r in t)
                      Object.prototype.hasOwnProperty.call(t, r) &&
                        (e[r] = t[r]);
                  }),
                n(e, t)
              );
            }),
            function (e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Class extends value " +
                    String(t) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = e;
              }
              n(e, t),
                (e.prototype =
                  null === t
                    ? Object.create(t)
                    : ((r.prototype = t.prototype), new r()));
            }),
          o =
            (this && this.__assign) ||
            function () {
              return (
                (o =
                  Object.assign ||
                  function (e) {
                    for (var t, r = 1, n = arguments.length; r < n; r++)
                      for (var i in (t = arguments[r]))
                        Object.prototype.hasOwnProperty.call(t, i) &&
                          (e[i] = t[i]);
                    return e;
                  }),
                o.apply(this, arguments)
              );
            },
          a =
            (this && this.__spreadArray) ||
            function (e, t, r) {
              if (r || 2 === arguments.length)
                for (var n, i = 0, o = t.length; i < o; i++)
                  (!n && i in t) ||
                    (n || (n = Array.prototype.slice.call(t, 0, i)),
                    (n[i] = t[i]));
              return e.concat(n || Array.prototype.slice.call(t));
            },
          s =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.parse = t.base_parse = void 0);
        var l = r(5366),
          c = s(r(6492)),
          u = s(r(8701)),
          p = s(r(80)),
          d = s(r(1271)),
          f = s(r(4936)),
          h = s(r(7923)),
          m = s(r(9979)),
          g = new Set([
            "area",
            "base",
            "br",
            "col",
            "embed",
            "hr",
            "img",
            "input",
            "link",
            "meta",
            "param",
            "source",
            "track",
            "wbr",
          ]);
        function v(e) {
          return JSON.parse(JSON.stringify(c.default.decode(e)));
        }
        var b = new Set();
        !(function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          for (
            var r = function (e) {
                for (var t = 0; t < e.length; t++) {
                  var r = e[t];
                  b.add(r), b.add(r.toUpperCase());
                }
              },
              n = 0,
              i = e;
            n < i.length;
            n++
          ) {
            var o = i[n];
            r(o);
          }
        })(
          ["h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup"],
          ["details", "dialog", "dd", "div", "dt"],
          ["fieldset", "figcaption", "figure", "footer", "form"],
          ["table", "td", "tr"],
          [
            "address",
            "article",
            "aside",
            "blockquote",
            "br",
            "hr",
            "li",
            "main",
            "nav",
            "ol",
            "p",
            "pre",
            "section",
            "ul",
          ]
        );
        var y = (function () {
            function e(e, t) {
              void 0 === e && (e = []),
                void 0 === t &&
                  (t = function () {
                    return null;
                  }),
                (this._set = new Set(e)),
                (this._afterUpdate = t);
            }
            return (
              (e.prototype._validate = function (e) {
                if (/\s/.test(e))
                  throw new Error(
                    "DOMException in DOMTokenList.add: The token '".concat(
                      e,
                      "' contains HTML space characters, which are not valid in tokens."
                    )
                  );
              }),
              (e.prototype.add = function (e) {
                this._validate(e), this._set.add(e), this._afterUpdate(this);
              }),
              (e.prototype.replace = function (e, t) {
                this._validate(t),
                  this._set.delete(e),
                  this._set.add(t),
                  this._afterUpdate(this);
              }),
              (e.prototype.remove = function (e) {
                this._set.delete(e) && this._afterUpdate(this);
              }),
              (e.prototype.toggle = function (e) {
                this._validate(e),
                  this._set.has(e) ? this._set.delete(e) : this._set.add(e),
                  this._afterUpdate(this);
              }),
              (e.prototype.contains = function (e) {
                return this._set.has(e);
              }),
              Object.defineProperty(e.prototype, "length", {
                get: function () {
                  return this._set.size;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (e.prototype.values = function () {
                return this._set.values();
              }),
              Object.defineProperty(e.prototype, "value", {
                get: function () {
                  return Array.from(this._set.values());
                },
                enumerable: !1,
                configurable: !0,
              }),
              (e.prototype.toString = function () {
                return Array.from(this._set.values()).join(" ");
              }),
              e
            );
          })(),
          w = (function (e) {
            function t(t, r, n, i, o) {
              void 0 === n && (n = "");
              var a = e.call(this, i, o) || this;
              if (
                ((a.rawAttrs = n),
                (a.nodeType = m.default.ELEMENT_NODE),
                (a.rawTagName = t),
                (a.rawAttrs = n || ""),
                (a.id = r.id || ""),
                (a.childNodes = []),
                (a.classList = new y(
                  r.class ? r.class.split(/\s+/) : [],
                  function (e) {
                    return a.setAttribute("class", e.toString());
                  }
                )),
                r.id && (n || (a.rawAttrs = 'id="'.concat(r.id, '"'))),
                r.class && !n)
              ) {
                var s = 'class="'.concat(a.classList.toString(), '"');
                a.rawAttrs ? (a.rawAttrs += " ".concat(s)) : (a.rawAttrs = s);
              }
              return a;
            }
            return (
              i(t, e),
              (t.prototype.quoteAttribute = function (e) {
                return null == e
                  ? "null"
                  : JSON.stringify(e.replace(/"/g, "&quot;"));
              }),
              (t.prototype.removeChild = function (e) {
                return (
                  (this.childNodes = this.childNodes.filter(function (t) {
                    return t !== e;
                  })),
                  this
                );
              }),
              (t.prototype.exchangeChild = function (e, t) {
                var r = this.childNodes;
                return (
                  (this.childNodes = r.map(function (r) {
                    return r === e ? t : r;
                  })),
                  this
                );
              }),
              Object.defineProperty(t.prototype, "tagName", {
                get: function () {
                  return this.rawTagName
                    ? this.rawTagName.toUpperCase()
                    : this.rawTagName;
                },
                set: function (e) {
                  this.rawTagName = e.toLowerCase();
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "localName", {
                get: function () {
                  return this.rawTagName.toLowerCase();
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "isVoidElement", {
                get: function () {
                  return g.has(this.localName);
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "rawText", {
                get: function () {
                  return this.childNodes.reduce(function (e, t) {
                    return e + t.rawText;
                  }, "");
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "textContent", {
                get: function () {
                  return v(this.rawText);
                },
                set: function (e) {
                  var t = [new h.default(e, this)];
                  this.childNodes = t;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "text", {
                get: function () {
                  return v(this.rawText);
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "structuredText", {
                get: function () {
                  var e = [],
                    t = [e];
                  return (
                    (function r(n) {
                      if (n.nodeType === m.default.ELEMENT_NODE)
                        b.has(n.rawTagName)
                          ? (e.length > 0 && t.push((e = [])),
                            n.childNodes.forEach(r),
                            e.length > 0 && t.push((e = [])))
                          : n.childNodes.forEach(r);
                      else if (n.nodeType === m.default.TEXT_NODE)
                        if (n.isWhitespace) e.prependWhitespace = !0;
                        else {
                          var i = n.trimmedText;
                          e.prependWhitespace &&
                            ((i = " ".concat(i)), (e.prependWhitespace = !1)),
                            e.push(i);
                        }
                    })(this),
                    t
                      .map(function (e) {
                        return e.join("").replace(/\s{2,}/g, " ");
                      })
                      .join("\n")
                      .replace(/\s+$/, "")
                  );
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.toString = function () {
                var e = this.rawTagName;
                if (e) {
                  var t = this.rawAttrs ? " ".concat(this.rawAttrs) : "";
                  return this.isVoidElement
                    ? "<".concat(e).concat(t, ">")
                    : "<"
                        .concat(e)
                        .concat(t, ">")
                        .concat(this.innerHTML, "</")
                        .concat(e, ">");
                }
                return this.innerHTML;
              }),
              Object.defineProperty(t.prototype, "innerHTML", {
                get: function () {
                  return this.childNodes
                    .map(function (e) {
                      return e.toString();
                    })
                    .join("");
                },
                set: function (e) {
                  var t = L(e),
                    r = t.childNodes.length
                      ? t.childNodes
                      : [new h.default(e, this)];
                  O(r, this), O(this.childNodes, null), (this.childNodes = r);
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.set_content = function (e, t) {
                if ((void 0 === t && (t = {}), e instanceof f.default)) e = [e];
                else if ("string" == typeof e) {
                  var r = L(e, t);
                  e = r.childNodes.length
                    ? r.childNodes
                    : [new h.default(e, this)];
                }
                return (
                  O(this.childNodes, null),
                  O(e, this),
                  (this.childNodes = e),
                  this
                );
              }),
              (t.prototype.replaceWith = function () {
                for (var e = this, t = [], r = 0; r < arguments.length; r++)
                  t[r] = arguments[r];
                var n = this.parentNode,
                  i = t
                    .map(function (t) {
                      if (t instanceof f.default) return [t];
                      if ("string" == typeof t) {
                        var r = L(t);
                        return r.childNodes.length
                          ? r.childNodes
                          : [new h.default(t, e)];
                      }
                      return [];
                    })
                    .flat(),
                  o = n.childNodes.findIndex(function (t) {
                    return t === e;
                  });
                O([this], null),
                  (n.childNodes = a(
                    a(a([], n.childNodes.slice(0, o), !0), O(i, n), !0),
                    n.childNodes.slice(o + 1),
                    !0
                  ));
              }),
              Object.defineProperty(t.prototype, "outerHTML", {
                get: function () {
                  return this.toString();
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.trimRight = function (e) {
                for (var t = 0; t < this.childNodes.length; t++) {
                  var r = this.childNodes[t];
                  if (r.nodeType === m.default.ELEMENT_NODE) r.trimRight(e);
                  else {
                    var n = r.rawText.search(e);
                    n > -1 &&
                      ((r.rawText = r.rawText.substr(0, n)),
                      (this.childNodes.length = t + 1));
                  }
                }
                return this;
              }),
              Object.defineProperty(t.prototype, "structure", {
                get: function () {
                  var e = [],
                    t = 0;
                  function r(r) {
                    e.push("  ".repeat(t) + r);
                  }
                  return (
                    (function e(n) {
                      var i = n.id ? "#".concat(n.id) : "",
                        o = n.classList.length
                          ? ".".concat(n.classList.value.join("."))
                          : "";
                      r("".concat(n.rawTagName).concat(i).concat(o)),
                        t++,
                        n.childNodes.forEach(function (t) {
                          t.nodeType === m.default.ELEMENT_NODE
                            ? e(t)
                            : t.nodeType === m.default.TEXT_NODE &&
                              (t.isWhitespace || r("#text"));
                        }),
                        t--;
                    })(this),
                    e.join("\n")
                  );
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.removeWhitespace = function () {
                var e = this,
                  t = 0;
                return (
                  this.childNodes.forEach(function (r) {
                    if (r.nodeType === m.default.TEXT_NODE) {
                      if (r.isWhitespace) return;
                      r.rawText = r.trimmedRawText;
                    } else r.nodeType === m.default.ELEMENT_NODE && r.removeWhitespace();
                    e.childNodes[t++] = r;
                  }),
                  (this.childNodes.length = t),
                  this
                );
              }),
              (t.prototype.querySelectorAll = function (e) {
                return (0, l.selectAll)(e, this, {
                  xmlMode: !0,
                  adapter: p.default,
                });
              }),
              (t.prototype.querySelector = function (e) {
                return (0, l.selectOne)(e, this, {
                  xmlMode: !0,
                  adapter: p.default,
                });
              }),
              (t.prototype.getElementsByTagName = function (e) {
                for (
                  var t = e.toUpperCase(), r = [], n = [], i = this, o = 0;
                  void 0 !== o;

                ) {
                  var a = void 0;
                  do {
                    a = i.childNodes[o++];
                  } while (o < i.childNodes.length && void 0 === a);
                  void 0 !== a
                    ? a.nodeType === m.default.ELEMENT_NODE &&
                      (("*" !== e && a.tagName !== t) || r.push(a),
                      a.childNodes.length > 0 && (n.push(o), (i = a), (o = 0)))
                    : ((i = i.parentNode), (o = n.pop()));
                }
                return r;
              }),
              (t.prototype.getElementById = function (e) {
                for (var t = [], r = this, n = 0; void 0 !== n; ) {
                  var i = void 0;
                  do {
                    i = r.childNodes[n++];
                  } while (n < r.childNodes.length && void 0 === i);
                  if (void 0 !== i) {
                    if (i.nodeType === m.default.ELEMENT_NODE) {
                      if (i.id === e) return i;
                      i.childNodes.length > 0 && (t.push(n), (r = i), (n = 0));
                    }
                  } else (r = r.parentNode), (n = t.pop());
                }
                return null;
              }),
              (t.prototype.closest = function (e) {
                var t = new Map(),
                  r = this,
                  n = null;
                function i(e, r) {
                  for (var n = null, o = 0, a = r.length; o < a && !n; o++) {
                    var s = r[o];
                    if (e(s)) n = s;
                    else {
                      var l = t.get(s);
                      l && (n = i(e, [l]));
                    }
                  }
                  return n;
                }
                for (; r; ) t.set(r, n), (n = r), (r = r.parentNode);
                for (r = this; r; ) {
                  var a = (0, l.selectOne)(e, r, {
                    xmlMode: !0,
                    adapter: o(o({}, p.default), {
                      getChildren: function (e) {
                        var r = t.get(e);
                        return r && [r];
                      },
                      getSiblings: function (e) {
                        return [e];
                      },
                      findOne: i,
                      findAll: function () {
                        return [];
                      },
                    }),
                  });
                  if (a) return a;
                  r = r.parentNode;
                }
                return null;
              }),
              (t.prototype.appendChild = function (e) {
                return (
                  e.remove(), this.childNodes.push(e), (e.parentNode = this), e
                );
              }),
              Object.defineProperty(t.prototype, "firstChild", {
                get: function () {
                  return this.childNodes[0];
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "lastChild", {
                get: function () {
                  return (0, u.default)(this.childNodes);
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "attrs", {
                get: function () {
                  if (this._attrs) return this._attrs;
                  this._attrs = {};
                  var e = this.rawAttributes;
                  for (var t in e) {
                    var r = e[t] || "";
                    this._attrs[t.toLowerCase()] = v(r);
                  }
                  return this._attrs;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "attributes", {
                get: function () {
                  var e = {},
                    t = this.rawAttributes;
                  for (var r in t) {
                    var n = t[r] || "";
                    e[r] = v(n);
                  }
                  return e;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "rawAttributes", {
                get: function () {
                  if (this._rawAttrs) return this._rawAttrs;
                  var e = {};
                  if (this.rawAttrs)
                    for (
                      var t =
                          /([a-zA-Z()#][a-zA-Z0-9-_:()#]*)(?:\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+))?/g,
                        r = void 0;
                      (r = t.exec(this.rawAttrs));

                    ) {
                      var n = r[1],
                        i = r[2] || null;
                      !i ||
                        ("'" !== i[0] && '"' !== i[0]) ||
                        (i = i.slice(1, i.length - 1)),
                        (e[n] = i);
                    }
                  return (this._rawAttrs = e), e;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.removeAttribute = function (e) {
                var t = this.rawAttributes;
                return (
                  delete t[e],
                  this._attrs && delete this._attrs[e],
                  (this.rawAttrs = Object.keys(t)
                    .map(function (e) {
                      var r = JSON.stringify(t[e]);
                      return void 0 === r || "null" === r
                        ? e
                        : "".concat(e, "=").concat(r);
                    })
                    .join(" ")),
                  "id" === e && (this.id = ""),
                  this
                );
              }),
              (t.prototype.hasAttribute = function (e) {
                return e.toLowerCase() in this.attrs;
              }),
              (t.prototype.getAttribute = function (e) {
                return this.attrs[e.toLowerCase()];
              }),
              (t.prototype.setAttribute = function (e, t) {
                var r = this;
                if (arguments.length < 2)
                  throw new Error(
                    "Failed to execute 'setAttribute' on 'Element'"
                  );
                var n = e.toLowerCase(),
                  i = this.rawAttributes;
                for (var o in i)
                  if (o.toLowerCase() === n) {
                    e = o;
                    break;
                  }
                (i[e] = String(t)),
                  this._attrs && (this._attrs[n] = v(i[e])),
                  (this.rawAttrs = Object.keys(i)
                    .map(function (e) {
                      var t = r.quoteAttribute(i[e]);
                      return "null" === t || '""' === t
                        ? e
                        : "".concat(e, "=").concat(t);
                    })
                    .join(" ")),
                  "id" === e && (this.id = t);
              }),
              (t.prototype.setAttributes = function (e) {
                var t = this;
                return (
                  this._attrs && delete this._attrs,
                  this._rawAttrs && delete this._rawAttrs,
                  (this.rawAttrs = Object.keys(e)
                    .map(function (r) {
                      var n = e[r];
                      return "null" === n || '""' === n
                        ? r
                        : "".concat(r, "=").concat(t.quoteAttribute(String(n)));
                    })
                    .join(" ")),
                  this
                );
              }),
              (t.prototype.insertAdjacentHTML = function (e, t) {
                var r,
                  n,
                  i,
                  o = this;
                if (arguments.length < 2)
                  throw new Error("2 arguments required");
                var s = L(t);
                if ("afterend" === e) {
                  var l = this.parentNode.childNodes.findIndex(function (e) {
                    return e === o;
                  });
                  O(s.childNodes, this.parentNode),
                    (r = this.parentNode.childNodes).splice.apply(
                      r,
                      a([l + 1, 0], s.childNodes, !1)
                    );
                } else if ("afterbegin" === e)
                  O(s.childNodes, this),
                    (n = this.childNodes).unshift.apply(n, s.childNodes);
                else if ("beforeend" === e)
                  s.childNodes.forEach(function (e) {
                    o.appendChild(e);
                  });
                else {
                  if ("beforebegin" !== e)
                    throw new Error(
                      "The value provided ('".concat(
                        e,
                        "') is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'"
                      )
                    );
                  (l = this.parentNode.childNodes.findIndex(function (e) {
                    return e === o;
                  })),
                    O(s.childNodes, this.parentNode),
                    (i = this.parentNode.childNodes).splice.apply(
                      i,
                      a([l, 0], s.childNodes, !1)
                    );
                }
                return this;
              }),
              Object.defineProperty(t.prototype, "nextSibling", {
                get: function () {
                  if (this.parentNode) {
                    for (
                      var e = this.parentNode.childNodes, t = 0;
                      t < e.length;

                    )
                      if (this === e[t++]) return e[t] || null;
                    return null;
                  }
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "nextElementSibling", {
                get: function () {
                  if (this.parentNode) {
                    for (
                      var e = this.parentNode.childNodes, r = 0, n = !1;
                      r < e.length;

                    ) {
                      var i = e[r++];
                      if (n) {
                        if (i instanceof t) return i || null;
                      } else this === i && (n = !0);
                    }
                    return null;
                  }
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "previousSibling", {
                get: function () {
                  if (this.parentNode) {
                    for (
                      var e = this.parentNode.childNodes, t = e.length;
                      t > 0;

                    )
                      if (this === e[--t]) return e[t - 1] || null;
                    return null;
                  }
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "previousElementSibling", {
                get: function () {
                  if (this.parentNode) {
                    for (
                      var e = this.parentNode.childNodes, r = e.length, n = !1;
                      r > 0;

                    ) {
                      var i = e[--r];
                      if (n) {
                        if (i instanceof t) return i || null;
                      } else this === i && (n = !0);
                    }
                    return null;
                  }
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "classNames", {
                get: function () {
                  return this.classList.toString();
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.clone = function () {
                return L(this.toString()).firstChild;
              }),
              t
            );
          })(f.default);
        t.default = w;
        var E =
            /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][-.:0-9_a-zA-Z]*)((?:\s+[^>]*?(?:(?:'[^']*')|(?:"[^"]*"))?)*)\s*(\/?)>/g,
          x = /(?:^|\s)(id|class)\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+)/gi,
          T = {
            area: !0,
            AREA: !0,
            base: !0,
            BASE: !0,
            br: !0,
            BR: !0,
            col: !0,
            COL: !0,
            hr: !0,
            HR: !0,
            img: !0,
            IMG: !0,
            input: !0,
            INPUT: !0,
            link: !0,
            LINK: !0,
            meta: !0,
            META: !0,
            source: !0,
            SOURCE: !0,
            embed: !0,
            EMBED: !0,
            param: !0,
            PARAM: !0,
            track: !0,
            TRACK: !0,
            wbr: !0,
            WBR: !0,
          },
          k = {
            li: { li: !0, LI: !0 },
            LI: { li: !0, LI: !0 },
            p: { p: !0, div: !0, P: !0, DIV: !0 },
            P: { p: !0, div: !0, P: !0, DIV: !0 },
            b: { div: !0, DIV: !0 },
            B: { div: !0, DIV: !0 },
            td: { td: !0, th: !0, TD: !0, TH: !0 },
            TD: { td: !0, th: !0, TD: !0, TH: !0 },
            th: { td: !0, th: !0, TD: !0, TH: !0 },
            TH: { td: !0, th: !0, TD: !0, TH: !0 },
            h1: { h1: !0, H1: !0 },
            H1: { h1: !0, H1: !0 },
            h2: { h2: !0, H2: !0 },
            H2: { h2: !0, H2: !0 },
            h3: { h3: !0, H3: !0 },
            H3: { h3: !0, H3: !0 },
            h4: { h4: !0, H4: !0 },
            H4: { h4: !0, H4: !0 },
            h5: { h5: !0, H5: !0 },
            H5: { h5: !0, H5: !0 },
            h6: { h6: !0, H6: !0 },
            H6: { h6: !0, H6: !0 },
          },
          _ = {
            li: { ul: !0, ol: !0, UL: !0, OL: !0 },
            LI: { ul: !0, ol: !0, UL: !0, OL: !0 },
            a: { div: !0, DIV: !0 },
            A: { div: !0, DIV: !0 },
            b: { div: !0, DIV: !0 },
            B: { div: !0, DIV: !0 },
            i: { div: !0, DIV: !0 },
            I: { div: !0, DIV: !0 },
            p: { div: !0, DIV: !0 },
            P: { div: !0, DIV: !0 },
            td: { tr: !0, table: !0, TR: !0, TABLE: !0 },
            TD: { tr: !0, table: !0, TR: !0, TABLE: !0 },
            th: { tr: !0, table: !0, TR: !0, TABLE: !0 },
            TH: { tr: !0, table: !0, TR: !0, TABLE: !0 },
          },
          A = "documentfragmentcontainer";
        function N(e, t) {
          void 0 === t && (t = { lowerCaseTagName: !1, comment: !1 });
          var r = t.blockTextElements || {
              script: !0,
              noscript: !0,
              style: !0,
              pre: !0,
            },
            n = Object.keys(r),
            i = n.map(function (e) {
              return new RegExp("^".concat(e, "$"), "i");
            }),
            o = n
              .filter(function (e) {
                return r[e];
              })
              .map(function (e) {
                return new RegExp("^".concat(e, "$"), "i");
              });
          function a(e) {
            return o.some(function (t) {
              return t.test(e);
            });
          }
          function s(e) {
            return i.some(function (t) {
              return t.test(e);
            });
          }
          var l,
            c = function (e, t) {
              return [e - N, t - N];
            },
            p = new w(null, {}, "", null, [0, e.length]),
            f = p,
            m = [p],
            g = -1,
            v = void 0;
          e = "<".concat(A, ">").concat(e, "</").concat(A, ">");
          for (
            var b = t.lowerCaseTagName,
              y = e.length - (A.length + 2),
              N = A.length + 2;
            (l = E.exec(e));

          ) {
            var L = l[0],
              O = l[1],
              S = l[2],
              C = l[3],
              D = l[4],
              q = L.length,
              R = E.lastIndex - q,
              j = E.lastIndex;
            if (g > -1 && g + q < j) {
              var P = e.substring(g, R);
              f.appendChild(new h.default(P, f, c(g, R)));
            }
            if (((g = E.lastIndex), S !== A))
              if ("!" !== L[1]) {
                if ((b && (S = S.toLowerCase()), !O)) {
                  for (var B = {}, F = void 0; (F = x.exec(C)); ) {
                    var M = F[1],
                      I = F[2],
                      U = "'" === I[0] || '"' === I[0];
                    B[M.toLowerCase()] = U ? I.slice(1, I.length - 1) : I;
                  }
                  var V = f.rawTagName;
                  !D && k[V] && k[V][S] && (m.pop(), (f = (0, u.default)(m))),
                    ("a" !== S && "A" !== S) ||
                      (void 0 !== v && (m.splice(v), (f = (0, u.default)(m))),
                      (v = m.length));
                  var H = E.lastIndex,
                    G = H - q;
                  if (
                    ((f = f.appendChild(
                      new w(S, B, C.slice(1), null, c(G, H))
                    )),
                    m.push(f),
                    s(S))
                  ) {
                    var K = "</".concat(S, ">"),
                      $ = b
                        ? e.toLocaleLowerCase().indexOf(K, E.lastIndex)
                        : e.indexOf(K, E.lastIndex),
                      z = -1 === $ ? y : $;
                    a(S) &&
                      (P = e.substring(H, z)).length > 0 &&
                      /\S/.test(P) &&
                      f.appendChild(new h.default(P, f, c(H, z))),
                      -1 === $
                        ? (g = E.lastIndex = e.length + 1)
                        : ((g = E.lastIndex = $ + K.length), (O = "/"));
                  }
                }
                if (O || D || T[S])
                  for (;;) {
                    if (
                      (("a" !== S && "A" !== S) || (v = void 0),
                      f.rawTagName === S)
                    ) {
                      (f.range[1] = c(-1, Math.max(g, j))[1]),
                        m.pop(),
                        (f = (0, u.default)(m));
                      break;
                    }
                    if (((V = f.tagName), !_[V] || !_[V][S])) break;
                    m.pop(), (f = (0, u.default)(m));
                  }
              } else if (t.comment) {
                P = e.substring(R + 4, j - 3);
                f.appendChild(new d.default(P, f, c(R, j)));
              }
          }
          return m;
        }
        function L(e, t) {
          void 0 === t && (t = { lowerCaseTagName: !1, comment: !1 });
          for (
            var r = N(e, t),
              n = r[0],
              i = function () {
                var e = r.pop(),
                  n = (0, u.default)(r);
                e.parentNode &&
                  e.parentNode.parentNode &&
                  (e.parentNode === n && e.tagName === n.tagName
                    ? !0 !== t.parseNoneClosedTags &&
                      (n.removeChild(e),
                      e.childNodes.forEach(function (e) {
                        n.parentNode.appendChild(e);
                      }),
                      r.pop())
                    : !0 !== t.parseNoneClosedTags &&
                      (n.removeChild(e),
                      e.childNodes.forEach(function (e) {
                        n.appendChild(e);
                      })));
              };
            r.length > 1;

          )
            i();
          return n;
        }
        function O(e, t) {
          return e.map(function (e) {
            return (e.parentNode = t), e;
          });
        }
        (t.base_parse = N), (t.parse = L);
      },
      4936: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var n = r(6492),
          i = (function () {
            function e(e, t) {
              void 0 === e && (e = null),
                (this.parentNode = e),
                (this.childNodes = []),
                Object.defineProperty(this, "range", {
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                  value: null != t ? t : [-1, -1],
                });
            }
            return (
              (e.prototype.remove = function () {
                var e = this;
                if (this.parentNode) {
                  var t = this.parentNode.childNodes;
                  (this.parentNode.childNodes = t.filter(function (t) {
                    return e !== t;
                  })),
                    (this.parentNode = null);
                }
                return this;
              }),
              Object.defineProperty(e.prototype, "innerText", {
                get: function () {
                  return this.rawText;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "textContent", {
                get: function () {
                  return (0, n.decode)(this.rawText);
                },
                set: function (e) {
                  this.rawText = (0, n.encode)(e);
                },
                enumerable: !1,
                configurable: !0,
              }),
              e
            );
          })();
        t.default = i;
      },
      7923: function (e, t, r) {
        "use strict";
        var n,
          i =
            (this && this.__extends) ||
            ((n = function (e, t) {
              return (
                (n =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (e, t) {
                      e.__proto__ = t;
                    }) ||
                  function (e, t) {
                    for (var r in t)
                      Object.prototype.hasOwnProperty.call(t, r) &&
                        (e[r] = t[r]);
                  }),
                n(e, t)
              );
            }),
            function (e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Class extends value " +
                    String(t) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = e;
              }
              n(e, t),
                (e.prototype =
                  null === t
                    ? Object.create(t)
                    : ((r.prototype = t.prototype), new r()));
            }),
          o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, "__esModule", { value: !0 });
        var a = r(6492),
          s = o(r(4936)),
          l = o(r(9979)),
          c = (function (e) {
            function t(t, r, n) {
              var i = e.call(this, r, n) || this;
              return (i.nodeType = l.default.TEXT_NODE), (i._rawText = t), i;
            }
            return (
              i(t, e),
              (t.prototype.clone = function () {
                return new t(this._rawText, null);
              }),
              Object.defineProperty(t.prototype, "rawText", {
                get: function () {
                  return this._rawText;
                },
                set: function (e) {
                  (this._rawText = e),
                    (this._trimmedRawText = void 0),
                    (this._trimmedText = void 0);
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "trimmedRawText", {
                get: function () {
                  return (
                    void 0 !== this._trimmedRawText ||
                      (this._trimmedRawText = u(this.rawText)),
                    this._trimmedRawText
                  );
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "trimmedText", {
                get: function () {
                  return (
                    void 0 !== this._trimmedText ||
                      (this._trimmedText = u(this.text)),
                    this._trimmedText
                  );
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "text", {
                get: function () {
                  return (0, a.decode)(this.rawText);
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "isWhitespace", {
                get: function () {
                  return /^(\s|&nbsp;)*$/.test(this.rawText);
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.toString = function () {
                return this.rawText;
              }),
              t
            );
          })(s.default);
        function u(e) {
          for (var t, r, n = 0; n >= 0 && n < e.length; )
            /\S/.test(e[n]) &&
              (void 0 === t
                ? ((t = n), (n = e.length))
                : ((r = n), (n = void 0))),
              void 0 === t ? n++ : n--;
          void 0 === t && (t = 0), void 0 === r && (r = e.length - 1);
          var i = t > 0 && /[^\S\r\n]/.test(e[t - 1]),
            o = r < e.length - 1 && /[^\S\r\n]/.test(e[r + 1]);
          return (i ? " " : "") + e.slice(t, r + 1) + (o ? " " : "");
        }
        t.default = c;
      },
      9979: (e, t) => {
        "use strict";
        var r;
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (function (e) {
            (e[(e.ELEMENT_NODE = 1)] = "ELEMENT_NODE"),
              (e[(e.TEXT_NODE = 3)] = "TEXT_NODE"),
              (e[(e.COMMENT_NODE = 8)] = "COMMENT_NODE");
          })(r || (r = {})),
          (t.default = r);
      },
      8821: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = r(4382);
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return n.parse;
          },
        });
      },
      6389: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var n = r(4382);
        t.default = function (e, t) {
          void 0 === t && (t = { lowerCaseTagName: !1, comment: !1 });
          var r = (0, n.base_parse)(e, t);
          return Boolean(1 === r.length);
        };
      },
      9769: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.compile = void 0);
        var n = r(1073);
        t.compile = function (e) {
          var t = e[0],
            r = e[1] - 1;
          if (r < 0 && t <= 0) return n.falseFunc;
          if (-1 === t)
            return function (e) {
              return e <= r;
            };
          if (0 === t)
            return function (e) {
              return e === r;
            };
          if (1 === t)
            return r < 0
              ? n.trueFunc
              : function (e) {
                  return e >= r;
                };
          var i = Math.abs(t),
            o = ((r % i) + i) % i;
          return t > 1
            ? function (e) {
                return e >= r && e % i === o;
              }
            : function (e) {
                return e <= r && e % i === o;
              };
        };
      },
      7540: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.compile = t.parse = void 0);
        var n = r(7766);
        Object.defineProperty(t, "parse", {
          enumerable: !0,
          get: function () {
            return n.parse;
          },
        });
        var i = r(9769);
        Object.defineProperty(t, "compile", {
          enumerable: !0,
          get: function () {
            return i.compile;
          },
        }),
          (t.default = function (e) {
            return (0, i.compile)((0, n.parse)(e));
          });
      },
      7766: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.parse = void 0);
        var r = new Set([9, 10, 12, 13, 32]),
          n = "0".charCodeAt(0),
          i = "9".charCodeAt(0);
        t.parse = function (e) {
          if ("even" === (e = e.trim().toLowerCase())) return [2, 0];
          if ("odd" === e) return [2, 1];
          var t = 0,
            o = 0,
            a = l(),
            s = c();
          if (
            (t < e.length &&
              "n" === e.charAt(t) &&
              (t++,
              (o = a * (null != s ? s : 1)),
              u(),
              t < e.length ? ((a = l()), u(), (s = c())) : (a = s = 0)),
            null === s || t < e.length)
          )
            throw new Error("n-th rule couldn't be parsed ('" + e + "')");
          return [o, a * s];
          function l() {
            return "-" === e.charAt(t)
              ? (t++, -1)
              : ("+" === e.charAt(t) && t++, 1);
          }
          function c() {
            for (
              var r = t, o = 0;
              t < e.length && e.charCodeAt(t) >= n && e.charCodeAt(t) <= i;

            )
              (o = 10 * o + (e.charCodeAt(t) - n)), t++;
            return t === r ? null : o;
          }
          function u() {
            for (; t < e.length && r.has(e.charCodeAt(t)); ) t++;
          }
        };
      },
      2985: function (e) {
        var t;
        "undefined" != typeof self && self,
          (t = function () {
            return (function (e) {
              var t = {};
              function r(n) {
                if (t[n]) return t[n].exports;
                var i = (t[n] = { i: n, l: !1, exports: {} });
                return (
                  e[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports
                );
              }
              return (
                (r.m = e),
                (r.c = t),
                (r.d = function (e, t, n) {
                  r.o(e, t) ||
                    Object.defineProperty(e, t, {
                      configurable: !1,
                      enumerable: !0,
                      get: n,
                    });
                }),
                (r.n = function (e) {
                  var t =
                    e && e.__esModule
                      ? function () {
                          return e.default;
                        }
                      : function () {
                          return e;
                        };
                  return r.d(t, "a", t), t;
                }),
                (r.o = function (e, t) {
                  return Object.prototype.hasOwnProperty.call(e, t);
                }),
                (r.p = ""),
                r((r.s = 11))
              );
            })([
              function (e, t, r) {
                "use strict";
                var n = Array.prototype,
                  i = Object.prototype,
                  o = {
                    "&": "&amp;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "<": "&lt;",
                    ">": "&gt;",
                  },
                  a = /[&"'<>]/g;
                function s(e, t) {
                  return i.hasOwnProperty.call(e, t);
                }
                function l(e) {
                  return o[e];
                }
                function c(e, t, r) {
                  var n, i, o;
                  if (
                    (e instanceof Error &&
                      (e = (i = e).name + ": " + i.message),
                    Object.setPrototypeOf
                      ? ((n = new Error(e)),
                        Object.setPrototypeOf(n, c.prototype))
                      : ((n = this),
                        Object.defineProperty(n, "message", {
                          enumerable: !1,
                          writable: !0,
                          value: e,
                        })),
                    Object.defineProperty(n, "name", {
                      value: "Template render error",
                    }),
                    Error.captureStackTrace &&
                      Error.captureStackTrace(n, this.constructor),
                    i)
                  ) {
                    var a = Object.getOwnPropertyDescriptor(i, "stack");
                    (o =
                      a &&
                      (a.get ||
                        function () {
                          return a.value;
                        })) ||
                      (o = function () {
                        return i.stack;
                      });
                  } else {
                    var s = new Error(e).stack;
                    o = function () {
                      return s;
                    };
                  }
                  return (
                    Object.defineProperty(n, "stack", {
                      get: function () {
                        return o.call(n);
                      },
                    }),
                    Object.defineProperty(n, "cause", { value: i }),
                    (n.lineno = t),
                    (n.colno = r),
                    (n.firstUpdate = !0),
                    (n.Update = function (e) {
                      var t = "(" + (e || "unknown path") + ")";
                      return (
                        this.firstUpdate &&
                          (this.lineno && this.colno
                            ? (t +=
                                " [Line " +
                                this.lineno +
                                ", Column " +
                                this.colno +
                                "]")
                            : this.lineno &&
                              (t += " [Line " + this.lineno + "]")),
                        (t += "\n "),
                        this.firstUpdate && (t += " "),
                        (this.message = t + (this.message || "")),
                        (this.firstUpdate = !1),
                        this
                      );
                    }),
                    n
                  );
                }
                function u(e) {
                  return "[object Function]" === i.toString.call(e);
                }
                function p(e) {
                  return "[object Array]" === i.toString.call(e);
                }
                function d(e) {
                  return "[object String]" === i.toString.call(e);
                }
                function f(e) {
                  return "[object Object]" === i.toString.call(e);
                }
                function h(e) {
                  var t,
                    r = (t = e)
                      ? "string" == typeof t
                        ? t.split(".")
                        : [t]
                      : [];
                  return function (e) {
                    for (var t = e, n = 0; n < r.length; n++) {
                      var i = r[n];
                      if (!s(t, i)) return;
                      t = t[i];
                    }
                    return t;
                  };
                }
                function m(e) {
                  return Array.prototype.slice.call(e);
                }
                function g(e, t, r) {
                  return Array.prototype.indexOf.call(e || [], t, r);
                }
                function v(e) {
                  var t = [];
                  for (var r in e) s(e, r) && t.push(r);
                  return t;
                }
                ((t = e.exports = {}).hasOwnProp = s),
                  (t._prettifyError = function (e, r, n) {
                    if (
                      (n.Update || (n = new t.TemplateError(n)),
                      n.Update(e),
                      !r)
                    ) {
                      var i = n;
                      (n = new Error(i.message)).name = i.name;
                    }
                    return n;
                  }),
                  Object.setPrototypeOf
                    ? Object.setPrototypeOf(c.prototype, Error.prototype)
                    : (c.prototype = Object.create(Error.prototype, {
                        constructor: { value: c },
                      })),
                  (t.TemplateError = c),
                  (t.escape = function (e) {
                    return e.replace(a, l);
                  }),
                  (t.isFunction = u),
                  (t.isArray = p),
                  (t.isString = d),
                  (t.isObject = f),
                  (t.getAttrGetter = h),
                  (t.groupBy = function (e, t, r) {
                    for (
                      var n = {}, i = u(t) ? t : h(t), o = 0;
                      o < e.length;
                      o++
                    ) {
                      var a = e[o],
                        s = i(a, o);
                      if (void 0 === s && !0 === r)
                        throw new TypeError(
                          'groupby: attribute "' + t + '" resolved to undefined'
                        );
                      (n[s] || (n[s] = [])).push(a);
                    }
                    return n;
                  }),
                  (t.toArray = m),
                  (t.without = function (e) {
                    var t = [];
                    if (!e) return t;
                    for (
                      var r = e.length, n = m(arguments).slice(1), i = -1;
                      ++i < r;

                    )
                      -1 === g(n, e[i]) && t.push(e[i]);
                    return t;
                  }),
                  (t.repeat = function (e, t) {
                    for (var r = "", n = 0; n < t; n++) r += e;
                    return r;
                  }),
                  (t.each = function (e, t, r) {
                    if (null != e)
                      if (n.forEach && e.forEach === n.forEach) e.forEach(t, r);
                      else if (e.length === +e.length)
                        for (var i = 0, o = e.length; i < o; i++)
                          t.call(r, e[i], i, e);
                  }),
                  (t.map = function (e, t) {
                    var r = [];
                    if (null == e) return r;
                    if (n.map && e.map === n.map) return e.map(t);
                    for (var i = 0; i < e.length; i++) r[r.length] = t(e[i], i);
                    return e.length === +e.length && (r.length = e.length), r;
                  }),
                  (t.asyncIter = function (e, t, r) {
                    var n = -1;
                    !(function i() {
                      ++n < e.length ? t(e[n], n, i, r) : r();
                    })();
                  }),
                  (t.asyncFor = function (e, t, r) {
                    var n = v(e || {}),
                      i = n.length,
                      o = -1;
                    !(function a() {
                      o++;
                      var s = n[o];
                      o < i ? t(s, e[s], o, i, a) : r();
                    })();
                  }),
                  (t.indexOf = g),
                  (t.keys = v),
                  (t._entries = function (e) {
                    return v(e).map(function (t) {
                      return [t, e[t]];
                    });
                  }),
                  (t._values = function (e) {
                    return v(e).map(function (t) {
                      return e[t];
                    });
                  }),
                  (t._assign = t.extend =
                    function (e, t) {
                      return (
                        (e = e || {}),
                        v(t).forEach(function (r) {
                          e[r] = t[r];
                        }),
                        e
                      );
                    }),
                  (t.inOperator = function (e, t) {
                    if (p(t) || d(t)) return -1 !== t.indexOf(e);
                    if (f(t)) return e in t;
                    throw new Error(
                      'Cannot use "in" operator to search for "' +
                        e +
                        '" in unexpected types.'
                    );
                  });
              },
              function (e, t, r) {
                "use strict";
                function n(e, t) {
                  for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    (n.enumerable = n.enumerable || !1),
                      (n.configurable = !0),
                      "value" in n && (n.writable = !0),
                      Object.defineProperty(e, n.key, n);
                  }
                }
                function i(e, t, r) {
                  return t && n(e.prototype, t), r && n(e, r), e;
                }
                function o(e, t) {
                  (e.prototype = Object.create(t.prototype)),
                    (e.prototype.constructor = e),
                    a(e, t);
                }
                function a(e, t) {
                  return (
                    (a =
                      Object.setPrototypeOf ||
                      function (e, t) {
                        return (e.__proto__ = t), e;
                      }),
                    a(e, t)
                  );
                }
                var s = r(16),
                  l = r(0);
                function c(e, t, r) {
                  (r = r || {}),
                    l.keys(r).forEach(function (t) {
                      var n, i;
                      r[t] =
                        ((n = e.prototype[t]),
                        (i = r[t]),
                        "function" != typeof n || "function" != typeof i
                          ? i
                          : function () {
                              var e = this.parent;
                              this.parent = n;
                              var t = i.apply(this, arguments);
                              return (this.parent = e), t;
                            });
                    });
                  var n = (function (e) {
                    function r() {
                      return e.apply(this, arguments) || this;
                    }
                    return (
                      o(r, e),
                      i(r, [
                        {
                          key: "typename",
                          get: function () {
                            return t;
                          },
                        },
                      ]),
                      r
                    );
                  })(e);
                  return l._assign(n.prototype, r), n;
                }
                var u = (function () {
                    function e() {
                      this.init.apply(this, arguments);
                    }
                    return (
                      (e.prototype.init = function () {}),
                      (e.extend = function (e, t) {
                        return (
                          "object" == typeof e && ((t = e), (e = "anonymous")),
                          c(this, e, t)
                        );
                      }),
                      i(e, [
                        {
                          key: "typename",
                          get: function () {
                            return this.constructor.name;
                          },
                        },
                      ]),
                      e
                    );
                  })(),
                  p = (function (e) {
                    function t() {
                      var t, r;
                      return (
                        (t = r = e.call(this) || this).init.apply(t, arguments),
                        r
                      );
                    }
                    return (
                      o(t, e),
                      (t.prototype.init = function () {}),
                      (t.extend = function (e, t) {
                        return (
                          "object" == typeof e && ((t = e), (e = "anonymous")),
                          c(this, e, t)
                        );
                      }),
                      i(t, [
                        {
                          key: "typename",
                          get: function () {
                            return this.constructor.name;
                          },
                        },
                      ]),
                      t
                    );
                  })(s);
                e.exports = { Obj: u, EmitterObj: p };
              },
              function (e, t, r) {
                "use strict";
                var n = r(0),
                  i = Array.from,
                  o =
                    "function" == typeof Symbol &&
                    Symbol.iterator &&
                    "function" == typeof i,
                  a = (function () {
                    function e(e, t) {
                      (this.variables = Object.create(null)),
                        (this.parent = e),
                        (this.topLevel = !1),
                        (this.isolateWrites = t);
                    }
                    var t = e.prototype;
                    return (
                      (t.set = function (e, t, r) {
                        var n = e.split("."),
                          i = this.variables,
                          o = this;
                        if (r && (o = this.resolve(n[0], !0))) o.set(e, t);
                        else {
                          for (var a = 0; a < n.length - 1; a++) {
                            var s = n[a];
                            i[s] || (i[s] = {}), (i = i[s]);
                          }
                          i[n[n.length - 1]] = t;
                        }
                      }),
                      (t.get = function (e) {
                        var t = this.variables[e];
                        return void 0 !== t ? t : null;
                      }),
                      (t.lookup = function (e) {
                        var t = this.parent,
                          r = this.variables[e];
                        return void 0 !== r ? r : t && t.lookup(e);
                      }),
                      (t.resolve = function (e, t) {
                        var r = t && this.isolateWrites ? void 0 : this.parent;
                        return void 0 !== this.variables[e]
                          ? this
                          : r && r.resolve(e);
                      }),
                      (t.push = function (t) {
                        return new e(this, t);
                      }),
                      (t.pop = function () {
                        return this.parent;
                      }),
                      e
                    );
                  })();
                function s(e) {
                  return (
                    e && Object.prototype.hasOwnProperty.call(e, "__keywords")
                  );
                }
                function l(e) {
                  var t = e.length;
                  if (t) {
                    var r = e[t - 1];
                    if (s(r)) return r;
                  }
                  return {};
                }
                function c(e) {
                  var t = e.length;
                  return 0 === t ? 0 : s(e[t - 1]) ? t - 1 : t;
                }
                function u(e) {
                  if ("string" != typeof e) return e;
                  (this.val = e), (this.length = e.length);
                }
                (u.prototype = Object.create(String.prototype, {
                  length: { writable: !0, configurable: !0, value: 0 },
                })),
                  (u.prototype.valueOf = function () {
                    return this.val;
                  }),
                  (u.prototype.toString = function () {
                    return this.val;
                  }),
                  (e.exports = {
                    Frame: a,
                    makeMacro: function (e, t, r) {
                      return function () {
                        for (
                          var n = arguments.length, i = new Array(n), o = 0;
                          o < n;
                          o++
                        )
                          i[o] = arguments[o];
                        var a,
                          s = c(i),
                          u = l(i);
                        if (s > e.length)
                          (a = i.slice(0, e.length)),
                            i.slice(a.length, s).forEach(function (e, r) {
                              r < t.length && (u[t[r]] = e);
                            }),
                            a.push(u);
                        else if (s < e.length) {
                          a = i.slice(0, s);
                          for (var p = s; p < e.length; p++) {
                            var d = e[p];
                            a.push(u[d]), delete u[d];
                          }
                          a.push(u);
                        } else a = i;
                        return r.apply(this, a);
                      };
                    },
                    makeKeywordArgs: function (e) {
                      return (e.__keywords = !0), e;
                    },
                    numArgs: c,
                    suppressValue: function (e, t) {
                      return (
                        (e = null != e ? e : ""),
                        !t || e instanceof u || (e = n.escape(e.toString())),
                        e
                      );
                    },
                    ensureDefined: function (e, t, r) {
                      if (null == e)
                        throw new n.TemplateError(
                          "attempted to output null or undefined value",
                          t + 1,
                          r + 1
                        );
                      return e;
                    },
                    memberLookup: function (e, t) {
                      if (null != e)
                        return "function" == typeof e[t]
                          ? function () {
                              for (
                                var r = arguments.length,
                                  n = new Array(r),
                                  i = 0;
                                i < r;
                                i++
                              )
                                n[i] = arguments[i];
                              return e[t].apply(e, n);
                            }
                          : e[t];
                    },
                    contextOrFrameLookup: function (e, t, r) {
                      var n = t.lookup(r);
                      return void 0 !== n ? n : e.lookup(r);
                    },
                    callWrap: function (e, t, r, n) {
                      if (!e)
                        throw new Error(
                          "Unable to call `" +
                            t +
                            "`, which is undefined or falsey"
                        );
                      if ("function" != typeof e)
                        throw new Error(
                          "Unable to call `" + t + "`, which is not a function"
                        );
                      return e.apply(r, n);
                    },
                    handleError: function (e, t, r) {
                      return e.lineno ? e : new n.TemplateError(e, t, r);
                    },
                    isArray: n.isArray,
                    keys: n.keys,
                    SafeString: u,
                    copySafeness: function (e, t) {
                      return e instanceof u ? new u(t) : t.toString();
                    },
                    markSafe: function (e) {
                      var t = typeof e;
                      return "string" === t
                        ? new u(e)
                        : "function" !== t
                        ? e
                        : function (t) {
                            var r = e.apply(this, arguments);
                            return "string" == typeof r ? new u(r) : r;
                          };
                    },
                    asyncEach: function (e, t, r, i) {
                      if (n.isArray(e)) {
                        var o = e.length;
                        n.asyncIter(
                          e,
                          function (e, n, i) {
                            switch (t) {
                              case 1:
                                r(e, n, o, i);
                                break;
                              case 2:
                                r(e[0], e[1], n, o, i);
                                break;
                              case 3:
                                r(e[0], e[1], e[2], n, o, i);
                                break;
                              default:
                                e.push(n, o, i), r.apply(this, e);
                            }
                          },
                          i
                        );
                      } else
                        n.asyncFor(
                          e,
                          function (e, t, n, i, o) {
                            r(e, t, n, i, o);
                          },
                          i
                        );
                    },
                    asyncAll: function (e, t, r, i) {
                      var o,
                        a,
                        s = 0;
                      function l(e, t) {
                        s++, (a[e] = t), s === o && i(null, a.join(""));
                      }
                      if (n.isArray(e))
                        if (((o = e.length), (a = new Array(o)), 0 === o))
                          i(null, "");
                        else
                          for (var c = 0; c < e.length; c++) {
                            var u = e[c];
                            switch (t) {
                              case 1:
                                r(u, c, o, l);
                                break;
                              case 2:
                                r(u[0], u[1], c, o, l);
                                break;
                              case 3:
                                r(u[0], u[1], u[2], c, o, l);
                                break;
                              default:
                                u.push(c, o, l), r.apply(this, u);
                            }
                          }
                      else {
                        var p = n.keys(e || {});
                        if (((o = p.length), (a = new Array(o)), 0 === o))
                          i(null, "");
                        else
                          for (var d = 0; d < p.length; d++) {
                            var f = p[d];
                            r(f, e[f], d, o, l);
                          }
                      }
                    },
                    inOperator: n.inOperator,
                    fromIterator: function (e) {
                      return "object" != typeof e || null === e || n.isArray(e)
                        ? e
                        : o && Symbol.iterator in e
                        ? i(e)
                        : e;
                    },
                  });
              },
              function (e, t, r) {
                "use strict";
                function n(e, t) {
                  for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    (n.enumerable = n.enumerable || !1),
                      (n.configurable = !0),
                      "value" in n && (n.writable = !0),
                      Object.defineProperty(e, n.key, n);
                  }
                }
                function i(e, t, r) {
                  return t && n(e.prototype, t), r && n(e, r), e;
                }
                function o(e, t) {
                  (e.prototype = Object.create(t.prototype)),
                    (e.prototype.constructor = e),
                    a(e, t);
                }
                function a(e, t) {
                  return (
                    (a =
                      Object.setPrototypeOf ||
                      function (e, t) {
                        return (e.__proto__ = t), e;
                      }),
                    a(e, t)
                  );
                }
                function s(e, t, r) {
                  e instanceof t && r.push(e),
                    e instanceof l && e.findAll(t, r);
                }
                var l = (function (e) {
                    function t() {
                      return e.apply(this, arguments) || this;
                    }
                    o(t, e);
                    var r = t.prototype;
                    return (
                      (r.init = function (e, t) {
                        for (
                          var r = arguments,
                            n = this,
                            i = arguments.length,
                            o = new Array(i > 2 ? i - 2 : 0),
                            a = 2;
                          a < i;
                          a++
                        )
                          o[a - 2] = arguments[a];
                        (this.lineno = e),
                          (this.colno = t),
                          this.fields.forEach(function (e, t) {
                            var i = r[t + 2];
                            void 0 === i && (i = null), (n[e] = i);
                          });
                      }),
                      (r.findAll = function (e, t) {
                        var r = this;
                        return (
                          (t = t || []),
                          this instanceof u
                            ? this.children.forEach(function (r) {
                                return s(r, e, t);
                              })
                            : this.fields.forEach(function (n) {
                                return s(r[n], e, t);
                              }),
                          t
                        );
                      }),
                      (r.iterFields = function (e) {
                        var t = this;
                        this.fields.forEach(function (r) {
                          e(t[r], r);
                        });
                      }),
                      t
                    );
                  })(r(1).Obj),
                  c = (function (e) {
                    function t() {
                      return e.apply(this, arguments) || this;
                    }
                    return (
                      o(t, e),
                      i(t, [
                        {
                          key: "typename",
                          get: function () {
                            return "Value";
                          },
                        },
                        {
                          key: "fields",
                          get: function () {
                            return ["value"];
                          },
                        },
                      ]),
                      t
                    );
                  })(l),
                  u = (function (e) {
                    function t() {
                      return e.apply(this, arguments) || this;
                    }
                    o(t, e);
                    var r = t.prototype;
                    return (
                      (r.init = function (t, r, n) {
                        e.prototype.init.call(this, t, r, n || []);
                      }),
                      (r.addChild = function (e) {
                        this.children.push(e);
                      }),
                      i(t, [
                        {
                          key: "typename",
                          get: function () {
                            return "NodeList";
                          },
                        },
                        {
                          key: "fields",
                          get: function () {
                            return ["children"];
                          },
                        },
                      ]),
                      t
                    );
                  })(l),
                  p = u.extend("Root"),
                  d = c.extend("Literal"),
                  f = c.extend("Symbol"),
                  h = u.extend("Group"),
                  m = u.extend("Array"),
                  g = l.extend("Pair", { fields: ["key", "value"] }),
                  v = u.extend("Dict"),
                  b = l.extend("LookupVal", { fields: ["target", "val"] }),
                  y = l.extend("If", { fields: ["cond", "body", "else_"] }),
                  w = y.extend("IfAsync"),
                  E = l.extend("InlineIf", {
                    fields: ["cond", "body", "else_"],
                  }),
                  x = l.extend("For", {
                    fields: ["arr", "name", "body", "else_"],
                  }),
                  T = x.extend("AsyncEach"),
                  k = x.extend("AsyncAll"),
                  _ = l.extend("Macro", { fields: ["name", "args", "body"] }),
                  A = _.extend("Caller"),
                  N = l.extend("Import", {
                    fields: ["template", "target", "withContext"],
                  }),
                  L = (function (e) {
                    function t() {
                      return e.apply(this, arguments) || this;
                    }
                    return (
                      o(t, e),
                      (t.prototype.init = function (t, r, n, i, o) {
                        e.prototype.init.call(this, t, r, n, i || new u(), o);
                      }),
                      i(t, [
                        {
                          key: "typename",
                          get: function () {
                            return "FromImport";
                          },
                        },
                        {
                          key: "fields",
                          get: function () {
                            return ["template", "names", "withContext"];
                          },
                        },
                      ]),
                      t
                    );
                  })(l),
                  O = l.extend("FunCall", { fields: ["name", "args"] }),
                  S = O.extend("Filter"),
                  C = S.extend("FilterAsync", {
                    fields: ["name", "args", "symbol"],
                  }),
                  D = v.extend("KeywordArgs"),
                  q = l.extend("Block", { fields: ["name", "body"] }),
                  R = l.extend("Super", { fields: ["blockName", "symbol"] }),
                  j = l
                    .extend("TemplateRef", { fields: ["template"] })
                    .extend("Extends"),
                  P = l.extend("Include", {
                    fields: ["template", "ignoreMissing"],
                  }),
                  B = l.extend("Set", { fields: ["targets", "value"] }),
                  F = l.extend("Switch", {
                    fields: ["expr", "cases", "default"],
                  }),
                  M = l.extend("Case", { fields: ["cond", "body"] }),
                  I = u.extend("Output"),
                  U = l.extend("Capture", { fields: ["body"] }),
                  V = d.extend("TemplateData"),
                  H = l.extend("UnaryOp", { fields: ["target"] }),
                  G = l.extend("BinOp", { fields: ["left", "right"] }),
                  K = G.extend("In"),
                  $ = G.extend("Is"),
                  z = G.extend("Or"),
                  Y = G.extend("And"),
                  W = H.extend("Not"),
                  J = G.extend("Add"),
                  X = G.extend("Concat"),
                  Z = G.extend("Sub"),
                  Q = G.extend("Mul"),
                  ee = G.extend("Div"),
                  te = G.extend("FloorDiv"),
                  re = G.extend("Mod"),
                  ne = G.extend("Pow"),
                  ie = H.extend("Neg"),
                  oe = H.extend("Pos"),
                  ae = l.extend("Compare", { fields: ["expr", "ops"] }),
                  se = l.extend("CompareOperand", { fields: ["expr", "type"] }),
                  le = l.extend("CallExtension", {
                    init: function (e, t, r, n) {
                      this.parent(),
                        (this.extName = e.__name || e),
                        (this.prop = t),
                        (this.args = r || new u()),
                        (this.contentArgs = n || []),
                        (this.autoescape = e.autoescape);
                    },
                    fields: ["extName", "prop", "args", "contentArgs"],
                  }),
                  ce = le.extend("CallExtensionAsync");
                function ue(e, t, r) {
                  var n = e.split("\n");
                  n.forEach(function (e, i) {
                    e &&
                      ((r && i > 0) || !r) &&
                      process.stdout.write(" ".repeat(t));
                    var o = i === n.length - 1 ? "" : "\n";
                    process.stdout.write("" + e + o);
                  });
                }
                e.exports = {
                  Node: l,
                  Root: p,
                  NodeList: u,
                  Value: c,
                  Literal: d,
                  Symbol: f,
                  Group: h,
                  Array: m,
                  Pair: g,
                  Dict: v,
                  Output: I,
                  Capture: U,
                  TemplateData: V,
                  If: y,
                  IfAsync: w,
                  InlineIf: E,
                  For: x,
                  AsyncEach: T,
                  AsyncAll: k,
                  Macro: _,
                  Caller: A,
                  Import: N,
                  FromImport: L,
                  FunCall: O,
                  Filter: S,
                  FilterAsync: C,
                  KeywordArgs: D,
                  Block: q,
                  Super: R,
                  Extends: j,
                  Include: P,
                  Set: B,
                  Switch: F,
                  Case: M,
                  LookupVal: b,
                  BinOp: G,
                  In: K,
                  Is: $,
                  Or: z,
                  And: Y,
                  Not: W,
                  Add: J,
                  Concat: X,
                  Sub: Z,
                  Mul: Q,
                  Div: ee,
                  FloorDiv: te,
                  Mod: re,
                  Pow: ne,
                  Neg: ie,
                  Pos: oe,
                  Compare: ae,
                  CompareOperand: se,
                  CallExtension: le,
                  CallExtensionAsync: ce,
                  printNodes: function e(t, r) {
                    if (
                      ((r = r || 0), ue(t.typename + ": ", r), t instanceof u)
                    )
                      ue("\n"),
                        t.children.forEach(function (t) {
                          e(t, r + 2);
                        });
                    else if (t instanceof le)
                      ue(t.extName + "." + t.prop + "\n"),
                        t.args && e(t.args, r + 2),
                        t.contentArgs &&
                          t.contentArgs.forEach(function (t) {
                            e(t, r + 2);
                          });
                    else {
                      var n = [],
                        i = null;
                      t.iterFields(function (e, t) {
                        e instanceof l
                          ? n.push([t, e])
                          : ((i = i || {})[t] = e);
                      }),
                        i
                          ? ue(JSON.stringify(i, null, 2) + "\n", null, !0)
                          : ue("\n"),
                        n.forEach(function (t) {
                          var n = t[0],
                            i = t[1];
                          ue("[" + n + "] =>", r + 2), e(i, r + 4);
                        });
                    }
                  },
                };
              },
              function (e, t) {},
              function (e, t, r) {
                "use strict";
                function n(e, t) {
                  return (
                    (n =
                      Object.setPrototypeOf ||
                      function (e, t) {
                        return (e.__proto__ = t), e;
                      }),
                    n(e, t)
                  );
                }
                var i = r(8),
                  o = r(17),
                  a = r(3),
                  s = r(0).TemplateError,
                  l = r(2).Frame,
                  c = r(1).Obj,
                  u = {
                    "==": "==",
                    "===": "===",
                    "!=": "!=",
                    "!==": "!==",
                    "<": "<",
                    ">": ">",
                    "<=": "<=",
                    ">=": ">=",
                  },
                  p = (function (e) {
                    var t, r;
                    function i() {
                      return e.apply(this, arguments) || this;
                    }
                    (r = e),
                      ((t = i).prototype = Object.create(r.prototype)),
                      (t.prototype.constructor = t),
                      n(t, r);
                    var o = i.prototype;
                    return (
                      (o.init = function (e, t) {
                        (this.templateName = e),
                          (this.codebuf = []),
                          (this.lastId = 0),
                          (this.buffer = null),
                          (this.bufferStack = []),
                          (this._scopeClosers = ""),
                          (this.inBlock = !1),
                          (this.throwOnUndefined = t);
                      }),
                      (o.fail = function (e, t, r) {
                        throw (
                          (void 0 !== t && (t += 1),
                          void 0 !== r && (r += 1),
                          new s(e, t, r))
                        );
                      }),
                      (o._pushBuffer = function () {
                        var e = this._tmpid();
                        return (
                          this.bufferStack.push(this.buffer),
                          (this.buffer = e),
                          this._emit("var " + this.buffer + ' = "";'),
                          e
                        );
                      }),
                      (o._popBuffer = function () {
                        this.buffer = this.bufferStack.pop();
                      }),
                      (o._emit = function (e) {
                        this.codebuf.push(e);
                      }),
                      (o._emitLine = function (e) {
                        this._emit(e + "\n");
                      }),
                      (o._emitLines = function () {
                        for (
                          var e = this,
                            t = arguments.length,
                            r = new Array(t),
                            n = 0;
                          n < t;
                          n++
                        )
                          r[n] = arguments[n];
                        r.forEach(function (t) {
                          return e._emitLine(t);
                        });
                      }),
                      (o._emitFuncBegin = function (e, t) {
                        (this.buffer = "output"),
                          (this._scopeClosers = ""),
                          this._emitLine(
                            "function " +
                              t +
                              "(env, context, frame, runtime, cb) {"
                          ),
                          this._emitLine("var lineno = " + e.lineno + ";"),
                          this._emitLine("var colno = " + e.colno + ";"),
                          this._emitLine("var " + this.buffer + ' = "";'),
                          this._emitLine("try {");
                      }),
                      (o._emitFuncEnd = function (e) {
                        e || this._emitLine("cb(null, " + this.buffer + ");"),
                          this._closeScopeLevels(),
                          this._emitLine("} catch (e) {"),
                          this._emitLine(
                            "  cb(runtime.handleError(e, lineno, colno));"
                          ),
                          this._emitLine("}"),
                          this._emitLine("}"),
                          (this.buffer = null);
                      }),
                      (o._addScopeLevel = function () {
                        this._scopeClosers += "})";
                      }),
                      (o._closeScopeLevels = function () {
                        this._emitLine(this._scopeClosers + ";"),
                          (this._scopeClosers = "");
                      }),
                      (o._withScopedSyntax = function (e) {
                        var t = this._scopeClosers;
                        (this._scopeClosers = ""),
                          e.call(this),
                          this._closeScopeLevels(),
                          (this._scopeClosers = t);
                      }),
                      (o._makeCallback = function (e) {
                        var t = this._tmpid();
                        return (
                          "function(" +
                          t +
                          (e ? "," + e : "") +
                          ") {\nif(" +
                          t +
                          ") { cb(" +
                          t +
                          "); return; }"
                        );
                      }),
                      (o._tmpid = function () {
                        return this.lastId++, "t_" + this.lastId;
                      }),
                      (o._templateName = function () {
                        return null == this.templateName
                          ? "undefined"
                          : JSON.stringify(this.templateName);
                      }),
                      (o._compileChildren = function (e, t) {
                        var r = this;
                        e.children.forEach(function (e) {
                          r.compile(e, t);
                        });
                      }),
                      (o._compileAggregate = function (e, t, r, n) {
                        var i = this;
                        r && this._emit(r),
                          e.children.forEach(function (e, r) {
                            r > 0 && i._emit(","), i.compile(e, t);
                          }),
                          n && this._emit(n);
                      }),
                      (o._compileExpression = function (e, t) {
                        this.assertType(
                          e,
                          a.Literal,
                          a.Symbol,
                          a.Group,
                          a.Array,
                          a.Dict,
                          a.FunCall,
                          a.Caller,
                          a.Filter,
                          a.LookupVal,
                          a.Compare,
                          a.InlineIf,
                          a.In,
                          a.Is,
                          a.And,
                          a.Or,
                          a.Not,
                          a.Add,
                          a.Concat,
                          a.Sub,
                          a.Mul,
                          a.Div,
                          a.FloorDiv,
                          a.Mod,
                          a.Pow,
                          a.Neg,
                          a.Pos,
                          a.Compare,
                          a.NodeList
                        ),
                          this.compile(e, t);
                      }),
                      (o.assertType = function (e) {
                        for (
                          var t = arguments.length,
                            r = new Array(t > 1 ? t - 1 : 0),
                            n = 1;
                          n < t;
                          n++
                        )
                          r[n - 1] = arguments[n];
                        r.some(function (t) {
                          return e instanceof t;
                        }) ||
                          this.fail(
                            "assertType: invalid type: " + e.typename,
                            e.lineno,
                            e.colno
                          );
                      }),
                      (o.compileCallExtension = function (e, t, r) {
                        var n = this,
                          i = e.args,
                          o = e.contentArgs,
                          s = "boolean" != typeof e.autoescape || e.autoescape;
                        if (
                          (r ||
                            this._emit(
                              this.buffer + " += runtime.suppressValue("
                            ),
                          this._emit(
                            'env.getExtension("' +
                              e.extName +
                              '")["' +
                              e.prop +
                              '"]('
                          ),
                          this._emit("context"),
                          (i || o) && this._emit(","),
                          i &&
                            (i instanceof a.NodeList ||
                              this.fail(
                                "compileCallExtension: arguments must be a NodeList, use `parser.parseSignature`"
                              ),
                            i.children.forEach(function (e, r) {
                              n._compileExpression(e, t),
                                (r !== i.children.length - 1 || o.length) &&
                                  n._emit(",");
                            })),
                          o.length &&
                            o.forEach(function (e, r) {
                              if ((r > 0 && n._emit(","), e)) {
                                n._emitLine("function(cb) {"),
                                  n._emitLine(
                                    "if(!cb) { cb = function(err) { if(err) { throw err; }}}"
                                  );
                                var i = n._pushBuffer();
                                n._withScopedSyntax(function () {
                                  n.compile(e, t),
                                    n._emitLine("cb(null, " + i + ");");
                                }),
                                  n._popBuffer(),
                                  n._emitLine("return " + i + ";"),
                                  n._emitLine("}");
                              } else n._emit("null");
                            }),
                          r)
                        ) {
                          var l = this._tmpid();
                          this._emitLine(", " + this._makeCallback(l)),
                            this._emitLine(
                              this.buffer +
                                " += runtime.suppressValue(" +
                                l +
                                ", " +
                                s +
                                " && env.opts.autoescape);"
                            ),
                            this._addScopeLevel();
                        } else
                          this._emit(")"),
                            this._emit(
                              ", " + s + " && env.opts.autoescape);\n"
                            );
                      }),
                      (o.compileCallExtensionAsync = function (e, t) {
                        this.compileCallExtension(e, t, !0);
                      }),
                      (o.compileNodeList = function (e, t) {
                        this._compileChildren(e, t);
                      }),
                      (o.compileLiteral = function (e) {
                        if ("string" == typeof e.value) {
                          var t = e.value.replace(/\\/g, "\\\\");
                          (t = (t = (t = (t = (t = t.replace(
                            /"/g,
                            '\\"'
                          )).replace(/\n/g, "\\n")).replace(
                            /\r/g,
                            "\\r"
                          )).replace(/\t/g, "\\t")).replace(
                            /\u2028/g,
                            "\\u2028"
                          )),
                            this._emit('"' + t + '"');
                        } else
                          null === e.value
                            ? this._emit("null")
                            : this._emit(e.value.toString());
                      }),
                      (o.compileSymbol = function (e, t) {
                        var r = e.value,
                          n = t.lookup(r);
                        n
                          ? this._emit(n)
                          : this._emit(
                              'runtime.contextOrFrameLookup(context, frame, "' +
                                r +
                                '")'
                            );
                      }),
                      (o.compileGroup = function (e, t) {
                        this._compileAggregate(e, t, "(", ")");
                      }),
                      (o.compileArray = function (e, t) {
                        this._compileAggregate(e, t, "[", "]");
                      }),
                      (o.compileDict = function (e, t) {
                        this._compileAggregate(e, t, "{", "}");
                      }),
                      (o.compilePair = function (e, t) {
                        var r = e.key,
                          n = e.value;
                        r instanceof a.Symbol
                          ? (r = new a.Literal(r.lineno, r.colno, r.value))
                          : (r instanceof a.Literal &&
                              "string" == typeof r.value) ||
                            this.fail(
                              "compilePair: Dict keys must be strings or names",
                              r.lineno,
                              r.colno
                            ),
                          this.compile(r, t),
                          this._emit(": "),
                          this._compileExpression(n, t);
                      }),
                      (o.compileInlineIf = function (e, t) {
                        this._emit("("),
                          this.compile(e.cond, t),
                          this._emit("?"),
                          this.compile(e.body, t),
                          this._emit(":"),
                          null !== e.else_
                            ? this.compile(e.else_, t)
                            : this._emit('""'),
                          this._emit(")");
                      }),
                      (o.compileIn = function (e, t) {
                        this._emit("runtime.inOperator("),
                          this.compile(e.left, t),
                          this._emit(","),
                          this.compile(e.right, t),
                          this._emit(")");
                      }),
                      (o.compileIs = function (e, t) {
                        var r = e.right.name
                          ? e.right.name.value
                          : e.right.value;
                        this._emit('env.getTest("' + r + '").call(context, '),
                          this.compile(e.left, t),
                          e.right.args &&
                            (this._emit(","), this.compile(e.right.args, t)),
                          this._emit(") === true");
                      }),
                      (o._binOpEmitter = function (e, t, r) {
                        this.compile(e.left, t),
                          this._emit(r),
                          this.compile(e.right, t);
                      }),
                      (o.compileOr = function (e, t) {
                        return this._binOpEmitter(e, t, " || ");
                      }),
                      (o.compileAnd = function (e, t) {
                        return this._binOpEmitter(e, t, " && ");
                      }),
                      (o.compileAdd = function (e, t) {
                        return this._binOpEmitter(e, t, " + ");
                      }),
                      (o.compileConcat = function (e, t) {
                        return this._binOpEmitter(e, t, ' + "" + ');
                      }),
                      (o.compileSub = function (e, t) {
                        return this._binOpEmitter(e, t, " - ");
                      }),
                      (o.compileMul = function (e, t) {
                        return this._binOpEmitter(e, t, " * ");
                      }),
                      (o.compileDiv = function (e, t) {
                        return this._binOpEmitter(e, t, " / ");
                      }),
                      (o.compileMod = function (e, t) {
                        return this._binOpEmitter(e, t, " % ");
                      }),
                      (o.compileNot = function (e, t) {
                        this._emit("!"), this.compile(e.target, t);
                      }),
                      (o.compileFloorDiv = function (e, t) {
                        this._emit("Math.floor("),
                          this.compile(e.left, t),
                          this._emit(" / "),
                          this.compile(e.right, t),
                          this._emit(")");
                      }),
                      (o.compilePow = function (e, t) {
                        this._emit("Math.pow("),
                          this.compile(e.left, t),
                          this._emit(", "),
                          this.compile(e.right, t),
                          this._emit(")");
                      }),
                      (o.compileNeg = function (e, t) {
                        this._emit("-"), this.compile(e.target, t);
                      }),
                      (o.compilePos = function (e, t) {
                        this._emit("+"), this.compile(e.target, t);
                      }),
                      (o.compileCompare = function (e, t) {
                        var r = this;
                        this.compile(e.expr, t),
                          e.ops.forEach(function (e) {
                            r._emit(" " + u[e.type] + " "),
                              r.compile(e.expr, t);
                          });
                      }),
                      (o.compileLookupVal = function (e, t) {
                        this._emit("runtime.memberLookup(("),
                          this._compileExpression(e.target, t),
                          this._emit("),"),
                          this._compileExpression(e.val, t),
                          this._emit(")");
                      }),
                      (o._getNodeName = function (e) {
                        switch (e.typename) {
                          case "Symbol":
                            return e.value;
                          case "FunCall":
                            return (
                              "the return value of (" +
                              this._getNodeName(e.name) +
                              ")"
                            );
                          case "LookupVal":
                            return (
                              this._getNodeName(e.target) +
                              '["' +
                              this._getNodeName(e.val) +
                              '"]'
                            );
                          case "Literal":
                            return e.value.toString();
                          default:
                            return "--expression--";
                        }
                      }),
                      (o.compileFunCall = function (e, t) {
                        this._emit(
                          "(lineno = " +
                            e.lineno +
                            ", colno = " +
                            e.colno +
                            ", "
                        ),
                          this._emit("runtime.callWrap("),
                          this._compileExpression(e.name, t),
                          this._emit(
                            ', "' +
                              this._getNodeName(e.name).replace(/"/g, '\\"') +
                              '", context, '
                          ),
                          this._compileAggregate(e.args, t, "[", "])"),
                          this._emit(")");
                      }),
                      (o.compileFilter = function (e, t) {
                        var r = e.name;
                        this.assertType(r, a.Symbol),
                          this._emit(
                            'env.getFilter("' + r.value + '").call(context, '
                          ),
                          this._compileAggregate(e.args, t),
                          this._emit(")");
                      }),
                      (o.compileFilterAsync = function (e, t) {
                        var r = e.name,
                          n = e.symbol.value;
                        this.assertType(r, a.Symbol),
                          t.set(n, n),
                          this._emit(
                            'env.getFilter("' + r.value + '").call(context, '
                          ),
                          this._compileAggregate(e.args, t),
                          this._emitLine(", " + this._makeCallback(n)),
                          this._addScopeLevel();
                      }),
                      (o.compileKeywordArgs = function (e, t) {
                        this._emit("runtime.makeKeywordArgs("),
                          this.compileDict(e, t),
                          this._emit(")");
                      }),
                      (o.compileSet = function (e, t) {
                        var r = this,
                          n = [];
                        e.targets.forEach(function (e) {
                          var i = e.value,
                            o = t.lookup(i);
                          null == o &&
                            ((o = r._tmpid()), r._emitLine("var " + o + ";")),
                            n.push(o);
                        }),
                          e.value
                            ? (this._emit(n.join(" = ") + " = "),
                              this._compileExpression(e.value, t),
                              this._emitLine(";"))
                            : (this._emit(n.join(" = ") + " = "),
                              this.compile(e.body, t),
                              this._emitLine(";")),
                          e.targets.forEach(function (e, t) {
                            var i = n[t],
                              o = e.value;
                            r._emitLine(
                              'frame.set("' + o + '", ' + i + ", true);"
                            ),
                              r._emitLine("if(frame.topLevel) {"),
                              r._emitLine(
                                'context.setVariable("' + o + '", ' + i + ");"
                              ),
                              r._emitLine("}"),
                              "_" !== o.charAt(0) &&
                                (r._emitLine("if(frame.topLevel) {"),
                                r._emitLine(
                                  'context.addExport("' + o + '", ' + i + ");"
                                ),
                                r._emitLine("}"));
                          });
                      }),
                      (o.compileSwitch = function (e, t) {
                        var r = this;
                        this._emit("switch ("),
                          this.compile(e.expr, t),
                          this._emit(") {"),
                          e.cases.forEach(function (e, n) {
                            r._emit("case "),
                              r.compile(e.cond, t),
                              r._emit(": "),
                              r.compile(e.body, t),
                              e.body.children.length && r._emitLine("break;");
                          }),
                          e.default &&
                            (this._emit("default:"),
                            this.compile(e.default, t)),
                          this._emit("}");
                      }),
                      (o.compileIf = function (e, t, r) {
                        var n = this;
                        this._emit("if("),
                          this._compileExpression(e.cond, t),
                          this._emitLine(") {"),
                          this._withScopedSyntax(function () {
                            n.compile(e.body, t), r && n._emit("cb()");
                          }),
                          e.else_
                            ? (this._emitLine("}\nelse {"),
                              this._withScopedSyntax(function () {
                                n.compile(e.else_, t), r && n._emit("cb()");
                              }))
                            : r &&
                              (this._emitLine("}\nelse {"), this._emit("cb()")),
                          this._emitLine("}");
                      }),
                      (o.compileIfAsync = function (e, t) {
                        this._emit("(function(cb) {"),
                          this.compileIf(e, t, !0),
                          this._emit("})(" + this._makeCallback()),
                          this._addScopeLevel();
                      }),
                      (o._emitLoopBindings = function (e, t, r, n) {
                        var i = this;
                        [
                          { name: "index", val: r + " + 1" },
                          { name: "index0", val: r },
                          { name: "revindex", val: n + " - " + r },
                          { name: "revindex0", val: n + " - " + r + " - 1" },
                          { name: "first", val: r + " === 0" },
                          { name: "last", val: r + " === " + n + " - 1" },
                          { name: "length", val: n },
                        ].forEach(function (e) {
                          i._emitLine(
                            'frame.set("loop.' + e.name + '", ' + e.val + ");"
                          );
                        });
                      }),
                      (o.compileFor = function (e, t) {
                        var r = this,
                          n = this._tmpid(),
                          i = this._tmpid(),
                          o = this._tmpid();
                        if (
                          ((t = t.push()),
                          this._emitLine("frame = frame.push();"),
                          this._emit("var " + o + " = "),
                          this._compileExpression(e.arr, t),
                          this._emitLine(";"),
                          this._emit("if(" + o + ") {"),
                          this._emitLine(
                            o + " = runtime.fromIterator(" + o + ");"
                          ),
                          e.name instanceof a.Array)
                        ) {
                          this._emitLine("var " + n + ";"),
                            this._emitLine("if(runtime.isArray(" + o + ")) {"),
                            this._emitLine("var " + i + " = " + o + ".length;"),
                            this._emitLine(
                              "for(" +
                                n +
                                "=0; " +
                                n +
                                " < " +
                                o +
                                ".length; " +
                                n +
                                "++) {"
                            ),
                            e.name.children.forEach(function (i, a) {
                              var s = r._tmpid();
                              r._emitLine(
                                "var " +
                                  s +
                                  " = " +
                                  o +
                                  "[" +
                                  n +
                                  "][" +
                                  a +
                                  "];"
                              ),
                                r._emitLine(
                                  'frame.set("' +
                                    i +
                                    '", ' +
                                    o +
                                    "[" +
                                    n +
                                    "][" +
                                    a +
                                    "]);"
                                ),
                                t.set(e.name.children[a].value, s);
                            }),
                            this._emitLoopBindings(e, o, n, i),
                            this._withScopedSyntax(function () {
                              r.compile(e.body, t);
                            }),
                            this._emitLine("}"),
                            this._emitLine("} else {");
                          var s = e.name.children,
                            l = s[0],
                            c = s[1],
                            u = this._tmpid(),
                            p = this._tmpid();
                          t.set(l.value, u),
                            t.set(c.value, p),
                            this._emitLine(n + " = -1;"),
                            this._emitLine(
                              "var " + i + " = runtime.keys(" + o + ").length;"
                            ),
                            this._emitLine("for(var " + u + " in " + o + ") {"),
                            this._emitLine(n + "++;"),
                            this._emitLine(
                              "var " + p + " = " + o + "[" + u + "];"
                            ),
                            this._emitLine(
                              'frame.set("' + l.value + '", ' + u + ");"
                            ),
                            this._emitLine(
                              'frame.set("' + c.value + '", ' + p + ");"
                            ),
                            this._emitLoopBindings(e, o, n, i),
                            this._withScopedSyntax(function () {
                              r.compile(e.body, t);
                            }),
                            this._emitLine("}"),
                            this._emitLine("}");
                        } else {
                          var d = this._tmpid();
                          t.set(e.name.value, d),
                            this._emitLine("var " + i + " = " + o + ".length;"),
                            this._emitLine(
                              "for(var " +
                                n +
                                "=0; " +
                                n +
                                " < " +
                                o +
                                ".length; " +
                                n +
                                "++) {"
                            ),
                            this._emitLine(
                              "var " + d + " = " + o + "[" + n + "];"
                            ),
                            this._emitLine(
                              'frame.set("' + e.name.value + '", ' + d + ");"
                            ),
                            this._emitLoopBindings(e, o, n, i),
                            this._withScopedSyntax(function () {
                              r.compile(e.body, t);
                            }),
                            this._emitLine("}");
                        }
                        this._emitLine("}"),
                          e.else_ &&
                            (this._emitLine("if (!" + i + ") {"),
                            this.compile(e.else_, t),
                            this._emitLine("}")),
                          this._emitLine("frame = frame.pop();");
                      }),
                      (o._compileAsyncLoop = function (e, t, r) {
                        var n = this,
                          i = this._tmpid(),
                          o = this._tmpid(),
                          s = this._tmpid(),
                          l = r ? "asyncAll" : "asyncEach";
                        if (
                          ((t = t.push()),
                          this._emitLine("frame = frame.push();"),
                          this._emit("var " + s + " = runtime.fromIterator("),
                          this._compileExpression(e.arr, t),
                          this._emitLine(");"),
                          e.name instanceof a.Array)
                        ) {
                          var c = e.name.children.length;
                          this._emit(
                            "runtime." + l + "(" + s + ", " + c + ", function("
                          ),
                            e.name.children.forEach(function (e) {
                              n._emit(e.value + ",");
                            }),
                            this._emit(i + "," + o + ",next) {"),
                            e.name.children.forEach(function (e) {
                              var r = e.value;
                              t.set(r, r),
                                n._emitLine(
                                  'frame.set("' + r + '", ' + r + ");"
                                );
                            });
                        } else {
                          var u = e.name.value;
                          this._emitLine(
                            "runtime." +
                              l +
                              "(" +
                              s +
                              ", 1, function(" +
                              u +
                              ", " +
                              i +
                              ", " +
                              o +
                              ",next) {"
                          ),
                            this._emitLine(
                              'frame.set("' + u + '", ' + u + ");"
                            ),
                            t.set(u, u);
                        }
                        this._emitLoopBindings(e, s, i, o),
                          this._withScopedSyntax(function () {
                            var o;
                            r && (o = n._pushBuffer()),
                              n.compile(e.body, t),
                              n._emitLine(
                                "next(" + i + (o ? "," + o : "") + ");"
                              ),
                              r && n._popBuffer();
                          });
                        var p = this._tmpid();
                        this._emitLine("}, " + this._makeCallback(p)),
                          this._addScopeLevel(),
                          r && this._emitLine(this.buffer + " += " + p + ";"),
                          e.else_ &&
                            (this._emitLine("if (!" + s + ".length) {"),
                            this.compile(e.else_, t),
                            this._emitLine("}")),
                          this._emitLine("frame = frame.pop();");
                      }),
                      (o.compileAsyncEach = function (e, t) {
                        this._compileAsyncLoop(e, t);
                      }),
                      (o.compileAsyncAll = function (e, t) {
                        this._compileAsyncLoop(e, t, !0);
                      }),
                      (o._compileMacro = function (e, t) {
                        var r = this,
                          n = [],
                          i = null,
                          o = "macro_" + this._tmpid(),
                          s = void 0 !== t;
                        e.args.children.forEach(function (t, o) {
                          o === e.args.children.length - 1 &&
                          t instanceof a.Dict
                            ? (i = t)
                            : (r.assertType(t, a.Symbol), n.push(t));
                        });
                        var c,
                          u = [].concat(
                            n.map(function (e) {
                              return "l_" + e.value;
                            }),
                            ["kwargs"]
                          ),
                          p = n.map(function (e) {
                            return '"' + e.value + '"';
                          }),
                          d = ((i && i.children) || []).map(function (e) {
                            return '"' + e.key.value + '"';
                          });
                        (c = s ? t.push(!0) : new l()),
                          this._emitLines(
                            "var " + o + " = runtime.makeMacro(",
                            "[" + p.join(", ") + "], ",
                            "[" + d.join(", ") + "], ",
                            "function (" + u.join(", ") + ") {",
                            "var callerFrame = frame;",
                            "frame = " +
                              (s
                                ? "frame.push(true);"
                                : "new runtime.Frame();"),
                            "kwargs = kwargs || {};",
                            'if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {',
                            'frame.set("caller", kwargs.caller); }'
                          ),
                          n.forEach(function (e) {
                            r._emitLine(
                              'frame.set("' + e.value + '", l_' + e.value + ");"
                            ),
                              c.set(e.value, "l_" + e.value);
                          }),
                          i &&
                            i.children.forEach(function (e) {
                              var t = e.key.value;
                              r._emit('frame.set("' + t + '", '),
                                r._emit(
                                  'Object.prototype.hasOwnProperty.call(kwargs, "' +
                                    t +
                                    '")'
                                ),
                                r._emit(' ? kwargs["' + t + '"] : '),
                                r._compileExpression(e.value, c),
                                r._emit(");");
                            });
                        var f = this._pushBuffer();
                        return (
                          this._withScopedSyntax(function () {
                            r.compile(e.body, c);
                          }),
                          this._emitLine(
                            "frame = " + (s ? "frame.pop();" : "callerFrame;")
                          ),
                          this._emitLine(
                            "return new runtime.SafeString(" + f + ");"
                          ),
                          this._emitLine("});"),
                          this._popBuffer(),
                          o
                        );
                      }),
                      (o.compileMacro = function (e, t) {
                        var r = this._compileMacro(e),
                          n = e.name.value;
                        t.set(n, r),
                          t.parent
                            ? this._emitLine(
                                'frame.set("' + n + '", ' + r + ");"
                              )
                            : ("_" !== e.name.value.charAt(0) &&
                                this._emitLine(
                                  'context.addExport("' + n + '");'
                                ),
                              this._emitLine(
                                'context.setVariable("' + n + '", ' + r + ");"
                              ));
                      }),
                      (o.compileCaller = function (e, t) {
                        this._emit("(function (){");
                        var r = this._compileMacro(e, t);
                        this._emit("return " + r + ";})()");
                      }),
                      (o._compileGetTemplate = function (e, t, r, n) {
                        var i = this._tmpid(),
                          o = this._templateName(),
                          a = this._makeCallback(i),
                          s = r ? "true" : "false",
                          l = n ? "true" : "false";
                        return (
                          this._emit("env.getTemplate("),
                          this._compileExpression(e.template, t),
                          this._emitLine(
                            ", " + s + ", " + o + ", " + l + ", " + a
                          ),
                          i
                        );
                      }),
                      (o.compileImport = function (e, t) {
                        var r = e.target.value,
                          n = this._compileGetTemplate(e, t, !1, !1);
                        this._addScopeLevel(),
                          this._emitLine(
                            n +
                              ".getExported(" +
                              (e.withContext
                                ? "context.getVariables(), frame, "
                                : "") +
                              this._makeCallback(n)
                          ),
                          this._addScopeLevel(),
                          t.set(r, n),
                          t.parent
                            ? this._emitLine(
                                'frame.set("' + r + '", ' + n + ");"
                              )
                            : this._emitLine(
                                'context.setVariable("' + r + '", ' + n + ");"
                              );
                      }),
                      (o.compileFromImport = function (e, t) {
                        var r = this,
                          n = this._compileGetTemplate(e, t, !1, !1);
                        this._addScopeLevel(),
                          this._emitLine(
                            n +
                              ".getExported(" +
                              (e.withContext
                                ? "context.getVariables(), frame, "
                                : "") +
                              this._makeCallback(n)
                          ),
                          this._addScopeLevel(),
                          e.names.children.forEach(function (e) {
                            var i,
                              o,
                              s = r._tmpid();
                            e instanceof a.Pair
                              ? ((i = e.key.value), (o = e.value.value))
                              : (o = i = e.value),
                              r._emitLine(
                                "if(Object.prototype.hasOwnProperty.call(" +
                                  n +
                                  ', "' +
                                  i +
                                  '")) {'
                              ),
                              r._emitLine(
                                "var " + s + " = " + n + "." + i + ";"
                              ),
                              r._emitLine("} else {"),
                              r._emitLine(
                                "cb(new Error(\"cannot import '" +
                                  i +
                                  "'\")); return;"
                              ),
                              r._emitLine("}"),
                              t.set(o, s),
                              t.parent
                                ? r._emitLine(
                                    'frame.set("' + o + '", ' + s + ");"
                                  )
                                : r._emitLine(
                                    'context.setVariable("' +
                                      o +
                                      '", ' +
                                      s +
                                      ");"
                                  );
                          });
                      }),
                      (o.compileBlock = function (e) {
                        var t = this._tmpid();
                        this.inBlock ||
                          this._emit(
                            '(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : '
                          ),
                          this._emit(
                            'context.getBlock("' + e.name.value + '")'
                          ),
                          this.inBlock || this._emit(")"),
                          this._emitLine(
                            "(env, context, frame, runtime, " +
                              this._makeCallback(t)
                          ),
                          this._emitLine(this.buffer + " += " + t + ";"),
                          this._addScopeLevel();
                      }),
                      (o.compileSuper = function (e, t) {
                        var r = e.blockName.value,
                          n = e.symbol.value,
                          i = this._makeCallback(n);
                        this._emitLine(
                          'context.getSuper(env, "' +
                            r +
                            '", b_' +
                            r +
                            ", frame, runtime, " +
                            i
                        ),
                          this._emitLine(n + " = runtime.markSafe(" + n + ");"),
                          this._addScopeLevel(),
                          t.set(n, n);
                      }),
                      (o.compileExtends = function (e, t) {
                        var r = this._tmpid(),
                          n = this._compileGetTemplate(e, t, !0, !1);
                        this._emitLine("parentTemplate = " + n),
                          this._emitLine(
                            "for(var " + r + " in parentTemplate.blocks) {"
                          ),
                          this._emitLine(
                            "context.addBlock(" +
                              r +
                              ", parentTemplate.blocks[" +
                              r +
                              "]);"
                          ),
                          this._emitLine("}"),
                          this._addScopeLevel();
                      }),
                      (o.compileInclude = function (e, t) {
                        this._emitLine("var tasks = [];"),
                          this._emitLine("tasks.push("),
                          this._emitLine("function(callback) {");
                        var r = this._compileGetTemplate(
                          e,
                          t,
                          !1,
                          e.ignoreMissing
                        );
                        this._emitLine("callback(null," + r + ");});"),
                          this._emitLine("});");
                        var n = this._tmpid();
                        this._emitLine("tasks.push("),
                          this._emitLine("function(template, callback){"),
                          this._emitLine(
                            "template.render(context.getVariables(), frame, " +
                              this._makeCallback(n)
                          ),
                          this._emitLine("callback(null," + n + ");});"),
                          this._emitLine("});"),
                          this._emitLine("tasks.push("),
                          this._emitLine("function(result, callback){"),
                          this._emitLine(this.buffer + " += result;"),
                          this._emitLine("callback(null);"),
                          this._emitLine("});"),
                          this._emitLine("env.waterfall(tasks, function(){"),
                          this._addScopeLevel();
                      }),
                      (o.compileTemplateData = function (e, t) {
                        this.compileLiteral(e, t);
                      }),
                      (o.compileCapture = function (e, t) {
                        var r = this,
                          n = this.buffer;
                        (this.buffer = "output"),
                          this._emitLine("(function() {"),
                          this._emitLine('var output = "";'),
                          this._withScopedSyntax(function () {
                            r.compile(e.body, t);
                          }),
                          this._emitLine("return output;"),
                          this._emitLine("})()"),
                          (this.buffer = n);
                      }),
                      (o.compileOutput = function (e, t) {
                        var r = this;
                        e.children.forEach(function (n) {
                          n instanceof a.TemplateData
                            ? n.value &&
                              (r._emit(r.buffer + " += "),
                              r.compileLiteral(n, t),
                              r._emitLine(";"))
                            : (r._emit(r.buffer + " += runtime.suppressValue("),
                              r.throwOnUndefined &&
                                r._emit("runtime.ensureDefined("),
                              r.compile(n, t),
                              r.throwOnUndefined &&
                                r._emit("," + e.lineno + "," + e.colno + ")"),
                              r._emit(", env.opts.autoescape);\n"));
                        });
                      }),
                      (o.compileRoot = function (e, t) {
                        var r = this;
                        t &&
                          this.fail("compileRoot: root node can't have frame"),
                          (t = new l()),
                          this._emitFuncBegin(e, "root"),
                          this._emitLine("var parentTemplate = null;"),
                          this._compileChildren(e, t),
                          this._emitLine("if(parentTemplate) {"),
                          this._emitLine(
                            "parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);"
                          ),
                          this._emitLine("} else {"),
                          this._emitLine("cb(null, " + this.buffer + ");"),
                          this._emitLine("}"),
                          this._emitFuncEnd(!0),
                          (this.inBlock = !0);
                        var n = [],
                          i = e.findAll(a.Block);
                        i.forEach(function (e, t) {
                          var i = e.name.value;
                          if (-1 !== n.indexOf(i))
                            throw new Error(
                              'Block "' + i + '" defined more than once.'
                            );
                          n.push(i), r._emitFuncBegin(e, "b_" + i);
                          var o = new l();
                          r._emitLine("var frame = frame.push(true);"),
                            r.compile(e.body, o),
                            r._emitFuncEnd();
                        }),
                          this._emitLine("return {"),
                          i.forEach(function (e, t) {
                            var n = "b_" + e.name.value;
                            r._emitLine(n + ": " + n + ",");
                          }),
                          this._emitLine("root: root\n};");
                      }),
                      (o.compile = function (e, t) {
                        var r = this["compile" + e.typename];
                        r
                          ? r.call(this, e, t)
                          : this.fail(
                              "compile: Cannot compile node: " + e.typename,
                              e.lineno,
                              e.colno
                            );
                      }),
                      (o.getCode = function () {
                        return this.codebuf.join("");
                      }),
                      i
                    );
                  })(c);
                e.exports = {
                  compile: function (e, t, r, n, a) {
                    void 0 === a && (a = {});
                    var s = new p(n, a.throwOnUndefined),
                      l = (r || [])
                        .map(function (e) {
                          return e.preprocess;
                        })
                        .filter(function (e) {
                          return !!e;
                        })
                        .reduce(function (e, t) {
                          return t(e);
                        }, e);
                    return (
                      s.compile(o.transform(i.parse(l, r, a), t, n)),
                      s.getCode()
                    );
                  },
                  Compiler: p,
                };
              },
              function (e, t, r) {
                "use strict";
                function n(e, t) {
                  return (
                    (n =
                      Object.setPrototypeOf ||
                      function (e, t) {
                        return (e.__proto__ = t), e;
                      }),
                    n(e, t)
                  );
                }
                var i = r(4),
                  o = r(1).EmitterObj;
                e.exports = (function (e) {
                  var t, r;
                  function o() {
                    return e.apply(this, arguments) || this;
                  }
                  (r = e),
                    ((t = o).prototype = Object.create(r.prototype)),
                    (t.prototype.constructor = t),
                    n(t, r);
                  var a = o.prototype;
                  return (
                    (a.resolve = function (e, t) {
                      return i.resolve(i.dirname(e), t);
                    }),
                    (a.isRelative = function (e) {
                      return 0 === e.indexOf("./") || 0 === e.indexOf("../");
                    }),
                    o
                  );
                })(o);
              },
              function (e, t, r) {
                "use strict";
                function n(e, t) {
                  (e.prototype = Object.create(t.prototype)),
                    (e.prototype.constructor = e),
                    i(e, t);
                }
                function i(e, t) {
                  return (
                    (i =
                      Object.setPrototypeOf ||
                      function (e, t) {
                        return (e.__proto__ = t), e;
                      }),
                    i(e, t)
                  );
                }
                var o = r(12),
                  a = r(15),
                  s = r(0),
                  l = r(5),
                  c = r(18),
                  u = r(10),
                  p = u.FileSystemLoader,
                  d = u.WebLoader,
                  f = u.PrecompiledLoader,
                  h = r(20),
                  m = r(21),
                  g = r(1),
                  v = g.Obj,
                  b = g.EmitterObj,
                  y = r(2),
                  w = y.handleError,
                  E = y.Frame,
                  x = r(22);
                function T(e, t, r) {
                  o(function () {
                    e(t, r);
                  });
                }
                var k = {
                    type: "code",
                    obj: {
                      root: function (e, t, r, n, i) {
                        try {
                          i(null, "");
                        } catch (e) {
                          i(w(e, null, null));
                        }
                      },
                    },
                  },
                  _ = (function (e) {
                    function t() {
                      return e.apply(this, arguments) || this;
                    }
                    n(t, e);
                    var r = t.prototype;
                    return (
                      (r.init = function (e, t) {
                        var r = this;
                        (t = this.opts = t || {}),
                          (this.opts.dev = !!t.dev),
                          (this.opts.autoescape =
                            null == t.autoescape || t.autoescape),
                          (this.opts.throwOnUndefined = !!t.throwOnUndefined),
                          (this.opts.trimBlocks = !!t.trimBlocks),
                          (this.opts.lstripBlocks = !!t.lstripBlocks),
                          (this.loaders = []),
                          e
                            ? (this.loaders = s.isArray(e) ? e : [e])
                            : p
                            ? (this.loaders = [new p("views")])
                            : d && (this.loaders = [new d("/views")]),
                          "undefined" != typeof window &&
                            window.nunjucksPrecompiled &&
                            this.loaders.unshift(
                              new f(window.nunjucksPrecompiled)
                            ),
                          this._initLoaders(),
                          (this.globals = m()),
                          (this.filters = {}),
                          (this.tests = {}),
                          (this.asyncFilters = []),
                          (this.extensions = {}),
                          (this.extensionsList = []),
                          s._entries(c).forEach(function (e) {
                            var t = e[0],
                              n = e[1];
                            return r.addFilter(t, n);
                          }),
                          s._entries(h).forEach(function (e) {
                            var t = e[0],
                              n = e[1];
                            return r.addTest(t, n);
                          });
                      }),
                      (r._initLoaders = function () {
                        var e = this;
                        this.loaders.forEach(function (t) {
                          (t.cache = {}),
                            "function" == typeof t.on &&
                              (t.on("update", function (r, n) {
                                (t.cache[r] = null), e.emit("update", r, n, t);
                              }),
                              t.on("load", function (r, n) {
                                e.emit("load", r, n, t);
                              }));
                        });
                      }),
                      (r.invalidateCache = function () {
                        this.loaders.forEach(function (e) {
                          e.cache = {};
                        });
                      }),
                      (r.addExtension = function (e, t) {
                        return (
                          (t.__name = e),
                          (this.extensions[e] = t),
                          this.extensionsList.push(t),
                          this
                        );
                      }),
                      (r.removeExtension = function (e) {
                        var t = this.getExtension(e);
                        t &&
                          ((this.extensionsList = s.without(
                            this.extensionsList,
                            t
                          )),
                          delete this.extensions[e]);
                      }),
                      (r.getExtension = function (e) {
                        return this.extensions[e];
                      }),
                      (r.hasExtension = function (e) {
                        return !!this.extensions[e];
                      }),
                      (r.addGlobal = function (e, t) {
                        return (this.globals[e] = t), this;
                      }),
                      (r.getGlobal = function (e) {
                        if (void 0 === this.globals[e])
                          throw new Error("global not found: " + e);
                        return this.globals[e];
                      }),
                      (r.addFilter = function (e, t, r) {
                        var n = t;
                        return (
                          r && this.asyncFilters.push(e),
                          (this.filters[e] = n),
                          this
                        );
                      }),
                      (r.getFilter = function (e) {
                        if (!this.filters[e])
                          throw new Error("filter not found: " + e);
                        return this.filters[e];
                      }),
                      (r.addTest = function (e, t) {
                        return (this.tests[e] = t), this;
                      }),
                      (r.getTest = function (e) {
                        if (!this.tests[e])
                          throw new Error("test not found: " + e);
                        return this.tests[e];
                      }),
                      (r.resolveTemplate = function (e, t, r) {
                        return e.isRelative && t && e.isRelative(r) && e.resolve
                          ? e.resolve(t, r)
                          : r;
                      }),
                      (r.getTemplate = function (e, t, r, n, i) {
                        var o,
                          a = this,
                          l = this,
                          c = null;
                        if (
                          (e && e.raw && (e = e.raw),
                          s.isFunction(r) &&
                            ((i = r), (r = null), (t = t || !1)),
                          s.isFunction(t) && ((i = t), (t = !1)),
                          e instanceof N)
                        )
                          c = e;
                        else {
                          if ("string" != typeof e)
                            throw new Error(
                              "template names must be a string: " + e
                            );
                          for (var u = 0; u < this.loaders.length; u++) {
                            var p = this.loaders[u];
                            if ((c = p.cache[this.resolveTemplate(p, r, e)]))
                              break;
                          }
                        }
                        return c
                          ? (t && c.compile(), i ? void i(null, c) : c)
                          : (s.asyncIter(
                              this.loaders,
                              function (t, n, i, o) {
                                function a(e, r) {
                                  e
                                    ? o(e)
                                    : r
                                    ? ((r.loader = t), o(null, r))
                                    : i();
                                }
                                (e = l.resolveTemplate(t, r, e)),
                                  t.async
                                    ? t.getSource(e, a)
                                    : a(null, t.getSource(e));
                              },
                              function (r, s) {
                                if (
                                  (s ||
                                    r ||
                                    n ||
                                    (r = new Error("template not found: " + e)),
                                  r)
                                ) {
                                  if (i) return void i(r);
                                  throw r;
                                }
                                var l;
                                s
                                  ? ((l = new N(s.src, a, s.path, t)),
                                    s.noCache || (s.loader.cache[e] = l))
                                  : (l = new N(k, a, "", t)),
                                  i ? i(null, l) : (o = l);
                              }
                            ),
                            o);
                      }),
                      (r.express = function (e) {
                        return x(this, e);
                      }),
                      (r.render = function (e, t, r) {
                        s.isFunction(t) && ((r = t), (t = null));
                        var n = null;
                        return (
                          this.getTemplate(e, function (e, i) {
                            if (e && r) T(r, e);
                            else {
                              if (e) throw e;
                              n = i.render(t, r);
                            }
                          }),
                          n
                        );
                      }),
                      (r.renderString = function (e, t, r, n) {
                        return (
                          s.isFunction(r) && ((n = r), (r = {})),
                          new N(e, this, (r = r || {}).path).render(t, n)
                        );
                      }),
                      (r.waterfall = function (e, t, r) {
                        return a(e, t, r);
                      }),
                      t
                    );
                  })(b),
                  A = (function (e) {
                    function t() {
                      return e.apply(this, arguments) || this;
                    }
                    n(t, e);
                    var r = t.prototype;
                    return (
                      (r.init = function (e, t, r) {
                        var n = this;
                        (this.env = r || new _()),
                          (this.ctx = s.extend({}, e)),
                          (this.blocks = {}),
                          (this.exported = []),
                          s.keys(t).forEach(function (e) {
                            n.addBlock(e, t[e]);
                          });
                      }),
                      (r.lookup = function (e) {
                        return e in this.env.globals && !(e in this.ctx)
                          ? this.env.globals[e]
                          : this.ctx[e];
                      }),
                      (r.setVariable = function (e, t) {
                        this.ctx[e] = t;
                      }),
                      (r.getVariables = function () {
                        return this.ctx;
                      }),
                      (r.addBlock = function (e, t) {
                        return (
                          (this.blocks[e] = this.blocks[e] || []),
                          this.blocks[e].push(t),
                          this
                        );
                      }),
                      (r.getBlock = function (e) {
                        if (!this.blocks[e])
                          throw new Error('unknown block "' + e + '"');
                        return this.blocks[e][0];
                      }),
                      (r.getSuper = function (e, t, r, n, i, o) {
                        var a = s.indexOf(this.blocks[t] || [], r),
                          l = this.blocks[t][a + 1];
                        if (-1 === a || !l)
                          throw new Error(
                            'no super block available for "' + t + '"'
                          );
                        l(e, this, n, i, o);
                      }),
                      (r.addExport = function (e) {
                        this.exported.push(e);
                      }),
                      (r.getExported = function () {
                        var e = this,
                          t = {};
                        return (
                          this.exported.forEach(function (r) {
                            t[r] = e.ctx[r];
                          }),
                          t
                        );
                      }),
                      t
                    );
                  })(v),
                  N = (function (e) {
                    function t() {
                      return e.apply(this, arguments) || this;
                    }
                    n(t, e);
                    var r = t.prototype;
                    return (
                      (r.init = function (e, t, r, n) {
                        if (((this.env = t || new _()), s.isObject(e)))
                          switch (e.type) {
                            case "code":
                              this.tmplProps = e.obj;
                              break;
                            case "string":
                              this.tmplStr = e.obj;
                              break;
                            default:
                              throw new Error(
                                "Unexpected template object type " +
                                  e.type +
                                  "; expected 'code', or 'string'"
                              );
                          }
                        else {
                          if (!s.isString(e))
                            throw new Error(
                              "src must be a string or an object describing the source"
                            );
                          this.tmplStr = e;
                        }
                        if (((this.path = r), n))
                          try {
                            this._compile();
                          } catch (e) {
                            throw s._prettifyError(
                              this.path,
                              this.env.opts.dev,
                              e
                            );
                          }
                        else this.compiled = !1;
                      }),
                      (r.render = function (e, t, r) {
                        var n = this;
                        "function" == typeof e
                          ? ((r = e), (e = {}))
                          : "function" == typeof t && ((r = t), (t = null));
                        var i = !t;
                        try {
                          this.compile();
                        } catch (e) {
                          var o = s._prettifyError(
                            this.path,
                            this.env.opts.dev,
                            e
                          );
                          if (r) return T(r, o);
                          throw o;
                        }
                        var a = new A(e || {}, this.blocks, this.env),
                          l = t ? t.push(!0) : new E();
                        l.topLevel = !0;
                        var c = null,
                          u = !1;
                        return (
                          this.rootRenderFunc(
                            this.env,
                            a,
                            l,
                            y,
                            function (e, t) {
                              if (!u || !r || void 0 === t)
                                if (
                                  (e &&
                                    ((e = s._prettifyError(
                                      n.path,
                                      n.env.opts.dev,
                                      e
                                    )),
                                    (u = !0)),
                                  r)
                                )
                                  i ? T(r, e, t) : r(e, t);
                                else {
                                  if (e) throw e;
                                  c = t;
                                }
                            }
                          ),
                          c
                        );
                      }),
                      (r.getExported = function (e, t, r) {
                        "function" == typeof e && ((r = e), (e = {})),
                          "function" == typeof t && ((r = t), (t = null));
                        try {
                          this.compile();
                        } catch (e) {
                          if (r) return r(e);
                          throw e;
                        }
                        var n = t ? t.push() : new E();
                        n.topLevel = !0;
                        var i = new A(e || {}, this.blocks, this.env);
                        this.rootRenderFunc(this.env, i, n, y, function (e) {
                          e ? r(e, null) : r(null, i.getExported());
                        });
                      }),
                      (r.compile = function () {
                        this.compiled || this._compile();
                      }),
                      (r._compile = function () {
                        var e;
                        if (this.tmplProps) e = this.tmplProps;
                        else {
                          var t = l.compile(
                            this.tmplStr,
                            this.env.asyncFilters,
                            this.env.extensionsList,
                            this.path,
                            this.env.opts
                          );
                          e = new Function(t)();
                        }
                        (this.blocks = this._getBlocks(e)),
                          (this.rootRenderFunc = e.root),
                          (this.compiled = !0);
                      }),
                      (r._getBlocks = function (e) {
                        var t = {};
                        return (
                          s.keys(e).forEach(function (r) {
                            "b_" === r.slice(0, 2) && (t[r.slice(2)] = e[r]);
                          }),
                          t
                        );
                      }),
                      t
                    );
                  })(v);
                e.exports = { Environment: _, Template: N };
              },
              function (e, t, r) {
                "use strict";
                function n(e, t) {
                  return (
                    (n =
                      Object.setPrototypeOf ||
                      function (e, t) {
                        return (e.__proto__ = t), e;
                      }),
                    n(e, t)
                  );
                }
                var i = r(9),
                  o = r(3),
                  a = r(1).Obj,
                  s = r(0),
                  l = (function (e) {
                    var t, r;
                    function a() {
                      return e.apply(this, arguments) || this;
                    }
                    (r = e),
                      ((t = a).prototype = Object.create(r.prototype)),
                      (t.prototype.constructor = t),
                      n(t, r);
                    var l = a.prototype;
                    return (
                      (l.init = function (e) {
                        (this.tokens = e),
                          (this.peeked = null),
                          (this.breakOnBlocks = null),
                          (this.dropLeadingWhitespace = !1),
                          (this.extensions = []);
                      }),
                      (l.nextToken = function (e) {
                        var t;
                        if (this.peeked) {
                          if (e || this.peeked.type !== i.TOKEN_WHITESPACE)
                            return (t = this.peeked), (this.peeked = null), t;
                          this.peeked = null;
                        }
                        if (((t = this.tokens.nextToken()), !e))
                          for (; t && t.type === i.TOKEN_WHITESPACE; )
                            t = this.tokens.nextToken();
                        return t;
                      }),
                      (l.peekToken = function () {
                        return (
                          (this.peeked = this.peeked || this.nextToken()),
                          this.peeked
                        );
                      }),
                      (l.pushToken = function (e) {
                        if (this.peeked)
                          throw new Error(
                            "pushToken: can only push one token on between reads"
                          );
                        this.peeked = e;
                      }),
                      (l.error = function (e, t, r) {
                        if (void 0 === t || void 0 === r) {
                          var n = this.peekToken() || {};
                          (t = n.lineno), (r = n.colno);
                        }
                        return (
                          void 0 !== t && (t += 1),
                          void 0 !== r && (r += 1),
                          new s.TemplateError(e, t, r)
                        );
                      }),
                      (l.fail = function (e, t, r) {
                        throw this.error(e, t, r);
                      }),
                      (l.skip = function (e) {
                        var t = this.nextToken();
                        return !(!t || t.type !== e) || (this.pushToken(t), !1);
                      }),
                      (l.expect = function (e) {
                        var t = this.nextToken();
                        return (
                          t.type !== e &&
                            this.fail(
                              "expected " + e + ", got " + t.type,
                              t.lineno,
                              t.colno
                            ),
                          t
                        );
                      }),
                      (l.skipValue = function (e, t) {
                        var r = this.nextToken();
                        return (
                          !(!r || r.type !== e || r.value !== t) ||
                          (this.pushToken(r), !1)
                        );
                      }),
                      (l.skipSymbol = function (e) {
                        return this.skipValue(i.TOKEN_SYMBOL, e);
                      }),
                      (l.advanceAfterBlockEnd = function (e) {
                        var t;
                        return (
                          e ||
                            ((t = this.peekToken()) ||
                              this.fail("unexpected end of file"),
                            t.type !== i.TOKEN_SYMBOL &&
                              this.fail(
                                "advanceAfterBlockEnd: expected symbol token or explicit name to be passed"
                              ),
                            (e = this.nextToken().value)),
                          (t = this.nextToken()) && t.type === i.TOKEN_BLOCK_END
                            ? "-" === t.value.charAt(0) &&
                              (this.dropLeadingWhitespace = !0)
                            : this.fail(
                                "expected block end in " + e + " statement"
                              ),
                          t
                        );
                      }),
                      (l.advanceAfterVariableEnd = function () {
                        var e = this.nextToken();
                        e && e.type === i.TOKEN_VARIABLE_END
                          ? (this.dropLeadingWhitespace =
                              "-" ===
                              e.value.charAt(
                                e.value.length -
                                  this.tokens.tags.VARIABLE_END.length -
                                  1
                              ))
                          : (this.pushToken(e),
                            this.fail("expected variable end"));
                      }),
                      (l.parseFor = function () {
                        var e,
                          t,
                          r = this.peekToken();
                        if (
                          (this.skipSymbol("for")
                            ? ((e = new o.For(r.lineno, r.colno)),
                              (t = "endfor"))
                            : this.skipSymbol("asyncEach")
                            ? ((e = new o.AsyncEach(r.lineno, r.colno)),
                              (t = "endeach"))
                            : this.skipSymbol("asyncAll")
                            ? ((e = new o.AsyncAll(r.lineno, r.colno)),
                              (t = "endall"))
                            : this.fail(
                                "parseFor: expected for{Async}",
                                r.lineno,
                                r.colno
                              ),
                          (e.name = this.parsePrimary()),
                          e.name instanceof o.Symbol ||
                            this.fail(
                              "parseFor: variable name expected for loop"
                            ),
                          this.peekToken().type === i.TOKEN_COMMA)
                        ) {
                          var n = e.name;
                          for (
                            e.name = new o.Array(n.lineno, n.colno),
                              e.name.addChild(n);
                            this.skip(i.TOKEN_COMMA);

                          ) {
                            var a = this.parsePrimary();
                            e.name.addChild(a);
                          }
                        }
                        return (
                          this.skipSymbol("in") ||
                            this.fail(
                              'parseFor: expected "in" keyword for loop',
                              r.lineno,
                              r.colno
                            ),
                          (e.arr = this.parseExpression()),
                          this.advanceAfterBlockEnd(r.value),
                          (e.body = this.parseUntilBlocks(t, "else")),
                          this.skipSymbol("else") &&
                            (this.advanceAfterBlockEnd("else"),
                            (e.else_ = this.parseUntilBlocks(t))),
                          this.advanceAfterBlockEnd(),
                          e
                        );
                      }),
                      (l.parseMacro = function () {
                        var e = this.peekToken();
                        this.skipSymbol("macro") || this.fail("expected macro");
                        var t = this.parsePrimary(!0),
                          r = this.parseSignature(),
                          n = new o.Macro(e.lineno, e.colno, t, r);
                        return (
                          this.advanceAfterBlockEnd(e.value),
                          (n.body = this.parseUntilBlocks("endmacro")),
                          this.advanceAfterBlockEnd(),
                          n
                        );
                      }),
                      (l.parseCall = function () {
                        var e = this.peekToken();
                        this.skipSymbol("call") || this.fail("expected call");
                        var t = this.parseSignature(!0) || new o.NodeList(),
                          r = this.parsePrimary();
                        this.advanceAfterBlockEnd(e.value);
                        var n = this.parseUntilBlocks("endcall");
                        this.advanceAfterBlockEnd();
                        var i = new o.Symbol(e.lineno, e.colno, "caller"),
                          a = new o.Caller(e.lineno, e.colno, i, t, n),
                          s = r.args.children;
                        return (
                          s[s.length - 1] instanceof o.KeywordArgs ||
                            s.push(new o.KeywordArgs()),
                          s[s.length - 1].addChild(
                            new o.Pair(e.lineno, e.colno, i, a)
                          ),
                          new o.Output(e.lineno, e.colno, [r])
                        );
                      }),
                      (l.parseWithContext = function () {
                        var e = this.peekToken(),
                          t = null;
                        return (
                          this.skipSymbol("with")
                            ? (t = !0)
                            : this.skipSymbol("without") && (t = !1),
                          null !== t &&
                            (this.skipSymbol("context") ||
                              this.fail(
                                "parseFrom: expected context after with/without",
                                e.lineno,
                                e.colno
                              )),
                          t
                        );
                      }),
                      (l.parseImport = function () {
                        var e = this.peekToken();
                        this.skipSymbol("import") ||
                          this.fail(
                            "parseImport: expected import",
                            e.lineno,
                            e.colno
                          );
                        var t = this.parseExpression();
                        this.skipSymbol("as") ||
                          this.fail(
                            'parseImport: expected "as" keyword',
                            e.lineno,
                            e.colno
                          );
                        var r = this.parseExpression(),
                          n = this.parseWithContext(),
                          i = new o.Import(e.lineno, e.colno, t, r, n);
                        return this.advanceAfterBlockEnd(e.value), i;
                      }),
                      (l.parseFrom = function () {
                        var e = this.peekToken();
                        this.skipSymbol("from") ||
                          this.fail("parseFrom: expected from");
                        var t = this.parseExpression();
                        this.skipSymbol("import") ||
                          this.fail(
                            "parseFrom: expected import",
                            e.lineno,
                            e.colno
                          );
                        for (var r, n = new o.NodeList(); ; ) {
                          var a = this.peekToken();
                          if (a.type === i.TOKEN_BLOCK_END) {
                            n.children.length ||
                              this.fail(
                                "parseFrom: Expected at least one import name",
                                e.lineno,
                                e.colno
                              ),
                              "-" === a.value.charAt(0) &&
                                (this.dropLeadingWhitespace = !0),
                              this.nextToken();
                            break;
                          }
                          n.children.length > 0 &&
                            !this.skip(i.TOKEN_COMMA) &&
                            this.fail(
                              "parseFrom: expected comma",
                              e.lineno,
                              e.colno
                            );
                          var s = this.parsePrimary();
                          if (
                            ("_" === s.value.charAt(0) &&
                              this.fail(
                                "parseFrom: names starting with an underscore cannot be imported",
                                s.lineno,
                                s.colno
                              ),
                            this.skipSymbol("as"))
                          ) {
                            var l = this.parsePrimary();
                            n.addChild(new o.Pair(s.lineno, s.colno, s, l));
                          } else n.addChild(s);
                          r = this.parseWithContext();
                        }
                        return new o.FromImport(e.lineno, e.colno, t, n, r);
                      }),
                      (l.parseBlock = function () {
                        var e = this.peekToken();
                        this.skipSymbol("block") ||
                          this.fail(
                            "parseBlock: expected block",
                            e.lineno,
                            e.colno
                          );
                        var t = new o.Block(e.lineno, e.colno);
                        (t.name = this.parsePrimary()),
                          t.name instanceof o.Symbol ||
                            this.fail(
                              "parseBlock: variable name expected",
                              e.lineno,
                              e.colno
                            ),
                          this.advanceAfterBlockEnd(e.value),
                          (t.body = this.parseUntilBlocks("endblock")),
                          this.skipSymbol("endblock"),
                          this.skipSymbol(t.name.value);
                        var r = this.peekToken();
                        return (
                          r ||
                            this.fail(
                              "parseBlock: expected endblock, got end of file"
                            ),
                          this.advanceAfterBlockEnd(r.value),
                          t
                        );
                      }),
                      (l.parseExtends = function () {
                        var e = this.peekToken();
                        this.skipSymbol("extends") ||
                          this.fail("parseTemplateRef: expected extends");
                        var t = new o.Extends(e.lineno, e.colno);
                        return (
                          (t.template = this.parseExpression()),
                          this.advanceAfterBlockEnd(e.value),
                          t
                        );
                      }),
                      (l.parseInclude = function () {
                        var e = this.peekToken();
                        this.skipSymbol("include") ||
                          this.fail("parseInclude: expected include");
                        var t = new o.Include(e.lineno, e.colno);
                        return (
                          (t.template = this.parseExpression()),
                          this.skipSymbol("ignore") &&
                            this.skipSymbol("missing") &&
                            (t.ignoreMissing = !0),
                          this.advanceAfterBlockEnd(e.value),
                          t
                        );
                      }),
                      (l.parseIf = function () {
                        var e,
                          t = this.peekToken();
                        this.skipSymbol("if") ||
                        this.skipSymbol("elif") ||
                        this.skipSymbol("elseif")
                          ? (e = new o.If(t.lineno, t.colno))
                          : this.skipSymbol("ifAsync")
                          ? (e = new o.IfAsync(t.lineno, t.colno))
                          : this.fail(
                              "parseIf: expected if, elif, or elseif",
                              t.lineno,
                              t.colno
                            ),
                          (e.cond = this.parseExpression()),
                          this.advanceAfterBlockEnd(t.value),
                          (e.body = this.parseUntilBlocks(
                            "elif",
                            "elseif",
                            "else",
                            "endif"
                          ));
                        var r = this.peekToken();
                        switch (r && r.value) {
                          case "elseif":
                          case "elif":
                            e.else_ = this.parseIf();
                            break;
                          case "else":
                            this.advanceAfterBlockEnd(),
                              (e.else_ = this.parseUntilBlocks("endif")),
                              this.advanceAfterBlockEnd();
                            break;
                          case "endif":
                            (e.else_ = null), this.advanceAfterBlockEnd();
                            break;
                          default:
                            this.fail(
                              "parseIf: expected elif, else, or endif, got end of file"
                            );
                        }
                        return e;
                      }),
                      (l.parseSet = function () {
                        var e = this.peekToken();
                        this.skipSymbol("set") ||
                          this.fail(
                            "parseSet: expected set",
                            e.lineno,
                            e.colno
                          );
                        for (
                          var t, r = new o.Set(e.lineno, e.colno, []);
                          (t = this.parsePrimary()) &&
                          (r.targets.push(t), this.skip(i.TOKEN_COMMA));

                        );
                        return (
                          this.skipValue(i.TOKEN_OPERATOR, "=")
                            ? ((r.value = this.parseExpression()),
                              this.advanceAfterBlockEnd(e.value))
                            : this.skip(i.TOKEN_BLOCK_END)
                            ? ((r.body = new o.Capture(
                                e.lineno,
                                e.colno,
                                this.parseUntilBlocks("endset")
                              )),
                              (r.value = null),
                              this.advanceAfterBlockEnd())
                            : this.fail(
                                "parseSet: expected = or block end in set tag",
                                e.lineno,
                                e.colno
                              ),
                          r
                        );
                      }),
                      (l.parseSwitch = function () {
                        var e = "switch",
                          t = "endswitch",
                          r = "case",
                          n = "default",
                          i = this.peekToken();
                        this.skipSymbol(e) ||
                          this.skipSymbol(r) ||
                          this.skipSymbol(n) ||
                          this.fail(
                            'parseSwitch: expected "switch," "case" or "default"',
                            i.lineno,
                            i.colno
                          );
                        var a = this.parseExpression();
                        this.advanceAfterBlockEnd(e),
                          this.parseUntilBlocks(r, n, t);
                        var s,
                          l = this.peekToken(),
                          c = [];
                        do {
                          this.skipSymbol(r);
                          var u = this.parseExpression();
                          this.advanceAfterBlockEnd(e);
                          var p = this.parseUntilBlocks(r, n, t);
                          c.push(new o.Case(l.line, l.col, u, p)),
                            (l = this.peekToken());
                        } while (l && l.value === r);
                        switch (l.value) {
                          case n:
                            this.advanceAfterBlockEnd(),
                              (s = this.parseUntilBlocks(t)),
                              this.advanceAfterBlockEnd();
                            break;
                          case t:
                            this.advanceAfterBlockEnd();
                            break;
                          default:
                            this.fail(
                              'parseSwitch: expected "case," "default" or "endswitch," got EOF.'
                            );
                        }
                        return new o.Switch(i.lineno, i.colno, a, c, s);
                      }),
                      (l.parseStatement = function () {
                        var e = this.peekToken();
                        if (
                          (e.type !== i.TOKEN_SYMBOL &&
                            this.fail("tag name expected", e.lineno, e.colno),
                          this.breakOnBlocks &&
                            -1 !== s.indexOf(this.breakOnBlocks, e.value))
                        )
                          return null;
                        switch (e.value) {
                          case "raw":
                            return this.parseRaw();
                          case "verbatim":
                            return this.parseRaw("verbatim");
                          case "if":
                          case "ifAsync":
                            return this.parseIf();
                          case "for":
                          case "asyncEach":
                          case "asyncAll":
                            return this.parseFor();
                          case "block":
                            return this.parseBlock();
                          case "extends":
                            return this.parseExtends();
                          case "include":
                            return this.parseInclude();
                          case "set":
                            return this.parseSet();
                          case "macro":
                            return this.parseMacro();
                          case "call":
                            return this.parseCall();
                          case "import":
                            return this.parseImport();
                          case "from":
                            return this.parseFrom();
                          case "filter":
                            return this.parseFilterStatement();
                          case "switch":
                            return this.parseSwitch();
                          default:
                            if (this.extensions.length)
                              for (var t = 0; t < this.extensions.length; t++) {
                                var r = this.extensions[t];
                                if (-1 !== s.indexOf(r.tags || [], e.value))
                                  return r.parse(this, o, i);
                              }
                            this.fail(
                              "unknown block tag: " + e.value,
                              e.lineno,
                              e.colno
                            );
                        }
                      }),
                      (l.parseRaw = function (e) {
                        for (
                          var t = "end" + (e = e || "raw"),
                            r = new RegExp(
                              "([\\s\\S]*?){%\\s*(" +
                                e +
                                "|" +
                                t +
                                ")\\s*(?=%})%}"
                            ),
                            n = 1,
                            i = "",
                            a = null,
                            s = this.advanceAfterBlockEnd();
                          (a = this.tokens._extractRegex(r)) && n > 0;

                        ) {
                          var l = a[0],
                            c = a[1],
                            u = a[2];
                          u === e ? (n += 1) : u === t && (n -= 1),
                            0 === n
                              ? ((i += c),
                                this.tokens.backN(l.length - c.length))
                              : (i += l);
                        }
                        return new o.Output(s.lineno, s.colno, [
                          new o.TemplateData(s.lineno, s.colno, i),
                        ]);
                      }),
                      (l.parsePostfix = function (e) {
                        for (var t, r = this.peekToken(); r; ) {
                          if (r.type === i.TOKEN_LEFT_PAREN)
                            e = new o.FunCall(
                              r.lineno,
                              r.colno,
                              e,
                              this.parseSignature()
                            );
                          else if (r.type === i.TOKEN_LEFT_BRACKET)
                            (t = this.parseAggregate()).children.length > 1 &&
                              this.fail("invalid index"),
                              (e = new o.LookupVal(
                                r.lineno,
                                r.colno,
                                e,
                                t.children[0]
                              ));
                          else {
                            if (r.type !== i.TOKEN_OPERATOR || "." !== r.value)
                              break;
                            this.nextToken();
                            var n = this.nextToken();
                            n.type !== i.TOKEN_SYMBOL &&
                              this.fail(
                                "expected name as lookup value, got " + n.value,
                                n.lineno,
                                n.colno
                              ),
                              (t = new o.Literal(n.lineno, n.colno, n.value)),
                              (e = new o.LookupVal(r.lineno, r.colno, e, t));
                          }
                          r = this.peekToken();
                        }
                        return e;
                      }),
                      (l.parseExpression = function () {
                        return this.parseInlineIf();
                      }),
                      (l.parseInlineIf = function () {
                        var e = this.parseOr();
                        if (this.skipSymbol("if")) {
                          var t = this.parseOr(),
                            r = e;
                          ((e = new o.InlineIf(e.lineno, e.colno)).body = r),
                            (e.cond = t),
                            this.skipSymbol("else")
                              ? (e.else_ = this.parseOr())
                              : (e.else_ = null);
                        }
                        return e;
                      }),
                      (l.parseOr = function () {
                        for (var e = this.parseAnd(); this.skipSymbol("or"); ) {
                          var t = this.parseAnd();
                          e = new o.Or(e.lineno, e.colno, e, t);
                        }
                        return e;
                      }),
                      (l.parseAnd = function () {
                        for (
                          var e = this.parseNot();
                          this.skipSymbol("and");

                        ) {
                          var t = this.parseNot();
                          e = new o.And(e.lineno, e.colno, e, t);
                        }
                        return e;
                      }),
                      (l.parseNot = function () {
                        var e = this.peekToken();
                        return this.skipSymbol("not")
                          ? new o.Not(e.lineno, e.colno, this.parseNot())
                          : this.parseIn();
                      }),
                      (l.parseIn = function () {
                        for (var e = this.parseIs(); ; ) {
                          var t = this.nextToken();
                          if (!t) break;
                          var r =
                            t.type === i.TOKEN_SYMBOL && "not" === t.value;
                          if (
                            (r || this.pushToken(t), !this.skipSymbol("in"))
                          ) {
                            r && this.pushToken(t);
                            break;
                          }
                          var n = this.parseIs();
                          (e = new o.In(e.lineno, e.colno, e, n)),
                            r && (e = new o.Not(e.lineno, e.colno, e));
                        }
                        return e;
                      }),
                      (l.parseIs = function () {
                        var e = this.parseCompare();
                        if (this.skipSymbol("is")) {
                          var t = this.skipSymbol("not"),
                            r = this.parseCompare();
                          (e = new o.Is(e.lineno, e.colno, e, r)),
                            t && (e = new o.Not(e.lineno, e.colno, e));
                        }
                        return e;
                      }),
                      (l.parseCompare = function () {
                        for (
                          var e = [
                              "==",
                              "===",
                              "!=",
                              "!==",
                              "<",
                              ">",
                              "<=",
                              ">=",
                            ],
                            t = this.parseConcat(),
                            r = [];
                          ;

                        ) {
                          var n = this.nextToken();
                          if (!n) break;
                          if (-1 === e.indexOf(n.value)) {
                            this.pushToken(n);
                            break;
                          }
                          r.push(
                            new o.CompareOperand(
                              n.lineno,
                              n.colno,
                              this.parseConcat(),
                              n.value
                            )
                          );
                        }
                        return r.length
                          ? new o.Compare(r[0].lineno, r[0].colno, t, r)
                          : t;
                      }),
                      (l.parseConcat = function () {
                        for (
                          var e = this.parseAdd();
                          this.skipValue(i.TOKEN_TILDE, "~");

                        ) {
                          var t = this.parseAdd();
                          e = new o.Concat(e.lineno, e.colno, e, t);
                        }
                        return e;
                      }),
                      (l.parseAdd = function () {
                        for (
                          var e = this.parseSub();
                          this.skipValue(i.TOKEN_OPERATOR, "+");

                        ) {
                          var t = this.parseSub();
                          e = new o.Add(e.lineno, e.colno, e, t);
                        }
                        return e;
                      }),
                      (l.parseSub = function () {
                        for (
                          var e = this.parseMul();
                          this.skipValue(i.TOKEN_OPERATOR, "-");

                        ) {
                          var t = this.parseMul();
                          e = new o.Sub(e.lineno, e.colno, e, t);
                        }
                        return e;
                      }),
                      (l.parseMul = function () {
                        for (
                          var e = this.parseDiv();
                          this.skipValue(i.TOKEN_OPERATOR, "*");

                        ) {
                          var t = this.parseDiv();
                          e = new o.Mul(e.lineno, e.colno, e, t);
                        }
                        return e;
                      }),
                      (l.parseDiv = function () {
                        for (
                          var e = this.parseFloorDiv();
                          this.skipValue(i.TOKEN_OPERATOR, "/");

                        ) {
                          var t = this.parseFloorDiv();
                          e = new o.Div(e.lineno, e.colno, e, t);
                        }
                        return e;
                      }),
                      (l.parseFloorDiv = function () {
                        for (
                          var e = this.parseMod();
                          this.skipValue(i.TOKEN_OPERATOR, "//");

                        ) {
                          var t = this.parseMod();
                          e = new o.FloorDiv(e.lineno, e.colno, e, t);
                        }
                        return e;
                      }),
                      (l.parseMod = function () {
                        for (
                          var e = this.parsePow();
                          this.skipValue(i.TOKEN_OPERATOR, "%");

                        ) {
                          var t = this.parsePow();
                          e = new o.Mod(e.lineno, e.colno, e, t);
                        }
                        return e;
                      }),
                      (l.parsePow = function () {
                        for (
                          var e = this.parseUnary();
                          this.skipValue(i.TOKEN_OPERATOR, "**");

                        ) {
                          var t = this.parseUnary();
                          e = new o.Pow(e.lineno, e.colno, e, t);
                        }
                        return e;
                      }),
                      (l.parseUnary = function (e) {
                        var t,
                          r = this.peekToken();
                        return (
                          (t = this.skipValue(i.TOKEN_OPERATOR, "-")
                            ? new o.Neg(r.lineno, r.colno, this.parseUnary(!0))
                            : this.skipValue(i.TOKEN_OPERATOR, "+")
                            ? new o.Pos(r.lineno, r.colno, this.parseUnary(!0))
                            : this.parsePrimary()),
                          e || (t = this.parseFilter(t)),
                          t
                        );
                      }),
                      (l.parsePrimary = function (e) {
                        var t,
                          r = this.nextToken(),
                          n = null;
                        if (
                          (r
                            ? r.type === i.TOKEN_STRING
                              ? (t = r.value)
                              : r.type === i.TOKEN_INT
                              ? (t = parseInt(r.value, 10))
                              : r.type === i.TOKEN_FLOAT
                              ? (t = parseFloat(r.value))
                              : r.type === i.TOKEN_BOOLEAN
                              ? "true" === r.value
                                ? (t = !0)
                                : "false" === r.value
                                ? (t = !1)
                                : this.fail(
                                    "invalid boolean: " + r.value,
                                    r.lineno,
                                    r.colno
                                  )
                              : r.type === i.TOKEN_NONE
                              ? (t = null)
                              : r.type === i.TOKEN_REGEX &&
                                (t = new RegExp(r.value.body, r.value.flags))
                            : this.fail("expected expression, got end of file"),
                          void 0 !== t
                            ? (n = new o.Literal(r.lineno, r.colno, t))
                            : r.type === i.TOKEN_SYMBOL
                            ? (n = new o.Symbol(r.lineno, r.colno, r.value))
                            : (this.pushToken(r), (n = this.parseAggregate())),
                          e || (n = this.parsePostfix(n)),
                          n)
                        )
                          return n;
                        throw this.error(
                          "unexpected token: " + r.value,
                          r.lineno,
                          r.colno
                        );
                      }),
                      (l.parseFilterName = function () {
                        for (
                          var e = this.expect(i.TOKEN_SYMBOL), t = e.value;
                          this.skipValue(i.TOKEN_OPERATOR, ".");

                        )
                          t += "." + this.expect(i.TOKEN_SYMBOL).value;
                        return new o.Symbol(e.lineno, e.colno, t);
                      }),
                      (l.parseFilterArgs = function (e) {
                        return this.peekToken().type === i.TOKEN_LEFT_PAREN
                          ? this.parsePostfix(e).args.children
                          : [];
                      }),
                      (l.parseFilter = function (e) {
                        for (; this.skip(i.TOKEN_PIPE); ) {
                          var t = this.parseFilterName();
                          e = new o.Filter(
                            t.lineno,
                            t.colno,
                            t,
                            new o.NodeList(
                              t.lineno,
                              t.colno,
                              [e].concat(this.parseFilterArgs(e))
                            )
                          );
                        }
                        return e;
                      }),
                      (l.parseFilterStatement = function () {
                        var e = this.peekToken();
                        this.skipSymbol("filter") ||
                          this.fail("parseFilterStatement: expected filter");
                        var t = this.parseFilterName(),
                          r = this.parseFilterArgs(t);
                        this.advanceAfterBlockEnd(e.value);
                        var n = new o.Capture(
                          t.lineno,
                          t.colno,
                          this.parseUntilBlocks("endfilter")
                        );
                        this.advanceAfterBlockEnd();
                        var i = new o.Filter(
                          t.lineno,
                          t.colno,
                          t,
                          new o.NodeList(t.lineno, t.colno, [n].concat(r))
                        );
                        return new o.Output(t.lineno, t.colno, [i]);
                      }),
                      (l.parseAggregate = function () {
                        var e,
                          t = this.nextToken();
                        switch (t.type) {
                          case i.TOKEN_LEFT_PAREN:
                            e = new o.Group(t.lineno, t.colno);
                            break;
                          case i.TOKEN_LEFT_BRACKET:
                            e = new o.Array(t.lineno, t.colno);
                            break;
                          case i.TOKEN_LEFT_CURLY:
                            e = new o.Dict(t.lineno, t.colno);
                            break;
                          default:
                            return null;
                        }
                        for (;;) {
                          var r = this.peekToken().type;
                          if (
                            r === i.TOKEN_RIGHT_PAREN ||
                            r === i.TOKEN_RIGHT_BRACKET ||
                            r === i.TOKEN_RIGHT_CURLY
                          ) {
                            this.nextToken();
                            break;
                          }
                          if (
                            (e.children.length > 0 &&
                              (this.skip(i.TOKEN_COMMA) ||
                                this.fail(
                                  "parseAggregate: expected comma after expression",
                                  t.lineno,
                                  t.colno
                                )),
                            e instanceof o.Dict)
                          ) {
                            var n = this.parsePrimary();
                            this.skip(i.TOKEN_COLON) ||
                              this.fail(
                                "parseAggregate: expected colon after dict key",
                                t.lineno,
                                t.colno
                              );
                            var a = this.parseExpression();
                            e.addChild(new o.Pair(n.lineno, n.colno, n, a));
                          } else {
                            var s = this.parseExpression();
                            e.addChild(s);
                          }
                        }
                        return e;
                      }),
                      (l.parseSignature = function (e, t) {
                        var r = this.peekToken();
                        if (!t && r.type !== i.TOKEN_LEFT_PAREN) {
                          if (e) return null;
                          this.fail("expected arguments", r.lineno, r.colno);
                        }
                        r.type === i.TOKEN_LEFT_PAREN && (r = this.nextToken());
                        for (
                          var n = new o.NodeList(r.lineno, r.colno),
                            a = new o.KeywordArgs(r.lineno, r.colno),
                            s = !1;
                          ;

                        ) {
                          if (
                            ((r = this.peekToken()),
                            !t && r.type === i.TOKEN_RIGHT_PAREN)
                          ) {
                            this.nextToken();
                            break;
                          }
                          if (t && r.type === i.TOKEN_BLOCK_END) break;
                          if (s && !this.skip(i.TOKEN_COMMA))
                            this.fail(
                              "parseSignature: expected comma after expression",
                              r.lineno,
                              r.colno
                            );
                          else {
                            var l = this.parseExpression();
                            this.skipValue(i.TOKEN_OPERATOR, "=")
                              ? a.addChild(
                                  new o.Pair(
                                    l.lineno,
                                    l.colno,
                                    l,
                                    this.parseExpression()
                                  )
                                )
                              : n.addChild(l);
                          }
                          s = !0;
                        }
                        return a.children.length && n.addChild(a), n;
                      }),
                      (l.parseUntilBlocks = function () {
                        for (
                          var e = this.breakOnBlocks,
                            t = arguments.length,
                            r = new Array(t),
                            n = 0;
                          n < t;
                          n++
                        )
                          r[n] = arguments[n];
                        this.breakOnBlocks = r;
                        var i = this.parse();
                        return (this.breakOnBlocks = e), i;
                      }),
                      (l.parseNodes = function () {
                        for (var e, t = []; (e = this.nextToken()); )
                          if (e.type === i.TOKEN_DATA) {
                            var r = e.value,
                              n = this.peekToken(),
                              a = n && n.value;
                            this.dropLeadingWhitespace &&
                              ((r = r.replace(/^\s*/, "")),
                              (this.dropLeadingWhitespace = !1)),
                              n &&
                                ((n.type === i.TOKEN_BLOCK_START &&
                                  "-" === a.charAt(a.length - 1)) ||
                                  (n.type === i.TOKEN_VARIABLE_START &&
                                    "-" ===
                                      a.charAt(
                                        this.tokens.tags.VARIABLE_START.length
                                      )) ||
                                  (n.type === i.TOKEN_COMMENT &&
                                    "-" ===
                                      a.charAt(
                                        this.tokens.tags.COMMENT_START.length
                                      ))) &&
                                (r = r.replace(/\s*$/, "")),
                              t.push(
                                new o.Output(e.lineno, e.colno, [
                                  new o.TemplateData(e.lineno, e.colno, r),
                                ])
                              );
                          } else if (e.type === i.TOKEN_BLOCK_START) {
                            this.dropLeadingWhitespace = !1;
                            var s = this.parseStatement();
                            if (!s) break;
                            t.push(s);
                          } else if (e.type === i.TOKEN_VARIABLE_START) {
                            var l = this.parseExpression();
                            (this.dropLeadingWhitespace = !1),
                              this.advanceAfterVariableEnd(),
                              t.push(new o.Output(e.lineno, e.colno, [l]));
                          } else
                            e.type === i.TOKEN_COMMENT
                              ? (this.dropLeadingWhitespace =
                                  "-" ===
                                  e.value.charAt(
                                    e.value.length -
                                      this.tokens.tags.COMMENT_END.length -
                                      1
                                  ))
                              : this.fail(
                                  "Unexpected token at top-level: " + e.type,
                                  e.lineno,
                                  e.colno
                                );
                        return t;
                      }),
                      (l.parse = function () {
                        return new o.NodeList(0, 0, this.parseNodes());
                      }),
                      (l.parseAsRoot = function () {
                        return new o.Root(0, 0, this.parseNodes());
                      }),
                      a
                    );
                  })(a);
                e.exports = {
                  parse: function (e, t, r) {
                    var n = new l(i.lex(e, r));
                    return void 0 !== t && (n.extensions = t), n.parseAsRoot();
                  },
                  Parser: l,
                };
              },
              function (e, t, r) {
                "use strict";
                var n = r(0),
                  i = " \n\t\r ",
                  o = "()[]{}%*-+~/#,:|.<>=!",
                  a = "string",
                  s = "whitespace",
                  l = "data",
                  c = "block-start",
                  u = "block-end",
                  p = "variable-start",
                  d = "variable-end",
                  f = "comment",
                  h = "left-paren",
                  m = "right-paren",
                  g = "left-bracket",
                  v = "right-bracket",
                  b = "left-curly",
                  y = "right-curly",
                  w = "operator",
                  E = "comma",
                  x = "colon",
                  T = "tilde",
                  k = "pipe",
                  _ = "float",
                  A = "boolean",
                  N = "none",
                  L = "symbol",
                  O = "regex";
                function S(e, t, r, n) {
                  return { type: e, value: t, lineno: r, colno: n };
                }
                var C = (function () {
                  function e(e, t) {
                    (this.str = e),
                      (this.index = 0),
                      (this.len = e.length),
                      (this.lineno = 0),
                      (this.colno = 0),
                      (this.in_code = !1);
                    var r = (t = t || {}).tags || {};
                    (this.tags = {
                      BLOCK_START: r.blockStart || "{%",
                      BLOCK_END: r.blockEnd || "%}",
                      VARIABLE_START: r.variableStart || "{{",
                      VARIABLE_END: r.variableEnd || "}}",
                      COMMENT_START: r.commentStart || "{#",
                      COMMENT_END: r.commentEnd || "#}",
                    }),
                      (this.trimBlocks = !!t.trimBlocks),
                      (this.lstripBlocks = !!t.lstripBlocks);
                  }
                  var t = e.prototype;
                  return (
                    (t.nextToken = function () {
                      var e,
                        t = this.lineno,
                        r = this.colno;
                      if (this.in_code) {
                        var C = this.current();
                        if (this.isFinished()) return null;
                        if ('"' === C || "'" === C)
                          return S(a, this._parseString(C), t, r);
                        if ((e = this._extract(i))) return S(s, e, t, r);
                        if (
                          (e = this._extractString(this.tags.BLOCK_END)) ||
                          (e = this._extractString("-" + this.tags.BLOCK_END))
                        )
                          return (
                            (this.in_code = !1),
                            this.trimBlocks &&
                              ("\n" === (C = this.current())
                                ? this.forward()
                                : "\r" === C &&
                                  (this.forward(),
                                  "\n" === (C = this.current())
                                    ? this.forward()
                                    : this.back())),
                            S(u, e, t, r)
                          );
                        if (
                          (e = this._extractString(this.tags.VARIABLE_END)) ||
                          (e = this._extractString(
                            "-" + this.tags.VARIABLE_END
                          ))
                        )
                          return (this.in_code = !1), S(d, e, t, r);
                        if (
                          "r" === C &&
                          "/" === this.str.charAt(this.index + 1)
                        ) {
                          this.forwardN(2);
                          for (var D = ""; !this.isFinished(); ) {
                            if (
                              "/" === this.current() &&
                              "\\" !== this.previous()
                            ) {
                              this.forward();
                              break;
                            }
                            (D += this.current()), this.forward();
                          }
                          for (
                            var q = ["g", "i", "m", "y"], R = "";
                            !this.isFinished() &&
                            -1 !== q.indexOf(this.current());

                          )
                            (R += this.current()), this.forward();
                          return S(O, { body: D, flags: R }, t, r);
                        }
                        if (-1 !== o.indexOf(C)) {
                          this.forward();
                          var j,
                            P = [
                              "==",
                              "===",
                              "!=",
                              "!==",
                              "<=",
                              ">=",
                              "//",
                              "**",
                            ],
                            B = C + this.current();
                          switch (
                            (-1 !== n.indexOf(P, B) &&
                              (this.forward(),
                              (C = B),
                              -1 !== n.indexOf(P, B + this.current()) &&
                                ((C = B + this.current()), this.forward())),
                            C)
                          ) {
                            case "(":
                              j = h;
                              break;
                            case ")":
                              j = m;
                              break;
                            case "[":
                              j = g;
                              break;
                            case "]":
                              j = v;
                              break;
                            case "{":
                              j = b;
                              break;
                            case "}":
                              j = y;
                              break;
                            case ",":
                              j = E;
                              break;
                            case ":":
                              j = x;
                              break;
                            case "~":
                              j = T;
                              break;
                            case "|":
                              j = k;
                              break;
                            default:
                              j = w;
                          }
                          return S(j, C, t, r);
                        }
                        if (
                          (e = this._extractUntil(i + o)).match(/^[-+]?[0-9]+$/)
                        ) {
                          if ("." === this.current()) {
                            this.forward();
                            var F = this._extract("0123456789");
                            return S(_, e + "." + F, t, r);
                          }
                          return S("int", e, t, r);
                        }
                        if (e.match(/^(true|false)$/)) return S(A, e, t, r);
                        if ("none" === e) return S(N, e, t, r);
                        if ("null" === e) return S(N, e, t, r);
                        if (e) return S(L, e, t, r);
                        throw new Error("Unexpected value while parsing: " + e);
                      }
                      var M,
                        I =
                          this.tags.BLOCK_START.charAt(0) +
                          this.tags.VARIABLE_START.charAt(0) +
                          this.tags.COMMENT_START.charAt(0) +
                          this.tags.COMMENT_END.charAt(0);
                      if (this.isFinished()) return null;
                      if (
                        (e = this._extractString(
                          this.tags.BLOCK_START + "-"
                        )) ||
                        (e = this._extractString(this.tags.BLOCK_START))
                      )
                        return (this.in_code = !0), S(c, e, t, r);
                      if (
                        (e = this._extractString(
                          this.tags.VARIABLE_START + "-"
                        )) ||
                        (e = this._extractString(this.tags.VARIABLE_START))
                      )
                        return (this.in_code = !0), S(p, e, t, r);
                      e = "";
                      var U = !1;
                      for (
                        this._matches(this.tags.COMMENT_START) &&
                        ((U = !0),
                        (e = this._extractString(this.tags.COMMENT_START)));
                        null !== (M = this._extractUntil(I));

                      ) {
                        if (
                          ((e += M),
                          (this._matches(this.tags.BLOCK_START) ||
                            this._matches(this.tags.VARIABLE_START) ||
                            this._matches(this.tags.COMMENT_START)) &&
                            !U)
                        ) {
                          if (
                            this.lstripBlocks &&
                            this._matches(this.tags.BLOCK_START) &&
                            this.colno > 0 &&
                            this.colno <= e.length
                          ) {
                            var V = e.slice(-this.colno);
                            if (
                              /^\s+$/.test(V) &&
                              !(e = e.slice(0, -this.colno)).length
                            )
                              return this.nextToken();
                          }
                          break;
                        }
                        if (this._matches(this.tags.COMMENT_END)) {
                          if (!U) throw new Error("unexpected end of comment");
                          e += this._extractString(this.tags.COMMENT_END);
                          break;
                        }
                        (e += this.current()), this.forward();
                      }
                      if (null === M && U)
                        throw new Error(
                          "expected end of comment, got end of file"
                        );
                      return S(U ? f : l, e, t, r);
                    }),
                    (t._parseString = function (e) {
                      this.forward();
                      for (
                        var t = "";
                        !this.isFinished() && this.current() !== e;

                      ) {
                        var r = this.current();
                        if ("\\" === r) {
                          switch ((this.forward(), this.current())) {
                            case "n":
                              t += "\n";
                              break;
                            case "t":
                              t += "\t";
                              break;
                            case "r":
                              t += "\r";
                              break;
                            default:
                              t += this.current();
                          }
                          this.forward();
                        } else (t += r), this.forward();
                      }
                      return this.forward(), t;
                    }),
                    (t._matches = function (e) {
                      return this.index + e.length > this.len
                        ? null
                        : this.str.slice(this.index, this.index + e.length) ===
                            e;
                    }),
                    (t._extractString = function (e) {
                      return this._matches(e)
                        ? (this.forwardN(e.length), e)
                        : null;
                    }),
                    (t._extractUntil = function (e) {
                      return this._extractMatching(!0, e || "");
                    }),
                    (t._extract = function (e) {
                      return this._extractMatching(!1, e);
                    }),
                    (t._extractMatching = function (e, t) {
                      if (this.isFinished()) return null;
                      var r = t.indexOf(this.current());
                      if ((e && -1 === r) || (!e && -1 !== r)) {
                        var n = this.current();
                        this.forward();
                        for (
                          var i = t.indexOf(this.current());
                          ((e && -1 === i) || (!e && -1 !== i)) &&
                          !this.isFinished();

                        )
                          (n += this.current()),
                            this.forward(),
                            (i = t.indexOf(this.current()));
                        return n;
                      }
                      return "";
                    }),
                    (t._extractRegex = function (e) {
                      var t = this.currentStr().match(e);
                      return t ? (this.forwardN(t[0].length), t) : null;
                    }),
                    (t.isFinished = function () {
                      return this.index >= this.len;
                    }),
                    (t.forwardN = function (e) {
                      for (var t = 0; t < e; t++) this.forward();
                    }),
                    (t.forward = function () {
                      this.index++,
                        "\n" === this.previous()
                          ? (this.lineno++, (this.colno = 0))
                          : this.colno++;
                    }),
                    (t.backN = function (e) {
                      for (var t = 0; t < e; t++) this.back();
                    }),
                    (t.back = function () {
                      if ((this.index--, "\n" === this.current())) {
                        this.lineno--;
                        var e = this.src.lastIndexOf("\n", this.index - 1);
                        this.colno = -1 === e ? this.index : this.index - e;
                      } else this.colno--;
                    }),
                    (t.current = function () {
                      return this.isFinished()
                        ? ""
                        : this.str.charAt(this.index);
                    }),
                    (t.currentStr = function () {
                      return this.isFinished()
                        ? ""
                        : this.str.substr(this.index);
                    }),
                    (t.previous = function () {
                      return this.str.charAt(this.index - 1);
                    }),
                    e
                  );
                })();
                e.exports = {
                  lex: function (e, t) {
                    return new C(e, t);
                  },
                  TOKEN_STRING: a,
                  TOKEN_WHITESPACE: s,
                  TOKEN_DATA: l,
                  TOKEN_BLOCK_START: c,
                  TOKEN_BLOCK_END: u,
                  TOKEN_VARIABLE_START: p,
                  TOKEN_VARIABLE_END: d,
                  TOKEN_COMMENT: f,
                  TOKEN_LEFT_PAREN: h,
                  TOKEN_RIGHT_PAREN: m,
                  TOKEN_LEFT_BRACKET: g,
                  TOKEN_RIGHT_BRACKET: v,
                  TOKEN_LEFT_CURLY: b,
                  TOKEN_RIGHT_CURLY: y,
                  TOKEN_OPERATOR: w,
                  TOKEN_COMMA: E,
                  TOKEN_COLON: x,
                  TOKEN_TILDE: T,
                  TOKEN_PIPE: k,
                  TOKEN_INT: "int",
                  TOKEN_FLOAT: _,
                  TOKEN_BOOLEAN: A,
                  TOKEN_NONE: N,
                  TOKEN_SYMBOL: L,
                  TOKEN_SPECIAL: "special",
                  TOKEN_REGEX: O,
                };
              },
              function (e, t, r) {
                "use strict";
                function n(e, t) {
                  return (
                    (n =
                      Object.setPrototypeOf ||
                      function (e, t) {
                        return (e.__proto__ = t), e;
                      }),
                    n(e, t)
                  );
                }
                var i = r(6),
                  o = r(19).PrecompiledLoader,
                  a = (function (e) {
                    var t, r;
                    function i(t, r) {
                      var n;
                      return (
                        ((n = e.call(this) || this).baseURL = t || "."),
                        (r = r || {}),
                        (n.useCache = !!r.useCache),
                        (n.async = !!r.async),
                        n
                      );
                    }
                    (r = e),
                      ((t = i).prototype = Object.create(r.prototype)),
                      (t.prototype.constructor = t),
                      n(t, r);
                    var o = i.prototype;
                    return (
                      (o.resolve = function (e, t) {
                        throw new Error(
                          "relative templates not support in the browser yet"
                        );
                      }),
                      (o.getSource = function (e, t) {
                        var r,
                          n = this,
                          i = this.useCache;
                        return (
                          this.fetch(this.baseURL + "/" + e, function (o, a) {
                            if (o)
                              if (t) t(o.content);
                              else {
                                if (404 !== o.status) throw o.content;
                                r = null;
                              }
                            else
                              (r = { src: a, path: e, noCache: !i }),
                                n.emit("load", e, r),
                                t && t(null, r);
                          }),
                          r
                        );
                      }),
                      (o.fetch = function (e, t) {
                        if ("undefined" == typeof window)
                          throw new Error(
                            "WebLoader can only by used in a browser"
                          );
                        var r = new XMLHttpRequest(),
                          n = !0;
                        (r.onreadystatechange = function () {
                          4 === r.readyState &&
                            n &&
                            ((n = !1),
                            0 === r.status || 200 === r.status
                              ? t(null, r.responseText)
                              : t({
                                  status: r.status,
                                  content: r.responseText,
                                }));
                        }),
                          (e +=
                            (-1 === e.indexOf("?") ? "?" : "&") +
                            "s=" +
                            new Date().getTime()),
                          r.open("GET", e, this.async),
                          r.send();
                      }),
                      i
                    );
                  })(i);
                e.exports = { WebLoader: a, PrecompiledLoader: o };
              },
              function (e, t, r) {
                "use strict";
                var n,
                  i = r(0),
                  o = r(7),
                  a = o.Environment,
                  s = o.Template,
                  l = r(6),
                  c = r(10),
                  u = r(23),
                  p = r(5),
                  d = r(8),
                  f = r(9),
                  h = r(2),
                  m = r(3),
                  g = r(25);
                function v(e, t) {
                  var r;
                  return (
                    (t = t || {}),
                    i.isObject(e) && ((t = e), (e = null)),
                    c.FileSystemLoader
                      ? (r = new c.FileSystemLoader(e, {
                          watch: t.watch,
                          noCache: t.noCache,
                        }))
                      : c.WebLoader &&
                        (r = new c.WebLoader(e, {
                          useCache: t.web && t.web.useCache,
                          async: t.web && t.web.async,
                        })),
                    (n = new a(r, t)),
                    t && t.express && n.express(t.express),
                    n
                  );
                }
                e.exports = {
                  Environment: a,
                  Template: s,
                  Loader: l,
                  FileSystemLoader: c.FileSystemLoader,
                  NodeResolveLoader: c.NodeResolveLoader,
                  PrecompiledLoader: c.PrecompiledLoader,
                  WebLoader: c.WebLoader,
                  compiler: p,
                  parser: d,
                  lexer: f,
                  runtime: h,
                  lib: i,
                  nodes: m,
                  installJinjaCompat: g,
                  configure: v,
                  reset: function () {
                    n = void 0;
                  },
                  compile: function (e, t, r, i) {
                    return n || v(), new s(e, t, r, i);
                  },
                  render: function (e, t, r) {
                    return n || v(), n.render(e, t, r);
                  },
                  renderString: function (e, t, r) {
                    return n || v(), n.renderString(e, t, r);
                  },
                  precompile: u ? u.precompile : void 0,
                  precompileString: u ? u.precompileString : void 0,
                };
              },
              function (e, t, r) {
                "use strict";
                var n = r(13),
                  i = [],
                  o = [],
                  a = n.makeRequestCallFromTimer(function () {
                    if (o.length) throw o.shift();
                  });
                function s(e) {
                  var t;
                  ((t = i.length ? i.pop() : new l()).task = e), n(t);
                }
                function l() {
                  this.task = null;
                }
                (e.exports = s),
                  (l.prototype.call = function () {
                    try {
                      this.task.call();
                    } catch (e) {
                      s.onerror ? s.onerror(e) : (o.push(e), a());
                    } finally {
                      (this.task = null), (i[i.length] = this);
                    }
                  });
              },
              function (e, t, r) {
                "use strict";
                (function (t) {
                  function r(e) {
                    i.length || n(), (i[i.length] = e);
                  }
                  e.exports = r;
                  var n,
                    i = [],
                    o = 0;
                  function a() {
                    for (; o < i.length; ) {
                      var e = o;
                      if (((o += 1), i[e].call(), o > 1024)) {
                        for (var t = 0, r = i.length - o; t < r; t++)
                          i[t] = i[t + o];
                        (i.length -= o), (o = 0);
                      }
                    }
                    (i.length = 0), (o = 0);
                  }
                  var s,
                    l,
                    c,
                    u = void 0 !== t ? t : self,
                    p = u.MutationObserver || u.WebKitMutationObserver;
                  function d(e) {
                    return function () {
                      var t = setTimeout(n, 0),
                        r = setInterval(n, 50);
                      function n() {
                        clearTimeout(t), clearInterval(r), e();
                      }
                    };
                  }
                  "function" == typeof p
                    ? ((s = 1),
                      (l = new p(a)),
                      (c = document.createTextNode("")),
                      l.observe(c, { characterData: !0 }),
                      (n = function () {
                        (s = -s), (c.data = s);
                      }))
                    : (n = d(a)),
                    (r.requestFlush = n),
                    (r.makeRequestCallFromTimer = d);
                }.call(t, r(14)));
              },
              function (e, t) {
                var r;
                r = (function () {
                  return this;
                })();
                try {
                  r = r || Function("return this")() || (0, eval)("this");
                } catch (e) {
                  "object" == typeof window && (r = window);
                }
                e.exports = r;
              },
              function (e, t, r) {
                var n;
                !(function (r) {
                  "use strict";
                  var i = function () {
                      var e = Array.prototype.slice.call(arguments);
                      "function" == typeof e[0] &&
                        e[0].apply(null, e.splice(1));
                    },
                    o = function (e) {
                      "function" == typeof setImmediate
                        ? setImmediate(e)
                        : "undefined" != typeof process && process.nextTick
                        ? process.nextTick(e)
                        : setTimeout(e, 0);
                    },
                    a =
                      Array.isArray ||
                      function (e) {
                        return (
                          "[object Array]" === Object.prototype.toString.call(e)
                        );
                      },
                    s = function (e, t, r) {
                      var n = r ? o : i;
                      if (((t = t || function () {}), !a(e))) {
                        var s = new Error(
                          "First argument to waterfall must be an array of functions"
                        );
                        return t(s);
                      }
                      if (!e.length) return t();
                      var l = function (e) {
                        return function (r) {
                          if (r) t.apply(null, arguments), (t = function () {});
                          else {
                            var i = Array.prototype.slice.call(arguments, 1),
                              o = e.next();
                            o ? i.push(l(o)) : i.push(t),
                              n(function () {
                                e.apply(null, i);
                              });
                          }
                        };
                      };
                      l(
                        (function (e) {
                          var t = function (r) {
                            var n = function () {
                              return (
                                e.length && e[r].apply(null, arguments),
                                n.next()
                              );
                            };
                            return (
                              (n.next = function () {
                                return r < e.length - 1 ? t(r + 1) : null;
                              }),
                              n
                            );
                          };
                          return t(0);
                        })(e)
                      )();
                    };
                  void 0 ===
                    (n = function () {
                      return s;
                    }.apply(t, [])) || (e.exports = n);
                })();
              },
              function (e, t, r) {
                "use strict";
                var n,
                  i = "object" == typeof Reflect ? Reflect : null,
                  o =
                    i && "function" == typeof i.apply
                      ? i.apply
                      : function (e, t, r) {
                          return Function.prototype.apply.call(e, t, r);
                        };
                n =
                  i && "function" == typeof i.ownKeys
                    ? i.ownKeys
                    : Object.getOwnPropertySymbols
                    ? function (e) {
                        return Object.getOwnPropertyNames(e).concat(
                          Object.getOwnPropertySymbols(e)
                        );
                      }
                    : function (e) {
                        return Object.getOwnPropertyNames(e);
                      };
                var a =
                  Number.isNaN ||
                  function (e) {
                    return e != e;
                  };
                function s() {
                  s.init.call(this);
                }
                (e.exports = s),
                  (e.exports.once = function (e, t) {
                    return new Promise(function (r, n) {
                      function i() {
                        void 0 !== o && e.removeListener("error", o),
                          r([].slice.call(arguments));
                      }
                      var o;
                      "error" !== t &&
                        ((o = function (r) {
                          e.removeListener(t, i), n(r);
                        }),
                        e.once("error", o)),
                        e.once(t, i);
                    });
                  }),
                  (s.EventEmitter = s),
                  (s.prototype._events = void 0),
                  (s.prototype._eventsCount = 0),
                  (s.prototype._maxListeners = void 0);
                var l = 10;
                function c(e) {
                  if ("function" != typeof e)
                    throw new TypeError(
                      'The "listener" argument must be of type Function. Received type ' +
                        typeof e
                    );
                }
                function u(e) {
                  return void 0 === e._maxListeners
                    ? s.defaultMaxListeners
                    : e._maxListeners;
                }
                function p(e, t, r, n) {
                  var i, o, a, s;
                  if (
                    (c(r),
                    void 0 === (o = e._events)
                      ? ((o = e._events = Object.create(null)),
                        (e._eventsCount = 0))
                      : (void 0 !== o.newListener &&
                          (e.emit(
                            "newListener",
                            t,
                            r.listener ? r.listener : r
                          ),
                          (o = e._events)),
                        (a = o[t])),
                    void 0 === a)
                  )
                    (a = o[t] = r), ++e._eventsCount;
                  else if (
                    ("function" == typeof a
                      ? (a = o[t] = n ? [r, a] : [a, r])
                      : n
                      ? a.unshift(r)
                      : a.push(r),
                    (i = u(e)) > 0 && a.length > i && !a.warned)
                  ) {
                    a.warned = !0;
                    var l = new Error(
                      "Possible EventEmitter memory leak detected. " +
                        a.length +
                        " " +
                        String(t) +
                        " listeners added. Use emitter.setMaxListeners() to increase limit"
                    );
                    (l.name = "MaxListenersExceededWarning"),
                      (l.emitter = e),
                      (l.type = t),
                      (l.count = a.length),
                      (s = l),
                      console && console.warn && console.warn(s);
                  }
                  return e;
                }
                function d() {
                  if (!this.fired)
                    return (
                      this.target.removeListener(this.type, this.wrapFn),
                      (this.fired = !0),
                      0 === arguments.length
                        ? this.listener.call(this.target)
                        : this.listener.apply(this.target, arguments)
                    );
                }
                function f(e, t, r) {
                  var n = {
                      fired: !1,
                      wrapFn: void 0,
                      target: e,
                      type: t,
                      listener: r,
                    },
                    i = d.bind(n);
                  return (i.listener = r), (n.wrapFn = i), i;
                }
                function h(e, t, r) {
                  var n = e._events;
                  if (void 0 === n) return [];
                  var i = n[t];
                  return void 0 === i
                    ? []
                    : "function" == typeof i
                    ? r
                      ? [i.listener || i]
                      : [i]
                    : r
                    ? (function (e) {
                        for (
                          var t = new Array(e.length), r = 0;
                          r < t.length;
                          ++r
                        )
                          t[r] = e[r].listener || e[r];
                        return t;
                      })(i)
                    : g(i, i.length);
                }
                function m(e) {
                  var t = this._events;
                  if (void 0 !== t) {
                    var r = t[e];
                    if ("function" == typeof r) return 1;
                    if (void 0 !== r) return r.length;
                  }
                  return 0;
                }
                function g(e, t) {
                  for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];
                  return r;
                }
                Object.defineProperty(s, "defaultMaxListeners", {
                  enumerable: !0,
                  get: function () {
                    return l;
                  },
                  set: function (e) {
                    if ("number" != typeof e || e < 0 || a(e))
                      throw new RangeError(
                        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                          e +
                          "."
                      );
                    l = e;
                  },
                }),
                  (s.init = function () {
                    (void 0 !== this._events &&
                      this._events !== Object.getPrototypeOf(this)._events) ||
                      ((this._events = Object.create(null)),
                      (this._eventsCount = 0)),
                      (this._maxListeners = this._maxListeners || void 0);
                  }),
                  (s.prototype.setMaxListeners = function (e) {
                    if ("number" != typeof e || e < 0 || a(e))
                      throw new RangeError(
                        'The value of "n" is out of range. It must be a non-negative number. Received ' +
                          e +
                          "."
                      );
                    return (this._maxListeners = e), this;
                  }),
                  (s.prototype.getMaxListeners = function () {
                    return u(this);
                  }),
                  (s.prototype.emit = function (e) {
                    for (var t = [], r = 1; r < arguments.length; r++)
                      t.push(arguments[r]);
                    var n = "error" === e,
                      i = this._events;
                    if (void 0 !== i) n = n && void 0 === i.error;
                    else if (!n) return !1;
                    if (n) {
                      var a;
                      if ((t.length > 0 && (a = t[0]), a instanceof Error))
                        throw a;
                      var s = new Error(
                        "Unhandled error." + (a ? " (" + a.message + ")" : "")
                      );
                      throw ((s.context = a), s);
                    }
                    var l = i[e];
                    if (void 0 === l) return !1;
                    if ("function" == typeof l) o(l, this, t);
                    else {
                      var c = l.length,
                        u = g(l, c);
                      for (r = 0; r < c; ++r) o(u[r], this, t);
                    }
                    return !0;
                  }),
                  (s.prototype.addListener = function (e, t) {
                    return p(this, e, t, !1);
                  }),
                  (s.prototype.on = s.prototype.addListener),
                  (s.prototype.prependListener = function (e, t) {
                    return p(this, e, t, !0);
                  }),
                  (s.prototype.once = function (e, t) {
                    return c(t), this.on(e, f(this, e, t)), this;
                  }),
                  (s.prototype.prependOnceListener = function (e, t) {
                    return c(t), this.prependListener(e, f(this, e, t)), this;
                  }),
                  (s.prototype.removeListener = function (e, t) {
                    var r, n, i, o, a;
                    if ((c(t), void 0 === (n = this._events))) return this;
                    if (void 0 === (r = n[e])) return this;
                    if (r === t || r.listener === t)
                      0 == --this._eventsCount
                        ? (this._events = Object.create(null))
                        : (delete n[e],
                          n.removeListener &&
                            this.emit("removeListener", e, r.listener || t));
                    else if ("function" != typeof r) {
                      for (i = -1, o = r.length - 1; o >= 0; o--)
                        if (r[o] === t || r[o].listener === t) {
                          (a = r[o].listener), (i = o);
                          break;
                        }
                      if (i < 0) return this;
                      0 === i
                        ? r.shift()
                        : (function (e, t) {
                            for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                            e.pop();
                          })(r, i),
                        1 === r.length && (n[e] = r[0]),
                        void 0 !== n.removeListener &&
                          this.emit("removeListener", e, a || t);
                    }
                    return this;
                  }),
                  (s.prototype.off = s.prototype.removeListener),
                  (s.prototype.removeAllListeners = function (e) {
                    var t, r, n;
                    if (void 0 === (r = this._events)) return this;
                    if (void 0 === r.removeListener)
                      return (
                        0 === arguments.length
                          ? ((this._events = Object.create(null)),
                            (this._eventsCount = 0))
                          : void 0 !== r[e] &&
                            (0 == --this._eventsCount
                              ? (this._events = Object.create(null))
                              : delete r[e]),
                        this
                      );
                    if (0 === arguments.length) {
                      var i,
                        o = Object.keys(r);
                      for (n = 0; n < o.length; ++n)
                        "removeListener" !== (i = o[n]) &&
                          this.removeAllListeners(i);
                      return (
                        this.removeAllListeners("removeListener"),
                        (this._events = Object.create(null)),
                        (this._eventsCount = 0),
                        this
                      );
                    }
                    if ("function" == typeof (t = r[e]))
                      this.removeListener(e, t);
                    else if (void 0 !== t)
                      for (n = t.length - 1; n >= 0; n--)
                        this.removeListener(e, t[n]);
                    return this;
                  }),
                  (s.prototype.listeners = function (e) {
                    return h(this, e, !0);
                  }),
                  (s.prototype.rawListeners = function (e) {
                    return h(this, e, !1);
                  }),
                  (s.listenerCount = function (e, t) {
                    return "function" == typeof e.listenerCount
                      ? e.listenerCount(t)
                      : m.call(e, t);
                  }),
                  (s.prototype.listenerCount = m),
                  (s.prototype.eventNames = function () {
                    return this._eventsCount > 0 ? n(this._events) : [];
                  });
              },
              function (e, t, r) {
                "use strict";
                var n = r(3),
                  i = r(0),
                  o = 0;
                function a() {
                  return "hole_" + o++;
                }
                function s(e, t) {
                  for (var r = null, n = 0; n < e.length; n++) {
                    var i = t(e[n]);
                    i !== e[n] && (r || (r = e.slice()), (r[n] = i));
                  }
                  return r || e;
                }
                function l(e, t, r) {
                  if (!(e instanceof n.Node)) return e;
                  if (!r) {
                    var i = t(e);
                    if (i && i !== e) return i;
                  }
                  if (e instanceof n.NodeList) {
                    var o = s(e.children, function (e) {
                      return l(e, t, r);
                    });
                    o !== e.children &&
                      (e = new n[e.typename](e.lineno, e.colno, o));
                  } else if (e instanceof n.CallExtension) {
                    var a = l(e.args, t, r),
                      c = s(e.contentArgs, function (e) {
                        return l(e, t, r);
                      });
                    (a === e.args && c === e.contentArgs) ||
                      (e = new n[e.typename](e.extName, e.prop, a, c));
                  } else {
                    var u = e.fields.map(function (t) {
                        return e[t];
                      }),
                      p = s(u, function (e) {
                        return l(e, t, r);
                      });
                    p !== u &&
                      ((e = new n[e.typename](e.lineno, e.colno)),
                      p.forEach(function (t, r) {
                        e[e.fields[r]] = t;
                      }));
                  }
                  return (r && t(e)) || e;
                }
                function c(e, t) {
                  return l(e, t, !0);
                }
                function u(e, t, r) {
                  var o = [],
                    s = c(r ? e[r] : e, function (e) {
                      var r;
                      return e instanceof n.Block
                        ? e
                        : (((e instanceof n.Filter &&
                            -1 !== i.indexOf(t, e.name.value)) ||
                            e instanceof n.CallExtensionAsync) &&
                            ((r = new n.Symbol(e.lineno, e.colno, a())),
                            o.push(
                              new n.FilterAsync(
                                e.lineno,
                                e.colno,
                                e.name,
                                e.args,
                                r
                              )
                            )),
                          r);
                    });
                  return (
                    r ? (e[r] = s) : (e = s),
                    o.length
                      ? (o.push(e), new n.NodeList(e.lineno, e.colno, o))
                      : e
                  );
                }
                e.exports = {
                  transform: function (e, t) {
                    return (function (e, t) {
                      return (function (e) {
                        return c(e, function (e) {
                          if (e instanceof n.If || e instanceof n.For) {
                            var t = !1;
                            if (
                              (l(e, function (e) {
                                if (
                                  e instanceof n.FilterAsync ||
                                  e instanceof n.IfAsync ||
                                  e instanceof n.AsyncEach ||
                                  e instanceof n.AsyncAll ||
                                  e instanceof n.CallExtensionAsync
                                )
                                  return (t = !0), e;
                              }),
                              t)
                            ) {
                              if (e instanceof n.If)
                                return new n.IfAsync(
                                  e.lineno,
                                  e.colno,
                                  e.cond,
                                  e.body,
                                  e.else_
                                );
                              if (
                                e instanceof n.For &&
                                !(e instanceof n.AsyncAll)
                              )
                                return new n.AsyncEach(
                                  e.lineno,
                                  e.colno,
                                  e.arr,
                                  e.name,
                                  e.body,
                                  e.else_
                                );
                            }
                          }
                        });
                      })(
                        (function (e) {
                          return l(e, function (e) {
                            if (e instanceof n.Block) {
                              var t = !1,
                                r = a();
                              (e.body = l(e.body, function (e) {
                                if (
                                  e instanceof n.FunCall &&
                                  "super" === e.name.value
                                )
                                  return (
                                    (t = !0), new n.Symbol(e.lineno, e.colno, r)
                                  );
                              })),
                                t &&
                                  e.body.children.unshift(
                                    new n.Super(
                                      0,
                                      0,
                                      e.name,
                                      new n.Symbol(0, 0, r)
                                    )
                                  );
                            }
                          });
                        })(
                          (function (e, t) {
                            return c(e, function (e) {
                              return e instanceof n.Output
                                ? u(e, t)
                                : e instanceof n.Set
                                ? u(e, t, "value")
                                : e instanceof n.For
                                ? u(e, t, "arr")
                                : e instanceof n.If
                                ? u(e, t, "cond")
                                : e instanceof n.CallExtension
                                ? u(e, t, "args")
                                : void 0;
                            });
                          })(e, t)
                        )
                      );
                    })(e, t || []);
                  },
                };
              },
              function (e, t, r) {
                "use strict";
                var n = r(0),
                  i = r(2);
                function o(e, t) {
                  return null == e || !1 === e ? t : e;
                }
                function a(e) {
                  return e != e;
                }
                function s(e) {
                  var t = (e = o(e, "")).toLowerCase();
                  return i.copySafeness(
                    e,
                    t.charAt(0).toUpperCase() + t.slice(1)
                  );
                }
                function l(e) {
                  if (n.isString(e)) return e.split("");
                  if (n.isObject(e))
                    return n._entries(e || {}).map(function (e) {
                      return { key: e[0], value: e[1] };
                    });
                  if (n.isArray(e)) return e;
                  throw new n.TemplateError("list filter: type not iterable");
                }
                function c(e) {
                  return function (t, r, i) {
                    void 0 === r && (r = "truthy");
                    var o = this,
                      a = o.env.getTest(r);
                    return n.toArray(t).filter(function (t) {
                      return a.call(o, t, i) === e;
                    });
                  };
                }
                function u(e) {
                  return i.copySafeness(e, e.replace(/^\s*|\s*$/g, ""));
                }
                ((t = e.exports = {}).abs = Math.abs),
                  (t.batch = function (e, t, r) {
                    var n,
                      i = [],
                      o = [];
                    for (n = 0; n < e.length; n++)
                      n % t == 0 && o.length && (i.push(o), (o = [])),
                        o.push(e[n]);
                    if (o.length) {
                      if (r) for (n = o.length; n < t; n++) o.push(r);
                      i.push(o);
                    }
                    return i;
                  }),
                  (t.capitalize = s),
                  (t.center = function (e, t) {
                    if (((t = t || 80), (e = o(e, "")).length >= t)) return e;
                    var r = t - e.length,
                      a = n.repeat(" ", r / 2 - (r % 2)),
                      s = n.repeat(" ", r / 2);
                    return i.copySafeness(e, a + e + s);
                  }),
                  (t.default = function (e, t, r) {
                    return r ? e || t : void 0 !== e ? e : t;
                  }),
                  (t.dictsort = function (e, t, r) {
                    if (!n.isObject(e))
                      throw new n.TemplateError(
                        "dictsort filter: val must be an object"
                      );
                    var i,
                      o = [];
                    for (var a in e) o.push([a, e[a]]);
                    if (void 0 === r || "key" === r) i = 0;
                    else {
                      if ("value" !== r)
                        throw new n.TemplateError(
                          "dictsort filter: You can only sort by either key or value"
                        );
                      i = 1;
                    }
                    return (
                      o.sort(function (e, r) {
                        var o = e[i],
                          a = r[i];
                        return (
                          t ||
                            (n.isString(o) && (o = o.toUpperCase()),
                            n.isString(a) && (a = a.toUpperCase())),
                          o > a ? 1 : o === a ? 0 : -1
                        );
                      }),
                      o
                    );
                  }),
                  (t.dump = function (e, t) {
                    return JSON.stringify(e, null, t);
                  }),
                  (t.escape = function (e) {
                    return e instanceof i.SafeString
                      ? e
                      : ((e = null == e ? "" : e),
                        i.markSafe(n.escape(e.toString())));
                  }),
                  (t.safe = function (e) {
                    return e instanceof i.SafeString
                      ? e
                      : ((e = null == e ? "" : e), i.markSafe(e.toString()));
                  }),
                  (t.first = function (e) {
                    return e[0];
                  }),
                  (t.forceescape = function (e) {
                    return (
                      (e = null == e ? "" : e),
                      i.markSafe(n.escape(e.toString()))
                    );
                  }),
                  (t.groupby = function (e, t) {
                    return n.groupBy(e, t, this.env.opts.throwOnUndefined);
                  }),
                  (t.indent = function (e, t, r) {
                    if ("" === (e = o(e, ""))) return "";
                    t = t || 4;
                    var a = e.split("\n"),
                      s = n.repeat(" ", t),
                      l = a
                        .map(function (e, t) {
                          return 0 !== t || r ? "" + s + e : e;
                        })
                        .join("\n");
                    return i.copySafeness(e, l);
                  }),
                  (t.join = function (e, t, r) {
                    return (
                      (t = t || ""),
                      r &&
                        (e = n.map(e, function (e) {
                          return e[r];
                        })),
                      e.join(t)
                    );
                  }),
                  (t.last = function (e) {
                    return e[e.length - 1];
                  }),
                  (t.length = function (e) {
                    var t = o(e, "");
                    return void 0 !== t
                      ? ("function" == typeof Map && t instanceof Map) ||
                        ("function" == typeof Set && t instanceof Set)
                        ? t.size
                        : !n.isObject(t) || t instanceof i.SafeString
                        ? t.length
                        : n.keys(t).length
                      : 0;
                  }),
                  (t.list = l),
                  (t.lower = function (e) {
                    return (e = o(e, "")).toLowerCase();
                  }),
                  (t.nl2br = function (e) {
                    return null == e
                      ? ""
                      : i.copySafeness(e, e.replace(/\r\n|\n/g, "<br />\n"));
                  }),
                  (t.random = function (e) {
                    return e[Math.floor(Math.random() * e.length)];
                  }),
                  (t.reject = c(!1)),
                  (t.rejectattr = function (e, t) {
                    return e.filter(function (e) {
                      return !e[t];
                    });
                  }),
                  (t.select = c(!0)),
                  (t.selectattr = function (e, t) {
                    return e.filter(function (e) {
                      return !!e[t];
                    });
                  }),
                  (t.replace = function (e, t, r, n) {
                    var o = e;
                    if (t instanceof RegExp) return e.replace(t, r);
                    void 0 === n && (n = -1);
                    var a = "";
                    if ("number" == typeof t) t = "" + t;
                    else if ("string" != typeof t) return e;
                    if (
                      ("number" == typeof e && (e = "" + e),
                      "string" != typeof e && !(e instanceof i.SafeString))
                    )
                      return e;
                    if ("" === t)
                      return (
                        (a = r + e.split("").join(r) + r), i.copySafeness(e, a)
                      );
                    var s = e.indexOf(t);
                    if (0 === n || -1 === s) return e;
                    for (var l = 0, c = 0; s > -1 && (-1 === n || c < n); )
                      (a += e.substring(l, s) + r),
                        (l = s + t.length),
                        c++,
                        (s = e.indexOf(t, l));
                    return (
                      l < e.length && (a += e.substring(l)),
                      i.copySafeness(o, a)
                    );
                  }),
                  (t.reverse = function (e) {
                    var t;
                    return (
                      (t = n.isString(e)
                        ? l(e)
                        : n.map(e, function (e) {
                            return e;
                          })).reverse(),
                      n.isString(e) ? i.copySafeness(e, t.join("")) : t
                    );
                  }),
                  (t.round = function (e, t, r) {
                    t = t || 0;
                    var n = Math.pow(10, t);
                    return (
                      ("ceil" === r
                        ? Math.ceil
                        : "floor" === r
                        ? Math.floor
                        : Math.round)(e * n) / n
                    );
                  }),
                  (t.slice = function (e, t, r) {
                    for (
                      var n = Math.floor(e.length / t),
                        i = e.length % t,
                        o = [],
                        a = 0,
                        s = 0;
                      s < t;
                      s++
                    ) {
                      var l = a + s * n;
                      s < i && a++;
                      var c = a + (s + 1) * n,
                        u = e.slice(l, c);
                      r && s >= i && u.push(r), o.push(u);
                    }
                    return o;
                  }),
                  (t.sum = function (e, t, r) {
                    return (
                      void 0 === r && (r = 0),
                      t &&
                        (e = n.map(e, function (e) {
                          return e[t];
                        })),
                      r +
                        e.reduce(function (e, t) {
                          return e + t;
                        }, 0)
                    );
                  }),
                  (t.sort = i.makeMacro(
                    ["value", "reverse", "case_sensitive", "attribute"],
                    [],
                    function (e, t, r, i) {
                      var o = this,
                        a = n.map(e, function (e) {
                          return e;
                        }),
                        s = n.getAttrGetter(i);
                      return (
                        a.sort(function (e, a) {
                          var l = i ? s(e) : e,
                            c = i ? s(a) : a;
                          if (
                            o.env.opts.throwOnUndefined &&
                            i &&
                            (void 0 === l || void 0 === c)
                          )
                            throw new TypeError(
                              'sort: attribute "' +
                                i +
                                '" resolved to undefined'
                            );
                          return (
                            !r &&
                              n.isString(l) &&
                              n.isString(c) &&
                              ((l = l.toLowerCase()), (c = c.toLowerCase())),
                            l < c ? (t ? 1 : -1) : l > c ? (t ? -1 : 1) : 0
                          );
                        }),
                        a
                      );
                    }
                  )),
                  (t.string = function (e) {
                    return i.copySafeness(e, e);
                  }),
                  (t.striptags = function (e, t) {
                    var r,
                      n = u(
                        (e = o(e, "")).replace(
                          /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi,
                          ""
                        )
                      );
                    return (
                      (r = t
                        ? n
                            .replace(/^ +| +$/gm, "")
                            .replace(/ +/g, " ")
                            .replace(/(\r\n)/g, "\n")
                            .replace(/\n\n\n+/g, "\n\n")
                        : n.replace(/\s+/gi, " ")),
                      i.copySafeness(e, r)
                    );
                  }),
                  (t.title = function (e) {
                    var t = (e = o(e, "")).split(" ").map(function (e) {
                      return s(e);
                    });
                    return i.copySafeness(e, t.join(" "));
                  }),
                  (t.trim = u),
                  (t.truncate = function (e, t, r, n) {
                    var a = e;
                    if (((t = t || 255), (e = o(e, "")).length <= t)) return e;
                    if (r) e = e.substring(0, t);
                    else {
                      var s = e.lastIndexOf(" ", t);
                      -1 === s && (s = t), (e = e.substring(0, s));
                    }
                    return (e += null != n ? n : "..."), i.copySafeness(a, e);
                  }),
                  (t.upper = function (e) {
                    return (e = o(e, "")).toUpperCase();
                  }),
                  (t.urlencode = function (e) {
                    var t = encodeURIComponent;
                    return n.isString(e)
                      ? t(e)
                      : (n.isArray(e) ? e : n._entries(e))
                          .map(function (e) {
                            var r = e[0],
                              n = e[1];
                            return t(r) + "=" + t(n);
                          })
                          .join("&");
                  });
                var p = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/,
                  d =
                    /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i,
                  f = /^https?:\/\/.*$/,
                  h = /^www\./,
                  m = /\.(?:org|net|com)(?:\:|\/|$)/;
                (t.urlize = function (e, t, r) {
                  a(t) && (t = 1 / 0);
                  var n = !0 === r ? ' rel="nofollow"' : "";
                  return e
                    .split(/(\s+)/)
                    .filter(function (e) {
                      return e && e.length;
                    })
                    .map(function (e) {
                      var r = e.match(p),
                        i = r ? r[1] : e,
                        o = i.substr(0, t);
                      return f.test(i)
                        ? '<a href="' + i + '"' + n + ">" + o + "</a>"
                        : h.test(i)
                        ? '<a href="http://' + i + '"' + n + ">" + o + "</a>"
                        : d.test(i)
                        ? '<a href="mailto:' + i + '">' + i + "</a>"
                        : m.test(i)
                        ? '<a href="http://' + i + '"' + n + ">" + o + "</a>"
                        : e;
                    })
                    .join("");
                }),
                  (t.wordcount = function (e) {
                    var t = (e = o(e, "")) ? e.match(/\w+/g) : null;
                    return t ? t.length : null;
                  }),
                  (t.float = function (e, t) {
                    var r = parseFloat(e);
                    return a(r) ? t : r;
                  });
                var g = i.makeMacro(
                  ["value", "default", "base"],
                  [],
                  function (e, t, r) {
                    void 0 === r && (r = 10);
                    var n = parseInt(e, r);
                    return a(n) ? t : n;
                  }
                );
                (t.int = g), (t.d = t.default), (t.e = t.escape);
              },
              function (e, t, r) {
                "use strict";
                function n(e, t) {
                  return (
                    (n =
                      Object.setPrototypeOf ||
                      function (e, t) {
                        return (e.__proto__ = t), e;
                      }),
                    n(e, t)
                  );
                }
                var i = (function (e) {
                  var t, r;
                  function i(t) {
                    var r;
                    return (
                      ((r = e.call(this) || this).precompiled = t || {}), r
                    );
                  }
                  return (
                    (r = e),
                    ((t = i).prototype = Object.create(r.prototype)),
                    (t.prototype.constructor = t),
                    n(t, r),
                    (i.prototype.getSource = function (e) {
                      return this.precompiled[e]
                        ? {
                            src: { type: "code", obj: this.precompiled[e] },
                            path: e,
                          }
                        : null;
                    }),
                    i
                  );
                })(r(6));
                e.exports = { PrecompiledLoader: i };
              },
              function (e, t, r) {
                "use strict";
                var n = r(2).SafeString;
                (t.callable = function (e) {
                  return "function" == typeof e;
                }),
                  (t.defined = function (e) {
                    return void 0 !== e;
                  }),
                  (t.divisibleby = function (e, t) {
                    return e % t == 0;
                  }),
                  (t.escaped = function (e) {
                    return e instanceof n;
                  }),
                  (t.equalto = function (e, t) {
                    return e === t;
                  }),
                  (t.eq = t.equalto),
                  (t.sameas = t.equalto),
                  (t.even = function (e) {
                    return e % 2 == 0;
                  }),
                  (t.falsy = function (e) {
                    return !e;
                  }),
                  (t.ge = function (e, t) {
                    return e >= t;
                  }),
                  (t.greaterthan = function (e, t) {
                    return e > t;
                  }),
                  (t.gt = t.greaterthan),
                  (t.le = function (e, t) {
                    return e <= t;
                  }),
                  (t.lessthan = function (e, t) {
                    return e < t;
                  }),
                  (t.lt = t.lessthan),
                  (t.lower = function (e) {
                    return e.toLowerCase() === e;
                  }),
                  (t.ne = function (e, t) {
                    return e !== t;
                  }),
                  (t.null = function (e) {
                    return null === e;
                  }),
                  (t.number = function (e) {
                    return "number" == typeof e;
                  }),
                  (t.odd = function (e) {
                    return e % 2 == 1;
                  }),
                  (t.string = function (e) {
                    return "string" == typeof e;
                  }),
                  (t.truthy = function (e) {
                    return !!e;
                  }),
                  (t.undefined = function (e) {
                    return void 0 === e;
                  }),
                  (t.upper = function (e) {
                    return e.toUpperCase() === e;
                  }),
                  (t.iterable = function (e) {
                    return "undefined" != typeof Symbol
                      ? !!e[Symbol.iterator]
                      : Array.isArray(e) || "string" == typeof e;
                  }),
                  (t.mapping = function (e) {
                    var t =
                      null != e && "object" == typeof e && !Array.isArray(e);
                    return Set ? t && !(e instanceof Set) : t;
                  });
              },
              function (e, t, r) {
                "use strict";
                function n(e) {
                  var t = -1;
                  return {
                    current: null,
                    reset: function () {
                      (t = -1), (this.current = null);
                    },
                    next: function () {
                      return (
                        ++t >= e.length && (t = 0),
                        (this.current = e[t]),
                        this.current
                      );
                    },
                  };
                }
                e.exports = function () {
                  return {
                    range: function (e, t, r) {
                      void 0 === t ? ((t = e), (e = 0), (r = 1)) : r || (r = 1);
                      var n = [];
                      if (r > 0) for (var i = e; i < t; i += r) n.push(i);
                      else for (var o = e; o > t; o += r) n.push(o);
                      return n;
                    },
                    cycler: function () {
                      return n(Array.prototype.slice.call(arguments));
                    },
                    joiner: function (e) {
                      return (function (e) {
                        e = e || ",";
                        var t = !0;
                        return function () {
                          var r = t ? "" : e;
                          return (t = !1), r;
                        };
                      })(e);
                    },
                  };
                };
              },
              function (e, t, r) {
                var n = r(4);
                e.exports = function (e, t) {
                  function r(e, t) {
                    if (
                      ((this.name = e),
                      (this.path = e),
                      (this.defaultEngine = t.defaultEngine),
                      (this.ext = n.extname(e)),
                      !this.ext && !this.defaultEngine)
                    )
                      throw new Error(
                        "No default engine was specified and no extension was provided."
                      );
                    this.ext ||
                      (this.name += this.ext =
                        ("." !== this.defaultEngine[0] ? "." : "") +
                        this.defaultEngine);
                  }
                  return (
                    (r.prototype.render = function (t, r) {
                      e.render(this.name, t, r);
                    }),
                    t.set("view", r),
                    t.set("nunjucksEnv", e),
                    e
                  );
                };
              },
              function (e, t, r) {
                "use strict";
                var n = r(4),
                  i = r(4),
                  o = r(0)._prettifyError,
                  a = r(5),
                  s = r(7).Environment,
                  l = r(24);
                function c(e, t) {
                  return (
                    !!Array.isArray(t) &&
                    t.some(function (t) {
                      return e.match(t);
                    })
                  );
                }
                function u(e, t) {
                  (t = t || {}).isString = !0;
                  var r = t.env || new s([]),
                    n = t.wrapper || l;
                  if (!t.name)
                    throw new Error(
                      'the "name" option is required when compiling a string'
                    );
                  return n([p(e, t.name, r)], t);
                }
                function p(e, t, r) {
                  var n,
                    i = (r = r || new s([])).asyncFilters,
                    l = r.extensionsList;
                  t = t.replace(/\\/g, "/");
                  try {
                    n = a.compile(e, i, l, t, r.opts);
                  } catch (e) {
                    throw o(t, !1, e);
                  }
                  return { name: t, template: n };
                }
                e.exports = {
                  precompile: function (e, t) {
                    var r = (t = t || {}).env || new s([]),
                      o = t.wrapper || l;
                    if (t.isString) return u(e, t);
                    var a = n.existsSync(e) && n.statSync(e),
                      d = [],
                      f = [];
                    if (a.isFile())
                      d.push(p(n.readFileSync(e, "utf-8"), t.name || e, r));
                    else if (a.isDirectory()) {
                      !(function r(o) {
                        n.readdirSync(o).forEach(function (a) {
                          var s = i.join(o, a),
                            l = s.substr(i.join(e, "/").length),
                            u = n.statSync(s);
                          u && u.isDirectory()
                            ? c((l += "/"), t.exclude) || r(s)
                            : c(l, t.include) && f.push(s);
                        });
                      })(e);
                      for (var h = 0; h < f.length; h++) {
                        var m = f[h].replace(i.join(e, "/"), "");
                        try {
                          d.push(p(n.readFileSync(f[h], "utf-8"), m, r));
                        } catch (e) {
                          if (!t.force) throw e;
                          console.error(e);
                        }
                      }
                    }
                    return o(d, t);
                  },
                  precompileString: u,
                };
              },
              function (e, t, r) {
                "use strict";
                e.exports = function (e, t) {
                  var r = "";
                  t = t || {};
                  for (var n = 0; n < e.length; n++) {
                    var i = JSON.stringify(e[n].name);
                    (r +=
                      "(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})[" +
                      i +
                      "] = (function() {\n" +
                      e[n].template +
                      "\n})();\n"),
                      t.asFunction &&
                        (r +=
                          "return function(ctx, cb) { return nunjucks.render(" +
                          i +
                          ", ctx, cb); }\n"),
                      (r += "})();\n");
                  }
                  return r;
                };
              },
              function (e, t, r) {
                e.exports = function () {
                  "use strict";
                  var e,
                    t,
                    r = this.runtime,
                    n = this.lib,
                    i = this.compiler.Compiler,
                    o = this.parser.Parser,
                    a = this.nodes,
                    s = this.lexer,
                    l = r.contextOrFrameLookup,
                    c = r.memberLookup;
                  function u(e) {
                    return { index: e.index, lineno: e.lineno, colno: e.colno };
                  }
                  if (
                    (i && (e = i.prototype.assertType),
                    o && (t = o.prototype.parseAggregate),
                    (r.contextOrFrameLookup = function (e, t, r) {
                      var n = l.apply(this, arguments);
                      if (void 0 !== n) return n;
                      switch (r) {
                        case "True":
                          return !0;
                        case "False":
                          return !1;
                        case "None":
                          return null;
                        default:
                          return;
                      }
                    }),
                    a && i && o)
                  ) {
                    var p = a.Node.extend("Slice", {
                      fields: ["start", "stop", "step"],
                      init: function (e, t, r, n, i) {
                        (r = r || new a.Literal(e, t, null)),
                          (n = n || new a.Literal(e, t, null)),
                          (i = i || new a.Literal(e, t, 1)),
                          this.parent(e, t, r, n, i);
                      },
                    });
                    (i.prototype.assertType = function (t) {
                      t instanceof p || e.apply(this, arguments);
                    }),
                      (i.prototype.compileSlice = function (e, t) {
                        this._emit("("),
                          this._compileExpression(e.start, t),
                          this._emit("),("),
                          this._compileExpression(e.stop, t),
                          this._emit("),("),
                          this._compileExpression(e.step, t),
                          this._emit(")");
                      }),
                      (o.prototype.parseAggregate = function () {
                        var e = this,
                          r = u(this.tokens);
                        r.colno--, r.index--;
                        try {
                          return t.apply(this);
                        } catch (t) {
                          var i = u(this.tokens),
                            o = function () {
                              return n._assign(e.tokens, i), t;
                            };
                          n._assign(this.tokens, r), (this.peeked = !1);
                          var l = this.peekToken();
                          if (l.type !== s.TOKEN_LEFT_BRACKET) throw o();
                          this.nextToken();
                          for (
                            var c = new p(l.lineno, l.colno), d = !1, f = 0;
                            f <= c.fields.length &&
                            !this.skip(s.TOKEN_RIGHT_BRACKET);
                            f++
                          ) {
                            if (f === c.fields.length) {
                              if (!d) break;
                              this.fail(
                                "parseSlice: too many slice components",
                                l.lineno,
                                l.colno
                              );
                            }
                            this.skip(s.TOKEN_COLON)
                              ? (d = !0)
                              : ((c[c.fields[f]] = this.parseExpression()),
                                (d = this.skip(s.TOKEN_COLON) || d));
                          }
                          if (!d) throw o();
                          return new a.Array(l.lineno, l.colno, [c]);
                        }
                      });
                  }
                  function d(e, t, n, i) {
                    (e = e || []),
                      null === t && (t = i < 0 ? e.length - 1 : 0),
                      null === n
                        ? (n = i < 0 ? -1 : e.length)
                        : n < 0 && (n += e.length),
                      t < 0 && (t += e.length);
                    for (
                      var o = [], a = t;
                      !(
                        a < 0 ||
                        a > e.length ||
                        (i > 0 && a >= n) ||
                        (i < 0 && a <= n)
                      );
                      a += i
                    )
                      o.push(r.memberLookup(e, a));
                    return o;
                  }
                  function f(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t);
                  }
                  var h = {
                      pop: function (e) {
                        if (void 0 === e) return this.pop();
                        if (e >= this.length || e < 0)
                          throw new Error("KeyError");
                        return this.splice(e, 1);
                      },
                      append: function (e) {
                        return this.push(e);
                      },
                      remove: function (e) {
                        for (var t = 0; t < this.length; t++)
                          if (this[t] === e) return this.splice(t, 1);
                        throw new Error("ValueError");
                      },
                      count: function (e) {
                        for (var t = 0, r = 0; r < this.length; r++)
                          this[r] === e && t++;
                        return t;
                      },
                      index: function (e) {
                        var t;
                        if (-1 === (t = this.indexOf(e)))
                          throw new Error("ValueError");
                        return t;
                      },
                      find: function (e) {
                        return this.indexOf(e);
                      },
                      insert: function (e, t) {
                        return this.splice(e, 0, t);
                      },
                    },
                    m = {
                      items: function () {
                        return n._entries(this);
                      },
                      values: function () {
                        return n._values(this);
                      },
                      keys: function () {
                        return n.keys(this);
                      },
                      get: function (e, t) {
                        var r = this[e];
                        return void 0 === r && (r = t), r;
                      },
                      has_key: function (e) {
                        return f(this, e);
                      },
                      pop: function (e, t) {
                        var r = this[e];
                        if (void 0 === r && void 0 !== t) r = t;
                        else {
                          if (void 0 === r) throw new Error("KeyError");
                          delete this[e];
                        }
                        return r;
                      },
                      popitem: function () {
                        var e = n.keys(this);
                        if (!e.length) throw new Error("KeyError");
                        var t = e[0],
                          r = this[t];
                        return delete this[t], [t, r];
                      },
                      setdefault: function (e, t) {
                        return (
                          void 0 === t && (t = null),
                          e in this || (this[e] = t),
                          this[e]
                        );
                      },
                      update: function (e) {
                        return n._assign(this, e), null;
                      },
                    };
                  return (
                    (m.iteritems = m.items),
                    (m.itervalues = m.values),
                    (m.iterkeys = m.keys),
                    (r.memberLookup = function (e, t, r) {
                      return 4 === arguments.length
                        ? d.apply(this, arguments)
                        : ((e = e || {}),
                          n.isArray(e) && f(h, t)
                            ? h[t].bind(e)
                            : n.isObject(e) && f(m, t)
                            ? m[t].bind(e)
                            : c.apply(this, arguments));
                    }),
                    function () {
                      (r.contextOrFrameLookup = l),
                        (r.memberLookup = c),
                        i && (i.prototype.assertType = e),
                        o && (o.prototype.parseAggregate = t);
                    }
                  );
                };
              },
            ]);
          }),
          (e.exports = t());
      },
      202: (e, t, r) => {
        "use strict";
        var n = r(3700),
          i = /[\/\?<>\\:\*\|"]/g,
          o = /[\x00-\x1f\x80-\x9f]/g,
          a = /^\.+$/,
          s = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i,
          l = /[\. ]+$/;
        function c(e, t) {
          if ("string" != typeof e) throw new Error("Input must be string");
          var r = e
            .replace(i, t)
            .replace(o, t)
            .replace(a, t)
            .replace(s, t)
            .replace(l, t);
          return n(r, 255);
        }
        e.exports = function (e, t) {
          var r = (t && t.replacement) || "",
            n = c(e, r);
          return "" === r ? n : c(n, "");
        };
      },
      9328: (e) => {
        "use strict";
        var t = { decodeValues: !0, map: !1, silent: !1 };
        function r(e) {
          return "string" == typeof e && !!e.trim();
        }
        function n(e, n) {
          var i = e.split(";").filter(r),
            o = i.shift().split("="),
            a = o.shift(),
            s = o.join("=");
          n = n ? Object.assign({}, t, n) : t;
          try {
            s = n.decodeValues ? decodeURIComponent(s) : s;
          } catch (e) {
            console.error(
              "set-cookie-parser encountered an error while decoding a cookie with value '" +
                s +
                "'. Set options.decodeValues to false to disable this feature.",
              e
            );
          }
          var l = { name: a, value: s };
          return (
            i.forEach(function (e) {
              var t = e.split("="),
                r = t.shift().trimLeft().toLowerCase(),
                n = t.join("=");
              "expires" === r
                ? (l.expires = new Date(n))
                : "max-age" === r
                ? (l.maxAge = parseInt(n, 10))
                : "secure" === r
                ? (l.secure = !0)
                : "httponly" === r
                ? (l.httpOnly = !0)
                : "samesite" === r
                ? (l.sameSite = n)
                : (l[r] = n);
            }),
            l
          );
        }
        function i(e, i) {
          if (((i = i ? Object.assign({}, t, i) : t), !e))
            return i.map ? {} : [];
          if (e.headers && e.headers["set-cookie"]) e = e.headers["set-cookie"];
          else if (e.headers) {
            var o =
              e.headers[
                Object.keys(e.headers).find(function (e) {
                  return "set-cookie" === e.toLowerCase();
                })
              ];
            o ||
              !e.headers.cookie ||
              i.silent ||
              console.warn(
                "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
              ),
              (e = o);
          }
          return (
            Array.isArray(e) || (e = [e]),
            (i = i ? Object.assign({}, t, i) : t).map
              ? e.filter(r).reduce(function (e, t) {
                  var r = n(t, i);
                  return (e[r.name] = r), e;
                }, {})
              : e.filter(r).map(function (e) {
                  return n(e, i);
                })
          );
        }
        (e.exports = i),
          (e.exports.parse = i),
          (e.exports.parseString = n),
          (e.exports.splitCookiesString = function (e) {
            if (Array.isArray(e)) return e;
            if ("string" != typeof e) return [];
            var t,
              r,
              n,
              i,
              o,
              a = [],
              s = 0;
            function l() {
              for (; s < e.length && /\s/.test(e.charAt(s)); ) s += 1;
              return s < e.length;
            }
            for (; s < e.length; ) {
              for (t = s, o = !1; l(); )
                if ("," === (r = e.charAt(s))) {
                  for (
                    n = s, s += 1, l(), i = s;
                    s < e.length &&
                    "=" !== (r = e.charAt(s)) &&
                    ";" !== r &&
                    "," !== r;

                  )
                    s += 1;
                  s < e.length && "=" === e.charAt(s)
                    ? ((o = !0), (s = i), a.push(e.substring(t, n)), (t = s))
                    : (s = n + 1);
                } else s += 1;
              (!o || s >= e.length) && a.push(e.substring(t, e.length));
            }
            return a;
          });
      },
      3700: (e, t, r) => {
        "use strict";
        var n = r(1156),
          i = r(793);
        e.exports = n.bind(null, i);
      },
      1156: (e) => {
        "use strict";
        function t(e) {
          return e >= 55296 && e <= 56319;
        }
        function r(e) {
          return e >= 56320 && e <= 57343;
        }
        e.exports = function (e, n, i) {
          if ("string" != typeof n) throw new Error("Input must be string");
          for (var o, a, s = n.length, l = 0, c = 0; c < s; c += 1) {
            if (
              ((o = n.charCodeAt(c)),
              (a = n[c]),
              t(o) && r(n.charCodeAt(c + 1)) && (a += n[(c += 1)]),
              (l += e(a)) === i)
            )
              return n.slice(0, c + 1);
            if (l > i) return n.slice(0, c - a.length + 1);
          }
          return n;
        };
      },
      793: (e) => {
        "use strict";
        function t(e) {
          return e >= 55296 && e <= 56319;
        }
        function r(e) {
          return e >= 56320 && e <= 57343;
        }
        e.exports = function (e) {
          if ("string" != typeof e) throw new Error("Input must be string");
          for (var n = e.length, i = 0, o = null, a = null, s = 0; s < n; s++)
            r((o = e.charCodeAt(s)))
              ? null != a && t(a)
                ? (i += 1)
                : (i += 3)
              : o <= 127
              ? (i += 1)
              : o >= 128 && o <= 2047
              ? (i += 2)
              : o >= 2048 && o <= 65535 && (i += 3),
              (a = o);
          return i;
        };
      },
      5840: (e) => {
        "use strict";
        e.exports = require("electron");
      },
      3600: (e) => {
        "use strict";
        e.exports = JSON.parse(
          '{"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376}'
        );
      },
      9323: (e) => {
        "use strict";
        e.exports = JSON.parse(
          '{"Aacute":"Á","aacute":"á","Abreve":"Ă","abreve":"ă","ac":"∾","acd":"∿","acE":"∾̳","Acirc":"Â","acirc":"â","acute":"´","Acy":"А","acy":"а","AElig":"Æ","aelig":"æ","af":"⁡","Afr":"𝔄","afr":"𝔞","Agrave":"À","agrave":"à","alefsym":"ℵ","aleph":"ℵ","Alpha":"Α","alpha":"α","Amacr":"Ā","amacr":"ā","amalg":"⨿","amp":"&","AMP":"&","andand":"⩕","And":"⩓","and":"∧","andd":"⩜","andslope":"⩘","andv":"⩚","ang":"∠","ange":"⦤","angle":"∠","angmsdaa":"⦨","angmsdab":"⦩","angmsdac":"⦪","angmsdad":"⦫","angmsdae":"⦬","angmsdaf":"⦭","angmsdag":"⦮","angmsdah":"⦯","angmsd":"∡","angrt":"∟","angrtvb":"⊾","angrtvbd":"⦝","angsph":"∢","angst":"Å","angzarr":"⍼","Aogon":"Ą","aogon":"ą","Aopf":"𝔸","aopf":"𝕒","apacir":"⩯","ap":"≈","apE":"⩰","ape":"≊","apid":"≋","apos":"\'","ApplyFunction":"⁡","approx":"≈","approxeq":"≊","Aring":"Å","aring":"å","Ascr":"𝒜","ascr":"𝒶","Assign":"≔","ast":"*","asymp":"≈","asympeq":"≍","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","awconint":"∳","awint":"⨑","backcong":"≌","backepsilon":"϶","backprime":"‵","backsim":"∽","backsimeq":"⋍","Backslash":"∖","Barv":"⫧","barvee":"⊽","barwed":"⌅","Barwed":"⌆","barwedge":"⌅","bbrk":"⎵","bbrktbrk":"⎶","bcong":"≌","Bcy":"Б","bcy":"б","bdquo":"„","becaus":"∵","because":"∵","Because":"∵","bemptyv":"⦰","bepsi":"϶","bernou":"ℬ","Bernoullis":"ℬ","Beta":"Β","beta":"β","beth":"ℶ","between":"≬","Bfr":"𝔅","bfr":"𝔟","bigcap":"⋂","bigcirc":"◯","bigcup":"⋃","bigodot":"⨀","bigoplus":"⨁","bigotimes":"⨂","bigsqcup":"⨆","bigstar":"★","bigtriangledown":"▽","bigtriangleup":"△","biguplus":"⨄","bigvee":"⋁","bigwedge":"⋀","bkarow":"⤍","blacklozenge":"⧫","blacksquare":"▪","blacktriangle":"▴","blacktriangledown":"▾","blacktriangleleft":"◂","blacktriangleright":"▸","blank":"␣","blk12":"▒","blk14":"░","blk34":"▓","block":"█","bne":"=⃥","bnequiv":"≡⃥","bNot":"⫭","bnot":"⌐","Bopf":"𝔹","bopf":"𝕓","bot":"⊥","bottom":"⊥","bowtie":"⋈","boxbox":"⧉","boxdl":"┐","boxdL":"╕","boxDl":"╖","boxDL":"╗","boxdr":"┌","boxdR":"╒","boxDr":"╓","boxDR":"╔","boxh":"─","boxH":"═","boxhd":"┬","boxHd":"╤","boxhD":"╥","boxHD":"╦","boxhu":"┴","boxHu":"╧","boxhU":"╨","boxHU":"╩","boxminus":"⊟","boxplus":"⊞","boxtimes":"⊠","boxul":"┘","boxuL":"╛","boxUl":"╜","boxUL":"╝","boxur":"└","boxuR":"╘","boxUr":"╙","boxUR":"╚","boxv":"│","boxV":"║","boxvh":"┼","boxvH":"╪","boxVh":"╫","boxVH":"╬","boxvl":"┤","boxvL":"╡","boxVl":"╢","boxVL":"╣","boxvr":"├","boxvR":"╞","boxVr":"╟","boxVR":"╠","bprime":"‵","breve":"˘","Breve":"˘","brvbar":"¦","bscr":"𝒷","Bscr":"ℬ","bsemi":"⁏","bsim":"∽","bsime":"⋍","bsolb":"⧅","bsol":"\\\\","bsolhsub":"⟈","bull":"•","bullet":"•","bump":"≎","bumpE":"⪮","bumpe":"≏","Bumpeq":"≎","bumpeq":"≏","Cacute":"Ć","cacute":"ć","capand":"⩄","capbrcup":"⩉","capcap":"⩋","cap":"∩","Cap":"⋒","capcup":"⩇","capdot":"⩀","CapitalDifferentialD":"ⅅ","caps":"∩︀","caret":"⁁","caron":"ˇ","Cayleys":"ℭ","ccaps":"⩍","Ccaron":"Č","ccaron":"č","Ccedil":"Ç","ccedil":"ç","Ccirc":"Ĉ","ccirc":"ĉ","Cconint":"∰","ccups":"⩌","ccupssm":"⩐","Cdot":"Ċ","cdot":"ċ","cedil":"¸","Cedilla":"¸","cemptyv":"⦲","cent":"¢","centerdot":"·","CenterDot":"·","cfr":"𝔠","Cfr":"ℭ","CHcy":"Ч","chcy":"ч","check":"✓","checkmark":"✓","Chi":"Χ","chi":"χ","circ":"ˆ","circeq":"≗","circlearrowleft":"↺","circlearrowright":"↻","circledast":"⊛","circledcirc":"⊚","circleddash":"⊝","CircleDot":"⊙","circledR":"®","circledS":"Ⓢ","CircleMinus":"⊖","CirclePlus":"⊕","CircleTimes":"⊗","cir":"○","cirE":"⧃","cire":"≗","cirfnint":"⨐","cirmid":"⫯","cirscir":"⧂","ClockwiseContourIntegral":"∲","CloseCurlyDoubleQuote":"”","CloseCurlyQuote":"’","clubs":"♣","clubsuit":"♣","colon":":","Colon":"∷","Colone":"⩴","colone":"≔","coloneq":"≔","comma":",","commat":"@","comp":"∁","compfn":"∘","complement":"∁","complexes":"ℂ","cong":"≅","congdot":"⩭","Congruent":"≡","conint":"∮","Conint":"∯","ContourIntegral":"∮","copf":"𝕔","Copf":"ℂ","coprod":"∐","Coproduct":"∐","copy":"©","COPY":"©","copysr":"℗","CounterClockwiseContourIntegral":"∳","crarr":"↵","cross":"✗","Cross":"⨯","Cscr":"𝒞","cscr":"𝒸","csub":"⫏","csube":"⫑","csup":"⫐","csupe":"⫒","ctdot":"⋯","cudarrl":"⤸","cudarrr":"⤵","cuepr":"⋞","cuesc":"⋟","cularr":"↶","cularrp":"⤽","cupbrcap":"⩈","cupcap":"⩆","CupCap":"≍","cup":"∪","Cup":"⋓","cupcup":"⩊","cupdot":"⊍","cupor":"⩅","cups":"∪︀","curarr":"↷","curarrm":"⤼","curlyeqprec":"⋞","curlyeqsucc":"⋟","curlyvee":"⋎","curlywedge":"⋏","curren":"¤","curvearrowleft":"↶","curvearrowright":"↷","cuvee":"⋎","cuwed":"⋏","cwconint":"∲","cwint":"∱","cylcty":"⌭","dagger":"†","Dagger":"‡","daleth":"ℸ","darr":"↓","Darr":"↡","dArr":"⇓","dash":"‐","Dashv":"⫤","dashv":"⊣","dbkarow":"⤏","dblac":"˝","Dcaron":"Ď","dcaron":"ď","Dcy":"Д","dcy":"д","ddagger":"‡","ddarr":"⇊","DD":"ⅅ","dd":"ⅆ","DDotrahd":"⤑","ddotseq":"⩷","deg":"°","Del":"∇","Delta":"Δ","delta":"δ","demptyv":"⦱","dfisht":"⥿","Dfr":"𝔇","dfr":"𝔡","dHar":"⥥","dharl":"⇃","dharr":"⇂","DiacriticalAcute":"´","DiacriticalDot":"˙","DiacriticalDoubleAcute":"˝","DiacriticalGrave":"`","DiacriticalTilde":"˜","diam":"⋄","diamond":"⋄","Diamond":"⋄","diamondsuit":"♦","diams":"♦","die":"¨","DifferentialD":"ⅆ","digamma":"ϝ","disin":"⋲","div":"÷","divide":"÷","divideontimes":"⋇","divonx":"⋇","DJcy":"Ђ","djcy":"ђ","dlcorn":"⌞","dlcrop":"⌍","dollar":"$","Dopf":"𝔻","dopf":"𝕕","Dot":"¨","dot":"˙","DotDot":"⃜","doteq":"≐","doteqdot":"≑","DotEqual":"≐","dotminus":"∸","dotplus":"∔","dotsquare":"⊡","doublebarwedge":"⌆","DoubleContourIntegral":"∯","DoubleDot":"¨","DoubleDownArrow":"⇓","DoubleLeftArrow":"⇐","DoubleLeftRightArrow":"⇔","DoubleLeftTee":"⫤","DoubleLongLeftArrow":"⟸","DoubleLongLeftRightArrow":"⟺","DoubleLongRightArrow":"⟹","DoubleRightArrow":"⇒","DoubleRightTee":"⊨","DoubleUpArrow":"⇑","DoubleUpDownArrow":"⇕","DoubleVerticalBar":"∥","DownArrowBar":"⤓","downarrow":"↓","DownArrow":"↓","Downarrow":"⇓","DownArrowUpArrow":"⇵","DownBreve":"̑","downdownarrows":"⇊","downharpoonleft":"⇃","downharpoonright":"⇂","DownLeftRightVector":"⥐","DownLeftTeeVector":"⥞","DownLeftVectorBar":"⥖","DownLeftVector":"↽","DownRightTeeVector":"⥟","DownRightVectorBar":"⥗","DownRightVector":"⇁","DownTeeArrow":"↧","DownTee":"⊤","drbkarow":"⤐","drcorn":"⌟","drcrop":"⌌","Dscr":"𝒟","dscr":"𝒹","DScy":"Ѕ","dscy":"ѕ","dsol":"⧶","Dstrok":"Đ","dstrok":"đ","dtdot":"⋱","dtri":"▿","dtrif":"▾","duarr":"⇵","duhar":"⥯","dwangle":"⦦","DZcy":"Џ","dzcy":"џ","dzigrarr":"⟿","Eacute":"É","eacute":"é","easter":"⩮","Ecaron":"Ě","ecaron":"ě","Ecirc":"Ê","ecirc":"ê","ecir":"≖","ecolon":"≕","Ecy":"Э","ecy":"э","eDDot":"⩷","Edot":"Ė","edot":"ė","eDot":"≑","ee":"ⅇ","efDot":"≒","Efr":"𝔈","efr":"𝔢","eg":"⪚","Egrave":"È","egrave":"è","egs":"⪖","egsdot":"⪘","el":"⪙","Element":"∈","elinters":"⏧","ell":"ℓ","els":"⪕","elsdot":"⪗","Emacr":"Ē","emacr":"ē","empty":"∅","emptyset":"∅","EmptySmallSquare":"◻","emptyv":"∅","EmptyVerySmallSquare":"▫","emsp13":" ","emsp14":" ","emsp":" ","ENG":"Ŋ","eng":"ŋ","ensp":" ","Eogon":"Ę","eogon":"ę","Eopf":"𝔼","eopf":"𝕖","epar":"⋕","eparsl":"⧣","eplus":"⩱","epsi":"ε","Epsilon":"Ε","epsilon":"ε","epsiv":"ϵ","eqcirc":"≖","eqcolon":"≕","eqsim":"≂","eqslantgtr":"⪖","eqslantless":"⪕","Equal":"⩵","equals":"=","EqualTilde":"≂","equest":"≟","Equilibrium":"⇌","equiv":"≡","equivDD":"⩸","eqvparsl":"⧥","erarr":"⥱","erDot":"≓","escr":"ℯ","Escr":"ℰ","esdot":"≐","Esim":"⩳","esim":"≂","Eta":"Η","eta":"η","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","euro":"€","excl":"!","exist":"∃","Exists":"∃","expectation":"ℰ","exponentiale":"ⅇ","ExponentialE":"ⅇ","fallingdotseq":"≒","Fcy":"Ф","fcy":"ф","female":"♀","ffilig":"ﬃ","fflig":"ﬀ","ffllig":"ﬄ","Ffr":"𝔉","ffr":"𝔣","filig":"ﬁ","FilledSmallSquare":"◼","FilledVerySmallSquare":"▪","fjlig":"fj","flat":"♭","fllig":"ﬂ","fltns":"▱","fnof":"ƒ","Fopf":"𝔽","fopf":"𝕗","forall":"∀","ForAll":"∀","fork":"⋔","forkv":"⫙","Fouriertrf":"ℱ","fpartint":"⨍","frac12":"½","frac13":"⅓","frac14":"¼","frac15":"⅕","frac16":"⅙","frac18":"⅛","frac23":"⅔","frac25":"⅖","frac34":"¾","frac35":"⅗","frac38":"⅜","frac45":"⅘","frac56":"⅚","frac58":"⅝","frac78":"⅞","frasl":"⁄","frown":"⌢","fscr":"𝒻","Fscr":"ℱ","gacute":"ǵ","Gamma":"Γ","gamma":"γ","Gammad":"Ϝ","gammad":"ϝ","gap":"⪆","Gbreve":"Ğ","gbreve":"ğ","Gcedil":"Ģ","Gcirc":"Ĝ","gcirc":"ĝ","Gcy":"Г","gcy":"г","Gdot":"Ġ","gdot":"ġ","ge":"≥","gE":"≧","gEl":"⪌","gel":"⋛","geq":"≥","geqq":"≧","geqslant":"⩾","gescc":"⪩","ges":"⩾","gesdot":"⪀","gesdoto":"⪂","gesdotol":"⪄","gesl":"⋛︀","gesles":"⪔","Gfr":"𝔊","gfr":"𝔤","gg":"≫","Gg":"⋙","ggg":"⋙","gimel":"ℷ","GJcy":"Ѓ","gjcy":"ѓ","gla":"⪥","gl":"≷","glE":"⪒","glj":"⪤","gnap":"⪊","gnapprox":"⪊","gne":"⪈","gnE":"≩","gneq":"⪈","gneqq":"≩","gnsim":"⋧","Gopf":"𝔾","gopf":"𝕘","grave":"`","GreaterEqual":"≥","GreaterEqualLess":"⋛","GreaterFullEqual":"≧","GreaterGreater":"⪢","GreaterLess":"≷","GreaterSlantEqual":"⩾","GreaterTilde":"≳","Gscr":"𝒢","gscr":"ℊ","gsim":"≳","gsime":"⪎","gsiml":"⪐","gtcc":"⪧","gtcir":"⩺","gt":">","GT":">","Gt":"≫","gtdot":"⋗","gtlPar":"⦕","gtquest":"⩼","gtrapprox":"⪆","gtrarr":"⥸","gtrdot":"⋗","gtreqless":"⋛","gtreqqless":"⪌","gtrless":"≷","gtrsim":"≳","gvertneqq":"≩︀","gvnE":"≩︀","Hacek":"ˇ","hairsp":" ","half":"½","hamilt":"ℋ","HARDcy":"Ъ","hardcy":"ъ","harrcir":"⥈","harr":"↔","hArr":"⇔","harrw":"↭","Hat":"^","hbar":"ℏ","Hcirc":"Ĥ","hcirc":"ĥ","hearts":"♥","heartsuit":"♥","hellip":"…","hercon":"⊹","hfr":"𝔥","Hfr":"ℌ","HilbertSpace":"ℋ","hksearow":"⤥","hkswarow":"⤦","hoarr":"⇿","homtht":"∻","hookleftarrow":"↩","hookrightarrow":"↪","hopf":"𝕙","Hopf":"ℍ","horbar":"―","HorizontalLine":"─","hscr":"𝒽","Hscr":"ℋ","hslash":"ℏ","Hstrok":"Ħ","hstrok":"ħ","HumpDownHump":"≎","HumpEqual":"≏","hybull":"⁃","hyphen":"‐","Iacute":"Í","iacute":"í","ic":"⁣","Icirc":"Î","icirc":"î","Icy":"И","icy":"и","Idot":"İ","IEcy":"Е","iecy":"е","iexcl":"¡","iff":"⇔","ifr":"𝔦","Ifr":"ℑ","Igrave":"Ì","igrave":"ì","ii":"ⅈ","iiiint":"⨌","iiint":"∭","iinfin":"⧜","iiota":"℩","IJlig":"Ĳ","ijlig":"ĳ","Imacr":"Ī","imacr":"ī","image":"ℑ","ImaginaryI":"ⅈ","imagline":"ℐ","imagpart":"ℑ","imath":"ı","Im":"ℑ","imof":"⊷","imped":"Ƶ","Implies":"⇒","incare":"℅","in":"∈","infin":"∞","infintie":"⧝","inodot":"ı","intcal":"⊺","int":"∫","Int":"∬","integers":"ℤ","Integral":"∫","intercal":"⊺","Intersection":"⋂","intlarhk":"⨗","intprod":"⨼","InvisibleComma":"⁣","InvisibleTimes":"⁢","IOcy":"Ё","iocy":"ё","Iogon":"Į","iogon":"į","Iopf":"𝕀","iopf":"𝕚","Iota":"Ι","iota":"ι","iprod":"⨼","iquest":"¿","iscr":"𝒾","Iscr":"ℐ","isin":"∈","isindot":"⋵","isinE":"⋹","isins":"⋴","isinsv":"⋳","isinv":"∈","it":"⁢","Itilde":"Ĩ","itilde":"ĩ","Iukcy":"І","iukcy":"і","Iuml":"Ï","iuml":"ï","Jcirc":"Ĵ","jcirc":"ĵ","Jcy":"Й","jcy":"й","Jfr":"𝔍","jfr":"𝔧","jmath":"ȷ","Jopf":"𝕁","jopf":"𝕛","Jscr":"𝒥","jscr":"𝒿","Jsercy":"Ј","jsercy":"ј","Jukcy":"Є","jukcy":"є","Kappa":"Κ","kappa":"κ","kappav":"ϰ","Kcedil":"Ķ","kcedil":"ķ","Kcy":"К","kcy":"к","Kfr":"𝔎","kfr":"𝔨","kgreen":"ĸ","KHcy":"Х","khcy":"х","KJcy":"Ќ","kjcy":"ќ","Kopf":"𝕂","kopf":"𝕜","Kscr":"𝒦","kscr":"𝓀","lAarr":"⇚","Lacute":"Ĺ","lacute":"ĺ","laemptyv":"⦴","lagran":"ℒ","Lambda":"Λ","lambda":"λ","lang":"⟨","Lang":"⟪","langd":"⦑","langle":"⟨","lap":"⪅","Laplacetrf":"ℒ","laquo":"«","larrb":"⇤","larrbfs":"⤟","larr":"←","Larr":"↞","lArr":"⇐","larrfs":"⤝","larrhk":"↩","larrlp":"↫","larrpl":"⤹","larrsim":"⥳","larrtl":"↢","latail":"⤙","lAtail":"⤛","lat":"⪫","late":"⪭","lates":"⪭︀","lbarr":"⤌","lBarr":"⤎","lbbrk":"❲","lbrace":"{","lbrack":"[","lbrke":"⦋","lbrksld":"⦏","lbrkslu":"⦍","Lcaron":"Ľ","lcaron":"ľ","Lcedil":"Ļ","lcedil":"ļ","lceil":"⌈","lcub":"{","Lcy":"Л","lcy":"л","ldca":"⤶","ldquo":"“","ldquor":"„","ldrdhar":"⥧","ldrushar":"⥋","ldsh":"↲","le":"≤","lE":"≦","LeftAngleBracket":"⟨","LeftArrowBar":"⇤","leftarrow":"←","LeftArrow":"←","Leftarrow":"⇐","LeftArrowRightArrow":"⇆","leftarrowtail":"↢","LeftCeiling":"⌈","LeftDoubleBracket":"⟦","LeftDownTeeVector":"⥡","LeftDownVectorBar":"⥙","LeftDownVector":"⇃","LeftFloor":"⌊","leftharpoondown":"↽","leftharpoonup":"↼","leftleftarrows":"⇇","leftrightarrow":"↔","LeftRightArrow":"↔","Leftrightarrow":"⇔","leftrightarrows":"⇆","leftrightharpoons":"⇋","leftrightsquigarrow":"↭","LeftRightVector":"⥎","LeftTeeArrow":"↤","LeftTee":"⊣","LeftTeeVector":"⥚","leftthreetimes":"⋋","LeftTriangleBar":"⧏","LeftTriangle":"⊲","LeftTriangleEqual":"⊴","LeftUpDownVector":"⥑","LeftUpTeeVector":"⥠","LeftUpVectorBar":"⥘","LeftUpVector":"↿","LeftVectorBar":"⥒","LeftVector":"↼","lEg":"⪋","leg":"⋚","leq":"≤","leqq":"≦","leqslant":"⩽","lescc":"⪨","les":"⩽","lesdot":"⩿","lesdoto":"⪁","lesdotor":"⪃","lesg":"⋚︀","lesges":"⪓","lessapprox":"⪅","lessdot":"⋖","lesseqgtr":"⋚","lesseqqgtr":"⪋","LessEqualGreater":"⋚","LessFullEqual":"≦","LessGreater":"≶","lessgtr":"≶","LessLess":"⪡","lesssim":"≲","LessSlantEqual":"⩽","LessTilde":"≲","lfisht":"⥼","lfloor":"⌊","Lfr":"𝔏","lfr":"𝔩","lg":"≶","lgE":"⪑","lHar":"⥢","lhard":"↽","lharu":"↼","lharul":"⥪","lhblk":"▄","LJcy":"Љ","ljcy":"љ","llarr":"⇇","ll":"≪","Ll":"⋘","llcorner":"⌞","Lleftarrow":"⇚","llhard":"⥫","lltri":"◺","Lmidot":"Ŀ","lmidot":"ŀ","lmoustache":"⎰","lmoust":"⎰","lnap":"⪉","lnapprox":"⪉","lne":"⪇","lnE":"≨","lneq":"⪇","lneqq":"≨","lnsim":"⋦","loang":"⟬","loarr":"⇽","lobrk":"⟦","longleftarrow":"⟵","LongLeftArrow":"⟵","Longleftarrow":"⟸","longleftrightarrow":"⟷","LongLeftRightArrow":"⟷","Longleftrightarrow":"⟺","longmapsto":"⟼","longrightarrow":"⟶","LongRightArrow":"⟶","Longrightarrow":"⟹","looparrowleft":"↫","looparrowright":"↬","lopar":"⦅","Lopf":"𝕃","lopf":"𝕝","loplus":"⨭","lotimes":"⨴","lowast":"∗","lowbar":"_","LowerLeftArrow":"↙","LowerRightArrow":"↘","loz":"◊","lozenge":"◊","lozf":"⧫","lpar":"(","lparlt":"⦓","lrarr":"⇆","lrcorner":"⌟","lrhar":"⇋","lrhard":"⥭","lrm":"‎","lrtri":"⊿","lsaquo":"‹","lscr":"𝓁","Lscr":"ℒ","lsh":"↰","Lsh":"↰","lsim":"≲","lsime":"⪍","lsimg":"⪏","lsqb":"[","lsquo":"‘","lsquor":"‚","Lstrok":"Ł","lstrok":"ł","ltcc":"⪦","ltcir":"⩹","lt":"<","LT":"<","Lt":"≪","ltdot":"⋖","lthree":"⋋","ltimes":"⋉","ltlarr":"⥶","ltquest":"⩻","ltri":"◃","ltrie":"⊴","ltrif":"◂","ltrPar":"⦖","lurdshar":"⥊","luruhar":"⥦","lvertneqq":"≨︀","lvnE":"≨︀","macr":"¯","male":"♂","malt":"✠","maltese":"✠","Map":"⤅","map":"↦","mapsto":"↦","mapstodown":"↧","mapstoleft":"↤","mapstoup":"↥","marker":"▮","mcomma":"⨩","Mcy":"М","mcy":"м","mdash":"—","mDDot":"∺","measuredangle":"∡","MediumSpace":" ","Mellintrf":"ℳ","Mfr":"𝔐","mfr":"𝔪","mho":"℧","micro":"µ","midast":"*","midcir":"⫰","mid":"∣","middot":"·","minusb":"⊟","minus":"−","minusd":"∸","minusdu":"⨪","MinusPlus":"∓","mlcp":"⫛","mldr":"…","mnplus":"∓","models":"⊧","Mopf":"𝕄","mopf":"𝕞","mp":"∓","mscr":"𝓂","Mscr":"ℳ","mstpos":"∾","Mu":"Μ","mu":"μ","multimap":"⊸","mumap":"⊸","nabla":"∇","Nacute":"Ń","nacute":"ń","nang":"∠⃒","nap":"≉","napE":"⩰̸","napid":"≋̸","napos":"ŉ","napprox":"≉","natural":"♮","naturals":"ℕ","natur":"♮","nbsp":" ","nbump":"≎̸","nbumpe":"≏̸","ncap":"⩃","Ncaron":"Ň","ncaron":"ň","Ncedil":"Ņ","ncedil":"ņ","ncong":"≇","ncongdot":"⩭̸","ncup":"⩂","Ncy":"Н","ncy":"н","ndash":"–","nearhk":"⤤","nearr":"↗","neArr":"⇗","nearrow":"↗","ne":"≠","nedot":"≐̸","NegativeMediumSpace":"​","NegativeThickSpace":"​","NegativeThinSpace":"​","NegativeVeryThinSpace":"​","nequiv":"≢","nesear":"⤨","nesim":"≂̸","NestedGreaterGreater":"≫","NestedLessLess":"≪","NewLine":"\\n","nexist":"∄","nexists":"∄","Nfr":"𝔑","nfr":"𝔫","ngE":"≧̸","nge":"≱","ngeq":"≱","ngeqq":"≧̸","ngeqslant":"⩾̸","nges":"⩾̸","nGg":"⋙̸","ngsim":"≵","nGt":"≫⃒","ngt":"≯","ngtr":"≯","nGtv":"≫̸","nharr":"↮","nhArr":"⇎","nhpar":"⫲","ni":"∋","nis":"⋼","nisd":"⋺","niv":"∋","NJcy":"Њ","njcy":"њ","nlarr":"↚","nlArr":"⇍","nldr":"‥","nlE":"≦̸","nle":"≰","nleftarrow":"↚","nLeftarrow":"⇍","nleftrightarrow":"↮","nLeftrightarrow":"⇎","nleq":"≰","nleqq":"≦̸","nleqslant":"⩽̸","nles":"⩽̸","nless":"≮","nLl":"⋘̸","nlsim":"≴","nLt":"≪⃒","nlt":"≮","nltri":"⋪","nltrie":"⋬","nLtv":"≪̸","nmid":"∤","NoBreak":"⁠","NonBreakingSpace":" ","nopf":"𝕟","Nopf":"ℕ","Not":"⫬","not":"¬","NotCongruent":"≢","NotCupCap":"≭","NotDoubleVerticalBar":"∦","NotElement":"∉","NotEqual":"≠","NotEqualTilde":"≂̸","NotExists":"∄","NotGreater":"≯","NotGreaterEqual":"≱","NotGreaterFullEqual":"≧̸","NotGreaterGreater":"≫̸","NotGreaterLess":"≹","NotGreaterSlantEqual":"⩾̸","NotGreaterTilde":"≵","NotHumpDownHump":"≎̸","NotHumpEqual":"≏̸","notin":"∉","notindot":"⋵̸","notinE":"⋹̸","notinva":"∉","notinvb":"⋷","notinvc":"⋶","NotLeftTriangleBar":"⧏̸","NotLeftTriangle":"⋪","NotLeftTriangleEqual":"⋬","NotLess":"≮","NotLessEqual":"≰","NotLessGreater":"≸","NotLessLess":"≪̸","NotLessSlantEqual":"⩽̸","NotLessTilde":"≴","NotNestedGreaterGreater":"⪢̸","NotNestedLessLess":"⪡̸","notni":"∌","notniva":"∌","notnivb":"⋾","notnivc":"⋽","NotPrecedes":"⊀","NotPrecedesEqual":"⪯̸","NotPrecedesSlantEqual":"⋠","NotReverseElement":"∌","NotRightTriangleBar":"⧐̸","NotRightTriangle":"⋫","NotRightTriangleEqual":"⋭","NotSquareSubset":"⊏̸","NotSquareSubsetEqual":"⋢","NotSquareSuperset":"⊐̸","NotSquareSupersetEqual":"⋣","NotSubset":"⊂⃒","NotSubsetEqual":"⊈","NotSucceeds":"⊁","NotSucceedsEqual":"⪰̸","NotSucceedsSlantEqual":"⋡","NotSucceedsTilde":"≿̸","NotSuperset":"⊃⃒","NotSupersetEqual":"⊉","NotTilde":"≁","NotTildeEqual":"≄","NotTildeFullEqual":"≇","NotTildeTilde":"≉","NotVerticalBar":"∤","nparallel":"∦","npar":"∦","nparsl":"⫽⃥","npart":"∂̸","npolint":"⨔","npr":"⊀","nprcue":"⋠","nprec":"⊀","npreceq":"⪯̸","npre":"⪯̸","nrarrc":"⤳̸","nrarr":"↛","nrArr":"⇏","nrarrw":"↝̸","nrightarrow":"↛","nRightarrow":"⇏","nrtri":"⋫","nrtrie":"⋭","nsc":"⊁","nsccue":"⋡","nsce":"⪰̸","Nscr":"𝒩","nscr":"𝓃","nshortmid":"∤","nshortparallel":"∦","nsim":"≁","nsime":"≄","nsimeq":"≄","nsmid":"∤","nspar":"∦","nsqsube":"⋢","nsqsupe":"⋣","nsub":"⊄","nsubE":"⫅̸","nsube":"⊈","nsubset":"⊂⃒","nsubseteq":"⊈","nsubseteqq":"⫅̸","nsucc":"⊁","nsucceq":"⪰̸","nsup":"⊅","nsupE":"⫆̸","nsupe":"⊉","nsupset":"⊃⃒","nsupseteq":"⊉","nsupseteqq":"⫆̸","ntgl":"≹","Ntilde":"Ñ","ntilde":"ñ","ntlg":"≸","ntriangleleft":"⋪","ntrianglelefteq":"⋬","ntriangleright":"⋫","ntrianglerighteq":"⋭","Nu":"Ν","nu":"ν","num":"#","numero":"№","numsp":" ","nvap":"≍⃒","nvdash":"⊬","nvDash":"⊭","nVdash":"⊮","nVDash":"⊯","nvge":"≥⃒","nvgt":">⃒","nvHarr":"⤄","nvinfin":"⧞","nvlArr":"⤂","nvle":"≤⃒","nvlt":"<⃒","nvltrie":"⊴⃒","nvrArr":"⤃","nvrtrie":"⊵⃒","nvsim":"∼⃒","nwarhk":"⤣","nwarr":"↖","nwArr":"⇖","nwarrow":"↖","nwnear":"⤧","Oacute":"Ó","oacute":"ó","oast":"⊛","Ocirc":"Ô","ocirc":"ô","ocir":"⊚","Ocy":"О","ocy":"о","odash":"⊝","Odblac":"Ő","odblac":"ő","odiv":"⨸","odot":"⊙","odsold":"⦼","OElig":"Œ","oelig":"œ","ofcir":"⦿","Ofr":"𝔒","ofr":"𝔬","ogon":"˛","Ograve":"Ò","ograve":"ò","ogt":"⧁","ohbar":"⦵","ohm":"Ω","oint":"∮","olarr":"↺","olcir":"⦾","olcross":"⦻","oline":"‾","olt":"⧀","Omacr":"Ō","omacr":"ō","Omega":"Ω","omega":"ω","Omicron":"Ο","omicron":"ο","omid":"⦶","ominus":"⊖","Oopf":"𝕆","oopf":"𝕠","opar":"⦷","OpenCurlyDoubleQuote":"“","OpenCurlyQuote":"‘","operp":"⦹","oplus":"⊕","orarr":"↻","Or":"⩔","or":"∨","ord":"⩝","order":"ℴ","orderof":"ℴ","ordf":"ª","ordm":"º","origof":"⊶","oror":"⩖","orslope":"⩗","orv":"⩛","oS":"Ⓢ","Oscr":"𝒪","oscr":"ℴ","Oslash":"Ø","oslash":"ø","osol":"⊘","Otilde":"Õ","otilde":"õ","otimesas":"⨶","Otimes":"⨷","otimes":"⊗","Ouml":"Ö","ouml":"ö","ovbar":"⌽","OverBar":"‾","OverBrace":"⏞","OverBracket":"⎴","OverParenthesis":"⏜","para":"¶","parallel":"∥","par":"∥","parsim":"⫳","parsl":"⫽","part":"∂","PartialD":"∂","Pcy":"П","pcy":"п","percnt":"%","period":".","permil":"‰","perp":"⊥","pertenk":"‱","Pfr":"𝔓","pfr":"𝔭","Phi":"Φ","phi":"φ","phiv":"ϕ","phmmat":"ℳ","phone":"☎","Pi":"Π","pi":"π","pitchfork":"⋔","piv":"ϖ","planck":"ℏ","planckh":"ℎ","plankv":"ℏ","plusacir":"⨣","plusb":"⊞","pluscir":"⨢","plus":"+","plusdo":"∔","plusdu":"⨥","pluse":"⩲","PlusMinus":"±","plusmn":"±","plussim":"⨦","plustwo":"⨧","pm":"±","Poincareplane":"ℌ","pointint":"⨕","popf":"𝕡","Popf":"ℙ","pound":"£","prap":"⪷","Pr":"⪻","pr":"≺","prcue":"≼","precapprox":"⪷","prec":"≺","preccurlyeq":"≼","Precedes":"≺","PrecedesEqual":"⪯","PrecedesSlantEqual":"≼","PrecedesTilde":"≾","preceq":"⪯","precnapprox":"⪹","precneqq":"⪵","precnsim":"⋨","pre":"⪯","prE":"⪳","precsim":"≾","prime":"′","Prime":"″","primes":"ℙ","prnap":"⪹","prnE":"⪵","prnsim":"⋨","prod":"∏","Product":"∏","profalar":"⌮","profline":"⌒","profsurf":"⌓","prop":"∝","Proportional":"∝","Proportion":"∷","propto":"∝","prsim":"≾","prurel":"⊰","Pscr":"𝒫","pscr":"𝓅","Psi":"Ψ","psi":"ψ","puncsp":" ","Qfr":"𝔔","qfr":"𝔮","qint":"⨌","qopf":"𝕢","Qopf":"ℚ","qprime":"⁗","Qscr":"𝒬","qscr":"𝓆","quaternions":"ℍ","quatint":"⨖","quest":"?","questeq":"≟","quot":"\\"","QUOT":"\\"","rAarr":"⇛","race":"∽̱","Racute":"Ŕ","racute":"ŕ","radic":"√","raemptyv":"⦳","rang":"⟩","Rang":"⟫","rangd":"⦒","range":"⦥","rangle":"⟩","raquo":"»","rarrap":"⥵","rarrb":"⇥","rarrbfs":"⤠","rarrc":"⤳","rarr":"→","Rarr":"↠","rArr":"⇒","rarrfs":"⤞","rarrhk":"↪","rarrlp":"↬","rarrpl":"⥅","rarrsim":"⥴","Rarrtl":"⤖","rarrtl":"↣","rarrw":"↝","ratail":"⤚","rAtail":"⤜","ratio":"∶","rationals":"ℚ","rbarr":"⤍","rBarr":"⤏","RBarr":"⤐","rbbrk":"❳","rbrace":"}","rbrack":"]","rbrke":"⦌","rbrksld":"⦎","rbrkslu":"⦐","Rcaron":"Ř","rcaron":"ř","Rcedil":"Ŗ","rcedil":"ŗ","rceil":"⌉","rcub":"}","Rcy":"Р","rcy":"р","rdca":"⤷","rdldhar":"⥩","rdquo":"”","rdquor":"”","rdsh":"↳","real":"ℜ","realine":"ℛ","realpart":"ℜ","reals":"ℝ","Re":"ℜ","rect":"▭","reg":"®","REG":"®","ReverseElement":"∋","ReverseEquilibrium":"⇋","ReverseUpEquilibrium":"⥯","rfisht":"⥽","rfloor":"⌋","rfr":"𝔯","Rfr":"ℜ","rHar":"⥤","rhard":"⇁","rharu":"⇀","rharul":"⥬","Rho":"Ρ","rho":"ρ","rhov":"ϱ","RightAngleBracket":"⟩","RightArrowBar":"⇥","rightarrow":"→","RightArrow":"→","Rightarrow":"⇒","RightArrowLeftArrow":"⇄","rightarrowtail":"↣","RightCeiling":"⌉","RightDoubleBracket":"⟧","RightDownTeeVector":"⥝","RightDownVectorBar":"⥕","RightDownVector":"⇂","RightFloor":"⌋","rightharpoondown":"⇁","rightharpoonup":"⇀","rightleftarrows":"⇄","rightleftharpoons":"⇌","rightrightarrows":"⇉","rightsquigarrow":"↝","RightTeeArrow":"↦","RightTee":"⊢","RightTeeVector":"⥛","rightthreetimes":"⋌","RightTriangleBar":"⧐","RightTriangle":"⊳","RightTriangleEqual":"⊵","RightUpDownVector":"⥏","RightUpTeeVector":"⥜","RightUpVectorBar":"⥔","RightUpVector":"↾","RightVectorBar":"⥓","RightVector":"⇀","ring":"˚","risingdotseq":"≓","rlarr":"⇄","rlhar":"⇌","rlm":"‏","rmoustache":"⎱","rmoust":"⎱","rnmid":"⫮","roang":"⟭","roarr":"⇾","robrk":"⟧","ropar":"⦆","ropf":"𝕣","Ropf":"ℝ","roplus":"⨮","rotimes":"⨵","RoundImplies":"⥰","rpar":")","rpargt":"⦔","rppolint":"⨒","rrarr":"⇉","Rrightarrow":"⇛","rsaquo":"›","rscr":"𝓇","Rscr":"ℛ","rsh":"↱","Rsh":"↱","rsqb":"]","rsquo":"’","rsquor":"’","rthree":"⋌","rtimes":"⋊","rtri":"▹","rtrie":"⊵","rtrif":"▸","rtriltri":"⧎","RuleDelayed":"⧴","ruluhar":"⥨","rx":"℞","Sacute":"Ś","sacute":"ś","sbquo":"‚","scap":"⪸","Scaron":"Š","scaron":"š","Sc":"⪼","sc":"≻","sccue":"≽","sce":"⪰","scE":"⪴","Scedil":"Ş","scedil":"ş","Scirc":"Ŝ","scirc":"ŝ","scnap":"⪺","scnE":"⪶","scnsim":"⋩","scpolint":"⨓","scsim":"≿","Scy":"С","scy":"с","sdotb":"⊡","sdot":"⋅","sdote":"⩦","searhk":"⤥","searr":"↘","seArr":"⇘","searrow":"↘","sect":"§","semi":";","seswar":"⤩","setminus":"∖","setmn":"∖","sext":"✶","Sfr":"𝔖","sfr":"𝔰","sfrown":"⌢","sharp":"♯","SHCHcy":"Щ","shchcy":"щ","SHcy":"Ш","shcy":"ш","ShortDownArrow":"↓","ShortLeftArrow":"←","shortmid":"∣","shortparallel":"∥","ShortRightArrow":"→","ShortUpArrow":"↑","shy":"­","Sigma":"Σ","sigma":"σ","sigmaf":"ς","sigmav":"ς","sim":"∼","simdot":"⩪","sime":"≃","simeq":"≃","simg":"⪞","simgE":"⪠","siml":"⪝","simlE":"⪟","simne":"≆","simplus":"⨤","simrarr":"⥲","slarr":"←","SmallCircle":"∘","smallsetminus":"∖","smashp":"⨳","smeparsl":"⧤","smid":"∣","smile":"⌣","smt":"⪪","smte":"⪬","smtes":"⪬︀","SOFTcy":"Ь","softcy":"ь","solbar":"⌿","solb":"⧄","sol":"/","Sopf":"𝕊","sopf":"𝕤","spades":"♠","spadesuit":"♠","spar":"∥","sqcap":"⊓","sqcaps":"⊓︀","sqcup":"⊔","sqcups":"⊔︀","Sqrt":"√","sqsub":"⊏","sqsube":"⊑","sqsubset":"⊏","sqsubseteq":"⊑","sqsup":"⊐","sqsupe":"⊒","sqsupset":"⊐","sqsupseteq":"⊒","square":"□","Square":"□","SquareIntersection":"⊓","SquareSubset":"⊏","SquareSubsetEqual":"⊑","SquareSuperset":"⊐","SquareSupersetEqual":"⊒","SquareUnion":"⊔","squarf":"▪","squ":"□","squf":"▪","srarr":"→","Sscr":"𝒮","sscr":"𝓈","ssetmn":"∖","ssmile":"⌣","sstarf":"⋆","Star":"⋆","star":"☆","starf":"★","straightepsilon":"ϵ","straightphi":"ϕ","strns":"¯","sub":"⊂","Sub":"⋐","subdot":"⪽","subE":"⫅","sube":"⊆","subedot":"⫃","submult":"⫁","subnE":"⫋","subne":"⊊","subplus":"⪿","subrarr":"⥹","subset":"⊂","Subset":"⋐","subseteq":"⊆","subseteqq":"⫅","SubsetEqual":"⊆","subsetneq":"⊊","subsetneqq":"⫋","subsim":"⫇","subsub":"⫕","subsup":"⫓","succapprox":"⪸","succ":"≻","succcurlyeq":"≽","Succeeds":"≻","SucceedsEqual":"⪰","SucceedsSlantEqual":"≽","SucceedsTilde":"≿","succeq":"⪰","succnapprox":"⪺","succneqq":"⪶","succnsim":"⋩","succsim":"≿","SuchThat":"∋","sum":"∑","Sum":"∑","sung":"♪","sup1":"¹","sup2":"²","sup3":"³","sup":"⊃","Sup":"⋑","supdot":"⪾","supdsub":"⫘","supE":"⫆","supe":"⊇","supedot":"⫄","Superset":"⊃","SupersetEqual":"⊇","suphsol":"⟉","suphsub":"⫗","suplarr":"⥻","supmult":"⫂","supnE":"⫌","supne":"⊋","supplus":"⫀","supset":"⊃","Supset":"⋑","supseteq":"⊇","supseteqq":"⫆","supsetneq":"⊋","supsetneqq":"⫌","supsim":"⫈","supsub":"⫔","supsup":"⫖","swarhk":"⤦","swarr":"↙","swArr":"⇙","swarrow":"↙","swnwar":"⤪","szlig":"ß","Tab":"\\t","target":"⌖","Tau":"Τ","tau":"τ","tbrk":"⎴","Tcaron":"Ť","tcaron":"ť","Tcedil":"Ţ","tcedil":"ţ","Tcy":"Т","tcy":"т","tdot":"⃛","telrec":"⌕","Tfr":"𝔗","tfr":"𝔱","there4":"∴","therefore":"∴","Therefore":"∴","Theta":"Θ","theta":"θ","thetasym":"ϑ","thetav":"ϑ","thickapprox":"≈","thicksim":"∼","ThickSpace":"  ","ThinSpace":" ","thinsp":" ","thkap":"≈","thksim":"∼","THORN":"Þ","thorn":"þ","tilde":"˜","Tilde":"∼","TildeEqual":"≃","TildeFullEqual":"≅","TildeTilde":"≈","timesbar":"⨱","timesb":"⊠","times":"×","timesd":"⨰","tint":"∭","toea":"⤨","topbot":"⌶","topcir":"⫱","top":"⊤","Topf":"𝕋","topf":"𝕥","topfork":"⫚","tosa":"⤩","tprime":"‴","trade":"™","TRADE":"™","triangle":"▵","triangledown":"▿","triangleleft":"◃","trianglelefteq":"⊴","triangleq":"≜","triangleright":"▹","trianglerighteq":"⊵","tridot":"◬","trie":"≜","triminus":"⨺","TripleDot":"⃛","triplus":"⨹","trisb":"⧍","tritime":"⨻","trpezium":"⏢","Tscr":"𝒯","tscr":"𝓉","TScy":"Ц","tscy":"ц","TSHcy":"Ћ","tshcy":"ћ","Tstrok":"Ŧ","tstrok":"ŧ","twixt":"≬","twoheadleftarrow":"↞","twoheadrightarrow":"↠","Uacute":"Ú","uacute":"ú","uarr":"↑","Uarr":"↟","uArr":"⇑","Uarrocir":"⥉","Ubrcy":"Ў","ubrcy":"ў","Ubreve":"Ŭ","ubreve":"ŭ","Ucirc":"Û","ucirc":"û","Ucy":"У","ucy":"у","udarr":"⇅","Udblac":"Ű","udblac":"ű","udhar":"⥮","ufisht":"⥾","Ufr":"𝔘","ufr":"𝔲","Ugrave":"Ù","ugrave":"ù","uHar":"⥣","uharl":"↿","uharr":"↾","uhblk":"▀","ulcorn":"⌜","ulcorner":"⌜","ulcrop":"⌏","ultri":"◸","Umacr":"Ū","umacr":"ū","uml":"¨","UnderBar":"_","UnderBrace":"⏟","UnderBracket":"⎵","UnderParenthesis":"⏝","Union":"⋃","UnionPlus":"⊎","Uogon":"Ų","uogon":"ų","Uopf":"𝕌","uopf":"𝕦","UpArrowBar":"⤒","uparrow":"↑","UpArrow":"↑","Uparrow":"⇑","UpArrowDownArrow":"⇅","updownarrow":"↕","UpDownArrow":"↕","Updownarrow":"⇕","UpEquilibrium":"⥮","upharpoonleft":"↿","upharpoonright":"↾","uplus":"⊎","UpperLeftArrow":"↖","UpperRightArrow":"↗","upsi":"υ","Upsi":"ϒ","upsih":"ϒ","Upsilon":"Υ","upsilon":"υ","UpTeeArrow":"↥","UpTee":"⊥","upuparrows":"⇈","urcorn":"⌝","urcorner":"⌝","urcrop":"⌎","Uring":"Ů","uring":"ů","urtri":"◹","Uscr":"𝒰","uscr":"𝓊","utdot":"⋰","Utilde":"Ũ","utilde":"ũ","utri":"▵","utrif":"▴","uuarr":"⇈","Uuml":"Ü","uuml":"ü","uwangle":"⦧","vangrt":"⦜","varepsilon":"ϵ","varkappa":"ϰ","varnothing":"∅","varphi":"ϕ","varpi":"ϖ","varpropto":"∝","varr":"↕","vArr":"⇕","varrho":"ϱ","varsigma":"ς","varsubsetneq":"⊊︀","varsubsetneqq":"⫋︀","varsupsetneq":"⊋︀","varsupsetneqq":"⫌︀","vartheta":"ϑ","vartriangleleft":"⊲","vartriangleright":"⊳","vBar":"⫨","Vbar":"⫫","vBarv":"⫩","Vcy":"В","vcy":"в","vdash":"⊢","vDash":"⊨","Vdash":"⊩","VDash":"⊫","Vdashl":"⫦","veebar":"⊻","vee":"∨","Vee":"⋁","veeeq":"≚","vellip":"⋮","verbar":"|","Verbar":"‖","vert":"|","Vert":"‖","VerticalBar":"∣","VerticalLine":"|","VerticalSeparator":"❘","VerticalTilde":"≀","VeryThinSpace":" ","Vfr":"𝔙","vfr":"𝔳","vltri":"⊲","vnsub":"⊂⃒","vnsup":"⊃⃒","Vopf":"𝕍","vopf":"𝕧","vprop":"∝","vrtri":"⊳","Vscr":"𝒱","vscr":"𝓋","vsubnE":"⫋︀","vsubne":"⊊︀","vsupnE":"⫌︀","vsupne":"⊋︀","Vvdash":"⊪","vzigzag":"⦚","Wcirc":"Ŵ","wcirc":"ŵ","wedbar":"⩟","wedge":"∧","Wedge":"⋀","wedgeq":"≙","weierp":"℘","Wfr":"𝔚","wfr":"𝔴","Wopf":"𝕎","wopf":"𝕨","wp":"℘","wr":"≀","wreath":"≀","Wscr":"𝒲","wscr":"𝓌","xcap":"⋂","xcirc":"◯","xcup":"⋃","xdtri":"▽","Xfr":"𝔛","xfr":"𝔵","xharr":"⟷","xhArr":"⟺","Xi":"Ξ","xi":"ξ","xlarr":"⟵","xlArr":"⟸","xmap":"⟼","xnis":"⋻","xodot":"⨀","Xopf":"𝕏","xopf":"𝕩","xoplus":"⨁","xotime":"⨂","xrarr":"⟶","xrArr":"⟹","Xscr":"𝒳","xscr":"𝓍","xsqcup":"⨆","xuplus":"⨄","xutri":"△","xvee":"⋁","xwedge":"⋀","Yacute":"Ý","yacute":"ý","YAcy":"Я","yacy":"я","Ycirc":"Ŷ","ycirc":"ŷ","Ycy":"Ы","ycy":"ы","yen":"¥","Yfr":"𝔜","yfr":"𝔶","YIcy":"Ї","yicy":"ї","Yopf":"𝕐","yopf":"𝕪","Yscr":"𝒴","yscr":"𝓎","YUcy":"Ю","yucy":"ю","yuml":"ÿ","Yuml":"Ÿ","Zacute":"Ź","zacute":"ź","Zcaron":"Ž","zcaron":"ž","Zcy":"З","zcy":"з","Zdot":"Ż","zdot":"ż","zeetrf":"ℨ","ZeroWidthSpace":"​","Zeta":"Ζ","zeta":"ζ","zfr":"𝔷","Zfr":"ℨ","ZHcy":"Ж","zhcy":"ж","zigrarr":"⇝","zopf":"𝕫","Zopf":"ℤ","Zscr":"𝒵","zscr":"𝓏","zwj":"‍","zwnj":"‌"}'
        );
      },
      9591: (e) => {
        "use strict";
        e.exports = JSON.parse(
          '{"Aacute":"Á","aacute":"á","Acirc":"Â","acirc":"â","acute":"´","AElig":"Æ","aelig":"æ","Agrave":"À","agrave":"à","amp":"&","AMP":"&","Aring":"Å","aring":"å","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","brvbar":"¦","Ccedil":"Ç","ccedil":"ç","cedil":"¸","cent":"¢","copy":"©","COPY":"©","curren":"¤","deg":"°","divide":"÷","Eacute":"É","eacute":"é","Ecirc":"Ê","ecirc":"ê","Egrave":"È","egrave":"è","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","frac12":"½","frac14":"¼","frac34":"¾","gt":">","GT":">","Iacute":"Í","iacute":"í","Icirc":"Î","icirc":"î","iexcl":"¡","Igrave":"Ì","igrave":"ì","iquest":"¿","Iuml":"Ï","iuml":"ï","laquo":"«","lt":"<","LT":"<","macr":"¯","micro":"µ","middot":"·","nbsp":" ","not":"¬","Ntilde":"Ñ","ntilde":"ñ","Oacute":"Ó","oacute":"ó","Ocirc":"Ô","ocirc":"ô","Ograve":"Ò","ograve":"ò","ordf":"ª","ordm":"º","Oslash":"Ø","oslash":"ø","Otilde":"Õ","otilde":"õ","Ouml":"Ö","ouml":"ö","para":"¶","plusmn":"±","pound":"£","quot":"\\"","QUOT":"\\"","raquo":"»","reg":"®","REG":"®","sect":"§","shy":"­","sup1":"¹","sup2":"²","sup3":"³","szlig":"ß","THORN":"Þ","thorn":"þ","times":"×","Uacute":"Ú","uacute":"ú","Ucirc":"Û","ucirc":"û","Ugrave":"Ù","ugrave":"ù","uml":"¨","Uuml":"Ü","uuml":"ü","Yacute":"Ý","yacute":"ý","yen":"¥","yuml":"ÿ"}'
        );
      },
      2586: (e) => {
        "use strict";
        e.exports = JSON.parse(
          '{"amp":"&","apos":"\'","gt":">","lt":"<","quot":"\\""}'
        );
      },
    },
    t = {};
  function r(n) {
    var i = t[n];
    if (void 0 !== i) return i.exports;
    var o = (t[n] = { id: n, loaded: !1, exports: {} });
    return e[n].call(o.exports, o, o.exports, r), (o.loaded = !0), o.exports;
  }
  (r.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return r.d(t, { a: t }), t;
  }),
    (r.d = (e, t) => {
      for (var n in t)
        r.o(t, n) &&
          !r.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (r.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e));
  var n = {};
  (() => {
    "use strict";
    function e(e, t, r, n) {
      return new (r || (r = Promise))(function (i, o) {
        function a(e) {
          try {
            l(n.next(e));
          } catch (e) {
            o(e);
          }
        }
        function s(e) {
          try {
            l(n.throw(e));
          } catch (e) {
            o(e);
          }
        }
        function l(e) {
          var t;
          e.done
            ? i(e.value)
            : ((t = e.value),
              t instanceof r
                ? t
                : new r(function (e) {
                    e(t);
                  })).then(a, s);
        }
        l((n = n.apply(e, t || [])).next());
      });
    }
    r.r(n), r.d(n, { default: () => C }), Object.create, Object.create;
    const t = require("obsidian");
    var i = r(2985);
    function o() {}
    function a(e) {
      return e();
    }
    function s(e) {
      e.forEach(a);
    }
    function l(e) {
      return "function" == typeof e;
    }
    function c(e) {
      let t;
      return (
        (function (e, ...t) {
          if (null == e) return o;
          const r = e.subscribe(...t);
          return r.unsubscribe ? () => r.unsubscribe() : r;
        })(e, (e) => (t = e))(),
        t
      );
    }
    let u;
    new Set(),
      new Map(),
      Promise.resolve(),
      new Set(),
      new Set(),
      "undefined" != typeof window
        ? window
        : "undefined" != typeof globalThis
        ? globalThis
        : global,
      new Set([
        "allowfullscreen",
        "allowpaymentrequest",
        "async",
        "autofocus",
        "autoplay",
        "checked",
        "controls",
        "default",
        "defer",
        "disabled",
        "formnovalidate",
        "hidden",
        "ismap",
        "loop",
        "multiple",
        "muted",
        "nomodule",
        "novalidate",
        "open",
        "playsinline",
        "readonly",
        "required",
        "reversed",
        "selected",
      ]),
      "function" == typeof HTMLElement &&
        (u = class extends HTMLElement {
          constructor() {
            super(), this.attachShadow({ mode: "open" });
          }
          connectedCallback() {
            const { on_mount: e } = this.$$;
            this.$$.on_disconnect = e.map(a).filter(l);
            for (const e in this.$$.slotted)
              this.appendChild(this.$$.slotted[e]);
          }
          attributeChangedCallback(e, t, r) {
            this[e] = r;
          }
          disconnectedCallback() {
            s(this.$$.on_disconnect);
          }
          $destroy() {
            (function (e, t) {
              const r = e.$$;
              null !== r.fragment &&
                (s(r.on_destroy),
                r.fragment && r.fragment.d(t),
                (r.on_destroy = r.fragment = null),
                (r.ctx = []));
            })(this, 1),
              (this.$destroy = o);
          }
          $on(e, t) {
            const r = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
            return (
              r.push(t),
              () => {
                const e = r.indexOf(t);
                -1 !== e && r.splice(e, 1);
              }
            );
          }
          $set(e) {
            var t;
            this.$$set &&
              ((t = e), 0 !== Object.keys(t).length) &&
              ((this.$$.skip_bound = !0),
              this.$$set(e),
              (this.$$.skip_bound = !1));
          }
        });
    const p = [];
    const d = {
        cookies: [],
        noteLocation: "/",
        dailyNotesLocation: "/",
        insertAfter: "\x3c!-- start of weread --\x3e",
        insertBefore: "\x3c!-- end of weread --\x3e",
        dailyNotesFormat: "YYYY-MM-DD",
        lastCookieTime: -1,
        isCookieValid: !1,
        user: "",
        userVid: "",
        template:
          "---\nisbn: {{metaData.isbn}}\ncategory: {{metaData.category}}\nlastReadDate: {{metaData.lastReadDate}}\n---\n# 元数据\n> [!abstract] {{metaData.title}}\n> - ![ {{metaData.title}}|200]({{metaData.cover}})\n> - 书名： {{metaData.title}}\n> - 作者： {{metaData.author}}\n> - 简介： {{metaData.intro}}\n> - 出版时间 {{metaData.publishTime}}\n> - ISBN： {{metaData.isbn}}\n> - 分类： {{metaData.category}}\n> - 出版社： {{metaData.publisher}}\n\n# 高亮划线\n{% for chapter in chapterHighlights %}\n## {{chapter.chapterTitle}}\n{% for highlight in chapter.highlights %}\n{% if highlight.reviewContent %}{% else %}\n- 📌 {{ highlight.markText |trim }} ^{{highlight.bookmarkId}}\n    - ⏱ {{highlight.createTime}}{% endif %} {% endfor %}{% endfor %}\n# 读书笔记\n{% for chapter in bookReview.chapterReviews %}{% if chapter.reviews or chapter.chapterReview %}\n## {{chapter.chapterTitle}}\n{% if  chapter.chapterReviews %}{% for chapterReview in chapter.chapterReviews %}\n### 章节评论 No.{{loop.index}}\n- {{chapterReview.content}} ^{{chapterReview.reviewId}}\n    - ⏱ {{chapterReview.createTime}} {% endfor%}{%endif %}{% if chapter.reviews %}{%for review in chapter.reviews %}\n### 划线评论\n- 📌 {{review.abstract |trim }}  ^{{review.reviewId}}\n    - 💭 {{review.content}}\n    - ⏱ {{review.createTime}}\n{% endfor %} {%endif %} {% endif %} {% endfor %}\n# 本书评论\n{% if bookReview.bookReviews %}{% for bookReview in bookReview.bookReviews %}\n## 书评 No.{{loop.index}} \n{{bookReview.mdContent}} ^{{bookReview.reviewId}}\n⏱ {{bookReview.createTime}}\n{% endfor%}{% endif %}",
        noteCountLimit: -1,
        subFolderType: "-1",
        fileNameType: "BOOK_NAME",
        dailyNotesToggle: !1,
      },
      f = (() => {
        const t = (function (e, t = o) {
          let r;
          const n = new Set();
          function i(t) {
            if (
              ((o = t),
              ((i = e) != i
                ? o == o
                : i !== o ||
                  (i && "object" == typeof i) ||
                  "function" == typeof i) && ((e = t), r))
            ) {
              const t = !p.length;
              for (const t of n) t[1](), p.push(t, e);
              if (t) {
                for (let e = 0; e < p.length; e += 2) p[e][0](p[e + 1]);
                p.length = 0;
              }
            }
            var i, o;
          }
          return {
            set: i,
            update: function (t) {
              i(t(e));
            },
            subscribe: function (a, s = o) {
              const l = [a, s];
              return (
                n.add(l),
                1 === n.size && (r = t(i) || o),
                a(e),
                () => {
                  n.delete(l), 0 === n.size && (r(), (r = null));
                }
              );
            },
          };
        })(d);
        let r;
        t.subscribe((t) =>
          e(void 0, void 0, void 0, function* () {
            if (r) {
              const e = Object.assign({}, t);
              yield r.saveData(e);
            }
          })
        );
        const n = (e) => {
          for (const r of e)
            "wr_name" == r.name &&
              "" !== r.value &&
              (console.log("[weread plugin] setting user name=>", r.value),
              t.update((e) => ((e.user = r.value), e))),
              "wr_vid" == r.name &&
                "" !== r.value &&
                (console.log("[weread plugin] setting user vid=>", r.value),
                t.update((e) => ((e.userVid = r.value), e)));
        };
        return {
          subscribe: t.subscribe,
          initialise: (i) =>
            e(void 0, void 0, void 0, function* () {
              const e = Object.assign({}, d, yield i.loadData()),
                o = Object.assign({}, e);
              console.log("--------init cookie------", o.cookies),
                o.cookies.length > 1 && n(o.cookies);
              const a = o.cookies.find((e) => "wr_vid" === e.name);
              (void 0 !== a && "" !== a.value) ||
                ((o.userVid = ""), (o.isCookieValid = !1)),
                t.set(o),
                (r = i);
            }),
          actions: {
            setNoteLocationFolder: (e) => {
              t.update((t) => ((t.noteLocation = e), t));
            },
            setCookies: (e) => {
              t.update(
                (t) => (
                  (t.cookies = e),
                  (t.lastCookieTime = new Date().getTime()),
                  (t.isCookieValid = !0),
                  n(e),
                  t
                )
              );
            },
            clearCookies: () => {
              console.log("[weread plugin] cookie已失效，清理cookie..."),
                t.update(
                  (e) => (
                    (e.cookies = []),
                    (e.lastCookieTime = new Date().getTime()),
                    (e.user = ""),
                    (e.userVid = ""),
                    (e.isCookieValid = !1),
                    e
                  )
                );
            },
            setTemplate: (e) => {
              t.update((t) => ((t.template = e), t));
            },
            setNoteCountLimit: (e) => {
              t.update((t) => ((t.noteCountLimit = e), t));
            },
            setSubFolderType: (e) => {
              t.update((t) => ((t.subFolderType = e), t));
            },
            setFileNameType: (e) => {
              t.update((t) => ((t.fileNameType = e), t));
            },
            setDailyNotesToggle: (e) => {
              t.update((t) => ((t.dailyNotesToggle = e), t));
            },
            setDailyNotesFolder: (e) => {
              t.update((t) => ((t.dailyNotesLocation = e), t));
            },
            setDailyNotesFormat: (e) => {
              t.update((t) => ((t.dailyNotesFormat = e), t));
            },
            setInsertAfter: (e) => {
              t.update((t) => ((t.insertAfter = e), t));
            },
            setInsertBefore: (e) => {
              t.update((t) => ((t.insertBefore = e), t));
            },
          },
        };
      })();
    class h {
      constructor() {
        i.configure({ autoescape: !1 });
      }
      validate(e) {
        try {
          return i.renderString(e, {}), !0;
        } catch (e) {
          return !1;
        }
      }
      render(e) {
        const { metaData: t, chapterHighlights: r, bookReview: n } = e,
          o = { metaData: t, chapterHighlights: r, bookReview: n },
          a = c(f).template;
        return i.renderString(a, o);
      }
    }
    var m = r(202),
      g = r.n(m);
    const v = "weread-highlights-reviews",
      b = (e, r, n) => {
        const i = {
          doc_type: v,
          bookId: r.metaData.bookId,
          author: r.metaData.author,
          cover: r.metaData.cover,
          reviewCount: r.metaData.reviewCount,
          noteCount: r.metaData.noteCount,
        };
        let o = Object();
        if (n) {
          if (
            ((o = app.metadataCache.getFileCache(n).frontmatter), void 0 === o)
          )
            throw (
              (new t.Notice("weread front matter invalid"),
              Error("weread front matter invalid"))
            );
          delete o.position;
        }
        const a = e.indexOf("---");
        let s = Object();
        if (-1 !== a) {
          const r = e.indexOf("---") + 4,
            n = e.substring(r).indexOf("---") - 1,
            i = e.substring(r, r + n);
          s = (0, t.parseYaml)(i);
        }
        const l = e.substring(e.lastIndexOf("---") + 4),
          c = Object.assign(Object.assign(Object.assign({}, o), i), s);
        return "---\n" + (0, t.stringifyYaml)(c) + "---\n" + l;
      };
    class y {
      constructor(e, t) {
        (this.vault = e), (this.metadataCache = t), (this.renderer = new h());
      }
      saveDailyNotes(r, n) {
        return e(this, void 0, void 0, function* () {
          const e = yield this.fileExists(r),
            i = this.buildAppendContent(n);
          if (e) {
            const e = yield this.getFileByPath(r),
              t = yield this.vault.cachedRead(e),
              n = yield this.insertAfter(t, i);
            this.vault.modify(e, n);
          } else new t.Notice("没有找到Daily Note，请先创建" + r);
        });
      }
      buildAppendContent(e) {
        return e
          .map(
            (e) =>
              "\n### ".concat(e.bookName).concat("\n") +
              e.refBlocks
                .map((t) => `![[${e.bookName}#^${t.refBlockId}]]`)
                .join("\n")
          )
          .join("\n");
      }
      getDailyNotePath(e) {
        let r;
        const n = c(f).dailyNotesFormat;
        try {
          r = e.format(n);
        } catch (e) {
          throw (new t.Notice("Daily Notes 日期格式不正确" + n), e);
        }
        return c(f).dailyNotesLocation + "/" + r + ".md";
      }
      fileExists(t) {
        return e(this, void 0, void 0, function* () {
          return yield this.vault.adapter.exists(t);
        });
      }
      getFileByPath(r) {
        return e(this, void 0, void 0, function* () {
          const e = yield this.vault.getAbstractFileByPath(r);
          return e
            ? e instanceof t.TFolder
              ? (console.error(`${r} found but it's a folder`), null)
              : e instanceof t.TFile
              ? e
              : void 0
            : (console.error(`${r} not found`), null);
        });
      }
      insertAfter(r, n) {
        return e(this, void 0, void 0, function* () {
          const e = c(f).insertAfter,
            i = new RegExp(`s*${e}s*`),
            o = ((e) => {
              const t = [];
              let r = e;
              for (; r.contains("\n"); ) {
                const e = r.indexOf("\n");
                t.push(r.slice(0, e)), (r = r.slice(e + 1));
              }
              return t.push(r), t;
            })(r).findIndex((e) => i.test(e));
          if (-1 === o)
            throw (
              (new t.Notice(
                `没有在Daily Note中找到区间开始：${e}！请检查Daily Notes设置`
              ),
              new Error("cannot find " + e))
            );
          return this.insertTextAfterPosition(n, r, o);
        });
      }
      insertTextAfterPosition(e, r, n) {
        const i = r.split("\n"),
          o = i.slice(0, n + 1).join("\n"),
          a = i.slice(n + 1),
          s = c(f).insertBefore,
          l = a.findIndex((e) => new RegExp(`s*${s}s*`).test(e));
        if (-1 === l)
          throw (
            (new t.Notice(
              `没有在Daily Note中找到区间结束：${s}！请检查Daily Notes设置`
            ),
            new Error("cannot find " + s))
          );
        return `${o}\n${e}\n${a.slice(l - 1).join("\n")}`;
      }
      saveNotebook(t) {
        return e(this, void 0, void 0, function* () {
          const e = t.metaData.file;
          if (e) {
            if (e.new) {
              const r = e.file;
              console.log(`Updating ${r.path}`);
              const n = this.renderer.render(t),
                i = b(n, t, r);
              yield this.vault.modify(r, i);
            }
          } else {
            const e = yield this.getNewNotebookFilePath(t);
            console.log(`Creating ${e}`);
            const r = this.renderer.render(t),
              n = b(r, t);
            yield this.vault.create(e, n);
          }
        });
      }
      getNotebookFiles() {
        return e(this, void 0, void 0, function* () {
          return this.vault
            .getMarkdownFiles()
            .map((e) => {
              const t = this.metadataCache.getFileCache(e);
              return {
                file: e,
                frontmatter: null == t ? void 0 : t.frontmatter,
              };
            })
            .filter(
              ({ frontmatter: e }) => (null == e ? void 0 : e.doc_type) === v
            )
            .map(({ file: e, frontmatter: t }) => ({
              file: e,
              bookId: t.bookId,
              reviewCount: t.reviewCount,
              noteCount: t.noteCount,
              new: !1,
            }));
        });
      }
      getNewNotebookFilePath(t) {
        return e(this, void 0, void 0, function* () {
          const e = `${c(f).noteLocation}/${this.getSubFolderPath(t.metaData)}`;
          return (
            (yield this.vault.adapter.exists(e)) ||
              (console.info(`Folder ${e} not found. Will be created`),
              yield this.vault.createFolder(e)),
            `${e}/${this.getFileName(t.metaData)}.md`
          );
        });
      }
      getFileName(e) {
        const t = c(f).fileNameType,
          r = ((e) => {
            const t = e.replace(/[':#|]/g, "").trim();
            return g()(t);
          })(e.title);
        return "BOOK_NAME-AUTHOR" == t
          ? e.duplicate
            ? `${r}-${e.author}-${e.bookId}`
            : `${r}-${e.author}`
          : e.duplicate || "BOOK_NAME-BOOKID" == t
          ? `${r}-${e.bookId}`
          : r;
      }
      getSubFolderPath(e) {
        const t = c(f).subFolderType;
        return "title" == t
          ? e.title
          : "category" == t
          ? e.category
            ? e.category.split("-")[0]
            : "公众号" === e.author
            ? "公众号"
            : "未分类"
          : "";
      }
    }
    var w = r(2245);
    class E {
      constructor(e, t) {
        (this.fileManager = e), (this.apiManager = t);
      }
      syncNotebooks(r = !1, n) {
        return e(this, void 0, void 0, function* () {
          const e = yield this.getALlMetadata(),
            i = yield this.filterNoteMetas(r, e),
            o = [];
          for (const e of i) {
            const t = yield this.convertToNotebook(e);
            o.push(t);
          }
          for (const e of o) yield this.syncNotebook(e);
          this.saveToJounal(n, e),
            new t.Notice(`微信读书笔记同步完成!, 本次更新 ${o.length} 本书`);
        });
      }
      syncNotesToJounal(t) {
        return e(this, void 0, void 0, function* () {
          const e = yield this.getALlMetadata();
          this.saveToJounal(t, e);
        });
      }
      convertToNotebook(t) {
        return e(this, void 0, void 0, function* () {
          const e = yield this.apiManager.getBook(t.bookId);
          e &&
            ((t.category = e.category),
            (t.publisher = e.publisher),
            (t.isbn = e.isbn),
            (t.intro = e.intro));
          const r = yield this.apiManager.getNotebookHighlights(t.bookId),
            n = yield this.apiManager.getNotebookReviews(t.bookId),
            i = ((e) => {
              const t = [];
              for (const r of e) {
                const e = r.chapterUid,
                  n = r.chapterTitle,
                  i = t.find((e) => e.chapterUid == r.chapterUid),
                  o = r.reviewContent ? 1 : 0;
                if (null == i) {
                  const i = {
                    chapterUid: e,
                    chapterTitle: n,
                    chapterReviewCount: o,
                    highlights: [r],
                  };
                  t.push(i);
                } else (i.chapterReviewCount += o), i.highlights.push(r);
              }
              return (
                t.forEach((e) =>
                  e.highlights.sort(
                    (e, t) =>
                      parseInt(e.range.split("-")[0]) -
                      parseInt(t.range.split("-")[0])
                  )
                ),
                t.sort((e, t) => e.chapterUid - t.chapterUid)
              );
            })(
              ((e, t) => {
                const r =
                    0 === e.chapters.length ? e.refMpInfos || [] : e.chapters,
                  n = new Map(
                    r.map((e) => [e.chapterUid || e.reviewId, e.title])
                  ),
                  i = e.updated,
                  o = t.reviews;
                return i.map((e) => {
                  const t = e.chapterUid || e.refMpReviewId,
                    r = e.createTime,
                    i = window.moment(1e3 * r).format("YYYY-MM-DD HH:mm:ss"),
                    a = e.range;
                  let s;
                  if (o) {
                    const e = o
                      .map((e) => e.review)
                      .filter((e) => e.range === a)
                      .first();
                    e && (s = e.content);
                  }
                  let l = e.bookmarkId;
                  l.startsWith("MP_WXS") && (l = e.range);
                  const c = e.markText;
                  return {
                    bookmarkId: l.replace(/_/gi, "-"),
                    created: r,
                    createTime: i,
                    chapterUid: t,
                    range: e.range,
                    style: e.style,
                    chapterTitle: n.get(t),
                    markText: c.replace(/\n/gi, ""),
                    reviewContent: s,
                  };
                });
              })(r, n)
            ),
            o = ((e) => {
              const t = e.reviews.map((e) => {
                  var t, r;
                  const n = e.review,
                    i = n.createTime,
                    o = window.moment(1e3 * i).format("YYYY-MM-DD HH:mm:ss"),
                    a = n.htmlContent,
                    s = a ? w.dx.translate(a) : null,
                    l = n.reviewId;
                  return {
                    bookId: n.bookId,
                    created: i,
                    createTime: o,
                    chapterUid:
                      n.chapterUid ||
                      (null === (t = n.refMpInfo) || void 0 === t
                        ? void 0
                        : t.reviewId),
                    chapterTitle:
                      n.chapterTitle ||
                      (null === (r = n.refMpInfo) || void 0 === r
                        ? void 0
                        : r.title),
                    content: n.content,
                    reviewId: l.replace(/_/gi, "-"),
                    mdContent: s || n.content,
                    range: n.range,
                    abstract: n.abstract,
                    type: n.type,
                  };
                }),
                r = t
                  .filter((e) => 1 == e.type)
                  .sort((e, t) => t.created - e.created),
                n = t.filter((e) => 4 == e.type),
                i = new Map();
              for (const e of r) {
                const t = e.chapterUid,
                  r = e.chapterTitle;
                if (null == i.get(e.chapterUid)) {
                  const n = {
                    chapterUid: t,
                    chapterTitle: r,
                    reviews: [],
                    chapterReviews: [],
                  };
                  e.range ? n.reviews.push(e) : n.chapterReviews.push(e),
                    i.set(e.chapterUid, n);
                } else {
                  const t = i.get(e.chapterUid);
                  e.range ? t.reviews.push(e) : t.chapterReviews.push(e);
                }
              }
              return {
                bookReviews: n,
                chapterReviews: Array.from(i.values()).sort(
                  (e, t) => e.chapterUid - t.chapterUid
                ),
              };
            })(n);
          return { metaData: t, bookReview: o, chapterHighlights: i };
        });
      }
      filterNoteMetas(r = !1, n) {
        return e(this, void 0, void 0, function* () {
          const e = yield this.fileManager.getNotebookFiles();
          let i = 0;
          const o = this.getDuplicateBooks(n),
            a = [];
          for (const t of n) {
            if (t.noteCount < +c(f).noteCountLimit) {
              console.debug(
                `[weread plugin] skip book ${t.title} note count: ${t.noteCount}`
              ),
                i++;
              continue;
            }
            const n = yield this.getLocalNotebookFile(t, e);
            !n || n.new || r
              ? ((t.file = n), o.has(t.title) && (t.duplicate = !0), a.push(t))
              : i++;
          }
          return new t.Notice("跳过更新" + i + "本没有更新的书"), a;
        });
      }
      getALlMetadata() {
        return e(this, void 0, void 0, function* () {
          return (yield this.apiManager.getNotebooksWithRetry()).map((e) =>
            ((e) => {
              const t = e.book,
                r = t.cover.replace("/s_", "/t7_"),
                n = window.moment(1e3 * e.sort).format("YYYY-MM-DD");
              return {
                bookId: t.bookId,
                author: t.author,
                title: t.title,
                url: t.url,
                cover: r,
                publishTime: t.publishTime,
                noteCount: e.noteCount,
                reviewCount: e.reviewCount,
                bookType: t.type,
                lastReadDate: n,
              };
            })(e)
          );
        });
      }
      saveToJounal(t, r) {
        return e(this, void 0, void 0, function* () {
          const e = yield this.getBookReadInDate(t),
            n = r.filter((t) => e.contains(t.bookId)),
            i = [];
          for (const e of n) {
            const t = yield this.convertToNotebook(e);
            i.push(t);
          }
          if (c(f).dailyNotesToggle) {
            const e = ((e) => {
                const t = window.moment().format("YYYYMMDD"),
                  r = [];
                for (const n of e) {
                  const e = n.chapterHighlights
                      .flatMap((e) => e.highlights)
                      .filter((e) => {
                        const r = window
                          .moment(1e3 * e.created)
                          .format("YYYYMMDD");
                        return t === r;
                      }),
                    i = [];
                  if (e)
                    for (const t of e)
                      i.push({
                        refBlockId: t.bookmarkId,
                        createTime: t.created,
                      });
                  i.length > 0 &&
                    r.push({ bookName: n.metaData.title, refBlocks: i });
                }
                return r;
              })(i),
              t = this.fileManager.getDailyNotePath(window.moment());
            console.log("get daily note path", t, " size:", e.length),
              this.fileManager.saveDailyNotes(t, e);
          }
        });
      }
      getBookReadInDate(t) {
        return e(this, void 0, void 0, function* () {
          return (yield this.apiManager.getRecentBooks())
            .map((e) => ({
              bookId: e.bookId,
              title: e.title,
              recentTime: e.readUpdateTime,
            }))
            .filter(
              (e) =>
                window.moment(1e3 * e.recentTime).format("YYYY-MM-DD") === t
            )
            .map((e) => e.bookId);
        });
      }
      getDuplicateBooks(e) {
        const t = e.map((e) => e.title),
          r = new Set(t),
          n = t.filter((e) => {
            if (!r.has(e)) return e;
            r.delete(e);
          });
        return new Set(n);
      }
      getLocalNotebookFile(t, r) {
        return e(this, void 0, void 0, function* () {
          const e = r.find((e) => e.bookId === t.bookId) || null;
          return e
            ? (e.noteCount == t.noteCount && e.reviewCount == t.reviewCount
                ? (e.new = !1)
                : (e.new = !0),
              e)
            : null;
        });
      }
      syncNotebook(t) {
        return e(this, void 0, void 0, function* () {
          try {
            yield this.fileManager.saveNotebook(t);
          } catch (e) {
            console.log(
              "[weread plugin] sync note book error",
              t.metaData.title,
              e
            );
          }
        });
      }
    }
    const x = (e) =>
      e
        .map((e) => {
          const t = e.name,
            r = e.value;
          return t + "=" + (-1 !== r.indexOf("%") ? decodeURIComponent(r) : r);
        })
        .join(";");
    var T = r(9328);
    class k {
      constructor() {
        this.baseUrl = "https://i.weread.qq.com";
      }
      getHeaders() {
        return {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
          Cookie: x(c(f).cookies),
        };
      }
      refreshCookie() {
        return e(this, void 0, void 0, function* () {
          const e = {
              url: "https://weread.qq.com",
              method: "HEAD",
              headers: this.getHeaders(),
            },
            r = yield (0, t.requestUrl)(e),
            n = r.headers["set-cookie"] || r.headers["Set-Cookie"];
          void 0 === n
            ? new t.Notice("尝试刷新Cookie失败")
            : (new t.Notice("cookie已过期，尝试刷新Cookie成功"),
              this.updateCookies(n));
        });
      }
      getNotebooksWithRetry() {
        return e(this, void 0, void 0, function* () {
          let e = yield this.getNotebooks();
          if (
            ((void 0 !== e && 0 !== e.length) ||
              (e = yield this.getNotebooks()),
            void 0 === e || 0 === e.length)
          )
            throw (
              (new t.Notice("长时间未登录，Cookie已失效，请重新扫码登录！"),
              f.actions.clearCookies(),
              Error("get weread note book error after retry"))
            );
          return e;
        });
      }
      getRecentBooks() {
        return e(this, void 0, void 0, function* () {
          const e = c(f).userVid;
          console.debug("get userVid settings", e);
          const r = {
            url: this.baseUrl + "/shelf/friendCommon?userVid=" + e,
            method: "GET",
            headers: this.getHeaders(),
          };
          try {
            return (yield (0, t.requestUrl)(r)).json.recentBooks;
          } catch (t) {
            console.error("get recent books error: vid" + e, t);
          }
        });
      }
      getNotebooks() {
        return e(this, void 0, void 0, function* () {
          let e = [];
          const r = {
            url: this.baseUrl + "/user/notebooks",
            method: "GET",
            headers: this.getHeaders(),
          };
          try {
            const n = yield (0, t.requestUrl)(r);
            401 === n.status &&
              (-2012 == n.json.errcode
                ? (console.log("weread cookie expire retry refresh cookie... "),
                  yield this.refreshCookie())
                : (t.Platform.isDesktopApp
                    ? new t.Notice(
                        "微信读书未登录或者用户异常，请在设置中重新登录！"
                      )
                    : new t.Notice(
                        "微信读书未登录或者用户异常，请在电脑端重新登录！"
                      ),
                  console.log(
                    "微信读书未登录或者用户异常，请重新登录, http status code:",
                    n.json.errcode
                  ),
                  f.actions.clearCookies())),
              (e = n.json.books);
          } catch (e) {
            401 == e.status &&
              (console.log(
                `parse request to cURL for debug: ${this.parseToCurl(r)}`
              ),
              yield this.refreshCookie());
          }
          return e;
        });
      }
      parseToCurl(e) {
        const t = ["curl"];
        t.push(e.url);
        const r = e.headers;
        return (
          Object.keys(r).forEach((e) => {
            t.push("-H"),
              t.push(this.escapeStringPosix(e.replace(/^:/, "") + ": " + r[e]));
          }),
          t.push("  --compressed"),
          t.join(" ")
        );
      }
      escapeStringPosix(e) {
        return /[^\x20-\x7E]|'/.test(e)
          ? "$'" +
              e
                .replace(/\\/g, "\\\\")
                .replace(/'/g, "\\'")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[^\x20-\x7E]/g, function (e) {
                  let t = e.charCodeAt(0);
                  return t < 256
                    ? t < 16
                      ? "\\x0" + t.toString(16)
                      : "\\x" + t.toString(16)
                    : ((t = t.toString(16)),
                      "\\u" + ("0000" + t).substr(t.length, 4));
                }) +
              "'"
          : "'" + e + "'";
      }
      getBook(r) {
        return e(this, void 0, void 0, function* () {
          try {
            const e = {
              url: `${this.baseUrl}/book/info?bookId=${r}`,
              method: "GET",
              headers: this.getHeaders(),
            };
            return (yield (0, t.requestUrl)(e)).json;
          } catch (e) {
            console.error("get book detail error", e);
          }
        });
      }
      getNotebookHighlights(r) {
        return e(this, void 0, void 0, function* () {
          try {
            const e = {
              url: `${this.baseUrl}/book/bookmarklist?bookId=${r}`,
              method: "GET",
              headers: this.getHeaders(),
            };
            return (yield (0, t.requestUrl)(e)).json;
          } catch (e) {
            console.error("get book highlight error" + r, e);
          }
        });
      }
      getNotebookReviews(r) {
        return e(this, void 0, void 0, function* () {
          try {
            const e = {
              url: `${this.baseUrl}/review/list?bookId=${r}&listType=11&mine=1&synckey=0`,
              method: "GET",
              headers: this.getHeaders(),
            };
            return (yield (0, t.requestUrl)(e)).json;
          } catch (e) {
            new t.Notice(
              "Failed to fetch weread notebook reviews . Please check your Cookies and try again."
            ),
              console.error("get book review error" + r, e);
          }
        });
      }
      updateCookies(e) {
        let t;
        if (Array.isArray(e)) t = (0, T.parse)(e);
        else {
          const r = (0, T.splitCookiesString)(e);
          t = (0, T.parse)(r);
        }
        const r = c(f).cookies;
        r.forEach((e) => {
          const r = t.find((t) => t.name == e.name);
          r && (e.value = r.value);
        }),
          f.actions.setCookies(r);
      }
    }
    class _ {
      constructor(e) {
        this.settingTab = e;
        const { remote: t } = r(5840),
          { BrowserWindow: n } = t;
        (this.modal = new n({
          parent: t.getCurrentWindow(),
          width: 960,
          height: 540,
          show: !1,
        })),
          this.modal.once("ready-to-show", () => {
            this.modal.setTitle("登录微信读书~"), this.modal.show();
          }),
          this.modal.webContents.session.webRequest.onSendHeaders(
            { urls: ["https://weread.qq.com/web/user?userVid=*"] },
            (t) => {
              const r =
                "" === (n = t.requestHeaders.Cookie)
                  ? []
                  : n
                      .split(";")
                      .map((e) => e.split("="))
                      .map((e) => ({
                        name: decodeURIComponent(e[0].trim()),
                        value: decodeURIComponent(e[1].trim()),
                      }));
              var n;
              "" !== r.find((e) => "wr_name" == e.name).value
                ? (f.actions.setCookies(r), e.display(), this.modal.close())
                : this.modal.reload();
            }
          );
      }
      doLogin() {
        return e(this, void 0, void 0, function* () {
          try {
            yield this.modal.loadURL("https://weread.qq.com/#login");
          } catch (e) {
            console.log(e), new t.Notice("加载微信读书登录页面失败");
          }
        });
      }
      onClose() {
        this.modal.close();
      }
    }
    class A {
      constructor(e) {
        this.settingTab = e;
        const { remote: t } = r(5840),
          { BrowserWindow: n } = t;
        (this.modal = new n({
          parent: t.getCurrentWindow(),
          width: 960,
          height: 540,
          show: !1,
        })),
          this.modal.once("ready-to-show", () => {
            this.modal.setTitle("注销微信读书，右上角头像点击退出登录~"),
              this.modal.show();
          }),
          this.modal.webContents.session.webRequest.onCompleted(
            { urls: ["https://weread.qq.com/web/logout"] },
            (e) => {
              200 == e.statusCode &&
                (console.log("weread logout success, clear cookies..."),
                f.actions.clearCookies(),
                this.settingTab.display(),
                this.modal.close());
            }
          );
      }
      doLogout() {
        return e(this, void 0, void 0, function* () {
          yield this.modal.loadURL("https://weread.qq.com/web/shelf/#logout");
        });
      }
      onClose() {
        this.modal.close();
      }
    }
    var N = r(6040),
      L = r.n(N);
    class O extends t.Modal {
      constructor(e) {
        super(e);
      }
      onOpen() {
        const { contentEl: e } = this,
          t = c(f).cookies,
          r = x(t);
        e
          .createDiv()
          .createEl("h1", {
            text: "🚨Cookie 是敏感信息，仅用于Debug，请不要泄露",
          }),
          e.createDiv().createEl("kbd", { text: r });
      }
      onClose() {
        const { contentEl: e } = this;
        e.empty();
      }
    }
    class S extends t.PluginSettingTab {
      constructor(e, t) {
        super(e, t), (this.plugin = t), (this.renderer = new h());
      }
      display() {
        const { containerEl: e } = this;
        e.empty(), e.createEl("h2", { text: "设置微信读书插件" });
        const r = c(f).isCookieValid;
        t.Platform.isDesktopApp
          ? r
            ? this.showLogout()
            : this.showLogin()
          : r
          ? this.showMobileLogout()
          : this.showMobileLogin(),
          this.notebookFolder(),
          this.noteCountLimit(),
          this.fileNameType(),
          this.subFolderType(),
          this.dailyNotes(),
          c(f).dailyNotesToggle &&
            (this.dailyNotesFolder(),
            this.dailyNoteFormat(),
            this.insertAfter()),
          this.template(),
          t.Platform.isDesktopApp && this.showDebugHelp();
      }
      showMobileLogin() {
        this.containerEl
          .createDiv()
          .setText("微信读书未登录，请先在电脑端登录！");
      }
      showMobileLogout() {
        this.containerEl
          .createDiv()
          .setText(`微信读书已登录，用户名：${c(f).user}`);
      }
      notebookFolder() {
        new t.Setting(this.containerEl)
          .setName("笔记保存位置")
          .setDesc("请选择Obsidian Vault中微信读书笔记存放的位置")
          .addDropdown((t) => {
            const r = this.app.vault.adapter.files,
              n = L()(r, (e) => "folder" === e.type);
            return (
              Object.keys(n).forEach((e) => {
                t.addOption(e, e);
              }),
              t.setValue(c(f).noteLocation).onChange((t) =>
                e(this, void 0, void 0, function* () {
                  f.actions.setNoteLocationFolder(t);
                })
              )
            );
          });
      }
      showLogin() {
        new t.Setting(this.containerEl).setName("登录微信读书").addButton((t) =>
          t
            .setButtonText("登录")
            .setCta()
            .onClick(() =>
              e(this, void 0, void 0, function* () {
                t.setDisabled(!0);
                const e = new _(this);
                yield e.doLogin(), this.display();
              })
            )
        );
      }
      dailyNotes() {
        new t.Setting(this.containerEl)
          .setName("是否保存笔记到 DailyNotes？")
          .setHeading()
          .addToggle((e) =>
            e.setValue(c(f).dailyNotesToggle).onChange((e) => {
              console.debug("set daily notes toggle to", e),
                f.actions.setDailyNotesToggle(e),
                this.display();
            })
          );
      }
      dailyNotesFolder() {
        new t.Setting(this.containerEl)
          .setName("Daily Notes文件夹")
          .setDesc("请选择Daily Notes文件夹")
          .addDropdown((t) => {
            const r = this.app.vault.adapter.files,
              n = L()(r, (e) => "folder" === e.type);
            return (
              Object.keys(n).forEach((e) => {
                t.addOption(e, e);
              }),
              t.setValue(c(f).dailyNotesLocation).onChange((t) =>
                e(this, void 0, void 0, function* () {
                  f.actions.setDailyNotesFolder(t);
                })
              )
            );
          });
      }
      dailyNoteFormat() {
        new t.Setting(this.containerEl)
          .setName("Daily Notes Format")
          .setDesc(
            "请填写Daily Notes文件名格式，支持官方Daily Notes插件的格式，比如：YYYY-MM-DD \t\t\t\t 和 Periodic Notes的嵌套格式，比如 YYYY/[W]ww/YYYY-MM-DD"
          )
          .addText((e) => {
            e.setValue(c(f).dailyNotesFormat).onChange((e) => {
              f.actions.setDailyNotesFormat(e);
            });
          });
      }
      insertAfter() {
        new t.Setting(this.containerEl)
          .setName("在特定区间之内插入")
          .setDesc(
            "请填写Daily Notes中希望读书笔记插入的区间，使用前记得修改Daily Notes模板🫡, 💥注意: 区间之内的内容会被覆盖，请不要在区间内修改内容，"
          )
          .addText((e) => {
            e.setValue(c(f).insertAfter).onChange((e) => {
              f.actions.setInsertAfter(e);
            });
          })
          .addButton(
            (e) => (e.setButtonText("至").buttonEl.style.borderStyle = "none")
          )
          .addText((e) => {
            e.setValue(c(f).insertBefore).onChange((e) => {
              f.actions.setInsertBefore(e);
            });
          });
      }
      subFolderType() {
        new t.Setting(this.containerEl)
          .setName("文件夹分类")
          .setDesc("请选择按照哪个维度对笔记文件进行分类")
          .addDropdown(
            (t) => (
              t.addOptions({
                "-1": "无分类",
                title: "书名",
                category: "图书分类",
              }),
              t.setValue(c(f).subFolderType).onChange((t) =>
                e(this, void 0, void 0, function* () {
                  f.actions.setSubFolderType(t);
                })
              )
            )
          );
      }
      fileNameType() {
        new t.Setting(this.containerEl)
          .setName("文件名模板")
          .setDesc("你选择你喜欢的文件名模板，重复的书会在文件名后加上ID")
          .addDropdown(
            (t) => (
              t.addOptions({
                BOOK_NAME: "书名",
                "BOOK_NAME-AUTHOR": "书名-作者名",
                "BOOK_NAME-ID": "书名-bookId",
              }),
              t.setValue(c(f).fileNameType).onChange((t) =>
                e(this, void 0, void 0, function* () {
                  f.actions.setFileNameType(t);
                })
              )
            )
          );
      }
      showLogout() {
        document.createRange().createContextualFragment;
        const r = document
          .createRange()
          .createContextualFragment(
            "1. 登录：点击登录按钮，在弹出页面【扫码登录】。\n             2. 注销：点击注销，在弹出书架页面右上角点击头像，下拉菜单选择【退出登录】"
          );
        new t.Setting(this.containerEl)
          .setName(`微信读书已登录，用户名：  ${c(f).user}`)
          .setDesc(r)
          .addButton((t) =>
            t
              .setButtonText("注销")
              .setCta()
              .onClick(() =>
                e(this, void 0, void 0, function* () {
                  t.setDisabled(!0);
                  const e = new A(this);
                  yield e.doLogout(), this.display();
                })
              )
          )
          .addButton((t) =>
            t
              .setButtonText("Show Cookie")
              .setCta()
              .onClick(() =>
                e(this, void 0, void 0, function* () {
                  new O(this.app).open();
                })
              )
          );
      }
      template() {
        const r = document
          .createRange()
          .createContextualFragment(
            '<a href="https://github.com/zhaohongxuan/obsidian-weread-plugin/wiki/Weread-obsidian-plugin-markdown-template-usage">模板使用说明</a>\n<p>\n  <h2>可用变量</h2>\n</p>\n元数据变量(metaData)\n<ul>\n  <li><span class="u-pop">{{title}}</span> - 书名</li>\n  <li><span class="u-pop">{{author}}</span> - 作者</li>\n  <li><span class="u-pop">{{cover}}</span> - 封面</li>\n  <li><span class="u-pop">{{intro}}</span> - 书籍简介</li>\n  <li><span class="u-pop">{{bookId}}</span> - 微信图书ID </li>\n  <li><span class="u-pop">{{publishTime}}</span> - 出版时间</li>\n  <li><span class="u-pop">{{noteCount}}</span> - 划线数量</li>\n  <li><span class="u-pop">{{reviewCount}}</span> - 笔记数量</li>\n  <li><span class="u-pop">{{isbn}}</span> - ISBN</li>\n  <li><span class="u-pop">{{category}}</span> - 分类</li>\n  <li><span class="u-pop">{{publisher}}</span> - 出版社</li>\n  <li><span class="u-pop">{{finish}}</span> - 是否读完（还未支持）</li>\n</ul>\n划线变量(chapterHighlights)\n<ul>\n  <li><span class="u-pop">{{chapterUid}}</span> - 章节ID</li>\n  <li><span class="u-pop">{{chapterTitle}}</span> - 章节标题</li>\n  <li><span class="u-pop">{{createTime}}</span> - 创建时间</li>\n  <li><span class="u-pop">{{range}}</span> - 划线范围</li>\n  <li><span class="u-pop">{{markText}}</span> - 划线文本</li>\n</ul>\n笔记笔记(bookReview)\n<ul>\n  <li><span class="u-pop">{{reviewId}}</span> - reviewId</li>\n  <li><span class="u-pop">{{chapterUid}}</span> - 章节ID</li>\n  <li><span class="u-pop">{{chapterTitle}}</span> - 章节标题</li>\n  <li><span class="u-pop">{{createTime}}</span> - 创建时间</li>\n  <li><span class="u-pop">{{abstract}}</span> - 摘录内容</li>\n  <li><span class="u-pop">{{content}}</span> - 笔记内容</li>\n  <li><span class="u-pop">{{mdContent}}</span> - markdown笔记格式</li>\n  <li><span class="u-pop">{{type}}</span> - 类型</li>\n  <li><span class="u-pop">{{range}}</span> - 范围</li>\n</ul>\n'
          );
        new t.Setting(this.containerEl)
          .setName("笔记模板")
          .setDesc(r)
          .addTextArea(
            (t) => (
              (t.inputEl.style.width = "100%"),
              (t.inputEl.style.height = "540px"),
              (t.inputEl.style.fontSize = "0.8em"),
              t.setValue(c(f).template).onChange((r) =>
                e(this, void 0, void 0, function* () {
                  const e = this.renderer.validate(r);
                  e && f.actions.setTemplate(r),
                    (t.inputEl.style.border = e ? "" : "2px solid red");
                })
              ),
              t
            )
          );
      }
      noteCountLimit() {
        new t.Setting(this.containerEl)
          .setName("笔记划线数量最小值")
          .setDesc("划线数量小于该值的笔记将不会被同步")
          .addDropdown((t) => {
            t.addOptions({
              "-1": "无限制",
              3: "3条",
              5: "5条",
              10: "10条",
              15: "15条",
              30: "30条",
            })
              .setValue(c(f).noteCountLimit.toString())
              .onChange((t) =>
                e(this, void 0, void 0, function* () {
                  console.log("[weread plugin] new note count limit", t),
                    f.actions.setNoteCountLimit(+t);
                })
              );
          });
      }
      showDebugHelp() {
        const e = this.containerEl.createDiv();
        e.setAttr("align", "center"),
          e.setText(
            "查看控制台日志: 使用以下快捷键快速打开控制台，查看本插件以及其他插件的运行日志"
          );
        const r = this.containerEl.createDiv();
        r.setAttr("align", "center"),
          (r.style.margin = "10px"),
          !0 === t.Platform.isMacOS
            ? r.createEl("kbd", { text: "CMD (⌘) + OPTION (⌥) + I" })
            : r.createEl("kbd", { text: "CTRL + SHIFT + I" });
      }
    }
    class C extends t.Plugin {
      onload() {
        return e(this, void 0, void 0, function* () {
          console.log("load weread plugin"), f.initialise(this);
          const e = new y(this.app.vault, this.app.metadataCache),
            r = new k();
          (this.syncNotebooks = new E(e, r)),
            this.addRibbonIcon("book-open", "Weread", (e) => {
              this.startSync();
            }),
            this.addCommand({
              id: "sync-weread-notes-command",
              name: "Sync Weread Notes",
              callback: () => {
                this.startSync();
              },
            }),
            this.addCommand({
              id: "Force-sync-weread-notes-command",
              name: "Force Sync Weread Notes",
              callback: () => {
                this.startSync(!0);
              },
            }),
            this.addCommand({
              id: "sync-weread-notes-to-daily-note",
              name: "Sync Weread Notes To Daily Note",
              callback: () => {
                const e = window.moment().format("YYYY-MM-DD");
                new t.Notice("开始同步微信读书笔记到DailyNotes!" + e),
                  this.syncNotebooks.syncNotesToJounal(e);
              },
            }),
            this.addSettingTab(new S(this.app, this));
        });
      }
      startSync(r = !1) {
        return e(this, void 0, void 0, function* () {
          console.log("syncing Weread note start"),
            r
              ? new t.Notice("强制同步微信读书笔记开始!")
              : new t.Notice("同步微信读书笔记开始!");
          try {
            yield this.syncNotebooks.syncNotebooks(
              r,
              window.moment().format("YYYY-MM-DD")
            ),
              console.log("syncing Weread note finish");
          } catch (e) {
            t.Platform.isDesktopApp
              ? new t.Notice("同步微信读书笔记异常,请打开控制台查看详情")
              : new t.Notice(
                  "同步微信读书笔记异常,请使用电脑端打开控制台查看详情" + e
                ),
              console.error("同步微信读书笔记异常", e);
          }
        });
      }
      onunload() {
        console.log("unloading weread plugin", new Date().toLocaleString());
      }
    }
  })();
  var i = exports;
  for (var o in n) i[o] = n[o];
  n.__esModule && Object.defineProperty(i, "__esModule", { value: !0 });
})();
