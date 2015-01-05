
! function (a) {
    "use strict";

    function b(a, b) {
        try {
            a.style.display = "none", b.removeChild(a)
        } catch (c) {
            e._debug && (console.log(c), console.log("error removing node"))
        }
    }

    function c(a) {
        e._debug && console.log("message received main window", a.data);
        try {
            var c = JSON.parse(a.data);
            if ("hapi-connect-close" === c.type && f && (b(f, h), e.onClose && e.onClose(), g && b(g, h), h.style.overflow = i), "hapi-connect-finish" === c.type && f && (f.style.display = "none", e.onFinish && e.onFinish(null, c.token), g && b(g, h), h.style.overflow = i), "hapi-connect-open" === c.type && (store && store.set("humanapiSessionToken", c.token.sessionToken), g && b(g, h), h.style.overflow = "hidden"), "hapi-connect-popup-iframe" === c.type && k(c.url, "hapi-popup-iframe"), "hapi-close-popup-iframe" === c.type) {
                var d = document.getElementById("hapi-popup-iframe");
                d.parentElement.removeChild(d), f.contentWindow.postMessage(JSON.stringify({
                    type: "hapi-external-auth-added"
                }), "*")
            }
        } catch (j) {
            e._debug && (console.log(j), console.log("error parsing message"))
        }
    }
    var d = "https://connect.humanapi.co",
        e = {},
        f = null,
        g = null;
    if (!a.HumanConnect) {
        var h = document.getElementsByTagName("body")[0] || document.documentElement,
            i = h.style.overflow;
        a.addEventListener ? a.addEventListener("message", c, !1) : a.attachEvent && a.attachEvent("onmessage", c);
        var j = function (a, b, c) {
                var f = d + "?clientUserId=" + b,
                    g = e.publicToken;
                return f += g ? "&publicToken=" + g : "&clientId=" + a, c && (f += "&sessionToken= " + c), e.iframeFlag && (f += "&iframeFlag=1"), f += "&lang=" + e.language, e._isDevPortal && (f += "&devPortal=1"), k(f, !1)
            },
            k = function (a, b) {
                var c = document.createElement("iframe");
                return b !== !1 && (c.id = b), c.src = a, c.style.position = "fixed", c.style.top = "0", c.style.left = "0", c.style.width = "100%", c.style.height = "100%", c.style.display = "block", c.style.margin = "0", c.style.padding = "0", c.style.border = "0px none transparent", c.style.visibility = "visible", c.style.backgroundColor = "transparent", c.style.overflowX = "hidden", c.style.overflowY = "auto", c.style["-webkit-tap-highlight-color"] = "transparent", c.style.zIndex = "99999", c.setAttribute("frameBorder", "0"), c.setAttribute("allowtransparency", "true"), h.appendChild(c), c
            },
            l = function () {
                var a = document.createElement("img");
                return a.src = d + "/spinner.gif", a.style.height = "30px", a.style.width = "30px", a.style.position = "fixed", a.style.top = "50%", a.style.left = "50%", a.style.marginLeft = "-15px", a.style.zIndex = "99999", h.appendChild(a), a
            },
            m = document.getElementsByTagName("head")[0] || document.documentElement,
            n = function (a) {
                m.insertBefore(a, m.firstChild)
            },
            o = function (a, b, c) {
                var d = document.createElement("script");
                if (d.src = a, "function" == typeof b) {
                    var e;
                    d.onload = d.onreadystatechange = function () {
                        e || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (e = !0, setTimeout(b, 0), d.onload = d.onreadystatechange = null)
                    }
                }
                "function" == typeof c && (d.onerror = c), n(d)
            };
        e.open = function (a) {
            g = l();
            var b = a.clientId,
                c = a.clientUserId;
            a._baseURL && (d = a._baseURL);
            var h = a.publicToken || e.publicToken;
            e.publicToken = h, e.onFinish = a.finish, e.onClose = a.close, e.iframeFlag = a.iframe, e._debug = a._debug, e._isDevPortal = a._isDevPortal, e.language = a.language || "en", o(d + "/store.min.js", function () {
                f = j(b, c, store.get("humanapiSessionToken"))
            }, function () {
                f = j(b, c, null)
            })
        }, e.setPublicToken = function (a) {
            e.publicToken = a
        }, a.HumanConnect = e
    }
}(this);