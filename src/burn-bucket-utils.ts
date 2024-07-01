import {
  writeFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  readFileSync
} from 'fs'
import {dirname, resolve} from 'path'

export type Signdata = Record<string, string>
export type Platforms = Record<string, Signdata>
export type Asset = Record<string, string>

export interface Store {
  version: string
  notes: string
  pub_date: string
  platforms: Platforms
}
export interface Realease {
  assets: Asset[]
}

export function getStore(tree: Record<string, Store>, name: string) {
  const store = tree[name]
  return store
}
export function iniStore(version: string = '', note: string = '') {
  return {
    version: version,
    notes: note,
    pub_date: new Date().toISOString(),
    platforms: {
      win64: {signature: '', url: ''}, // compatible with older formats
      linux: {signature: '', url: ''}, // compatible with older formats
      darwin: {signature: '', url: ''}, // compatible with older formats
      'darwin-aarch64': {signature: '', url: ''},
      'darwin-x86_64': {signature: '', url: ''},
      'linux-x86_64': {signature: '', url: ''},
      'windows-x86_64': {signature: '', url: ''}
      // 'windows-i686': { signature: '', url: '' }, // no supported
    }
  } as Store
}
export function addStore(
  tree: Record<string, Store>,
  name: string,
  val: Store
) {
  if (!tree[name]) {
    tree[name] = val
  }
  return tree[name]
}
export function iniStoreTree() {
  return {} as Record<string, Store>
}

// import { getOctokit, context } from '@actions/github';
// async function getLatestRelease(){
//   const token = process.env.GITHUB_TOKEN;

//   if (!token) {
//     console.log('GITHUB_TOKEN is required');
//     process.exit(1);
//   }

//   const options = { owner: context.repo.owner, repo: context.repo.repo };
//   const github = getOctokit(token);

//   const { data: tags } = await github.rest.repos.listTags({
//     ...options,
//     per_page: 10,
//     page: 1,
//   });

//   const tag = tags.find((t) => t.name.startsWith('v'));
//   // console.log(`${JSON.stringify(tag, null, 2)}`);

//   if (!tag) return;

//   const { data: latestRelease } = await github.rest.repos.getReleaseByTag({
//     ...options,
//     tag: tag.name,
//   });
//   return latestRelease
// }

export function readAssetsFromLocation(
  dir: string = `target`,
  preifx: string = '',
  pkgOrg: string = ''
) {
  const latestRelease: Realease = {
    assets: []
  }

  // let msi = readFileList(`target/release/bundle/msi`).filter((v) =>
  //   /.sig$/.test(v)
  // );
  // let nsis = readFileList(`target/release/bundle/nsis`).filter((v) =>
  //   /.sig$/.test(v)
  // );
  // let aarch64macos = readFileList(
  //   `target/aarch64-apple-darwin/release/bundle/macos`
  // ).filter((v) => /.sig$/.test(v));
  // let x64macos = readFileList(
  //   `target/x86_64-apple-darwin/release/bundle/macos`
  // ).filter((v) => /.sig$/.test(v));
  // target/x86_64-apple-darwin/release/bundle/macos/wall.app.tar.gz.sig
  // target/aarch64-apple-darwin/release/bundle/macos/wall.app.tar.gz.sig

  // let list = [...msi, ...nsis, ...aarch64macos, ...x64macos];

  const list = readFileList(dir).filter(v => /.sig$/.test(v))
  latestRelease.assets = list.map(v => loc2asset(v, preifx, pkgOrg))
  // console.log(latestRelease.assets);
  return latestRelease
}

export function loc2asset(s: string, base: string = '', org: string = '') {
  const items = s.split('/')
  const name = items[items.length - 1]
  const zipname = name.replace(/.sig$/, '')

  const [pkgname, pkgversion] = zipname.split('_')
  // base from tpl to txt
  const basetext = base
    .replace(/{version}/gi, pkgversion)
    .replace(/{name}/gi, pkgname)

  const signature = readTextFileSync(s, '')
  return {
    name,
    file: s,
    signature,
    browser_download_url: [basetext, zipname].filter(v => v).join('/'),
    store_file: [org, pkgname].filter(v => v).join('.'),
    pkgname,
    pkgversion
  }
}

