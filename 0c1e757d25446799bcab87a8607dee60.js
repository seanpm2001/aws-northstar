ace.define("ace/mode/tex_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextHighlightRules=(require("../lib/lang"),require("./text_highlight_rules").TextHighlightRules),TexHighlightRules=function(textClass){textClass||(textClass="text"),this.$rules={start:[{token:"comment",regex:"%.*$"},{token:textClass,regex:"\\\\[$&%#\\{\\}]"},{token:"keyword",regex:"\\\\(?:documentclass|usepackage|newcounter|setcounter|addtocounter|value|arabic|stepcounter|newenvironment|renewenvironment|ref|vref|eqref|pageref|label|cite[a-zA-Z]*|tag|begin|end|bibitem)\\b",next:"nospell"},{token:"keyword",regex:"\\\\(?:[a-zA-Z0-9]+|[^a-zA-Z0-9])"},{token:"paren.keyword.operator",regex:"[[({]"},{token:"paren.keyword.operator",regex:"[\\])}]"},{token:textClass,regex:"\\s+"}],nospell:[{token:"comment",regex:"%.*$",next:"start"},{token:"nospell."+textClass,regex:"\\\\[$&%#\\{\\}]"},{token:"keyword",regex:"\\\\(?:documentclass|usepackage|newcounter|setcounter|addtocounter|value|arabic|stepcounter|newenvironment|renewenvironment|ref|vref|eqref|pageref|label|cite[a-zA-Z]*|tag|begin|end|bibitem)\\b"},{token:"keyword",regex:"\\\\(?:[a-zA-Z0-9]+|[^a-zA-Z0-9])",next:"start"},{token:"paren.keyword.operator",regex:"[[({]"},{token:"paren.keyword.operator",regex:"[\\])]"},{token:"paren.keyword.operator",regex:"}",next:"start"},{token:"nospell."+textClass,regex:"\\s+"},{token:"nospell."+textClass,regex:"\\w+"}]}};oop.inherits(TexHighlightRules,TextHighlightRules),exports.TexHighlightRules=TexHighlightRules})),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],(function(require,exports,module){"use strict";var Range=require("../range").Range,MatchingBraceOutdent=function(){};(function(){this.checkOutdent=function(line,input){return!!/^\s+$/.test(line)&&/^\s*\}/.test(input)},this.autoOutdent=function(doc,row){var match=doc.getLine(row).match(/^(\s*\})/);if(!match)return 0;var column=match[1].length,openBracePos=doc.findMatchingBracket({row:row,column:column});if(!openBracePos||openBracePos.row==row)return 0;var indent=this.$getIndent(doc.getLine(openBracePos.row));doc.replace(new Range(row,0,row,column-1),indent)},this.$getIndent=function(line){return line.match(/^\s*/)[0]}}).call(MatchingBraceOutdent.prototype),exports.MatchingBraceOutdent=MatchingBraceOutdent})),ace.define("ace/mode/tex",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/text_highlight_rules","ace/mode/tex_highlight_rules","ace/mode/matching_brace_outdent"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,TexHighlightRules=require("./tex_highlight_rules").TexHighlightRules,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,Mode=function(suppressHighlighting){this.HighlightRules=suppressHighlighting?TextHighlightRules:TexHighlightRules,this.$outdent=new MatchingBraceOutdent,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="%",this.getNextLineIndent=function(state,line,tab){return this.$getIndent(line)},this.allowAutoInsert=function(){return!1},this.$id="ace/mode/tex",this.snippetFileId="ace/snippets/tex"}.call(Mode.prototype),exports.Mode=Mode})),ace.require(["ace/mode/tex"],(function(m){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=m)}));