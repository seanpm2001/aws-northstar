ace.define("ace/mode/haskell_cabal_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,CabalHighlightRules=function(){this.$rules={start:[{token:"comment",regex:"^\\s*--.*$"},{token:["keyword"],regex:/^(\s*\w.*?)(:(?:\s+|$))/},{token:"constant.numeric",regex:/[\d_]+(?:(?:[\.\d_]*)?)/},{token:"constant.language.boolean",regex:"(?:true|false|TRUE|FALSE|True|False|yes|no)\\b"},{token:"markup.heading",regex:/^(\w.*)$/}]}};oop.inherits(CabalHighlightRules,TextHighlightRules),exports.CabalHighlightRules=CabalHighlightRules})),ace.define("ace/mode/folding/haskell_cabal",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],(function(require,exports,module){"use strict";var oop=require("../../lib/oop"),BaseFoldMode=require("./fold_mode").FoldMode,Range=require("../../range").Range,FoldMode=exports.FoldMode=function(){};oop.inherits(FoldMode,BaseFoldMode),function(){this.isHeading=function(session,row){var token=session.getTokens(row)[0];return 0==row||token&&0===token.type.lastIndexOf("markup.heading",0)},this.getFoldWidget=function(session,foldStyle,row){if(this.isHeading(session,row))return"start";if("markbeginend"===foldStyle&&!/^\s*$/.test(session.getLine(row))){for(var maxRow=session.getLength();++row<maxRow&&/^\s*$/.test(session.getLine(row)););if(row==maxRow||this.isHeading(session,row))return"end"}return""},this.getFoldWidgetRange=function(session,foldStyle,row){var startColumn=session.getLine(row).length,maxRow=session.getLength(),startRow=row,endRow=row;if(this.isHeading(session,row)){for(;++row<maxRow;)if(this.isHeading(session,row)){row--;break}if((endRow=row)>startRow)for(;endRow>startRow&&/^\s*$/.test(session.getLine(endRow));)endRow--;if(endRow>startRow){var endColumn=session.getLine(endRow).length;return new Range(startRow,startColumn,endRow,endColumn)}}else if("end"===this.getFoldWidget(session,foldStyle,row)){for(endRow=row,endColumn=session.getLine(endRow).length;--row>=0&&!this.isHeading(session,row););startColumn=session.getLine(row).length;return new Range(row,startColumn,endRow,endColumn)}}}.call(FoldMode.prototype)})),ace.define("ace/mode/haskell_cabal",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/haskell_cabal_highlight_rules","ace/mode/folding/haskell_cabal"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,CabalHighlightRules=require("./haskell_cabal_highlight_rules").CabalHighlightRules,FoldMode=require("./folding/haskell_cabal").FoldMode,Mode=function(){this.HighlightRules=CabalHighlightRules,this.foldingRules=new FoldMode,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="--",this.blockComment=null,this.$id="ace/mode/haskell_cabal"}.call(Mode.prototype),exports.Mode=Mode})),ace.require(["ace/mode/haskell_cabal"],(function(m){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=m)}));