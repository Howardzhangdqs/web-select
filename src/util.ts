import { isChild } from './select';
import * as styles from './styles';

export type ElementPosition = {
    top: number;
    left: number;
    width: number;
    height: number;
    text: string;
    src: HTMLElement;
};

export type ElementPositionWithDiv = ElementPosition & { el: HTMLElement }

// 在页面中创建一个悬浮按钮
export const makeButton = (top?: number, left?: number) => {
    const button = document.createElement('button');
    button.innerText = 'Web选择';
    button.style.position = 'fixed';

    if (top) button.style.top = `${top}px`;
    else button.style.bottom = '10px';

    if (left) button.style.left = `${left}px`;
    else button.style.right = '10px';

    button.style.zIndex = "99999";
    button.style.padding = '10px';
    button.style.borderRadius = '10px';
    button.style.background = '#fff';
    button.style.color = '#000';
    button.style.border = '1px solid #000';
    button.style.cursor = 'pointer';

    // 将按钮插入到页面中
    document.body.appendChild(button);

    return button;
};


// 获取页面中的所有元素的top、left、width、height
export const getElementsPosition = () => {
    const elements: ElementPosition[] = [];
    const allElements = document.querySelectorAll('*');
    allElements.forEach((element: HTMLElement) => {
        const { top, left, width, height } = element.getBoundingClientRect();
        if (top && left && width && height && element.innerText)
            elements.push({
                top, left, width, height,
                text: element.innerText,
                src: element
            });
    });
    return elements;
};

// 创建一个div，用于显示元素的位置
export const makeDiv = ({ top, left, width, height, text, src }: ElementPosition): ElementPositionWithDiv => {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = `${top}px`;
    div.style.left = `${left}px`;
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    styles.addStylesheetRules(div, styles.UnselectedBoxStyle);
    div.style.zIndex = "99999";
    document.body.appendChild(div);

    return {
        top, left, width, height, text,
        el: div, src: src
    };
};

// 一个promise，拖拽框选
export const dragSelect = (allBoxes: ElementPositionWithDiv[]) => {
    return new Promise<{ top: number, left: number, width: number, height: number, el: ElementPositionWithDiv[] }>((resolve, reject) => {
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = '0';
        div.style.left = '0';
        div.style.width = '0';
        div.style.height = '0';
        styles.addStylesheetRules(div, styles.SelectBoxStyle);
        div.style.borderRadius = '6px';
        div.style.zIndex = "99999";
        document.body.appendChild(div);

        const selectedBox = {
            p1: [0, 0] as [number, number],
            p2: [0, 0] as [number, number],
            get top() {
                return Math.min(this.p1[0], this.p2[0]);
            },
            get left() {
                return Math.min(this.p1[1], this.p2[1]);
            },
            get width() {
                return Math.abs(this.p1[1] - this.p2[1]);
            },
            get height() {
                return Math.abs(this.p1[0] - this.p2[0]);
            },
        };

        const mouseDown = (e: MouseEvent) => {
            e.preventDefault();

            selectedBox.p1 = [e.clientY, e.clientX];
            selectedBox.p2 = [e.clientY, e.clientX];

            div.style.top = `${selectedBox.top}px`;
            div.style.left = `${selectedBox.left}px`;
            div.style.width = '0';
            div.style.height = '0';
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
        };

        const getSelectedElements = () => {
            return allBoxes.filter((el) => {
                if (
                    el.left < selectedBox.left ||
                    el.top < selectedBox.top ||
                    el.left + el.width > selectedBox.left + selectedBox.width ||
                    el.top + el.height > selectedBox.top + selectedBox.height
                ) {
                    return false;
                }
                return true;
            });
        };

        const mouseMove = (e: MouseEvent) => {
            e.preventDefault();

            selectedBox.p2 = [e.clientY, e.clientX];
            div.style.top = `${selectedBox.top}px`;
            div.style.left = `${selectedBox.left}px`;
            div.style.width = `${selectedBox.width}px`;
            div.style.height = `${selectedBox.height}px`;

            const selectedElements = getSelectedElements();

            for (const el of allBoxes) {
                if (selectedElements.includes(el)) {
                    styles.addStylesheetRules(el.el, styles.SelectedBoxStyle);
                } else {
                    styles.addStylesheetRules(el.el, styles.UnselectedBoxStyle);
                }
            }

            console.log(selectedElements.sort((a, b) => b.left - a.left).sort((a, b) => b.top - a.top));
        };

        const mouseUp = (e: MouseEvent) => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
            document.removeEventListener('mousedown', mouseDown);

            div.remove();

            styles.addStylesheetRules(document.body, { pointerEvents: "" })

            resolve({
                top: parseInt(div.style.top),
                left: parseInt(div.style.left),
                width: parseInt(div.style.width),
                height: parseInt(div.style.height),
                el: getSelectedElements()
            });
        };

        document.addEventListener('mousedown', mouseDown);
        document.addEventListener('mouseup', mouseUp);

        styles.addStylesheetRules(document.body, { pointerEvents: "none" })
    });
}