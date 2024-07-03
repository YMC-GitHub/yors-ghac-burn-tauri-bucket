
export function usage() {
    let res: string = ''
    res = `
usage:
<ns> [option]

demo:
burn-bucket --path target --bucket-loc bucket/usage.json --browser-download-url-prefix yours/url

method:
delete,put,get

option:
-v,--version boolean                      info version (default:false)
-h,--help boolean                         info help (default:false)
                                          
--path string                             set the tauri app location (default:target)
--bucket-loc string                       set the output location (default:updater/usage.json) 
--pkg-org string                          set name prefix (default:) 
--browser-download-url-prefix string      set url prefix (default:)
`
    return res
}

export interface BurnBucketOption {
  /* info version */
  v:boolean;
  version:boolean;
  /* info help */
  h:boolean;
  help:boolean;
  /* set the tauri app location */
  path:string;
  /* set the output location */
  bucketLoc:string;
  /* set name prefix */
  pkgOrg:string;
  /* set url prefix */
  browserDownloadUrlPrefix:string;
}
export type BurnBucketOptionLike = Partial<BurnBucketOption>;
export const builtinBurnBucketOption: BurnBucketOption = {
  /* info version */
  v:false,  
  version:false,
  /* info help */
  h:false,  
  help:false,
  /* set the tauri app location */
  path:"target",
  /* set the output location */
  bucketLoc:"updater/{name}.json",
  /* set name prefix */
  pkgOrg:"",
  /* set url prefix */
  browserDownloadUrlPrefix:""
}

export function conf(custom?: object, def?: object): any {
    return { ...(def ? def : {}), ...(custom ? custom : {}) };
}

// export function main(data: any, opts?: BurnBucketOptionLike): any {
//   const option : BurnBucketOption= conf(opts,builtinBurnBucketOption)
//   console.log(data,option)
// }


// let main opts-ify
export function main(opts?: BurnBucketOptionLike): any {
  const option : BurnBucketOption= conf(opts,builtinBurnBucketOption)
  // console.log(option)
  // business logic here.
  return option
}
