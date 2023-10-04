import fs from "fs";

const packageInfo = JSON.parse(fs.readFileSync("./package.json", "utf-8").toString());

const TamperMonkeyHeader = `// ==UserScript==
// @name                Web选择
// @name:en             Web Select
// @name:zh-TW          Web捕獲
// @namespace           https://github.com/Howardzhangdqs/web-select
// @version             ${packageInfo.version}
// @description         由于Web选择太好用，微软就把他砍掉了。本脚本实现了Web选择的部分功能。按下Alt+S即可选择文本。
// @description:en      Due to the ease with which the "web select" was used, Microsoft cut it off. This script implements some functions of "web select". Press Alt+S to select text.
// @description:zh-TW   由於Web選擇功能非常實用，微軟就將它砍掉了。本腳本實現了Web選擇的部分功能。按下Alt+S即可選擇文本。
// @author              HowardZhangdqs
// @match               *://*/*
// @license             MIT
// @icon                data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABsUExURf///xYWFgMDAw4ODgICAh8fHw4ODQAAAA8PD9LS0gEBAR4eHgcHBwoKCgUFBQgICCAgICgoKCwsLB0dHSQkJCYmJvv7+vr6+ZiYlyMjIhwcHJaWlBsbGxgYGAYGBnV2dfz9/BAQEHR0cw0NDWBB0hYAAAFaSURBVFjD7VbZkoMgEARBwNvNsfed///HAJoUq3Ga1a0tH+ynQXragWmtYWzDelEopXzQmgu+/Jorxe9gOtceNjI6gF2X14hC0ic8MZYPBIJwGqonlSzIsHhkkQpu/xlVqKa3D3b7QJ+RLqHAlyRIisICaqkAXYE9YYKMAijYaTGU/0dWu+4+eL9DcjOm1J1DZZQP2jFF6qtARBvNiJK65FxK+TlTwOWnfXyaIZDZB9UvnHhT4HWpQLoJ/KGANcUH/h98EwJzvsSVCST6HiUMKT8EWtyFguyCWdrGxQJHLKCRkYDCzv2+yC644cCY7r78eCOEEd2aC+OHjh3lg2CIGI44TTh8TBupZx0nRxyBnFi4xGYw4rxc1uVKv4U9JGW0M96xeQiFHLoPnNLNtm+LrknTFWIBrgGhQm/oBoSUfAF9S1IjIKdUIF9iO5FF8ChL7it5EzVnG1aMM5cYFmmzQuXPAAAAAElFTkSuQmCC
// @grant               none
// ==/UserScript==

`;

const TamperMonkeyScript = fs.readFileSync("./dist/bundle.js", "utf-8").toString();

const TamperMonkeyScriptWithHeader = TamperMonkeyHeader + TamperMonkeyScript;

fs.writeFileSync("./dist/tampermonkey-script.js", TamperMonkeyScriptWithHeader, "utf-8");