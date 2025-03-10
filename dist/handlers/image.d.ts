import EditorView from "../view/editorView";
import TextDocument from "../textDocument";
export declare class ImageHandler {
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
