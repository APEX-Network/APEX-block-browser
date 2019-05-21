import Vue from 'vue'
import Router from 'vue-router'
const home = () => import('@/views/home/index');
const wallet = () => import('@/views/wallet/index');
const blocks = () => import('@/views/blocks/index');
const transactions = () => import('@/views/transactions/index');
const producer = () => import('@/views/producer/index');
const BlocksInfo = () => import('@/components/details/BlocksInfo');
const TransactionsInfo = () => import('@/components/details/TransactionsInfo');
const AccountInfo = () => import('@/components/details/AccountInfo');
const ProducerInfo = () => import('@/components/details/ProducerInfo');
const NewWallet = () => import('@/views/wallet/wallet/NewWallet');
const OpenWallet = () => import('@/views/wallet/wallet/OpenWallet');
const PrivateKey = () => import('@/views/wallet/wallet/PrivateKey');
const KeyStore = () => import('@/views/wallet/wallet/KeyStore')
const CreatedKeystore = () => import('@/views/wallet/wallet/CreatedKeystore');
const SavePrivKey = () => import('@/views/wallet/wallet/SavePrivKey');
const Transfer = () => import('@/views/wallet/wallet/Transfer');
const VotingSupport = () => import('@/views/wallet/wallet/VotingSupport');
const RefundVote = () => import('@/views/wallet/wallet/RefundVote');
const error = () => import('@/views/error/error');
const useProtocol = () => import('@/views/useProtocol/useProtocol');
const TxFBlock = () => import('@/components/details/TxFBlock');

Vue.use(Router)

export default new Router({
  // mode: 'history', 解开后刷新有问题
  routes: [{
      path: '/',
      name: 'default',
      component: home,
      redirect: '/home',
      children: [{
        path: "/home",
        name: "Home",
        component: home,
      }]
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
      path: '/blocks',
      name: 'blocks',
      component:blocks,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component:transactions,
    },
    {
      path: '/producer',
      name: 'producer',
      component: producer,
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
      path: '/SavePrivKey',
      alias: '/wallet/NewWallet/CreatedKeystore/SavePrivKey',
      name: 'SavePrivKey',
      component: SavePrivKey,
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
      path: "/BlocksInfo",
      alias: '/blocks/BlocksInfo',
      name: "BlocksInfo",
      component: BlocksInfo,
    },
    {
      path: "/TxFBlock",
      alias: '/blocks/BlocksInfo/TxFBlock',
      name: "TxFBlock",
      component: TxFBlock,
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
