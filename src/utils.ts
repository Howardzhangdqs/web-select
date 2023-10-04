// 判断一个dom是不是另一个的子孙
export const isChild = (parent: HTMLElement, child: HTMLElement) => {
    let node = child.parentNode;
    while (node !== null) {
        if (node === parent) return true;
        node = node.parentNode;
    }
    return false;
};