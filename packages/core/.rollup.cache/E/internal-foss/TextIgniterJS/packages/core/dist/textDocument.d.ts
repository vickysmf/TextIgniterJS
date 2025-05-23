import EventEmitter from './utils/events';
import Piece from './piece';
import EditorView from './view/editorView';
import UndoRedoManager from './handlers/undoRedoManager';
declare class TextDocument extends EventEmitter {
  dataIds: string[];
  pieces: Piece[];
  blocks: any;
  selectAll: boolean;
  editorView: EditorView;
  undoRedoManager: UndoRedoManager;
  private _selectedBlockId;
  get selectedBlockId(): string | null;
  set selectedBlockId(value: string | null);
  currentOffset: number;
  constructor();
  setEditorView(editorView: EditorView): void;
  getPlainText(): string;
  setUndoRedoManager(undoRedoManager: UndoRedoManager): void;
  insertAt(
    text: string,
    attributes: {
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      hyperlink?: boolean | string;
    },
    position: number,
    dataId?: string | null,
    currentOffset?: number,
    id?: string,
    actionType?: string,
    isSynthetic?: boolean
  ): void;
  deleteRange(
    start: number,
    end: number,
    dataId?: string | null,
    currentOffset?: number
  ): void;
  deleteBlocks(): void;
  getSelectedTextDataId(): string | null;
  getAllSelectedDataIds(): string[];
  handleCtrlASelection(): string[];
  getSelectedDataIds(): string[];
  private getDataIdFromNode;
  getCursorOffset(container: HTMLElement): number;
  formatAttribute(
    start: number,
    end: number,
    attribute: keyof Piece['attributes'],
    value: string | boolean
  ): void;
  toggleOrderedList(dataId: string | null, id?: string): void;
  toggleUnorderedList(dataId: string | null): void;
  updateOrderedListNumbers(): void;
  undo(): void;
  redo(): void;
  setCursorPosition(position: number, dataId?: string | null): void;
  toggleBoldRange(start: number, end: number, id?: string): void;
  toggleItalicRange(start: number, end: number, id?: string): void;
  toggleUnderlineRange(start: number, end: number, id?: string): void;
  toggleUndoRange(start: number, end: number, id?: string): void;
  toggleRedoRange(start: number, end: number): void;
  applyFontColor(start: number, end: number, color: string, id?: string): void;
  applyBgColor(start: number, end: number, color: string, id?: string): void;
  isRangeEntirelyAttribute(
    start: number,
    end: number,
    attr: 'bold' | 'italic' | 'underline' | 'undo' | 'redo'
  ): boolean;
  mergePieces(pieces: Piece[]): Piece[];
  findPieceAtOffset(offset: number, dataId?: string | null): Piece | null;
  setFontFamily(start: number, end: number, fontFamily: string): void;
  setFontSize(start: number, end: number, fontSize: string): void;
  setAlignment(
    alignment: 'left' | 'center' | 'right',
    dataId: string | null
  ): void;
  getHtmlContent(): string | undefined;
  getCursorOffsetInParent(parentSelector: string): {
    offset: number;
    childNode: Node | null;
    innerHTML: string;
    innerText: string;
  } | null;
}
export default TextDocument;
