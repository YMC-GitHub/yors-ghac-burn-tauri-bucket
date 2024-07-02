import {builtinBurnBucketOption, usage} from './burn-bucket-ncli-code'
import {
  getFlagFromProcessEnv,
  nanoFlagKeysCamelize,
  getNanoFromStra,
  nanoFlagShimValueExclude
} from './burn-bucket-ncli-util'

import type {NanoFlags, NanoParsedFlags} from './burn-bucket-ncli-util'
import {runNano} from './burn-bucket-ncli-core'
import type {NanoLike} from './burn-bucket-ncli-core'
import pkg from '../package.json'

function putFlag<T>(...flags: object[]) {
  let flag: object = {}
  for (let index = 0; index < flags.length; index++) {
    const item = flags[index]
    flag = {
      ...flag,
      ...item
    }
  }
  return flag as unknown as T
}

async function runArgv(argv: string[]) {
  // do task here.
  let undefinedvalue = [undefined, '']
  let flagKeys = Object.keys(builtinBurnBucketOption)
  let defFlag = {...builtinBurnBucketOption}
  let envflag = nanoFlagKeysCamelize(getFlagFromProcessEnv(flagKeys))
  // cli or api flag
  let cliNano = getNanoFromStra(argv)
  let cliFlag = nanoFlagKeysCamelize(cliNano.flags)
  // todo: get flag in position
  // ...
  // do you real need position flag ?

  //cli flag-> process.env flag -> default-flag  ->
  // let flag = {
  //   ...defFlag,
  //   ...nanoFlagShimValueExclude(envflag, undefinedvalue),
  //   ...nanoFlagShimValueExclude(cliFlag, undefinedvalue)
  // }
  let flag = putFlag<NanoFlags | NanoParsedFlags>(
    defFlag,
    nanoFlagShimValueExclude(envflag, undefinedvalue),
    nanoFlagShimValueExclude(cliFlag, undefinedvalue)
  )
  cliNano.flags = flag

  // hook process-help-version
  if (flag.help) {
    console.log(usage())
    process.exit(0)
  }
  if (flag.version) {
    console.log(pkg.version || '0.1.0')
    process.exit(0)
  }

  //...
  return runNano(cliNano as unknown as NanoLike)
}

async function run() {
  return runArgv(process.argv.slice(2))
}

run().catch(console.error)
