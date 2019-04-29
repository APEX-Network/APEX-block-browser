import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/index'
import wallet from '@/views/wallet/index'
import blocks from '@/views/blocks/index'
import transactions from '@/views/transactions/index'
import producer from '@/views/producer/index'
import BlocksInfo from '@/components/details/BlocksInfo'
import TransactionsInfo from '@/components/details/TransactionsInfo'
import AccountInfo from '@/components/details/AccountInfo'
import ProducerInfo from '@/components/details/ProducerInfo'
import NewWallet from '@/views/wallet/wallet/NewWallet'
import OpenWallet from '@/views/wallet/wallet/OpenWallet'
import PrivateKey from '@/views/wallet/wallet/PrivateKey'
import KeyStore from '@/views/wallet/wallet/KeyStore'
import CreatedKeystore from '@/views/wallet/wallet/CreatedKeystore'
import SavePrivKey from '@/views/wallet/wallet/SavePrivKey'
import Transfer from '@/views/wallet/wallet/Transfer'
import VotingSupport from '@/views/wallet/wallet/VotingSupport';
import RefundVote from '@/views/wallet/wallet/RefundVote';
import emptyWallet from '@/views/wallet/wallet/emptyWallet';
import error from '@/views/error/error';
import useProtocol from '@/views/useProtocol/useProtocol';
import TxFBlock from '@/components/details/TxFBlock';

Vue.use(Router)

export default new Router({
  // mode: 'history',
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
    path: '/emptyWallet',
    name: 'emptyWallet',
    component: emptyWallet,
  },

  {
    path: '/NewWallet',
    alias: '/emptyWallet/NewWallet',
    name: 'NewWallet',
    component: NewWallet,
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
    path: '/CreatedKeystore',
    alias: '/emptyWallet/NewWallet/CreatedKeystore',
    name: 'CreatedKeystore',
    component: CreatedKeystore,
  },

  {
    path: '/SavePrivKey',
    alias: '/wallet/NewWallet/CreatedKeystore/SavePrivKey',
    name: 'SavePrivKey',
    component: SavePrivKey,
  },
  {
    path: '/SavePrivKey',
    alias: '/emptyWallet/NewWallet/CreatedKeystore/SavePrivKey',
    name: 'SavePrivKey',
    component: SavePrivKey,
  },

  {
    path: '/OpenWallet',
    alias: '/emptyWallet/OpenWallet',
    name: 'OpenWallet',
    component: OpenWallet,
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
    path: '/OpenWallet/PrivateKey',
    alias: '/emptyWallet/OpenWallet/PrivateKey',
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
    path: '/OpenWallet/KeyStore',
    alias: '/emptyWallet/OpenWallet/KeyStore',
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
    path: '/VotingSupport',
    alias: '/wallet/VotingSupport',
    name: 'VotingSupport',
    component: VotingSupport,
  },
  {
    path: '/RefundVote',
    alias: '/wallet/RefundVote',
    name: 'RefundVote',
    component: RefundVote,
  },
  {
    path: '/blocks',
    name: 'blocks',
    component: blocks,
    meta: {
      keepAlive: true, // 此组件需要被缓存
    }
  },
  {
    path: "/BlocksInfo",
    alias: '/blocks/BlocksInfo',
    name: "BlocksInfo",
    component: BlocksInfo,
    meta: {
      keepAlive: true, // 此组件需要被缓存
    }
  },
  {
    path: "/TxFBlock",
    alias: '/blocks/BlocksInfo/TxFBlock',
    name: "TxFBlock",
    component: TxFBlock,
    meta: {
      keepAlive: true, // 此组件需要被缓存
    }
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
  },
  {
    path: '/error',
    name: 'error',
    component: error,
  },
  {
    path: '/useProtocol',
    alias: 'useProtocol',
    component: useProtocol,
  },
  ]
})
