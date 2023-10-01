type StylesSheet = {
    [key: string]: string;
};

export const UnselectedBoxStyle: StylesSheet = {
    border: "1px solid #fff7",
    outline: "1px dashed #0007",
    outlineOffset: "-1px",
    zIndex: "99999",
};

export const SelectedBoxStyle: StylesSheet = {
    border: "1px solid #fff",
    outline: "1px solid #000",
    outlineOffset: "0",
    zIndex: "99999",
};

export const SelectBoxStyle: StylesSheet = {
    border: "3px dashed red",
    inlineSize: "0px",
    zIndex: "99999",
};

export const addStylesheetRules = (dom: HTMLElement, decls: StylesSheet) => {
    for (let i in decls) {
        dom.style[i as any] = decls[i];
    }
}