webpackJsonp([10],{"9Lr5":function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=a("oAV5");var i={name:"Transactions",components:{ApexTitle:t=>a.e(0).then((()=>t(a("IJ5Q"))).bind(null,a)).catch(a.oe),ApexBackGround:t=>a.e(0).then((()=>t(a("cmm4"))).bind(null,a)).catch(a.oe)},data:()=>({title:"Transactions",transactions:[],clickValue:null,transaction_list_url:"/api/v1.0/transactions/transactionList",start:0,params:{start:"0",pageSize:"10"},pageNumber:"1-10",arrow:{leftArrow:null,rightArrow:null},isClick:!0}),created(){},mounted(){this.getInstance(),this.getAllTransactions(this.start);const t=setInterval(()=>{this.getAllTransactions(this.start)},1500),s=setInterval(()=>{clearInterval(t)},6e4);this.$once("hook:beforeDestroy",()=>{clearInterval(t,s)})},methods:{getInstance(){this.arrow.leftArrow=this.$refs.left,this.arrow.rightArrow=this.$refs.right},setClickValue(t){null!==t&&this.$router.push({path:"/transactions/TransactionsInfo",query:{id:t}})},getAllTransactions(t){this.params.start=t,this.$axios.post(this.transaction_list_url,this.params).then(t=>{this.transactions=[];let s,a=t.data.data,i=t.headers.date;for(let t=0;t<a.length;t++){const e=a[t];s=r.a.utilMethods.listUTCtime(e.refBlockTime,i),e.refBlockTime=s}this.transactions=a}).catch(function(t){t.response})},getNext(){if(this.start<9&&(this.arrow.leftArrow.src=a("+hvX"),this.arrow.rightArrow.src=a("gKOb"),this.start++,this.pageNumber=this.start+1+"-10",this.getAllTransactions(this.start),9==this.start))return this.arrow.rightArrow.src=a("0ite"),void(this.isClick=!1)},getPrevious(){if(this.isClick=!0,this.start>0&&(this.arrow.leftArrow.src=a("+hvX"),this.arrow.rightArrow.src=a("gKOb"),this.start--,this.pageNumber=this.start+"-10",this.getAllTransactions(this.start),0==this.start))return this.arrow.leftArrow.src=a("eh+y"),void(this.pageNumber="1-10")},getFirst(){this.isClick=!0,this.arrow.leftArrow.src=a("eh+y"),this.arrow.rightArrow.src=a("gKOb"),this.start=0,this.pageNumber="1-10",this.getAllTransactions(this.start)},getLast(){this.isClick=!0,this.arrow.leftArrow.src=a("+hvX"),this.arrow.rightArrow.src=a("0ite"),this.start=9,this.pageNumber=this.start+1+"-10",this.getAllTransactions(this.start)}}},e={render:function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("div",{staticClass:"transactions"},[r("div",{staticClass:"data-table transactions-table"},[r("ul",{staticClass:"table-ul"},[r("li",{staticClass:"row title"},[t._v("Transactions")]),t._v(" "),t._l(t.transactions,function(s,a){return r("li",{key:a,staticClass:"row"},[r("span",{staticClass:"col col-lg-10"},[r("div",{staticClass:"bottom"},[r("span",{on:{click:function(a){return t.setClickValue(s.txHash)}}},[t._v(t._s(s.txHash))])])]),t._v(" "),r("span",{staticClass:"col time"},[t._v(t._s(s.refBlockTime))])])})],2),t._v(" "),r("div",{staticClass:"apex-pagination"},[r("div",{staticClass:"pagination-content"},[r("a",{staticClass:"first",on:{click:t.getFirst}},[t._v("First")]),t._v(" "),r("img",{ref:"left",staticClass:"prev",attrs:{src:a("eh+y"),alt:""},on:{click:t.getPrevious}}),t._v(" "),r("span",{staticClass:"list-number"},[t._v(t._s(t.pageNumber))]),t._v(" "),r("img",{ref:"right",staticClass:"next",attrs:{src:a("gKOb"),alt:""},on:{click:function(s){t.isClick&&t.getNext()}}}),t._v(" "),r("a",{staticClass:"last",on:{click:t.getLast}},[t._v("Last")])])])])])},staticRenderFns:[]};var n=a("VU/8")(i,e,!1,function(t){a("dp2d")},"data-v-a9bd0aaa",null);s.default=n.exports},dp2d:function(t,s){}});