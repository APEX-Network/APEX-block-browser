webpackJsonp([14],{AWzG:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r={name:"Producer",components:{PublicNav:t=>i.e(2).then((()=>t(i("ggwd"))).bind(null,i)).catch(i.oe),PublicFooter:t=>i.e(2).then((()=>t(i("oTGJ"))).bind(null,i)).catch(i.oe),ApexTitle:t=>i.e(0).then((()=>t(i("IJ5Q"))).bind(null,i)).catch(i.oe),ApexBackGround:t=>i.e(0).then((()=>t(i("cmm4"))).bind(null,i)).catch(i.oe)},created(){},data:()=>({title:"Producer",producer:[],Rank:1,minerBy:null,minerBy_url:"/api/v1.0/minerInfo/minerList",params:{start:"0",pageSize:"10"},start:0,pageNumber:null,arrow:{leftArrow:null,rightArrow:null},isClick:!0,totalPage:null,point:null,count:null}),mounted(){this.getInstance(),this.getProducerList();const t=setInterval(()=>{this.getProducerList()},1500),s=setInterval(()=>{clearInterval(t)},6e4);this.$once("hook:beforeDestroy",()=>{clearInterval(t,s)})},methods:{getInstance(){this.arrow.leftArrow=this.$refs.left,this.arrow.rightArrow=this.$refs.right},getProducerList(){this.$axios.post(this.minerBy_url,this.params).then(t=>{this.producer=[],this.Rank=1,this.producer=t.data.data,this.count=this.producer.length/this.params.pageSize,this.count>=10&&(this.totalPage=10,this.pageNumber="1-"+this.totalPage),this.count<10&&(this.point=this.count.toString().indexOf("."),this.point>-1&&(this.totalPage=parseInt(this.count.toString().split(".")[0])+1),-1==this.point&&(this.totalPage=this.count),this.pageNumber="1-"+this.totalPage,1==this.totalPage&&(this.isClick=!1,this.arrow.rightArrow.src=i("0ite")));for(let t=0;t<this.producer.length;t++){const s=this.producer[t];this.producer[t].Rank=this.Rank++;let i=this.producer[t].votes,r=i.toString().indexOf(".");if(r>-1){let t=i.toString().split(".")[1].length;t>2&&(s.votes=i.toString().split(".")[0]+"."+i.toString().split(".")[1].substring(0,2)),t<=2&&(s.votes=i)}-1==r&&(s.votes=i)}localStorage.setItem("producer",JSON.stringify(this.producer))}).catch(function(t){t.response})},getNext(){if(this.Rank=1,this.start<10&&(this.arrow.leftArrow.src=i("+hvX"),this.arrow.rightArrow.src=i("gKOb"),this.start++,this.pageNumber=this.start+1+"-"+this.totalPage,this.params.start=this.start,this.$axios.post(this.minerBy_url,this.params).then(t=>{this.producer=t.data.data;for(let t=0;t<this.producer.length;t++)this.producer[t].Rank=this.Rank++}).catch(function(t){t.response}),10==this.start))return this.pageNumber=this.start+"-"+this.totalPage,this.arrow.rightArrow.src=i("0ite"),void(this.isClick=!1)},getPrevious(){if(this.Rank=1,this.isClick=!0,this.start>0&&(this.arrow.leftArrow.src=i("+hvX"),this.arrow.rightArrow.src=i("gKOb"),this.start--,this.pageNumber=this.start+"-"+this.totalPage,this.params.start=this.start,this.$axios.post(this.minerBy_url,this.params).then(t=>{this.producer=t.data.data;for(let t=0;t<this.producer.length;t++)this.producer[t].Rank=this.Rank++}).catch(function(t){t.response}),0==this.start))return this.arrow.leftArrow.src=i("eh+y"),void(this.pageNumber="1-"+this.totalPage)},getFirst(){this.Rank=1,this.isClick=!0,this.arrow.leftArrow.src=i("eh+y"),this.arrow.rightArrow.src=i("gKOb"),this.start=0,this.pageNumber="1-"+this.totalPage,this.params.start=this.start,this.$axios.post(this.minerBy_url,this.params).then(t=>{this.producer=t.data.data;for(let t=0;t<this.producer.length;t++)this.producer[t].Rank=this.Rank++}).catch(function(t){t.response})},getLast(){this.isClick=!0,this.Rank=1,this.arrow.leftArrow.src=i("+hvX"),this.arrow.rightArrow.src=i("0ite"),this.start=this.totalPage-1,this.pageNumber=this.totalPage+"-"+this.totalPage,this.params.start=this.start,this.$axios.post(this.minerBy_url,this.params).then(t=>{this.producer=t.data.data;for(let t=0;t<this.producer.length;t++)this.producer[t].Rank=this.Rank++}).catch(function(t){t.response})},setClickValue(t){this.$router.push({path:"/producer/ProducerInfo",query:{id:t}})}}},a={render:function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("div",{staticClass:"producer"},[r("div",{staticClass:"data-table"},[r("ul",{staticClass:"table-ul"},[r("li",{staticClass:"row title"},[t._v("Producer")]),t._v(" "),t._m(0),t._v(" "),t._l(t.producer,function(s,i){return r("li",{key:i,staticClass:"row"},[r("span",{staticClass:"col"},[t._v(t._s(s.Rank))]),t._v(" "),r("span",{staticClass:"col col-lg-8 addr",on:{click:function(i){return t.setClickValue(s.addr)}}},[t._v(t._s(s.addr))]),t._v(" "),r("span",{staticClass:"col"},[t._v(t._s(s.votes))]),t._v(" "),r("span",{staticClass:"col"},[t._v(t._s(s.blockCount))])])})],2),t._v(" "),r("div",{staticClass:"apex-pagination"},[r("div",{staticClass:"pagination-content"},[r("a",{staticClass:"first",on:{click:function(s){t.isClick&&t.getFirst()}}},[t._v("First")]),t._v(" "),r("img",{ref:"left",staticClass:"prev",attrs:{src:i("eh+y"),alt:""},on:{click:function(s){t.isClick&&t.getPrevious()}}}),t._v(" "),r("span",{staticClass:"list-number"},[t._v(t._s(t.pageNumber))]),t._v(" "),r("img",{ref:"right",staticClass:"next",attrs:{src:i("gKOb"),alt:""},on:{click:function(s){t.isClick&&t.getNext()}}}),t._v(" "),r("a",{staticClass:"last",on:{click:function(s){t.isClick&&t.getLast()}}},[t._v("Last")])])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"row"},[s("span",{staticClass:"col"},[this._v("Rank")]),this._v(" "),s("span",{staticClass:"col col-lg-8"},[this._v("Account")]),this._v(" "),s("span",{staticClass:"col"},[this._v("Votes")]),this._v(" "),s("span",{staticClass:"col"},[this._v("Blocks")])])}]};var e=i("VU/8")(r,a,!1,function(t){i("Z9ew")},"data-v-4595a5a2",null);s.default=e.exports},Z9ew:function(t,s){}});