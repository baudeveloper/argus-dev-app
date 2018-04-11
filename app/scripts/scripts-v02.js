var tempMinHeight, argus;
(function(n, t) {
    "use strict";
    var i;
    if (typeof exports == "object") {
        try {
            i = require("moment")
        } catch (r) {}
        module.exports = t(i)
    } else typeof define == "function" && define.amd ? define(function(n) {
        try {
            i = n("moment")
        } catch (r) {}
        return t(i)
    }) : n.Pikaday = t(n.moment)
})(this, function(n) {
    "use strict";
    var o = typeof n == "function",
        l = !!window.addEventListener,
        r = window.document,
        a = window.setTimeout,
        u = function(n, t, i, r) {
            l ? n.addEventListener(t, i, !!r) : n.attachEvent("on" + t, i)
        },
        e = function(n, t, i, r) {
            l ? n.removeEventListener(t, i, !!r) : n.detachEvent("on" + t, i)
        },
        p = function(n, t, i) {
            var u;
            r.createEvent ? (u = r.createEvent("HTMLEvents"), u.initEvent(t, !0, !1), u = h(u, i), n.dispatchEvent(u)) : r.createEventObject && (u = r.createEventObject(), u = h(u, i), n.fireEvent("on" + t, u))
        },
        g = function(n) {
            return n.trim ? n.trim() : n.replace(/^\s+|\s+$/g, "")
        },
        t = function(n, t) {
            return (" " + n.className + " ").indexOf(" " + t + " ") !== -1
        },
        nt = function(n, i) {
            t(n, i) || (n.className = n.className === "" ? i : n.className + " " + i)
        },
        tt = function(n, t) {
            n.className = g((" " + n.className + " ").replace(" " + t + " ", " "))
        },
        v = function(n) {
            return /Array/.test(Object.prototype.toString.call(n))
        },
        i = function(n) {
            return /Date/.test(Object.prototype.toString.call(n)) && !isNaN(n.getTime())
        },
        it = function(n) {
            var t = n.getDay();
            return t === 0 || t === 6
        },
        rt = function(n) {
            return n % 4 == 0 && n % 100 != 0 || n % 400 == 0
        },
        w = function(n, t) {
            return [31, rt(n) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
        },
        s = function(n) {
            i(n) && n.setHours(0, 0, 0, 0)
        },
        c = function(n, t) {
            var i = new Date(n.getTime()),
                r = new Date(t.getTime());
            return s(i), s(r), i.getTime() === r.getTime()
        },
        h = function(n, t, r) {
            var u, f;
            for (u in t) f = n[u] !== undefined, f && typeof t[u] == "object" && t[u] !== null && t[u].nodeName === undefined ? i(t[u]) ? r && (n[u] = new Date(t[u].getTime())) : v(t[u]) ? r && (n[u] = t[u].slice(0)) : n[u] = h({}, t[u], r) : (r || !f) && (n[u] = t[u]);
            return n
        },
        b = function(n) {
            return n.month < 0 && (n.year -= Math.ceil(Math.abs(n.month) / 12), n.month += 12), n.month > 11 && (n.year += Math.floor(Math.abs(n.month) / 12), n.month -= 12), n
        },
        f = {
            field: null,
            bound: undefined,
            position: "bottom left",
            reposition: !0,
            format: "MM/DD/YYYY",
            inputFormats: "MM/DD/YYYY",
            defaultDate: null,
            setDefaultDate: !1,
            firstDay: 0,
            formatStrict: !1,
            minDate: null,
            maxDate: null,
            yearRange: 10,
            showWeekNumber: !1,
            minYear: 0,
            maxYear: 9999,
            minMonth: undefined,
            maxMonth: undefined,
            startRange: null,
            endRange: null,
            isRTL: !1,
            yearSuffix: "",
            showMonthAfterYear: !1,
            showDaysInNextAndPreviousMonths: !1,
            numberOfMonths: 1,
            showTime: !1,
            showMinutes: !0,
            showSeconds: !1,
            use24hour: !1,
            incrementHourBy: 1,
            incrementMinuteBy: 1,
            incrementSecondBy: 1,
            timeLabel: null,
            autoClose: !0,
            mainCalendar: "left",
            container: undefined,
            i18n: {
                previousMonth: "Previous Month",
                nextMonth: "Next Month",
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                midnight: "Midnight",
                noon: "Noon"
            },
            theme: null,
            onSelect: null,
            onOpen: null,
            onClose: null,
            onDraw: null
        },
        k = function(n, t, i) {
            for (t += n.firstDay; t >= 7;) t -= 7;
            return i ? n.i18n.weekdaysShort[t] : n.i18n.weekdays[t]
        },
        ut = function(n) {
            var t = [],
                i = "false";
            if (n.isEmpty)
                if (n.showDaysInNextAndPreviousMonths) t.push("is-outside-current-month");
                else return '<td class="is-empty"><\/td>';
            return n.isDisabled && t.push("is-disabled"), n.isToday && t.push("is-today"), n.isSelected && (t.push("is-selected"), i = "true"), n.isInRange && t.push("is-inrange"), n.isStartRange && t.push("is-startrange"), n.isEndRange && t.push("is-endrange"), '<td data-day="' + n.day + '" class="' + t.join(" ") + '" aria-selected="' + i + '"><button class="pika-button pika-day" type="button" data-pika-year="' + n.year + '" data-pika-month="' + n.month + '" data-pika-day="' + n.day + '">' + n.day + "<\/button><\/td>"
        },
        ft = function(n, t, i) {
            var r = new Date(i, 0, 1),
                u = Math.ceil(((new Date(i, t, n) - r) / 864e5 + r.getDay() + 1) / 7);
            return '<td class="pika-week">' + u + "<\/td>"
        },
        et = function(n, t) {
            return "<tr>" + (t ? n.reverse() : n).join("") + "<\/tr>"
        },
        ot = function(n) {
            return "<tbody>" + n.join("") + "<\/tbody>"
        },
        st = function(n) {
            var t, i = [];
            for (n.showWeekNumber && i.push("<th><\/th>"), t = 0; t < 7; t++) i.push('<th scope="col"><abbr title="' + k(n, t) + '">' + k(n, t, !0) + "<\/abbr><\/th>");
            return "<thead><tr>" + (n.isRTL ? i.reverse() : i).join("") + "<\/tr><\/thead>"
        },
        ht = function(n, t, i, r, u, f) {
            for (var c, e = n._o, y = i === e.minYear, p = i === e.maxYear, h = '<div id="' + f + '" class="pika-title" role="heading" aria-live="assertive">', l, a, w = !0, b = !0, s = [], o = 0; o < 12; o++) s.push('<option value="' + (i === u ? o - t : 12 + o - t) + '"' + (o === r ? ' selected="selected"' : "") + (y && o < e.minMonth || p && o > e.maxMonth ? 'disabled="disabled"' : "") + ">" + e.i18n.months[o] + "<\/option>");
            for (l = '<div class="pika-label">' + e.i18n.months[r] + '<select class="pika-select pika-select-month" tabindex="-1">' + s.join("") + "<\/select><\/div>", v(e.yearRange) ? (o = e.yearRange[0], c = e.yearRange[1] + 1) : (o = i - e.yearRange, c = 1 + i + e.yearRange), s = []; o < c && o <= e.maxYear; o++) o >= e.minYear && s.push('<option value="' + o + '"' + (o === i ? ' selected="selected"' : "") + ">" + o + "<\/option>");
            return a = '<div class="pika-label">' + i + e.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + s.join("") + "<\/select><\/div>", h += e.showMonthAfterYear ? a + l : l + a, y && (r === 0 || e.minMonth >= r) && (w = !1), p && (r === 11 || e.maxMonth <= r) && (b = !1), t === 0 && (h += '<button class="pika-prev' + (w ? "" : " is-disabled") + '" type="button">' + e.i18n.previousMonth + "<\/button>"), t === n._o.numberOfMonths - 1 && (h += '<button class="pika-next' + (b ? "" : " is-disabled") + '" type="button">' + e.i18n.nextMonth + "<\/button>"), h + "<\/div>"
        },
        ct = function(n, t, i) {
            return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + i + '">' + st(n) + ot(t) + "<\/table>"
        },
        y = function(n, t, i, r, u) {
            var e, f;
            for (u = u || 1, e = '<td><select class="pika-select ' + i + '">', f = 0; f < n; f += u) e += '<option value="' + f + '" ' + (f == t ? "selected" : "") + ">" + r(f) + "<\/option>";
            return e + "<\/select><\/td>"
        },
        lt = function(n, t, i, r) {
            var u = '<table cellpadding="0" cellspacing="0" class="pika-time"><tbody><tr>' + (r.timeLabel !== null ? '<td class="pika-time-label">' + r.timeLabel + "<\/td>" : "") + y(24, n, "pika-select-hour", function(n) {
                if (r.use24hour) return n;
                var t = n % 12 + (n < 12 ? " AM" : " PM");
                return t == "0 AM" ? r.i18n.midnight : t == "0 PM" ? r.i18n.noon : t
            }, r.incrementHourBy);
            return r.showMinutes && (u += "<td>:<\/td>" + y(60, t, "pika-select-minute", function(n) {
                return n < 10 ? "0" + n : n
            }, r.incrementMinuteBy)), r.showSeconds && (u += "<td>:<\/td>" + y(60, i, "pika-select-second", function(n) {
                return n < 10 ? "0" + n : n
            }, r.incrementSecondBy)), u + "<\/tr><\/tbody><\/table>"
        },
        d = function(f) {
            var e = this,
                s = e.config(f),
                h;
            e._onMouseDown = function(n) {
                var r, f, u;
                if (e._v && (n = n || window.event, r = n.target || n.srcElement, r))
                    if (t(r, "is-disabled") || (!t(r, "pika-button") || t(r, "is-empty") || t(r.parentNode, "is-disabled") ? t(r, "pika-prev") ? e.prevMonth() : t(r, "pika-next") && e.nextMonth() : (f = new Date(r.getAttribute("data-pika-year"), r.getAttribute("data-pika-month"), r.getAttribute("data-pika-day")), u = e._d || s.defaultDate, u && i(u) && s.showTime && (f.setHours(u.getHours()), f.setMinutes(u.getMinutes()), s.showSeconds && f.setSeconds(u.getSeconds())), e.setDate(f), s.bound && a(function() {
                            s.autoClose && e.hide();
                            s.field && s.field.blur()
                        }, 100))), t(r, "pika-select")) e._c = !0;
                    else if (n.preventDefault) n.preventDefault();
                else return n.returnValue = !1, !1
            };
            e._onChange = function(n) {
                n = n || window.event;
                var i = n.target || n.srcElement;
                i && (t(i, "pika-select-month") ? e.gotoMonth(i.value) : t(i, "pika-select-year") ? e.gotoYear(i.value) : t(i, "pika-select-hour") ? e.setTime(i.value) : t(i, "pika-select-minute") ? e.setTime(null, i.value) : t(i, "pika-select-second") && e.setTime(null, null, i.value))
            };
            e._onKeyChange = function(n) {
                if (n = n || window.event, e.isVisible()) switch (n.keyCode) {
                    case 13:
                    case 27:
                        s.field.blur();
                        break;
                    case 37:
                        n.preventDefault();
                        e.adjustDate("subtract", 1);
                        break;
                    case 38:
                        e.adjustDate("subtract", 7);
                        break;
                    case 39:
                        e.adjustDate("add", 1);
                        break;
                    case 40:
                        e.adjustDate("add", 7)
                }
            };
            e._onInputChange = function(t) {
                var r;
                t.firedBy !== e && (o ? (r = n(s.field.value, s.inputFormats, s.formatStrict), r = r && r.isValid() ? r.toDate() : null) : r = new Date(Date.parse(s.field.value)), i(r) && e.setDate(r), e._v || e.show())
            };
            e._onInputFocus = function() {
                e.show()
            };
            e._onInputClick = function() {
                e.show()
            };
            e._onInputBlur = function() {
                var n = r.activeElement;
                do
                    if (t(n, "pika-single")) return; while (n = n.parentNode);
                s.autoClose && !e._c && (e._b = a(function() {
                    e.hide()
                }, 50));
                e._c = !1
            };
            e._onClick = function(n) {
                n = n || window.event;
                var i = n.target || n.srcElement,
                    r = i;
                if (i) {
                    !l && t(i, "pika-select") && (i.onchange || (i.setAttribute("onchange", "return;"), u(i, "change", e._onChange)));
                    do
                        if (t(r, "pika-single") || r === s.trigger || s.showTime && t(r, "pika-time-container")) return; while (r = r.parentNode);
                    e._v && i !== s.trigger && r !== s.trigger && e.hide()
                }
            };
            e.el = r.createElement("div");
            e.el.className = "pika-single" + (s.isRTL ? " is-rtl" : "") + (s.theme ? " " + s.theme : "");
            u(e.el, "mousedown", e._onMouseDown, !0);
            u(e.el, "touchend", e._onMouseDown, !0);
            u(e.el, "change", e._onChange);
            u(r, "keydown", e._onKeyChange);
            s.field && (s.container ? s.container.appendChild(e.el) : s.bound ? r.body.appendChild(e.el) : s.field.parentNode.insertBefore(e.el, s.field.nextSibling), u(s.field, "change", e._onInputChange), s.defaultDate || (s.defaultDate = o && s.field.value ? n(s.field.value, s.inputFormats).toDate() : new Date(Date.parse(s.field.value)), s.setDefaultDate = !0));
            h = s.defaultDate;
            i(h) ? s.setDefaultDate ? e.setDate(h, !0) : e.gotoDate(h) : e.gotoDate(new Date);
            s.bound ? (this.hide(), e.el.className += " is-bound", u(s.trigger, "click", e._onInputClick), u(s.trigger, "focus", e._onInputFocus), u(s.trigger, "blur", e._onInputBlur)) : this.show()
        };
    return d.prototype = {
        config: function(n) {
            var t, r, u;
            return this._o || (this._o = h({}, f, !0)), t = h(this._o, n, !0), t.isRTL = !!t.isRTL, t.autoClose = !!t.autoClose, t.field = t.field && t.field.nodeName ? t.field : null, t.theme = typeof t.theme == "string" && t.theme ? t.theme : null, t.bound = !!(t.bound !== undefined ? t.field && t.bound : t.field), t.trigger = t.trigger && t.trigger.nodeName ? t.trigger : t.field, t.disableWeekends = !!t.disableWeekends, t.disableDayFn = typeof t.disableDayFn == "function" ? t.disableDayFn : null, r = parseInt(t.numberOfMonths, 10) || 1, t.numberOfMonths = r > 4 ? 4 : r, i(t.minDate) || (t.minDate = !1), i(t.maxDate) || (t.maxDate = !1), t.minDate && t.maxDate && t.maxDate < t.minDate && (t.maxDate = t.minDate = !1), t.minDate && this.setMinDate(t.minDate), t.maxDate && this.setMaxDate(t.maxDate), v(t.yearRange) ? (u = (new Date).getFullYear() - 10, t.yearRange[0] = parseInt(t.yearRange[0], 10) || u, t.yearRange[1] = parseInt(t.yearRange[1], 10) || u) : (t.yearRange = Math.abs(parseInt(t.yearRange, 10)) || f.yearRange, t.yearRange > 100 && (t.yearRange = 100)), t.format === null && (t.format = "YYYY-MM-DD", t.showTime && (t.format += " HH:mm:ss")), t.inputFormats || (t.inputFormats = t.format), t
        },
        toString: function(t) {
            return i(this._d) ? o ? n(this._d).format(t || this._o.format) : this._o.showTime ? this._d.toString() : this._d.toDateString() : ""
        },
        getMoment: function() {
            return o ? n(this._d) : null
        },
        setMoment: function(t, i) {
            o && n.isMoment(t) && this.setDate(t.toDate(), i)
        },
        getDate: function() {
            return i(this._d) ? new Date(this._d.getTime()) : new Date
        },
        setTime: function(n, t, i) {
            this._d || (this._d = new Date, this._d.setHours(0, 0, 0, 0));
            n && this._d.setHours(n);
            t && this._d.setMinutes(t);
            i && this._d.setSeconds(i);
            this.setDate(this._d)
        },
        setDate: function(n, t) {
            if (!n) return this._d = null, this._o.field && (this._o.field.value = "", p(this._o.field, "change", {
                firedBy: this
            })), this.draw();
            if (typeof n == "string" && (n = new Date(Date.parse(n))), i(n)) {
                var r = this._o.minDate,
                    u = this._o.maxDate;
                i(r) && n < r ? n = r : i(u) && n > u && (n = u);
                this._d = new Date(n.getTime());
                this._o.showTime && !this._o.showSeconds ? this._d.setSeconds(0) : this._o.showTime || s(this._d);
                this.gotoDate(this._d);
                this._o.field && (this._o.field.value = this.toString(), p(this._o.field, "change", {
                    firedBy: this
                }));
                t || typeof this._o.onSelect != "function" || this._o.onSelect.call(this, this.getDate())
            }
        },
        gotoDate: function(n) {
            var r = !0;
            if (i(n)) {
                if (this.calendars) {
                    var f = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                        t = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
                        u = n.getTime();
                    t.setMonth(t.getMonth() + 1);
                    t.setDate(t.getDate() - 1);
                    r = u < f.getTime() || t.getTime() < u
                }
                r && (this.calendars = [{
                    month: n.getMonth(),
                    year: n.getFullYear(),
                    hour: n.getHours(),
                    minute: n.getMinutes(),
                    second: n.getSeconds()
                }], this._o.mainCalendar === "right" && (this.calendars[0].month += 1 - this._o.numberOfMonths));
                this.adjustCalendars()
            }
        },
        adjustDate: function(t, i) {
            var u = this.getDate(),
                f = parseInt(i) * 864e5,
                r;
            t === "add" ? r = new Date(u.valueOf() + f) : t === "subtract" && (r = new Date(u.valueOf() - f));
            o && (t === "add" ? r = n(u).add(i, "days").toDate() : t === "subtract" && (r = n(u).subtract(i, "days").toDate()));
            this.setDate(r)
        },
        adjustCalendars: function() {
            this.calendars[0] = b(this.calendars[0]);
            for (var n = 1; n < this._o.numberOfMonths; n++) this.calendars[n] = b({
                month: this.calendars[0].month + n,
                year: this.calendars[0].year
            });
            this.draw()
        },
        gotoToday: function() {
            this.gotoDate(new Date)
        },
        gotoMonth: function(n) {
            isNaN(n) || (this.calendars[0].month = parseInt(n, 10), this.adjustCalendars())
        },
        nextMonth: function() {
            this.calendars[0].month++;
            this.adjustCalendars()
        },
        prevMonth: function() {
            this.calendars[0].month--;
            this.adjustCalendars()
        },
        gotoYear: function(n) {
            isNaN(n) || (this.calendars[0].year = parseInt(n, 10), this.adjustCalendars())
        },
        setMinDate: function(n) {
            n instanceof Date ? (this._o.showTime || s(n), this._o.minDate = n, this._o.minYear = n.getFullYear(), this._o.minMonth = n.getMonth()) : (this._o.minDate = f.minDate, this._o.minYear = f.minYear, this._o.minMonth = f.minMonth, this._o.startRange = f.startRange);
            this.draw()
        },
        setMaxDate: function(n) {
            n instanceof Date ? (this._o.showTime || s(n), this._o.maxDate = n, this._o.maxYear = n.getFullYear(), this._o.maxMonth = n.getMonth()) : (this._o.maxDate = f.maxDate, this._o.maxYear = f.maxYear, this._o.maxMonth = f.maxMonth, this._o.endRange = f.endRange);
            this.draw()
        },
        setStartRange: function(n) {
            this._o.startRange = n
        },
        setEndRange: function(n) {
            this._o.endRange = n
        },
        draw: function(n) {
            var u, r;
            if (this._v || n) {
                var t = this._o,
                    h = t.minYear,
                    c = t.maxYear,
                    f = t.minMonth,
                    e = t.maxMonth,
                    o = "",
                    s;
                for (this._y <= h && (this._y = h, !isNaN(f) && this._m < f && (this._m = f)), this._y >= c && (this._y = c, !isNaN(e) && this._m > e && (this._m = e)), s = "pika-title-" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 2), u = 0; u < t.numberOfMonths; u++) o += '<div class="pika-lendar">' + ht(this, u, this.calendars[u].year, this.calendars[u].month, this.calendars[0].year, s) + this.render(this.calendars[u].year, this.calendars[u].month, s) + "<\/div>";
                if (t.showTime && (r = this._d || this._o.defaultDate, o += '<div class="pika-time-container">' + lt(r && i(r) ? r.getHours() : 0, r && i(r) ? r.getMinutes() : 0, r && i(r) ? r.getSeconds() : 0, t) + "<\/div>"), this.el.innerHTML = o, t.bound && t.field.type !== "hidden" && a(function() {
                        t.trigger.focus()
                    }, 1), typeof this._o.onDraw == "function") this._o.onDraw(this);
                t.bound && t.field.setAttribute("aria-label", "Use the arrow keys to pick a date")
            }
        },
        adjustPosition: function() {
            var n, t, f, e, s, h, c, i, u, o;
            if (!this._o.container) {
                if (this.el.style.position = "absolute", n = this._o.trigger, t = n, f = this.el.offsetWidth, e = this.el.offsetHeight, s = window.innerWidth || r.documentElement.clientWidth, h = window.innerHeight || r.documentElement.clientHeight, c = window.pageYOffset || r.body.scrollTop || r.documentElement.scrollTop, typeof n.getBoundingClientRect == "function") o = n.getBoundingClientRect(), i = o.left + window.pageXOffset, u = o.bottom + window.pageYOffset;
                else
                    for (i = t.offsetLeft, u = t.offsetTop + t.offsetHeight; t = t.offsetParent;) i += t.offsetLeft, u += t.offsetTop;
                (this._o.reposition && i + f > s || this._o.position.indexOf("right") > -1 && i - f + n.offsetWidth > 0) && (i = i - f + n.offsetWidth);
                (this._o.reposition && u + e > h + c || this._o.position.indexOf("top") > -1 && u - e - n.offsetHeight > 0) && (u = u - e - n.offsetHeight);
                this.el.style.left = i + "px";
                this.el.style.top = u + "px"
            }
        },
        render: function(n, t, r) {
            var u = this._o,
                nt = new Date,
                a = w(n, t),
                f = new Date(n, t, 1).getDay(),
                tt = [],
                l = [],
                p, b, o, k, ht;
            u.showTime || s(nt);
            u.firstDay > 0 && (f -= u.firstDay, f < 0 && (f += 7));
            for (var rt = t === 0 ? 11 : t - 1, lt = t === 11 ? 0 : t + 1, ot = t === 0 ? n - 1 : n, at = t === 11 ? n + 1 : n, vt = w(ot, rt), v = a + f, y = v; y > 7;) y -= 7;
            for (v += 7 - y, p = u.minDate ? new Date(u.minDate.getFullYear(), u.minDate.getMonth(), u.minDate.getDate()) : null, b = u.maxDate ? new Date(u.maxDate.getFullYear(), u.maxDate.getMonth(), u.maxDate.getDate()) : null, o = 0, k = 0; o < v; o++) {
                var e = new Date(n, t, 1 + (o - f)),
                    yt = i(this._d) ? c(e, this._d) : !1,
                    pt = c(e, nt),
                    st = o < f || o >= a + f,
                    h = 1 + (o - f),
                    d = t,
                    g = n,
                    wt = u.startRange && c(u.startRange, e),
                    bt = u.endRange && c(u.endRange, e),
                    kt = u.startRange && u.endRange && u.startRange < e && e < u.endRange,
                    dt = p && e < p || b && e > b || u.disableWeekends && it(e) || u.disableDayFn && u.disableDayFn(e);
                st && (o < f ? (h = vt + h, d = rt, g = ot) : (h = h - a, d = lt, g = at));
                ht = {
                    day: h,
                    month: d,
                    year: g,
                    isSelected: yt,
                    isToday: pt,
                    isDisabled: dt,
                    isEmpty: st,
                    isStartRange: wt,
                    isEndRange: bt,
                    isInRange: kt,
                    showDaysInNextAndPreviousMonths: u.showDaysInNextAndPreviousMonths
                };
                l.push(ut(ht));
                ++k == 7 && (u.showWeekNumber && l.unshift(ft(o - f, t, n)), tt.push(et(l, u.isRTL)), l = [], k = 0)
            }
            return ct(u, tt, r)
        },
        isVisible: function() {
            return this._v
        },
        show: function() {
            this.isVisible() || (tt(this.el, "is-hidden"), this._v = !0, this.draw(), this._o.bound && (u(r, "click", this._onClick), this.adjustPosition()), typeof this._o.onOpen == "function" && this._o.onOpen.call(this))
        },
        hide: function() {
            var n = this._v;
            n !== !1 && (this._o.bound && e(r, "click", this._onClick), this.el.style.position = "static", this.el.style.left = "auto", this.el.style.top = "auto", nt(this.el, "is-hidden"), this._v = !1, n !== undefined && typeof this._o.onClose == "function" && this._o.onClose.call(this))
        },
        destroy: function() {
            this.hide();
            e(this.el, "mousedown", this._onMouseDown, !0);
            e(this.el, "touchend", this._onMouseDown, !0);
            e(this.el, "change", this._onChange);
            this._o.field && (e(this._o.field, "change", this._onInputChange), this._o.bound && (e(this._o.trigger, "click", this._onInputClick), e(this._o.trigger, "focus", this._onInputFocus), e(this._o.trigger, "blur", this._onInputBlur)));
            this.el.parentNode && this.el.parentNode.removeChild(this.el)
        }
    }, d
});
$(function() {
    $("input").focusin(function() {
        $(".has-feedback").addClass("showClass")
    });
    $("input").focusout(function() {
        $(".has-feedback").removeClass("showClass")
    })
});
tempMinHeight = 0;
$(".list-group .list-group-item-wrapper").each(function() {
    $(this).outerHeight() > tempMinHeight && (tempMinHeight = $(this).outerHeight())
});
$(".list-group .list-group-item-wrapper").css("min-height", tempMinHeight);
jQuery(document).ready(function() {
    $(".collapse").on("shown.bs.collapse", function() {
        $(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus")
    }).on("hidden.bs.collapse", function() {
        $(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus")
    })
});
$(".carousel").carousel({
    interval: 5e3
});
$("#myCarousel").bind("slide.bs.carousel", function() {
    var n = $("#myCarousel .item .active").attr("nav-id");
    $(".hero-well .media").removeClass("border-orange-top").addClass("border-blue-top");
    $("#" + n).addClass("border-orange-top")
});
$("#myCarousel").on("slid.bs.carousel", function(n) {
    var i = n.relatedTarget.id,
        t = $("#hero .active").attr("id");
    $("#ctrl_" + t).removeClass("border-blue-top").addClass("border-orange-top")
});
$(".hero-well .media").click(function() {
    $(".hero-well .media").removeClass("border-orange-top").addClass("border-blue-top");
    $(this).toggleClass("border-orange-top");
    $(this).toggleClass("border-blue-top")
});
$(".policy-details table").addClass("table-striped table-width");
jQuery("document").ready(function() {
    $(".policy-details table").each(function() {
        $(this).prepend("<thead><\/thead>");
        $(this).find("thead").append($(this).find("tr:eq(0)"));
        $("thead").addClass("thead")
    })
});
$(document).ready(function() {
    var n = 0;
    $(".submit_btn").click(function(t) {
        for (var r = $(".rad"), u = $(".text_field"), e = $("textarea"), f = r[0].checked == !1 && r[1].checked == !1 ? 0 : 1, i = u.length; i > n; i--) n = u[i - 1].value == "" || e.value == "" ? n + 1 : 0;
        if (n != 0 || f == 0) alert("*All Fields are mandatory*"), t.preventDefault();
        else return !0
    });
    $(".next_btn").click(function() {
        $(this).parent().next().fadeIn("slow");
        $(this).parent().css({
            display: "none"
        });
        $(".active").next().addClass("active")
    });
    $(".pre_btn").click(function() {
        $(this).parent().prev().fadeIn("slow");
        $(this).parent().css({
            display: "none"
        });
        $(".active:last").removeClass("active")
    });
    $(".submit_btn").click(function() {
        return $("input").val() == "" || $("textarea").val() == "" ? (alert("*All Fields are mandatory*"), !1) : !0
    })
});
$(function() {
    var n = $("#barwrap .ag-bar").attr("id");
    switch (n) {
        case "notify-blue":
            Cookies.get("notify-blue") ? $("#barwrap").hide() : ($("#barwrap").show(), Cookies.set($("#barwrap .ag-bar").attr("id"), n, {
                expires: 1,
                path: "/"
            }));
            break;
        case "notify-green":
            Cookies.get("notify-green") ? $("#barwrap").hide() : ($("#barwrap").show(), Cookies.set($("#barwrap .ag-bar").attr("id"), n, {
                expires: 3,
                path: "/"
            }));
            break;
        case "notify-orange":
            Cookies.get("notify-orange") ? $("#barwrap").hide() : ($("#barwrap").show(), Cookies.set($("#barwrap .ag-bar").attr("id"), n, {
                expires: 7,
                path: "/"
            }));
            break;
        case "notify-red":
            Cookies.get("notify-red") ? $("#barwrap").hide() : ($("#barwrap").show(), Cookies.set($("#barwrap .ag-bar").attr("id"), n, {
                path: "/"
            }))
    }
});
$(function() {
    setTimeout(function() {
        return $(".ag-bar").animate({
            height: "toggle"
        }, "slow")
    }, 450);
    return
});
$("#ag-notify-ok").click(function() {
        return $("#barwrap").css("margin-bottom", "0px"), $(".ag-bar").animate({
            height: "toggle"
        }, "slow"), !1
    }),
    function(n) {
        var t = function() {
                var t = this,
                    i = n("#" + t.for),
                    r = n("#" + t.shell),
                    u = r.multipleSelect("getSelects");
                i.val(u.join(","))
            },
            i;
        n("select.multiselect").multipleSelect({
            onClick: t,
            onCheckAll: t,
            onUncheckAll: function() {
                var t = this,
                    i = n("#" + t.for);
                i.val("")
            }
        }).each(function(t, i) {
            var r = n("#" + n(i).data("for"));
            n(i).multipleSelect("setSelects", r.val().split(","))
        });
        n(".responsive-tabs").responsiveTabs({
            initCollapsed: !0,
            collapseActive: !0,
            caret: "fa fa-caret-down fa-lg",
            accordionOn: ["xs"]
        });
        n(".ag-mobile-download-link").click(function(t) {
            t.stopPropagation();
            t.preventDefault();
            var i = n(this).attr("href");
            n.fileDownload(i)
        });
        i = n("#contactFormModal");
        n("body").append(i);
        typeof FormPostBack != "undefined" && FormPostBack ? n.validate({
            form: ".form"
        }) : n.validate({
            modules: "date, file, toggleDisabled",
            form: ".form"
        })
    }(jQuery),
    function(n) {
        n(document).ready(function() {
            var t, i = n("#loginDropdownCntr"),
                r = function(n) {
                    n && clearTimeout(n)
                },
                u = function() {
                    t = setTimeout(f, 1e3)
                },
                f = function() {
                    i.removeClass("open");
                    n(".ag-dd-toggle-cntr").removeClass("open");
                    n(".dropdown-submenu .ag-dropdown-submenu").removeClass("show");
                    n(".dropdown-submenu .ag-arrow-right").removeClass("fa-rotate-90");
                    r(t)
                };
            n("#loginDropdownToggle").click(function() {
                i.toggleClass("open")
            }).on("mouseenter", function() {
                r(t)
            }).on("mouseleave", u);
            n("body").bind("hide.bs.dropdown", f);
            i.on("mouseleave", u).on("mouseenter", function() {
                r(t)
            });
            n(".dropdown-submenu.ag-accordion-submenu").click(function(t) {
                t.stopPropagation();
                n(this).find(".ag-dropdown-submenu").toggleClass("show");
                n(this).find(".ag-arrow-right").toggleClass("fa-rotate-90")
            })
        })
    }(jQuery);
argus = {
        util: {},
        search: {},
        eft: {}
    },
    function(n) {
        n.parseInt = function(n, t) {
            var i = n;
            if (_.isString(n)) {
                if (i = _.parseInt(n), !isNaN(i)) return i;
                if (isNaN(i) && _.isNumber(t)) return t
            }
            return n
        }
    }(argus.util),
    function(n, t) {
        t(document).ready(function() {
            var i = t(".ag-search-list");
            i.length > 0 && (n.fullList = t(".ag-search-item"), n.paginate = function(i) {
                n.paginate.initialShowCount = argus.util.parseInt(t("#initialVisibleSearchElements").attr("data-value"), 20);
                t(".ag-search-list li:lt(" + n.paginate.initialShowCount + ")").show();
                i.length <= n.paginate.initialShowCount ? t("#loadMore").hide() : t("#loadMore").show()
            }, n.paginate.searchItemCount = t(".ag-search-list li").size(), n.paginate.increment = argus.util.parseInt(t("#incrementVisibleSearchElements").attr("data-value"), 5), t("#loadMore").click(function() {
                var i = n.paginate.initialShowCount + n.paginate.increment <= n.paginate.searchItemCount ? n.paginate.initialShowCount + n.paginate.increment : n.paginate.searchItemCount;
                t(".ag-search-list li:lt(" + i + ")").show();
                i >= n.paginate.searchItemCount && t("#loadMore").addClass("disabled")
            }), n.paginate(n.fullList), t("#SearchFilterControl").change(function() {
                var r, u = t("#SearchFilterControl option:selected").attr("value");
                r = u === "_clearfilter_" ? n.fullList : _.cloneDeep(n.fullList).filter(function() {
                    return t(this).attr("data-type") && u && t(this).attr("data-type").toLowerCase() === u.toLowerCase()
                });
                i.empty().append(r);
                n.paginate(r)
            }))
        })
    }(argus.search, jQuery),
    function(n, t) {
        t(document).ready(function() {
            var i = function() {
                    return t("#StepNumber").attr("value")
                },
                u = function(n) {
                    return ".ag-form-step.step-number-" + n
                },
                r = function(n) {
                    t(".ag-form-step").hide();
                    t(u(n)).show()
                },
                n;
            r(i());
            n = ".ag-eft-form form";
            t(".ag-next").click(function() {
                var u = t(this).attr("data-validation-ignore"),
                    f;
                u && (u = u.split(","));
                t(n).isValid(null, {
                    ignore: u
                }) ? (f = parseInt(i()) + 1, r(f), t("#StepNumber").attr("value", f)) : console.info("section not valid, cannot proceed!")
            });
            t(".ag-previous").click(function() {
                var n = parseInt(i()) - 1;
                r(n);
                t("#StepNumber").attr("value", n)
            });
            t.validate({
                modules: "date, file, toggleDisabled",
                form: n,
                disabledFormFilter: n
            })
        })
    }(argus.eft, jQuery),
    function(n, t) {
        t(document).ready(function() {
            t(".ag-document-switcher .ag-link").click(function(n) {
                var i, r, u;
                n.preventDefault();
                i = t(this).closest(".ag-document-switcher-cntr");
                t(this).hasClass("top-level") && (r = i.find(".collapsible"), i.find(".presentation").removeClass("active"), r.find("> ul").addClass("hidden"), r.find("> .ag-doc-selection > .ag-link-icon").removeClass("fa-rotate-90"));
                i.find(".ag-link").removeClass("active");
                i.find(".ag-document-view").removeClass("active");
                u = t(this).find("> .ag-doc-selection").attr("href");
                t(this).addClass("active");
                t(u).addClass("active")
            });
            t(".ag-document-switcher .collapsible").click(function(n) {
                var i;
                n.preventDefault();
                n.stopPropagation();
                var u = t(this).data("level"),
                    e = "level-" + u,
                    f = parseInt(u),
                    r = t(this).closest(".ag-document-switcher-cntr");
                !t(this).hasClass("active") && t(this).hasClass("top-level") && (i = r.find(".collapsible"), i.find("> ul").addClass("hidden"), i.find("> .ag-doc-selection > .ag-link-icon").removeClass("fa-rotate-90"));
                !isNaN(f) && f > 1 && !t(this).hasClass("active") && (i = r.find(".collapsible." + e), i.find("> ul").addClass("hidden"), i.removeClass("active"), i.find("> .ag-doc-selection > .ag-link-icon").removeClass("fa-rotate-90"));
                t(this).find("> ul").toggleClass("hidden");
                t(this).hasClass("top-level") && (r.find(".ag-link").removeClass("active"), r.find(".presentation").removeClass("active"));
                t(this).find("> .ag-doc-selection > .ag-link-icon").toggleClass("fa-rotate-90");
                t(this).toggleClass("active")
            });
            t(".ag-document-switcher .ag-mobile-link").click(function(n) {
                n.preventDefault();
                var i = t(this).find("> .ag-doc-selection").attr("href");
                t.fileDownload(i)
            });
            t(".ag-download-link a").each(function() {
                var n = t(this);
                n.attr("href", n.attr("data-link-href"))
            });
            t('a.scroll-to[href*="#"]:not([href="#"])').click(function() {
                if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                    var n = t(this.hash);
                    if (n = n.length ? n : t("[name=" + this.hash.slice(1) + "]"), n.length) return t("html, body").animate({
                        scrollTop: n.offset().top - 50
                    }, 1e3), !1
                }
            })
        })
    }(argus, jQuery);
$(function() {
        function u() {
            var n = $("#site-wrapper");
            n.hasClass("show-nav") ? n.removeClass("show-nav") : n.addClass("show-nav")
        }

        function n() {
            var n = $("#site-wrapper");
            n.hasClass("show-login-nav") ? n.removeClass("show-login-nav") : n.addClass("show-login-nav")
        }

        function r(n, t, i) {
            n.preventDefault();
            n.stopPropagation();
            var r = t,
                u = r.closest(".dropdown"),
                e = u.data("level"),
                h = "level-" + e,
                c = parseInt(e),
                f = i.find(".dropdown." + h),
                o = i.find(".ag-menu-sublevel.ag-menu-level-" + (c + 1)),
                s = f.find("> a > .ag-link-toggle");
            u.hasClass("active") ? (f.removeClass("active"), o.addClass("hidden"), r.addClass("arrow-down"), r.removeClass("arrow-up")) : (f.removeClass("active"), o.addClass("hidden"), s.addClass("arrow-down"), s.removeClass("arrow-up"), u.find("> .ag-menu-sublevel").toggleClass("hidden"), u.addClass("active"), r.toggleClass("arrow-down"), r.toggleClass("arrow-up"))
        }
        $(".toggle-nav").click(function(n) {
            n.stopPropagation();
            n.preventDefault();
            u()
        });
        $(".toggle-login-nav").click(function(t) {
            t.stopPropagation();
            t.preventDefault();
            n()
        });
        $(".js-login-back").click(function(t) {
            t.stopPropagation();
            t.preventDefault();
            n()
        });
        $(".ag-content-wrapper").click(function() {
            $("#site-wrapper").hasClass("show-nav") && $("#site-wrapper").removeClass("show-nav");
            $("#site-wrapper").hasClass("show-login-nav") && $("#site-wrapper").removeClass("show-login-nav")
        });
        var t = $(".ag-site-menu"),
            i = $(".ag-mobile-login");
        t.find(".dropdown > a > .js-ag-link-toggle").click(function(n) {
            r(n, $(this), t)
        });
        i.find(".dropdown > a > .js-ag-link-toggle").click(function(n) {
            r(n, $(this), i)
        })
    }),
    function(n) {
        var t = "#RequestHealthQuoteForm",
            f = n(".ag-multistep-form"),
            h = n(".ag-multistep-form .next-btn"),
            c = n(".ag-multistep-form .pre-btn"),
            r = n("#FormRowContainer"),
            e = f.find("fieldset"),
            i = n('.progress-circles[for="' + f.attr("id") + '"]'),
            o = function() {
                var t = r.find(".ag-form-row.template").clone(!0),
                    i = n(".ag-form-row.process").length + 1;
                t.find(".employee-number-display").html(i);
                t.removeClass("template").removeClass("hidden").addClass("process");
                r.append(t)
            },
            u, s;
        o();
        n.each(e, function(t) {
            var f = n(this),
                r = t + 1,
                u;
            f.attr("data-step-number", r);
            u = t === 0 ? " active" : "";
            i.append('<li class="progress-circle' + u + '" data-step-number="' + r + '"><\/li>');
            r !== e.length && i.append('<li class="progress-prefix vertical-align-middle">-----<\/li>')
        });
        u = function(r) {
            var u, o, l;
            r.stopPropagation();
            r.preventDefault();
            u = n(this);
            o = u.closest(".ag-multistep-form");
            $parent = u.closest(".ag-step");
            var s = $parent.attr("data-step-number"),
                h = parseInt(s),
                c = u.hasClass("next-btn") ? h + 1 : h - 1,
                e = i.find('li[data-step-number="' + s + '"]'),
                a = i.find('li[data-step-number="' + c + '"]'),
                f = n(this).attr("data-validation-ignore");
            f && (f = f.split(","));
            l = u.hasClass("next-btn") ? n(t).isValid(null, {
                ignore: f
            }) : !0;
            l ? (e.removeClass("active"), u.hasClass("next-btn") ? e.addClass("visited") : e.removeClass("visited"), a.addClass("active"), $parent.hide(), o.find('.ag-step[data-step-number="' + c + '"]').show()) : console.info("section not valid, cannot proceed!")
        };
        h.click(u);
        c.click(u);
        n(".ag-add-more.form-row").click(function(n) {
            n.preventDefault();
            n.stopPropagation();
            o()
        });
        n(".ag-add-more.spouse-age").click(function(t) {
            t.preventDefault();
            t.stopPropagation();
            n(this).addClass("hidden").closest(".spouse-age-cntr").find(".spouse-input").removeClass("hidden")
        });
        n(".ag-add-more.dependent-age").click(function(t) {
            t.preventDefault();
            t.stopPropagation();
            var u = n(this).closest(".dependent-ages-cntr"),
                i = u.find(".dependent-ages"),
                r = i.find(".dependent-age.template").clone(!0);
            r.removeClass("template").removeClass("hidden").addClass("process");
            i.append(r).removeClass("hidden")
        });
        s = function() {
            var t = [],
                i = r.find(".ag-form-row.process");
            n.each(i, function() {
                var i = "",
                    f = [],
                    r = n(this),
                    c = "Employee " + r.find(".employee-number-display").text(),
                    u; + ': ';
                var e = r.find(".employee-age").val(),
                    o = r.find(".employee-gender").val(),
                    s = r.find(".employee-spouse-age").val(),
                    h = r.find(".employee-dependent-age");
                n.each(h, function() {
                    var t = n(this);
                    t.val() && t.val().length > 0 && f.push(t.val())
                });
                u = " | ";
                i += e && e.length > 0 ? "Age: " + e + u : "";
                i += o && o.length > 0 ? "Gender: " + o + u : "";
                i += s && s.length > 0 ? "Spouse Age: " + s + u : "";
                f.length > 0 && (i += "Dependent Ages: " + f.join(","));
                i && i.length > 0 && (i = "Employee [ " + i + " ]", t.push(i))
            });
            n("#EmployeeDetails").val(t.join(" \n "))
        };
        n(t + " .submit-btn").click(function(i) {
            i.preventDefault();
            i.stopPropagation();
            n(t).isValid(null, {
                ignore: []
            }) && (s(), n(t).submit())
        });
        n.validate({
            modules: "date, toggleDisabled",
            form: t,
            disabledFormFilter: t
        })
    }(jQuery);
$(function() {
    $('a[href="#toggle-search"], .bootsnipp-search .input-group-btn > .btn[type="reset"]').on("click", function(n) {
        n.preventDefault();
        $(".bootsnipp-search .input-group > input").val("");
        $(".bootsnipp-search").toggleClass("open");
        $(".js-nav-items").toggleClass("hidden");
        $('a[href="#toggle-search"]').closest("li").toggleClass("active");
        $(".bootsnipp-search").hasClass("open") && setTimeout(function() {
            $(".bootsnipp-search .form-control").focus()
        }, 100)
    });
    $(document).on("keyup", function(n) {
        n.which == 27 && $(".bootsnipp-search").hasClass("open") && $('a[href="#toggle-search"]').trigger("click")
    });
    $(".js-contact-form").length > 0 && $(window).resize(function() {
        var n, t, i;
        $(window).width() <= 991 ? (n = 0, n = $(window).width() < 768 ? 40 : 20, t = $(".get-in-touch").height(), i = t + n, $(".js-contact-form").css("top", i + "px")) : $(".js-contact-form").css("top", "0")
    })
});
$(function() {
    typeof FormPostBack != "undefined" && FormPostBack && $("#contactFormModal").modal()
});
$(function() {
    $("input.pick-a-date-picker").each(function() {
        var n = this.id;
        new Pikaday({
            field: document.getElementById(n),
            inputformat: "YYYY-MM-DD",
            format: "YYYY-MM-DD",
            yearRange: 150
        })
    })
});
$(function() {
    $(".js-view-all-button").click(function(n) {
        var t = $(n.currentTarget).data("class");
        $("." + t).removeClass("hidden")
    })
});
$(function() {
    for (var t, i = (new Date).getFullYear(), n = 0; n < 20; n++) t = i - n, $('select[data-val-required="Please provide a value for Year of Built"],select[data-val-required="Please provide a value for Year of Make"] ').append('<option value="' + t + '">' + t + "<\/option>")
});
$(function() {
        $("select[data-selected]").each(function(n, t) {
            var i = $(t),
                r = i.data("selected");
            i.find("option[value='" + r + "']").attr("selected", "selected")
        })
    }),
    function() {
        $(document).ready(function() {
            $(".search-bar-button").click(function() {
                $(".search-bar-cols-bar").hasClass("showing") ? ($(".search-bar-cols-bar").removeClass("showing"), $(".util-nav-cols").show(), $(".search-bar-cols").add("col-md-4").removeClass("col-md-12"), $(".search-bar-cols-extras").removeClass("hidden"), $(".search-bar-cols-bar").addClass("hidden")) : ($(".search-bar-cols-bar").addClass("showing"), $(".util-nav-cols").hide(), $(".search-bar-cols").removeClass("col-md-4").addClass("col-md-12"), $(".search-bar-cols-extras").addClass("hidden"), $(".search-bar-cols-bar").removeClass("hidden"))
            })
        })
    }(),
    function() {
        var n = window.location,
            t = function(n) {
                for (var u = decodeURIComponent(window.location.hash.substring(1)), r = u.split("&"), t, i = 0; i < r.length; i++)
                    if (t = r[i].split("="), t[0] === n) return t[1] === undefined ? !0 : t[1]
            };
        $(document).ready(function() {
            var e = function(n) {
                    $("#panel" + n + "-tab").click()
                },
                o = function(n) {
                    $("#Doc" + n + "-link").closest(".level-1").length > 0 && $("#Doc" + n + "-link").closest(".level-1").click();
                    $("#Doc" + n + "-link").closest(".level-2").length > 0 && $("#Doc" + n + "-link").closest(".level-2").click();
                    $("#Doc" + n + "-link").click()
                },
                i = t("tid"),
                r = t("did"),
                u, f;
            i && e(i);
            r && o(r);
            u = function(t) {
                var u = $(t.currentTarget),
                    f = u.data("tab-id"),
                    i = n,
                    r = i.toString().replace(n.hash, "");
                console.log("baseUrl: " + r);
                console.log("hash: " + n.search);
                i = r + "#tid=" + f;
                n.replace(i)
            };
            f = function(t) {
                t.stopPropagation();
                var u = $(t.currentTarget),
                    f = u.data("doc-id"),
                    e = $(".responsive-tabs li.active").find("a.inav-tab").data("tab-id"),
                    i = n,
                    r = i.toString().replace(n.hash, "");
                console.log("baseUrl: " + r);
                console.log("hash: " + n.hash);
                i = r + "#tid=" + e + "&did=" + f;
                n.replace(i)
            };
            $(".responsive-tabs-container").on("click", ".inav-tab", u);
            $(".inav-doc").on("click", f)
        })
    }(null)