webpackJsonp([20],{"5P8b":function(t,s){},ajfk:function(t,s,l){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=l("oAV5");l("JkSa");var i={name:"BlocksInfo",components:{ApexTitle:t=>l.e(0).then((()=>t(l("IJ5Q"))).bind(null,l)).catch(l.oe),ApexBackGround:t=>l.e(0).then((()=>t(l("cmm4"))).bind(null,l)).catch(l.oe)},data:()=>({title:"Blocks Information",url:{blockHash_url:"/api/v1.0/blocks/blockHash/",blockHeight_url:"/api/v1.0/blocks/blockHeight/"},height:null,timeStamp:null,transactions:null,blockHash:null,parentHash:null,minedBy:null,result:{type:null,value:null},txNum:null}),created(){},mounted(){this.getClickValue()},methods:{goTxBlock(t){this.$router.push({path:"/blocks/BlocksInfo/TxFBlock",query:{id:t,txNum:this.txNum}})},getClickValue(){if(this.result.value=this.$route.query.id,null===this.result.value);else{try{let t=this.result.value.length;this.result.type=64==t?"hash":"height"}catch(t){this.result.type="height"}this.getBlocksInfo()}},setClickValue(t){0!==this.height&&null!==this.height&&this.$router.push({path:"/producer/ProducerInfo",query:{id:t}})},getBlocksInfo(){if(this.result){let t=this.result.type,s=this.result.value;switch(t){case"hash":this.$axios.get(this.url.blockHash_url+s).then(t=>{let s=t.data.data,l=t.headers.date;this.height=s.height,this.blockHash=s.blockHash,this.timeStamp=a.a.utilMethods.toUTCtime(s.timeStamp,l),this.transactions=s.txNum+"   transactions in this block",this.parentHash=s.prevBlock,this.minedBy=s.producer,this.txNum=s.txNum}).catch(function(t){});break;case"height":this.$axios.get(this.url.blockHeight_url+s).then(t=>{let s=t.data.data,l=t.headers.date;"NotFound"!==s&&null!==s.txNum&&(this.height=s.height,this.blockHash=s.blockHash,this.timeStamp=a.a.utilMethods.toUTCtime(s.timeStamp,l),this.transactions=s.txNum+" transactions in this block",this.parentHash=s.prevBlock,this.minedBy=s.producer,this.txNum=s.txNum)}).catch(function(t){})}}},getParentBlock(t){0!=this.height&&this.parentHash&&this.$router.push({query:{id:t}})}}},e={render:function(){var t=this,s=t.$createElement,l=t._self._c||s;return l("div",{staticClass:"BlocksInfo"},[l("div",{staticClass:"data-table"},[l("ul",{staticClass:"table-ul"},[l("li",{staticClass:"row title"},[t._v("Blocks Information")]),t._v(" "),l("li",{staticClass:"row"},[l("span",{staticClass:"col"},[t._v("\n          Height:\n          "),l("span",{staticClass:"clol col-lg-8"},[t._v(t._s(t.height))])])]),t._v(" "),l("li",{staticClass:"row"},[l("span",{staticClass:"col"},[t._v("\n          TimeStamp:\n          "),l("span",{staticClass:"clol col-lg-8"},[t._v(t._s(t.timeStamp))])])]),t._v(" "),l("li",{staticClass:"row"},[l("span",{staticClass:"col"},[t._v("\n          Transactions:\n          "),l("span",{staticClass:"clol col-lg-8 transactions",on:{click:function(s){return t.goTxBlock(t.height)}}},[t._v(t._s(t.transactions))])])]),t._v(" "),l("li",{staticClass:"row"},[l("span",{staticClass:"col"},[t._v("\n          Hash:\n          "),l("span",{staticClass:"clol col-lg-8"},[t._v(t._s(t.blockHash))])])]),t._v(" "),l("li",{staticClass:"row"},[l("span",{staticClass:"col"},[t._v("\n          Parent Hash:\n          "),l("span",{staticClass:"clol col-lg-8"},[l("span",{on:{click:function(s){return t.getParentBlock(t.parentHash)}}},[t._v(t._s(t.parentHash))])])])]),t._v(" "),l("li",{staticClass:"row"},[l("span",{staticClass:"col"},[t._v("\n          Mined By:\n          "),l("span",{staticClass:"clol col-lg-8"},[l("span",{on:{click:function(s){return t.setClickValue(t.minedBy)}}},[t._v(t._s(t.minedBy))])])])])])])])},staticRenderFns:[]};var n=l("VU/8")(i,e,!1,function(t){l("5P8b")},"data-v-0efffd0f",null);s.default=n.exports}});