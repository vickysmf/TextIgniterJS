declare class EventEmitter {
    private events;
    on(event: string, listener: (data?: any) => void): void;
    emit(event: string, data?: any): void;
}

declare class Piece {
    text: string;
    attributes: {
        bold: boolean;
        italic: boolean;
        underline: boolean;
        undo?: boolean;
        redo?: boolean;
        fontFamily?: string;
        fontSize?: string;
        hyperlink?: string | boolean;
        fontColor?: string;
        bgColor: string;
    };
    constructor(text: string, attributes?: {
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
        undo?: boolean;
        redo?: boolean;
        fontFamily?: string;
        fontSize?: string;
        hyperlink?: string | boolean;
        fontColor?: string;
        bgColor?: string;
    });
    isBold(): boolean;
    setBold(v: boolean): void;
    isItalic(): boolean;
    isUndo(): boolean | undefined;
    isRedo(): boolean | undefined;
    setItalic(v: boolean): void;
    isUnderline(): boolean;
    setUnderline(v: boolean): void;
    setUndo(v: boolean): void;
    setRedo(v: boolean): void;
    clone(): Piece;
    hasSameAttributes(other: Piece): boolean;
    getHyperlink(): string | boolean;
    setHyperlink(url: string | boolean): void;
}

declare class EditorView {
    container: HTMLElement;
    document: TextDocument;
    imageHandler: ImageHandler;
    constructor(container: HTMLElement, document: TextDocument);
    setImageHandler(imageHandler: ImageHandler): void;
    render(): void;
    renderPiece(piece: Piece): DocumentFragment;
    wrapAttributes(lines: string[], attrs: {
        bold: boolean;
        italic: boolean;
        underline: boolean;
        fontFamily?: string;
        fontSize?: string;
        hyperlink?: string | boolean;
        fontColor?: string;
        bgColor?: string;
    }): DocumentFragment;
}

declare class ImageHandler {
    private editor;
    private editorView;
    private document;
    isImageHighlighted: boolean;
    highLightedImageDataId: string;
    currentCursorLocation: number;
    isCrossIconVisible: boolean;
    constructor(editor: HTMLElement, document: TextDocument);
    setEditorView(editorView: EditorView): void;
    insertImage(): void;
    insertImageAtCursor(dataUrl: string, id?: string, start1?: number, end1?: number, dataId1?: string | null): void;
    insertImageAtCursor1(dataUrl: string, id: string | undefined, start: number, end: number): void;
    setCursorPostion(postion: number, dataId: string): void;
    insertImageAtPosition(dataUrl: string, position: number, dataId: string | null): {
        uniqueId1: string;
        uniqueId2: string;
        uniqueId3: string;
    };
    createImageFragment(imageUrl: string, dataId: string): HTMLSpanElement;
    addStyleToImage(dataId: string): void;
    clearImageStyling(): void;
    deleteImage(): void;
}

declare class TextDocument extends EventEmitter {
    undoStack: {
        id: string;
        start: number;
        end: number;
        action: string;
        previousValue: any;
        newValue: any;
        dataId?: string | null;
    }[];
    redoStack: {
        id: string;
        start: number;
        end: number;
        action: string;
        previousValue: any;
        newValue: any;
        dataId?: string | null;
    }[];
    dataIds: string[];
    pieces: Piece[];
    blocks: any;
    selectAll: boolean;
    imageHandler: ImageHandler;
    setImageHandler(imageHandler: ImageHandler): void;
    private _selectedBlockId;
    get selectedBlockId(): string | null;
    set selectedBlockId(value: string | null);
    currentOffset: number;
    constructor();
    getPlainText(): string;
    triggerBackspaceEvents(target: any): void;
    triggerKeyPress(target: any, key: any): void;
    simulateEnterPress(target: any): void;
    insertAt(text: string, attributes: {
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
        hyperlink?: boolean | string;
    }, position: number, dataId?: string | null, currentOffset?: number, id?: string, actionType?: string, isSynthetic?: boolean): void;
    setCursorPositionUsingOffset(element: HTMLElement, offset: number): void;
    deleteRange(start: number, end: number, dataId?: string | null, currentOffset?: number): void;
    deleteBlocks(): void;
    getSelectedTextDataId(): string | null;
    getAllSelectedDataIds(): string[];
    handleCtrlASelection(): string[];
    getSelectedDataIds(): string[];
    private getDataIdFromNode;
    getCursorOffset(container: HTMLElement): number;
    formatAttribute(start: number, end: number, attribute: keyof Piece['attributes'], value: string | boolean): void;
    toggleOrderedList(dataId: string | null, id?: string): void;
    toggleOrderedList1(dataId: string | null, id?: string): void;
    toggleUnorderedList(dataId: string | null, id?: string): void;
    toggleUnorderedList1(dataId: string | null, id?: string): void;
    updateOrderedListNumbers(): void;
    getRangeText(start: number, end: number): string;
    getRangeTextPiece(start: number, end: number): {
        rangeText: string;
        piece: any;
    };
    undo(): void;
    redo(): void;
    private revertAction;
    private applyAction;
    toggleBoldRange1(start: number, end: number, id?: string): void;
    toggleItalicRange1(start: number, end: number, id?: string): void;
    toggleUnderlineRange1(start: number, end: number, id?: string): void;
    toggleBoldRange(start: number, end: number, id?: string): void;
    toggleItalicRange(start: number, end: number, id?: string): void;
    toggleUnderlineRange(start: number, end: number, id?: string): void;
    toggleUndoRange(start: number, end: number, id?: string): void;
    toggleRedoRange(start: number, end: number): void;
    applyFontColor(start: number, end: number, color: string, id?: string): void;
    applyFontColor1(start: number, end: number, color: string, id?: string): void;
    applyBgColor(start: number, end: number, color: string, id?: string): void;
    applyBgColor1(start: number, end: number, color: string, id?: string): void;
    isRangeEntirelyAttribute(start: number, end: number, attr: 'bold' | 'italic' | 'underline' | 'undo' | 'redo'): boolean;
    mergePieces(pieces: Piece[]): Piece[];
    findPieceAtOffset(offset: number, dataId?: string | null): Piece | null;
    setFontFamily(start: number, end: number, fontFamily: string, id?: string): void;
    setFontFamily1(start: number, end: number, fontFamily: string, id?: string): void;
    setFontSize(start: number, end: number, fontSize: string, id?: string): void;
    setFontSize1(start: number, end: number, fontSize: string, id?: string): void;
    setAlignment(alignment: 'left' | 'center' | 'right', dataId: string | null, id?: string): void;
    setAlignment1(alignment: 'left' | 'center' | 'right', dataId: string | null, id?: string): void;
    getHtmlContent(): string | undefined;
    getCursorOffsetInParent(parentSelector: string): {
        offset: number;
        childNode: Node | null;
        innerHTML: string;
        innerText: string;
    } | null;
}

