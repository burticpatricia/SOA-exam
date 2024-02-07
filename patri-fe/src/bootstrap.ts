import '@/styles/index.scss'
import container from '@/util/container'
import { once } from 'lodash'
import Vue from 'vue'

Vue.config.productionTip = false

export default once(() => container(require.context('./apps', true, /\.builder\.ts$/, 'lazy-once')))
