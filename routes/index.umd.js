!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.doprouter_routes={})}(this,function(t){"use strict";var n,e=(function(t,n){var e=function(){var t=function(t,n,e,i){for(e=e||{},i=t.length;i--;e[t[i]]=n);return e},n=[1,9],e=[1,10],i=[1,11],r=[1,12],s=[5,11,12,13,14,15],o={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(t,n,e,i,r,s,o){var h=s.length-1;switch(r){case 1:return new i.Root({},[s[h-1]]);case 2:return new i.Root({},[new i.Literal({value:""})]);case 3:this.$=new i.Concat({},[s[h-1],s[h]]);break;case 4:case 5:this.$=s[h];break;case 6:this.$=new i.Literal({value:s[h]});break;case 7:this.$=new i.Splat({name:s[h]});break;case 8:this.$=new i.Param({name:s[h]});break;case 9:this.$=new i.Optional({},[s[h-1]]);break;case 10:this.$=t;break;case 11:case 12:this.$=t.slice(1)}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:n,13:e,14:i,15:r},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:n,13:e,14:i,15:r},{1:[2,2]},t(s,[2,4]),t(s,[2,5]),t(s,[2,6]),t(s,[2,7]),t(s,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:n,13:e,14:i,15:r},t(s,[2,10]),t(s,[2,11]),t(s,[2,12]),{1:[2,1]},t(s,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:n,12:[1,16],13:e,14:i,15:r},t(s,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(t,n){if(!n.recoverable){function e(t,n){this.message=t,this.hash=n}throw e.prototype=Error,new e(t,n)}this.trace(t)},parse:function(t){var n=this,e=[0],i=[null],r=[],s=this.table,o="",h=0,c=0,a=r.slice.call(arguments,1),l=Object.create(this.lexer),u={yy:{}};for(var y in this.yy)Object.prototype.hasOwnProperty.call(this.yy,y)&&(u.yy[y]=this.yy[y]);l.setInput(t,u.yy),u.yy.lexer=l,u.yy.parser=this,void 0===l.yylloc&&(l.yylloc={});var p=l.yylloc;r.push(p);var f=l.options&&l.options.ranges;"function"==typeof u.yy.parseError?this.parseError=u.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var m,d,g,_,v,k,x,b,w,E=function(){var t;return"number"!=typeof(t=l.lex()||1)&&(t=n.symbols_[t]||t),t},S={};;){if(g=e[e.length-1],this.defaultActions[g]?_=this.defaultActions[g]:(null!==m&&void 0!==m||(m=E()),_=s[g]&&s[g][m]),void 0===_||!_.length||!_[0]){var A="";for(k in w=[],s[g])this.terminals_[k]&&k>2&&w.push("'"+this.terminals_[k]+"'");A=l.showPosition?"Parse error on line "+(h+1)+":\n"+l.showPosition()+"\nExpecting "+w.join(", ")+", got '"+(this.terminals_[m]||m)+"'":"Parse error on line "+(h+1)+": Unexpected "+(1==m?"end of input":"'"+(this.terminals_[m]||m)+"'"),this.parseError(A,{text:l.match,token:this.terminals_[m]||m,line:l.yylineno,loc:p,expected:w})}if(_[0]instanceof Array&&_.length>1)throw new Error("Parse Error: multiple actions possible at state: "+g+", token: "+m);switch(_[0]){case 1:e.push(m),i.push(l.yytext),r.push(l.yylloc),e.push(_[1]),m=null,d?(m=d,d=null):(c=l.yyleng,o=l.yytext,h=l.yylineno,p=l.yylloc);break;case 2:if(x=this.productions_[_[1]][1],S.$=i[i.length-x],S._$={first_line:r[r.length-(x||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(x||1)].first_column,last_column:r[r.length-1].last_column},f&&(S._$.range=[r[r.length-(x||1)].range[0],r[r.length-1].range[1]]),void 0!==(v=this.performAction.apply(S,[o,c,h,u.yy,_[1],i,r].concat(a))))return v;x&&(e=e.slice(0,-1*x*2),i=i.slice(0,-1*x),r=r.slice(0,-1*x)),e.push(this.productions_[_[1]][0]),i.push(S.$),r.push(S._$),b=s[e[e.length-2]][e[e.length-1]],e.push(b);break;case 3:return!0}}return!0}},h={EOF:1,parseError:function(t,n){if(!this.yy.parser)throw new Error(t);this.yy.parser.parseError(t,n)},setInput:function(t,n){return this.yy=n||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var n=t.length,e=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-n),this.offset-=n;var i=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),e.length-1&&(this.yylineno-=e.length-1);var r=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:e?(e.length===i.length?this.yylloc.first_column:0)+i[i.length-e.length].length-e[0].length:this.yylloc.first_column-n},this.options.ranges&&(this.yylloc.range=[r[0],r[0]+this.yyleng-n]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),n=new Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+n+"^"},test_match:function(t,n){var e,i,r;if(this.options.backtrack_lexer&&(r={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(r.yylloc.range=this.yylloc.range.slice(0))),(i=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=i.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:i?i[i.length-1].length-i[i.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],e=this.performAction.call(this,this.yy,this,n,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),e)return e;if(this._backtrack){for(var s in r)this[s]=r[s];return!1}return!1},next:function(){if(this.done)return this.EOF;var t,n,e,i;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var r=this._currentRules(),s=0;s<r.length;s++)if((e=this._input.match(this.rules[r[s]]))&&(!n||e[0].length>n[0].length)){if(n=e,i=s,this.options.backtrack_lexer){if(!1!==(t=this.test_match(e,r[s])))return t;if(this._backtrack){n=!1;continue}return!1}if(!this.options.flex)break}return n?!1!==(t=this.test_match(n,r[i]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return t||this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},pushState:function(t){this.begin(t)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(t,n,e,i){switch(e){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};function c(){this.yy={}}return o.lexer=h,c.prototype=o,o.Parser=c,new c}();n.parser=e,n.Parser=e.Parser,n.parse=function(){return e.parse.apply(e,arguments)}}(n={exports:{}},n.exports),n.exports);function i(t){return function(n,e){return{displayName:t,props:n,children:e||[]}}}var r={Root:i("Root"),Concat:i("Concat"),Literal:i("Literal"),Splat:i("Splat"),Param:i("Param"),Optional:i("Optional")},s=e.parser;s.yy=r;var o=s,h=Object.keys(r);var c=function(t){return h.forEach(function(n){if(void 0===t[n])throw new Error("No handler defined for "+n.displayName)}),{visit:function(t,n){return this.handlers[t.displayName].call(this,t,n)},handlers:t}},a=/[\-{}\[\]+?.,\\\^$|#\s]/g;function l(t){this.captures=t.captures,this.re=t.re}l.prototype.match=function(t){var n=this.re.exec(t),e={};if(n)return this.captures.forEach(function(t,i){void 0===n[i+1]?e[t]=void 0:e[t]=decodeURIComponent(n[i+1])}),e};var u=c({Concat:function(t){return t.children.reduce(function(t,n){var e=this.visit(n);return{re:t.re+e.re,captures:t.captures.concat(e.captures)}}.bind(this),{re:"",captures:[]})},Literal:function(t){return{re:t.props.value.replace(a,"\\$&"),captures:[]}},Splat:function(t){return{re:"([^?]*?)",captures:[t.props.name]}},Param:function(t){return{re:"([^\\/\\?]+)",captures:[t.props.name]}},Optional:function(t){var n=this.visit(t.children[0]);return{re:"(?:"+n.re+")?",captures:n.captures}},Root:function(t){var n=this.visit(t.children[0]);return new l({re:new RegExp("^"+n.re+"(?=\\?|$)"),captures:n.captures})}}),y=c({Concat:function(t,n){var e=t.children.map(function(t){return this.visit(t,n)}.bind(this));return!e.some(function(t){return!1===t})&&e.join("")},Literal:function(t){return decodeURI(t.props.value)},Splat:function(t,n){return!!n[t.props.name]&&n[t.props.name]},Param:function(t,n){return!!n[t.props.name]&&n[t.props.name]},Optional:function(t,n){var e=this.visit(t.children[0],n);return e||""},Root:function(t,n){n=n||{};var e=this.visit(t.children[0],n);return!!e&&encodeURI(e)}});function p(t){var n;if(n=this?this:Object.create(p.prototype),void 0===t)throw new Error("A route spec is required");return n.spec=t,n.ast=o.parse(t),n}p.prototype=Object.create(null),p.prototype.match=function(t){var n=u.visit(this.ast).match(t);return n||!1},p.prototype.reverse=function(t){return y.visit(this.ast,t)};var f=p;t.createGroup=function(){var t=[];return{routes:t,add:function(n){return"function"==typeof n&&(t.push(n),n)},remove:function(n){return t.indexOf(n)>-1&&(t.splice(t.indexOf(n),1),n)},getRoute:function(n){for(var e=0;e<t.length;e++)if(t[e].match(n))return t[e];return!1}}},t.createRoute=function(t){var n=new f(t),e=function(t){return n.reverse(t)};return e.match=function(t){return n.match(function(t){return"string"!=typeof t&&"undefined"!=typeof window&&void 0!==window.location?window.location.href.slice(location.origin.length):t}(t))},e.route=n,e},Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=index.umd.js.map
