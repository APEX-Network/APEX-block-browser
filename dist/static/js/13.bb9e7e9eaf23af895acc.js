webpackJsonp([13],{"/RRO":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("oAV5"),i=s("xipm"),l=s("z+6K");var a={name:"KeyStore",props:[""],data:()=>({title:"OpenWallet",walletAddress:null,keyStore:null,pwd:null,firstClick:1,hiddenpwd:null,checkKeyStore:null}),components:{ApexBackGround:e=>s.e(0).then((()=>e(s("cmm4"))).bind(null,s)).catch(s.oe),ApexTitle:e=>s.e(0).then((()=>e(s("IJ5Q"))).bind(null,s)).catch(s.oe)},mounted(){this.hiddenpwd=this.$refs.hiddenPwd,this.checkKeyStore=this.$refs.checkKeyStore},methods:{getkeyStore(){this.keyStore=this.$refs.keyStore.value},getPwd(){this.pwd=this.$refs.pwd.value},displayPwd(){this.firstClick++,this.firstClick%2==0&&null!==this.pwd&&(this.$refs.pwd.type="text",this.hiddenpwd.src=s("DHRa")),this.firstClick%2==1&&null!==this.pwd&&(this.$refs.pwd.type="password",this.hiddenpwd.src=s("Pc5k"))},keyStoreWallet(){try{if(null!==this.keyStore&&null!==this.pwd){let e=this.keyStore,t=this.pwd;this.walletAddress=r.a.utilMethods.keyStoreWallet(e,t),i.a.$emit("apAddress",this.walletAddress),localStorage.setItem("apAddress",this.walletAddress),l.a.APKStore.put({APAddress:this.walletAddress,KStore:this.keyStore}),this.checkKeyStore.style.visibility="hidden",this.$router.push("/wallet")}}catch(e){this.checkKeyStore.style.visibility="visible"}}},watch:{}},d={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"keyStore"},[r("p",{staticClass:"title"},[e._v(e._s(e.title))]),e._v(" "),r("div",{staticClass:"flex-container"},[e._m(0),e._v(" "),r("div",{staticClass:"enterpwd"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.keyStore,expression:"keyStore"}],ref:"keyStore",attrs:{spellcheck:"false",placeholder:"Paste or type keystore",autocomplete:"new-password",readonly:"",onfocus:"this.removeAttribute('readonly');"},domProps:{value:e.keyStore},on:{change:e.getkeyStore,input:function(t){t.target.composing||(e.keyStore=t.target.value)}}}),e._v(" "),r("div",{staticClass:"repatpwd"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.pwd,expression:"pwd"}],ref:"pwd",attrs:{spellcheck:"false",type:"password",autocomplete:"new-password",placeholder:"Enter the password corresponding to this keystore",onKeyUp:"value=value.replace(/[\\W]/g,'')",readonly:"",onfocus:"this.removeAttribute('readonly');"},domProps:{value:e.pwd},on:{change:e.getPwd,input:function(t){t.target.composing||(e.pwd=t.target.value)}}}),e._v(" "),r("img",{ref:"hiddenPwd",attrs:{src:s("Pc5k")},on:{click:e.displayPwd}})]),e._v(" "),r("div",{ref:"checkKeyStore",staticClass:"checkKeyStore"},[e._v("Import failed")])]),e._v(" "),r("div",{staticClass:"create",on:{click:e.keyStoreWallet}},[e._v("CONTNUE")])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"text"},[t("p",[this._v("Import wallet address by keystore.")])])}]};var o=s("VU/8")(a,d,!1,function(e){s("EDy7")},"data-v-6a857045",null);t.default=o.exports},EDy7:function(e,t){}});