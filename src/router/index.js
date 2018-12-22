import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/index'
import wallet from '@/views/wallet/index'
import blocks from '@/views/blocks/index'
import transactions from '@/views/transactions/index'
import producer from '@/views/producer/index'
import Blocks from '@/components/home/list/Blocks'
import Transactions from '@/components/home/list/Transactions'
import BlocksDetails from '@/components/home/detail/BlocksDetails'
import TransactionsDetails from '@/components/home/detail/TransactionsDetails'
import AccountDetails from '@/components/home/detail/AccountDetails'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'default',
      component: home,
      redirect: '/home',
      children: [
        {
          path: "/home",
          name: "Home",
          component: home,
        }
      ]
    },
    {
      path: '/home',
      name: 'ome',
      component: home,
    },
    {
      path: "/home/blocks",
      name: "Blocks",
      component: Blocks,
    },
    {
      path: "/home/transactions",
      name: "Transactions",
      component: Transactions,
    },
    {
      path: "/home/blocks/details",
      name: "BlocksDetails",
      component: BlocksDetails,
    },
    {
      path: "/home/transactions/details",
      name: "TransactionsDetails",
      component: TransactionsDetails,
    },
    {
      path: "/home/transactions/account_detail",
      name: "AccountDetails",
      component: AccountDetails,
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: wallet,
    },
    {
      path: '/blocks',
      name: 'blocks',
      component: blocks,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: transactions,
    },
    {
      path: '/producer',
      name: 'producer',
      component: producer,
    }
  ]
})
