webpackJsonp([8],{"4olk":function(s,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"ProducerInfo",components:{ApexTitle:s=>t.e(0).then((()=>s(t("IJ5Q"))).bind(null,t)).catch(t.oe),ApexBackGround:s=>t.e(0).then((()=>s(t("cmm4"))).bind(null,t)).catch(t.oe)},data:()=>({minerBy_url:"/api/v1.0/minerInfo/",minerBy:null,producerInfo:{Miner:null,Area:null,CurrentRank:null,Website:null,Description:null,block:null,MAddress:null,Name:null},producer:[],Miner:null,Name:null,Area:null,mAddress:null,CurrentRank:null,Website:null,Description:null,Block:null}),created(){},mounted(){this.getClickValue(),this.producer=JSON.parse(localStorage.getItem("producer"))},methods:{gotHome(){window.location.href="https://www.apexnetwork.io/"},getClickValue(){this.minerBy=this.$route.query.id,this.getProduceInfo()},getProduceInfo(){null!==this.minerBy&&this.$axios.get(this.minerBy_url+this.minerBy).then(s=>{let e=s.data.data;this.producerInfo.Miner=e.addr,this.producerInfo.Name=e.name,this.producerInfo.Area=e.zone,this.producerInfo.MAddress=e.address,this.producerInfo.block=e.blockCount,this.producerInfo.Website=e.webSite,this.producerInfo.Description=e.describe;for(let s=0;s<this.producer.length;s++){let e=this.producer[s];e.addr==this.minerBy&&(this.producerInfo.CurrentRank=e.Rank)}this.Miner="Miner:",this.Name="Name:",this.Area="Area:",this.mAddress="Mailing Address:",this.CurrentRank="CurrentRank:",this.Website="Website:",this.Description="Description:",this.Block="Block:"}).catch(function(s){})}}},r={render:function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"ProducerInfo"},[t("div",{staticClass:"data-table"},[t("ul",{staticClass:"table-ul"},[t("li",{staticClass:"row title"},[s._v("ProducerInfo")]),s._v(" "),t("li",{staticClass:"row"},[t("span",{staticClass:"col"},[s._v("\n          "+s._s(s.Miner)+"\n          "),t("span",{staticClass:"clo col-lg-8"},[s._v(s._s(s.producerInfo.Miner))])])]),s._v(" "),t("li",{staticClass:"row"},[""!==s.producerInfo.Name?t("span",{staticClass:"col"},[s._v("\n          "+s._s(s.Name)+"\n          "),t("span",{staticClass:"clo col-lg-8"},[s._v(s._s(s.producerInfo.Name))])]):s._e()]),s._v(" "),""!==s.producerInfo.Area?t("li",{staticClass:"row"},[t("span",{staticClass:"col"},[s._v("\n          "+s._s(s.Area)+"\n          "),t("span",{staticClass:"clo col-lg-8"},[s._v(s._s(s.producerInfo.Area))])])]):s._e(),s._v(" "),""!==s.producerInfo.MAddress?t("li",{staticClass:"row"},[t("span",{staticClass:"col"},[s._v("\n          "+s._s(s.mAddress)+"\n          "),t("span",{staticClass:"clo col-lg-8"},[s._v(s._s(s.producerInfo.MAddress))])])]):s._e(),s._v(" "),t("li",{staticClass:"row"},[t("span",{staticClass:"col"},[s._v("\n          "+s._s(s.CurrentRank)+"\n          "),t("span",{staticClass:"clo col-lg-8"},[s._v(s._s(s.producerInfo.CurrentRank))])])]),s._v(" "),""!==s.producerInfo.Website?t("li",{staticClass:"row"},[t("span",{staticClass:"col"},[s._v("\n          "+s._s(s.Website)+"\n          "),t("span",{staticClass:"clo col-lg-8 goHome",on:{click:s.gotHome}},[s._v(s._s(s.producerInfo.Website))])])]):s._e(),s._v(" "),""!==s.producerInfo.Description?t("li",{staticClass:"row"},[t("span",{staticClass:"col"},[s._v("\n          "+s._s(s.Description)+"\n          "),t("span",{staticClass:"clo col-lg-8"},[s._v(s._s(s.producerInfo.Description))])])]):s._e(),s._v(" "),t("li",{staticClass:"row"},[t("span",{staticClass:"col"},[s._v("\n          "+s._s(s.Block)+"\n          "),t("span",{staticClass:"clo col-lg-8"},[s._v(s._s(s.producerInfo.block))])])])])])])},staticRenderFns:[]};var l=t("VU/8")(n,r,!1,function(s){t("PyI7")},"data-v-ca26590a",null);e.default=l.exports},PyI7:function(s,e){}});