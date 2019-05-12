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
import error from '@/views/error/error';
import useProtocol from '@/views/useProtocol/useProtocol';
import TxFBlock from '@/components/details/TxFBlock';

Vue.use(Router)

export default new Router({
  // mode: 'history', 解开后刷新有问题
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
    component: resolve => require(['@/views/wallet/index'],resolve),
  },
  {
    path: '/NewWallet',
    alias: '/wallet/NewWallet',
    name: 'NewWallet',
    component: resolve => require(['@/views/wallet/wallet/NewWallet'],resolve),
  },


  {
    path: '/CreatedKeystore',
    alias: '/wallet/NewWallet/CreatedKeystore',
    name: 'CreatedKeystore',
    component: resolve => require(['@/views/wallet/wallet/CreatedKeystore'],resolve),
  },

  {
    path: '/SavePrivKey',
    alias: '/wallet/NewWallet/CreatedKeystore/SavePrivKey',
    name: 'SavePrivKey',
    component: resolve => require(['@/views/wallet/wallet/SavePrivKey'],resolve),
  },
  {
    path: '/OpenWallet',
    alias: '/wallet/OpenWallet',
    name: 'OpenWallet',
    component: resolve => require(['@/views/wallet/wallet/OpenWallet'],resolve),
  },

  {
    path: '/OpenWallet/PrivateKey',
    alias: '/wallet/OpenWallet/PrivateKey',
    name: 'PrivateKey',
    component: resolve => require(['@/views/wallet/wallet/PrivateKey'],resolve),
  },

  {
    path: '/OpenWallet/KeyStore',
    alias: '/wallet/OpenWallet/KeyStore',
    name: 'KeyStore',
    component: resolve => require(['@/views/wallet/wallet/KeyStore'],resolve),
  },

  {
    path: '/Transfer',
    alias: '/wallet/Transfer',
    name: 'Transfer',
    component: resolve => require(['@/views/wallet/wallet/Transfer'],resolve),
  },
  {
    path: '/VotingSupport',
    alias: '/wallet/VotingSupport',
    name: 'VotingSupport',
    component: resolve => require(['@/views/wallet/wallet/VotingSupport'],resolve),
  },
  {
    path: '/RefundVote',
    alias: '/wallet/RefundVote',
    name: 'RefundVote',
    component: resolve => require(['@/views/wallet/wallet/RefundVote'],resolve),
  },
  {
    path: '/blocks',
    name: 'blocks',
    component: resolve => require(['@/views/blocks/index'],resolve),
  },
  {
    path: "/BlocksInfo",
    alias: '/blocks/BlocksInfo',
    name: "BlocksInfo",
    component: resolve => require(['@/components/details/BlocksInfo'],resolve),
  },
  {
    path: "/TxFBlock",
    alias: '/blocks/BlocksInfo/TxFBlock',
    name: "TxFBlock",
    component: resolve => require(['@/components/details/TxFBlock'],resolve),
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: resolve => require(['@/views/transactions/index'],resolve),
  },
  {
    path: "/TransactionsInfo",
    alias: '/transactions/TransactionsInfo',
    name: "TransactionsInfo",
    component: resolve => require(['@/components/details/TransactionsInfo'],resolve),
  },
  {
    path: "/TransactionsInfo/AccountInfo",
    alias: '/transactions/TransactionsInfo/AccountInfo',
    name: "AccountInfo",
    component: resolve => require(['@/components/details/AccountInfo'],resolve),
  },
  {
    path: '/producer',
    name: 'producer',
    component: resolve => require(['@/views/producer/index'],resolve),
  },
  {
    path: "/ProducerInfo",
    alias: '/producer/ProducerInfo',
    name: "ProducerInfo",
    component: resolve => require(['@/components/details/ProducerInfo'],resolve),
  },
  {
    path: '/error',
    name: 'error',
    component: resolve => require(['@/views/error/error'],resolve),
  },
  {
    path: '/useProtocol',
    alias: 'useProtocol',
    component: resolve => require(['@/views/useProtocol/useProtocol'],resolve),
  },
  ]
})
