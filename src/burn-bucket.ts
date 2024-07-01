import {
  readAssetsFromLocation,
  getStore,
  addStore,
  iniStore,
  iniStoreTree,
  setAsset,
  wirteInstallJson,
  nanoPathJoin
} from './burn-bucket-utils'

import * as core from '@actions/core'
import {homedir} from 'os'
import {Inputs} from './burn-bucket-constant'

async function run() {
  // get input from workflow with.xx
  const inputs = {
    // name: core.getInput(Inputs.Name, {required: false}),
    // path: core.getInput(Inputs.Path, {required: false})
    // token: core.getInput(Inputs.GitHubToken, {required: false}),
    // repository: core.getInput(Inputs.Repository, {required: false}),
    // runID: parseInt(core.getInput(Inputs.RunID, {required: false})),
    // pattern: core.getInput(Inputs.Pattern, {required: false}),
    // mergeMultiple: core.getBooleanInput(Inputs.MergeMultiple, {required: false}),

    path: core.getInput(Inputs.Path, {required: false}),
    browserDownloadUrlPrefix: core.getInput(Inputs.BrowserDownloadUrlPrefix, {
      required: false
    }),
    pkgOrg: core.getInput(Inputs.PkgOrg, {
      required: false
    }),
    bucketLoc: core.getInput(Inputs.BucketLoc, {
      required: false
    })
  }

  // get input from process.env.xx
  if (!inputs.path) {
    inputs.path = process.env['GITHUB_WORKSPACE'] || process.cwd()
  }

  if (inputs.path.startsWith(`~`)) {
    inputs.path = inputs.path.replace('~', homedir())
  }
  inputs.path = nanoPathJoin(inputs.path)

  inputs.pkgOrg = inputs.pkgOrg || process.env.PKG_ORG || ''

  inputs.browserDownloadUrlPrefix =
    inputs.browserDownloadUrlPrefix ||
    process.env.BROWSER_DOWNLOAD_URL_PREFIX ||
    ''

  inputs.bucketLoc =
    inputs.bucketLoc || process.env.BUCKET_LOC || 'updater/{name}.json'

  const storeTree = iniStoreTree()
  const latestRelease = readAssetsFromLocation(
    inputs.path,
    inputs.browserDownloadUrlPrefix,
    inputs.pkgOrg
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
    const loc = inputs.bucketLoc.replace(/{name}/gi, name)
    wirteInstallJson(loc, getStore(storeTree, name))
  })
}

run().catch(console.error)
