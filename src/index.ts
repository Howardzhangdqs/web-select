import {
    makeButton, getElementsPosition, makeDiv, dragSelect,
    ElementPositionWithDiv
} from "./select";

import * as utils from "./utils";
import * as styles from "./styles";


export const main = async () => {

    // 创建全屏蒙版
    const mask = document.createElement("div");
    styles.addStylesheetRules(mask, {
        position: "fixed",
        top: "0",
        left: "0",
        inlineSize: "100%",
        blockSize: "100%",
        zIndex: "99998",
        background: "#0007",
    });
    // document.body.appendChild(mask);


    const quit = () => {};

    const ElementPositions = getElementsPosition();

    console.log(ElementPositions);

    const allBoxes: ElementPositionWithDiv[] = [];

    for (const position of ElementPositions) allBoxes.push(makeDiv(position));

    const selectedBox = await dragSelect(allBoxes);

    for (const div of allBoxes) div.el.remove();

    const filtered = selectedBox.el
        .filter((val, index, arr) => {
            console.log(val, index, arr);
            for (let i of arr) {
                if (utils.isChild(i.src, val.src)) return false;
            }

            return true;
        })
        .sort((a, b) => a.left - b.left)
        .sort((a, b) => a.top - b.top);

    console.log(filtered.map((el) => el.text));

    navigator.clipboard.writeText(filtered.map((el) => el.text).join('\n\n'));

};


// 按下alt+s
window.addEventListener("keydown", (e) => {
    if (e.key === 's' && e.altKey && !e.ctrlKey && !e.shiftKey) main();
});