type StylesSheet = {
    [key: string]: string;
};

export const UnselectedBoxStyle: StylesSheet = {
    border: "1px solid #fff",
    outline: "1px dashed #000",
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
    position: "fixed",
    outline: "3px dashed white",
    zIndex: "99999",
};

export const addStylesheetRules = (dom: HTMLElement | HTMLElement[], decls: StylesSheet) => {
    if (dom instanceof HTMLElement) dom = [dom];

    for (let i in decls) {
        for (let j of dom) j.style[i as any] = decls[i];
    }
}