/**
 *
 * @sample
 * ```
 * await setAsset(asset, /.msi.zip/, ["win64", "windows-x86_64"], store); ll window
 * await setAsset(asset,/.app.tar.gz/,["darwin", "darwin-x86_64", "darwin-aarch64"],store); // macos
 * await setAsset(asset, /.AppImage.tar.gz/, ["linux", "linux-x86_64"], store); //linux
 * ```
 */
export async function setAsset(
  asset: Asset,
  reg: RegExp,
  platforms: string[],
  store: Store
) {
  let sig = ''
  if (/.sig$/.test(asset.name)) {
    if (asset.signature) {
      sig = asset.signature
    } else {
      sig = await getSignatureFromUrl(asset.browser_download_url)
    }
  }
  platforms.forEach(platform => {
    if (reg.test(asset.name)) {
      // platform signature
      if (sig) {
        store.platforms[platform].signature = sig
        // return;
      }
      // platform url
      store.platforms[platform].url = asset.browser_download_url
    }
  })
}

/**
 *
 * @sample
 * ```
 *  wirteInstallJson("./updater/install.json",updateData)
 * ```
 */
export function wirteInstallJson(loc: string, data: string | object) {
  saveJsonFileSync(loc, data)
  console.log(`Generate ${loc}`)
}

// get the signature file content
/**
 *
 * @sample
 * ```
 * await getSignatureFromUrl(asset.browser_download_url)
 * ```
 */
export async function getSignatureFromUrl(url: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/octet-stream'}
    })
    return response.text()
  } catch (_) {
    return ''
  }
}

/**
 *
 * @sample
 * ```
 * readJsonFileSync('./package.json','{}')
 *
 * readJsonFileSync('./package.json',{})
 * ```
 */
export function saveJsonFileSync(loc: string, data: string | object) {
  // feat(core): parse js object to json-format string
  const text: string =
    typeof data !== 'string' ? JSON.stringify(data, null, 2) : data
  saveTextFileSync(loc, text)
}

// a library package  to save text sync in js
// recommended-lib-name:touch-util,nanz-save-text-sync
// nanz is renameing o to z of nano
/**
 *
 * @sample
 * ```ts
 * saveTextFileSync(`README.md`,'# yours\na mono repo for yours usercase')
 * ```
 */
export function saveTextFileSync(loc: string, text = '') {
  makeDirs(loc)
  // log(`[info] out: ${loc}`);
  writeFileSync(loc, text)
}

export function readTextFileSync(loc: string, defaultText = '') {
  // feat(core): return default text when location not exits
  // feat(core): return default text when reading location but error
  let text = defaultText
  if (!existsSync(loc)) return text
  try {
    // why try catch ? when location is binary file may be fail.
    text = readFileSync(loc).toString()
  } catch (error) {
    text = defaultText
  }
  return text
}

// a library package  to make dirs in js
// recommended-lib-name:save-text-util,nanz-make-dirs

/**
 *
 * @sample
 * ```ts
 * makeDirs(`docs`)
 *
 * makeDirs(`packages/noop`)
 * ```
 */
export function makeDirs(loc: string) {
  const dir = dirname(resolve(loc))
  if (!existsSync(dir)) mkdirSync(dir, {recursive: true})
}

/**
 *
 * @sample
 * ```ts
 * nanoPathJoin('./packages/jcm','lib') // './packages/jcm/lib'
 * //  ignore-empty -> join slash & like slash  ->  multi-slash-to-one
 * ```
 */
export function nanoPathJoin(...pathLike: string[]) {
  // join
  return pathLike
    .filter(v => v.trim())
    .join('/')
    .replace(/\\/, '/')
}

/**
 * get all files in dir
 * @sample
 * ```ts
 *
 * ```
 */
export function readFileList(dirPath: string) {
  const list = readdirSync(dirPath)
  const resx: string[] = []
  for (let index = 0; index < list.length; index++) {
    const name = list[index]
    const locx = nanoPathJoin(dirPath, name)
    if (statSync(locx).isDirectory()) {
      let subdir = readFileList(locx)
      subdir = subdir.filter(f => statSync(f).isFile())
      resx.push(...subdir)
      // console.log(locx, resx, subdir);
    } else {
      resx.push(locx)
    }
  }
  return resx
}
