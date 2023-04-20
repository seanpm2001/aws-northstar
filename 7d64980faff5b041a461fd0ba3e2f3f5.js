ace.define("ace/ext/code_lens",["require","exports","module","ace/line_widgets","ace/lib/event","ace/lib/lang","ace/lib/dom","ace/editor","ace/config"],(function(require,exports,module){"use strict";var LineWidgets=require("../line_widgets").LineWidgets,event=require("../lib/event"),lang=require("../lib/lang"),dom=require("../lib/dom");function renderWidgets(changes,renderer){if(changes&renderer.CHANGE_LINES||changes&renderer.CHANGE_FULL||changes&renderer.CHANGE_SCROLL||changes&renderer.CHANGE_TEXT){var session=renderer.session,lineWidgets=renderer.session.lineWidgets,textLayer=renderer.$textLayer,lensElements=textLayer.$lenses;if(lineWidgets){var textCells=renderer.$textLayer.$lines.cells,config=renderer.layerConfig,padding=renderer.$padding;lensElements||(lensElements=textLayer.$lenses=[]);for(var index=0,i=0;i<textCells.length;i++){var row=textCells[i].row,widget=lineWidgets[row],lenses=widget&&widget.lenses;if(lenses&&lenses.length){var lensContainer=lensElements[index];lensContainer||(lensContainer=lensElements[index]=dom.buildDom(["div",{class:"ace_codeLens"}],renderer.container)),lensContainer.style.height=config.lineHeight+"px",index++;for(var j=0;j<lenses.length;j++){var el=lensContainer.childNodes[2*j];el||(0!=j&&lensContainer.appendChild(dom.createTextNode(" | ")),el=dom.buildDom(["a"],lensContainer)),el.textContent=lenses[j].title,el.lensCommand=lenses[j]}for(;lensContainer.childNodes.length>2*j-1;)lensContainer.lastChild.remove();var top=renderer.$cursorLayer.getPixelPosition({row:row,column:0},!0).top-config.lineHeight*widget.rowsAbove-config.offset;lensContainer.style.top=top+"px";var left=renderer.gutterWidth,indent=session.getLine(row).search(/\S|$/);-1==indent&&(indent=0),left+=indent*config.characterWidth,lensContainer.style.paddingLeft=padding+left+"px"}}for(;index<lensElements.length;)lensElements.pop().remove()}else lensElements&&function clearLensElements(renderer){var textLayer=renderer.$textLayer,lensElements=textLayer.$lenses;lensElements&&lensElements.forEach((function(el){el.remove()})),textLayer.$lenses=null}(renderer)}}function attachToEditor(editor){editor.codeLensProviders=[],editor.renderer.on("afterRender",renderWidgets),editor.$codeLensClickHandler||(editor.$codeLensClickHandler=function(e){var command=e.target.lensCommand;command&&(editor.execCommand(command.id,command.arguments),editor._emit("codeLensClick",e))},event.addListener(editor.container,"click",editor.$codeLensClickHandler,editor)),editor.$updateLenses=function(){var session=editor.session;if(session){session.widgetManager||(session.widgetManager=new LineWidgets(session),session.widgetManager.attach(editor));var providersToWaitNum=editor.codeLensProviders.length,lenses=[];editor.codeLensProviders.forEach((function(provider){provider.provideCodeLenses(session,(function(err,payload){err||(payload.forEach((function(lens){lenses.push(lens)})),0==--providersToWaitNum&&function applyLenses(){var cursor=session.selection.cursor,oldRow=session.documentToScreenRow(cursor),scrollTop=session.getScrollTop(),firstRow=exports.setLenses(session,lenses),lastDelta=session.$undoManager&&session.$undoManager.$lastDelta;if(lastDelta&&"remove"==lastDelta.action&&lastDelta.lines.length>1)return;var row=session.documentToScreenRow(cursor),lineHeight=editor.renderer.layerConfig.lineHeight,top=session.getScrollTop()+(row-oldRow)*lineHeight;0==firstRow&&scrollTop<lineHeight/4&&scrollTop>-lineHeight/4&&(top=-lineHeight);session.setScrollTop(top)}())}))}))}};var updateLenses=lang.delayedCall(editor.$updateLenses);editor.$updateLensesOnInput=function(){updateLenses.delay(250)},editor.on("input",editor.$updateLensesOnInput)}exports.setLenses=function(session,lenses){var firstRow=Number.MAX_VALUE;return function clearCodeLensWidgets(session){if(session.lineWidgets){var widgetManager=session.widgetManager;session.lineWidgets.forEach((function(widget){widget&&widget.lenses&&widgetManager.removeLineWidget(widget)}))}}(session),lenses&&lenses.forEach((function(lens){var row=lens.start.row,column=lens.start.column,widget=session.lineWidgets&&session.lineWidgets[row];widget&&widget.lenses||(widget=session.widgetManager.$registerLineWidget({rowCount:1,rowsAbove:1,row:row,column:column,lenses:[]})),widget.lenses.push(lens.command),row<firstRow&&(firstRow=row)})),session._emit("changeFold",{data:{start:{row:firstRow}}}),firstRow},exports.registerCodeLensProvider=function(editor,codeLensProvider){editor.setOption("enableCodeLens",!0),editor.codeLensProviders.push(codeLensProvider),editor.$updateLensesOnInput()},exports.clear=function(session){exports.setLenses(session,null)};var Editor=require("../editor").Editor;require("../config").defineOptions(Editor.prototype,"editor",{enableCodeLens:{set:function(val){val?attachToEditor(this):function detachFromEditor(editor){editor.off("input",editor.$updateLensesOnInput),editor.renderer.off("afterRender",renderWidgets),editor.$codeLensClickHandler&&editor.container.removeEventListener("click",editor.$codeLensClickHandler)}(this)}}}),dom.importCssString("\n.ace_codeLens {\n    position: absolute;\n    color: #aaa;\n    font-size: 88%;\n    background: inherit;\n    width: 100%;\n    display: flex;\n    align-items: flex-end;\n    pointer-events: none;\n}\n.ace_codeLens > a {\n    cursor: pointer;\n    pointer-events: auto;\n}\n.ace_codeLens > a:hover {\n    color: #0000ff;\n    text-decoration: underline;\n}\n.ace_dark > .ace_codeLens > a:hover {\n    color: #4e94ce;\n}\n","codelense.css",!1)})),ace.require(["ace/ext/code_lens"],(function(m){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=m)}));