import {
  readAssetsFromLocation,
  getStore,
  addStore,
  iniStore,
  iniStoreTree,
  setAsset,
  wirteInstallJson
  // nanoPathJoin
} from './burn-bucket-utils'
import {BurnBucketOption} from './burn-bucket-ncli-code'

export interface NanoLike {
  flags: BurnBucketOption
  argv: string[]
  extras: string[]
}
export async function runNano(inputs: NanoLike) {
  let flag = inputs.flags
  const storeTree = iniStoreTree()
  const latestRelease = readAssetsFromLocation(
    flag.path,
    flag.browserDownloadUrlPrefix,
    flag.pkgOrg
  )
  // let latestRelease = await getLatestRelease();
  const promises = latestRelease.assets.map(async asset => {
    let store = getStore(storeTree, asset.store_file)
    if (!store) {
      store = addStore(
        storeTree,
        asset.store_file,
        iniStore(asset.pkgversion, asset.note)
      )
    }

    // windows
    await setAsset(asset, /.msi.zip/, ['win64', 'windows-x86_64'], store)
    // darwin
    await setAsset(
      asset,
      /.app.tar.gz/,
      ['darwin', 'darwin-x86_64', 'darwin-aarch64'],
      store
    )
    // linux
    await setAsset(asset, /.AppImage.tar.gz/, ['linux', 'linux-x86_64'], store)
  })
  await Promise.all(promises)

  Object.keys(storeTree).map(name => {
    const loc = flag.bucketLoc.replace(/{name}/gi, name)
    wirteInstallJson(loc, getStore(storeTree, name))
  })
}
