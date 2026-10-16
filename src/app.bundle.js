(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/core/qrcode.min.js
  var require_qrcode_min = __commonJS({
    "src/core/qrcode.min.js"(exports, module) {
      var qrcode2 = (function() {
        function i(t2, r2) {
          function a2(t3, r3) {
            g2 = (function(t4) {
              for (var r4 = new Array(t4), e3 = 0; e3 < t4; e3 += 1) {
                r4[e3] = new Array(t4);
                for (var n3 = 0; n3 < t4; n3 += 1) r4[e3][n3] = null;
              }
              return r4;
            })(l2 = 4 * u2 + 17), e2(0, 0), e2(l2 - 7, 0), e2(0, l2 - 7), i2(), o2(), v2(t3, r3), 7 <= u2 && h2(t3), null == n2 && (n2 = w2(u2, f2, c2)), d2(n2, r3);
          }
          var u2 = t2, f2 = y[r2], g2 = null, l2 = 0, n2 = null, c2 = [], s2 = {}, e2 = function(t3, r3) {
            for (var e3 = -1; e3 <= 7; e3 += 1) if (!(t3 + e3 <= -1 || l2 <= t3 + e3)) for (var n3 = -1; n3 <= 7; n3 += 1) r3 + n3 <= -1 || l2 <= r3 + n3 || (g2[t3 + e3][r3 + n3] = 0 <= e3 && e3 <= 6 && (0 == n3 || 6 == n3) || 0 <= n3 && n3 <= 6 && (0 == e3 || 6 == e3) || 2 <= e3 && e3 <= 4 && 2 <= n3 && n3 <= 4);
          }, o2 = function() {
            for (var t3 = 8; t3 < l2 - 8; t3 += 1) null == g2[t3][6] && (g2[t3][6] = t3 % 2 == 0);
            for (var r3 = 8; r3 < l2 - 8; r3 += 1) null == g2[6][r3] && (g2[6][r3] = r3 % 2 == 0);
          }, i2 = function() {
            for (var t3 = B.getPatternPosition(u2), r3 = 0; r3 < t3.length; r3 += 1) for (var e3 = 0; e3 < t3.length; e3 += 1) {
              var n3 = t3[r3], o3 = t3[e3];
              if (null == g2[n3][o3]) for (var i3 = -2; i3 <= 2; i3 += 1) for (var a3 = -2; a3 <= 2; a3 += 1) g2[n3 + i3][o3 + a3] = -2 == i3 || 2 == i3 || -2 == a3 || 2 == a3 || 0 == i3 && 0 == a3;
            }
          }, h2 = function(t3) {
            for (var r3 = B.getBCHTypeNumber(u2), e3 = 0; e3 < 18; e3 += 1) {
              var n3 = !t3 && 1 == (r3 >> e3 & 1);
              g2[Math.floor(e3 / 3)][e3 % 3 + l2 - 8 - 3] = n3;
            }
            for (e3 = 0; e3 < 18; e3 += 1) {
              n3 = !t3 && 1 == (r3 >> e3 & 1);
              g2[e3 % 3 + l2 - 8 - 3][Math.floor(e3 / 3)] = n3;
            }
          }, v2 = function(t3, r3) {
            for (var e3 = f2 << 3 | r3, n3 = B.getBCHTypeInfo(e3), o3 = 0; o3 < 15; o3 += 1) {
              var i3 = !t3 && 1 == (n3 >> o3 & 1);
              o3 < 6 ? g2[o3][8] = i3 : o3 < 8 ? g2[o3 + 1][8] = i3 : g2[l2 - 15 + o3][8] = i3;
            }
            for (o3 = 0; o3 < 15; o3 += 1) {
              i3 = !t3 && 1 == (n3 >> o3 & 1);
              o3 < 8 ? g2[8][l2 - o3 - 1] = i3 : o3 < 9 ? g2[8][15 - o3 - 1 + 1] = i3 : g2[8][15 - o3 - 1] = i3;
            }
            g2[l2 - 8][8] = !t3;
          }, d2 = function(t3, r3) {
            for (var e3 = -1, n3 = l2 - 1, o3 = 7, i3 = 0, a3 = B.getMaskFunction(r3), u3 = l2 - 1; 0 < u3; u3 -= 2) for (6 == u3 && (u3 -= 1); ; ) {
              for (var f3 = 0; f3 < 2; f3 += 1) if (null == g2[n3][u3 - f3]) {
                var c3 = false;
                i3 < t3.length && (c3 = 1 == (t3[i3] >>> o3 & 1)), a3(n3, u3 - f3) && (c3 = !c3), g2[n3][u3 - f3] = c3, -1 == (o3 -= 1) && (i3 += 1, o3 = 7);
              }
              if ((n3 += e3) < 0 || l2 <= n3) {
                n3 -= e3, e3 = -e3;
                break;
              }
            }
          }, w2 = function(t3, r3, e3) {
            for (var n3 = b.getRSBlocks(t3, r3), o3 = M(), i3 = 0; i3 < e3.length; i3 += 1) {
              var a3 = e3[i3];
              o3.put(a3.getMode(), 4), o3.put(a3.getLength(), B.getLengthInBits(a3.getMode(), t3)), a3.write(o3);
            }
            var u3 = 0;
            for (i3 = 0; i3 < n3.length; i3 += 1) u3 += n3[i3].dataCount;
            if (o3.getLengthInBits() > 8 * u3) throw "code length overflow. (" + o3.getLengthInBits() + ">" + 8 * u3 + ")";
            for (o3.getLengthInBits() + 4 <= 8 * u3 && o3.put(0, 4); o3.getLengthInBits() % 8 != 0; ) o3.putBit(false);
            for (; !(o3.getLengthInBits() >= 8 * u3 || (o3.put(236, 8), o3.getLengthInBits() >= 8 * u3)); ) o3.put(17, 8);
            return (function(t4, r4) {
              for (var e4 = 0, n4 = 0, o4 = 0, i4 = new Array(r4.length), a4 = new Array(r4.length), u4 = 0; u4 < r4.length; u4 += 1) {
                var f3 = r4[u4].dataCount, c3 = r4[u4].totalCount - f3;
                n4 = Math.max(n4, f3), o4 = Math.max(o4, c3), i4[u4] = new Array(f3);
                for (var g3 = 0; g3 < i4[u4].length; g3 += 1) i4[u4][g3] = 255 & t4.getBuffer()[g3 + e4];
                e4 += f3;
                var l3 = B.getErrorCorrectPolynomial(c3), h3 = C(i4[u4], l3.getLength() - 1).mod(l3);
                a4[u4] = new Array(l3.getLength() - 1);
                for (g3 = 0; g3 < a4[u4].length; g3 += 1) {
                  var s3 = g3 + h3.getLength() - a4[u4].length;
                  a4[u4][g3] = 0 <= s3 ? h3.getAt(s3) : 0;
                }
              }
              var v3 = 0;
              for (g3 = 0; g3 < r4.length; g3 += 1) v3 += r4[g3].totalCount;
              var d3 = new Array(v3), w3 = 0;
              for (g3 = 0; g3 < n4; g3 += 1) for (u4 = 0; u4 < r4.length; u4 += 1) g3 < i4[u4].length && (d3[w3] = i4[u4][g3], w3 += 1);
              for (g3 = 0; g3 < o4; g3 += 1) for (u4 = 0; u4 < r4.length; u4 += 1) g3 < a4[u4].length && (d3[w3] = a4[u4][g3], w3 += 1);
              return d3;
            })(o3, n3);
          };
          s2.addData = function(t3, r3) {
            var e3 = null;
            switch (r3 = r3 || "Byte") {
              case "Numeric":
                e3 = x(t3);
                break;
              case "Alphanumeric":
                e3 = m(t3);
                break;
              case "Byte":
                e3 = L(t3);
                break;
              case "Kanji":
                e3 = D(t3);
                break;
              default:
                throw "mode:" + r3;
            }
            c2.push(e3), n2 = null;
          }, s2.isDark = function(t3, r3) {
            if (t3 < 0 || l2 <= t3 || r3 < 0 || l2 <= r3) throw t3 + "," + r3;
            return g2[t3][r3];
          }, s2.getModuleCount = function() {
            return l2;
          }, s2.make = function() {
            if (u2 < 1) {
              for (var t3 = 1; t3 < 40; t3++) {
                for (var r3 = b.getRSBlocks(t3, f2), e3 = M(), n3 = 0; n3 < c2.length; n3++) {
                  var o3 = c2[n3];
                  e3.put(o3.getMode(), 4), e3.put(o3.getLength(), B.getLengthInBits(o3.getMode(), t3)), o3.write(e3);
                }
                var i3 = 0;
                for (n3 = 0; n3 < r3.length; n3++) i3 += r3[n3].dataCount;
                if (e3.getLengthInBits() <= 8 * i3) break;
              }
              u2 = t3;
            }
            a2(false, (function() {
              for (var t4 = 0, r4 = 0, e4 = 0; e4 < 8; e4 += 1) {
                a2(true, e4);
                var n4 = B.getLostPoint(s2);
                (0 == e4 || n4 < t4) && (t4 = n4, r4 = e4);
              }
              return r4;
            })());
          }, s2.createTableTag = function(t3, r3) {
            t3 = t3 || 2;
            var e3 = "";
            e3 += '<table style="', e3 += " border-width: 0px; border-style: none;", e3 += " border-collapse: collapse;", e3 += " padding: 0px; margin: " + (r3 = void 0 === r3 ? 4 * t3 : r3) + "px;", e3 += '">', e3 += "<tbody>";
            for (var n3 = 0; n3 < s2.getModuleCount(); n3 += 1) {
              e3 += "<tr>";
              for (var o3 = 0; o3 < s2.getModuleCount(); o3 += 1) e3 += '<td style="', e3 += " border-width: 0px; border-style: none;", e3 += " border-collapse: collapse;", e3 += " padding: 0px; margin: 0px;", e3 += " width: " + t3 + "px;", e3 += " height: " + t3 + "px;", e3 += " background-color: ", e3 += s2.isDark(n3, o3) ? "#000000" : "#ffffff", e3 += ";", e3 += '"/>';
              e3 += "</tr>";
            }
            return e3 += "</tbody>", e3 += "</table>";
          }, s2.createSvgTag = function(t3, r3, e3, n3) {
            var o3 = {};
            "object" == typeof t3 && (t3 = (o3 = t3).cellSize, r3 = o3.margin, e3 = o3.alt, n3 = o3.title), t3 = t3 || 2, r3 = void 0 === r3 ? 4 * t3 : r3, (e3 = "string" == typeof e3 ? { text: e3 } : e3 || {}).text = e3.text || null, e3.id = e3.text ? e3.id || "qrcode-description" : null, (n3 = "string" == typeof n3 ? { text: n3 } : n3 || {}).text = n3.text || null, n3.id = n3.text ? n3.id || "qrcode-title" : null;
            var i3, a3, u3, f3, c3 = s2.getModuleCount() * t3 + 2 * r3, g3 = "";
            for (f3 = "l" + t3 + ",0 0," + t3 + " -" + t3 + ",0 0,-" + t3 + "z ", g3 += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"', g3 += o3.scalable ? "" : ' width="' + c3 + 'px" height="' + c3 + 'px"', g3 += ' viewBox="0 0 ' + c3 + " " + c3 + '" ', g3 += ' preserveAspectRatio="xMinYMin meet"', g3 += n3.text || e3.text ? ' role="img" aria-labelledby="' + p2([n3.id, e3.id].join(" ").trim()) + '"' : "", g3 += ">", g3 += n3.text ? '<title id="' + p2(n3.id) + '">' + p2(n3.text) + "</title>" : "", g3 += e3.text ? '<description id="' + p2(e3.id) + '">' + p2(e3.text) + "</description>" : "", g3 += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>', g3 += '<path d="', a3 = 0; a3 < s2.getModuleCount(); a3 += 1) for (u3 = a3 * t3 + r3, i3 = 0; i3 < s2.getModuleCount(); i3 += 1) s2.isDark(a3, i3) && (g3 += "M" + (i3 * t3 + r3) + "," + u3 + f3);
            return g3 += '" stroke="transparent" fill="black"/>', g3 += "</svg>";
          }, s2.createDataURL = function(o3, t3) {
            o3 = o3 || 2, t3 = void 0 === t3 ? 4 * o3 : t3;
            var r3 = s2.getModuleCount() * o3 + 2 * t3, i3 = t3, a3 = r3 - t3;
            return I(r3, r3, function(t4, r4) {
              if (i3 <= t4 && t4 < a3 && i3 <= r4 && r4 < a3) {
                var e3 = Math.floor((t4 - i3) / o3), n3 = Math.floor((r4 - i3) / o3);
                return s2.isDark(n3, e3) ? 0 : 1;
              }
              return 1;
            });
          }, s2.createImgTag = function(t3, r3, e3) {
            t3 = t3 || 2, r3 = void 0 === r3 ? 4 * t3 : r3;
            var n3 = s2.getModuleCount() * t3 + 2 * r3, o3 = "";
            return o3 += "<img", o3 += ' src="', o3 += s2.createDataURL(t3, r3), o3 += '"', o3 += ' width="', o3 += n3, o3 += '"', o3 += ' height="', o3 += n3, o3 += '"', e3 && (o3 += ' alt="', o3 += p2(e3), o3 += '"'), o3 += "/>";
          };
          var p2 = function(t3) {
            for (var r3 = "", e3 = 0; e3 < t3.length; e3 += 1) {
              var n3 = t3.charAt(e3);
              switch (n3) {
                case "<":
                  r3 += "&lt;";
                  break;
                case ">":
                  r3 += "&gt;";
                  break;
                case "&":
                  r3 += "&amp;";
                  break;
                case '"':
                  r3 += "&quot;";
                  break;
                default:
                  r3 += n3;
              }
            }
            return r3;
          };
          return s2.createASCII = function(t3, r3) {
            if ((t3 = t3 || 1) < 2) return (function(t4) {
              t4 = void 0 === t4 ? 2 : t4;
              var r4, e4, n4, o4, i4, a4 = 1 * s2.getModuleCount() + 2 * t4, u4 = t4, f4 = a4 - t4, c4 = { "\u2588\u2588": "\u2588", "\u2588 ": "\u2580", " \u2588": "\u2584", "  ": " " }, g4 = { "\u2588\u2588": "\u2580", "\u2588 ": "\u2580", " \u2588": " ", "  ": " " }, l4 = "";
              for (r4 = 0; r4 < a4; r4 += 2) {
                for (n4 = Math.floor((r4 - u4) / 1), o4 = Math.floor((r4 + 1 - u4) / 1), e4 = 0; e4 < a4; e4 += 1) i4 = "\u2588", u4 <= e4 && e4 < f4 && u4 <= r4 && r4 < f4 && s2.isDark(n4, Math.floor((e4 - u4) / 1)) && (i4 = " "), u4 <= e4 && e4 < f4 && u4 <= r4 + 1 && r4 + 1 < f4 && s2.isDark(o4, Math.floor((e4 - u4) / 1)) ? i4 += " " : i4 += "\u2588", l4 += t4 < 1 && f4 <= r4 + 1 ? g4[i4] : c4[i4];
                l4 += "\n";
              }
              return a4 % 2 && 0 < t4 ? l4.substring(0, l4.length - a4 - 1) + Array(1 + a4).join("\u2580") : l4.substring(0, l4.length - 1);
            })(r3);
            t3 -= 1, r3 = void 0 === r3 ? 2 * t3 : r3;
            var e3, n3, o3, i3, a3 = s2.getModuleCount() * t3 + 2 * r3, u3 = r3, f3 = a3 - r3, c3 = Array(t3 + 1).join("\u2588\u2588"), g3 = Array(t3 + 1).join("  "), l3 = "", h3 = "";
            for (e3 = 0; e3 < a3; e3 += 1) {
              for (o3 = Math.floor((e3 - u3) / t3), h3 = "", n3 = 0; n3 < a3; n3 += 1) i3 = 1, u3 <= n3 && n3 < f3 && u3 <= e3 && e3 < f3 && s2.isDark(o3, Math.floor((n3 - u3) / t3)) && (i3 = 0), h3 += i3 ? c3 : g3;
              for (o3 = 0; o3 < t3; o3 += 1) l3 += h3 + "\n";
            }
            return l3.substring(0, l3.length - 1);
          }, s2.renderTo2dContext = function(t3, r3) {
            r3 = r3 || 2;
            for (var e3 = s2.getModuleCount(), n3 = 0; n3 < e3; n3++) for (var o3 = 0; o3 < e3; o3++) t3.fillStyle = s2.isDark(n3, o3) ? "black" : "white", t3.fillRect(n3 * r3, o3 * r3, r3, r3);
          }, s2;
        }
        i.stringToBytes = (i.stringToBytesFuncs = { default: function(t2) {
          for (var r2 = [], e2 = 0; e2 < t2.length; e2 += 1) {
            var n2 = t2.charCodeAt(e2);
            r2.push(255 & n2);
          }
          return r2;
        } }).default, i.createStringToBytes = function(u2, f2) {
          var i2 = (function() {
            function t2() {
              var t3 = r2.read();
              if (-1 == t3) throw "eof";
              return t3;
            }
            for (var r2 = S(u2), e2 = 0, n2 = {}; ; ) {
              var o2 = r2.read();
              if (-1 == o2) break;
              var i3 = t2(), a3 = t2() << 8 | t2();
              n2[String.fromCharCode(o2 << 8 | i3)] = a3, e2 += 1;
            }
            if (e2 != f2) throw e2 + " != " + f2;
            return n2;
          })(), a2 = "?".charCodeAt(0);
          return function(t2) {
            for (var r2 = [], e2 = 0; e2 < t2.length; e2 += 1) {
              var n2 = t2.charCodeAt(e2);
              if (n2 < 128) r2.push(n2);
              else {
                var o2 = i2[t2.charAt(e2)];
                "number" == typeof o2 ? (255 & o2) == o2 ? r2.push(o2) : (r2.push(o2 >>> 8), r2.push(255 & o2)) : r2.push(a2);
              }
            }
            return r2;
          };
        };
        var r, t, a = 1, u = 2, o = 4, f = 8, y = { L: 1, M: 0, Q: 3, H: 2 }, e = 0, n = 1, c = 2, g = 3, l = 4, h = 5, s = 6, v = 7, B = (r = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], (t = {}).getBCHTypeInfo = function(t2) {
          for (var r2 = t2 << 10; 0 <= d(r2) - d(1335); ) r2 ^= 1335 << d(r2) - d(1335);
          return 21522 ^ (t2 << 10 | r2);
        }, t.getBCHTypeNumber = function(t2) {
          for (var r2 = t2 << 12; 0 <= d(r2) - d(7973); ) r2 ^= 7973 << d(r2) - d(7973);
          return t2 << 12 | r2;
        }, t.getPatternPosition = function(t2) {
          return r[t2 - 1];
        }, t.getMaskFunction = function(t2) {
          switch (t2) {
            case e:
              return function(t3, r2) {
                return (t3 + r2) % 2 == 0;
              };
            case n:
              return function(t3, r2) {
                return t3 % 2 == 0;
              };
            case c:
              return function(t3, r2) {
                return r2 % 3 == 0;
              };
            case g:
              return function(t3, r2) {
                return (t3 + r2) % 3 == 0;
              };
            case l:
              return function(t3, r2) {
                return (Math.floor(t3 / 2) + Math.floor(r2 / 3)) % 2 == 0;
              };
            case h:
              return function(t3, r2) {
                return t3 * r2 % 2 + t3 * r2 % 3 == 0;
              };
            case s:
              return function(t3, r2) {
                return (t3 * r2 % 2 + t3 * r2 % 3) % 2 == 0;
              };
            case v:
              return function(t3, r2) {
                return (t3 * r2 % 3 + (t3 + r2) % 2) % 2 == 0;
              };
            default:
              throw "bad maskPattern:" + t2;
          }
        }, t.getErrorCorrectPolynomial = function(t2) {
          for (var r2 = C([1], 0), e2 = 0; e2 < t2; e2 += 1) r2 = r2.multiply(C([1, w.gexp(e2)], 0));
          return r2;
        }, t.getLengthInBits = function(t2, r2) {
          if (1 <= r2 && r2 < 10) switch (t2) {
            case a:
              return 10;
            case u:
              return 9;
            case o:
            case f:
              return 8;
            default:
              throw "mode:" + t2;
          }
          else if (r2 < 27) switch (t2) {
            case a:
              return 12;
            case u:
              return 11;
            case o:
              return 16;
            case f:
              return 10;
            default:
              throw "mode:" + t2;
          }
          else {
            if (!(r2 < 41)) throw "type:" + r2;
            switch (t2) {
              case a:
                return 14;
              case u:
                return 13;
              case o:
                return 16;
              case f:
                return 12;
              default:
                throw "mode:" + t2;
            }
          }
        }, t.getLostPoint = function(t2) {
          for (var r2 = t2.getModuleCount(), e2 = 0, n2 = 0; n2 < r2; n2 += 1) for (var o2 = 0; o2 < r2; o2 += 1) {
            for (var i2 = 0, a2 = t2.isDark(n2, o2), u2 = -1; u2 <= 1; u2 += 1) if (!(n2 + u2 < 0 || r2 <= n2 + u2)) for (var f2 = -1; f2 <= 1; f2 += 1) o2 + f2 < 0 || r2 <= o2 + f2 || 0 == u2 && 0 == f2 || a2 == t2.isDark(n2 + u2, o2 + f2) && (i2 += 1);
            5 < i2 && (e2 += 3 + i2 - 5);
          }
          for (n2 = 0; n2 < r2 - 1; n2 += 1) for (o2 = 0; o2 < r2 - 1; o2 += 1) {
            var c2 = 0;
            t2.isDark(n2, o2) && (c2 += 1), t2.isDark(n2 + 1, o2) && (c2 += 1), t2.isDark(n2, o2 + 1) && (c2 += 1), t2.isDark(n2 + 1, o2 + 1) && (c2 += 1), 0 != c2 && 4 != c2 || (e2 += 3);
          }
          for (n2 = 0; n2 < r2; n2 += 1) for (o2 = 0; o2 < r2 - 6; o2 += 1) t2.isDark(n2, o2) && !t2.isDark(n2, o2 + 1) && t2.isDark(n2, o2 + 2) && t2.isDark(n2, o2 + 3) && t2.isDark(n2, o2 + 4) && !t2.isDark(n2, o2 + 5) && t2.isDark(n2, o2 + 6) && (e2 += 40);
          for (o2 = 0; o2 < r2; o2 += 1) for (n2 = 0; n2 < r2 - 6; n2 += 1) t2.isDark(n2, o2) && !t2.isDark(n2 + 1, o2) && t2.isDark(n2 + 2, o2) && t2.isDark(n2 + 3, o2) && t2.isDark(n2 + 4, o2) && !t2.isDark(n2 + 5, o2) && t2.isDark(n2 + 6, o2) && (e2 += 40);
          var g2 = 0;
          for (o2 = 0; o2 < r2; o2 += 1) for (n2 = 0; n2 < r2; n2 += 1) t2.isDark(n2, o2) && (g2 += 1);
          return e2 += Math.abs(100 * g2 / r2 / r2 - 50) / 5 * 10;
        }, t);
        function d(t2) {
          for (var r2 = 0; 0 != t2; ) r2 += 1, t2 >>>= 1;
          return r2;
        }
        var w = (function() {
          for (var r2 = new Array(256), e2 = new Array(256), t2 = 0; t2 < 8; t2 += 1) r2[t2] = 1 << t2;
          for (t2 = 8; t2 < 256; t2 += 1) r2[t2] = r2[t2 - 4] ^ r2[t2 - 5] ^ r2[t2 - 6] ^ r2[t2 - 8];
          for (t2 = 0; t2 < 255; t2 += 1) e2[r2[t2]] = t2;
          var n2 = { glog: function(t3) {
            if (t3 < 1) throw "glog(" + t3 + ")";
            return e2[t3];
          }, gexp: function(t3) {
            for (; t3 < 0; ) t3 += 255;
            for (; 256 <= t3; ) t3 -= 255;
            return r2[t3];
          } };
          return n2;
        })();
        function C(n2, o2) {
          if (void 0 === n2.length) throw n2.length + "/" + o2;
          var r2 = (function() {
            for (var t2 = 0; t2 < n2.length && 0 == n2[t2]; ) t2 += 1;
            for (var r3 = new Array(n2.length - t2 + o2), e2 = 0; e2 < n2.length - t2; e2 += 1) r3[e2] = n2[e2 + t2];
            return r3;
          })(), i2 = { getAt: function(t2) {
            return r2[t2];
          }, getLength: function() {
            return r2.length;
          }, multiply: function(t2) {
            for (var r3 = new Array(i2.getLength() + t2.getLength() - 1), e2 = 0; e2 < i2.getLength(); e2 += 1) for (var n3 = 0; n3 < t2.getLength(); n3 += 1) r3[e2 + n3] ^= w.gexp(w.glog(i2.getAt(e2)) + w.glog(t2.getAt(n3)));
            return C(r3, 0);
          }, mod: function(t2) {
            if (i2.getLength() - t2.getLength() < 0) return i2;
            for (var r3 = w.glog(i2.getAt(0)) - w.glog(t2.getAt(0)), e2 = new Array(i2.getLength()), n3 = 0; n3 < i2.getLength(); n3 += 1) e2[n3] = i2.getAt(n3);
            for (n3 = 0; n3 < t2.getLength(); n3 += 1) e2[n3] ^= w.gexp(w.glog(t2.getAt(n3)) + r3);
            return C(e2, 0).mod(t2);
          } };
          return i2;
        }
        function p() {
          var e2 = [], o2 = { writeByte: function(t2) {
            e2.push(255 & t2);
          }, writeShort: function(t2) {
            o2.writeByte(t2), o2.writeByte(t2 >>> 8);
          }, writeBytes: function(t2, r2, e3) {
            r2 = r2 || 0, e3 = e3 || t2.length;
            for (var n2 = 0; n2 < e3; n2 += 1) o2.writeByte(t2[n2 + r2]);
          }, writeString: function(t2) {
            for (var r2 = 0; r2 < t2.length; r2 += 1) o2.writeByte(t2.charCodeAt(r2));
          }, toByteArray: function() {
            return e2;
          }, toString: function() {
            var t2 = "";
            t2 += "[";
            for (var r2 = 0; r2 < e2.length; r2 += 1) 0 < r2 && (t2 += ","), t2 += e2[r2];
            return t2 += "]";
          } };
          return o2;
        }
        var k, A, b = (k = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12, 7, 37, 13], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], (A = {}).getRSBlocks = function(t2, r2) {
          var e2 = (function(t3, r3) {
            switch (r3) {
              case y.L:
                return k[4 * (t3 - 1) + 0];
              case y.M:
                return k[4 * (t3 - 1) + 1];
              case y.Q:
                return k[4 * (t3 - 1) + 2];
              case y.H:
                return k[4 * (t3 - 1) + 3];
              default:
                return;
            }
          })(t2, r2);
          if (void 0 === e2) throw "bad rs block @ typeNumber:" + t2 + "/errorCorrectionLevel:" + r2;
          for (var n2, o2, i2 = e2.length / 3, a2 = [], u2 = 0; u2 < i2; u2 += 1) for (var f2 = e2[3 * u2 + 0], c2 = e2[3 * u2 + 1], g2 = e2[3 * u2 + 2], l2 = 0; l2 < f2; l2 += 1) a2.push((n2 = g2, o2 = void 0, (o2 = {}).totalCount = c2, o2.dataCount = n2, o2));
          return a2;
        }, A), M = function() {
          var e2 = [], n2 = 0, o2 = { getBuffer: function() {
            return e2;
          }, getAt: function(t2) {
            var r2 = Math.floor(t2 / 8);
            return 1 == (e2[r2] >>> 7 - t2 % 8 & 1);
          }, put: function(t2, r2) {
            for (var e3 = 0; e3 < r2; e3 += 1) o2.putBit(1 == (t2 >>> r2 - e3 - 1 & 1));
          }, getLengthInBits: function() {
            return n2;
          }, putBit: function(t2) {
            var r2 = Math.floor(n2 / 8);
            e2.length <= r2 && e2.push(0), t2 && (e2[r2] |= 128 >>> n2 % 8), n2 += 1;
          } };
          return o2;
        }, x = function(t2) {
          var r2 = a, n2 = t2, e2 = { getMode: function() {
            return r2;
          }, getLength: function(t3) {
            return n2.length;
          }, write: function(t3) {
            for (var r3 = n2, e3 = 0; e3 + 2 < r3.length; ) t3.put(o2(r3.substring(e3, e3 + 3)), 10), e3 += 3;
            e3 < r3.length && (r3.length - e3 == 1 ? t3.put(o2(r3.substring(e3, e3 + 1)), 4) : r3.length - e3 == 2 && t3.put(o2(r3.substring(e3, e3 + 2)), 7));
          } }, o2 = function(t3) {
            for (var r3 = 0, e3 = 0; e3 < t3.length; e3 += 1) r3 = 10 * r3 + i2(t3.charAt(e3));
            return r3;
          }, i2 = function(t3) {
            if ("0" <= t3 && t3 <= "9") return t3.charCodeAt(0) - "0".charCodeAt(0);
            throw "illegal char :" + t3;
          };
          return e2;
        }, m = function(t2) {
          var r2 = u, n2 = t2, e2 = { getMode: function() {
            return r2;
          }, getLength: function(t3) {
            return n2.length;
          }, write: function(t3) {
            for (var r3 = n2, e3 = 0; e3 + 1 < r3.length; ) t3.put(45 * o2(r3.charAt(e3)) + o2(r3.charAt(e3 + 1)), 11), e3 += 2;
            e3 < r3.length && t3.put(o2(r3.charAt(e3)), 6);
          } }, o2 = function(t3) {
            if ("0" <= t3 && t3 <= "9") return t3.charCodeAt(0) - "0".charCodeAt(0);
            if ("A" <= t3 && t3 <= "Z") return t3.charCodeAt(0) - "A".charCodeAt(0) + 10;
            switch (t3) {
              case " ":
                return 36;
              case "$":
                return 37;
              case "%":
                return 38;
              case "*":
                return 39;
              case "+":
                return 40;
              case "-":
                return 41;
              case ".":
                return 42;
              case "/":
                return 43;
              case ":":
                return 44;
              default:
                throw "illegal char :" + t3;
            }
          };
          return e2;
        }, L = function(t2) {
          var r2 = o, e2 = i.stringToBytes(t2), n2 = { getMode: function() {
            return r2;
          }, getLength: function(t3) {
            return e2.length;
          }, write: function(t3) {
            for (var r3 = 0; r3 < e2.length; r3 += 1) t3.put(e2[r3], 8);
          } };
          return n2;
        }, D = function(t2) {
          var r2 = f, e2 = i.stringToBytesFuncs.SJIS;
          if (!e2) throw "sjis not supported.";
          !(function() {
            var t3 = e2("\u53CB");
            if (2 != t3.length || 38726 != (t3[0] << 8 | t3[1])) throw "sjis not supported.";
          })();
          var o2 = e2(t2), n2 = { getMode: function() {
            return r2;
          }, getLength: function(t3) {
            return ~~(o2.length / 2);
          }, write: function(t3) {
            for (var r3 = o2, e3 = 0; e3 + 1 < r3.length; ) {
              var n3 = (255 & r3[e3]) << 8 | 255 & r3[e3 + 1];
              if (33088 <= n3 && n3 <= 40956) n3 -= 33088;
              else {
                if (!(57408 <= n3 && n3 <= 60351)) throw "illegal char at " + (e3 + 1) + "/" + n3;
                n3 -= 49472;
              }
              n3 = 192 * (n3 >>> 8 & 255) + (255 & n3), t3.put(n3, 13), e3 += 2;
            }
            if (e3 < r3.length) throw "illegal char at " + (e3 + 1);
          } };
          return n2;
        }, S = function(t2) {
          var e2 = t2, n2 = 0, o2 = 0, i2 = 0, r2 = { read: function() {
            for (; i2 < 8; ) {
              if (n2 >= e2.length) {
                if (0 == i2) return -1;
                throw "unexpected end of file./" + i2;
              }
              var t3 = e2.charAt(n2);
              if (n2 += 1, "=" == t3) return i2 = 0, -1;
              t3.match(/^\s$/) || (o2 = o2 << 6 | a2(t3.charCodeAt(0)), i2 += 6);
            }
            var r3 = o2 >>> i2 - 8 & 255;
            return i2 -= 8, r3;
          } }, a2 = function(t3) {
            if (65 <= t3 && t3 <= 90) return t3 - 65;
            if (97 <= t3 && t3 <= 122) return t3 - 97 + 26;
            if (48 <= t3 && t3 <= 57) return t3 - 48 + 52;
            if (43 == t3) return 62;
            if (47 == t3) return 63;
            throw "c:" + t3;
          };
          return r2;
        }, I = function(t2, r2, e2) {
          for (var n2 = (function(t3, r3) {
            var n3 = t3, o3 = r3, l2 = new Array(t3 * r3), e3 = { setPixel: function(t4, r4, e4) {
              l2[r4 * n3 + t4] = e4;
            }, write: function(t4) {
              t4.writeString("GIF87a"), t4.writeShort(n3), t4.writeShort(o3), t4.writeByte(128), t4.writeByte(0), t4.writeByte(0), t4.writeByte(0), t4.writeByte(0), t4.writeByte(0), t4.writeByte(255), t4.writeByte(255), t4.writeByte(255), t4.writeString(","), t4.writeShort(0), t4.writeShort(0), t4.writeShort(n3), t4.writeShort(o3), t4.writeByte(0);
              var r4 = i3(2);
              t4.writeByte(2);
              for (var e4 = 0; 255 < r4.length - e4; ) t4.writeByte(255), t4.writeBytes(r4, e4, 255), e4 += 255;
              t4.writeByte(r4.length - e4), t4.writeBytes(r4, e4, r4.length - e4), t4.writeByte(0), t4.writeString(";");
            } }, i3 = function(t4) {
              for (var r4 = 1 << t4, e4 = 1 + (1 << t4), n4 = t4 + 1, o4 = h2(), i4 = 0; i4 < r4; i4 += 1) o4.add(String.fromCharCode(i4));
              o4.add(String.fromCharCode(r4)), o4.add(String.fromCharCode(e4));
              var a3 = p(), u3 = /* @__PURE__ */ (function(t5) {
                var e5 = t5, n5 = 0, o5 = 0, r5 = { write: function(t6, r6) {
                  if (t6 >>> r6 != 0) throw "length over";
                  for (; 8 <= n5 + r6; ) e5.writeByte(255 & (t6 << n5 | o5)), r6 -= 8 - n5, t6 >>>= 8 - n5, n5 = o5 = 0;
                  o5 |= t6 << n5, n5 += r6;
                }, flush: function() {
                  0 < n5 && e5.writeByte(o5);
                } };
                return r5;
              })(a3);
              u3.write(r4, n4);
              var f3 = 0, c3 = String.fromCharCode(l2[f3]);
              for (f3 += 1; f3 < l2.length; ) {
                var g2 = String.fromCharCode(l2[f3]);
                f3 += 1, o4.contains(c3 + g2) ? c3 += g2 : (u3.write(o4.indexOf(c3), n4), o4.size() < 4095 && (o4.size() == 1 << n4 && (n4 += 1), o4.add(c3 + g2)), c3 = g2);
              }
              return u3.write(o4.indexOf(c3), n4), u3.write(e4, n4), u3.flush(), a3.toByteArray();
            }, h2 = function() {
              var r4 = {}, e4 = 0, n4 = { add: function(t4) {
                if (n4.contains(t4)) throw "dup key:" + t4;
                r4[t4] = e4, e4 += 1;
              }, size: function() {
                return e4;
              }, indexOf: function(t4) {
                return r4[t4];
              }, contains: function(t4) {
                return void 0 !== r4[t4];
              } };
              return n4;
            };
            return e3;
          })(t2, r2), o2 = 0; o2 < r2; o2 += 1) for (var i2 = 0; i2 < t2; i2 += 1) n2.setPixel(i2, o2, e2(i2, o2));
          var a2 = p();
          n2.write(a2);
          for (var u2 = (function() {
            function e3(t4) {
              a3 += String.fromCharCode(r3(63 & t4));
            }
            var n3 = 0, o3 = 0, i3 = 0, a3 = "", t3 = {}, r3 = function(t4) {
              if (t4 < 0) ;
              else {
                if (t4 < 26) return 65 + t4;
                if (t4 < 52) return t4 - 26 + 97;
                if (t4 < 62) return t4 - 52 + 48;
                if (62 == t4) return 43;
                if (63 == t4) return 47;
              }
              throw "n:" + t4;
            };
            return t3.writeByte = function(t4) {
              for (n3 = n3 << 8 | 255 & t4, o3 += 8, i3 += 1; 6 <= o3; ) e3(n3 >>> o3 - 6), o3 -= 6;
            }, t3.flush = function() {
              if (0 < o3 && (e3(n3 << 6 - o3), o3 = n3 = 0), i3 % 3 != 0) for (var t4 = 3 - i3 % 3, r4 = 0; r4 < t4; r4 += 1) a3 += "=";
            }, t3.toString = function() {
              return a3;
            }, t3;
          })(), f2 = a2.toByteArray(), c2 = 0; c2 < f2.length; c2 += 1) u2.writeByte(f2[c2]);
          return u2.flush(), "data:image/gif;base64," + u2;
        };
        return i;
      })();
      qrcode2.stringToBytesFuncs["UTF-8"] = function(t) {
        return (function(t2) {
          for (var r = [], e = 0; e < t2.length; e++) {
            var n = t2.charCodeAt(e);
            n < 128 ? r.push(n) : n < 2048 ? r.push(192 | n >> 6, 128 | 63 & n) : n < 55296 || 57344 <= n ? r.push(224 | n >> 12, 128 | n >> 6 & 63, 128 | 63 & n) : (e++, n = 65536 + ((1023 & n) << 10 | 1023 & t2.charCodeAt(e)), r.push(240 | n >> 18, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | 63 & n));
          }
          return r;
        })(t);
      }, (function(t) {
        "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports && (module.exports = t());
      })(function() {
        return qrcode2;
      });
    }
  });

  // src/core/presets.js
  var DEFAULT_PRESETS = [
    {
      id: "metalon_50x30_18",
      categoria: "metalon",
      nome: "Metalon 50x30 Chapa 18 (1.20mm)",
      descricao: "Tubo retangular em a\xE7o carbono para requadros e estruturas m\xE9dias",
      dimensaoTexto: "50x30mm",
      unidadeMedida: "barra_6m",
      precoUnitarioPadrao: 110,
      densidadeLinearKgM: 1.45
    },
    {
      id: "metalon_40x40_18",
      categoria: "metalon",
      nome: "Metalon 40x40 Chapa 18 (1.20mm)",
      descricao: "Tubo quadrado para colunas, postes e port\xF5es",
      dimensaoTexto: "40x40mm",
      unidadeMedida: "barra_6m",
      precoUnitarioPadrao: 105,
      densidadeLinearKgM: 1.45
    },
    {
      id: "metalon_30x20_18",
      categoria: "metalon",
      nome: "Metalon 30x20 Chapa 18 (1.20mm)",
      descricao: "Tubo retangular leve para travessas e esquadrias",
      dimensaoTexto: "30x20mm",
      unidadeMedida: "barra_6m",
      precoUnitarioPadrao: 65,
      densidadeLinearKgM: 0.9
    },
    {
      id: "metalon_20x20_18",
      categoria: "metalon",
      nome: "Metalon 20x20 Chapa 18 (1.20mm)",
      descricao: "Tubo quadrado para preenchimento de grades e port\xF5es",
      dimensaoTexto: "20x20mm",
      unidadeMedida: "barra_6m",
      precoUnitarioPadrao: 52,
      densidadeLinearKgM: 0.72
    },
    {
      id: "cantoneira_1_18",
      categoria: "cantoneira",
      nome: 'Cantoneira 1" x 1/8" (25.4 x 3.17mm)',
      descricao: "Perfil L para abas, refor\xE7os e trilhos",
      dimensaoTexto: "25.4x3.17mm",
      unidadeMedida: "barra_6m",
      precoUnitarioPadrao: 78,
      densidadeLinearKgM: 1.2
    },
    {
      id: "barra_chata_1_18",
      categoria: "barra_chata",
      nome: 'Barra Chata 1" x 1/8" (25.4 x 3.17mm)',
      descricao: "Barra chata para travamento, acabamento e detalhes",
      dimensaoTexto: "25.4x3.17mm",
      unidadeMedida: "barra_6m",
      precoUnitarioPadrao: 62,
      densidadeLinearKgM: 0.63
    },
    {
      id: "tubo_redondo_1_12_18",
      categoria: "tubo_redondo",
      nome: 'Tubo Redondo 1.1/2" Chapa 18 (38.1mm)',
      descricao: "Tubo redondo para corrim\xE3o de escada e parapeitos",
      dimensaoTexto: "\xD8 38.1mm",
      unidadeMedida: "barra_6m",
      precoUnitarioPadrao: 88,
      densidadeLinearKgM: 1.1
    },
    {
      id: "eletrodo_6013_25",
      categoria: "insumo_solda",
      nome: "Eletrodo Revestido AWS E6013 2.5mm (Kg)",
      descricao: "Eletrodo azul para serralheria em geral e chapas finas",
      dimensaoTexto: "\xD8 2.5mm",
      unidadeMedida: "kg",
      precoUnitarioPadrao: 28
    },
    {
      id: "disco_corte_4_5",
      categoria: "insumo_solda",
      nome: 'Disco de Corte Fino 4.1/2" x 1.0mm',
      descricao: "Disco de corte r\xE1pido para esmerilhadeira",
      dimensaoTexto: "115 x 1.0mm",
      unidadeMedida: "disco",
      precoUnitarioPadrao: 6.5
    },
    {
      id: "disco_desbaste_4_5",
      categoria: "insumo_solda",
      nome: 'Disco de Desbaste 4.1/2" x 6.0mm',
      descricao: "Disco de desbaste e nivelamento de cord\xF5es de solda",
      dimensaoTexto: "115 x 6.0mm",
      unidadeMedida: "disco",
      precoUnitarioPadrao: 9
    },
    {
      id: "primer_anticorrosivo",
      categoria: "pintura",
      nome: "Fundo Primer Zarc\xE3o / Cinza (Gal\xE3o 3.6L)",
      descricao: "Tinta protetiva anticorrosiva de ader\xEAncia inicial",
      dimensaoTexto: "Gal\xE3o 3.6L",
      unidadeMedida: "litro",
      precoUnitarioPadrao: 24
    },
    {
      id: "esmalte_sintetico_preto",
      categoria: "pintura",
      nome: "Tinta Esmalte Sint\xE9tico Preto Brilhante/Fosco",
      descricao: "Acabamento final de alta durabilidade para serralheria",
      dimensaoTexto: "Gal\xE3o 3.6L",
      unidadeMedida: "litro",
      precoUnitarioPadrao: 32
    },
    {
      id: "roldana_portao_75",
      categoria: "acessorio",
      nome: 'Par de Roldanas em U com Rolamento 75mm (3")',
      descricao: "Kit para port\xE3o deslizante com parafuso e bucha",
      dimensaoTexto: "\xD8 75mm",
      unidadeMedida: "unidade",
      precoUnitarioPadrao: 45
    },
    {
      id: "fechadura_bico_papagaio",
      categoria: "acessorio",
      nome: "Fechadura Bico de Papagaio para Port\xE3o",
      descricao: "Fechadura de sobrepor ou embutir em perfil tubular",
      dimensaoTexto: "Standard",
      unidadeMedida: "unidade",
      precoUnitarioPadrao: 65
    }
  ];
  var DEFAULT_CONFIG = {
    nomeFantasia: "Serralheria Modelo",
    telefoneContato: "(11) 98765-4321",
    cidadeEstado: "S\xE3o Paulo - SP",
    chavePix: "pix@serralheriamodelo.com.br",
    valorHoraMaoDeObra: 50,
    margemLucroPadrao: 40,
    // 40%
    kerfCortePadraoMm: 3,
    // 3mm por corte de serra
    validadeOrcamentoDias: 15,
    // 15 dias de validade
    taxaFretePadrao: 80,
    condicoesFormaPagamento: "50% de sinal no pedido + 50% na retirada/entrega.",
    condicoesPrazoEntrega: "15 a 20 dias \xFAteis a contar da aprova\xE7\xE3o do sinal.",
    condicoesGarantia: "12 meses para soltura de soldas e funcionamento estrutural.",
    memorialPintura: "Aplica\xE7\xE3o de fundo protetor anticorrosivo (Zarc\xE3o). Acabamento final/pintura definitiva por conta do cliente.",
    memorialMaoDeObra: "Fabrica\xE7\xE3o e esquadrejamento em oficina especializada. Instala\xE7\xE3o e chumbamento no local por conta do pedreiro/cliente."
  };
  var STRUCTURE_TEMPLATES = [
    {
      id: "portao_basculante",
      nome: "Port\xE3o Basculante",
      descricao: "Port\xE3o que abre para cima com aux\xEDlio de contrapesos e colunas laterais",
      icone: "door-closed",
      perfilRequadroSugerido: "metalon_50x30_18",
      perfilPreenchimentoSugerido: "metalon_20x20_18",
      larguraPadraoMm: 3e3,
      alturaPadraoMm: 2200,
      espacamentoPadraoMm: 120,
      horasMaoDeObraSugerida: 12,
      requerAcessorios: true
    },
    {
      id: "portao_deslizante",
      nome: "Port\xE3o Deslizante (Correr)",
      descricao: "Port\xE3o que corre lateralmente sobre trilho e roldanas inferiores",
      icone: "move-horizontal",
      perfilRequadroSugerido: "metalon_50x30_18",
      perfilPreenchimentoSugerido: "metalon_20x20_18",
      larguraPadraoMm: 3500,
      alturaPadraoMm: 2200,
      espacamentoPadraoMm: 120,
      horasMaoDeObraSugerida: 8,
      requerAcessorios: true
    },
    {
      id: "grade",
      nome: "Grade de Prote\xE7\xE3o",
      descricao: "Grade fixa com requadro perimetral e barras verticais espa\xE7adas",
      icone: "shield",
      perfilRequadroSugerido: "metalon_30x20_18",
      perfilPreenchimentoSugerido: "metalon_20x20_18",
      larguraPadraoMm: 2e3,
      alturaPadraoMm: 1200,
      espacamentoPadraoMm: 100,
      horasMaoDeObraSugerida: 4,
      requerAcessorios: false
    },
    {
      id: "corrimao",
      nome: "Corrim\xE3o / Guarda-corpo",
      descricao: "Corrim\xE3o linear com tubo superior e montantes de fixa\xE7\xE3o",
      icone: "grip-horizontal",
      perfilRequadroSugerido: "tubo_redondo_1_12_18",
      perfilPreenchimentoSugerido: "metalon_20x20_18",
      larguraPadraoMm: 3e3,
      alturaPadraoMm: 1e3,
      espacamentoPadraoMm: 150,
      horasMaoDeObraSugerida: 5,
      requerAcessorios: false
    },
    {
      id: "cobertura",
      nome: "Cobertura Met\xE1lica Simples",
      descricao: "Estrutura de telhado para garagem ou \xE1rea externa com caibros e ter\xE7as",
      icone: "umbrella",
      perfilRequadroSugerido: "metalon_50x30_18",
      perfilPreenchimentoSugerido: "metalon_30x20_18",
      larguraPadraoMm: 4e3,
      alturaPadraoMm: 3e3,
      espacamentoPadraoMm: 800,
      horasMaoDeObraSugerida: 10,
      requerAcessorios: false
    }
  ];

  // src/core/storage.js
  var KEY_ORCAMENTOS = "serralheria_orcamentos_v1";
  var KEY_CATALOGO = "serralheria_catalogo_v1";
  var KEY_CONFIG = "serralheria_config_v1";
  var memoryStore = {};
  function getRaw(key) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn("LocalStorage inacess\xEDvel, utilizando fallback em mem\xF3ria.", e);
    }
    return memoryStore[key] || null;
  }
  function setRaw(key, value) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn("Falha ao gravar no LocalStorage, utilizando mem\xF3ria.", e);
    }
    memoryStore[key] = value;
  }
  var StorageService = class {
    static init() {
      if (!getRaw(KEY_CATALOGO)) {
        setRaw(KEY_CATALOGO, JSON.stringify(DEFAULT_PRESETS));
      }
      if (!getRaw(KEY_CONFIG)) {
        setRaw(KEY_CONFIG, JSON.stringify(DEFAULT_CONFIG));
      }
      if (!getRaw(KEY_ORCAMENTOS)) {
        setRaw(KEY_ORCAMENTOS, JSON.stringify([]));
      }
    }
    // ─── Orçamentos ──────────────────────────────────────────────
    static getOrcamentos() {
      this.init();
      try {
        const data = JSON.parse(getRaw(KEY_ORCAMENTOS) || "[]");
        return Array.isArray(data) ? data : [];
      } catch (e) {
        console.error("Erro ao ler or\xE7amentos:", e);
        return [];
      }
    }
    static getOrcamentoById(id) {
      const list = this.getOrcamentos();
      return list.find((item) => item.id === id) || null;
    }
    static saveOrcamento(orcamento) {
      const list = this.getOrcamentos();
      const now = (/* @__PURE__ */ new Date()).toISOString();
      if (!orcamento.id) {
        const maxSeq = list.reduce((max, item) => Math.max(max, item.numeroSequencial || 100), 100);
        orcamento.id = "orc_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
        orcamento.numeroSequencial = maxSeq + 1;
        orcamento.dataCriacaoIso = now;
        orcamento.dataAtualizacaoIso = now;
        if (!orcamento.status) orcamento.status = "aberto";
        list.unshift(orcamento);
      } else {
        const index = list.findIndex((item) => item.id === orcamento.id);
        if (index !== -1) {
          orcamento.dataAtualizacaoIso = now;
          list[index] = { ...list[index], ...orcamento };
        } else {
          list.unshift(orcamento);
        }
      }
      setRaw(KEY_ORCAMENTOS, JSON.stringify(list));
      return orcamento;
    }
    static deleteOrcamento(id) {
      let list = this.getOrcamentos();
      list = list.filter((item) => item.id !== id);
      setRaw(KEY_ORCAMENTOS, JSON.stringify(list));
      return true;
    }
    static updateStatus(id, newStatus) {
      const orc = this.getOrcamentoById(id);
      if (!orc) return null;
      orc.status = newStatus;
      return this.saveOrcamento(orc);
    }
    static duplicateOrcamento(id) {
      const orc = this.getOrcamentoById(id);
      if (!orc) return null;
      const clone = JSON.parse(JSON.stringify(orc));
      delete clone.id;
      delete clone.numeroSequencial;
      clone.status = "aberto";
      clone.cliente.nome = (clone.cliente.nome || "Cliente") + " (C\xF3pia)";
      return this.saveOrcamento(clone);
    }
    // ─── Catálogo de Materiais e Preços ──────────────────────────
    static getCatalogo() {
      this.init();
      try {
        const data = JSON.parse(getRaw(KEY_CATALOGO) || "[]");
        return Array.isArray(data) && data.length > 0 ? data : DEFAULT_PRESETS;
      } catch (e) {
        return DEFAULT_PRESETS;
      }
    }
    static getMaterialById(id) {
      const cat = this.getCatalogo();
      return cat.find((m) => m.id === id) || null;
    }
    static updatePrecoMaterial(id, novoPreco) {
      const cat = this.getCatalogo();
      const mat = cat.find((m) => m.id === id);
      if (mat) {
        mat.precoUnitarioPadrao = Number(novoPreco) || 0;
        setRaw(KEY_CATALOGO, JSON.stringify(cat));
        return mat;
      }
      return null;
    }
    static updateMaterial(id, dados) {
      const cat = this.getCatalogo();
      const index = cat.findIndex((m) => m.id === id);
      if (index !== -1) {
        cat[index] = { ...cat[index], ...dados, id };
        setRaw(KEY_CATALOGO, JSON.stringify(cat));
        return cat[index];
      }
      return null;
    }
    static addMaterial(material) {
      const cat = this.getCatalogo();
      if (!material.id) {
        material.id = "custom_" + Date.now();
      }
      cat.push(material);
      setRaw(KEY_CATALOGO, JSON.stringify(cat));
      return material;
    }
    static deleteMaterial(id) {
      let cat = this.getCatalogo();
      cat = cat.filter((m) => m.id !== id);
      setRaw(KEY_CATALOGO, JSON.stringify(cat));
      return true;
    }
    static reajustarPrecos(percentual, categoria = "todos") {
      const cat = this.getCatalogo();
      const fator = 1 + Number(percentual) / 100;
      let afetados = 0;
      cat.forEach((m) => {
        if (categoria === "todos" || m.categoria === categoria) {
          m.precoUnitarioPadrao = Math.max(0, Math.round(m.precoUnitarioPadrao * fator * 100) / 100);
          afetados++;
        }
      });
      setRaw(KEY_CATALOGO, JSON.stringify(cat));
      return { afetados, percentual };
    }
    // ─── Configurações da Oficina ────────────────────────────────
    static getConfig() {
      this.init();
      try {
        const cfg = JSON.parse(getRaw(KEY_CONFIG) || "{}");
        return { ...DEFAULT_CONFIG, ...cfg };
      } catch (e) {
        return DEFAULT_CONFIG;
      }
    }
    static saveConfig(config) {
      const current = this.getConfig();
      const updated = { ...current, ...config };
      setRaw(KEY_CONFIG, JSON.stringify(updated));
      return updated;
    }
    // ─── Backup: Exportação e Importação ─────────────────────────
    static exportBackup() {
      const backup = {
        versaoExportacao: "1.0",
        dataGeracaoIso: (/* @__PURE__ */ new Date()).toISOString(),
        sistema: "sistema-seralheria",
        dados: {
          orcamentos: this.getOrcamentos(),
          catalogo: this.getCatalogo(),
          configuracao: this.getConfig()
        }
      };
      return JSON.stringify(backup, null, 2);
    }
    static importBackup(jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        if (!parsed || !parsed.dados) {
          throw new Error("Formato de backup inv\xE1lido: bloco de dados ausente.");
        }
        if (Array.isArray(parsed.dados.orcamentos)) {
          setRaw(KEY_ORCAMENTOS, JSON.stringify(parsed.dados.orcamentos));
        }
        if (Array.isArray(parsed.dados.catalogo)) {
          setRaw(KEY_CATALOGO, JSON.stringify(parsed.dados.catalogo));
        }
        if (parsed.dados.configuracao && typeof parsed.dados.configuracao === "object") {
          setRaw(KEY_CONFIG, JSON.stringify(parsed.dados.configuracao));
        }
        return { success: true, countOrcamentos: (parsed.dados.orcamentos || []).length };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
  };

  // src/core/calculator.js
  function otimizarCorteBarras(listaPecas, barraTamanhoMm = 6e3, kerfMm = 3) {
    if (!Array.isArray(listaPecas) || listaPecas.length === 0) {
      return {
        barrasNecessarias: 0,
        barras: [],
        sobraTotalMm: 0,
        metragemLinearTotalMm: 0,
        aproveitamentoPercentual: 0
      };
    }
    const pecasIndividuais = [];
    let metragemLinearTotalMm = 0;
    for (const item of listaPecas) {
      const tam = Number(item.tamanhoMm) || 0;
      const qtd = Number(item.quantidade) || 0;
      if (tam <= 0 || qtd <= 0) continue;
      if (tam > barraTamanhoMm) {
        throw new Error(`Pe\xE7a ${item.identificador || ""} (${tam}mm) excede o tamanho m\xE1ximo de uma barra comercial (${barraTamanhoMm}mm). \xC9 necess\xE1ria emenda.`);
      }
      for (let i = 0; i < qtd; i++) {
        pecasIndividuais.push({
          tamanhoMm: tam,
          identificador: item.identificador || "pe\xE7a"
        });
        metragemLinearTotalMm += tam;
      }
    }
    pecasIndividuais.sort((a, b) => b.tamanhoMm - a.tamanhoMm);
    const barras = [];
    for (const peca of pecasIndividuais) {
      let alocada = false;
      for (const barra of barras) {
        const espacoNecessario = peca.tamanhoMm + kerfMm;
        if (barra.espacoLivreMm >= espacoNecessario) {
          barra.pecas.push(peca);
          barra.espacoLivreMm -= espacoNecessario;
          barra.cortesCount += 1;
          alocada = true;
          break;
        }
      }
      if (!alocada) {
        const novaBarra = {
          numeroBarra: barras.length + 1,
          tamanhoNominalMm: barraTamanhoMm,
          espacoLivreMm: barraTamanhoMm - (peca.tamanhoMm + kerfMm),
          pecas: [peca],
          cortesCount: 1
        };
        barras.push(novaBarra);
      }
    }
    const barrasNecessarias = barras.length;
    const sobraTotalMm = barras.reduce((total, b) => total + Math.max(0, b.espacoLivreMm), 0);
    const capacidadeTotalMm = barrasNecessarias * barraTamanhoMm;
    const aproveitamentoPercentual = capacidadeTotalMm > 0 ? Math.round(metragemLinearTotalMm / capacidadeTotalMm * 100 * 10) / 10 : 0;
    return {
      barrasNecessarias,
      barras,
      sobraTotalMm,
      metragemLinearTotalMm,
      aproveitamentoPercentual
    };
  }
  function calcularEstruturaCompleta(params) {
    const {
      tipo = "portao_deslizante",
      larguraMm = 3e3,
      alturaMm = 2200,
      profundidadeMm = 0,
      perfilRequadroId = "metalon_50x30_18",
      perfilPreenchimentoId = "metalon_20x20_18",
      espacamentoMm = 120,
      kerfMm = 3,
      quantidade = 1
    } = params;
    const qtdUnidades = Math.max(1, Math.floor(Number(quantidade) || 1));
    if (larguraMm < 400 || larguraMm > 15e3) {
      throw new Error("Largura informada est\xE1 abaixo do limite m\xEDnimo (400mm) ou acima do m\xE1ximo (15000mm).");
    }
    if (alturaMm < 400 || alturaMm > 6e3) {
      throw new Error("Altura informada est\xE1 abaixo do limite m\xEDnimo (400mm) ou acima do m\xE1ximo (6000mm).");
    }
    const pecasRequadro = [];
    const pecasPreenchimento = [];
    let areaM2 = larguraMm * alturaMm / 1e6 * qtdUnidades;
    switch (tipo) {
      case "portao_basculante":
      case "portao_deslizante": {
        const travessasQtd = (tipo === "portao_deslizante" ? 3 : 2) * qtdUnidades;
        pecasRequadro.push({ tamanhoMm: larguraMm, quantidade: travessasQtd, identificador: "Travessa Horizontal Requadro" });
        pecasRequadro.push({ tamanhoMm: alturaMm, quantidade: 2 * qtdUnidades, identificador: "Coluna Vertical Requadro" });
        const larguraUtilMm = Math.max(100, larguraMm - 100);
        const alturaUtilMm = Math.max(100, alturaMm - 100);
        const passoMm = espacamentoMm + 20;
        const qtdBarrasVerticais = Math.max(1, Math.floor(larguraUtilMm / passoMm)) * qtdUnidades;
        pecasPreenchimento.push({
          tamanhoMm: alturaUtilMm,
          quantidade: qtdBarrasVerticais,
          identificador: "Barra Vertical Interna"
        });
        break;
      }
      case "grade": {
        pecasRequadro.push({ tamanhoMm: larguraMm, quantidade: 2 * qtdUnidades, identificador: "Travessa Grade" });
        pecasRequadro.push({ tamanhoMm: alturaMm, quantidade: 2 * qtdUnidades, identificador: "Montante Grade" });
        const larguraUtilMm = Math.max(100, larguraMm - 60);
        const alturaUtilMm = Math.max(100, alturaMm - 60);
        const passoMm = espacamentoMm + 20;
        const qtdBarras = Math.max(1, Math.floor(larguraUtilMm / passoMm)) * qtdUnidades;
        pecasPreenchimento.push({
          tamanhoMm: alturaUtilMm,
          quantidade: qtdBarras,
          identificador: "Palanque / Barra Grade"
        });
        break;
      }
      case "corrimao": {
        pecasRequadro.push({ tamanhoMm: larguraMm, quantidade: 1 * qtdUnidades, identificador: "Tubo Superior Corrim\xE3o" });
        const qtdMontantes = Math.max(2, Math.ceil(larguraMm / 1e3) + 1) * qtdUnidades;
        pecasRequadro.push({ tamanhoMm: alturaMm, quantidade: qtdMontantes, identificador: "Montante de Fixa\xE7\xE3o" });
        pecasPreenchimento.push({ tamanhoMm: larguraMm, quantidade: 2 * qtdUnidades, identificador: "Longarina Intermedi\xE1ria" });
        break;
      }
      case "cobertura": {
        pecasRequadro.push({ tamanhoMm: larguraMm, quantidade: 2 * qtdUnidades, identificador: "Viga Mestra Principal" });
        const qtdTercas = Math.max(2, Math.ceil(larguraMm / (espacamentoMm || 800)) + 1) * qtdUnidades;
        pecasPreenchimento.push({ tamanhoMm: alturaMm, quantidade: qtdTercas, identificador: "Ter\xE7a / Caibro Telhado" });
        break;
      }
      default:
        throw new Error(`Tipo de estrutura desconhecido: ${tipo}`);
    }
    const resultadoRequadro = otimizarCorteBarras(pecasRequadro, 6e3, kerfMm);
    const resultadoPreenchimento = otimizarCorteBarras(pecasPreenchimento, 6e3, kerfMm);
    const totalBarras6m = resultadoRequadro.barrasNecessarias + resultadoPreenchimento.barrasNecessarias;
    const metragemTotalMm = resultadoRequadro.metragemLinearTotalMm + resultadoPreenchimento.metragemLinearTotalMm;
    const capacidadeGeralMm = totalBarras6m * 6e3;
    const aproveitamentoGeralPercentual = capacidadeGeralMm > 0 ? Math.round(metragemTotalMm / capacidadeGeralMm * 100 * 10) / 10 : 0;
    return {
      tipo,
      quantidade: qtdUnidades,
      dimensoes: { larguraMm, alturaMm, profundidadeMm, espacamentoMm, kerfMm, quantidade: qtdUnidades, areaM2: Math.round(areaM2 * 100) / 100 },
      pecasRequadro,
      pecasPreenchimento,
      requadro: {
        perfilId: perfilRequadroId,
        ...resultadoRequadro
      },
      preenchimento: {
        perfilId: perfilPreenchimentoId,
        ...resultadoPreenchimento
      },
      totalBarras6m,
      metragemTotalMm,
      aproveitamentoGeralPercentual
    };
  }
  function calcularLoteItensMultiplos(itensLista = [], kerfMm = 3) {
    if (!Array.isArray(itensLista) || itensLista.length === 0) {
      return {
        totalBarras6m: 0,
        metragemTotalMm: 0,
        aproveitamentoGeralPercentual: 0,
        perfisConsolidados: [],
        itens: []
      };
    }
    const mapaPerfis = /* @__PURE__ */ new Map();
    for (const item of itensLista) {
      const perfilReq = item.requadro?.perfilId;
      const perfilPre = item.preenchimento?.perfilId;
      if (perfilReq && item.pecasRequadro) {
        if (!mapaPerfis.has(perfilReq)) mapaPerfis.set(perfilReq, []);
        mapaPerfis.get(perfilReq).push(...item.pecasRequadro);
      }
      if (perfilPre && item.pecasPreenchimento) {
        if (!mapaPerfis.has(perfilPre)) mapaPerfis.set(perfilPre, []);
        mapaPerfis.get(perfilPre).push(...item.pecasPreenchimento);
      }
    }
    const perfisConsolidados = [];
    let totalBarras6m = 0;
    let metragemTotalMm = 0;
    for (const [perfilId, pecas] of mapaPerfis.entries()) {
      const resultadoOtimizacao = otimizarCorteBarras(pecas, 6e3, kerfMm);
      totalBarras6m += resultadoOtimizacao.barrasNecessarias;
      metragemTotalMm += resultadoOtimizacao.metragemLinearTotalMm;
      perfisConsolidados.push({
        perfilId,
        ...resultadoOtimizacao
      });
    }
    const capacidadeGeralMm = totalBarras6m * 6e3;
    const aproveitamentoGeralPercentual = capacidadeGeralMm > 0 ? Math.round(metragemTotalMm / capacidadeGeralMm * 100 * 10) / 10 : 0;
    return {
      totalBarras6m,
      metragemTotalMm,
      aproveitamentoGeralPercentual,
      perfisConsolidados,
      itens: itensLista
    };
  }

  // src/core/pricing.js
  function roundMoeda(val) {
    return Math.round((Number(val) + Number.EPSILON) * 100) / 100;
  }
  function calcularComposicaoPrecoLote(dadosLote, configFinanceira = {}, catalogoPrecos = []) {
    const margemLucroPercentual = Number(configFinanceira.margemLucroPercentual ?? 40);
    if (isNaN(margemLucroPercentual) || margemLucroPercentual < 0 || margemLucroPercentual >= 95) {
      throw new Error(`Margem de lucro inv\xE1lida: ${margemLucroPercentual}%. Deve estar entre 0% e 94.9%.`);
    }
    function buscarPreco(id, fallback = 0) {
      if (!id) return fallback;
      const item = catalogoPrecos.find((m) => m.id === id);
      return item ? Number(item.precoUnitarioPadrao) || fallback : fallback;
    }
    let custoMateriaisBarras = 0;
    const detalhePerfis = [];
    const perfis = dadosLote.perfisConsolidados || [];
    for (const perfil of perfis) {
      const precoUnitario = buscarPreco(perfil.perfilId, 85);
      const subtotal = roundMoeda(perfil.barrasNecessarias * precoUnitario);
      custoMateriaisBarras += subtotal;
      detalhePerfis.push({
        perfilId: perfil.perfilId,
        barras: perfil.barrasNecessarias,
        precoUnitario,
        subtotal
      });
    }
    custoMateriaisBarras = roundMoeda(custoMateriaisBarras);
    let custoAcessorios = 0;
    if (configFinanceira.custoAcessorios !== void 0 && configFinanceira.custoAcessorios !== null) {
      custoAcessorios = Number(configFinanceira.custoAcessorios) || 0;
    } else {
      let temCustoItem = false;
      let somaItem = 0;
      for (const item of dadosLote.itens || []) {
        if (item.custos && item.custos.ferragens !== void 0) {
          somaItem += Number(item.custos.ferragens) || 0;
          temCustoItem = true;
        }
      }
      if (temCustoItem) {
        custoAcessorios = somaItem;
      } else {
        for (const item of dadosLote.itens || []) {
          const tipo = item.tipo || "";
          const qtd = Number(item.quantidade) || 1;
          if (tipo.includes("portao")) {
            const precoRoldana = buscarPreco("roldana_portao_75", 45);
            const precoFechadura = buscarPreco("fechadura_bico_papagaio", 65);
            custoAcessorios += (precoRoldana + precoFechadura) * qtd;
          }
        }
      }
    }
    custoAcessorios = roundMoeda(custoAcessorios);
    let custoInsumosConsumiveis = 0;
    if (configFinanceira.custoInsumosConsumiveis !== void 0 && configFinanceira.custoInsumosConsumiveis !== null) {
      custoInsumosConsumiveis = Number(configFinanceira.custoInsumosConsumiveis) || 0;
    } else {
      let temCustoItem = false;
      let somaItem = 0;
      for (const item of dadosLote.itens || []) {
        if (item.custos && item.custos.insumos !== void 0) {
          somaItem += Number(item.custos.insumos) || 0;
          temCustoItem = true;
        }
      }
      if (temCustoItem) {
        custoInsumosConsumiveis = somaItem;
      } else {
        const metrosLineares = (dadosLote.metragemTotalMm || 0) / 1e3;
        custoInsumosConsumiveis = Math.max(25, metrosLineares * 2);
      }
    }
    custoInsumosConsumiveis = roundMoeda(custoInsumosConsumiveis);
    let custoPintura = 0;
    if (configFinanceira.custoPintura !== void 0 && configFinanceira.custoPintura !== null) {
      custoPintura = Number(configFinanceira.custoPintura) || 0;
    } else {
      let temCustoItem = false;
      let somaItem = 0;
      for (const item of dadosLote.itens || []) {
        if (item.custos && item.custos.pintura !== void 0) {
          somaItem += Number(item.custos.pintura) || 0;
          temCustoItem = true;
        }
      }
      if (temCustoItem) {
        custoPintura = somaItem;
      } else {
        let areaM2Total = 0;
        for (const item of dadosLote.itens || []) {
          areaM2Total += Number(item.dimensoes?.areaM2 || item.areaM2) || 1.5;
        }
        custoPintura = Math.max(35, areaM2Total * 14);
      }
    }
    custoPintura = roundMoeda(custoPintura);
    let custoMaoDeObraTotal = 0;
    if (configFinanceira.custoMaoDeObraTotal !== void 0 && configFinanceira.custoMaoDeObraTotal !== null) {
      custoMaoDeObraTotal = Number(configFinanceira.custoMaoDeObraTotal) || 0;
    } else {
      let temCustoItem = false;
      let somaItem = 0;
      for (const item of dadosLote.itens || []) {
        if (item.custos && item.custos.maoObra !== void 0) {
          somaItem += Number(item.custos.maoObra) || 0;
          temCustoItem = true;
        }
      }
      if (temCustoItem) {
        custoMaoDeObraTotal = somaItem;
      } else {
        const horasPorItem = (dadosLote.itens || []).reduce((acc, it) => {
          const horasBase = it.tipo?.includes("portao") ? 8 : 4;
          return acc + horasBase * (Number(it.quantidade) || 1);
        }, 0);
        const horasFinais = Math.max(6, horasPorItem);
        const valorHora = Number(configFinanceira.valorHoraMaoDeObra ?? 50);
        custoMaoDeObraTotal = horasFinais * valorHora;
      }
    }
    custoMaoDeObraTotal = roundMoeda(custoMaoDeObraTotal);
    let custoFreteFinal = 0;
    if (configFinanceira.custoFrete !== void 0 && configFinanceira.custoFrete !== null) {
      custoFreteFinal = roundMoeda(Number(configFinanceira.custoFrete) || 0);
    } else {
      let temCustoItem = false;
      let somaItem = 0;
      for (const item of dadosLote.itens || []) {
        if (item.custos && item.custos.frete !== void 0) {
          somaItem += Number(item.custos.frete) || 0;
          temCustoItem = true;
        }
      }
      if (temCustoItem && somaItem > 0) {
        custoFreteFinal = roundMoeda(somaItem);
      } else {
        custoFreteFinal = roundMoeda(configFinanceira.taxaFrete ?? 80);
      }
    }
    const custoTotalDireto = roundMoeda(
      custoMateriaisBarras + custoAcessorios + custoInsumosConsumiveis + custoPintura + custoMaoDeObraTotal + custoFreteFinal
    );
    const fatorDivisor = 1 - margemLucroPercentual / 100;
    const precoVendaFinal = roundMoeda(custoTotalDireto / fatorDivisor);
    const lucroLiquidoEstimado = roundMoeda(precoVendaFinal - custoTotalDireto);
    return {
      custoMateriaisBarras,
      detalhePerfis,
      custoAcessorios,
      custoInsumosConsumiveis,
      custoPintura,
      custoMaoDeObraTotal,
      custoFrete: custoFreteFinal,
      custoTotalDireto,
      margemLucroPercentual,
      precoVendaFinal,
      lucroLiquidoEstimado
    };
  }
  function calcularCustosSugeridosItem(item = {}, config = {}, catalogo = []) {
    const qtd = Math.max(1, Number(item.quantidade) || 1);
    const tipo = item.tipo || "";
    function buscarPreco(id, fallback = 0) {
      if (!id || !Array.isArray(catalogo)) return fallback;
      const mat = catalogo.find((m) => m.id === id);
      return mat ? Number(mat.precoUnitarioPadrao) || fallback : fallback;
    }
    const metrosLineares = (item.comprimentoTotalPerfisMm || 0) * qtd / 1e3;
    const insumos = roundMoeda(Math.max(15 * qtd, metrosLineares * 2));
    const areaM2 = (Number(item.dimensoes?.areaM2 || item.areaM2) || 1.5) * qtd;
    const pintura = roundMoeda(Math.max(20 * qtd, areaM2 * 14));
    let ferragens = 0;
    if (tipo.includes("portao")) {
      const precoRoldana = buscarPreco("roldana_portao_75", 45);
      const precoFechadura = buscarPreco("fechadura_bico_papagaio", 65);
      ferragens = roundMoeda((precoRoldana + precoFechadura) * qtd);
    }
    const horasBase = tipo.includes("portao") ? 8 : 4;
    const valorHora = Number(config.valorHoraMaoDeObra ?? 50);
    const maoObra = roundMoeda(horasBase * qtd * valorHora);
    const frete = 0;
    return {
      insumos,
      pintura,
      ferragens,
      maoObra,
      frete
    };
  }

  // src/core/pix.js
  var import_qrcode_min = __toESM(require_qrcode_min());
  function calcularCRC16(str) {
    let crc = 65535;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if ((crc & 32768) !== 0) {
          crc = (crc << 1 ^ 4129) & 65535;
        } else {
          crc = crc << 1 & 65535;
        }
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
  }
  function formatarCampoEMV(id, valor) {
    const tam = String(valor.length).padStart(2, "0");
    return `${id}${tam}${valor}`;
  }
  function normalizarTexto(txt = "", maxLen = 25) {
    return txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, "").trim().slice(0, maxLen);
  }
  function gerarPayloadPix({ chavePix, nomeRecebedor = "Serralheria", cidade = "SAO PAULO", valor = 0, txid = "***" }) {
    const chave = (chavePix || "").trim();
    if (!chave) return "";
    const nome = normalizarTexto(nomeRecebedor || "Serralheria", 25) || "Serralheria";
    const cid = normalizarTexto(cidade || "SAO PAULO", 15) || "SAO PAULO";
    const tx = (txid || "***").replace(/[^a-zA-Z0-9]/g, "").slice(0, 25) || "***";
    let payload = formatarCampoEMV("00", "01");
    const gui = formatarCampoEMV("00", "br.gov.bcb.pix");
    const key = formatarCampoEMV("01", chave);
    payload += formatarCampoEMV("26", gui + key);
    payload += formatarCampoEMV("52", "0000");
    payload += formatarCampoEMV("53", "986");
    if (valor && Number(valor) > 0) {
      const valorStr = Number(valor).toFixed(2);
      payload += formatarCampoEMV("54", valorStr);
    }
    payload += formatarCampoEMV("58", "BR");
    payload += formatarCampoEMV("59", nome);
    payload += formatarCampoEMV("60", cid);
    const refLabel = formatarCampoEMV("05", tx);
    payload += formatarCampoEMV("62", refLabel);
    payload += "6304";
    const crc = calcularCRC16(payload);
    return payload + crc;
  }
  function qrcodeParaDataUrl(qr, cellSize = 4, margin = 2) {
    if (typeof document !== "undefined") {
      const count = qr.getModuleCount();
      const size = count * cellSize + margin * 2 * cellSize;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#000000";
      for (let r = 0; r < count; r++) {
        for (let c = 0; c < count; c++) {
          if (qr.isDark(r, c)) {
            ctx.fillRect(
              c * cellSize + margin * cellSize,
              r * cellSize + margin * cellSize,
              cellSize,
              cellSize
            );
          }
        }
      }
      return canvas.toDataURL("image/png");
    }
    return qr.createDataURL(cellSize, margin);
  }
  function extrairPercentualEntrada(textoFormaPagamento = "") {
    if (!textoFormaPagamento) return 50;
    const match = textoFormaPagamento.match(/(\d{1,2})\s*%/);
    if (match && match[1]) {
      const num = Number(match[1]);
      if (num > 0 && num <= 100) return num;
    }
    return 50;
  }
  function gerarDadosPixEntrada({
    chavePix,
    nomeRecebedor = "Serralheria Modelo",
    cidade = "Sao Paulo",
    valorTotal = 0,
    entradaOuPercentual = null,
    txid = "ORC"
  }) {
    const chave = (chavePix || "").trim();
    if (!chave) return null;
    let valorEntrada = 0;
    let percentualEntrada = 50;
    if (typeof entradaOuPercentual === "number" && entradaOuPercentual > 0) {
      valorEntrada = entradaOuPercentual;
      if (valorTotal > 0) {
        percentualEntrada = Math.round(valorEntrada / valorTotal * 100);
      }
    } else {
      percentualEntrada = extrairPercentualEntrada(String(entradaOuPercentual || ""));
      valorEntrada = Number((valorTotal * percentualEntrada / 100).toFixed(2));
    }
    const payloadPix = gerarPayloadPix({
      chavePix: chave,
      nomeRecebedor,
      cidade,
      valor: valorEntrada,
      txid
    });
    const qr = (0, import_qrcode_min.default)(0, "M");
    qr.addData(payloadPix, "Byte");
    qr.make();
    const dataUrl = qrcodeParaDataUrl(qr, 5, 2);
    return {
      chavePix: chave,
      valorTotal,
      valorEntrada,
      percentualEntrada,
      payloadPix,
      dataUrl
    };
  }

  // src/core/pdf.js
  function gerarPropostaPDF(orcamento, configOficina) {
    const jsPDF = typeof window !== "undefined" && window.jspdf && window.jspdf.jsPDF ? window.jspdf.jsPDF : null;
    if (!jsPDF) {
      imprimirViaHtml(orcamento, configOficina);
      return;
    }
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });
    const pageWidth = 210;
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let y = 18;
    doc.setFillColor(30, 41, 59);
    doc.rect(margin, y, contentWidth, 24, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text((configOficina.nomeFantasia || "SERRALHERIA").toUpperCase(), margin + 6, y + 9);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const contatoLinha = `WhatsApp: ${configOficina.telefoneContato || ""}  |  Localidade: ${configOficina.cidadeEstado || ""}`;
    doc.text(contatoLinha, margin + 6, y + 16);
    if (configOficina.chavePix) {
      doc.text(`Chave Pix para Sinal: ${configOficina.chavePix}`, margin + 6, y + 21);
    }
    y += 30;
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`PROPOSTA COMERCIAL #${orcamento.numeroSequencial || "101"}`, margin, y);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    const dataFormatada = new Date(orcamento.dataCriacaoIso || Date.now()).toLocaleDateString("pt-BR");
    doc.text(`Data: ${dataFormatada}  |  Validade: 15 dias`, margin + contentWidth - 45, y);
    y += 4;
    doc.setDrawColor(203, 213, 225);
    doc.line(margin, y, margin + contentWidth, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text("CLIENTE:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${orcamento.cliente?.nome || "Cliente"}  (${orcamento.cliente?.telefone || "Telefone n\xE3o informado"})`, margin + 20, y);
    if (orcamento.cliente?.enderecoObra) {
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.text("LOCAL:", margin, y);
      doc.setFont("helvetica", "normal");
      doc.text(orcamento.cliente.enderecoObra, margin + 20, y);
    }
    y += 10;
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, contentWidth, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text("MEMORIAL DESCRITIVO / ESPECIFICA\xC7\xC3O T\xC9CNICA", margin + 4, y + 5);
    y += 11;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    const itens = Array.isArray(orcamento.itens) && orcamento.itens.length > 0 ? orcamento.itens : [orcamento.estrutura || {}];
    itens.forEach((it, idx) => {
      doc.setFontSize(9.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      const nomeTipo = (it.tipo || "Estrutura Met\xE1lica").replace(/_/g, " ").toUpperCase();
      const qtd = Number(it.quantidade) || 1;
      const tituloItem = `${idx + 1}. ${qtd > 1 ? `${qtd}x ` : ""}${nomeTipo}`;
      doc.text(tituloItem, margin, y);
      y += 4.5;
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      const largMm = Number(it.dimensoes?.larguraMm || it.larguraMm) || 0;
      const altMm = Number(it.dimensoes?.alturaMm || it.alturaMm) || 0;
      const dimTexto = `\u2022 Dimens\xF5es: ${largMm}mm de largura x ${altMm}mm de altura (${(largMm / 1e3).toFixed(2)}m x ${(altMm / 1e3).toFixed(2)}m)`;
      doc.text(dimTexto, margin + 4, y);
      y += 4.5;
      const perfilReq = (it.requadro?.perfilId || it.perfilRequadroId || "Metalon").replace(/_/g, " ");
      const perfilPre = (it.preenchimento?.perfilId || it.perfilPreenchimentoId || "Metalon").replace(/_/g, " ");
      doc.text(`\u2022 Requadro: ${perfilReq} | Preenchimento: ${perfilPre}`, margin + 4, y);
      y += 6;
    });
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    const textoPintura = orcamento.memorialPintura || configOficina.memorialPintura || "Aplica\xE7\xE3o de fundo protetor anticorrosivo (Zarc\xE3o). Acabamento final por conta do cliente.";
    const textoMaoObra = orcamento.memorialMaoDeObra || configOficina.memorialMaoDeObra || "Fabrica\xE7\xE3o e esquadrejamento em oficina especializada. Instala\xE7\xE3o e chumbamento no local por conta do pedreiro/cliente.";
    doc.text(`\u2022 Tratamento e Pintura: ${textoPintura}`, margin + 4, y);
    y += 4.5;
    doc.text(`\u2022 M\xE3o de Obra e Instala\xE7\xE3o: ${textoMaoObra}`, margin + 4, y);
    y += 8;
    const condicoes = orcamento.condicoes || {};
    const formaPag = condicoes.formaPagamento !== void 0 ? condicoes.formaPagamento : configOficina.condicoesFormaPagamento || "50% de sinal no pedido + 50% na conclus\xE3o da instala\xE7\xE3o.";
    const prazoEnt = condicoes.prazoEntrega !== void 0 ? condicoes.prazoEntrega : configOficina.condicoesPrazoEntrega || "15 a 20 dias \xFAteis a contar da aprova\xE7\xE3o do sinal.";
    const garantia = condicoes.garantia !== void 0 ? condicoes.garantia : configOficina.condicoesGarantia || "12 meses para soltura de soldas e funcionamento estrutural.";
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 28, "FD");
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(71, 85, 105);
    doc.text("CONDI\xC7\xD5ES COMERCIAIS:", margin + 4, y + 6);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.text(`\u2022 Forma de Pagamento: ${formaPag || "A combinar"}`, margin + 4, y + 12);
    doc.text(`\u2022 Prazo de Fabrica\xE7\xE3o e Entrega: ${prazoEnt || "A combinar"}`, margin + 4, y + 17);
    doc.text(`\u2022 Garantia: ${garantia || "Sem garantia adicional"}`, margin + 4, y + 22);
    y += 34;
    doc.setFillColor(15, 23, 42);
    doc.rect(margin, y, contentWidth, 14, "F");
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("VALOR TOTAL DO INVESTIMENTO:", margin + 6, y + 9);
    const valorFormatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(orcamento.financeiro?.precoVendaFinal || 0);
    doc.setFontSize(14);
    doc.text(valorFormatado, margin + contentWidth - 45, y + 9);
    const qtdUnica = Number(orcamento.estrutura?.quantidade) || 1;
    const totalItensCount = Array.isArray(orcamento.itens) && orcamento.itens.length > 0 ? orcamento.itens.length : 1;
    if (totalItensCount === 1 && qtdUnica > 1) {
      const valorUnitario = (orcamento.financeiro?.precoVendaFinal || 0) / qtdUnica;
      const unitarioFormatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valorUnitario);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(148, 163, 184);
      doc.text(`(${qtdUnica}x de ${unitarioFormatado} cada)`, margin + 6, y + 13);
    }
    y += 20;
    const condPix = orcamento.condicoes || {};
    const formaPagPix = condPix.formaPagamento !== void 0 ? condPix.formaPagamento : configOficina.condicoesFormaPagamento || "50%";
    const chavePixConfig = configOficina.chavePix || "";
    if (chavePixConfig) {
      const dadosPix = gerarDadosPixEntrada({
        chavePix: chavePixConfig,
        nomeRecebedor: configOficina.nomeFantasia,
        cidade: configOficina.cidadeEstado,
        valorTotal: orcamento.financeiro?.precoVendaFinal || 0,
        entradaOuPercentual: formaPagPix,
        txid: String(orcamento.numeroSequencial || "101")
      });
      if (dadosPix && dadosPix.dataUrl) {
        const boxHeight = 28;
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(203, 213, 225);
        doc.roundedRect(margin, y, contentWidth, boxHeight, 2, 2, "FD");
        const qrSize = 22;
        try {
          doc.addImage(dadosPix.dataUrl, "PNG", margin + 3, y + 3, qrSize, qrSize);
        } catch (e) {
          console.warn("Erro ao inserir QR Code Pix no PDF:", e);
        }
        const textX = margin + qrSize + 8;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.text("PAGAMENTO DO SINAL / ENTRADA VIA PIX", textX, y + 6);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(71, 85, 105);
        doc.text("Para aprova\xE7\xE3o imediata do pedido, escaneie o QR Code ao lado pelo app do seu banco.", textX, y + 11);
        const valEntradaFmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(dadosPix.valorEntrada);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(2, 132, 199);
        doc.text(`Valor da Entrada (${dadosPix.percentualEntrada}%): ${valEntradaFmt}`, textX, y + 17);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.text(`Chave Pix: ${dadosPix.chavePix}  |  Favorecido: ${configOficina.nomeFantasia || "Serralheria"}`, textX, y + 23);
        y += boxHeight + 8;
      } else {
        y += 10;
      }
    } else {
      y += 10;
    }
    const colWidth = 70;
    const col1X = margin + 10;
    const col2X = margin + contentWidth - colWidth - 10;
    doc.setDrawColor(148, 163, 184);
    doc.line(col1X, y, col1X + colWidth, y);
    doc.line(col2X, y, col2X + colWidth, y);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(configOficina.nomeFantasia || "Respons\xE1vel Serralheria", col1X + 8, y + 5);
    doc.text("Aceite do Cliente", col2X + 20, y + 5);
    const nomeClienteLimpo = (orcamento.cliente?.nome || "cliente").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "_");
    const filename = `Proposta_${orcamento.numeroSequencial || "101"}_${nomeClienteLimpo}.pdf`;
    try {
      const blob = doc.output("blob");
      const blobUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      setTimeout(() => {
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(blobUrl);
      }, 250);
    } catch (errSave) {
      console.warn("Fallback doc.save nativo:", errSave);
      doc.save(filename);
    }
  }
  function imprimirViaHtml(orcamento, configOficina) {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      window.print();
      return;
    }
    const valorFormatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(orcamento.financeiro?.precoVendaFinal || 0);
    const itens = Array.isArray(orcamento.itens) && orcamento.itens.length > 0 ? orcamento.itens : [orcamento.estrutura || {}];
    const itensHtml = itens.map((it, idx) => {
      const nome = (it.tipo || "Estrutura").replace(/_/g, " ");
      const qtd = it.quantidade || 1;
      const larg = it.dimensoes?.larguraMm || it.larguraMm || 0;
      const alt = it.dimensoes?.alturaMm || it.alturaMm || 0;
      return `<li><b>${qtd}x ${nome}</b> \u2014 ${larg}mm x ${alt}mm</li>`;
    }).join("");
    let pixHtml = "";
    if (configOficina.chavePix) {
      const condPix = orcamento.condicoes || {};
      const formaPagPix = condPix.formaPagamento || configOficina.condicoesFormaPagamento || "50%";
      const dadosPix = gerarDadosPixEntrada({
        chavePix: configOficina.chavePix,
        nomeRecebedor: configOficina.nomeFantasia,
        cidade: configOficina.cidadeEstado,
        valorTotal: orcamento.financeiro?.precoVendaFinal || 0,
        entradaOuPercentual: formaPagPix,
        txid: String(orcamento.numeroSequencial || "101")
      });
      if (dadosPix) {
        const valEntradaFmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(dadosPix.valorEntrada);
        pixHtml = `
        <div style="display:flex;align-items:center;gap:16px;border:1px solid #cbd5e1;padding:12px;border-radius:8px;margin-top:20px;background:#f8fafc;">
          <img src="${dadosPix.dataUrl}" style="width:90px;height:90px;" alt="QR Code Pix" />
          <div>
            <h4 style="margin:0 0 4px 0;font-size:13px;color:#0f172a;">Pagamento do Sinal / Entrada via Pix</h4>
            <p style="margin:2px 0;font-size:11px;color:#334155;">Valor da Entrada (${dadosPix.percentualEntrada}%): <b>${valEntradaFmt}</b></p>
            <p style="margin:2px 0;font-size:11px;color:#64748b;">Chave Pix: <b>${dadosPix.chavePix}</b></p>
          </div>
        </div>
      `;
      }
    }
    printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <title>Proposta Comercial #${orcamento.numeroSequencial}</title>
      <style>
        body { font-family: sans-serif; margin: 30px; color: #1e293b; }
        .header { background: #0f172a; color: white; padding: 20px; border-radius: 6px; }
        .title { font-size: 20px; font-weight: bold; }
        .section { margin-top: 25px; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px; }
        .total { background: #0f172a; color: white; padding: 15px; font-size: 20px; font-weight: bold; margin-top: 30px; text-align: right; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="title">${configOficina.nomeFantasia || "SERRALHERIA"}</div>
        <div>Telefone / WhatsApp: ${configOficina.telefoneContato || ""}</div>
      </div>
      <div class="section">
        <h3>Proposta #${orcamento.numeroSequencial} - Cliente: ${orcamento.cliente?.nome}</h3>
        <p>Telefone: ${orcamento.cliente?.telefone || "-"}</p>
        <h4>Itens da Obra:</h4>
        <ul>${itensHtml}</ul>
      </div>
      <div class="total">Valor Total: ${valorFormatado}</div>
      ${pixHtml}
      <script>window.print();<\/script>
    </body>
    </html>
  `);
    printWindow.document.close();
  }

  // src/core/whatsapp.js
  function normalizarTelefoneWhatsapp(telefoneBruto) {
    if (!telefoneBruto) return "";
    let limpo = telefoneBruto.replace(/\D/g, "");
    if (limpo.length === 10 || limpo.length === 11) {
      limpo = "55" + limpo;
    }
    return limpo;
  }
  function formatarMensagemWhatsapp(orcamento, configOficina) {
    const clienteNome = orcamento.cliente?.nome || "Cliente";
    const oficinaNome = configOficina.nomeFantasia || "Nossa Serralheria";
    const numOrc = orcamento.numeroSequencial || "101";
    const valorFormatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(orcamento.financeiro?.precoVendaFinal || 0);
    const linhas = [
      `Ol\xE1, *${clienteNome}*! Tudo bem? \u{1F44B}`,
      ``,
      `Aqui \xE9 da *${oficinaNome}*. Conforme combinamos, segue a proposta or\xE7ament\xE1ria para o seu projeto:`,
      ``,
      `\u{1F4CB} *OR\xC7AMENTO #${numOrc}*`
    ];
    const itens = Array.isArray(orcamento.itens) && orcamento.itens.length > 0 ? orcamento.itens : [orcamento.estrutura || {}];
    if (itens.length > 1) {
      linhas.push(`\u{1F6E0}\uFE0F *ITENS INCLUSOS NA OBRA (${itens.length} itens):*`);
      itens.forEach((it, idx) => {
        const qtd = Number(it.quantidade) || 1;
        const tipoNome = (it.tipo || "Estrutura").replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
        const largM = (Number(it.dimensoes?.larguraMm || it.larguraMm) || 0) / 1e3;
        const altM = (Number(it.dimensoes?.alturaMm || it.alturaMm) || 0) / 1e3;
        linhas.push(`  *${idx + 1}.* ${qtd}x ${tipoNome} (${largM.toFixed(2)}m x ${altM.toFixed(2)}m)`);
      });
    } else {
      const it = itens[0] || {};
      const qtd = Number(it.quantidade) || 1;
      const tipoFormatado = (it.tipo || "Estrutura Met\xE1lica").replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      const largM = (Number(it.dimensoes?.larguraMm || it.larguraMm) || 0) / 1e3;
      const altM = (Number(it.dimensoes?.alturaMm || it.alturaMm) || 0) / 1e3;
      const itemTexto = qtd > 1 ? `${qtd}x ${tipoFormatado}` : tipoFormatado;
      linhas.push(`\u{1F6E0}\uFE0F *Item:* ${itemTexto}`);
      linhas.push(`\u{1F4D0} *Dimens\xF5es ${qtd > 1 ? "(por pe\xE7a)" : ""}:* ${largM.toFixed(2)}m de largura x ${altM.toFixed(2)}m de altura`);
    }
    const textoPintura = orcamento.memorialPintura || configOficina.memorialPintura || "Aplica\xE7\xE3o de fundo protetor anticorrosivo (Zarc\xE3o)";
    const textoMaoObra = orcamento.memorialMaoDeObra || configOficina.memorialMaoDeObra || "Fabrica\xE7\xE3o especializada em oficina (instala\xE7\xE3o/chumbamento por conta do pedreiro)";
    linhas.push(`\u{1F529} *Pintura / Acabamento:* ${textoPintura}`);
    linhas.push(`\u26A1 *M\xE3o de Obra:* ${textoMaoObra}`);
    const cond = orcamento.condicoes || {};
    const formaPag = cond.formaPagamento !== void 0 ? cond.formaPagamento : configOficina.condicoesFormaPagamento || "50% de sinal + saldo na entrega/instala\xE7\xE3o";
    const prazoEnt = cond.prazoEntrega !== void 0 ? cond.prazoEntrega : configOficina.condicoesPrazoEntrega || "15 a 20 dias \xFAteis";
    const validade = cond.validade !== void 0 ? cond.validade : `${configOficina.validadeOrcamentoDias || 15} dias`;
    const garantia = cond.garantia !== void 0 ? cond.garantia : configOficina.condicoesGarantia || "12 meses";
    linhas.push(`\u{1F4B0} *Valor Total do Pedido:* *${valorFormatado}*`);
    if (formaPag) linhas.push(`\u{1F4B3} *Condi\xE7\xF5es:* ${formaPag}`);
    if (prazoEnt) linhas.push(`\u23F3 *Prazo de Fabrica\xE7\xE3o:* ${prazoEnt}`);
    if (garantia) linhas.push(`\u{1F6E1}\uFE0F *Garantia:* ${garantia}`);
    if (validade) linhas.push(`\u{1F4C5} *Validade da Proposta:* ${validade}`);
    if (configOficina.chavePix) {
      const dadosPix = gerarDadosPixEntrada({
        chavePix: configOficina.chavePix,
        nomeRecebedor: configOficina.nomeFantasia,
        cidade: configOficina.cidadeEstado,
        valorTotal: orcamento.financeiro?.precoVendaFinal || 0,
        entradaOuPercentual: formaPag,
        txid: String(orcamento.numeroSequencial || "101")
      });
      if (dadosPix) {
        const valEntradaFmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(dadosPix.valorEntrada);
        linhas.push(``);
        linhas.push(`\u{1F511} *PAGAMENTO DO SINAL / ENTRADA (${dadosPix.percentualEntrada}%):*`);
        linhas.push(`\u2022 *Valor da Entrada:* ${valEntradaFmt}`);
        linhas.push(`\u2022 *Chave Pix:* ${dadosPix.chavePix}`);
        linhas.push(`\u2022 *C\xF3digo Pix Copia e Cola:*`);
        linhas.push(`${dadosPix.payloadPix}`);
      }
    }
    linhas.push(``);
    linhas.push(`Podemos agendar a fabrica\xE7\xE3o do seu pedido? Qualquer d\xFAvida estou \xE0 disposi\xE7\xE3o aqui no WhatsApp! \u{1F91D}`);
    return linhas.join("\n");
  }
  function dispararWhatsapp(orcamento, configOficina) {
    const telefone = normalizarTelefoneWhatsapp(orcamento.cliente?.telefone);
    const texto = formatarMensagemWhatsapp(orcamento, configOficina);
    const textoEncoded = encodeURIComponent(texto);
    const url = telefone ? `https://wa.me/${telefone}?text=${textoEncoded}` : `https://wa.me/?text=${textoEncoded}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
    return { url, telefone, texto };
  }

  // src/ui/app.js
  var AppController = class {
    constructor() {
      this.abaAtiva = "orcamentos";
      this.filtroStatus = "todos";
      this.termoBusca = "";
      this.tipologiaAtivaId = "portao_deslizante";
      this.orcamentoEmEdicaoId = null;
      this.orcamentoModal = null;
      this.dadosPixAtual = null;
      this.ultimoCalculo = null;
      this.itensOrcamento = [];
      this.filtroCatalogoCategoria = "todos";
      this.termoBuscaCatalogo = "";
    }
    init() {
      StorageService.init();
      this.renderizarTipologias();
      this.renderizarSelectsPerfis();
      this.carregarConfiguracoesNaTela();
      this.renderizarListaOrcamentos();
      this.renderizarTabelaCatalogo();
      this.recalcularEmTempoReal();
      this.mudarAba("orcamentos");
      this.atualizarIcones();
    }
    atualizarIcones() {
      if (typeof window !== "undefined" && window.lucide) {
        window.lucide.createIcons();
      }
    }
    mostrarToast(mensagem, tipo = "sucesso") {
      const container = document.getElementById("toast-container");
      if (!container) return;
      const toast = document.createElement("div");
      const bgCor = tipo === "erro" ? "bg-rose-600" : "bg-slate-900";
      const icone = tipo === "erro" ? "alert-triangle" : "check-circle";
      toast.className = `flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-white text-xs font-semibold ${bgCor} pointer-events-auto transition transform translate-y-2 opacity-0 duration-200`;
      toast.innerHTML = `
      <i data-lucide="${icone}" class="w-4 h-4 text-sky-400"></i>
      <span>${mensagem}</span>
    `;
      container.appendChild(toast);
      this.atualizarIcones();
      requestAnimationFrame(() => {
        toast.classList.remove("translate-y-2", "opacity-0");
      });
      setTimeout(() => {
        toast.classList.add("opacity-0", "translate-x-4");
        setTimeout(() => toast.remove(), 250);
      }, 3500);
    }
    // ─── Navegação em Abas ─────────────────────────────────────
    mudarAba(nomeAba) {
      this.abaAtiva = nomeAba;
      const abas = ["orcamentos", "novo", "catalogo", "config"];
      abas.forEach((aba) => {
        const el = document.getElementById(`aba-${aba}`);
        const btnDesktop = document.getElementById(`nav-btn-${aba}`);
        if (el) {
          if (aba === nomeAba) {
            el.classList.remove("hidden");
          } else {
            el.classList.add("hidden");
          }
        }
        if (btnDesktop) {
          if (aba === nomeAba) {
            btnDesktop.className = "nav-tab px-3 py-2 rounded-md text-sm font-bold bg-slate-800 text-white shadow-sm";
          } else {
            btnDesktop.className = "nav-tab px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors";
          }
        }
      });
      if (nomeAba === "orcamentos") {
        this.renderizarListaOrcamentos();
      } else if (nomeAba === "catalogo") {
        this.renderizarTabelaCatalogo();
      } else if (nomeAba === "config") {
        this.carregarConfiguracoesNaTela();
      }
      this.atualizarIcones();
    }
    // ─── Tipologias e Selects de Perfis ────────────────────────
    renderizarTipologias() {
      const container = document.getElementById("tipologia-selector");
      if (!container) return;
      container.innerHTML = STRUCTURE_TEMPLATES.map((tpl) => {
        const ativa = tpl.id === this.tipologiaAtivaId;
        const borda = ativa ? "border-sky-600 bg-sky-50/70 text-sky-950 font-bold" : "border-slate-200 bg-white hover:border-slate-300 text-slate-700";
        return `
        <button type="button" onclick="window.app.selecionarTipologia('${tpl.id}')" class="flex flex-col items-center justify-center p-3 rounded-xl border-2 text-center transition ${borda}">
          <i data-lucide="${tpl.icone || "box"}" class="w-6 h-6 mb-1 text-sky-600"></i>
          <span class="text-xs leading-tight">${tpl.nome}</span>
        </button>
      `;
      }).join("");
      this.atualizarIcones();
    }
    selecionarTipologia(tipoId) {
      this.tipologiaAtivaId = tipoId;
      const tpl = STRUCTURE_TEMPLATES.find((t) => t.id === tipoId);
      if (!tpl) return;
      const largInput = document.getElementById("campo-largura-mm");
      const altInput = document.getElementById("campo-altura-mm");
      const espInput = document.getElementById("campo-espacamento-mm");
      const horasInput = document.getElementById("campo-horas-trabalho");
      if (largInput) largInput.value = tpl.larguraPadraoMm;
      if (altInput) altInput.value = tpl.alturaPadraoMm;
      if (espInput) espInput.value = tpl.espacamentoPadraoMm;
      if (horasInput) horasInput.value = tpl.horasMaoDeObraSugerida;
      const reqSelect = document.getElementById("campo-perfil-requadro");
      const preSelect = document.getElementById("campo-perfil-preenchimento");
      if (reqSelect) reqSelect.value = tpl.perfilRequadroSugerido;
      if (preSelect) preSelect.value = tpl.perfilPreenchimentoSugerido;
      this.renderizarTipologias();
      this.recalcularCustosSugeridosItemAtual(true);
      this.recalcularEmTempoReal(true);
    }
    renderizarSelectsPerfis() {
      const catalogo = StorageService.getCatalogo();
      const perfis = catalogo.filter((m) => m.unidadeMedida === "barra_6m");
      const optionsHtml = perfis.map((m) => `
      <option value="${m.id}">${m.nome} \u2014 R$ ${m.precoUnitarioPadrao.toFixed(2)}/barra</option>
    `).join("");
      const reqSelect = document.getElementById("campo-perfil-requadro");
      const preSelect = document.getElementById("campo-perfil-preenchimento");
      if (reqSelect) reqSelect.innerHTML = optionsHtml;
      if (preSelect) preSelect.innerHTML = optionsHtml;
      if (reqSelect) reqSelect.value = "metalon_50x30_18";
      if (preSelect) preSelect.value = "metalon_20x20_18";
    }
    // ─── Recálculo Reativo em Tempo Real ───────────────────────
    // ─── Gerenciamento de Múltiplos Itens (Carrinho) ────────────
    obterItemFormularioAtual() {
      const qtdInput = document.getElementById("campo-quantidade");
      const quantidade = Math.max(1, Math.floor(Number(qtdInput?.value) || 1));
      const larguraMm = Number(document.getElementById("campo-largura-mm")?.value) || 3e3;
      const alturaMm = Number(document.getElementById("campo-altura-mm")?.value) || 2200;
      const espacamentoMm = Number(document.getElementById("campo-espacamento-mm")?.value) || 120;
      const perfilRequadroId = document.getElementById("campo-perfil-requadro")?.value || "metalon_50x30_18";
      const perfilPreenchimentoId = document.getElementById("campo-perfil-preenchimento")?.value || "metalon_20x20_18";
      const config = StorageService.getConfig();
      return calcularEstruturaCompleta({
        tipo: this.tipologiaAtivaId,
        quantidade,
        larguraMm,
        alturaMm,
        espacamentoMm,
        perfilRequadroId,
        perfilPreenchimentoId,
        kerfMm: config.kerfCortePadraoMm || 3
      });
    }
    recalcularCustosSugeridosItemAtual(forcar = false) {
      const inputInsumos = document.getElementById("item-custo-insumos");
      const inputPintura = document.getElementById("item-custo-pintura");
      const inputFerragens = document.getElementById("item-custo-ferragens");
      const inputMaoObra = document.getElementById("item-custo-mao-obra");
      const inputFrete = document.getElementById("item-custo-frete");
      if (!forcar && inputInsumos?.value && inputPintura?.value && inputMaoObra?.value) {
        this.atualizarSubtotalItemAtual();
        return;
      }
      try {
        const itemCalculado = this.obterItemFormularioAtual();
        const config = StorageService.getConfig();
        const catalogo = StorageService.getCatalogo();
        const sugestao = calcularCustosSugeridosItem(itemCalculado, config, catalogo);
        if (inputInsumos) inputInsumos.value = sugestao.insumos.toFixed(2);
        if (inputPintura) inputPintura.value = sugestao.pintura.toFixed(2);
        if (inputFerragens) inputFerragens.value = sugestao.ferragens.toFixed(2);
        if (inputMaoObra) inputMaoObra.value = sugestao.maoObra.toFixed(2);
        if (inputFrete) inputFrete.value = sugestao.frete.toFixed(2);
        this.atualizarSubtotalItemAtual();
      } catch (e) {
        console.warn("Erro ao sugerir custos do item:", e.message);
      }
    }
    atualizarSubtotalItemAtual() {
      try {
        const itemCalculado = this.obterItemFormularioAtual();
        const catalogo = StorageService.getCatalogo();
        let custoBarrasItem = 0;
        for (const p of itemCalculado.planoCortePorPerfil || []) {
          const mat = catalogo.find((m) => m.id === p.perfilId);
          const preco = mat ? Number(mat.precoUnitarioPadrao) || 85 : 85;
          custoBarrasItem += (p.barrasNecessarias || 0) * preco;
        }
        const insumos = Math.max(0, Number(document.getElementById("item-custo-insumos")?.value) || 0);
        const pintura = Math.max(0, Number(document.getElementById("item-custo-pintura")?.value) || 0);
        const ferragens = Math.max(0, Number(document.getElementById("item-custo-ferragens")?.value) || 0);
        const maoObra = Math.max(0, Number(document.getElementById("item-custo-mao-obra")?.value) || 0);
        const frete = Math.max(0, Number(document.getElementById("item-custo-frete")?.value) || 0);
        const totalItem = custoBarrasItem + insumos + pintura + ferragens + maoObra + frete;
        const elSubtotal = document.getElementById("subtotal-item-atual-val");
        if (elSubtotal) {
          elSubtotal.textContent = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalItem);
        }
        if (this.itensOrcamento.length === 0) {
          const inputInsumos = document.getElementById("campo-custo-insumos");
          const inputPintura = document.getElementById("campo-custo-pintura");
          const inputAcessorios = document.getElementById("campo-custo-acessorios");
          const inputMaoObra = document.getElementById("campo-custo-mao-obra");
          const inputFrete = document.getElementById("campo-custo-frete");
          if (inputInsumos && document.activeElement !== inputInsumos) inputInsumos.value = insumos.toFixed(2);
          if (inputPintura && document.activeElement !== inputPintura) inputPintura.value = pintura.toFixed(2);
          if (inputAcessorios && document.activeElement !== inputAcessorios) inputAcessorios.value = ferragens.toFixed(2);
          if (inputMaoObra && document.activeElement !== inputMaoObra) inputMaoObra.value = maoObra.toFixed(2);
          if (inputFrete && document.activeElement !== inputFrete) inputFrete.value = (frete > 0 ? frete : 80).toFixed(2);
          this.recalcularEmTempoReal(false);
        }
      } catch (e) {
        console.warn("Erro ao atualizar subtotal do item:", e.message);
      }
    }
    sincronizarCustosConsolidadosParaSecao4() {
      if (this.itensOrcamento.length === 0) return;
      const inputInsumos = document.getElementById("campo-custo-insumos");
      const inputPintura = document.getElementById("campo-custo-pintura");
      const inputAcessorios = document.getElementById("campo-custo-acessorios");
      const inputMaoObra = document.getElementById("campo-custo-mao-obra");
      const inputFrete = document.getElementById("campo-custo-frete");
      const totalInsumos = this.itensOrcamento.reduce((s, it) => s + (it.custos?.insumos || 0), 0);
      const totalPintura = this.itensOrcamento.reduce((s, it) => s + (it.custos?.pintura || 0), 0);
      const totalFerragens = this.itensOrcamento.reduce((s, it) => s + (it.custos?.ferragens || 0), 0);
      const totalMaoObra = this.itensOrcamento.reduce((s, it) => s + (it.custos?.maoObra || 0), 0);
      const totalFrete = this.itensOrcamento.reduce((s, it) => s + (it.custos?.frete || 0), 0);
      if (inputInsumos) inputInsumos.value = totalInsumos.toFixed(2);
      if (inputPintura) inputPintura.value = totalPintura.toFixed(2);
      if (inputAcessorios) inputAcessorios.value = totalFerragens.toFixed(2);
      if (inputMaoObra) inputMaoObra.value = totalMaoObra.toFixed(2);
      if (inputFrete) inputFrete.value = totalFrete > 0 ? totalFrete.toFixed(2) : (StorageService.getConfig().taxaFretePadrao || 80).toFixed(2);
    }
    adicionarItemAoOrcamento() {
      try {
        const itemCalculado = this.obterItemFormularioAtual();
        const catalogo = StorageService.getCatalogo();
        const insumos = Math.max(0, Number(document.getElementById("item-custo-insumos")?.value) || 0);
        const pintura = Math.max(0, Number(document.getElementById("item-custo-pintura")?.value) || 0);
        const ferragens = Math.max(0, Number(document.getElementById("item-custo-ferragens")?.value) || 0);
        const maoObra = Math.max(0, Number(document.getElementById("item-custo-mao-obra")?.value) || 0);
        const frete = Math.max(0, Number(document.getElementById("item-custo-frete")?.value) || 0);
        let custoBarrasItem = 0;
        for (const p of itemCalculado.planoCortePorPerfil || []) {
          const mat = catalogo.find((m) => m.id === p.perfilId);
          const preco = mat ? Number(mat.precoUnitarioPadrao) || 85 : 85;
          custoBarrasItem += (p.barrasNecessarias || 0) * preco;
        }
        const custoDiretoItem = custoBarrasItem + insumos + pintura + ferragens + maoObra + frete;
        const novoItem = {
          id: "item_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
          ...itemCalculado,
          custos: {
            insumos,
            pintura,
            ferragens,
            maoObra,
            frete
          },
          custoBarrasEstimado: custoBarrasItem,
          custoDiretoTotal: custoDiretoItem
        };
        this.itensOrcamento.push(novoItem);
        this.sincronizarCustosConsolidadosParaSecao4();
        this.renderizarListaItensOrcamento();
        this.recalcularEmTempoReal(false);
        const nome = itemCalculado.tipo.replace(/_/g, " ");
        this.mostrarToast(`Item adicionado: ${itemCalculado.quantidade}x ${nome}!`);
      } catch (err) {
        this.mostrarToast(`Erro ao adicionar item: ${err.message}`, "erro");
      }
    }
    removerItemDoOrcamento(itemId) {
      this.itensOrcamento = this.itensOrcamento.filter((it) => it.id !== itemId);
      this.sincronizarCustosConsolidadosParaSecao4();
      this.renderizarListaItensOrcamento();
      this.recalcularEmTempoReal(false);
      this.mostrarToast("Item removido do or\xE7amento.");
    }
    renderizarListaItensOrcamento() {
      const container = document.getElementById("lista-itens-orcamento-container");
      const badgeCount = document.getElementById("contagem-itens-orcamento");
      if (!container) return;
      if (badgeCount) {
        badgeCount.textContent = this.itensOrcamento.length || 1;
      }
      if (this.itensOrcamento.length === 0) {
        container.innerHTML = `
        <div class="text-xs text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-lg p-3 text-center">
          <span>Este or\xE7amento est\xE1 usando apenas a pe\xE7a configurada acima. Para or\xE7ar m\xFAltiplos port\xF5es ou grades juntos, defina as medidas, custos e clique no bot\xE3o <b>Adicionar Item ao Or\xE7amento</b>.</span>
        </div>
      `;
        this.atualizarIcones();
        return;
      }
      const formatBRL = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v || 0);
      container.innerHTML = this.itensOrcamento.map((it, idx) => {
        const nomeTipo = (it.tipo || "estrutura").replace(/_/g, " ");
        const largMm = it.dimensoes?.larguraMm || it.larguraMm;
        const altMm = it.dimensoes?.alturaMm || it.alturaMm;
        const qtd = it.quantidade || 1;
        const barras = it.totalBarras6m || 0;
        const c = it.custos || {};
        return `
        <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100/70 transition text-xs space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-[11px]">${idx + 1}</span>
              <div>
                <span class="font-bold text-slate-800 capitalize text-sm">${qtd}x ${nomeTipo}</span>
                <span class="text-slate-500 block text-[11px]">${largMm} x ${altMm} mm \u2022 ${barras} barras 6m</span>
              </div>
            </div>
            <button type="button" onclick="window.app.removerItemDoOrcamento('${it.id}')" title="Remover este item" class="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>

          <!-- Tags de Custos do Item -->
          <div class="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-200/80 text-[11px]">
            <span class="px-2 py-0.5 rounded bg-slate-200/70 text-slate-700 font-medium">Insumos: R$ ${(c.insumos || 0).toFixed(2)}</span>
            <span class="px-2 py-0.5 rounded bg-amber-100/80 text-amber-800 font-medium">Pintura: R$ ${(c.pintura || 0).toFixed(2)}</span>
            <span class="px-2 py-0.5 rounded bg-slate-200/70 text-slate-700 font-medium">Ferragens: R$ ${(c.ferragens || 0).toFixed(2)}</span>
            <span class="px-2 py-0.5 rounded bg-sky-100/80 text-sky-800 font-medium">M.O.: R$ ${(c.maoObra || 0).toFixed(2)}</span>
            ${c.frete > 0 ? `<span class="px-2 py-0.5 rounded bg-emerald-100/80 text-emerald-800 font-medium">Frete: R$ ${c.frete.toFixed(2)}</span>` : ""}
            <span class="ml-auto px-2 py-0.5 rounded bg-slate-900 text-white font-bold">Custo Direto: ${formatBRL(it.custoDiretoTotal || 0)}</span>
          </div>
        </div>
      `;
      }).join("");
      this.atualizarIcones();
    }
    // ─── Recálculo Reativo em Tempo Real ───────────────────────
    recalcularEmTempoReal(redefinirCustos = false) {
      const qtdInput = document.getElementById("campo-quantidade");
      const quantidade = Math.max(1, Math.floor(Number(qtdInput?.value) || 1));
      const larguraMm = Number(document.getElementById("campo-largura-mm")?.value) || 3e3;
      const alturaMm = Number(document.getElementById("campo-altura-mm")?.value) || 2200;
      const espacamentoMm = Number(document.getElementById("campo-espacamento-mm")?.value) || 120;
      const perfilRequadroId = document.getElementById("campo-perfil-requadro")?.value || "metalon_50x30_18";
      const perfilPreenchimentoId = document.getElementById("campo-perfil-preenchimento")?.value || "metalon_20x20_18";
      const inputInsumos = document.getElementById("campo-custo-insumos");
      const inputPintura = document.getElementById("campo-custo-pintura");
      const inputAcessorios = document.getElementById("campo-custo-acessorios");
      const inputMaoObra = document.getElementById("campo-custo-mao-obra");
      const inputFrete = document.getElementById("campo-custo-frete");
      const inputMargem = document.getElementById("campo-margem-manual");
      const sliderMargem = document.getElementById("campo-margem-slider");
      const config = StorageService.getConfig();
      const catalogo = StorageService.getCatalogo();
      const qtdLabel = document.getElementById("label-quantidade-resumo");
      if (qtdLabel) {
        qtdLabel.textContent = quantidade === 1 ? "1 unidade id\xEAntica" : `${quantidade} unidades id\xEAnticas`;
      }
      const largLabel = document.getElementById("largura-metros-label");
      const altLabel = document.getElementById("altura-metros-label");
      const areaLabel = document.getElementById("label-area-m2");
      const kerfLabel = document.getElementById("label-kerf");
      if (largLabel) largLabel.textContent = `${(larguraMm / 1e3).toFixed(2)} metros`;
      if (altLabel) altLabel.textContent = `${(alturaMm / 1e3).toFixed(2)} metros`;
      const areaM2Unitaria = larguraMm * alturaMm / 1e6;
      const areaM2Total = areaM2Unitaria * quantidade;
      if (areaLabel) {
        areaLabel.textContent = quantidade > 1 ? `${areaM2Total.toFixed(1)} m\xB2 (${areaM2Unitaria.toFixed(1)} m\xB2/un)` : `${areaM2Total.toFixed(1)} m\xB2`;
      }
      if (kerfLabel) kerfLabel.textContent = `${config.kerfCortePadraoMm || 3}mm`;
      const itemInsumosInput = document.getElementById("item-custo-insumos");
      if (redefinirCustos || !itemInsumosInput?.value) {
        this.recalcularCustosSugeridosItemAtual(redefinirCustos);
      } else {
        this.atualizarSubtotalItemAtual();
      }
      try {
        const itemAtualCalculado = calcularEstruturaCompleta({
          tipo: this.tipologiaAtivaId,
          quantidade,
          larguraMm,
          alturaMm,
          espacamentoMm,
          perfilRequadroId,
          perfilPreenchimentoId,
          kerfMm: config.kerfCortePadraoMm || 3
        });
        const listaParaCalcular = this.itensOrcamento.length > 0 ? this.itensOrcamento : [itemAtualCalculado];
        const resultadoLote = calcularLoteItensMultiplos(listaParaCalcular, config.kerfCortePadraoMm || 3);
        const precisaSugerir = redefinirCustos || !inputInsumos?.value || !inputPintura?.value || !inputMaoObra?.value;
        if (precisaSugerir) {
          if (this.itensOrcamento.length > 0) {
            this.sincronizarCustosConsolidadosParaSecao4();
          } else {
            const margemSug = Number(inputMargem?.value) || Number(sliderMargem?.value) || 40;
            const sugestao = calcularComposicaoPrecoLote(resultadoLote, {
              valorHoraMaoDeObra: config.valorHoraMaoDeObra || 50,
              taxaFrete: 80,
              margemLucroPercentual: margemSug
            }, catalogo);
            if (inputInsumos) inputInsumos.value = sugestao.custoInsumosConsumiveis.toFixed(2);
            if (inputPintura) inputPintura.value = sugestao.custoPintura.toFixed(2);
            if (inputAcessorios) inputAcessorios.value = sugestao.custoAcessorios.toFixed(2);
            if (inputMaoObra) inputMaoObra.value = sugestao.custoMaoDeObraTotal.toFixed(2);
            if (inputFrete) inputFrete.value = sugestao.custoFrete.toFixed(2);
            if (inputMargem) inputMargem.value = margemSug;
            if (sliderMargem) sliderMargem.value = margemSug;
          }
        }
        const custoInsumos = inputInsumos && inputInsumos.value !== "" ? Number(inputInsumos.value) || 0 : 0;
        const custoPintura = inputPintura && inputPintura.value !== "" ? Number(inputPintura.value) || 0 : 0;
        const custoAcessorios = inputAcessorios && inputAcessorios.value !== "" ? Number(inputAcessorios.value) || 0 : 0;
        const custoMaoObra = inputMaoObra && inputMaoObra.value !== "" ? Number(inputMaoObra.value) || 0 : 0;
        const custoFrete = inputFrete && inputFrete.value !== "" ? Number(inputFrete.value) || 0 : 0;
        const margemPercentual = inputMargem && inputMargem.value !== "" ? Number(inputMargem.value) || 40 : 40;
        const resultadoFinanceiro = calcularComposicaoPrecoLote(resultadoLote, {
          custoInsumosConsumiveis: custoInsumos,
          custoPintura,
          custoAcessorios,
          custoMaoDeObraTotal: custoMaoObra,
          custoFrete,
          margemLucroPercentual: margemPercentual
        }, catalogo);
        this.ultimoCalculo = {
          estrutura: itemAtualCalculado,
          lote: resultadoLote,
          itens: listaParaCalcular,
          financeiro: resultadoFinanceiro
        };
        const totalBarrasEl = document.getElementById("resumo-total-barras");
        const badgeAprovEl = document.getElementById("badge-aproveitamento");
        if (totalBarrasEl) totalBarrasEl.textContent = resultadoLote.totalBarras6m;
        if (badgeAprovEl) {
          badgeAprovEl.textContent = `Aproveitamento ${resultadoLote.aproveitamentoGeralPercentual}%`;
        }
        const containerBarras = document.getElementById("container-detalhe-barras-perfis");
        if (containerBarras) {
          containerBarras.innerHTML = resultadoLote.perfisConsolidados.map((p) => {
            const mat = catalogo.find((m) => m.id === p.perfilId);
            const nomePerfil = mat?.dimensaoTexto || p.perfilId.replace(/_/g, " ");
            return `
            <div class="flex justify-between items-center bg-slate-800/60 p-2 rounded border border-slate-700/60">
              <div>
                <span class="font-semibold text-slate-200 capitalize">${nomePerfil}</span>
                <div class="text-[11px] text-slate-400">${(p.metragemLinearTotalMm / 1e3).toFixed(1)}m lineares necess\xE1rios</div>
              </div>
              <div class="text-right">
                <span class="text-sm font-bold text-sky-400">${p.barrasNecessarias} barras</span>
                <div class="text-[11px] text-slate-400">Sobra: ${p.sobraTotalMm}mm</div>
              </div>
            </div>
          `;
          }).join("");
        }
        const formatBRL = (val) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val || 0);
        const elCustoBarras = document.getElementById("custo-barras-val");
        const elCustoTotal = document.getElementById("custo-total-direto-val");
        const elPrecoVenda = document.getElementById("preco-venda-final-destaque");
        const elLucroReais = document.getElementById("lucro-reais-destaque");
        if (elCustoBarras) elCustoBarras.textContent = formatBRL(resultadoFinanceiro.custoMateriaisBarras);
        if (elCustoTotal) elCustoTotal.textContent = formatBRL(resultadoFinanceiro.custoTotalDireto);
        if (elPrecoVenda) elPrecoVenda.textContent = formatBRL(resultadoFinanceiro.precoVendaFinal);
        if (elLucroReais) elLucroReais.textContent = formatBRL(resultadoFinanceiro.lucroLiquidoEstimado);
      } catch (err) {
        console.warn("Erro moment\xE2neo no c\xE1lculo:", err.message);
      }
    }
    recalcularComValoresManuais() {
      this.recalcularEmTempoReal(false);
    }
    ajustarMargemManual(valor) {
      const num = Math.min(94, Math.max(1, Number(valor) || 0));
      const inputManual = document.getElementById("campo-margem-manual");
      const slider = document.getElementById("campo-margem-slider");
      if (inputManual && document.activeElement !== inputManual) {
        inputManual.value = num;
      }
      if (slider) slider.value = num;
      this.recalcularEmTempoReal(false);
    }
    ajustarMargemSlider(valor) {
      const inputManual = document.getElementById("campo-margem-manual");
      if (inputManual) inputManual.value = valor;
      this.recalcularEmTempoReal(false);
    }
    restaurarValoresCalculados() {
      this.recalcularCustosSugeridosItemAtual(true);
      this.recalcularEmTempoReal(true);
      this.mostrarToast("Estimativas autom\xE1ticas recalculadas!");
    }
    incrementarQuantidade() {
      const input = document.getElementById("campo-quantidade");
      if (!input) return;
      const atual = Math.floor(Number(input.value) || 1);
      if (atual < 100) {
        input.value = atual + 1;
        this.recalcularEmTempoReal(false);
      }
    }
    decrementarQuantidade() {
      const input = document.getElementById("campo-quantidade");
      if (!input) return;
      const atual = Math.floor(Number(input.value) || 1);
      if (atual > 1) {
        input.value = atual - 1;
        this.recalcularEmTempoReal(false);
      }
    }
    // ─── CRUD de Orçamentos ────────────────────────────────────
    salvarOrcamentoAtual() {
      const nomeCliente = document.getElementById("campo-cliente-nome")?.value?.trim();
      const telCliente = document.getElementById("campo-cliente-telefone")?.value?.trim();
      const endereco = document.getElementById("campo-cliente-endereco")?.value?.trim();
      if (!nomeCliente) {
        this.mostrarToast("Por favor, informe o nome do cliente.", "erro");
        document.getElementById("campo-cliente-nome")?.focus();
        return;
      }
      if (!telCliente) {
        this.mostrarToast("Por favor, informe o telefone do cliente.", "erro");
        document.getElementById("campo-cliente-telefone")?.focus();
        return;
      }
      this.recalcularEmTempoReal();
      if (!this.ultimoCalculo) {
        this.mostrarToast("Erro ao processar as medidas da estrutura.", "erro");
        return;
      }
      const quantidade = Math.max(1, Math.floor(Number(document.getElementById("campo-quantidade")?.value) || 1));
      const config = StorageService.getConfig();
      const orcExistente = this.orcamentoEmEdicaoId ? StorageService.getOrcamentoById(this.orcamentoEmEdicaoId) : null;
      const inputMemPintura = document.getElementById("campo-memorial-pintura");
      const inputMemMaoObra = document.getElementById("campo-memorial-mao-obra");
      const inputCondPag = document.getElementById("campo-cond-pagamento");
      const inputCondPrazo = document.getElementById("campo-cond-prazo");
      const inputCondGarantia = document.getElementById("campo-cond-garantia");
      const memorialPintura = inputMemPintura?.value?.trim() || orcExistente?.memorialPintura || config.memorialPintura || "Aplica\xE7\xE3o de fundo protetor anticorrosivo (Zarc\xE3o). Acabamento final/pintura definitiva por conta do cliente.";
      const memorialMaoDeObra = inputMemMaoObra?.value?.trim() || orcExistente?.memorialMaoDeObra || config.memorialMaoDeObra || "Fabrica\xE7\xE3o e esquadrejamento em oficina especializada. Instala\xE7\xE3o e chumbamento no local por conta do pedreiro/cliente.";
      const condicoes = {
        formaPagamento: inputCondPag?.value?.trim() || orcExistente?.condicoes?.formaPagamento || config.condicoesFormaPagamento || "50% de sinal no pedido + 50% na retirada/entrega.",
        prazoEntrega: inputCondPrazo?.value?.trim() || orcExistente?.condicoes?.prazoEntrega || config.condicoesPrazoEntrega || "15 a 20 dias \xFAteis a contar da aprova\xE7\xE3o do sinal.",
        garantia: inputCondGarantia?.value?.trim() || orcExistente?.condicoes?.garantia || config.condicoesGarantia || "12 meses para soltura de soldas e funcionamento estrutural."
      };
      const orcamento = {
        id: this.orcamentoEmEdicaoId || void 0,
        cliente: {
          nome: nomeCliente,
          telefone: telCliente,
          enderecoObra: endereco
        },
        itens: this.itensOrcamento.length > 0 ? this.itensOrcamento : [this.ultimoCalculo.estrutura],
        estrutura: {
          tipo: this.tipologiaAtivaId,
          quantidade,
          larguraMm: Number(document.getElementById("campo-largura-mm")?.value),
          alturaMm: Number(document.getElementById("campo-altura-mm")?.value),
          espacamentoMm: Number(document.getElementById("campo-espacamento-mm")?.value),
          perfilRequadroId: document.getElementById("campo-perfil-requadro")?.value,
          perfilPreenchimentoId: document.getElementById("campo-perfil-preenchimento")?.value,
          totalBarras6m: this.ultimoCalculo.lote?.totalBarras6m || this.ultimoCalculo.estrutura.totalBarras6m,
          aproveitamentoPercentual: this.ultimoCalculo.lote?.aproveitamentoGeralPercentual || this.ultimoCalculo.estrutura.aproveitamentoGeralPercentual
        },
        financeiro: this.ultimoCalculo.financeiro,
        memorialPintura,
        memorialMaoDeObra,
        condicoes
      };
      const salvo = StorageService.saveOrcamento(orcamento);
      this.orcamentoEmEdicaoId = null;
      this.itensOrcamento = [];
      this.renderizarListaItensOrcamento();
      this.mostrarToast(`Or\xE7amento #${salvo.numeroSequencial} gravado com sucesso!`);
      this.mudarAba("orcamentos");
    }
    limparFormulario() {
      this.orcamentoEmEdicaoId = null;
      this.itensOrcamento = [];
      this.renderizarListaItensOrcamento();
      const titulo = document.getElementById("form-titulo");
      if (titulo) titulo.textContent = "Novo Or\xE7amento Param\xE9trico";
      const nomeInput = document.getElementById("campo-cliente-nome");
      const telInput = document.getElementById("campo-cliente-telefone");
      const endInput = document.getElementById("campo-cliente-endereco");
      const qtdInput = document.getElementById("campo-quantidade");
      if (nomeInput) nomeInput.value = "";
      if (telInput) telInput.value = "";
      if (endInput) endInput.value = "";
      if (qtdInput) qtdInput.value = 1;
      const config = StorageService.getConfig();
      const inputMemPintura = document.getElementById("campo-memorial-pintura");
      const inputMemMaoObra = document.getElementById("campo-memorial-mao-obra");
      const inputCondPag = document.getElementById("campo-cond-pagamento");
      const inputCondPrazo = document.getElementById("campo-cond-prazo");
      const inputCondGarantia = document.getElementById("campo-cond-garantia");
      if (inputMemPintura) inputMemPintura.value = config.memorialPintura || "Aplica\xE7\xE3o de fundo protetor anticorrosivo (Zarc\xE3o). Acabamento final/pintura definitiva por conta do cliente.";
      if (inputMemMaoObra) inputMemMaoObra.value = config.memorialMaoDeObra || "Fabrica\xE7\xE3o e esquadrejamento em oficina especializada. Instala\xE7\xE3o e chumbamento no local por conta do pedreiro/cliente.";
      if (inputCondPag) inputCondPag.value = config.condicoesFormaPagamento || "50% de sinal no pedido + 50% na retirada/entrega.";
      if (inputCondPrazo) inputCondPrazo.value = config.condicoesPrazoEntrega || "15 a 20 dias \xFAteis a contar da aprova\xE7\xE3o do sinal.";
      if (inputCondGarantia) inputCondGarantia.value = config.condicoesGarantia || "12 meses para soltura de soldas e funcionamento estrutural.";
      this.selecionarTipologia("portao_deslizante");
      this.mostrarToast("Formul\xE1rio pronto para novo or\xE7amento.");
    }
    editarOrcamento(id) {
      const orc = StorageService.getOrcamentoById(id);
      if (!orc) return;
      this.orcamentoEmEdicaoId = orc.id;
      this.itensOrcamento = Array.isArray(orc.itens) ? [...orc.itens] : [];
      this.renderizarListaItensOrcamento();
      const titulo = document.getElementById("form-titulo");
      if (titulo) titulo.textContent = `Editar Or\xE7amento #${orc.numeroSequencial}`;
      const nomeInput = document.getElementById("campo-cliente-nome");
      const telInput = document.getElementById("campo-cliente-telefone");
      const endInput = document.getElementById("campo-cliente-endereco");
      if (nomeInput) nomeInput.value = orc.cliente?.nome || "";
      if (telInput) telInput.value = orc.cliente?.telefone || "";
      if (endInput) endInput.value = orc.cliente?.enderecoObra || "";
      const est = orc.estrutura || {};
      this.tipologiaAtivaId = est.tipo || "portao_deslizante";
      const qtdInput = document.getElementById("campo-quantidade");
      const largInput = document.getElementById("campo-largura-mm");
      const altInput = document.getElementById("campo-altura-mm");
      const espInput = document.getElementById("campo-espacamento-mm");
      if (qtdInput) qtdInput.value = est.quantidade || 1;
      if (largInput) largInput.value = est.larguraMm || 3e3;
      if (altInput) altInput.value = est.alturaMm || 2200;
      if (espInput) espInput.value = est.espacamentoMm || 120;
      const reqSelect = document.getElementById("campo-perfil-requadro");
      const preSelect = document.getElementById("campo-perfil-preenchimento");
      if (reqSelect) reqSelect.value = est.perfilRequadroId || "metalon_50x30_18";
      if (preSelect) preSelect.value = est.perfilPreenchimentoId || "metalon_20x20_18";
      const fin = orc.financeiro || {};
      const inputInsumos = document.getElementById("campo-custo-insumos");
      const inputPintura = document.getElementById("campo-custo-pintura");
      const inputAcessorios = document.getElementById("campo-custo-acessorios");
      const inputMaoObra = document.getElementById("campo-custo-mao-obra");
      const inputFrete = document.getElementById("campo-custo-frete");
      const inputMargem = document.getElementById("campo-margem-manual");
      const sliderMargem = document.getElementById("campo-margem-slider");
      if (inputInsumos) inputInsumos.value = fin.custoInsumosConsumiveis != null ? fin.custoInsumosConsumiveis : "";
      if (inputPintura) inputPintura.value = fin.custoPintura != null ? fin.custoPintura : "";
      if (inputAcessorios) inputAcessorios.value = fin.custoAcessorios != null ? fin.custoAcessorios : "";
      if (inputMaoObra) inputMaoObra.value = fin.custoMaoDeObraTotal != null ? fin.custoMaoDeObraTotal : "";
      if (inputFrete) inputFrete.value = fin.custoFrete != null ? fin.custoFrete : "";
      const margemSalva = fin.margemLucroPercentual != null ? fin.margemLucroPercentual : 40;
      if (inputMargem) inputMargem.value = margemSalva;
      if (sliderMargem) sliderMargem.value = margemSalva;
      const config = StorageService.getConfig();
      const inputMemPintura = document.getElementById("campo-memorial-pintura");
      const inputMemMaoObra = document.getElementById("campo-memorial-mao-obra");
      const inputCondPag = document.getElementById("campo-cond-pagamento");
      const inputCondPrazo = document.getElementById("campo-cond-prazo");
      const inputCondGarantia = document.getElementById("campo-cond-garantia");
      if (inputMemPintura) inputMemPintura.value = orc.memorialPintura != null ? orc.memorialPintura : config.memorialPintura || "Aplica\xE7\xE3o de fundo protetor anticorrosivo (Zarc\xE3o). Acabamento final/pintura definitiva por conta do cliente.";
      if (inputMemMaoObra) inputMemMaoObra.value = orc.memorialMaoDeObra != null ? orc.memorialMaoDeObra : config.memorialMaoDeObra || "Fabrica\xE7\xE3o e esquadrejamento em oficina especializada. Instala\xE7\xE3o e chumbamento no local por conta do pedreiro/cliente.";
      const cond = orc.condicoes || {};
      if (inputCondPag) inputCondPag.value = cond.formaPagamento != null ? cond.formaPagamento : config.condicoesFormaPagamento || "50% de sinal no pedido + 50% na retirada/entrega.";
      if (inputCondPrazo) inputCondPrazo.value = cond.prazoEntrega != null ? cond.prazoEntrega : config.condicoesPrazoEntrega || "15 a 20 dias \xFAteis a contar da aprova\xE7\xE3o do sinal.";
      if (inputCondGarantia) inputCondGarantia.value = cond.garantia != null ? cond.garantia : config.condicoesGarantia || "12 meses para soltura de soldas e funcionamento estrutural.";
      this.renderizarTipologias();
      this.mudarAba("novo");
      this.recalcularEmTempoReal(false);
    }
    excluirOrcamento(id) {
      const orc = StorageService.getOrcamentoById(id);
      if (!orc) return;
      if (confirm(`Tem certeza que deseja excluir o Or\xE7amento #${orc.numeroSequencial} do cliente ${orc.cliente?.nome}?`)) {
        StorageService.deleteOrcamento(id);
        this.mostrarToast(`Or\xE7amento #${orc.numeroSequencial} removido.`);
        this.renderizarListaOrcamentos();
      }
    }
    duplicarOrcamento(id) {
      const clone = StorageService.duplicateOrcamento(id);
      if (clone) {
        this.mostrarToast(`Or\xE7amento clonado como #${clone.numeroSequencial}!`);
        this.renderizarListaOrcamentos();
      }
    }
    alterarStatusOrcamento(id, novoStatus) {
      StorageService.updateStatus(id, novoStatus);
      this.mostrarToast("Status atualizado com sucesso.");
      this.renderizarListaOrcamentos();
    }
    // ─── Renderização da Lista de Orçamentos ───────────────────
    filtrarStatus(status) {
      this.filtroStatus = status;
      document.querySelectorAll(".filtro-btn").forEach((btn) => {
        if (btn.getAttribute("data-status") === status) {
          btn.className = "filtro-btn px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-white";
        } else {
          btn.className = "filtro-btn px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200";
        }
      });
      this.renderizarListaOrcamentos();
    }
    buscarOrcamentos(termo) {
      this.termoBusca = termo.toLowerCase().trim();
      this.renderizarListaOrcamentos();
    }
    renderizarListaOrcamentos() {
      const container = document.getElementById("lista-orcamentos-container");
      const vazioEl = document.getElementById("orcamentos-vazio");
      if (!container) return;
      let todos = StorageService.getOrcamentos();
      const countTodos = document.getElementById("count-todos");
      const countAberto = document.getElementById("count-aberto");
      const countEnviado = document.getElementById("count-enviado");
      const countAprovado = document.getElementById("count-aprovado");
      const countEmProd = document.getElementById("count-em_producao");
      const countConcluido = document.getElementById("count-concluido");
      if (countTodos) countTodos.textContent = todos.length;
      if (countAberto) countAberto.textContent = todos.filter((o) => o.status === "aberto").length;
      if (countEnviado) countEnviado.textContent = todos.filter((o) => o.status === "enviado").length;
      if (countAprovado) countAprovado.textContent = todos.filter((o) => o.status === "aprovado").length;
      if (countEmProd) countEmProd.textContent = todos.filter((o) => o.status === "em_producao").length;
      if (countConcluido) countConcluido.textContent = todos.filter((o) => o.status === "concluido").length;
      let filtrados = todos;
      if (this.filtroStatus !== "todos") {
        filtrados = filtrados.filter((o) => o.status === this.filtroStatus);
      }
      if (this.termoBusca) {
        filtrados = filtrados.filter(
          (o) => o.cliente?.nome && o.cliente.nome.toLowerCase().includes(this.termoBusca) || o.cliente?.telefone && o.cliente.telefone.includes(this.termoBusca) || String(o.numeroSequencial).includes(this.termoBusca)
        );
      }
      if (filtrados.length === 0) {
        container.innerHTML = "";
        if (vazioEl) vazioEl.classList.remove("hidden");
        return;
      }
      if (vazioEl) vazioEl.classList.add("hidden");
      const statusCores = {
        aberto: "bg-amber-100 text-amber-800 border-amber-300",
        enviado: "bg-sky-100 text-sky-800 border-sky-300",
        aprovado: "bg-emerald-100 text-emerald-800 border-emerald-300",
        em_producao: "bg-purple-100 text-purple-800 border-purple-300",
        concluido: "bg-slate-200 text-slate-800 border-slate-300",
        recusado: "bg-rose-100 text-rose-800 border-rose-300"
      };
      const statusNomes = {
        aberto: "Em Aberto",
        enviado: "Enviado WhatsApp",
        aprovado: "Aprovado / Fechado",
        em_producao: "Em Produ\xE7\xE3o",
        concluido: "Obra Conclu\xEDda",
        recusado: "Recusado"
      };
      const formatBRL = (val) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val || 0);
      container.innerHTML = filtrados.map((orc) => {
        const corStatus = statusCores[orc.status] || "bg-slate-100 text-slate-700";
        const nomeStatus = statusNomes[orc.status] || orc.status;
        const dataStr = new Date(orc.dataCriacaoIso).toLocaleDateString("pt-BR");
        const tipoNome = (orc.estrutura?.tipo || "estrutura").replace(/_/g, " ");
        const totalItensCount = Array.isArray(orc.itens) && orc.itens.length > 0 ? orc.itens.length : 1;
        let resumoTextoItens = "";
        if (totalItensCount > 1) {
          resumoTextoItens = `${totalItensCount} itens inclusos na obra`;
        } else {
          resumoTextoItens = `${orc.estrutura?.larguraMm || 0} x ${orc.estrutura?.alturaMm || 0} mm`;
        }
        return `
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between space-y-4">
          
          <!-- Topo do Card -->
          <div class="flex items-start justify-between gap-2">
            <div>
              <span class="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                #${orc.numeroSequencial || "101"}
              </span>
              <h4 class="text-base font-bold text-slate-900 mt-1 leading-snug">${orc.cliente?.nome || "Cliente"}</h4>
              <p class="text-xs text-slate-500">${orc.cliente?.telefone || "-"}</p>
            </div>

            <!-- Seletor de Status Direto -->
            <select onchange="window.app.alterarStatusOrcamento('${orc.id}', this.value)" class="text-[11px] font-semibold rounded-lg px-2 py-1 border outline-none cursor-pointer ${corStatus}">
              <option value="aberto" ${orc.status === "aberto" ? "selected" : ""}>Em Aberto</option>
              <option value="enviado" ${orc.status === "enviado" ? "selected" : ""}>Enviado</option>
              <option value="aprovado" ${orc.status === "aprovado" ? "selected" : ""}>Aprovado</option>
              <option value="em_producao" ${orc.status === "em_producao" ? "selected" : ""}>Em Produ\xE7\xE3o</option>
              <option value="concluido" ${orc.status === "concluido" ? "selected" : ""}>Conclu\xEDdo</option>
              <option value="recusado" ${orc.status === "recusado" ? "selected" : ""}>Recusado</option>
            </select>
          </div>

          <!-- Meio: Dados da Pe\xE7a e Barras de 6m -->
          <div class="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1 text-xs text-slate-600">
            <div class="flex justify-between font-medium text-slate-800">
              <span class="capitalize">${totalItensCount > 1 ? `<span class="font-bold text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded text-[11px] mr-1">${totalItensCount} itens</span>Lote Integrado` : `${orc.estrutura?.quantidade > 1 ? `<span class="font-bold text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded text-[11px] mr-1">${orc.estrutura.quantidade}x</span>` : ""}${tipoNome}`}</span>
              <span>${resumoTextoItens}</span>
            </div>
            <div class="flex justify-between text-slate-500 pt-1 border-t border-slate-200/60">
              <span>Barras de 6m necess\xE1rias:</span>
              <b class="text-sky-600">${orc.estrutura?.totalBarras6m || 0} barras</b>
            </div>
          </div>

          <!-- Base: Valor e Bot\xF5es de A\xE7\xE3o -->
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span class="text-[10px] uppercase font-bold text-slate-400">Total do Or\xE7amento</span>
              <div class="text-lg font-black text-slate-900">${formatBRL(orc.financeiro?.precoVendaFinal)}</div>
            </div>

            <div class="flex items-center gap-1.5">
              <button onclick="window.app.abrirModalPropostaPorId('${orc.id}')" title="Compartilhar PDF ou WhatsApp" class="p-2 rounded-lg bg-sky-600 text-white hover:bg-sky-500 transition shadow-sm">
                <i data-lucide="send" class="w-4 h-4"></i>
              </button>
              <button onclick="window.app.duplicarOrcamento('${orc.id}')" title="Duplicar Or\xE7amento" class="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
                <i data-lucide="copy" class="w-4 h-4"></i>
              </button>
              <button onclick="window.app.editarOrcamento('${orc.id}')" title="Editar Or\xE7amento" class="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
                <i data-lucide="edit-2" class="w-4 h-4"></i>
              </button>
              <button onclick="window.app.excluirOrcamento('${orc.id}')" title="Excluir" class="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

        </div>
      `;
      }).join("");
      this.atualizarIcones();
    }
    // ─── Modal de Emissão de Proposta (PDF / WhatsApp) ─────────
    abrirModalPropostaPorId(id) {
      const orc = StorageService.getOrcamentoById(id);
      if (orc) this.abrirModalProposta(orc);
    }
    abrirModalPropostaAtual() {
      this.recalcularEmTempoReal();
      if (!this.ultimoCalculo) return;
      const nomeCliente = document.getElementById("campo-cliente-nome")?.value?.trim() || "Cliente";
      const telCliente = document.getElementById("campo-cliente-telefone")?.value?.trim() || "";
      const endereco = document.getElementById("campo-cliente-endereco")?.value?.trim() || "";
      const quantidade = Math.max(1, Math.floor(Number(document.getElementById("campo-quantidade")?.value) || 1));
      const config = StorageService.getConfig();
      const inputMemPintura = document.getElementById("campo-memorial-pintura");
      const inputMemMaoObra = document.getElementById("campo-memorial-mao-obra");
      const inputCondPag = document.getElementById("campo-cond-pagamento");
      const inputCondPrazo = document.getElementById("campo-cond-prazo");
      const inputCondGarantia = document.getElementById("campo-cond-garantia");
      const orcamentoMock = {
        id: this.orcamentoEmEdicaoId || void 0,
        numeroSequencial: this.orcamentoEmEdicaoId ? "Edi\xE7\xE3o" : "Novo",
        dataCriacaoIso: (/* @__PURE__ */ new Date()).toISOString(),
        cliente: { nome: nomeCliente, telefone: telCliente, enderecoObra: endereco },
        itens: this.itensOrcamento.length > 0 ? this.itensOrcamento : [this.ultimoCalculo.estrutura],
        estrutura: {
          tipo: this.tipologiaAtivaId,
          quantidade,
          larguraMm: Number(document.getElementById("campo-largura-mm")?.value),
          alturaMm: Number(document.getElementById("campo-altura-mm")?.value),
          perfilRequadroId: document.getElementById("campo-perfil-requadro")?.value,
          perfilPreenchimentoId: document.getElementById("campo-perfil-preenchimento")?.value,
          totalBarras6m: this.ultimoCalculo.lote?.totalBarras6m || this.ultimoCalculo.estrutura.totalBarras6m
        },
        financeiro: this.ultimoCalculo.financeiro,
        memorialPintura: inputMemPintura?.value?.trim() || config.memorialPintura || "Aplica\xE7\xE3o de fundo protetor anticorrosivo (Zarc\xE3o). Acabamento final/pintura definitiva por conta do cliente.",
        memorialMaoDeObra: inputMemMaoObra?.value?.trim() || config.memorialMaoDeObra || "Fabrica\xE7\xE3o e esquadrejamento em oficina especializada. Instala\xE7\xE3o e chumbamento no local por conta do pedreiro/cliente.",
        condicoes: {
          formaPagamento: inputCondPag?.value?.trim() || config.condicoesFormaPagamento || "50% de sinal no pedido + 50% na retirada/entrega.",
          prazoEntrega: inputCondPrazo?.value?.trim() || config.condicoesPrazoEntrega || "15 a 20 dias \xFAteis a contar da aprova\xE7\xE3o do sinal.",
          garantia: inputCondGarantia?.value?.trim() || config.condicoesGarantia || "12 meses para soltura de soldas e funcionamento estrutural."
        }
      };
      this.abrirModalProposta(orcamentoMock);
    }
    abrirModalProposta(orcamento) {
      this.orcamentoModal = orcamento;
      const config = StorageService.getConfig();
      const formatBRL = (val) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val || 0);
      const subEl = document.getElementById("modal-proposta-subtitulo");
      const cliEl = document.getElementById("modal-cliente-nome");
      const estEl = document.getElementById("modal-estrutura-resumo");
      const barEl = document.getElementById("modal-barras-total");
      const valEl = document.getElementById("modal-valor-total");
      const txtPreview = document.getElementById("modal-preview-whatsapp");
      const listaItens = Array.isArray(orcamento.itens) && orcamento.itens.length > 0 ? orcamento.itens : [orcamento.estrutura || {}];
      if (subEl) subEl.textContent = `Or\xE7amento #${orcamento.numeroSequencial || "101"}`;
      if (cliEl) cliEl.textContent = `${orcamento.cliente?.nome || "Cliente"} (${orcamento.cliente?.telefone || "-"})`;
      if (estEl) {
        if (listaItens.length > 1) {
          estEl.textContent = `Lote com ${listaItens.length} itens inclusos na obra`;
        } else {
          const itemUnico = listaItens[0];
          const qtd = Number(itemUnico.quantidade) || 1;
          const tipoNome = (itemUnico.tipo || "estrutura").replace(/_/g, " ");
          const prefixoQtd = qtd > 1 ? `${qtd}x ` : "";
          const larg = itemUnico.dimensoes?.larguraMm || itemUnico.larguraMm;
          const alt = itemUnico.dimensoes?.alturaMm || itemUnico.alturaMm;
          estEl.textContent = `${prefixoQtd}${tipoNome} (${larg}mm x ${alt}mm)`;
        }
      }
      const totalBarras = orcamento.estrutura?.totalBarras6m || 0;
      if (barEl) barEl.textContent = `${totalBarras} barras de 6 metros`;
      if (valEl) valEl.textContent = formatBRL(orcamento.financeiro?.precoVendaFinal);
      const condSalvas = orcamento.condicoes || {};
      const inputPag = document.getElementById("modal-cond-pagamento");
      const inputPrazo = document.getElementById("modal-cond-prazo");
      const inputGarantia = document.getElementById("modal-cond-garantia");
      const inputPintura = document.getElementById("modal-memorial-pintura");
      const inputMaoObra = document.getElementById("modal-memorial-mao-obra");
      if (inputPag) {
        inputPag.value = condSalvas.formaPagamento != null ? condSalvas.formaPagamento : config.condicoesFormaPagamento != null ? config.condicoesFormaPagamento : "50% de sinal no pedido + 50% na retirada/entrega.";
      }
      if (inputPrazo) {
        inputPrazo.value = condSalvas.prazoEntrega != null ? condSalvas.prazoEntrega : config.condicoesPrazoEntrega != null ? config.condicoesPrazoEntrega : "15 a 20 dias \xFAteis a contar da aprova\xE7\xE3o do sinal.";
      }
      if (inputGarantia) {
        inputGarantia.value = condSalvas.garantia != null ? condSalvas.garantia : config.condicoesGarantia != null ? config.condicoesGarantia : "12 meses para soltura de soldas e funcionamento estrutural.";
      }
      if (inputPintura) {
        inputPintura.value = orcamento.memorialPintura != null ? orcamento.memorialPintura : config.memorialPintura != null ? config.memorialPintura : "Aplica\xE7\xE3o de fundo protetor anticorrosivo (Zarc\xE3o). Acabamento final/pintura definitiva por conta do cliente.";
      }
      if (inputMaoObra) {
        inputMaoObra.value = orcamento.memorialMaoDeObra != null ? orcamento.memorialMaoDeObra : config.memorialMaoDeObra != null ? config.memorialMaoDeObra : "Fabrica\xE7\xE3o e esquadrejamento em oficina especializada. Instala\xE7\xE3o e chumbamento no local por conta do pedreiro/cliente.";
      }
      this.sincronizarCondicoesDoModal();
      this.atualizarCardPixModal();
      const msg = formatarMensagemWhatsapp(this.orcamentoModal, config);
      if (txtPreview) txtPreview.value = msg;
      const modal = document.getElementById("modal-proposta");
      if (modal) modal.classList.remove("hidden");
      this.atualizarIcones();
    }
    sincronizarCondicoesDoModal() {
      if (!this.orcamentoModal) return;
      const inputPag = document.getElementById("modal-cond-pagamento");
      const inputPrazo = document.getElementById("modal-cond-prazo");
      const inputGarantia = document.getElementById("modal-cond-garantia");
      const inputPintura = document.getElementById("modal-memorial-pintura");
      const inputMaoObra = document.getElementById("modal-memorial-mao-obra");
      this.orcamentoModal.condicoes = {
        formaPagamento: inputPag ? inputPag.value : "",
        prazoEntrega: inputPrazo ? inputPrazo.value : "",
        garantia: inputGarantia ? inputGarantia.value : ""
      };
      if (inputPintura) {
        this.orcamentoModal.memorialPintura = inputPintura.value;
      }
      if (inputMaoObra) {
        this.orcamentoModal.memorialMaoDeObra = inputMaoObra.value;
      }
      if (this.orcamentoModal.id) {
        StorageService.saveOrcamento(this.orcamentoModal);
        this.renderizarListaOrcamentos();
        if (this.orcamentoEmEdicaoId === this.orcamentoModal.id) {
          const fPintura = document.getElementById("campo-memorial-pintura");
          const fMaoObra = document.getElementById("campo-memorial-mao-obra");
          const fPag = document.getElementById("campo-cond-pagamento");
          const fPrazo = document.getElementById("campo-cond-prazo");
          const fGarantia = document.getElementById("campo-cond-garantia");
          if (fPintura) fPintura.value = this.orcamentoModal.memorialPintura;
          if (fMaoObra) fMaoObra.value = this.orcamentoModal.memorialMaoDeObra;
          if (fPag) fPag.value = this.orcamentoModal.condicoes.formaPagamento;
          if (fPrazo) fPrazo.value = this.orcamentoModal.condicoes.prazoEntrega;
          if (fGarantia) fGarantia.value = this.orcamentoModal.condicoes.garantia;
        }
      }
      const statusEl = document.getElementById("modal-salvo-status");
      if (statusEl) {
        statusEl.classList.remove("hidden");
      }
    }
    atualizarPreviewCondicoesModal() {
      if (!this.orcamentoModal) return;
      this.sincronizarCondicoesDoModal();
      this.atualizarCardPixModal();
      const config = StorageService.getConfig();
      const txtPreview = document.getElementById("modal-preview-whatsapp");
      if (txtPreview) {
        txtPreview.value = formatarMensagemWhatsapp(this.orcamentoModal, config);
      }
    }
    atualizarCardPixModal() {
      if (!this.orcamentoModal) return;
      const config = StorageService.getConfig();
      const chavePix = config.chavePix || "";
      const blocoPix = document.getElementById("modal-bloco-pix");
      if (!blocoPix) return;
      if (!chavePix) {
        blocoPix.classList.add("hidden");
        this.dadosPixAtual = null;
        return;
      }
      blocoPix.classList.remove("hidden");
      const cond = this.orcamentoModal.condicoes || {};
      const formaPag = cond.formaPagamento || config.condicoesFormaPagamento || "50%";
      const valorTotal = this.orcamentoModal.financeiro?.precoVendaFinal || 0;
      const dadosPix = gerarDadosPixEntrada({
        chavePix,
        nomeRecebedor: config.nomeFantasia,
        cidade: config.cidadeEstado,
        valorTotal,
        entradaOuPercentual: formaPag,
        txid: String(this.orcamentoModal.numeroSequencial || "101")
      });
      this.dadosPixAtual = dadosPix;
      if (dadosPix) {
        const img = document.getElementById("modal-pix-qrcode-img");
        const valEntradaEl = document.getElementById("modal-pix-valor-entrada");
        const badgePercEl = document.getElementById("modal-pix-badge-percentual");
        const chaveTextoEl = document.getElementById("modal-pix-chave-texto");
        if (img) img.src = dadosPix.dataUrl;
        const fmtBRL = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v || 0);
        if (valEntradaEl) valEntradaEl.textContent = fmtBRL(dadosPix.valorEntrada);
        if (badgePercEl) badgePercEl.textContent = `${dadosPix.percentualEntrada}% de entrada`;
        if (chaveTextoEl) chaveTextoEl.textContent = dadosPix.chavePix;
      }
    }
    copiarChavePixModal() {
      if (this.dadosPixAtual?.chavePix) {
        navigator.clipboard.writeText(this.dadosPixAtual.chavePix).then(() => {
          this.mostrarToast("Chave Pix copiada para a \xE1rea de transfer\xEAncia!");
        }).catch(() => {
          this.mostrarToast(`Chave Pix: ${this.dadosPixAtual.chavePix}`);
        });
      }
    }
    copiarPixCopiaEColaModal() {
      if (this.dadosPixAtual?.payloadPix) {
        navigator.clipboard.writeText(this.dadosPixAtual.payloadPix).then(() => {
          this.mostrarToast("C\xF3digo Pix Copia e Cola copiado com sucesso!");
        }).catch(() => {
          this.mostrarToast("C\xF3digo Pix pronto!");
        });
      }
    }
    fecharModalProposta() {
      const modal = document.getElementById("modal-proposta");
      if (modal) modal.classList.add("hidden");
      this.orcamentoModal = null;
      this.dadosPixAtual = null;
    }
    executarDownloadPdf() {
      if (!this.orcamentoModal) {
        this.mostrarToast("Nenhum or\xE7amento selecionado para emiss\xE3o.", "erro");
        return;
      }
      try {
        this.sincronizarCondicoesDoModal();
        const config = StorageService.getConfig();
        gerarPropostaPDF(this.orcamentoModal, config);
        this.mostrarToast("Download da proposta em PDF iniciado!");
      } catch (err) {
        console.error("Erro ao gerar PDF:", err);
        this.mostrarToast(`Falha ao gerar PDF: ${err.message}`, "erro");
      }
    }
    executarEnvioWhatsapp() {
      if (!this.orcamentoModal) return;
      this.sincronizarCondicoesDoModal();
      const config = StorageService.getConfig();
      dispararWhatsapp(this.orcamentoModal, config);
      this.mostrarToast("WhatsApp acionado com a mensagem!");
    }
    copiarMensagemWhatsapp() {
      const txtPreview = document.getElementById("modal-preview-whatsapp");
      if (txtPreview && txtPreview.value) {
        navigator.clipboard.writeText(txtPreview.value).then(() => {
          this.mostrarToast("Texto copiado para a \xE1rea de transfer\xEAncia!");
        }).catch(() => {
          txtPreview.select();
          document.execCommand("copy");
          this.mostrarToast("Texto copiado!");
        });
      }
    }
    // ─── Catálogo & Preços ─────────────────────────────────────
    filtrarCatalogoCategoria(categoria) {
      this.filtroCatalogoCategoria = categoria;
      const botoes = document.querySelectorAll(".cat-filtro-btn");
      botoes.forEach((btn) => {
        const cat = btn.getAttribute("data-categoria");
        if (cat === categoria) {
          btn.className = "cat-filtro-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white shadow-sm transition whitespace-nowrap";
        } else {
          btn.className = "cat-filtro-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition whitespace-nowrap";
        }
      });
      this.renderizarTabelaCatalogo();
    }
    buscarCatalogo(termo) {
      this.termoBuscaCatalogo = (termo || "").toLowerCase().trim();
      this.renderizarTabelaCatalogo();
    }
    renderizarTabelaCatalogo() {
      const tbody = document.getElementById("tabela-catalogo-body");
      if (!tbody) return;
      const catalogo = StorageService.getCatalogo();
      this.atualizarContadoresCatalogo(catalogo);
      let lista = catalogo;
      if (this.filtroCatalogoCategoria !== "todos") {
        lista = lista.filter((m) => m.categoria === this.filtroCatalogoCategoria);
      }
      if (this.termoBuscaCatalogo) {
        lista = lista.filter((m) => {
          const nome = (m.nome || "").toLowerCase();
          const desc = (m.descricao || "").toLowerCase();
          const dim = (m.dimensaoTexto || "").toLowerCase();
          const cat = (m.categoria || "").toLowerCase();
          return nome.includes(this.termoBuscaCatalogo) || desc.includes(this.termoBuscaCatalogo) || dim.includes(this.termoBuscaCatalogo) || cat.includes(this.termoBuscaCatalogo);
        });
      }
      if (lista.length === 0) {
        tbody.innerHTML = `
        <tr>
          <td colspan="5" class="py-12 text-center text-slate-400">
            <i data-lucide="package-search" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
            <p class="font-bold text-sm text-slate-600">Nenhum material encontrado com os filtros atuais.</p>
            <p class="text-xs text-slate-400 mt-1">Tente pesquisar outro termo ou selecione a categoria "Todos".</p>
          </td>
        </tr>
      `;
        this.atualizarIcones();
        return;
      }
      tbody.innerHTML = lista.map((m) => {
        const precoMetro = m.unidadeMedida === "barra_6m" ? `<div class="text-[11px] text-slate-400 font-mono mt-0.5">\u2248 R$ ${(m.precoUnitarioPadrao / 6).toFixed(2)}/m</div>` : "";
        const dimBadge = m.dimensaoTexto ? `<span class="inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-600 rounded mr-1">${m.dimensaoTexto}</span>` : "";
        const densidadeTexto = m.densidadeLinearKgM ? `<span class="text-[11px] text-slate-400"> \u2022 ${m.densidadeLinearKgM} kg/m</span>` : "";
        const nomeEscapado = (m.nome || "").replace(/'/g, "\\'");
        return `
        <tr class="hover:bg-slate-50 transition border-b border-slate-100">
          <td class="px-4 py-3">
            <div class="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              ${m.nome}
            </div>
            <div class="text-xs text-slate-500 mt-0.5 flex items-center flex-wrap gap-1">
              ${dimBadge}
              <span>${m.descricao || ""}</span>
              ${densidadeTexto}
            </div>
          </td>
          <td class="px-4 py-3">
            ${this.getBadgeCategoriaHtml(m.categoria)}
          </td>
          <td class="px-4 py-3">
            <div class="text-xs font-semibold text-slate-700">${this.getLabelUnidade(m.unidadeMedida)}</div>
            ${precoMetro}
          </td>
          <td class="px-4 py-3 text-right">
            <div class="inline-flex items-center gap-1">
              <span class="text-xs text-slate-400 font-bold">R$</span>
              <input type="number" id="preco-item-${m.id}" value="${Number(m.precoUnitarioPadrao).toFixed(2)}" step="any" min="0" class="w-24 px-2 py-1 text-sm font-mono font-bold text-right rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none">
            </div>
          </td>
          <td class="px-4 py-3 text-center">
            <div class="flex items-center justify-center gap-1">
              <button onclick="window.app.abrirModalEditarMaterial('${m.id}')" title="Editar Material Completo" class="p-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-bold text-xs transition flex items-center gap-1">
                <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
              </button>
              <button onclick="window.app.salvarPrecoMaterial('${m.id}')" title="Salvar Pre\xE7o R\xE1pido" class="p-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold text-xs transition flex items-center gap-1">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
              </button>
              <button onclick="window.app.excluirMaterial('${m.id}', '${nomeEscapado}')" title="Excluir Material" class="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
      }).join("");
      this.atualizarIcones();
    }
    getBadgeCategoriaHtml(categoria) {
      const map = {
        metalon: { label: "Metalon", bg: "bg-sky-100 text-sky-800 border-sky-200" },
        cantoneira: { label: "Cantoneira", bg: "bg-amber-100 text-amber-800 border-amber-200" },
        barra_chata: { label: "Barra Chata", bg: "bg-orange-100 text-orange-800 border-orange-200" },
        tubo_redondo: { label: "Tubo Redondo", bg: "bg-indigo-100 text-indigo-800 border-indigo-200" },
        chapa: { label: "Chapa / Painel", bg: "bg-purple-100 text-purple-800 border-purple-200" },
        insumo_solda: { label: "Solda & Insumos", bg: "bg-rose-100 text-rose-800 border-rose-200" },
        pintura: { label: "Pintura", bg: "bg-teal-100 text-teal-800 border-teal-200" },
        acessorio: { label: "Acess\xF3rio", bg: "bg-slate-100 text-slate-800 border-slate-200" }
      };
      const c = map[categoria] || { label: categoria, bg: "bg-slate-100 text-slate-700 border-slate-200" };
      return `<span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${c.bg}">${c.label}</span>`;
    }
    getLabelUnidade(unidade) {
      const map = {
        barra_6m: "Barra de 6m",
        kg: "Quilograma (kg)",
        disco: "Unidade (disco)",
        litro: "Litro (L)",
        chapa: "Chapa inteira",
        unidade: "Unidade (p\xE7)",
        metro: "Metro linear"
      };
      return map[unidade] || unidade;
    }
    atualizarContadoresCatalogo(catalogo) {
      const setCounter = (id, count) => {
        const el = document.getElementById(id);
        if (el) el.textContent = count;
      };
      setCounter("cat-count-todos", catalogo.length);
      setCounter("cat-count-metalon", catalogo.filter((m) => m.categoria === "metalon").length);
      setCounter("cat-count-cantoneira", catalogo.filter((m) => m.categoria === "cantoneira").length);
      setCounter("cat-count-barra_chata", catalogo.filter((m) => m.categoria === "barra_chata").length);
      setCounter("cat-count-tubo_redondo", catalogo.filter((m) => m.categoria === "tubo_redondo").length);
      setCounter("cat-count-chapa", catalogo.filter((m) => m.categoria === "chapa").length);
      setCounter("cat-count-insumo_solda", catalogo.filter((m) => m.categoria === "insumo_solda").length);
      setCounter("cat-count-pintura", catalogo.filter((m) => m.categoria === "pintura").length);
      setCounter("cat-count-acessorio", catalogo.filter((m) => m.categoria === "acessorio").length);
    }
    salvarPrecoMaterial(id) {
      const input = document.getElementById(`preco-item-${id}`);
      if (!input) return;
      const novoPreco = Number(input.value);
      if (isNaN(novoPreco) || novoPreco < 0) {
        this.mostrarToast("Pre\xE7o inv\xE1lido.", "erro");
        return;
      }
      StorageService.updatePrecoMaterial(id, novoPreco);
      this.mostrarToast("Pre\xE7o unit\xE1rio atualizado!");
      this.renderizarSelectsPerfis();
      this.recalcularEmTempoReal();
    }
    abrirModalNovoMaterial() {
      const modal = document.getElementById("modal-novo-material");
      if (!modal) return;
      document.getElementById("form-novo-material")?.reset();
      modal.classList.remove("hidden");
      this.atualizarIcones();
    }
    fecharModalNovoMaterial() {
      const modal = document.getElementById("modal-novo-material");
      if (modal) modal.classList.add("hidden");
    }
    salvarNovoMaterial() {
      const nome = document.getElementById("novo-mat-nome")?.value?.trim();
      const categoria = document.getElementById("novo-mat-categoria")?.value || "metalon";
      const dimensaoTexto = document.getElementById("novo-mat-dimensao")?.value?.trim() || "";
      const unidadeMedida = document.getElementById("novo-mat-unidade")?.value || "barra_6m";
      const preco = Number(document.getElementById("novo-mat-preco")?.value);
      const densidade = Number(document.getElementById("novo-mat-densidade")?.value) || 0;
      const descricao = document.getElementById("novo-mat-descricao")?.value?.trim() || "";
      if (!nome) {
        this.mostrarToast("Por favor, informe o nome do material.", "erro");
        return;
      }
      if (isNaN(preco) || preco <= 0) {
        this.mostrarToast("Informe um pre\xE7o unit\xE1rio v\xE1lido.", "erro");
        return;
      }
      const novo = {
        id: "custom_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
        categoria,
        nome,
        descricao: descricao || `${nome} (${dimensaoTexto})`,
        dimensaoTexto,
        unidadeMedida,
        precoUnitarioPadrao: preco,
        densidadeLinearKgM: densidade > 0 ? densidade : void 0
      };
      StorageService.addMaterial(novo);
      this.fecharModalNovoMaterial();
      this.mostrarToast(`Material "${nome}" cadastrado com sucesso!`);
      this.renderizarTabelaCatalogo();
      this.renderizarSelectsPerfis();
      this.recalcularEmTempoReal();
    }
    abrirModalEditarMaterial(id) {
      const mat = StorageService.getMaterialById(id);
      if (!mat) {
        this.mostrarToast("Material n\xE3o encontrado.", "erro");
        return;
      }
      const modal = document.getElementById("modal-editar-material");
      if (!modal) return;
      document.getElementById("edit-mat-id").value = mat.id;
      document.getElementById("edit-mat-nome").value = mat.nome || "";
      document.getElementById("edit-mat-categoria").value = mat.categoria || "metalon";
      document.getElementById("edit-mat-dimensao").value = mat.dimensaoTexto || "";
      document.getElementById("edit-mat-unidade").value = mat.unidadeMedida || "barra_6m";
      document.getElementById("edit-mat-preco").value = mat.precoUnitarioPadrao != null ? mat.precoUnitarioPadrao : "";
      document.getElementById("edit-mat-densidade").value = mat.densidadeLinearKgM != null ? mat.densidadeLinearKgM : "";
      document.getElementById("edit-mat-descricao").value = mat.descricao || "";
      modal.classList.remove("hidden");
      this.atualizarIcones();
    }
    fecharModalEditarMaterial() {
      const modal = document.getElementById("modal-editar-material");
      if (modal) modal.classList.add("hidden");
    }
    salvarEdicaoMaterial() {
      const id = document.getElementById("edit-mat-id")?.value;
      const nome = document.getElementById("edit-mat-nome")?.value?.trim();
      const categoria = document.getElementById("edit-mat-categoria")?.value || "metalon";
      const dimensaoTexto = document.getElementById("edit-mat-dimensao")?.value?.trim() || "";
      const unidadeMedida = document.getElementById("edit-mat-unidade")?.value || "barra_6m";
      const preco = Number(document.getElementById("edit-mat-preco")?.value);
      const densidade = Number(document.getElementById("edit-mat-densidade")?.value) || 0;
      const descricao = document.getElementById("edit-mat-descricao")?.value?.trim() || "";
      if (!id) {
        this.mostrarToast("Identificador de material ausente.", "erro");
        return;
      }
      if (!nome) {
        this.mostrarToast("Por favor, informe o nome do material.", "erro");
        return;
      }
      if (isNaN(preco) || preco <= 0) {
        this.mostrarToast("Informe um pre\xE7o unit\xE1rio v\xE1lido.", "erro");
        return;
      }
      const dados = {
        nome,
        categoria,
        dimensaoTexto,
        unidadeMedida,
        precoUnitarioPadrao: preco,
        densidadeLinearKgM: densidade > 0 ? densidade : void 0,
        descricao: descricao || `${nome} (${dimensaoTexto})`
      };
      const atualizado = StorageService.updateMaterial(id, dados);
      if (atualizado) {
        this.fecharModalEditarMaterial();
        this.mostrarToast(`Material "${nome}" atualizado com sucesso!`);
        this.renderizarTabelaCatalogo();
        this.renderizarSelectsPerfis();
        this.recalcularEmTempoReal();
      } else {
        this.mostrarToast("Erro ao atualizar material.", "erro");
      }
    }
    excluirMaterial(id, nome) {
      if (!confirm(`Deseja realmente remover o material "${nome}" do cat\xE1logo?`)) return;
      StorageService.deleteMaterial(id);
      this.mostrarToast(`"${nome}" removido do cat\xE1logo.`);
      this.renderizarTabelaCatalogo();
      this.renderizarSelectsPerfis();
      this.recalcularEmTempoReal();
    }
    abrirModalReajusteMassa() {
      const modal = document.getElementById("modal-reajuste-massa");
      if (!modal) return;
      modal.classList.remove("hidden");
      this.atualizarIcones();
    }
    fecharModalReajusteMassa() {
      const modal = document.getElementById("modal-reajuste-massa");
      if (modal) modal.classList.add("hidden");
    }
    definirPercentualReajuste(pct) {
      const input = document.getElementById("reajuste-percentual");
      if (input) input.value = pct;
    }
    aplicarReajusteMassa() {
      const inputPct = document.getElementById("reajuste-percentual");
      const selectCat = document.getElementById("reajuste-categoria");
      const percentual = Number(inputPct?.value);
      const categoria = selectCat?.value || "todos";
      if (isNaN(percentual) || percentual === 0) {
        this.mostrarToast("Informe uma porcentagem v\xE1lida de reajuste (ex: 5 ou -5).", "erro");
        return;
      }
      const sinal = percentual > 0 ? `+${percentual}%` : `${percentual}%`;
      const catNome = categoria === "todos" ? "todos os materiais" : `materiais da categoria "${categoria}"`;
      if (!confirm(`Confirmar aplica\xE7\xE3o de reajuste de ${sinal} em ${catNome}?`)) return;
      const res = StorageService.reajustarPrecos(percentual, categoria);
      this.fecharModalReajusteMassa();
      this.mostrarToast(`Reajuste de ${sinal} aplicado em ${res.afetados} itens!`);
      this.renderizarTabelaCatalogo();
      this.renderizarSelectsPerfis();
      this.recalcularEmTempoReal();
    }
    restaurarPresetsFabrica() {
      if (confirm("Deseja restaurar todos os pre\xE7os de materiais para os valores padr\xE3o de f\xE1brica?")) {
        StorageService.importBackup(JSON.stringify({
          dados: { catalogo: DEFAULT_PRESETS }
        }));
        this.mostrarToast("Pre\xE7os de f\xE1brica restaurados!");
        this.renderizarTabelaCatalogo();
        this.renderizarSelectsPerfis();
        this.recalcularEmTempoReal();
      }
    }
    // ─── Configurações da Oficina & Backup ──────────────────────
    carregarConfiguracoesNaTela() {
      const cfg = StorageService.getConfig();
      const nomeHeader = document.getElementById("header-oficina-nome");
      if (nomeHeader) nomeHeader.textContent = cfg.nomeFantasia || "Serralheria Modelo";
      const elNome = document.getElementById("cfg-nome-oficina");
      const elTel = document.getElementById("cfg-telefone");
      const elCid = document.getElementById("cfg-cidade");
      const elPix = document.getElementById("cfg-pix");
      const elHora = document.getElementById("cfg-valor-hora");
      const elKerf = document.getElementById("cfg-kerf");
      const elCondPag = document.getElementById("cfg-cond-pagamento");
      const elCondPrazo = document.getElementById("cfg-cond-prazo");
      const elCondGarantia = document.getElementById("cfg-cond-garantia");
      const elMemPintura = document.getElementById("cfg-memorial-pintura");
      const elMemMaoObra = document.getElementById("cfg-memorial-mao-obra");
      if (elNome) elNome.value = cfg.nomeFantasia || "";
      if (elTel) elTel.value = cfg.telefoneContato || "";
      if (elCid) elCid.value = cfg.cidadeEstado || "";
      if (elPix) elPix.value = cfg.chavePix || "";
      if (elHora) elHora.value = cfg.valorHoraMaoDeObra || 50;
      if (elKerf) elKerf.value = cfg.kerfCortePadraoMm || 3;
      if (elCondPag) elCondPag.value = cfg.condicoesFormaPagamento || "50% de sinal no pedido + 50% na retirada/entrega.";
      if (elCondPrazo) elCondPrazo.value = cfg.condicoesPrazoEntrega || "15 a 20 dias \xFAteis a contar da aprova\xE7\xE3o do sinal.";
      if (elCondGarantia) elCondGarantia.value = cfg.condicoesGarantia || "12 meses para soltura de soldas e funcionamento estrutural.";
      if (elMemPintura) elMemPintura.value = cfg.memorialPintura || "Aplica\xE7\xE3o de fundo protetor anticorrosivo (Zarc\xE3o). Acabamento final/pintura definitiva por conta do cliente.";
      if (elMemMaoObra) elMemMaoObra.value = cfg.memorialMaoDeObra || "Fabrica\xE7\xE3o e esquadrejamento em oficina especializada. Instala\xE7\xE3o e chumbamento no local por conta do pedreiro/cliente.";
      const fMemPintura = document.getElementById("campo-memorial-pintura");
      const fMemMaoObra = document.getElementById("campo-memorial-mao-obra");
      const fCondPag = document.getElementById("campo-cond-pagamento");
      const fCondPrazo = document.getElementById("campo-cond-prazo");
      const fCondGarantia = document.getElementById("campo-cond-garantia");
      if (fMemPintura && !fMemPintura.value) fMemPintura.value = cfg.memorialPintura || "Aplica\xE7\xE3o de fundo protetor anticorrosivo (Zarc\xE3o). Acabamento final/pintura definitiva por conta do cliente.";
      if (fMemMaoObra && !fMemMaoObra.value) fMemMaoObra.value = cfg.memorialMaoDeObra || "Fabrica\xE7\xE3o e esquadrejamento em oficina especializada. Instala\xE7\xE3o e chumbamento no local por conta do pedreiro/cliente.";
      if (fCondPag && !fCondPag.value) fCondPag.value = cfg.condicoesFormaPagamento || "50% de sinal no pedido + 50% na retirada/entrega.";
      if (fCondPrazo && !fCondPrazo.value) fCondPrazo.value = cfg.condicoesPrazoEntrega || "15 a 20 dias \xFAteis a contar da aprova\xE7\xE3o do sinal.";
      if (fCondGarantia && !fCondGarantia.value) fCondGarantia.value = cfg.condicoesGarantia || "12 meses para soltura de soldas e funcionamento estrutural.";
    }
    salvarConfiguracoes() {
      const dados = {
        nomeFantasia: document.getElementById("cfg-nome-oficina")?.value?.trim() || "Serralheria",
        telefoneContato: document.getElementById("cfg-telefone")?.value?.trim() || "",
        cidadeEstado: document.getElementById("cfg-cidade")?.value?.trim() || "",
        chavePix: document.getElementById("cfg-pix")?.value?.trim() || "",
        valorHoraMaoDeObra: Number(document.getElementById("cfg-valor-hora")?.value) || 50,
        kerfCortePadraoMm: Number(document.getElementById("cfg-kerf")?.value) || 3,
        condicoesFormaPagamento: document.getElementById("cfg-cond-pagamento")?.value?.trim() || "50% de sinal no pedido + 50% na retirada/entrega.",
        condicoesPrazoEntrega: document.getElementById("cfg-cond-prazo")?.value?.trim() || "15 a 20 dias \xFAteis a contar da aprova\xE7\xE3o do sinal.",
        condicoesGarantia: document.getElementById("cfg-cond-garantia")?.value?.trim() || "12 meses para soltura de soldas e funcionamento estrutural.",
        memorialPintura: document.getElementById("cfg-memorial-pintura")?.value?.trim() || "Aplica\xE7\xE3o de fundo protetor anticorrosivo (Zarc\xE3o). Acabamento final/pintura definitiva por conta do cliente.",
        memorialMaoDeObra: document.getElementById("cfg-memorial-mao-obra")?.value?.trim() || "Fabrica\xE7\xE3o e esquadrejamento em oficina especializada. Instala\xE7\xE3o e chumbamento no local por conta do pedreiro/cliente."
      };
      StorageService.saveConfig(dados);
      this.carregarConfiguracoesNaTela();
      this.recalcularEmTempoReal();
      this.mostrarToast("Dados da oficina salvos com sucesso!");
    }
    baixarBackupJson() {
      const jsonStr = StorageService.exportBackup();
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup_serralheria_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.mostrarToast("Arquivo de backup exportado com sucesso!");
    }
    carregarArquivoBackup(event) {
      const file = event.target?.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const conteudo = e.target?.result;
        const res = StorageService.importBackup(conteudo);
        if (res.success) {
          this.mostrarToast(`Backup restaurado! ${res.countOrcamentos} or\xE7amentos recuperados.`);
          this.renderizarListaOrcamentos();
          this.renderizarTabelaCatalogo();
          this.carregarConfiguracoesNaTela();
          this.recalcularEmTempoReal();
        } else {
          this.mostrarToast(`Falha ao restaurar backup: ${res.error}`, "erro");
        }
      };
      reader.readAsText(file);
    }
  };
  window.app = new AppController();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      window.app.init();
    });
  } else {
    window.app.init();
  }
})();
