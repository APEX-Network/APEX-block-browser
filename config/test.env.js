'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  ADMIN_SERVER: '"/api"',
})

const adminServer = axios.create({
  baseURL: process.env.ADMIN_SERVER,
 });