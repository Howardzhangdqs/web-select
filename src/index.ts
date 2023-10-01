import {
    makeButton, getElementsPosition, makeDiv, dragSelect,
    ElementPositionWithDiv
} from "./util";

import { isChild } from "./select";


export const main = async () => {
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
                if (isChild(i.src, val.src)) return false;
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
    if (e.altKey && e.key === 's') main();
});