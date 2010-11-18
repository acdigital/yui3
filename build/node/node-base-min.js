YUI.add("node-base",function(c){var i=".",e="nodeName",m="nodeType",b="ownerDocument",l="tagName",d="_yuid",o=Array.prototype.slice,f=c.DOM,j=function(q){var p=(q.nodeType!==9)?q.uniqueID:q[d];if(p&&j._instances[p]&&j._instances[p]._node!==q){q[d]=null;}p=p||c.stamp(q);if(!p){p=c.guid();}this[d]=p;this._node=q;j._instances[p]=this;this._stateProxy=q;c.EventTarget.call(this,{emitFacade:true});if(this._initPlugins){this._initPlugins();}this.SHOW_TRANSITION=j.SHOW_TRANSITION;this.HIDE_TRANSITION=j.HIDE_TRANSITION;},n=function(q){var p=null;if(q){p=(typeof q=="string")?function(r){return c.Selector.test(r,q);}:function(r){return q(c.one(r));};}return p;};j.NAME="node";j.re_aria=/^(?:role$|aria-)/;j.SHOW_TRANSITION="fadeIn";j.HIDE_TRANSITION="fadeOut";j.DOM_EVENTS={abort:1,beforeunload:1,blur:1,change:1,click:1,close:1,command:1,contextmenu:1,dblclick:1,DOMMouseScroll:1,drag:1,dragstart:1,dragenter:1,dragover:1,dragleave:1,dragend:1,drop:1,error:1,focus:1,key:1,keydown:1,keypress:1,keyup:1,load:1,message:1,mousedown:1,mouseenter:1,mouseleave:1,mousemove:1,mousemultiwheel:1,mouseout:1,mouseover:1,mouseup:1,mousewheel:1,reset:1,resize:1,select:1,selectstart:1,submit:1,scroll:1,textInput:1,unload:1};c.mix(j.DOM_EVENTS,c.Env.evt.plugins);j._instances={};j.getDOMNode=function(p){if(p){return(p.nodeType)?p:p._node||null;}return null;};j.scrubVal=function(q,p){if(q){if(typeof q=="object"||typeof q=="function"){if(m in q||f.isWindow(q)){q=c.one(q);}else{if((q.item&&!q._nodes)||(q[0]&&q[0][m])){q=c.all(q);}}}}else{if(typeof q==="undefined"){q=p;}else{if(q===null){q=null;}}}return q;};j.addMethod=function(p,r,q){if(p&&r&&typeof r=="function"){j.prototype[p]=function(){var t=o.call(arguments),u=this,s;if(t[0]&&c.instanceOf(t[0],j)){t[0]=t[0]._node;}if(t[1]&&c.instanceOf(t[1],j)){t[1]=t[1]._node;}t.unshift(u._node);s=r.apply(u,t);if(s){s=j.scrubVal(s,u);}(typeof s!="undefined")||(s=u);return s;};}else{}};j.importMethod=function(r,p,q){if(typeof p=="string"){q=q||p;j.addMethod(q,r[p],r);}else{c.Array.each(p,function(s){j.importMethod(r,s);});}};j.one=function(s){var p=null,r,q;if(s){if(typeof s=="string"){if(s.indexOf("doc")===0){s=c.config.doc;}else{if(s.indexOf("win")===0){s=c.config.win;}else{s=c.Selector.query(s,null,true);}}if(!s){return null;}}else{if(c.instanceOf(s,j)){return s;}}if(s.nodeType||c.DOM.isWindow(s)){q=(s.uniqueID&&s.nodeType!==9)?s.uniqueID:s._yuid;p=j._instances[q];r=p?p._node:null;if(!p||(r&&s!==r)){p=new j(s);}}}return p;};j.create=function(){return c.one(f.create.apply(f,arguments));};j.ATTRS={text:{getter:function(){return f.getText(this._node);},setter:function(p){f.setText(this._node,p);return p;}},"options":{getter:function(){return this._node.getElementsByTagName("option");}},"children":{getter:function(){var s=this._node,r=s.children,t,q,p;if(!r){t=s.childNodes;r=[];for(q=0,p=t.length;q<p;++q){if(t[q][l]){r[r.length]=t[q];}}}return c.all(r);}},value:{getter:function(){return f.getValue(this._node);},setter:function(p){f.setValue(this._node,p);return p;}}};j.DEFAULT_SETTER=function(p,r){var q=this._stateProxy,s;if(p.indexOf(i)>-1){s=p;p=p.split(i);c.Object.setValue(q,p,r);}else{if(typeof q[p]!="undefined"){q[p]=r;}}return r;};j.DEFAULT_GETTER=function(p){var q=this._stateProxy,r;if(p.indexOf&&p.indexOf(i)>-1){r=c.Object.getValue(q,p.split(i));}else{if(typeof q[p]!="undefined"){r=q[p];}}return r;};c.mix(j,c.EventTarget,false,null,1);c.mix(j.prototype,{toString:function(){var s=this[d]+": not bound to a node",r=this._node,p,t,q;if(r){p=r.attributes;t=(p&&p.id)?r.getAttribute("id"):null;q=(p&&p.className)?r.getAttribute("className"):null;s=r[e];if(t){s+="#"+t;}if(q){s+="."+q.replace(" ",".");}s+=" "+this[d];}return s;},get:function(p){var q;if(this._getAttr){q=this._getAttr(p);}else{q=this._get(p);}if(q){q=j.scrubVal(q,this);}else{if(q===null){q=null;}}return q;},_get:function(p){var q=j.ATTRS[p],r;if(q&&q.getter){r=q.getter.call(this);}else{if(j.re_aria.test(p)){r=this._node.getAttribute(p,2);}else{r=j.DEFAULT_GETTER.apply(this,arguments);}}return r;},set:function(p,r){var q=j.ATTRS[p];if(this._setAttr){this._setAttr.apply(this,arguments);}else{if(q&&q.setter){q.setter.call(this,r,p);}else{if(j.re_aria.test(p)){this._node.setAttribute(p,r);}else{j.DEFAULT_SETTER.apply(this,arguments);}}}return this;},setAttrs:function(p){if(this._setAttrs){this._setAttrs(p);}else{c.Object.each(p,function(q,r){this.set(r,q);},this);}return this;},getAttrs:function(q){var p={};if(this._getAttrs){this._getAttrs(q);}else{c.Array.each(q,function(r,s){p[r]=this.get(r);},this);}return p;},create:j.create,compareTo:function(p){var q=this._node;if(c.instanceOf(p,j)){p=p._node;}return q===p;},inDoc:function(q){var p=this._node;q=(q)?q._node||q:p[b];if(q.documentElement){return f.contains(q.documentElement,p);}},getById:function(r){var q=this._node,p=f.byId(r,q[b]);if(p&&f.contains(q,p)){p=c.one(p);}else{p=null;}return p;},ancestor:function(p,q){return c.one(f.ancestor(this._node,n(p),q));},ancestors:function(p,q){return c.all(f.ancestors(this._node,n(p),q));},previous:function(q,p){return c.one(f.elementByAxis(this._node,"previousSibling",n(q),p));},next:function(q,p){return c.one(f.elementByAxis(this._node,"nextSibling",n(q),p));},siblings:function(p){return c.all(f.siblings(this._node,n(p)));},one:function(p){return c.one(c.Selector.query(p,this._node,true));},all:function(p){var q=c.all(c.Selector.query(p,this._node));q._query=p;q._queryRoot=this._node;return q;},test:function(p){return c.Selector.test(this._node,p);},remove:function(q){var r=this._node,p=r.parentNode;if(p){p.removeChild(r);}if(q){this.destroy(true);}return this;},replace:function(p){var q=this._node;if(typeof p=="string"){p=j.create(p);}q.parentNode.replaceChild(j.getDOMNode(p),q);return this;},replaceChild:function(q,p){if(typeof q=="string"){q=f.create(q);}return c.one(this._node.replaceChild(j.getDOMNode(q),j.getDOMNode(p)));},appendChild:function(p){return j.scrubVal(this._insert(p));},insertBefore:function(q,p){return c.Node.scrubVal(this._insert(q,p));
},purge:function(q,p){c.Event.purgeElement(this._node,q,p);return this;},destroy:function(p){delete j._instances[this[d]];this.purge(p);if(this.unplug){this.unplug();}this._node=null;this._stateProxy=null;this.clearData();},invoke:function(w,q,p,v,u,t){var s=this._node,r;if(q&&c.instanceOf(q,j)){q=q._node;}if(p&&c.instanceOf(p,j)){p=p._node;}r=s[w](q,p,v,u,t);return j.scrubVal(r,this);},insert:function(q,p){this._insert(q,p);return this;},_insert:function(s,q){var r=this._node,p=null;if(typeof q=="number"){q=this._node.childNodes[q];}else{if(q&&q._node){q=q._node;}}if(s&&typeof s!="string"){s=s._node||s._nodes||s;}p=f.addHTML(r,s,q);return p;},prepend:function(p){return this.insert(p,0);},append:function(p){return this.insert(p,null);},appendTo:function(p){c.one(p).append(this);},setContent:function(p){this._insert(p,"replace");return this;},getContent:function(p){return this.get("innerHTML");},swap:c.config.doc.documentElement.swapNode?function(p){this._node.swapNode(j.getDOMNode(p));}:function(p){p=j.getDOMNode(p);var r=this._node,q=p.parentNode,s=p.nextSibling;if(s===r){q.insertBefore(r,p);}else{if(p===r.nextSibling){q.insertBefore(p,r);}else{r.parentNode.replaceChild(p,r);f.addHTML(q,r,s);}}return this;},getData:function(q){var p;this._data=this._data||{};if(arguments.length){p=this._data[q];}else{p=this._data;}return p;},setData:function(p,q){this._data=this._data||{};if(arguments.length>1){this._data[p]=q;}else{this._data=p;}return this;},clearData:function(p){if("_data" in this){if(p){delete this._data[p];}else{delete this._data;}}return this;},hasMethod:function(q){var p=this._node;return !!(p&&q in p&&typeof p[q]!="unknown"&&(typeof p[q]=="function"||String(p[q]).indexOf("function")===1));},SHOW_TRANSITION:null,HIDE_TRANSITION:null,show:function(q,p,r){this._show();return this;},_show:function(){this.setStyle("display","");},hide:function(q,p,r){this._hide();return this;},_hide:function(){this.setStyle("display","none");},isFragment:function(){return(this.get("nodeType")===11);},empty:function(p){this.get("childNodes").remove(p);return this;}},true);c.Node=j;c.one=c.Node.one;var a=function(p){var q=[];if(typeof p==="string"){this._query=p;p=c.Selector.query(p);}else{if(p.nodeType||f.isWindow(p)){p=[p];}else{if(c.instanceOf(p,c.Node)){p=[p._node];}else{if(c.instanceOf(p[0],c.Node)){c.Array.each(p,function(r){if(r._node){q.push(r._node);}});p=q;}else{p=c.Array(p,0,true);}}}}this._nodes=p;};a.NAME="NodeList";a.getDOMNodes=function(p){return(p&&p._nodes)?p._nodes:p;};a.each=function(p,s,r){var q=p._nodes;if(q&&q.length){c.Array.each(q,s,r||p);}else{}};a.addMethod=function(p,r,q){if(p&&r){a.prototype[p]=function(){var t=[],s=arguments;c.Array.each(this._nodes,function(y){var x=(y.uniqueID&&y.nodeType!==9)?"uniqueID":"_yuid",v=c.Node._instances[y[x]],w,u;if(!v){v=a._getTempNode(y);}w=q||v;u=r.apply(w,s);if(u!==undefined&&u!==v){t[t.length]=u;}});return t.length?t:this;};}else{}};a.importMethod=function(r,p,q){if(typeof p==="string"){q=q||p;a.addMethod(p,r[p]);}else{c.Array.each(p,function(s){a.importMethod(r,s);});}};a._getTempNode=function(q){var p=a._tempNode;if(!p){p=c.Node.create("<div></div>");a._tempNode=p;}p._node=q;p._stateProxy=q;return p;};c.mix(a.prototype,{item:function(p){return c.one((this._nodes||[])[p]);},each:function(r,q){var p=this;c.Array.each(this._nodes,function(t,s){t=c.one(t);return r.call(q||t,t,s,p);});return p;},batch:function(q,p){var r=this;c.Array.each(this._nodes,function(u,t){var s=c.Node._instances[u[d]];if(!s){s=a._getTempNode(u);}return q.call(p||s,s,t,r);});return r;},some:function(r,q){var p=this;return c.Array.some(this._nodes,function(t,s){t=c.one(t);q=q||t;return r.call(q,t,s,p);});},toFrag:function(){return c.one(c.DOM._nl2frag(this._nodes));},indexOf:function(p){return c.Array.indexOf(this._nodes,c.Node.getDOMNode(p));},filter:function(p){return c.all(c.Selector.filter(this._nodes,p));},modulus:function(s,q){q=q||0;var p=[];a.each(this,function(t,r){if(r%s===q){p.push(t);}});return c.all(p);},odd:function(){return this.modulus(2,1);},even:function(){return this.modulus(2);},destructor:function(){},refresh:function(){var s,q=this._nodes,r=this._query,p=this._queryRoot;if(r){if(!p){if(q&&q[0]&&q[0].ownerDocument){p=q[0].ownerDocument;}}this._nodes=c.Selector.query(r,p);}return this;},_prepEvtArgs:function(s,r,q){var p=c.Array(arguments,0,true);if(p.length<2){p[2]=this._nodes;}else{p.splice(2,0,this._nodes);}p[3]=q||this;return p;},on:function(r,q,p){return c.on.apply(c,this._prepEvtArgs.apply(this,arguments));},once:function(r,q,p){return c.once.apply(c,this._prepEvtArgs.apply(this,arguments));},after:function(r,q,p){return c.after.apply(c,this._prepEvtArgs.apply(this,arguments));},size:function(){return this._nodes.length;},isEmpty:function(){return this._nodes.length<1;},toString:function(){var s="",r=this[d]+": not bound to any nodes",p=this._nodes,q;if(p&&p[0]){q=p[0];s+=q[e];if(q.id){s+="#"+q.id;}if(q.className){s+="."+q.className.replace(" ",".");}if(p.length>1){s+="...["+p.length+" items]";}}return s||r;}},true);a.importMethod(c.Node.prototype,["append","destroy","detach","detachAll","empty","insert","prepend","remove","set","setContent"]);a.prototype.get=function(q){var t=[],s=this._nodes,r=false,u=a._getTempNode,p,v;if(s[0]){p=c.Node._instances[s[0]._yuid]||u(s[0]);v=p._get(q);if(v&&v.nodeType){r=true;}}c.Array.each(s,function(w){p=c.Node._instances[w._yuid];if(!p){p=u(w);}v=p._get(q);if(!r){v=c.Node.scrubVal(v,p);}t.push(v);});return(r)?c.all(t):t;};c.NodeList=a;c.all=function(p){return new a(p);};c.Node.all=c.all;c.Array.each(["removeChild","hasChildNodes","cloneNode","hasAttribute","removeAttribute","scrollIntoView","getElementsByTagName","focus","blur","submit","reset","select","createCaption"],function(p){c.Node.prototype[p]=function(t,r,q){var s=this.invoke(p,t,r,q);return s;};});c.Node.importMethod(c.DOM,["contains","setAttribute","getAttribute","wrap","unwrap"]);c.NodeList.importMethod(c.Node.prototype,["getAttribute","setAttribute","removeAttribute","unwrap","wrap"]);
(function(q){var p=["hasClass","addClass","removeClass","replaceClass","toggleClass"];q.Node.importMethod(q.DOM,p);q.NodeList.importMethod(q.Node.prototype,p);})(c);if(!c.config.doc.documentElement.hasAttribute){c.Node.prototype.hasAttribute=function(p){if(p==="value"){if(this.get("value")!==""){return true;}}return !!(this._node.attributes[p]&&this._node.attributes[p].specified);};}c.Node.prototype.focus=function(){try{this._node.focus();}catch(p){}};c.Node.ATTRS.type={setter:function(q){if(q==="hidden"){try{this._node.type="hidden";}catch(p){this.setStyle("display","none");this._inputType="hidden";}}else{try{this._node.type=q;}catch(p){}}return q;},getter:function(){return this._inputType||this._node.type;},_bypassProxy:true};if(c.config.doc.createElement("form").elements.nodeType){c.Node.ATTRS.elements={getter:function(){return this.all("input, textarea, button, select");}};}c.mix(c.Node.ATTRS,{offsetHeight:{setter:function(p){c.DOM.setHeight(this._node,p);return p;},getter:function(){return this._node.offsetHeight;}},offsetWidth:{setter:function(p){c.DOM.setWidth(this._node,p);return p;},getter:function(){return this._node.offsetWidth;}}});c.mix(c.Node.prototype,{sizeTo:function(p,q){var r;if(arguments.length<2){r=c.one(p);p=r.get("offsetWidth");q=r.get("offsetHeight");}this.setAttrs({offsetWidth:p,offsetHeight:q});}});var k=c.NodeList,h=Array.prototype,g=["concat","pop","push","shift","slice","splice","unshift"];c.Array.each(g,function(p){k.prototype[p]=function(){var r=[],s=0,q;while((q=arguments[s++])){r.push(q._node||q._nodes||q);}return c.Node.scrubVal(h[p].apply(this._nodes,r));};});},"@VERSION@",{requires:["dom-base","selector-css2","event-base"]});