declare class ToolbarView extends EventEmitter {
    container: HTMLElement;
    constructor(container: HTMLElement);
    setupButtons(): void;
    updateActiveStates(attributes: CurrentAttributeDTO): void;
}

type blockType = any;

declare class HyperlinkHandler {
    savedSelection: {
        start: number;
        end: number;
    } | null;
    editorContainer: HTMLElement | null;
    editorView: EditorView;
    document: TextDocument;
    constructor(editorContainer: HTMLElement, editorView: EditorView, document: TextDocument);
    hanldeHyperlinkClick(start: number, end: number, currentOffset: number, selectedBlockId: string | null, blocks: blockType): void;
    getCommonHyperlinkInRange(start: number, end: number, currentOffset: number, selectedBlockId: string | null, blocks: blockType): string | null;
    showHyperlinkInput(existingLink: string | null): void;
    highlightSelection(): void;
    removeHighlightSelection(): void;
    applyHyperlink(url: string, dataIdsSnapshot: any): void;
    removeHyperlink(dataIdsSnapshot: any): void;
    showHyperlinkViewButton(link: string | ""): void;
    hideHyperlinkViewButton(): void;
}

declare class HtmlToJsonParser {
    private htmlString;
    private doc;
    constructor(htmlString: string);
    parse(): any[];
    private parseElement;
    private parseListItems;
    private parseParagraphText;
    private extractTextAttributes;
    private rgbToHex;
}

type EditorConfig = {
    features: string[];
    showToolbar?: boolean;
};

interface CurrentAttributeDTO {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    undo?: boolean;
    redo?: boolean;
    hyperlink?: string | boolean;
    fontFamily?: string;
    fontSize?: string;
    fontColor?: string;
    bgColor?: string;
}
declare class TextIgniter {
    document: TextDocument;
    htmlToJsonParser: HtmlToJsonParser | undefined;
    editorView: EditorView;
    toolbarView: ToolbarView;
    hyperlinkHandler: HyperlinkHandler;
    imageHandler: ImageHandler;
    currentAttributes: CurrentAttributeDTO;
    manualOverride: boolean;
    lastPiece: Piece | null;
    editorContainer: HTMLElement | null;
    toolbarContainer: HTMLElement | null;
    savedSelection: {
        start: number;
        end: number;
    } | null;
    debounceTimer: NodeJS.Timeout | null;
    constructor(editorId: string, config: EditorConfig);
    getSelectionRange(): [number, number];
    applyFontColor(color: string): void;
    handleToolbarAction(action: string, dataId?: string[]): void;
    handleSelectionChange(): void;
    handleKeydown(e: KeyboardEvent): void;
    extractTextFromDataId(dataId: string): {
        remainingText: string;
        piece: any;
    };
    getCurrentCursorBlock(): string | null;
    addBlockAfter(data: any[], targetDataId: string, newBlock: any): any[];
    syncCurrentAttributesWithCursor(): void;
    setCursorPosition(position: number, dataId?: string | null): void;
}

export { type CurrentAttributeDTO, TextIgniter };
