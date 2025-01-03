"use strict";class t{constructor(){this.events={}}on(t,e){this.events[t]||(this.events[t]=[]),this.events[t].push(e)}emit(t,e){this.events[t]&&this.events[t].forEach((t=>t(e)))}}class e{constructor(t,e={}){this.text=t,this.attributes={bold:e.bold||!1,italic:e.italic||!1,underline:e.underline||!1,undo:e.undo||!1,redo:e.redo||!1}}isBold(){return this.attributes.bold}setBold(t){this.attributes.bold=t}isItalic(){return this.attributes.italic}isUndo(){return this.attributes.undo}isRedo(){return this.attributes.redo}setItalic(t){this.attributes.italic=t}isUnderline(){return this.attributes.underline}setUnderline(t){this.attributes.underline=t}setUndo(t){this.attributes.undo=t}setRedo(t){this.attributes.redo=t}clone(){return new e(this.text,Object.assign({},this.attributes))}hasSameAttributes(t){return this.attributes.bold===t.attributes.bold&&this.attributes.italic===t.attributes.italic&&this.attributes.underline===t.attributes.underline&&this.attributes.undo===t.attributes.undo&&this.attributes.redo===t.attributes.redo}}class s extends t{get selectedBlockId(){return this._selectedBlockId}set selectedBlockId(t){if(this._selectedBlockId!==t){this._selectedBlockId=t;const e=this.getCursorOffset(document.querySelector('[id="editor"]')),s=this.getCursorOffset(document.querySelector('[data-id="'+t+'"]'));this.currentOffset=e-s}}constructor(){super(),this.undoStack=[],this.redoStack=[],this._selectedBlockId=null,this.pieces=[new e("")],this.blocks=[{dataId:"data-id-1734604240404",class:"paragraph-block",pieces:[new e(" ")]}],this.selectedBlockId="data-id-1734604240404",this.currentOffset=0}getPlainText(){return this.pieces.map((t=>t.text)).join("")}insertAt(t,s,n,i="",o=0,r="",c=""){let a=0,l=[],d=!1,u=0;""===i&&null===i||(u=this.blocks.findIndex((t=>t.dataId===i)),a=this.currentOffset);const h=this.getRangeText(n,n);console.log("run1..",t,n,h);for(let i of this.blocks[u].pieces){const o=a+i.text.length;if(!d&&n<=o){const o=n-a;o>0&&l.push(new e(i.text.slice(0,o),Object.assign({},i.attributes))),l.push(new e(t,{bold:s.bold||!1,italic:s.italic||!1,underline:s.underline||!1})),o<i.text.length&&l.push(new e(i.text.slice(o),Object.assign({},i.attributes))),d=!0}else l.push(i.clone());a=o}if(!d){const n=l[l.length-1];n&&n.hasSameAttributes(new e("",{bold:s.bold||!1,italic:s.italic||!1,underline:s.underline||!1}))?n.text+=t:l.push(new e(t,{bold:s.bold||!1,italic:s.italic||!1,underline:s.underline||!1}))}const g=this.mergePieces(l);this.blocks[u].pieces=g;const b=this.getRangeText(n,n+t.length);if("redo"!==c){0===this.redoStack.filter((t=>t.id===r)).length&&(this.undoStack.push({id:Date.now().toString(),start:n,end:n+t.length,action:"insert",previousValue:h,newValue:b}),this.redoStack=[])}this.emit("documentChanged",this);const f=document.querySelector('[data-id="'+i+'"]');f.focus(),this.setCursorPositionUsingOffset(f,a)}setCursorPositionUsingOffset(t,e){t.focus();const s=window.getSelection();if(!s)return;const n=document.createRange();let i=0;const o=t=>{if(3===t.nodeType){const s=t,o=i+s.length;if(console.log("data",o,s),e>=i&&e<=o)return n.setStart(s,e-i),n.collapse(!0),!0;i=o}else if(1===t.nodeType){const e=Array.from(t.childNodes);for(const t of e)if(o(t))return!0}return!1};o(t),console.log(n,"data"),s.removeAllRanges(),s.addRange(n)}deleteRange(t,s,n="",i=0){if(t===s)return;let o=[],r=0,c=0;""===n&&null===n||(c=this.blocks.findIndex((t=>t.dataId===n)),r=i);const a=this.getRangeText(t,s);console.log(a);for(let n of this.blocks[c].pieces){const i=r+n.text.length;if(i<=t||r>=s)o.push(n.clone());else{const c=r,a=n.text;t>c&&t<i&&o.push(new e(a.slice(0,t-c),Object.assign({},n.attributes))),s<i&&o.push(new e(a.slice(s-c),Object.assign({},n.attributes)))}r=i}console.log(n,"dataId",this.currentOffset,"offset",r,"currentOffset",i);const l=this.mergePieces(o);this.blocks[c].pieces=l,0===l.length&&this.blocks.length>1&&(this.blocks=this.blocks.filter((t=>0!==t.pieces.length)));const d=this.getRangeText(t-1,s-1);console.log(d),this.emit("documentChanged",this);const u=document.querySelector('[data-id="'+n+'"]');u.focus(),this.setCursorPositionUsingOffset(u,r)}getCursorOffset(t){const e=window.getSelection();if(!e||0===e.rangeCount)return-1;const s=e.getRangeAt(0);let n=0;const i=t=>{var e;return t===s.startContainer?(n+=s.startOffset,!0):(3===t.nodeType&&(n+=(null===(e=t.textContent)||void 0===e?void 0:e.length)||0),Array.from(t.childNodes).some(i))};return i(t),n}formatAttribute(t,s,n,i){let o=[],r=0,c=-1;""===this.selectedBlockId&&null===this.selectedBlockId||(c=this.blocks.findIndex((t=>t.dataId===this.selectedBlockId)),r=this.currentOffset);for(let a of this.blocks[c].pieces){const c=r+a.text.length;if(c<=t||r>=s)o.push(a.clone());else{const c=r,l=a.text,d=Math.max(t-c,0),u=Math.min(s-c,l.length);d>0&&o.push(new e(l.slice(0,d),Object.assign({},a.attributes)));const h=new e(l.slice(d,u),Object.assign({},a.attributes));h.attributes[n]=i,o.push(h),u<l.length&&o.push(new e(l.slice(u),Object.assign({},a.attributes)))}r=c}const a=this.mergePieces(o);this.blocks[c].pieces=a,this.emit("documentChanged",this)}getRangeText(t,e){let s="",n=0;for(const i of this.blocks){for(const o of i.pieces){const i=o.text.length;if(n+i>=t&&n<e){const r=Math.max(0,t-n),c=Math.min(i,e-n);s+=o.text.substring(r,c)}if(n+=i,n>=e)break}if(n>=e)break}return s}undo(){const t=this.undoStack.pop();console.log(t,"action undo"),t&&(this.redoStack.push(t),this.revertAction(t))}redo(){const t=this.redoStack.pop();console.log(t,"action redo"),t&&(this.undoStack.push(t),this.applyAction(t))}revertAction(t){switch(t.action){case"bold":this.toggleBoldRange(t.start,t.end,t.id);break;case"italic":this.toggleItalicRange(t.start,t.end,t.id);break;case"underline":this.toggleUnderlineRange(t.start,t.end,t.id);break;case"insert":console.log("insert... delete"),this.deleteRange(t.start,t.end,this.selectedBlockId,this.currentOffset)}}applyAction(t){switch(t.action){case"bold":this.toggleBoldRange1(t.start,t.end,t.id);break;case"italic":this.toggleItalicRange1(t.start,t.end,t.id);break;case"underline":this.toggleUnderlineRange1(t.start,t.end,t.id);break;case"insert":console.log("insert... insert"),this.insertAt(t.newValue||"",{},t.start,this.selectedBlockId,this.currentOffset,t.id,"redo")}}toggleBoldRange1(t,e,s=""){const n=this.isRangeEntirelyAttribute(t,e,"bold");this.formatAttribute(t,e,"bold",!n)}toggleItalicRange1(t,e,s=""){const n=this.isRangeEntirelyAttribute(t,e,"italic");this.formatAttribute(t,e,"italic",!n)}toggleUnderlineRange1(t,e,s=""){const n=this.isRangeEntirelyAttribute(t,e,"underline");this.formatAttribute(t,e,"underline",!n)}toggleBoldRange(t,e,s=""){const n=this.getRangeText(t,e),i=this.isRangeEntirelyAttribute(t,e,"bold");this.formatAttribute(t,e,"bold",!i);const o=this.getRangeText(t,e);0===this.redoStack.filter((t=>t.id===s)).length&&(this.undoStack.push({id:Date.now().toString(),start:t,end:e,action:"bold",previousValue:n,newValue:o}),this.redoStack=[])}toggleItalicRange(t,e,s=""){const n=this.getRangeText(t,e),i=this.isRangeEntirelyAttribute(t,e,"italic");this.formatAttribute(t,e,"italic",!i);const o=this.getRangeText(t,e);0===this.redoStack.filter((t=>t.id===s)).length&&(this.undoStack.push({id:Date.now().toString(),start:t,end:e,action:"italic",previousValue:n,newValue:o}),this.redoStack=[])}toggleUnderlineRange(t,e,s=""){const n=this.getRangeText(t,e),i=this.isRangeEntirelyAttribute(t,e,"underline");this.formatAttribute(t,e,"underline",!i);const o=this.getRangeText(t,e);0===this.redoStack.filter((t=>t.id===s)).length&&(this.undoStack.push({id:Date.now().toString(),start:t,end:e,action:"underline",previousValue:n,newValue:o}),this.redoStack=[])}toggleUndoRange(t,e,s=""){const n=this.isRangeEntirelyAttribute(t,e,"undo");this.formatAttribute(t,e,"undo",!n)}toggleRedoRange(t,e){const s=this.isRangeEntirelyAttribute(t,e,"redo");this.formatAttribute(t,e,"redo",!s)}isRangeEntirelyAttribute(t,e,s){let n=this.currentOffset,i=!0;if(""!==this.selectedBlockId){const o=this.blocks.findIndex((t=>t.dataId===this.selectedBlockId));for(let r of this.blocks[o].pieces){const o=n+r.text.length;if(o>t&&n<e&&!r.attributes[s]){i=!1;break}n=o}}return i}mergePieces(t){let e=[];for(let s of t){const t=e[e.length-1];t&&t.hasSameAttributes(s)?t.text+=s.text:e.push(s)}return e}findPieceAtOffset(t,e=""){let s=this.currentOffset;if(""!==e){const n=this.blocks.findIndex((t=>t.dataId===e));for(let e of this.blocks[n].pieces){const n=s+e.text.length;if(t>=s&&t<=n)return e;s=n}}return null}}function n(t){const e=window.getSelection();if(!e||0===e.rangeCount)return null;const s=e.getRangeAt(0),n=s.cloneRange();n.selectNodeContents(t),n.setEnd(s.startContainer,s.startOffset);const i=n.toString().length;n.setEnd(s.endContainer,s.endOffset);return{start:i,end:n.toString().length}}class i{constructor(t,e){this.container=t,this.document=e}render(){const t=n(this.container);this.container.innerHTML="",console.log(this.document.blocks,"this.document.blocks"),this.document.blocks.forEach((t=>{if(""!==t.dataId){const e=document.createElement("div");e.setAttribute("data-id",t.dataId),e.setAttribute("class",t.class),t.pieces.forEach((t=>{e.appendChild(this.renderPiece(t))})),this.container.appendChild(e)}})),function(t,e){if(!e)return;let s=0;const n=document.createRange();n.setStart(t,0),n.collapse(!0);const i=[t];let o,r=!1,c=!1;for(;!c&&(o=i.pop());)if(3===o.nodeType){const t=o,i=s+t.length;!r&&e.start>=s&&e.start<=i&&(n.setStart(t,e.start-s),r=!0),r&&e.end>=s&&e.end<=i&&(n.setEnd(t,e.end-s),c=!0),s=i}else if("BR"===o.tagName)r||e.start!==s||(n.setStartBefore(o),r=!0),r&&e.end===s&&(n.setEndBefore(o),c=!0),s++;else{const t=o;let e=t.childNodes.length;for(;e--;)i.push(t.childNodes[e])}const a=window.getSelection();a&&(a.removeAllRanges(),a.addRange(n))}(this.container,t)}renderPiece(t){const e=t.text.split("\n");return this.wrapAttributes(e,t.attributes)}wrapAttributes(t,e){const s=document.createDocumentFragment();return t.forEach(((n,i)=>{let o=document.createTextNode(n);if(e.underline){const t=document.createElement("u");t.appendChild(o),o=t}if(e.italic){const t=document.createElement("em");t.appendChild(o),o=t}if(e.bold){const t=document.createElement("strong");t.appendChild(o),o=t}s.appendChild(o),i<t.length-1&&s.appendChild(document.createElement("br"))})),s}}class o extends t{constructor(t){super(),this.container=t,this.setupButtons()}setupButtons(){this.container.querySelectorAll("button").forEach((t=>{t.addEventListener("mousedown",(t=>{t.preventDefault()}))})),this.container.addEventListener("click",(t=>{const e=t.target.closest("button");if(e){const t=e.getAttribute("data-action");t&&this.emit("toolbarAction",t)}}))}updateActiveStates(t){this.container.querySelectorAll("button").forEach((e=>{const s=e.getAttribute("data-action");let n=!1;"bold"===s&&t.bold&&(n=!0),"italic"===s&&t.italic&&(n=!0),"underline"===s&&t.underline&&(n=!0),"undo"===s&&t.undo&&(n=!0),"redo"===s&&t.redo&&(n=!0),e.classList.toggle("active",n)}))}}window.TextIgniter=class{constructor(t,e){this.document=new s,this.editorView=new i(t,this.document),this.toolbarView=new o(e),this.currentAttributes={bold:!1,italic:!1,underline:!1,undo:!1,redo:!1},this.manualOverride=!1,this.lastPiece=null,this.toolbarView.on("toolbarAction",(t=>this.handleToolbarAction(t))),this.document.on("documentChanged",(()=>this.editorView.render())),t.addEventListener("keydown",(t=>this.handleKeydown(t))),t.addEventListener("keyup",(()=>this.syncCurrentAttributesWithCursor())),document.addEventListener("keydown",(t=>{if((t.ctrlKey||t.metaKey)&&!t.altKey){const e=t.key.toLowerCase();if(["b","i","u"].includes(e)){t.preventDefault();const s="b"===e?"bold":"i"===e?"italic":"underline";this.handleToolbarAction(s)}"z"===e?(t.preventDefault(),this.document.undo()):"y"===e&&(t.preventDefault(),this.document.redo()),console.log("undo",this.document.undoStack,"redo",this.document.redoStack)}})),document.addEventListener("selectionchange",this.handleSelectionChange.bind(this)),this.document.emit("documentChanged",this.document)}getSelectionRange(){const t=n(this.editorView.container);return t?[t.start,t.end]:[0,0]}handleToolbarAction(t){const[e,s]=this.getSelectionRange();if(e<s)switch(t){case"bold":this.document.toggleBoldRange(e,s);break;case"italic":this.document.toggleItalicRange(e,s);break;case"underline":this.document.toggleUnderlineRange(e,s);break;case"undo":this.document.undo();break;case"redo":this.document.redo()}else this.currentAttributes[t]=!this.currentAttributes[t],this.manualOverride=!0;console.log("undo",this.document.undoStack,"redo",this.document.redoStack),this.toolbarView.updateActiveStates(this.currentAttributes)}handleSelectionChange(){var t;const e=window.getSelection();if(!e||0===e.rangeCount)return;const s=null===(t=e.getRangeAt(0).startContainer.parentElement)||void 0===t?void 0:t.closest("[data-id]");s&&s instanceof HTMLElement&&(this.document.selectedBlockId=s.getAttribute("data-id")||null)}handleKeydown(t){const[s,n]=this.getSelectionRange();if("Enter"===t.key){t.preventDefault();const i=`data-id-${Date.now()}`;this.document.blocks.push({dataId:i,class:"paragraph-block",pieces:[new e(" ")]}),this.syncCurrentAttributesWithCursor(),this.editorView.render(),this.setCursorPosition(n+1,i),n>s&&this.document.deleteRange(s,n,this.document.selectedBlockId,this.document.currentOffset)}else"Backspace"===t.key?(t.preventDefault(),s===n&&s>0?(this.document.deleteRange(s-1,s,this.document.selectedBlockId,this.document.currentOffset),this.setCursorPosition(s-1)):n>s&&(this.document.deleteRange(s,n,this.document.selectedBlockId,this.document.currentOffset),this.setCursorPosition(s))):1!==t.key.length||t.ctrlKey||t.metaKey||t.altKey||(t.preventDefault(),n>s&&this.document.deleteRange(s,n,this.document.selectedBlockId,this.document.currentOffset),this.document.insertAt(t.key,Object.assign({},this.currentAttributes),s,this.document.selectedBlockId,this.document.currentOffset),this.setCursorPosition(s+1))}syncCurrentAttributesWithCursor(){const[t,e]=this.getSelectionRange();if(t===e){const e=this.document.findPieceAtOffset(t,this.document.selectedBlockId);e?(e!==this.lastPiece&&(this.manualOverride=!1,this.lastPiece=e),this.manualOverride||(this.currentAttributes={bold:e.attributes.bold,italic:e.attributes.italic,underline:e.attributes.underline},this.toolbarView.updateActiveStates(this.currentAttributes))):(this.manualOverride||(this.currentAttributes={bold:!1,italic:!1,underline:!1},this.toolbarView.updateActiveStates(this.currentAttributes)),this.lastPiece=null)}}setCursorPosition(t,e=""){if(""===e)this.editorView.container.focus();else{document.querySelector('[data-id="'+e+'"]').focus()}const s=window.getSelection();if(!s)return;const n=document.createRange();let i=0;const o=[this.editorView.container];let r;for(;r=o.pop();)if(3===r.nodeType){const e=r,s=i+e.length;if(t>=i&&t<=s){n.setStart(e,t-i),n.collapse(!0);break}i=s}else if("BR"===r.tagName){if(t===i){n.setStartBefore(r),n.collapse(!0);break}i++}else{const t=r;let e=t.childNodes.length;for(;e--;)o.push(t.childNodes[e])}s.removeAllRanges(),s.addRange(n)}};
