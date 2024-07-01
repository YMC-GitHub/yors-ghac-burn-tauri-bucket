import {builtinBurnBucketOption} from './burn-bucket-ncli-code'
import {
  getFlagFromProcessEnv,
  nanoFlagKeysCamelize,
  getNanoFromStra,
  nanoFlagShimValueExclude
} from './burn-bucket-ncli-util'

async function run() {
  // do task here.
  let undefinedvalue = [undefined, '']
  let flagKeys = Object.keys(builtinBurnBucketOption)
  let defFlag = {...builtinBurnBucketOption}
  let envflag = nanoFlagKeysCamelize(getFlagFromProcessEnv(flagKeys))
  // cli or api flag
  let cliNano = getNanoFromStra(process.argv.slice(2))
  let cliFlag = nanoFlagKeysCamelize(cliNano.flags)
  // todo: get flag in position

  let flag = {
    ...defFlag,
    ...nanoFlagShimValueExclude(envflag, undefinedvalue),
    ...nanoFlagShimValueExclude(cliFlag, undefinedvalue)
  }

  cliNano.flags = flag

  //...
}
run().catch(console.error)
