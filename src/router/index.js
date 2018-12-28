import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/index'
import wallet from '@/views/wallet/index'
import blocks from '@/views/blocks/index'
import transactions from '@/views/transactions/index'
import producer from '@/views/producer/index'
// import BlocksList from '@/components/home/list/BlocksList'
// import Transactions from '@/components/home/list/TransactionsList'
import BlocksInfo from '@/components/home/details/BlocksInfo'
import TransactionsInfo from '@/components/home/details/TransactionsInfo'
import AccountInfo from '@/components/home/details/AccountInfo'
import ProducerInfo from '@/components/home/details/ProducerInfo'
import NewWallet from '@/components/home/wallet/NewWallet'
import OpenWallet from '@/components/home/wallet/OpenWallet'
import PrivateKey from '@/components/home/wallet/PrivateKey'
import KeyStore from '@/components/home/wallet/KeyStore'
import CreatedKeystore from '@/components/home/wallet/CreatedKeystore'
import DownloadKey from '@/components/home/wallet/DownloadKey'
import Transfer from '@/components/home/wallet/Transfer'

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
      name: 'home',
      component: home,
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: wallet,
    },
    {
      path: '/NewWallet',
      alias: '/wallet/NewWallet',
      name: 'NewWallet',
      component: NewWallet,
    },
    {
      path: '/CreatedKeystore',
      alias: '/wallet/NewWallet/CreatedKeystore',
      name: 'CreatedKeystore',
      component: CreatedKeystore,
    },
    {
      path: '/DownloadKey',
      alias: '/wallet/NewWallet/CreatedKeystore/DownloadKey',
      name: 'DownloadKey',
      component: DownloadKey,
    },
    {
      path: '/OpenWallet',
      alias: '/wallet/OpenWallet',
      name: 'OpenWallet',
      component: OpenWallet,
    },
    {
      path: '/OpenWallet/PrivateKey',
      alias: '/wallet/OpenWallet/PrivateKey',
      name: 'PrivateKey',
      component: PrivateKey,
    },
    {
      path: '/OpenWallet/KeyStore',
      alias: '/wallet/OpenWallet/KeyStore',
      name: 'KeyStore',
      component: KeyStore,
    },
    {
      path: '/Transfer',
      alias: '/wallet/Transfer',
      name: 'Transfer',
      component: Transfer,
    },
    {
      path: '/blocks',
      name: 'blocks',
      component: blocks,
    },
    {
      path: "/BlocksInfo",
      alias: '/blocks/BlocksInfo',
      name: "BlocksInfo",
      component: BlocksInfo,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: transactions,
    },
    {
      path: "/TransactionsInfo",
      alias: '/transactions/TransactionsInfo',
      name: "TransactionsInfo",
      component: TransactionsInfo,
    },
    {
      path: "/TransactionsInfo/AccountInfo",
      alias: '/transactions/TransactionsInfo/AccountInfo',
      name: "AccountInfo",
      component: AccountInfo,
    },
    {
      path: '/producer',
      name: 'producer',
      component: producer,
    },
    {
      path: "/ProducerInfo",
      alias: '/producer/ProducerInfo',
      name: "ProducerInfo",
      component: ProducerInfo,
    }
  ]
})
