import {usage} from './burn-bucket-ncli-code'
// import type {NanoFlags, NanoParsedFlags} from './burn-bucket-ncli-util'
import {runArgv} from './burn-bucket-ncli-core'
// import type {NanoLike} from './burn-bucket-ncli-core'
import pkg from '../package.json'

async function run() {
  return runArgv(process.argv.slice(2), {usage: usage(), version: pkg.version})
}

run().catch(console.error)
