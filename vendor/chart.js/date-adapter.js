/*!
 * chartjs-adapter-date-fns v2.0.0
 * https://www.chartjs.org
 * (c) 2021 chartjs-adapter-date-fns Contributors
 * Released under the MIT license
 */
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(require("chart.js")) : "function" == typeof define && define.amd ? define(["chart.js"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).Chart)
}(this, (function (t) {
    "use strict";

    function e(t) {
        if (null === t || !0 === t || !1 === t) return NaN;
        var e = Number(t);
        return isNaN(e) ? e : e < 0 ? Math.ceil(e) : Math.floor(e)
    }

    function r(t, e) {
        if (e.length < t) throw new TypeError(t + " argument" + (t > 1 ? "s" : "") + " required, but only " + e.length + " present")
    }

    function n(t) {
        r(1, arguments);
        var e = Object.prototype.toString.call(t);
        return t instanceof Date || "object" == typeof t && "[object Date]" === e ? new Date(t.getTime()) : "number" == typeof t || "[object Number]" === e ? new Date(t) : ("string" != typeof t && "[object String]" !== e || "undefined" == typeof console || (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"), console.warn((new Error).stack)), new Date(NaN))
    }

    function a(t, a) {
        r(2, arguments);
        var i = n(t),
            o = e(a);
        return isNaN(o) ? new Date(NaN) : o ? (i.setDate(i.getDate() + o), i) : i
    }

    function i(t, a) {
        r(2, arguments);
        var i = n(t),
            o = e(a);
        if (isNaN(o)) return new Date(NaN);
        if (!o) return i;
        var u = i.getDate(),
            s = new Date(i.getTime());
        s.setMonth(i.getMonth() + o + 1, 0);
        var c = s.getDate();
        return u >= c ? s : (i.setFullYear(s.getFullYear(), s.getMonth(), u), i)
    }

    function o(t, a) {
        r(2, arguments);
        var i = n(t).getTime(),
            o = e(a);
        return new Date(i + o)
    }
    var u = 36e5;

    function s(t, a) {
        r(1, arguments);
        var i = a || {},
            o = i.locale,
            u = o && o.options && o.options.weekStartsOn,
            s = null == u ? 0 : e(u),
            c = null == i.weekStartsOn ? s : e(i.weekStartsOn);
        if (!(c >= 0 && c <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
        var d = n(t),
            l = d.getDay(),
            f = (l < c ? 7 : 0) + l - c;
        return d.setDate(d.getDate() - f), d.setHours(0, 0, 0, 0), d
    }

    function c(t) {
        var e = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
        return e.setUTCFullYear(t.getFullYear()), t.getTime() - e.getTime()
    }

    function d(t) {
        r(1, arguments);
        var e = n(t);
        return e.setHours(0, 0, 0, 0), e
    }
    var l = 864e5;

    function f(t, e) {
        r(2, arguments);
        var n = d(t),
            a = d(e),
            i = n.getTime() - c(n),
            o = a.getTime() - c(a);
        return Math.round((i - o) / l)
    }

    function h(t, e) {
        r(2, arguments);
        var a = n(t),
            i = n(e),
            o = a.getTime() - i.getTime();
        return o < 0 ? -1 : o > 0 ? 1 : o
    }

    function m(t) {
        r(1, arguments);
        var e = n(t);
        return !isNaN(e)
    }

    function w(t, e) {
        r(2, arguments);
        var a = n(t),
            i = n(e),
            o = a.getFullYear() - i.getFullYear(),
            u = a.getMonth() - i.getMonth();
        return 12 * o + u
    }

    function g(t, e) {
        r(2, arguments);
        var a = n(t),
            i = n(e);
        return a.getFullYear() - i.getFullYear()
    }

    function v(t, e) {
        var r = t.getFullYear() - e.getFullYear() || t.getMonth() - e.getMonth() || t.getDate() - e.getDate() || t.getHours() - e.getHours() || t.getMinutes() - e.getMinutes() || t.getSeconds() - e.getSeconds() || t.getMilliseconds() - e.getMilliseconds();
        return r < 0 ? -1 : r > 0 ? 1 : r
    }

    function b(t, e) {
        r(2, arguments);
        var a = n(t),
            i = n(e),
            o = v(a, i),
            u = Math.abs(f(a, i));
        a.setDate(a.getDate() - o * u);
        var s = v(a, i) === -o,
            c = o * (u - s);
        return 0 === c ? 0 : c
    }

    function y(t, e) {
        r(2, arguments);
        var a = n(t),
            i = n(e);
        return a.getTime() - i.getTime()
    }
    var T = 36e5;

    function p(t) {
        r(1, arguments);
        var e = n(t);
        return e.setHours(23, 59, 59, 999), e
    }

    function C(t) {
        r(1, arguments);
        var e = n(t),
            a = e.getMonth();
        return e.setFullYear(e.getFullYear(), a + 1, 0), e.setHours(23, 59, 59, 999), e
    }

    function M(t) {
        r(1, arguments);
        var e = n(t);
        return p(e).getTime() === C(e).getTime()
    }

    function x(t, e) {
        r(2, arguments);
        var a, i = n(t),
            o = n(e),
            u = h(i, o),
            s = Math.abs(w(i, o));
        if (s < 1) a = 0;
        else {
            1 === i.getMonth() && i.getDate() > 27 && i.setDate(30), i.setMonth(i.getMonth() - u * s);
            var c = h(i, o) === -u;
            M(n(t)) && 1 === s && 1 === h(t, o) && (c = !1), a = u * (s - c)
        }
        return 0 === a ? 0 : a
    }
    var D = {
        lessThanXSeconds: {
            one: "less than a second",
            other: "less than {{count}} seconds"
        },
        xSeconds: {
            one: "1 second",
            other: "{{count}} seconds"
        },
        halfAMinute: "half a minute",
        lessThanXMinutes: {
            one: "less than a minute",
            other: "less than {{count}} minutes"
        },
        xMinutes: {
            one: "1 minute",
            other: "{{count}} minutes"
        },
        aboutXHours: {
            one: "about 1 hour",
            other: "about {{count}} hours"
        },
        xHours: {
            one: "1 hour",
            other: "{{count}} hours"
        },
        xDays: {
            one: "1 day",
            other: "{{count}} days"
        },
        aboutXWeeks: {
            one: "about 1 week",
            other: "about {{count}} weeks"
        },
        xWeeks: {
            one: "1 week",
            other: "{{count}} weeks"
        },
        aboutXMonths: {
            one: "about 1 month",
            other: "about {{count}} months"
        },
        xMonths: {
            one: "1 month",
            other: "{{count}} months"
        },
        aboutXYears: {
            one: "about 1 year",
            other: "about {{count}} years"
        },
        xYears: {
            one: "1 year",
            other: "{{count}} years"
        },
        overXYears: {
            one: "over 1 year",
            other: "over {{count}} years"
        },
        almostXYears: {
            one: "almost 1 year",
            other: "almost {{count}} years"
        }
    };

    function k(t) {
        return function (e) {
            var r = e || {},
                n = r.width ? String(r.width) : t.defaultWidth;
            return t.formats[n] || t.formats[t.defaultWidth]
        }
    }
    var U = {
            date: k({
                formats: {
                    full: "EEEE, MMMM do, y",
                    long: "MMMM do, y",
                    medium: "MMM d, y",
                    short: "MM/dd/yyyy"
                },
                defaultWidth: "full"
            }),
            time: k({
                formats: {
                    full: "h:mm:ss a zzzz",
                    long: "h:mm:ss a z",
                    medium: "h:mm:ss a",
                    short: "h:mm a"
                },
                defaultWidth: "full"
            }),
            dateTime: k({
                formats: {
                    full: "{{date}} 'at' {{time}}",
                    long: "{{date}} 'at' {{time}}",
                    medium: "{{date}}, {{time}}",
                    short: "{{date}}, {{time}}"
                },
                defaultWidth: "full"
            })
        },
        Y = {
            lastWeek: "'last' eeee 'at' p",
            yesterday: "'yesterday at' p",
            today: "'today at' p",
            tomorrow: "'tomorrow at' p",
            nextWeek: "eeee 'at' p",
            other: "P"
        };

    function N(t) {
        return function (e, r) {
            var n, a = r || {};
            if ("formatting" === (a.context ? String(a.context) : "standalone") && t.formattingValues) {
                var i = t.defaultFormattingWidth || t.defaultWidth,
                    o = a.width ? String(a.width) : i;
                n = t.formattingValues[o] || t.formattingValues[i]
            } else {
                var u = t.defaultWidth,
                    s = a.width ? String(a.width) : t.defaultWidth;
                n = t.values[s] || t.values[u]
            }
            return n[t.argumentCallback ? t.argumentCallback(e) : e]
        }
    }

    function P(t) {
        return function (e, r) {
            var n = String(e),
                a = r || {},
                i = a.width,
                o = i && t.matchPatterns[i] || t.matchPatterns[t.defaultMatchWidth],
                u = n.match(o);
            if (!u) return null;
            var s, c = u[0],
                d = i && t.parsePatterns[i] || t.parsePatterns[t.defaultParseWidth];
            return s = "[object Array]" === Object.prototype.toString.call(d) ? function (t, e) {
                for (var r = 0; r < t.length; r++)
                    if (e(t[r])) return r
            }(d, (function (t) {
                return t.test(c)
            })) : function (t, e) {
                for (var r in t)
                    if (t.hasOwnProperty(r) && e(t[r])) return r
            }(d, (function (t) {
                return t.test(c)
            })), s = t.valueCallback ? t.valueCallback(s) : s, {
                value: s = a.valueCallback ? a.valueCallback(s) : s,
                rest: n.slice(c.length)
            }
        }
    }
    var S, q = {
        code: "en-US",
        formatDistance: function (t, e, r) {
            var n;
            return r = r || {}, n = "string" == typeof D[t] ? D[t] : 1 === e ? D[t].one : D[t].other.replace("{{count}}", e), r.addSuffix ? r.comparison > 0 ? "in " + n : n + " ago" : n
        },
        formatLong: U,
        formatRelative: function (t, e, r, n) {
            return Y[t]
        },
        localize: {
            ordinalNumber: function (t, e) {
                var r = Number(t),
                    n = r % 100;
                if (n > 20 || n < 10) switch (n % 10) {
                    case 1:
                        return r + "st";
                    case 2:
                        return r + "nd";
                    case 3:
                        return r + "rd"
                }
                return r + "th"
            },
            era: N({
                values: {
                    narrow: ["B", "A"],
                    abbreviated: ["BC", "AD"],
                    wide: ["Before Christ", "Anno Domini"]
                },
                defaultWidth: "wide"
            }),
            quarter: N({
                values: {
                    narrow: ["1", "2", "3", "4"],
                    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
                    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
                },
                defaultWidth: "wide",
                argumentCallback: function (t) {
                    return Number(t) - 1
                }
            }),
            month: N({
                values: {
                    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
                    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                },
                defaultWidth: "wide"
            }),
            day: N({
                values: {
                    narrow: ["S", "M", "T", "W", "T", "F", "S"],
                    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                },
                defaultWidth: "wide"
            }),
            dayPeriod: N({
                values: {
                    narrow: {
                        am: "a",
                        pm: "p",
                        midnight: "mi",
                        noon: "n",
                        morning: "morning",
                        afternoon: "afternoon",
                        evening: "evening",
                        night: "night"
                    },
                    abbreviated: {
                        am: "AM",
                        pm: "PM",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "morning",
                        afternoon: "afternoon",
                        evening: "evening",
                        night: "night"
                    },
                    wide: {
                        am: "a.m.",
                        pm: "p.m.",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "morning",
                        afternoon: "afternoon",
                        evening: "evening",
                        night: "night"
                    }
                },
                defaultWidth: "wide",
                formattingValues: {
                    narrow: {
                        am: "a",
                        pm: "p",
                        midnight: "mi",
                        noon: "n",
                        morning: "in the morning",
                        afternoon: "in the afternoon",
                        evening: "in the evening",
                        night: "at night"
                    },
                    abbreviated: {
                        am: "AM",
                        pm: "PM",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "in the morning",
                        afternoon: "in the afternoon",
                        evening: "in the evening",
                        night: "at night"
                    },
                    wide: {
                        am: "a.m.",
                        pm: "p.m.",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "in the morning",
                        afternoon: "in the afternoon",
                        evening: "in the evening",
                        night: "at night"
                    }
                },
                defaultFormattingWidth: "wide"
            })
        },
        match: {
            ordinalNumber: (S = {
                matchPattern: /^(\d+)(th|st|nd|rd)?/i,
                parsePattern: /\d+/i,
                valueCallback: function (t) {
                    return parseInt(t, 10)
                }
            }, function (t, e) {
                var r = String(t),
                    n = e || {},
                    a = r.match(S.matchPattern);
                if (!a) return null;
                var i = a[0],
                    o = r.match(S.parsePattern);
                if (!o) return null;
                var u = S.valueCallback ? S.valueCallback(o[0]) : o[0];
                return {
                    value: u = n.valueCallback ? n.valueCallback(u) : u,
                    rest: r.slice(i.length)
                }
            }),
            era: P({
                matchPatterns: {
                    narrow: /^(b|a)/i,
                    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
                    wide: /^(before christ|before common era|anno domini|common era)/i
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    any: [/^b/i, /^(a|c)/i]
                },
                defaultParseWidth: "any"
            }),
            quarter: P({
                matchPatterns: {
                    narrow: /^[1234]/i,
                    abbreviated: /^q[1234]/i,
                    wide: /^[1234](th|st|nd|rd)? quarter/i
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    any: [/1/i, /2/i, /3/i, /4/i]
                },
                defaultParseWidth: "any",
                valueCallback: function (t) {
                    return t + 1
                }
            }),
            month: P({
                matchPatterns: {
                    narrow: /^[jfmasond]/i,
                    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
                    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
                    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
                },
                defaultParseWidth: "any"
            }),
            day: P({
                matchPatterns: {
                    narrow: /^[smtwf]/i,
                    short: /^(su|mo|tu|we|th|fr|sa)/i,
                    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
                    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
                    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
                },
                defaultParseWidth: "any"
            }),
            dayPeriod: P({
                matchPatterns: {
                    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
                    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
                },
                defaultMatchWidth: "any",
                parsePatterns: {
                    any: {
                        am: /^a/i,
                        pm: /^p/i,
                        midnight: /^mi/i,
                        noon: /^no/i,
                        morning: /morning/i,
                        afternoon: /afternoon/i,
                        evening: /evening/i,
                        night: /night/i
                    }
                },
                defaultParseWidth: "any"
            })
        },
        options: {
            weekStartsOn: 0,
            firstWeekContainsDate: 1
        }
    };

    function E(t, n) {
        r(2, arguments);
        var a = e(n);
        return o(t, -a)
    }

    function H(t, e) {
        for (var r = t < 0 ? "-" : "", n = Math.abs(t).toString(); n.length < e;) n = "0" + n;
        return r + n
    }
    var O = function (t, e) {
            var r = t.getUTCFullYear(),
                n = r > 0 ? r : 1 - r;
            return H("yy" === e ? n % 100 : n, e.length)
        },
        F = function (t, e) {
            var r = t.getUTCMonth();
            return "M" === e ? String(r + 1) : H(r + 1, 2)
        },
        W = function (t, e) {
            return H(t.getUTCDate(), e.length)
        },
        L = function (t, e) {
            return H(t.getUTCHours() % 12 || 12, e.length)
        },
        Q = function (t, e) {
            return H(t.getUTCHours(), e.length)
        },
        R = function (t, e) {
            return H(t.getUTCMinutes(), e.length)
        },
        X = function (t, e) {
            return H(t.getUTCSeconds(), e.length)
        },
        G = function (t, e) {
            var r = e.length,
                n = t.getUTCMilliseconds();
            return H(Math.floor(n * Math.pow(10, r - 3)), e.length)
        },
        B = 864e5;

    function I(t) {
        r(1, arguments);
        var e = 1,
            a = n(t),
            i = a.getUTCDay(),
            o = (i < e ? 7 : 0) + i - e;
        return a.setUTCDate(a.getUTCDate() - o), a.setUTCHours(0, 0, 0, 0), a
    }

    function z(t) {
        r(1, arguments);
        var e = n(t),
            a = e.getUTCFullYear(),
            i = new Date(0);
        i.setUTCFullYear(a + 1, 0, 4), i.setUTCHours(0, 0, 0, 0);
        var o = I(i),
            u = new Date(0);
        u.setUTCFullYear(a, 0, 4), u.setUTCHours(0, 0, 0, 0);
        var s = I(u);
        return e.getTime() >= o.getTime() ? a + 1 : e.getTime() >= s.getTime() ? a : a - 1
    }

    function j(t) {
        r(1, arguments);
        var e = z(t),
            n = new Date(0);
        n.setUTCFullYear(e, 0, 4), n.setUTCHours(0, 0, 0, 0);
        var a = I(n);
        return a
    }
    var A = 6048e5;

    function Z(t) {
        r(1, arguments);
        var e = n(t),
            a = I(e).getTime() - j(e).getTime();
        return Math.round(a / A) + 1
    }

    function K(t, a) {
        r(1, arguments);
        var i = a || {},
            o = i.locale,
            u = o && o.options && o.options.weekStartsOn,
            s = null == u ? 0 : e(u),
            c = null == i.weekStartsOn ? s : e(i.weekStartsOn);
        if (!(c >= 0 && c <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
        var d = n(t),
            l = d.getUTCDay(),
            f = (l < c ? 7 : 0) + l - c;
        return d.setUTCDate(d.getUTCDate() - f), d.setUTCHours(0, 0, 0, 0), d
    }

    function $(t, a) {
        r(1, arguments);
        var i = n(t, a),
            o = i.getUTCFullYear(),
            u = a || {},
            s = u.locale,
            c = s && s.options && s.options.firstWeekContainsDate,
            d = null == c ? 1 : e(c),
            l = null == u.firstWeekContainsDate ? d : e(u.firstWeekContainsDate);
        if (!(l >= 1 && l <= 7)) throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
        var f = new Date(0);
        f.setUTCFullYear(o + 1, 0, l), f.setUTCHours(0, 0, 0, 0);
        var h = K(f, a),
            m = new Date(0);
        m.setUTCFullYear(o, 0, l), m.setUTCHours(0, 0, 0, 0);
        var w = K(m, a);
        return i.getTime() >= h.getTime() ? o + 1 : i.getTime() >= w.getTime() ? o : o - 1
    }

    function _(t, n) {
        r(1, arguments);
        var a = n || {},
            i = a.locale,
            o = i && i.options && i.options.firstWeekContainsDate,
            u = null == o ? 1 : e(o),
            s = null == a.firstWeekContainsDate ? u : e(a.firstWeekContainsDate),
            c = $(t, n),
            d = new Date(0);
        d.setUTCFullYear(c, 0, s), d.setUTCHours(0, 0, 0, 0);
        var l = K(d, n);
        return l
    }
    var J = 6048e5;

    function V(t, e) {
        r(1, arguments);
        var a = n(t),
            i = K(a, e).getTime() - _(a, e).getTime();
        return Math.round(i / J) + 1
    }
    var tt = "midnight",
        et = "noon",
        rt = "morning",
        nt = "afternoon",
        at = "evening",
        it = "night",
        ot = {
            G: function (t, e, r) {
                var n = t.getUTCFullYear() > 0 ? 1 : 0;
                switch (e) {
                    case "G":
                    case "GG":
                    case "GGG":
                        return r.era(n, {
                            width: "abbreviated"
                        });
                    case "GGGGG":
                        return r.era(n, {
                            width: "narrow"
                        });
                    case "GGGG":
                    default:
                        return r.era(n, {
                            width: "wide"
                        })
                }
            },
            y: function (t, e, r) {
                if ("yo" === e) {
                    var n = t.getUTCFullYear(),
                        a = n > 0 ? n : 1 - n;
                    return r.ordinalNumber(a, {
                        unit: "year"
                    })
                }
                return O(t, e)
            },
            Y: function (t, e, r, n) {
                var a = $(t, n),
                    i = a > 0 ? a : 1 - a;
                return "YY" === e ? H(i % 100, 2) : "Yo" === e ? r.ordinalNumber(i, {
                    unit: "year"
                }) : H(i, e.length)
            },
            R: function (t, e) {
                return H(z(t), e.length)
            },
            u: function (t, e) {
                return H(t.getUTCFullYear(), e.length)
            },
            Q: function (t, e, r) {
                var n = Math.ceil((t.getUTCMonth() + 1) / 3);
                switch (e) {
                    case "Q":
                        return String(n);
                    case "QQ":
                        return H(n, 2);
                    case "Qo":
                        return r.ordinalNumber(n, {
                            unit: "quarter"
                        });
                    case "QQQ":
                        return r.quarter(n, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "QQQQQ":
                        return r.quarter(n, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "QQQQ":
                    default:
                        return r.quarter(n, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            q: function (t, e, r) {
                var n = Math.ceil((t.getUTCMonth() + 1) / 3);
                switch (e) {
                    case "q":
                        return String(n);
                    case "qq":
                        return H(n, 2);
                    case "qo":
                        return r.ordinalNumber(n, {
                            unit: "quarter"
                        });
                    case "qqq":
                        return r.quarter(n, {
                            width: "abbreviated",
                            context: "standalone"
                        });
                    case "qqqqq":
                        return r.quarter(n, {
                            width: "narrow",
                            context: "standalone"
                        });
                    case "qqqq":
                    default:
                        return r.quarter(n, {
                            width: "wide",
                            context: "standalone"
                        })
                }
            },
            M: function (t, e, r) {
                var n = t.getUTCMonth();
                switch (e) {
                    case "M":
                    case "MM":
                        return F(t, e);
                    case "Mo":
                        return r.ordinalNumber(n + 1, {
                            unit: "month"
                        });
                    case "MMM":
                        return r.month(n, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "MMMMM":
                        return r.month(n, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "MMMM":
                    default:
                        return r.month(n, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            L: function (t, e, r) {
                var n = t.getUTCMonth();
                switch (e) {
                    case "L":
                        return String(n + 1);
                    case "LL":
                        return H(n + 1, 2);
                    case "Lo":
                        return r.ordinalNumber(n + 1, {
                            unit: "month"
                        });
                    case "LLL":
                        return r.month(n, {
                            width: "abbreviated",
                            context: "standalone"
                        });
                    case "LLLLL":
                        return r.month(n, {
                            width: "narrow",
                            context: "standalone"
                        });
                    case "LLLL":
                    default:
                        return r.month(n, {
                            width: "wide",
                            context: "standalone"
                        })
                }
            },
            w: function (t, e, r, n) {
                var a = V(t, n);
                return "wo" === e ? r.ordinalNumber(a, {
                    unit: "week"
                }) : H(a, e.length)
            },
            I: function (t, e, r) {
                var n = Z(t);
                return "Io" === e ? r.ordinalNumber(n, {
                    unit: "week"
                }) : H(n, e.length)
            },
            d: function (t, e, r) {
                return "do" === e ? r.ordinalNumber(t.getUTCDate(), {
                    unit: "date"
                }) : W(t, e)
            },
            D: function (t, e, a) {
                var i = function (t) {
                    r(1, arguments);
                    var e = n(t),
                        a = e.getTime();
                    e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
                    var i = e.getTime(),
                        o = a - i;
                    return Math.floor(o / B) + 1
                }(t);
                return "Do" === e ? a.ordinalNumber(i, {
                    unit: "dayOfYear"
                }) : H(i, e.length)
            },
            E: function (t, e, r) {
                var n = t.getUTCDay();
                switch (e) {
                    case "E":
                    case "EE":
                    case "EEE":
                        return r.day(n, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "EEEEE":
                        return r.day(n, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "EEEEEE":
                        return r.day(n, {
                            width: "short",
                            context: "formatting"
                        });
                    case "EEEE":
                    default:
                        return r.day(n, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            e: function (t, e, r, n) {
                var a = t.getUTCDay(),
                    i = (a - n.weekStartsOn + 8) % 7 || 7;
                switch (e) {
                    case "e":
                        return String(i);
                    case "ee":
                        return H(i, 2);
                    case "eo":
                        return r.ordinalNumber(i, {
                            unit: "day"
                        });
                    case "eee":
                        return r.day(a, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "eeeee":
                        return r.day(a, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "eeeeee":
                        return r.day(a, {
                            width: "short",
                            context: "formatting"
                        });
                    case "eeee":
                    default:
                        return r.day(a, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            c: function (t, e, r, n) {
                var a = t.getUTCDay(),
                    i = (a - n.weekStartsOn + 8) % 7 || 7;
                switch (e) {
                    case "c":
                        return String(i);
                    case "cc":
                        return H(i, e.length);
                    case "co":
                        return r.ordinalNumber(i, {
                            unit: "day"
                        });
                    case "ccc":
                        return r.day(a, {
                            width: "abbreviated",
                            context: "standalone"
                        });
                    case "ccccc":
                        return r.day(a, {
                            width: "narrow",
                            context: "standalone"
                        });
                    case "cccccc":
                        return r.day(a, {
                            width: "short",
                            context: "standalone"
                        });
                    case "cccc":
                    default:
                        return r.day(a, {
                            width: "wide",
                            context: "standalone"
                        })
                }
            },
            i: function (t, e, r) {
                var n = t.getUTCDay(),
                    a = 0 === n ? 7 : n;
                switch (e) {
                    case "i":
                        return String(a);
                    case "ii":
                        return H(a, e.length);
                    case "io":
                        return r.ordinalNumber(a, {
                            unit: "day"
                        });
                    case "iii":
                        return r.day(n, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "iiiii":
                        return r.day(n, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "iiiiii":
                        return r.day(n, {
                            width: "short",
                            context: "formatting"
                        });
                    case "iiii":
                    default:
                        return r.day(n, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            a: function (t, e, r) {
                var n = t.getUTCHours() / 12 >= 1 ? "pm" : "am";
                switch (e) {
                    case "a":
                    case "aa":
                        return r.dayPeriod(n, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "aaa":
                        return r.dayPeriod(n, {
                            width: "abbreviated",
                            context: "formatting"
                        }).toLowerCase();
                    case "aaaaa":
                        return r.dayPeriod(n, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "aaaa":
                    default:
                        return r.dayPeriod(n, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            b: function (t, e, r) {
                var n, a = t.getUTCHours();
                switch (n = 12 === a ? et : 0 === a ? tt : a / 12 >= 1 ? "pm" : "am", e) {
                    case "b":
                    case "bb":
                        return r.dayPeriod(n, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "bbb":
                        return r.dayPeriod(n, {
                            width: "abbreviated",
                            context: "formatting"
                        }).toLowerCase();
                    case "bbbbb":
                        return r.dayPeriod(n, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "bbbb":
                    default:
                        return r.dayPeriod(n, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            B: function (t, e, r) {
                var n, a = t.getUTCHours();
                switch (n = a >= 17 ? at : a >= 12 ? nt : a >= 4 ? rt : it, e) {
                    case "B":
                    case "BB":
                    case "BBB":
                        return r.dayPeriod(n, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "BBBBB":
                        return r.dayPeriod(n, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "BBBB":
                    default:
                        return r.dayPeriod(n, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            h: function (t, e, r) {
                if ("ho" === e) {
                    var n = t.getUTCHours() % 12;
                    return 0 === n && (n = 12), r.ordinalNumber(n, {
                        unit: "hour"
                    })
                }
                return L(t, e)
            },
            H: function (t, e, r) {
                return "Ho" === e ? r.ordinalNumber(t.getUTCHours(), {
                    unit: "hour"
                }) : Q(t, e)
            },
            K: function (t, e, r) {
                var n = t.getUTCHours() % 12;
                return "Ko" === e ? r.ordinalNumber(n, {
                    unit: "hour"
                }) : H(n, e.length)
            },
            k: function (t, e, r) {
                var n = t.getUTCHours();
                return 0 === n && (n = 24), "ko" === e ? r.ordinalNumber(n, {
                    unit: "hour"
                }) : H(n, e.length)
            },
            m: function (t, e, r) {
                return "mo" === e ? r.ordinalNumber(t.getUTCMinutes(), {
                    unit: "minute"
                }) : R(t, e)
            },
            s: function (t, e, r) {
                return "so" === e ? r.ordinalNumber(t.getUTCSeconds(), {
                    unit: "second"
                }) : X(t, e)
            },
            S: function (t, e) {
                return G(t, e)
            },
            X: function (t, e, r, n) {
                var a = (n._originalDate || t).getTimezoneOffset();
                if (0 === a) return "Z";
                switch (e) {
                    case "X":
                        return st(a);
                    case "XXXX":
                    case "XX":
                        return ct(a);
                    case "XXXXX":
                    case "XXX":
                    default:
                        return ct(a, ":")
                }
            },
            x: function (t, e, r, n) {
                var a = (n._originalDate || t).getTimezoneOffset();
                switch (e) {
                    case "x":
                        return st(a);
                    case "xxxx":
                    case "xx":
                        return ct(a);
                    case "xxxxx":
                    case "xxx":
                    default:
                        return ct(a, ":")
                }
            },
            O: function (t, e, r, n) {
                var a = (n._originalDate || t).getTimezoneOffset();
                switch (e) {
                    case "O":
                    case "OO":
                    case "OOO":
                        return "GMT" + ut(a, ":");
                    case "OOOO":
                    default:
                        return "GMT" + ct(a, ":")
                }
            },
            z: function (t, e, r, n) {
                var a = (n._originalDate || t).getTimezoneOffset();
                switch (e) {
                    case "z":
                    case "zz":
                    case "zzz":
                        return "GMT" + ut(a, ":");
                    case "zzzz":
                    default:
                        return "GMT" + ct(a, ":")
                }
            },
            t: function (t, e, r, n) {
                var a = n._originalDate || t;
                return H(Math.floor(a.getTime() / 1e3), e.length)
            },
            T: function (t, e, r, n) {
                return H((n._originalDate || t).getTime(), e.length)
            }
        };

    function ut(t, e) {
        var r = t > 0 ? "-" : "+",
            n = Math.abs(t),
            a = Math.floor(n / 60),
            i = n % 60;
        if (0 === i) return r + String(a);
        var o = e || "";
        return r + String(a) + o + H(i, 2)
    }

    function st(t, e) {
        return t % 60 == 0 ? (t > 0 ? "-" : "+") + H(Math.abs(t) / 60, 2) : ct(t, e)
    }

    function ct(t, e) {
        var r = e || "",
            n = t > 0 ? "-" : "+",
            a = Math.abs(t);
        return n + H(Math.floor(a / 60), 2) + r + H(a % 60, 2)
    }

    function dt(t, e) {
        switch (t) {
            case "P":
                return e.date({
                    width: "short"
                });
            case "PP":
                return e.date({
                    width: "medium"
                });
            case "PPP":
                return e.date({
                    width: "long"
                });
            case "PPPP":
            default:
                return e.date({
                    width: "full"
                })
        }
    }

    function lt(t, e) {
        switch (t) {
            case "p":
                return e.time({
                    width: "short"
                });
            case "pp":
                return e.time({
                    width: "medium"
                });
            case "ppp":
                return e.time({
                    width: "long"
                });
            case "pppp":
            default:
                return e.time({
                    width: "full"
                })
        }
    }
    var ft = {
            p: lt,
            P: function (t, e) {
                var r, n = t.match(/(P+)(p+)?/),
                    a = n[1],
                    i = n[2];
                if (!i) return dt(t, e);
                switch (a) {
                    case "P":
                        r = e.dateTime({
                            width: "short"
                        });
                        break;
                    case "PP":
                        r = e.dateTime({
                            width: "medium"
                        });
                        break;
                    case "PPP":
                        r = e.dateTime({
                            width: "long"
                        });
                        break;
                    case "PPPP":
                    default:
                        r = e.dateTime({
                            width: "full"
                        })
                }
                return r.replace("{{date}}", dt(a, e)).replace("{{time}}", lt(i, e))
            }
        },
        ht = ["D", "DD"],
        mt = ["YY", "YYYY"];

    function wt(t) {
        return -1 !== ht.indexOf(t)
    }

    function gt(t) {
        return -1 !== mt.indexOf(t)
    }

    function vt(t, e, r) {
        if ("YYYY" === t) throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e, "`) for formatting years to the input `").concat(r, "`; see: https://git.io/fxCyr"));
        if ("YY" === t) throw new RangeError("Use `yy` instead of `YY` (in `".concat(e, "`) for formatting years to the input `").concat(r, "`; see: https://git.io/fxCyr"));
        if ("D" === t) throw new RangeError("Use `d` instead of `D` (in `".concat(e, "`) for formatting days of the month to the input `").concat(r, "`; see: https://git.io/fxCyr"));
        if ("DD" === t) throw new RangeError("Use `dd` instead of `DD` (in `".concat(e, "`) for formatting days of the month to the input `").concat(r, "`; see: https://git.io/fxCyr"))
    }
    var bt = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
        yt = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
        Tt = /^'([^]*?)'?$/,
        pt = /''/g,
        Ct = /[a-zA-Z]/;

    function Mt(t) {
        return t.match(Tt)[1].replace(pt, "'")
    }

    function xt(t, e) {
        if (null == t) throw new TypeError("assign requires that input parameter not be null or undefined");
        for (var r in e = e || {}) e.hasOwnProperty(r) && (t[r] = e[r]);
        return t
    }

    function Dt(t, a, i) {
        r(2, arguments);
        var o = i || {},
            u = o.locale,
            s = u && u.options && u.options.weekStartsOn,
            c = null == s ? 0 : e(s),
            d = null == o.weekStartsOn ? c : e(o.weekStartsOn);
        if (!(d >= 0 && d <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
        var l = n(t),
            f = e(a),
            h = l.getUTCDay(),
            m = f % 7,
            w = (m + 7) % 7,
            g = (w < d ? 7 : 0) + f - h;
        return l.setUTCDate(l.getUTCDate() + g), l
    }
    var kt = /^(1[0-2]|0?\d)/,
        Ut = /^(3[0-1]|[0-2]?\d)/,
        Yt = /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
        Nt = /^(5[0-3]|[0-4]?\d)/,
        Pt = /^(2[0-3]|[0-1]?\d)/,
        St = /^(2[0-4]|[0-1]?\d)/,
        qt = /^(1[0-1]|0?\d)/,
        Et = /^(1[0-2]|0?\d)/,
        Ht = /^[0-5]?\d/,
        Ot = /^[0-5]?\d/,
        Ft = /^\d/,
        Wt = /^\d{1,2}/,
        Lt = /^\d{1,3}/,
        Qt = /^\d{1,4}/,
        Rt = /^-?\d+/,
        Xt = /^-?\d/,
        Gt = /^-?\d{1,2}/,
        Bt = /^-?\d{1,3}/,
        It = /^-?\d{1,4}/,
        zt = /^([+-])(\d{2})(\d{2})?|Z/,
        jt = /^([+-])(\d{2})(\d{2})|Z/,
        At = /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
        Zt = /^([+-])(\d{2}):(\d{2})|Z/,
        Kt = /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/;

    function $t(t, e, r) {
        var n = e.match(t);
        if (!n) return null;
        var a = parseInt(n[0], 10);
        return {
            value: r ? r(a) : a,
            rest: e.slice(n[0].length)
        }
    }

    function _t(t, e) {
        var r = e.match(t);
        return r ? "Z" === r[0] ? {
            value: 0,
            rest: e.slice(1)
        } : {
            value: ("+" === r[1] ? 1 : -1) * (36e5 * (r[2] ? parseInt(r[2], 10) : 0) + 6e4 * (r[3] ? parseInt(r[3], 10) : 0) + 1e3 * (r[5] ? parseInt(r[5], 10) : 0)),
            rest: e.slice(r[0].length)
        } : null
    }

    function Jt(t, e) {
        return $t(Rt, t, e)
    }

    function Vt(t, e, r) {
        switch (t) {
            case 1:
                return $t(Ft, e, r);
            case 2:
                return $t(Wt, e, r);
            case 3:
                return $t(Lt, e, r);
            case 4:
                return $t(Qt, e, r);
            default:
                return $t(new RegExp("^\\d{1," + t + "}"), e, r)
        }
    }

    function te(t, e, r) {
        switch (t) {
            case 1:
                return $t(Xt, e, r);
            case 2:
                return $t(Gt, e, r);
            case 3:
                return $t(Bt, e, r);
            case 4:
                return $t(It, e, r);
            default:
                return $t(new RegExp("^-?\\d{1," + t + "}"), e, r)
        }
    }

    function ee(t) {
        switch (t) {
            case "morning":
                return 4;
            case "evening":
                return 17;
            case "pm":
            case "noon":
            case "afternoon":
                return 12;
            case "am":
            case "midnight":
            case "night":
            default:
                return 0
        }
    }

    function re(t, e) {
        var r, n = e > 0,
            a = n ? e : 1 - e;
        if (a <= 50) r = t || 100;
        else {
            var i = a + 50;
            r = t + 100 * Math.floor(i / 100) - (t >= i % 100 ? 100 : 0)
        }
        return n ? r : 1 - r
    }
    var ne = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        ae = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function ie(t) {
        return t % 400 == 0 || t % 4 == 0 && t % 100 != 0
    }
    var oe = {
            G: {
                priority: 140,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "G":
                        case "GG":
                        case "GGG":
                            return r.era(t, {
                                width: "abbreviated"
                            }) || r.era(t, {
                                width: "narrow"
                            });
                        case "GGGGG":
                            return r.era(t, {
                                width: "narrow"
                            });
                        case "GGGG":
                        default:
                            return r.era(t, {
                                width: "wide"
                            }) || r.era(t, {
                                width: "abbreviated"
                            }) || r.era(t, {
                                width: "narrow"
                            })
                    }
                },
                set: function (t, e, r, n) {
                    return e.era = r, t.setUTCFullYear(r, 0, 1), t.setUTCHours(0, 0, 0, 0), t
                },
                incompatibleTokens: ["R", "u", "t", "T"]
            },
            y: {
                priority: 130,
                parse: function (t, e, r, n) {
                    var a = function (t) {
                        return {
                            year: t,
                            isTwoDigitYear: "yy" === e
                        }
                    };
                    switch (e) {
                        case "y":
                            return Vt(4, t, a);
                        case "yo":
                            return r.ordinalNumber(t, {
                                unit: "year",
                                valueCallback: a
                            });
                        default:
                            return Vt(e.length, t, a)
                    }
                },
                validate: function (t, e, r) {
                    return e.isTwoDigitYear || e.year > 0
                },
                set: function (t, e, r, n) {
                    var a = t.getUTCFullYear();
                    if (r.isTwoDigitYear) {
                        var i = re(r.year, a);
                        return t.setUTCFullYear(i, 0, 1), t.setUTCHours(0, 0, 0, 0), t
                    }
                    var o = "era" in e && 1 !== e.era ? 1 - r.year : r.year;
                    return t.setUTCFullYear(o, 0, 1), t.setUTCHours(0, 0, 0, 0), t
                },
                incompatibleTokens: ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]
            },
            Y: {
                priority: 130,
                parse: function (t, e, r, n) {
                    var a = function (t) {
                        return {
                            year: t,
                            isTwoDigitYear: "YY" === e
                        }
                    };
                    switch (e) {
                        case "Y":
                            return Vt(4, t, a);
                        case "Yo":
                            return r.ordinalNumber(t, {
                                unit: "year",
                                valueCallback: a
                            });
                        default:
                            return Vt(e.length, t, a)
                    }
                },
                validate: function (t, e, r) {
                    return e.isTwoDigitYear || e.year > 0
                },
                set: function (t, e, r, n) {
                    var a = $(t, n);
                    if (r.isTwoDigitYear) {
                        var i = re(r.year, a);
                        return t.setUTCFullYear(i, 0, n.firstWeekContainsDate), t.setUTCHours(0, 0, 0, 0), K(t, n)
                    }
                    var o = "era" in e && 1 !== e.era ? 1 - r.year : r.year;
                    return t.setUTCFullYear(o, 0, n.firstWeekContainsDate), t.setUTCHours(0, 0, 0, 0), K(t, n)
                },
                incompatibleTokens: ["y", "R", "u", "Q", "q", "M", "L", "I", "d", "D", "i", "t", "T"]
            },
            R: {
                priority: 130,
                parse: function (t, e, r, n) {
                    return te("R" === e ? 4 : e.length, t)
                },
                set: function (t, e, r, n) {
                    var a = new Date(0);
                    return a.setUTCFullYear(r, 0, 4), a.setUTCHours(0, 0, 0, 0), I(a)
                },
                incompatibleTokens: ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]
            },
            u: {
                priority: 130,
                parse: function (t, e, r, n) {
                    return te("u" === e ? 4 : e.length, t)
                },
                set: function (t, e, r, n) {
                    return t.setUTCFullYear(r, 0, 1), t.setUTCHours(0, 0, 0, 0), t
                },
                incompatibleTokens: ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]
            },
            Q: {
                priority: 120,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "Q":
                        case "QQ":
                            return Vt(e.length, t);
                        case "Qo":
                            return r.ordinalNumber(t, {
                                unit: "quarter"
                            });
                        case "QQQ":
                            return r.quarter(t, {
                                width: "abbreviated",
                                context: "formatting"
                            }) || r.quarter(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "QQQQQ":
                            return r.quarter(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "QQQQ":
                        default:
                            return r.quarter(t, {
                                width: "wide",
                                context: "formatting"
                            }) || r.quarter(t, {
                                width: "abbreviated",
                                context: "formatting"
                            }) || r.quarter(t, {
                                width: "narrow",
                                context: "formatting"
                            })
                    }
                },
                validate: function (t, e, r) {
                    return e >= 1 && e <= 4
                },
                set: function (t, e, r, n) {
                    return t.setUTCMonth(3 * (r - 1), 1), t.setUTCHours(0, 0, 0, 0), t
                },
                incompatibleTokens: ["Y", "R", "q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]
            },
            q: {
                priority: 120,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "q":
                        case "qq":
                            return Vt(e.length, t);
                        case "qo":
                            return r.ordinalNumber(t, {
                                unit: "quarter"
                            });
                        case "qqq":
                            return r.quarter(t, {
                                width: "abbreviated",
                                context: "standalone"
                            }) || r.quarter(t, {
                                width: "narrow",
                                context: "standalone"
                            });
                        case "qqqqq":
                            return r.quarter(t, {
                                width: "narrow",
                                context: "standalone"
                            });
                        case "qqqq":
                        default:
                            return r.quarter(t, {
                                width: "wide",
                                context: "standalone"
                            }) || r.quarter(t, {
                                width: "abbreviated",
                                context: "standalone"
                            }) || r.quarter(t, {
                                width: "narrow",
                                context: "standalone"
                            })
                    }
                },
                validate: function (t, e, r) {
                    return e >= 1 && e <= 4
                },
                set: function (t, e, r, n) {
                    return t.setUTCMonth(3 * (r - 1), 1), t.setUTCHours(0, 0, 0, 0), t
                },
                incompatibleTokens: ["Y", "R", "Q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]
            },
            M: {
                priority: 110,
                parse: function (t, e, r, n) {
                    var a = function (t) {
                        return t - 1
                    };
                    switch (e) {
                        case "M":
                            return $t(kt, t, a);
                        case "MM":
                            return Vt(2, t, a);
                        case "Mo":
                            return r.ordinalNumber(t, {
                                unit: "month",
                                valueCallback: a
                            });
                        case "MMM":
                            return r.month(t, {
                                width: "abbreviated",
                                context: "formatting"
                            }) || r.month(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "MMMMM":
                            return r.month(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "MMMM":
                        default:
                            return r.month(t, {
                                width: "wide",
                                context: "formatting"
                            }) || r.month(t, {
                                width: "abbreviated",
                                context: "formatting"
                            }) || r.month(t, {
                                width: "narrow",
                                context: "formatting"
                            })
                    }
                },
                validate: function (t, e, r) {
                    return e >= 0 && e <= 11
                },
                set: function (t, e, r, n) {
                    return t.setUTCMonth(r, 1), t.setUTCHours(0, 0, 0, 0), t
                },
                incompatibleTokens: ["Y", "R", "q", "Q", "L", "w", "I", "D", "i", "e", "c", "t", "T"]
            },
            L: {
                priority: 110,
                parse: function (t, e, r, n) {
                    var a = function (t) {
                        return t - 1
                    };
                    switch (e) {
                        case "L":
                            return $t(kt, t, a);
                        case "LL":
                            return Vt(2, t, a);
                        case "Lo":
                            return r.ordinalNumber(t, {
                                unit: "month",
                                valueCallback: a
                            });
                        case "LLL":
                            return r.month(t, {
                                width: "abbreviated",
                                context: "standalone"
                            }) || r.month(t, {
                                width: "narrow",
                                context: "standalone"
                            });
                        case "LLLLL":
                            return r.month(t, {
                                width: "narrow",
                                context: "standalone"
                            });
                        case "LLLL":
                        default:
                            return r.month(t, {
                                width: "wide",
                                context: "standalone"
                            }) || r.month(t, {
                                width: "abbreviated",
                                context: "standalone"
                            }) || r.month(t, {
                                width: "narrow",
                                context: "standalone"
                            })
                    }
                },
                validate: function (t, e, r) {
                    return e >= 0 && e <= 11
                },
                set: function (t, e, r, n) {
                    return t.setUTCMonth(r, 1), t.setUTCHours(0, 0, 0, 0), t
                },
                incompatibleTokens: ["Y", "R", "q", "Q", "M", "w", "I", "D", "i", "e", "c", "t", "T"]
            },
            w: {
                priority: 100,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "w":
                            return $t(Nt, t);
                        case "wo":
                            return r.ordinalNumber(t, {
                                unit: "week"
                            });
                        default:
                            return Vt(e.length, t)
                    }
                },
                validate: function (t, e, r) {
                    return e >= 1 && e <= 53
                },
                set: function (t, a, i, o) {
                    return K(function (t, a, i) {
                        r(2, arguments);
                        var o = n(t),
                            u = e(a),
                            s = V(o, i) - u;
                        return o.setUTCDate(o.getUTCDate() - 7 * s), o
                    }(t, i, o), o)
                },
                incompatibleTokens: ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "i", "t", "T"]
            },
            I: {
                priority: 100,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "I":
                            return $t(Nt, t);
                        case "Io":
                            return r.ordinalNumber(t, {
                                unit: "week"
                            });
                        default:
                            return Vt(e.length, t)
                    }
                },
                validate: function (t, e, r) {
                    return e >= 1 && e <= 53
                },
                set: function (t, a, i, o) {
                    return I(function (t, a) {
                        r(2, arguments);
                        var i = n(t),
                            o = e(a),
                            u = Z(i) - o;
                        return i.setUTCDate(i.getUTCDate() - 7 * u), i
                    }(t, i, o), o)
                },
                incompatibleTokens: ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]
            },
            d: {
                priority: 90,
                subPriority: 1,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "d":
                            return $t(Ut, t);
                        case "do":
                            return r.ordinalNumber(t, {
                                unit: "date"
                            });
                        default:
                            return Vt(e.length, t)
                    }
                },
                validate: function (t, e, r) {
                    var n = ie(t.getUTCFullYear()),
                        a = t.getUTCMonth();
                    return n ? e >= 1 && e <= ae[a] : e >= 1 && e <= ne[a]
                },
                set: function (t, e, r, n) {
                    return t.setUTCDate(r), t.setUTCHours(0, 0, 0, 0), t
                },
                incompatibleTokens: ["Y", "R", "q", "Q", "w", "I", "D", "i", "e", "c", "t", "T"]
            },
            D: {
                priority: 90,
                subPriority: 1,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "D":
                        case "DD":
                            return $t(Yt, t);
                        case "Do":
                            return r.ordinalNumber(t, {
                                unit: "date"
                            });
                        default:
                            return Vt(e.length, t)
                    }
                },
                validate: function (t, e, r) {
                    return ie(t.getUTCFullYear()) ? e >= 1 && e <= 366 : e >= 1 && e <= 365
                },
                set: function (t, e, r, n) {
                    return t.setUTCMonth(0, r), t.setUTCHours(0, 0, 0, 0), t
                },
                incompatibleTokens: ["Y", "R", "q", "Q", "M", "L", "w", "I", "d", "E", "i", "e", "c", "t", "T"]
            },
            E: {
                priority: 90,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "E":
                        case "EE":
                        case "EEE":
                            return r.day(t, {
                                width: "abbreviated",
                                context: "formatting"
                            }) || r.day(t, {
                                width: "short",
                                context: "formatting"
                            }) || r.day(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "EEEEE":
                            return r.day(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "EEEEEE":
                            return r.day(t, {
                                width: "short",
                                context: "formatting"
                            }) || r.day(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "EEEE":
                        default:
                            return r.day(t, {
                                width: "wide",
                                context: "formatting"
                            }) || r.day(t, {
                                width: "abbreviated",
                                context: "formatting"
                            }) || r.day(t, {
                                width: "short",
                                context: "formatting"
                            }) || r.day(t, {
                                width: "narrow",
                                context: "formatting"
                            })
                    }
                },
                validate: function (t, e, r) {
                    return e >= 0 && e <= 6
                },
                set: function (t, e, r, n) {
                    return (t = Dt(t, r, n)).setUTCHours(0, 0, 0, 0), t
                },
                incompatibleTokens: ["D", "i", "e", "c", "t", "T"]
            },
            e: {
                priority: 90,
                parse: function (t, e, r, n) {
                    var a = function (t) {
                        var e = 7 * Math.floor((t - 1) / 7);
                        return (t + n.weekStartsOn + 6) % 7 + e
                    };
                    switch (e) {
                        case "e":
                        case "ee":
                            return Vt(e.length, t, a);
                        case "eo":
                            return r.ordinalNumber(t, {
                                unit: "day",
                                valueCallback: a
                            });
                        case "eee":
                            return r.day(t, {
                                width: "abbreviated",
                                context: "formatting"
                            }) || r.day(t, {
                                width: "short",
                                context: "formatting"
                            }) || r.day(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "eeeee":
                            return r.day(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "eeeeee":
                            return r.day(t, {
                                width: "short",
                                context: "formatting"
                            }) || r.day(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "eeee":
                        default:
                            return r.day(t, {
                                width: "wide",
                                context: "formatting"
                            }) || r.day(t, {
                                width: "abbreviated",
                                context: "formatting"
                            }) || r.day(t, {
                                width: "short",
                                context: "formatting"
                            }) || r.day(t, {
                                width: "narrow",
                                context: "formatting"
                            })
                    }
                },
                validate: function (t, e, r) {
                    return e >= 0 && e <= 6
                },
                set: function (t, e, r, n) {
                    return (t = Dt(t, r, n)).setUTCHours(0, 0, 0, 0), t
                },
                incompatibleTokens: ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "c", "t", "T"]
            },
            c: {
                priority: 90,
                parse: function (t, e, r, n) {
                    var a = function (t) {
                        var e = 7 * Math.floor((t - 1) / 7);
                        return (t + n.weekStartsOn + 6) % 7 + e
                    };
                    switch (e) {
                        case "c":
                        case "cc":
                            return Vt(e.length, t, a);
                        case "co":
                            return r.ordinalNumber(t, {
                                unit: "day",
                                valueCallback: a
                            });
                        case "ccc":
                            return r.day(t, {
                                width: "abbreviated",
                                context: "standalone"
                            }) || r.day(t, {
                                width: "short",
                                context: "standalone"
                            }) || r.day(t, {
                                width: "narrow",
                                context: "standalone"
                            });
                        case "ccccc":
                            return r.day(t, {
                                width: "narrow",
                                context: "standalone"
                            });
                        case "cccccc":
                            return r.day(t, {
                                width: "short",
                                context: "standalone"
                            }) || r.day(t, {
                                width: "narrow",
                                context: "standalone"
                            });
                        case "cccc":
                        default:
                            return r.day(t, {
                                width: "wide",
                                context: "standalone"
                            }) || r.day(t, {
                                width: "abbreviated",
                                context: "standalone"
                            }) || r.day(t, {
                                width: "short",
                                context: "standalone"
                            }) || r.day(t, {
                                width: "narrow",
                                context: "standalone"
                            })
                    }
                },
                validate: function (t, e, r) {
                    return e >= 0 && e <= 6
                },
                set: function (t, e, r, n) {
                    return (t = Dt(t, r, n)).setUTCHours(0, 0, 0, 0), t
                },
                incompatibleTokens: ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "e", "t", "T"]
            },
            i: {
                priority: 90,
                parse: function (t, e, r, n) {
                    var a = function (t) {
                        return 0 === t ? 7 : t
                    };
                    switch (e) {
                        case "i":
                        case "ii":
                            return Vt(e.length, t);
                        case "io":
                            return r.ordinalNumber(t, {
                                unit: "day"
                            });
                        case "iii":
                            return r.day(t, {
                                width: "abbreviated",
                                context: "formatting",
                                valueCallback: a
                            }) || r.day(t, {
                                width: "short",
                                context: "formatting",
                                valueCallback: a
                            }) || r.day(t, {
                                width: "narrow",
                                context: "formatting",
                                valueCallback: a
                            });
                        case "iiiii":
                            return r.day(t, {
                                width: "narrow",
                                context: "formatting",
                                valueCallback: a
                            });
                        case "iiiiii":
                            return r.day(t, {
                                width: "short",
                                context: "formatting",
                                valueCallback: a
                            }) || r.day(t, {
                                width: "narrow",
                                context: "formatting",
                                valueCallback: a
                            });
                        case "iiii":
                        default:
                            return r.day(t, {
                                width: "wide",
                                context: "formatting",
                                valueCallback: a
                            }) || r.day(t, {
                                width: "abbreviated",
                                context: "formatting",
                                valueCallback: a
                            }) || r.day(t, {
                                width: "short",
                                context: "formatting",
                                valueCallback: a
                            }) || r.day(t, {
                                width: "narrow",
                                context: "formatting",
                                valueCallback: a
                            })
                    }
                },
                validate: function (t, e, r) {
                    return e >= 1 && e <= 7
                },
                set: function (t, a, i, o) {
                    return (t = function (t, a) {
                        r(2, arguments);
                        var i = e(a);
                        i % 7 == 0 && (i -= 7);
                        var o = 1,
                            u = n(t),
                            s = u.getUTCDay(),
                            c = ((i % 7 + 7) % 7 < o ? 7 : 0) + i - s;
                        return u.setUTCDate(u.getUTCDate() + c), u
                    }(t, i, o)).setUTCHours(0, 0, 0, 0), t
                },
                incompatibleTokens: ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "E", "e", "c", "t", "T"]
            },
            a: {
                priority: 80,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "a":
                        case "aa":
                        case "aaa":
                            return r.dayPeriod(t, {
                                width: "abbreviated",
                                context: "formatting"
                            }) || r.dayPeriod(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "aaaaa":
                            return r.dayPeriod(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "aaaa":
                        default:
                            return r.dayPeriod(t, {
                                width: "wide",
                                context: "formatting"
                            }) || r.dayPeriod(t, {
                                width: "abbreviated",
                                context: "formatting"
                            }) || r.dayPeriod(t, {
                                width: "narrow",
                                context: "formatting"
                            })
                    }
                },
                set: function (t, e, r, n) {
                    return t.setUTCHours(ee(r), 0, 0, 0), t
                },
                incompatibleTokens: ["b", "B", "H", "K", "k", "t", "T"]
            },
            b: {
                priority: 80,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "b":
                        case "bb":
                        case "bbb":
                            return r.dayPeriod(t, {
                                width: "abbreviated",
                                context: "formatting"
                            }) || r.dayPeriod(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "bbbbb":
                            return r.dayPeriod(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "bbbb":
                        default:
                            return r.dayPeriod(t, {
                                width: "wide",
                                context: "formatting"
                            }) || r.dayPeriod(t, {
                                width: "abbreviated",
                                context: "formatting"
                            }) || r.dayPeriod(t, {
                                width: "narrow",
                                context: "formatting"
                            })
                    }
                },
                set: function (t, e, r, n) {
                    return t.setUTCHours(ee(r), 0, 0, 0), t
                },
                incompatibleTokens: ["a", "B", "H", "K", "k", "t", "T"]
            },
            B: {
                priority: 80,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "B":
                        case "BB":
                        case "BBB":
                            return r.dayPeriod(t, {
                                width: "abbreviated",
                                context: "formatting"
                            }) || r.dayPeriod(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "BBBBB":
                            return r.dayPeriod(t, {
                                width: "narrow",
                                context: "formatting"
                            });
                        case "BBBB":
                        default:
                            return r.dayPeriod(t, {
                                width: "wide",
                                context: "formatting"
                            }) || r.dayPeriod(t, {
                                width: "abbreviated",
                                context: "formatting"
                            }) || r.dayPeriod(t, {
                                width: "narrow",
                                context: "formatting"
                            })
                    }
                },
                set: function (t, e, r, n) {
                    return t.setUTCHours(ee(r), 0, 0, 0), t
                },
                incompatibleTokens: ["a", "b", "t", "T"]
            },
            h: {
                priority: 70,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "h":
                            return $t(Et, t);
                        case "ho":
                            return r.ordinalNumber(t, {
                                unit: "hour"
                            });
                        default:
                            return Vt(e.length, t)
                    }
                },
                validate: function (t, e, r) {
                    return e >= 1 && e <= 12
                },
                set: function (t, e, r, n) {
                    var a = t.getUTCHours() >= 12;
                    return a && r < 12 ? t.setUTCHours(r + 12, 0, 0, 0) : a || 12 !== r ? t.setUTCHours(r, 0, 0, 0) : t.setUTCHours(0, 0, 0, 0), t
                },
                incompatibleTokens: ["H", "K", "k", "t", "T"]
            },
            H: {
                priority: 70,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "H":
                            return $t(Pt, t);
                        case "Ho":
                            return r.ordinalNumber(t, {
                                unit: "hour"
                            });
                        default:
                            return Vt(e.length, t)
                    }
                },
                validate: function (t, e, r) {
                    return e >= 0 && e <= 23
                },
                set: function (t, e, r, n) {
                    return t.setUTCHours(r, 0, 0, 0), t
                },
                incompatibleTokens: ["a", "b", "h", "K", "k", "t", "T"]
            },
            K: {
                priority: 70,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "K":
                            return $t(qt, t);
                        case "Ko":
                            return r.ordinalNumber(t, {
                                unit: "hour"
                            });
                        default:
                            return Vt(e.length, t)
                    }
                },
                validate: function (t, e, r) {
                    return e >= 0 && e <= 11
                },
                set: function (t, e, r, n) {
                    return t.getUTCHours() >= 12 && r < 12 ? t.setUTCHours(r + 12, 0, 0, 0) : t.setUTCHours(r, 0, 0, 0), t
                },
                incompatibleTokens: ["a", "b", "h", "H", "k", "t", "T"]
            },
            k: {
                priority: 70,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "k":
                            return $t(St, t);
                        case "ko":
                            return r.ordinalNumber(t, {
                                unit: "hour"
                            });
                        default:
                            return Vt(e.length, t)
                    }
                },
                validate: function (t, e, r) {
                    return e >= 1 && e <= 24
                },
                set: function (t, e, r, n) {
                    var a = r <= 24 ? r % 24 : r;
                    return t.setUTCHours(a, 0, 0, 0), t
                },
                incompatibleTokens: ["a", "b", "h", "H", "K", "t", "T"]
            },
            m: {
                priority: 60,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "m":
                            return $t(Ht, t);
                        case "mo":
                            return r.ordinalNumber(t, {
                                unit: "minute"
                            });
                        default:
                            return Vt(e.length, t)
                    }
                },
                validate: function (t, e, r) {
                    return e >= 0 && e <= 59
                },
                set: function (t, e, r, n) {
                    return t.setUTCMinutes(r, 0, 0), t
                },
                incompatibleTokens: ["t", "T"]
            },
            s: {
                priority: 50,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "s":
                            return $t(Ot, t);
                        case "so":
                            return r.ordinalNumber(t, {
                                unit: "second"
                            });
                        default:
                            return Vt(e.length, t)
                    }
                },
                validate: function (t, e, r) {
                    return e >= 0 && e <= 59
                },
                set: function (t, e, r, n) {
                    return t.setUTCSeconds(r, 0), t
                },
                incompatibleTokens: ["t", "T"]
            },
            S: {
                priority: 30,
                parse: function (t, e, r, n) {
                    return Vt(e.length, t, (function (t) {
                        return Math.floor(t * Math.pow(10, 3 - e.length))
                    }))
                },
                set: function (t, e, r, n) {
                    return t.setUTCMilliseconds(r), t
                },
                incompatibleTokens: ["t", "T"]
            },
            X: {
                priority: 10,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "X":
                            return _t(zt, t);
                        case "XX":
                            return _t(jt, t);
                        case "XXXX":
                            return _t(At, t);
                        case "XXXXX":
                            return _t(Kt, t);
                        case "XXX":
                        default:
                            return _t(Zt, t)
                    }
                },
                set: function (t, e, r, n) {
                    return e.timestampIsSet ? t : new Date(t.getTime() - r)
                },
                incompatibleTokens: ["t", "T", "x"]
            },
            x: {
                priority: 10,
                parse: function (t, e, r, n) {
                    switch (e) {
                        case "x":
                            return _t(zt, t);
                        case "xx":
                            return _t(jt, t);
                        case "xxxx":
                            return _t(At, t);
                        case "xxxxx":
                            return _t(Kt, t);
                        case "xxx":
                        default:
                            return _t(Zt, t)
                    }
                },
                set: function (t, e, r, n) {
                    return e.timestampIsSet ? t : new Date(t.getTime() - r)
                },
                incompatibleTokens: ["t", "T", "X"]
            },
            t: {
                priority: 40,
                parse: function (t, e, r, n) {
                    return Jt(t)
                },
                set: function (t, e, r, n) {
                    return [new Date(1e3 * r), {
                        timestampIsSet: !0
                    }]
                },
                incompatibleTokens: "*"
            },
            T: {
                priority: 20,
                parse: function (t, e, r, n) {
                    return Jt(t)
                },
                set: function (t, e, r, n) {
                    return [new Date(r), {
                        timestampIsSet: !0
                    }]
                },
                incompatibleTokens: "*"
            }
        },
        ue = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
        se = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
        ce = /^'([^]*?)'?$/,
        de = /''/g,
        le = /\S/,
        fe = /[a-zA-Z]/;

    function he(t, e) {
        if (e.timestampIsSet) return t;
        var r = new Date(0);
        return r.setFullYear(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()), r.setHours(t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), t.getUTCMilliseconds()), r
    }

    function me(t) {
        return t.match(ce)[1].replace(de, "'")
    }
    var we = 36e5,
        ge = {
            dateTimeDelimiter: /[T ]/,
            timeZoneDelimiter: /[Z ]/i,
            timezone: /([Z+-].*)$/
        },
        ve = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,
        be = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,
        ye = /^([+-])(\d{2})(?::?(\d{2}))?$/;

    function Te(t) {
        var e, r = {},
            n = t.split(ge.dateTimeDelimiter);
        if (n.length > 2) return r;
        if (/:/.test(n[0]) ? (r.date = null, e = n[0]) : (r.date = n[0], e = n[1], ge.timeZoneDelimiter.test(r.date) && (r.date = t.split(ge.timeZoneDelimiter)[0], e = t.substr(r.date.length, t.length))), e) {
            var a = ge.timezone.exec(e);
            a ? (r.time = e.replace(a[1], ""), r.timezone = a[1]) : r.time = e
        }
        return r
    }

    function pe(t, e) {
        var r = new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + e) + "})|(\\d{2}|[+-]\\d{" + (2 + e) + "})$)"),
            n = t.match(r);
        if (!n) return {
            year: null
        };
        var a = n[1] && parseInt(n[1]),
            i = n[2] && parseInt(n[2]);
        return {
            year: null == i ? a : 100 * i,
            restDateString: t.slice((n[1] || n[2]).length)
        }
    }

    function Ce(t, e) {
        if (null === e) return null;
        var r = t.match(ve);
        if (!r) return null;
        var n = !!r[4],
            a = Me(r[1]),
            i = Me(r[2]) - 1,
            o = Me(r[3]),
            u = Me(r[4]),
            s = Me(r[5]) - 1;
        if (n) return function (t, e, r) {
            return e >= 1 && e <= 53 && r >= 0 && r <= 6
        }(0, u, s) ? function (t, e, r) {
            var n = new Date(0);
            n.setUTCFullYear(t, 0, 4);
            var a = n.getUTCDay() || 7,
                i = 7 * (e - 1) + r + 1 - a;
            return n.setUTCDate(n.getUTCDate() + i), n
        }(e, u, s) : new Date(NaN);
        var c = new Date(0);
        return function (t, e, r) {
            return e >= 0 && e <= 11 && r >= 1 && r <= (Ue[e] || (Ye(t) ? 29 : 28))
        }(e, i, o) && function (t, e) {
            return e >= 1 && e <= (Ye(t) ? 366 : 365)
        }(e, a) ? (c.setUTCFullYear(e, i, Math.max(a, o)), c) : new Date(NaN)
    }

    function Me(t) {
        return t ? parseInt(t) : 1
    }

    function xe(t) {
        var e = t.match(be);
        if (!e) return null;
        var r = De(e[1]),
            n = De(e[2]),
            a = De(e[3]);
        return function (t, e, r) {
            if (24 === t) return 0 === e && 0 === r;
            return r >= 0 && r < 60 && e >= 0 && e < 60 && t >= 0 && t < 25
        }(r, n, a) ? r * we + 6e4 * n + 1e3 * a : NaN
    }

    function De(t) {
        return t && parseFloat(t.replace(",", ".")) || 0
    }

    function ke(t) {
        if ("Z" === t) return 0;
        var e = t.match(ye);
        if (!e) return 0;
        var r = "+" === e[1] ? -1 : 1,
            n = parseInt(e[2]),
            a = e[3] && parseInt(e[3]) || 0;
        return function (t, e) {
            return e >= 0 && e <= 59
        }(0, a) ? r * (n * we + 6e4 * a) : NaN
    }
    var Ue = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function Ye(t) {
        return t % 400 == 0 || t % 4 == 0 && t % 100
    }
    const Ne = {
        datetime: "MMM d, yyyy, h:mm:ss aaaa",
        millisecond: "h:mm:ss.SSS aaaa",
        second: "h:mm:ss aaaa",
        minute: "h:mm aaaa",
        hour: "ha",
        day: "MMM d",
        week: "PP",
        month: "MMM yyyy",
        quarter: "qqq - yyyy",
        year: "yyyy"
    };
    t._adapters._date.override({
        _id: "date-fns",
        formats: function () {
            return Ne
        },
        parse: function (t, a) {
            if (null == t) return null;
            const i = typeof t;
            return "number" === i || t instanceof Date ? t = n(t) : "string" === i && (t = "string" == typeof a ? function (t, a, i, o) {
                r(3, arguments);
                var u = String(t),
                    s = String(a),
                    d = o || {},
                    l = d.locale || q;
                if (!l.match) throw new RangeError("locale must contain match property");
                var f = l.options && l.options.firstWeekContainsDate,
                    h = null == f ? 1 : e(f),
                    m = null == d.firstWeekContainsDate ? h : e(d.firstWeekContainsDate);
                if (!(m >= 1 && m <= 7)) throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
                var w = l.options && l.options.weekStartsOn,
                    g = null == w ? 0 : e(w),
                    v = null == d.weekStartsOn ? g : e(d.weekStartsOn);
                if (!(v >= 0 && v <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
                if ("" === s) return "" === u ? n(i) : new Date(NaN);
                var b, y = {
                        firstWeekContainsDate: m,
                        weekStartsOn: v,
                        locale: l
                    },
                    T = [{
                        priority: 10,
                        subPriority: -1,
                        set: he,
                        index: 0
                    }],
                    p = s.match(se).map((function (t) {
                        var e = t[0];
                        return "p" === e || "P" === e ? (0, ft[e])(t, l.formatLong, y) : t
                    })).join("").match(ue),
                    C = [];
                for (b = 0; b < p.length; b++) {
                    var M = p[b];
                    !d.useAdditionalWeekYearTokens && gt(M) && vt(M, s, t), !d.useAdditionalDayOfYearTokens && wt(M) && vt(M, s, t);
                    var x = M[0],
                        D = oe[x];
                    if (D) {
                        var k = D.incompatibleTokens;
                        if (Array.isArray(k)) {
                            for (var U = void 0, Y = 0; Y < C.length; Y++) {
                                var N = C[Y].token;
                                if (-1 !== k.indexOf(N) || N === x) {
                                    U = C[Y];
                                    break
                                }
                            }
                            if (U) throw new RangeError("The format string mustn't contain `".concat(U.fullToken, "` and `").concat(M, "` at the same time"))
                        } else if ("*" === D.incompatibleTokens && C.length) throw new RangeError("The format string mustn't contain `".concat(M, "` and any other token at the same time"));
                        C.push({
                            token: x,
                            fullToken: M
                        });
                        var P = D.parse(u, M, l.match, y);
                        if (!P) return new Date(NaN);
                        T.push({
                            priority: D.priority,
                            subPriority: D.subPriority || 0,
                            set: D.set,
                            validate: D.validate,
                            value: P.value,
                            index: T.length
                        }), u = P.rest
                    } else {
                        if (x.match(fe)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + x + "`");
                        if ("''" === M ? M = "'" : "'" === x && (M = me(M)), 0 !== u.indexOf(M)) return new Date(NaN);
                        u = u.slice(M.length)
                    }
                }
                if (u.length > 0 && le.test(u)) return new Date(NaN);
                var S = T.map((function (t) {
                        return t.priority
                    })).sort((function (t, e) {
                        return e - t
                    })).filter((function (t, e, r) {
                        return r.indexOf(t) === e
                    })).map((function (t) {
                        return T.filter((function (e) {
                            return e.priority === t
                        })).sort((function (t, e) {
                            return e.subPriority - t.subPriority
                        }))
                    })).map((function (t) {
                        return t[0]
                    })),
                    H = n(i);
                if (isNaN(H)) return new Date(NaN);
                var O = E(H, c(H)),
                    F = {};
                for (b = 0; b < S.length; b++) {
                    var W = S[b];
                    if (W.validate && !W.validate(O, W.value, y)) return new Date(NaN);
                    var L = W.set(O, F, W.value, y);
                    L[0] ? (O = L[0], xt(F, L[1])) : O = L
                }
                return O
            }(t, a, new Date, this.options) : function (t, n) {
                r(1, arguments);
                var a = n || {},
                    i = null == a.additionalDigits ? 2 : e(a.additionalDigits);
                if (2 !== i && 1 !== i && 0 !== i) throw new RangeError("additionalDigits must be 0, 1 or 2");
                if ("string" != typeof t && "[object String]" !== Object.prototype.toString.call(t)) return new Date(NaN);
                var o, u = Te(t);
                if (u.date) {
                    var s = pe(u.date, i);
                    o = Ce(s.restDateString, s.year)
                }
                if (isNaN(o) || !o) return new Date(NaN);
                var c, d = o.getTime(),
                    l = 0;
                if (u.time && (l = xe(u.time), isNaN(l) || null === l)) return new Date(NaN);
                if (!u.timezone) {
                    var f = new Date(d + l),
                        h = new Date(0);
                    return h.setFullYear(f.getUTCFullYear(), f.getUTCMonth(), f.getUTCDate()), h.setHours(f.getUTCHours(), f.getUTCMinutes(), f.getUTCSeconds(), f.getUTCMilliseconds()), h
                }
                return c = ke(u.timezone), isNaN(c) ? new Date(NaN) : new Date(d + l + c)
            }(t, this.options)), m(t) ? t.getTime() : null
        },
        format: function (t, a) {
            return function (t, a, i) {
                r(2, arguments);
                var o = String(a),
                    u = i || {},
                    s = u.locale || q,
                    d = s.options && s.options.firstWeekContainsDate,
                    l = null == d ? 1 : e(d),
                    f = null == u.firstWeekContainsDate ? l : e(u.firstWeekContainsDate);
                if (!(f >= 1 && f <= 7)) throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
                var h = s.options && s.options.weekStartsOn,
                    w = null == h ? 0 : e(h),
                    g = null == u.weekStartsOn ? w : e(u.weekStartsOn);
                if (!(g >= 0 && g <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
                if (!s.localize) throw new RangeError("locale must contain localize property");
                if (!s.formatLong) throw new RangeError("locale must contain formatLong property");
                var v = n(t);
                if (!m(v)) throw new RangeError("Invalid time value");
                var b = c(v),
                    y = E(v, b),
                    T = {
                        firstWeekContainsDate: f,
                        weekStartsOn: g,
                        locale: s,
                        _originalDate: v
                    };
                return o.match(yt).map((function (t) {
                    var e = t[0];
                    return "p" === e || "P" === e ? (0, ft[e])(t, s.formatLong, T) : t
                })).join("").match(bt).map((function (e) {
                    if ("''" === e) return "'";
                    var r = e[0];
                    if ("'" === r) return Mt(e);
                    var n = ot[r];
                    if (n) return !u.useAdditionalWeekYearTokens && gt(e) && vt(e, a, t), !u.useAdditionalDayOfYearTokens && wt(e) && vt(e, a, t), n(y, e, s.localize, T);
                    if (r.match(Ct)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + r + "`");
                    return e
                })).join("")
            }(t, a, this.options)
        },
        add: function (t, n, s) {
            switch (s) {
                case "millisecond":
                    return o(t, n);
                case "second":
                    return function (t, n) {
                        r(2, arguments);
                        var a = e(n);
                        return o(t, 1e3 * a)
                    }(t, n);
                case "minute":
                    return function (t, n) {
                        r(2, arguments);
                        var a = e(n);
                        return o(t, 6e4 * a)
                    }(t, n);
                case "hour":
                    return function (t, n) {
                        r(2, arguments);
                        var a = e(n);
                        return o(t, a * u)
                    }(t, n);
                case "day":
                    return a(t, n);
                case "week":
                    return function (t, n) {
                        r(2, arguments);
                        var i = e(n);
                        return a(t, 7 * i)
                    }(t, n);
                case "month":
                    return i(t, n);
                case "quarter":
                    return function (t, n) {
                        r(2, arguments);
                        var a = e(n);
                        return i(t, 3 * a)
                    }(t, n);
                case "year":
                    return function (t, n) {
                        r(2, arguments);
                        var a = e(n);
                        return i(t, 12 * a)
                    }(t, n);
                default:
                    return t
            }
        },
        diff: function (t, e, a) {
            switch (a) {
                case "millisecond":
                    return y(t, e);
                case "second":
                    return function (t, e) {
                        r(2, arguments);
                        var n = y(t, e) / 1e3;
                        return n > 0 ? Math.floor(n) : Math.ceil(n)
                    }(t, e);
                case "minute":
                    return function (t, e) {
                        r(2, arguments);
                        var n = y(t, e) / 6e4;
                        return n > 0 ? Math.floor(n) : Math.ceil(n)
                    }(t, e);
                case "hour":
                    return function (t, e) {
                        r(2, arguments);
                        var n = y(t, e) / T;
                        return n > 0 ? Math.floor(n) : Math.ceil(n)
                    }(t, e);
                case "day":
                    return b(t, e);
                case "week":
                    return function (t, e) {
                        r(2, arguments);
                        var n = b(t, e) / 7;
                        return n > 0 ? Math.floor(n) : Math.ceil(n)
                    }(t, e);
                case "month":
                    return x(t, e);
                case "quarter":
                    return function (t, e) {
                        r(2, arguments);
                        var n = x(t, e) / 3;
                        return n > 0 ? Math.floor(n) : Math.ceil(n)
                    }(t, e);
                case "year":
                    return function (t, e) {
                        r(2, arguments);
                        var a = n(t),
                            i = n(e),
                            o = h(a, i),
                            u = Math.abs(g(a, i));
                        a.setFullYear("1584"), i.setFullYear("1584");
                        var s = h(a, i) === -o,
                            c = o * (u - s);
                        return 0 === c ? 0 : c
                    }(t, e);
                default:
                    return 0
            }
        },
        startOf: function (t, e, a) {
            switch (e) {
                case "second":
                    return function (t) {
                        r(1, arguments);
                        var e = n(t);
                        return e.setMilliseconds(0), e
                    }(t);
                case "minute":
                    return function (t) {
                        r(1, arguments);
                        var e = n(t);
                        return e.setSeconds(0, 0), e
                    }(t);
                case "hour":
                    return function (t) {
                        r(1, arguments);
                        var e = n(t);
                        return e.setMinutes(0, 0, 0), e
                    }(t);
                case "day":
                    return d(t);
                case "week":
                    return s(t);
                case "isoWeek":
                    return s(t, {
                        weekStartsOn: +a
                    });
                case "month":
                    return function (t) {
                        r(1, arguments);
                        var e = n(t);
                        return e.setDate(1), e.setHours(0, 0, 0, 0), e
                    }(t);
                case "quarter":
                    return function (t) {
                        r(1, arguments);
                        var e = n(t),
                            a = e.getMonth(),
                            i = a - a % 3;
                        return e.setMonth(i, 1), e.setHours(0, 0, 0, 0), e
                    }(t);
                case "year":
                    return function (t) {
                        r(1, arguments);
                        var e = n(t),
                            a = new Date(0);
                        return a.setFullYear(e.getFullYear(), 0, 1), a.setHours(0, 0, 0, 0), a
                    }(t);
                default:
                    return t
            }
        },
        endOf: function (t, a) {
            switch (a) {
                case "second":
                    return function (t) {
                        r(1, arguments);
                        var e = n(t);
                        return e.setMilliseconds(999), e
                    }(t);
                case "minute":
                    return function (t) {
                        r(1, arguments);
                        var e = n(t);
                        return e.setSeconds(59, 999), e
                    }(t);
                case "hour":
                    return function (t) {
                        r(1, arguments);
                        var e = n(t);
                        return e.setMinutes(59, 59, 999), e
                    }(t);
                case "day":
                    return p(t);
                case "week":
                    return function (t, a) {
                        r(1, arguments);
                        var i = a || {},
                            o = i.locale,
                            u = o && o.options && o.options.weekStartsOn,
                            s = null == u ? 0 : e(u),
                            c = null == i.weekStartsOn ? s : e(i.weekStartsOn);
                        if (!(c >= 0 && c <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
                        var d = n(t),
                            l = d.getDay(),
                            f = 6 + (l < c ? -7 : 0) - (l - c);
                        return d.setDate(d.getDate() + f), d.setHours(23, 59, 59, 999), d
                    }(t);
                case "month":
                    return C(t);
                case "quarter":
                    return function (t) {
                        r(1, arguments);
                        var e = n(t),
                            a = e.getMonth(),
                            i = a - a % 3 + 3;
                        return e.setMonth(i, 0), e.setHours(23, 59, 59, 999), e
                    }(t);
                case "year":
                    return function (t) {
                        r(1, arguments);
                        var e = n(t),
                            a = e.getFullYear();
                        return e.setFullYear(a + 1, 0, 0), e.setHours(23, 59, 59, 999), e
                    }(t);
                default:
                    return t
            }
        }
    })
}));