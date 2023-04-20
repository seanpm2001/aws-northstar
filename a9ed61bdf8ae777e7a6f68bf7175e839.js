ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,DocCommentHighlightRules=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},DocCommentHighlightRules.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:!0}]}};oop.inherits(DocCommentHighlightRules,TextHighlightRules),DocCommentHighlightRules.getTagRule=function(start){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},DocCommentHighlightRules.getStartRule=function(start){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:start}},DocCommentHighlightRules.getEndRule=function(start){return{token:"comment.doc",regex:"\\*\\/",next:start}},exports.DocCommentHighlightRules=DocCommentHighlightRules})),ace.define("ace/mode/rust_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules","ace/mode/doc_comment_highlight_rules"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,DocCommentHighlightRules=require("./doc_comment_highlight_rules").DocCommentHighlightRules,stringEscape=/\\(?:[nrt0'"\\]|x[\da-fA-F]{2}|u\{[\da-fA-F]{6}\})/.source,wordPattern=/[a-zA-Z_\xa1-\uffff][a-zA-Z0-9_\xa1-\uffff]*/.source,RustHighlightRules=function(){var keywordMapper=this.createKeywordMapper({"keyword.source.rust":"abstract|alignof|as|async|await|become|box|break|catch|continue|const|crate|default|do|dyn|else|enum|extern|for|final|if|impl|in|let|loop|macro|match|mod|move|mut|offsetof|override|priv|proc|pub|pure|ref|return|self|sizeof|static|struct|super|trait|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield|try","storage.type.source.rust":"Self|isize|usize|char|bool|u8|u16|u32|u64|u128|f16|f32|f64|i8|i16|i32|i64|i128|str|option|either|c_float|c_double|c_void|FILE|fpos_t|DIR|dirent|c_char|c_schar|c_uchar|c_short|c_ushort|c_int|c_uint|c_long|c_ulong|size_t|ptrdiff_t|clock_t|time_t|c_longlong|c_ulonglong|intptr_t|uintptr_t|off_t|dev_t|ino_t|pid_t|mode_t|ssize_t","constant.language.source.rust":"true|false|Some|None|Ok|Err|FALSE|TRUE","support.constant.source.rust":"EXIT_FAILURE|EXIT_SUCCESS|RAND_MAX|EOF|SEEK_SET|SEEK_CUR|SEEK_END|_IOFBF|_IONBF|_IOLBF|BUFSIZ|FOPEN_MAX|FILENAME_MAX|L_tmpnam|TMP_MAX|O_RDONLY|O_WRONLY|O_RDWR|O_APPEND|O_CREAT|O_EXCL|O_TRUNC|S_IFIFO|S_IFCHR|S_IFBLK|S_IFDIR|S_IFREG|S_IFMT|S_IEXEC|S_IWRITE|S_IREAD|S_IRWXU|S_IXUSR|S_IWUSR|S_IRUSR|F_OK|R_OK|W_OK|X_OK|STDIN_FILENO|STDOUT_FILENO|STDERR_FILENO","constant.language":"macro_rules|mac_variant"},"identifier");this.$rules={start:[{token:"variable.other.source.rust",regex:"'"+wordPattern+"(?![\\'])"},{token:"string.quoted.single.source.rust",regex:"'(?:[^'\\\\]|"+stringEscape+")'"},{token:"identifier",regex:"r#"+wordPattern+"\\b"},{stateName:"bracketedComment",onMatch:function(value,currentState,stack){return stack.unshift(this.next,value.length-1,currentState),"string.quoted.raw.source.rust"},regex:/r#*"/,next:[{onMatch:function(value,currentState,stack){var token="string.quoted.raw.source.rust";return value.length>=stack[1]?(value.length>stack[1]&&(token="invalid"),stack.shift(),stack.shift(),this.next=stack.shift()):this.next="",token},regex:/"#*/,next:"start"},{defaultToken:"string.quoted.raw.source.rust"}]},{token:"string.quoted.double.source.rust",regex:'"',push:[{token:"string.quoted.double.source.rust",regex:'"',next:"pop"},{token:"constant.character.escape.source.rust",regex:stringEscape},{defaultToken:"string.quoted.double.source.rust"}]},{token:["keyword.source.rust","text","entity.name.function.source.rust","punctuation"],regex:"\\b(fn)(\\s+)((?:r#)?"+wordPattern+")(<)",push:"generics"},{token:["keyword.source.rust","text","entity.name.function.source.rust"],regex:"\\b(fn)(\\s+)((?:r#)?"+wordPattern+")"},{token:["support.constant","punctuation"],regex:"("+wordPattern+"::)(<)",push:"generics"},{token:"support.constant",regex:wordPattern+"::"},{token:"variable.language.source.rust",regex:"\\bself\\b"},DocCommentHighlightRules.getStartRule("doc-start"),{token:"comment.line.doc.source.rust",regex:"///.*$"},{token:"comment.line.doc.source.rust",regex:"//!.*$"},{token:"comment.line.double-dash.source.rust",regex:"//.*$"},{token:"comment.start.block.source.rust",regex:"/\\*",stateName:"comment",push:[{token:"comment.start.block.source.rust",regex:"/\\*",push:"comment"},{token:"comment.end.block.source.rust",regex:"\\*/",next:"pop"},{defaultToken:"comment.block.source.rust"}]},{token:["keyword.source.rust","identifier","punctuaction"],regex:"(?:(impl)|("+wordPattern+"))(<)",stateName:"generics",push:[{token:"punctuaction",regex:"<",push:"generics"},{token:"variable.other.source.rust",regex:"'"+wordPattern+"(?![\\'])"},{token:"storage.type.source.rust",regex:"\\b(u8|u16|u32|u64|u128|usize|i8|i16|i32|i64|i128|isize|char|bool)\\b"},{token:"punctuation.operator",regex:"[,:]"},{token:"keyword",regex:"\\b(?:const|dyn)\\b"},{token:"punctuation",regex:">",next:"pop"},{token:"paren.lparen",regex:"[(]"},{token:"paren.rparen",regex:"[)]"},{token:"identifier",regex:"\\b"+wordPattern+"\\b"},{token:"keyword.operator",regex:"="}]},{token:keywordMapper,regex:wordPattern},{token:"keyword.operator",regex:/\$|[-=]>|[-+%^=!&|<>]=?|[*/](?![*/])=?/},{token:"punctuation.operator",regex:/[?:,;.]/},{token:"paren.lparen",regex:/[\[({]/},{token:"paren.rparen",regex:/[\])}]/},{token:"meta.preprocessor.source.rust",regex:"\\b\\w\\(\\w\\)*!|#\\[[\\w=\\(\\)_]+\\]\\b"},{token:"constant.numeric.source.rust",regex:/\b(?:0x[a-fA-F0-9_]+|0o[0-7_]+|0b[01_]+|[0-9][0-9_]*(?!\.))(?:[iu](?:size|8|16|32|64|128))?\b/},{token:"constant.numeric.source.rust",regex:/\b(?:[0-9][0-9_]*)(?:\.[0-9][0-9_]*)?(?:[Ee][+-][0-9][0-9_]*)?(?:f32|f64)?\b/}]},this.embedRules(DocCommentHighlightRules,"doc-",[DocCommentHighlightRules.getEndRule("start")]),this.normalizeRules()};RustHighlightRules.metaData={fileTypes:["rs","rc"],foldingStartMarker:"^.*\\bfn\\s*(\\w+\\s*)?\\([^\\)]*\\)(\\s*\\{[^\\}]*)?\\s*$",foldingStopMarker:"^\\s*\\}",name:"Rust",scopeName:"source.rust"},oop.inherits(RustHighlightRules,TextHighlightRules),exports.RustHighlightRules=RustHighlightRules})),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],(function(require,exports,module){"use strict";var oop=require("../../lib/oop"),Range=require("../../range").Range,BaseFoldMode=require("./fold_mode").FoldMode,FoldMode=exports.FoldMode=function(commentRegex){commentRegex&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+commentRegex.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+commentRegex.end)))};oop.inherits(FoldMode,BaseFoldMode),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(session,foldStyle,row){var line=session.getLine(row);if(this.singleLineBlockCommentRe.test(line)&&!this.startRegionRe.test(line)&&!this.tripleStarBlockCommentRe.test(line))return"";var fw=this._getFoldWidgetBase(session,foldStyle,row);return!fw&&this.startRegionRe.test(line)?"start":fw},this.getFoldWidgetRange=function(session,foldStyle,row,forceMultiline){var match,line=session.getLine(row);if(this.startRegionRe.test(line))return this.getCommentRegionBlock(session,line,row);if(match=line.match(this.foldingStartMarker)){var i=match.index;if(match[1])return this.openingBracketBlock(session,match[1],row,i);var range=session.getCommentFoldRange(row,i+match[0].length,1);return range&&!range.isMultiLine()&&(forceMultiline?range=this.getSectionRange(session,row):"all"!=foldStyle&&(range=null)),range}if("markbegin"!==foldStyle&&(match=line.match(this.foldingStopMarker))){i=match.index+match[0].length;return match[1]?this.closingBracketBlock(session,match[1],row,i):session.getCommentFoldRange(row,i,-1)}},this.getSectionRange=function(session,row){for(var line=session.getLine(row),startIndent=line.search(/\S/),startRow=row,startColumn=line.length,endRow=row+=1,maxRow=session.getLength();++row<maxRow;){var indent=(line=session.getLine(row)).search(/\S/);if(-1!==indent){if(startIndent>indent)break;var subRange=this.getFoldWidgetRange(session,"all",row);if(subRange){if(subRange.start.row<=startRow)break;if(subRange.isMultiLine())row=subRange.end.row;else if(startIndent==indent)break}endRow=row}}return new Range(startRow,startColumn,endRow,session.getLine(endRow).length)},this.getCommentRegionBlock=function(session,line,row){for(var startColumn=line.search(/\s*$/),maxRow=session.getLength(),startRow=row,re=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,depth=1;++row<maxRow;){line=session.getLine(row);var m=re.exec(line);if(m&&(m[1]?depth--:depth++,!depth))break}if(row>startRow)return new Range(startRow,startColumn,row,line.length)}}.call(FoldMode.prototype)})),ace.define("ace/mode/rust",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/rust_highlight_rules","ace/mode/folding/cstyle"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,RustHighlightRules=require("./rust_highlight_rules").RustHighlightRules,FoldMode=require("./folding/cstyle").FoldMode,Mode=function(){this.HighlightRules=RustHighlightRules,this.foldingRules=new FoldMode,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/",nestable:!0},this.$quotes={'"':'"'},this.$id="ace/mode/rust"}.call(Mode.prototype),exports.Mode=Mode})),ace.require(["ace/mode/rust"],(function(m){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=m)}));