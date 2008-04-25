YUI.add("attribute",function(C){C.use("state");var B=function(E,F,D){this.type=E;this.prevVal=F;this.newVal=D;};var A=function(G){this._before=this._before||{};var F=this._before[G.type]||{};for(var E=0,D=F.length;E<D;++E){if(G._cancelled){break;}F[E].call(this,G);}};B.prototype={type:null,_prevent:false,_default:null,_cancel:false,stopPropagation:function(){this._cancel=true;},preventDefault:function(){this._prevent=true;}};C.Attribute=function(){this._conf=this._conf||new C.State();C.log("att constructor called");};C.Attribute.NAME="att";C.Attribute.ATTRS=[];C.Attribute.prototype={addAtt:function(D,E){this._conf=this._conf||new C.State();this._conf.add(D,E);},remove:function(D){this._conf.remove(D);},get:function(D){return this._conf.get(D,"value");},set:function(E,J){var G=E+"Change",D=this._conf,I;if(D.get(E,"readonly")){C.log("set "+E+"failed; attribute is readonly","error","Attribute");return this;}if(!D.get(E)){C.log("adding new attribute: "+E,"info","Base");}var H=new B(G,this.get(E),J);I=A.call(this,H);if(!H._cancel&&!H._prevent&&D.get(E,"set")){I=D.get(E,"set").call(this,J);if(I!==undefined){C.log("attribute: "+E+" modified by setter","info","Base");J=I;}}var F=D.get(E,"validator");if(!H._cancel||(F&&F.call(this,J))){D.add(E,{value:J});this.fire(G,H);}return this;},setAtts:function(E){for(var D in E){if(C.object.owns(E,D)){this.set(D,E[D]);}}},getAtts:function(E){var D={};if(E){D=C.clone(E);}else{C.each(this._conf.get("value"),function(G,F){D[F]=G;});}return D;}};C.augment(C.Attribute,C.Event.Target);},"3.0.0");YAHOO.register("attribute",YUI.Attribute,{version:"@VERSION@",build:"@BUILD@"});