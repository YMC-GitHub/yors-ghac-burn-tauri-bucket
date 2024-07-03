#!/usr/bin/env node

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 136:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.builtinBurnBucketOption = void 0;
exports.usage = usage;
exports.conf = conf;
exports.main = main;
function usage() {
    let res = '';
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
`;
    return res;
}
exports.builtinBurnBucketOption = {
    /* info version */
    v: false,
    version: false,
    /* info help */
    h: false,
    help: false,
    /* set the tauri app location */
    path: "target",
    /* set the output location */
    bucketLoc: "updater/{name}.json",
    /* set name prefix */
    pkgOrg: "",
    /* set url prefix */
    browserDownloadUrlPrefix: ""
};
function conf(custom, def) {
    return Object.assign(Object.assign({}, (def ? def : {})), (custom ? custom : {}));
}
// export function main(data: any, opts?: BurnBucketOptionLike): any {
//   const option : BurnBucketOption= conf(opts,builtinBurnBucketOption)
//   console.log(data,option)
// }
// let main opts-ify
function main(opts) {
    const option = conf(opts, exports.builtinBurnBucketOption);
    // console.log(option)
    // business logic here.
    return option;
}


/***/ }),

/***/ 972:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runNano = runNano;
exports.runArgv = runArgv;
const burn_bucket_utils_1 = __nccwpck_require__(574);
const burn_bucket_ncli_code_1 = __nccwpck_require__(136);
const burn_bucket_ncli_util_1 = __nccwpck_require__(637);
function runNano(inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        let flag = inputs.flags;
        const storeTree = (0, burn_bucket_utils_1.iniStoreTree)();
        const latestRelease = (0, burn_bucket_utils_1.readAssetsFromLocation)(flag.path, flag.browserDownloadUrlPrefix, flag.pkgOrg);
        // let latestRelease = await getLatestRelease();
        const promises = latestRelease.assets.map((asset) => __awaiter(this, void 0, void 0, function* () {
            let store = (0, burn_bucket_utils_1.getStore)(storeTree, asset.store_file);
            if (!store) {
                store = (0, burn_bucket_utils_1.addStore)(storeTree, asset.store_file, (0, burn_bucket_utils_1.iniStore)(asset.pkgversion, asset.note));
            }
            // windows
            yield (0, burn_bucket_utils_1.setAsset)(asset, /.msi.zip/, ['win64', 'windows-x86_64'], store);
            // darwin
            yield (0, burn_bucket_utils_1.setAsset)(asset, /.app.tar.gz/, ['darwin', 'darwin-x86_64', 'darwin-aarch64'], store);
            // linux
            yield (0, burn_bucket_utils_1.setAsset)(asset, /.AppImage.tar.gz/, ['linux', 'linux-x86_64'], store);
        }));
        yield Promise.all(promises);
        Object.keys(storeTree).map(name => {
            const loc = flag.bucketLoc.replace(/{name}/gi, name);
            (0, burn_bucket_utils_1.wirteInstallJson)(loc, (0, burn_bucket_utils_1.getStore)(storeTree, name));
        });
    });
}
function runArgv(argv_1) {
    return __awaiter(this, arguments, void 0, function* (argv, data = {}) {
        // do task here.
        let undefineds = [undefined, ''];
        let nano = (0, burn_bucket_ncli_util_1.getNanoFromArgvAndDefaultFlag)(argv, burn_bucket_ncli_code_1.builtinBurnBucketOption, undefineds);
        let flag = nano.flags;
        // console.log(`[zero] nano:`, JSON.stringify(nano))
        // hook process-help-version
        if (flag.help) {
            console.log(data.usage);
            process === null || process === void 0 ? void 0 : process.exit(0);
        }
        if (flag.version) {
            console.log(data.version || '0.1.0');
            process === null || process === void 0 ? void 0 : process.exit(0);
        }
        //...
        return runNano(nano);
    });
}


/***/ }),

/***/ 637:
/***/ ((__unused_webpack_module, exports) => {


// args-stro to args nano
// --path "tauri-app" --bucket-loc "bucket/{name}.json" --pkg-org "yors"
// --browser-download-url-prefix "https://github.com/YMC-GitHub/yowa/releases/download/v{version}"
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nanoFlagShimValueExtract = nanoFlagShimValueExtract;
exports.nanoFlagShimKeysPassed = nanoFlagShimKeysPassed;
exports.humanize = humanize;
exports.slugify = slugify;
exports.camelize = camelize;
exports.underscoped = underscoped;
exports.classify = classify;
exports.swapCase = swapCase;
exports.getFlagFromProcessEnv = getFlagFromProcessEnv;
exports.StrvParse = StrvParse;
exports.nanoargs = nanoargs;
exports.getNanoFromStra = getNanoFromStra;
exports.getStraFromStro = getStraFromStro;
exports.nanoArgvStroToStra = nanoArgvStroToStra;
exports.TrimQuotation = TrimQuotation;
exports.EndsWithQuotation = EndsWithQuotation;
exports.StartWithQuotation = StartWithQuotation;
exports.WrapedQuotation = WrapedQuotation;
exports.WrapQuotation = WrapQuotation;
exports.FindQuotationText = FindQuotationText;
exports.FindNoQuotationText = FindNoQuotationText;
exports.TrimQuotationText = TrimQuotationText;
exports.NomalizeQuotationText = NomalizeQuotationText;
exports.nanoFlagKeysCamelize = nanoFlagKeysCamelize;
exports.nanoFlagShimValueExclude = nanoFlagShimValueExclude;
exports.putFlag = putFlag;
exports.getNanoFromArgvAndDefaultFlag = getNanoFromArgvAndDefaultFlag;
// feat(core): shim - extract value of flag
/**
 * get obj val only in values  - ts extract like
 * @sample
 * ```
 * // {a:'b',c:'',d:undefined} ->  {a:'b',c:''}
 * nanoFlagShimValueExtract({a:'b',c:'',d:undefined},[''])
 * ```
 */
function nanoFlagShimValueExtract(data, values = [undefined]) {
    const res = {};
    Object.keys(data).forEach(v => {
        let val = data[v];
        if (values.includes(val)) {
            res[v] = val;
        }
    });
    return res;
}
// feat(core): shim - pick by keys
/**
 *
 * @sample
 * ```
 * import { pickbykeys as nanoflagshimpickbykeys } from "nano-flag-shim-keys-passed"
 * nanoflagshimpickbykeys(nl, custom);
 * ```
 */
function nanoFlagShimKeysPassed(keys, flag) {
    let res = {};
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        res[key] = flag[key];
    }
    return res;
}
// keys camelize
// keys underscode
// keys upper
// keys slug
/**
 *
 * @sample
 * ```
 * humanize('per_page')// Per page
 * humanize('per-page')// Per page
 * ```
 * @description
 * ```
 * ## idea
 * - [x] replace multi - or _ to one space
 * - [x] add space to the char that is uppercase and is not the first index
 * - [x] the first char to upper ,other lowercase
 * ```
 */
function humanize(s) {
    return s
        .replace(/(?:^\w|[A-Z_-]|\b\w)/g, (word, index) => {
        let res = '';
        // log(word, index); //desc: for debug
        // feat: replace multi - or _ to one space
        res = word.replace(/[-_]+/g, ' ');
        // feat: add space to the char that is uppercase and is not the first index
        res = index !== 0 ? res.replace(/[A-Z]/, ' $&') : res;
        // feat: the first char to upper ,other lowercase
        return index === 0 ? res.toUpperCase() : res.toLowerCase();
    })
        .replace(/\s+/g, ' ');
}
function slugify(s) {
    return humanize(s)
        .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toLowerCase())
        .replace(/\s+/g, '-');
}
function camelize(s) {
    return humanize(s)
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase())
        .replace(/\s+/g, '');
}
function underscoped(s) {
    return humanize(s)
        .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toLowerCase())
        .replace(/\s+/g, '_');
}
function classify(s) {
    return humanize(s)
        .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase())
        .replace(/\s+/g, '');
}
function swapCase(s) {
    return s.replace(/(?:^\w|[A-Z-a-z]|\b\w)/g, word => {
        if (/[A-Z]/.test(word)) {
            return word.toLowerCase();
        }
        return word.toUpperCase();
    });
}
// ouhv with flag
function getFlagFromProcessEnv(keys) {
    let stdkeys = keys.map(v => underscoped(v).toUpperCase()); // eg. a-b -> A_B
    // console.log(stdkeys)
    if (process === null || process === void 0 ? void 0 : process.env) {
        return nanoFlagShimKeysPassed(stdkeys, process.env);
    }
    return {};
}
/**
 * parse cli input to node.js boolean,number,null,undefined,string
 * @sample
 * ```ts
 * StrvParse('true') // true
 * StrvParse('false') // false
 * StrvParse('1') // 1
 * StrvParse('null') // null
 * StrvParse('undefined') // undefined
 * StrvParse('zero') // 'zero'
 * StrvParse('1','string') // '1'
 * StrvParse(1,'string') // '1'
 * // why use ?
 * // parse value of usage objo
 * ```
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function StrvParse(thing, type = '') {
    if (type === 'string') {
        return String(thing);
    }
    // case:  exp for true. eg: true-string or true-boolean ( or other custom exp(todo))
    // if (isOneOfThem(thing, ['true', true])) {
    //     return true
    // }
    if ([true].includes(thing) || strIsOneOfThem(thing, ['true'])) {
        return true;
    }
    // case:  exp for false.
    // if (isOneOfThem(thing, ['false', false])) {
    //     return true
    // }
    if ([false].includes(thing) || strIsOneOfThem(thing, ['false'])) {
        return false;
    }
    // case:  exp for number.
    if (Number(thing)) {
        return Number(thing);
    }
    if ([null].includes(thing) || strIsOneOfThem(thing, ['null'])) {
        return null;
    }
    if ([undefined].includes(thing) || strIsOneOfThem(thing, ['undefined'])) {
        return undefined;
    }
    // case: other string
    return String(thing);
}
function strIsOneOfThem(one, them = []) {
    // let reg = new RegExp(`^${one}$`, "i");
    // return them.some((v) => reg.test(v));
    // fix Invalid regular expression Nothing to repeat when pass 'xx**'
    return them.some(v => v.toLowerCase() == one.toLowerCase());
}
/**
 * parse cli cmd string
 * @sample
 * ```ts
 * nanoargs(process.argv)
 * nanoargs(`ns cmd -a -b -c -- -a -b -c`)
 * nanoargs(`ns subns cmd -a -b -c -- -a -b -c`)
 * nanoargs(`ns subns subcmd -a -b -c -- -a -b -c`)
 *
 * ```
 */
function nanoargs(input, util = {
    nanoFlagParse: nanoFlagParse
}) {
    // 1.
    // feat(core): arrayify input to array when it is js-string
    const stra = nanoArgvStraSimple(input);
    // 2. ini extras , args , argvs
    let extras = [];
    let args = [];
    ({ tail: extras, head: args } = nanoArgsStraDecode(stra));
    // 4. get args map and argvs from head of input
    const { argvs, argsMap } = nanoArgsHeadDecode(args);
    // 5. get flags
    const flags = nanoArgsHeadKvpDecode(argsMap);
    // console.log(flags)
    // 6. parse value in flags
    return {
        flags: util.nanoFlagParse(flags),
        argv: argvs,
        extras: extras
    };
}
// put nano util here.
function nanoArgvStraSimple(input) {
    return Array.isArray(input) ? input : input.split(/ +/);
}
/**
 *
 * @sample
 * ```ts
 * nanoValIsOneOfThem(value, [undefined, true, "", "true"])
 * nanoValIsOneOfThem(value, ["", "true"])
 * ```
 */
function nanoValIsOneOfThem(one, them, caseSensitive = false) {
    return them.some(exp => {
        // ignore case when string
        if (caseSensitive && typeof exp === 'string' && typeof one === 'string') {
            return exp.toLowerCase() == one.toLowerCase();
        }
        return exp == one;
    });
}
// nano 's util,api,shared
/**
 *
 * @sample
 * ```ts
 * nanoArgsStraDecode(process.argv)
 * nanoArgsStraDecode(arrayify(`zero -- code`)) // {head:['zero'],tail:['code']}
 * ```
 */
function nanoArgsStraDecode(handledInput) {
    let head = handledInput;
    let tail = [];
    // feat(core): support extras when '--' bind to ouput.extras
    // 1. get the first index
    const theFirstIndex = handledInput.indexOf('--');
    // 2. get extras and head when index >= 0
    if (handledInput.includes('--')) {
        tail = handledInput.slice(theFirstIndex + 1);
        head = handledInput.slice(0, theFirstIndex);
    }
    return { tail, head };
}
/**
 *
 * @sample
 * ```
 * nanoArgsHeadDecode(['code','--color=true']) //{argvs:['code'],argsMap:[['--color','true']]}
 * nanoArgsHeadDecode(['code','--color']) //{argvs:['code'],argsMap:[['--color','true']]}
 * nanoArgsHeadDecode(['code','--no-color']) //{argvs:['code'],argsMap:[['--no-color','true']]}
 * nanoArgsHeadDecode(['code','-xyz']) //{argvs:['code'],argsMap:[['x','true'],['y','true'],['z','true']]}
 * ```
 */
function nanoArgsHeadDecode(args) {
    // 4. get argv and args map from head
    const argvs = [];
    const argsMap = [];
    /* eslint-disable no-plusplus */
    for (let i = 0; i < args.length; i++) {
        const previous = args[i - 1];
        const curr = args[i];
        const next = args[i + 1];
        // eg:ymc.rc.json
        const nextIsValue = next && !/^--.+/.test(next) && !/^-.+/.test(next);
        const pushWithNext = (x) => {
            //[string,boolean]
            //[string,string]
            // argsMap.push([x, nextIsValue ? next : true])
            argsMap.push([x, nextIsValue ? next : 'true']);
        };
        // case: key val exp. eg:--conf=ymc.rc.json -f=ymc.rc.json
        if (/^--.+=/.test(curr) || /^-.=/.test(curr)) {
            //string[]
            // argsMap.push(curr.split('='))
            const [key, value] = curr.split('=');
            argsMap.push([key, value]);
        }
        else if (/^-[^-].*/.test(curr)) {
            //case: key exp . eg: -xyz
            let current = curr;
            if (current.includes('=')) {
                const index = current.indexOf('=');
                argsMap.push([
                    current.slice(index - 1, index),
                    current.slice(index + 1, index + 2)
                ]);
                current = current.slice(0, index - 1) + current.slice(index + 2);
            }
            // Push all the flags but the last (ie x and y of -xyz) with true
            const xyz = current.slice(1).split('').slice(0, -1);
            // eslint-disable no-restricted-syntax
            for (const char of xyz) {
                //[string,true]
                argsMap.push([char, 'true']);
                // argsMap.push([char, true])
            }
            // If the next string is a value, push it with the last flag
            const final = current[current.length - 1];
            pushWithNext(final);
        }
        else if (/^--.+/.test(curr) || /^-.+/.test(curr)) {
            //case: key val exp . eg: -help true, --help true, -h true
            pushWithNext(curr);
        }
        else {
            let valueTaken = argsMap.find(arg => arg[0] === previous);
            if (!valueTaken && /^-./.test(previous)) {
                const previousChar = previous[previous.length - 1];
                valueTaken = argsMap.find(arg => arg[0] === previousChar);
            }
            //case: only key or  exp . eg: a b c
            if (!valueTaken) {
                argvs.push(curr);
            }
        }
    }
    return { argvs, argsMap };
}
/**
 *
 * @sample
 * ```ts
 * nanoDecodeArgsMap([['--name','zero']]) //{name:'zero'}
 * nanoDecodeArgsMap([['--color',true]]) // {color:true}
 * nanoDecodeArgsMap([['--no-color',true]]) // {color:false}
 * nanoDecodeArgsMap([['--no-color',undefined]]) // {color:false}
 * ```
 */
function nanoArgsHeadKvpDecode(argsMap) {
    // 1. init result as NanoFlags
    const result = {};
    // 2. get flag for each item in map
    for (const item of argsMap) {
        // 2.1 get key of item and delete head - or -- of js-string key
        let key = item[0].replace(/^-{1,2}/g, '');
        // 2.2 get value of item
        let value = item[1]; //string|boolean|number|undefined
        // 2.3 set color to false  when '--no-color true' or '--no-color'
        if (key.startsWith('no-') &&
            nanoValIsOneOfThem(value, [undefined, true, '', 'true'])) {
            key = key.slice(3);
            // value = false
            value = 'false';
        }
        // 2.4 parse string value to number,boolean or string
        // result[key] = parseValue(value)
        result[key] = value;
    }
    return result;
}
/**
 *
 * @sample
 * ```ts
 * let passedflag = nanoFlagParse(flag)
 *
 * // todo:
 * // let jssvflag:NanoParsedFlags =(flag,nanoStrvParse)
 *
 * // let strvflag:NanoFlags =(flag,identy)
 * ```
 *
 */
function nanoFlagParse(flag, util = {
    nanoStrvParse: StrvParse
}) {
    const res = {};
    Object.keys(flag).forEach(key => (res[key] = util.nanoStrvParse(flag[key])));
    return res;
}
function getNanoFromStra(stra) {
    return nanoargs(stra);
}
function getStraFromStro(stro) {
    return nanoArgvStroToStra(stro);
}
// feat(core): mock process.argv
// idea(core): like using argv as func input
/**
 * argv stro to argv arro
 * @sample
 * ```ts
 * let input:string=''
 * input = `you say -hi --name 'ye mian cheng' --first-name ye --old-name "ye min cong"`
 * argv = MockProcessAgrv(input)
 * //["you","say","-hi","--name","ye mian cheng","--first-name","ye","--old-name","ye min cong"]
 * // why use ?
 * // mock process.argv
 * // like using argv as func input
 * ```
 */
function nanoArgvStroToStra(s) {
    const res = [];
    const input = s.trim();
    // code(core): no need to nomalize quotation text
    // input = NomalizeQuotationText(input)
    const list = input.split(/ /);
    let currIsItem = true;
    let cacheCurr = [];
    // /* eslint-disable no-plusplus */
    for (let i = 0; i < list.length; i++) {
        // const previous = list[i - 1]
        const curr = list[i];
        // const next = list[i + 1]
        // code(core): detect curr type
        // code(core): no to detect curr type when currIsItem false
        if (currIsItem) {
            currIsItem = StartWithQuotation(curr) ? false : true;
        }
        // case is [`"xx`,`xx"`]
        if (!currIsItem) {
            if (EndsWithQuotation(curr)) {
                // case is [`"xx"`] or [`'xx`]
                currIsItem = true;
                res.push(TrimQuotation([...cacheCurr, curr].join(' ')));
                cacheCurr = [];
            }
            else {
                // case is [`"xx`,`xx"`]
                cacheCurr.push(curr);
            }
        }
        else {
            // case is [`xx`] or [`xx`]
            res.push(TrimQuotation(curr));
        }
        // log middleware cache value
        // log(curr, currIsItem, cacheCurr)
    }
    return res;
}
/**
 * @sample
 * ```ts
 * TrimQuotation(`"ye mian cheng"`)//'ye mian cheng'
 * TrimQuotation(`'ye mian cheng'`)//'ye mian cheng'
 * ```
 */
function TrimQuotation(s) {
    return s.replace(/(^("|'))|(("|')$)/g, '');
}
/**
 * @sample
 * ```ts
 * EndsWithQuotation(`"ye min cong"`)//true
 * EndsWithQuotation(`'ye min cong'`)//true
 * EndsWithQuotation(`'ye min cong`)//false
 * EndsWithQuotation(`ye min cong`)//false
 * ```
 */
function EndsWithQuotation(s) {
    return /("|')$/.test(s);
}
/**
 * @sample
 * ```ts
 * StartWithQuotation(`"ye min cong"`)//true
 * StartWithQuotation(`'ye min cong'`)//true
 * StartWithQuotation(`'ye min cong`)//false
 * StartWithQuotation(`ye min cong`)//false
 * ```
 */
function StartWithQuotation(s) {
    return /^("|')/.test(s);
}
/**
 * is wraped with quotation or correct quotation
 * @sample
 * ```ts
 * WrapedQuotation(`"ye mian cheng"`)//true
 * WrapedQuotation(`'ye mian cheng'`)//true
 * WrapedQuotation(`ye min cong`)//false
 * WrapedQuotation(`'ye mian cheng"`)//false
 * ```
 */
function WrapedQuotation(s) {
    return /(^"[^"]*"$)|(^'[^']*'$)/.test(s);
}
/**
 * @sample
 * ```ts
 * WrapQuotation(`"ye mian cheng"`,'"')//'"ye mian cheng"'
 * WrapQuotation(`ye mian cheng`,'"')//'"ye mian cheng"'
 * ```
 */
function WrapQuotation(s, quote = '"') {
    return [quote, TrimQuotation(s), quote].join('');
}
/**
 * find text that wrap with correct quotation
 * @sample
 * ```ts
 * FindQuotationText('--name "ye mian cheng"')//['ye mian cheng']
 * // you can use it to get space item when use cli-args-like as input
 * // find , read . load or parse , which is the best name ?
 * ```
 */
function FindQuotationText(s, trimQuote = false) {
    // feat(core): def regexp to match quotes space item
    // feat(core): support quotes with double quotes
    // feat(core): support quotes with single quotes
    const reg = /("[^"]*")|('[^']*')/g;
    // feat(core): get match of  quotes space item
    const spaceItemList = s.match(reg);
    // feat(core): trim quotation when match & enable trim-quote
    return spaceItemList
        ? trimQuote
            ? spaceItemList.map(v => TrimQuotation(v))
            : spaceItemList
        : [];
}
/**
 * find text that not wrap with correct quotation
 * @sample
 * ```ts
 * FindNoQuotationText('--name "ye mian cheng"')//['--name']
 * ```
 */
function FindNoQuotationText(s) {
    const otherItem = s.trim().replace(/("[^"]*")|('[^']*')/g, '');
    return otherItem.split(/ +/).filter(v => v);
}
/**
 * trim quotation text
 * @sample
 * ```
 * let s = `-hi --name 'ye mian cheng'`
 * let input = TrimQuotationText(s.trim()) //`-hi --name ye mian cheng`
 * ```
 */
function TrimQuotationText(s) {
    let res = s;
    // feat(core): trim quotation of args-oline
    const spaceItemList = FindQuotationText(res, false);
    for (let index = 0; index < spaceItemList.length; index++) {
        const spaceItem = spaceItemList[index];
        res = res.replace(spaceItem, TrimQuotation(spaceItem));
    }
    return res;
}
/**
 * make double or single quotation text
 * @sample
 * ```
 * let s = `-hi --name 'ye mian cheng'`
 * let input = NomalizeQuotationText(s.trim()) //`-hi --name "ye mian cheng"`
 * // why use ?
 * // trim quotation of args-oline
 * ```
 */
function NomalizeQuotationText(s, quoteType = 'double-quotation') {
    let res = s;
    // feat(core): nomalize quotation of args-oline
    const spaceItemList = FindQuotationText(res, false);
    for (let index = 0; index < spaceItemList.length; index++) {
        const spaceItem = spaceItemList[index];
        res = res.replace(spaceItem, WrapQuotation(spaceItem, quoteType === 'double-quotation' ? `"` : `'`));
    }
    return res;
}
// export type NanoParsedValue = boolean | number | undefined | null | string;
// export type NanoFlagLike = Record<string, NanoParsedValue>;
function nanoFlagKeysCamelize(data = {}, opts = {}) {
    // let res = {}
    const option = Object.assign({ slim: true, noAutoCamelize: false }, opts);
    if (option.noAutoCamelize)
        return data;
    let fn = opts.camelize ? opts.camelize : camelize;
    Object.keys(data).forEach(k => {
        const ck = fn(k);
        // res[ck]=flags[k]
        if (ck !== k) {
            data[ck] = data[k];
            if (option.slim) {
                delete data[k];
            }
        }
    });
    return data;
}
// feat(core): shim - exclude value of flag
/**
 * get obj val that not in values  - ts exclude like
 * @sample
 * ```
 * // {a:'b',c:'',d:undefined} ->  {a:'b',c:''}
 * nanoFlagShimValueExclude({a:'b',c:'',d:undefined},[undefined])
 * ```
 */
function nanoFlagShimValueExclude(data, values = [undefined]) {
    const res = {};
    Object.keys(data).forEach(v => {
        let val = data[v];
        if (!values.includes(val)) {
            res[v] = val;
        }
    });
    return res;
}
function putFlag(...flags) {
    let flag = {};
    for (let index = 0; index < flags.length; index++) {
        const item = flags[index];
        flag = Object.assign(Object.assign({}, flag), item);
    }
    return flag;
}
/**
 *
 * @sample
 * ```
 * getNanoFromArgvAndDefaultFlag(argv,builtinBurnBucketOption,[undefined, ''])
 * ```
 */
function getNanoFromArgvAndDefaultFlag(argv, defaulFlag, undefinedValue = [undefined, '']) {
    // let undefinedValue = [undefined, '']
    // let defaulFlag = {}
    let flagKeys = Object.keys(defaulFlag);
    let defFlag = Object.assign({}, defaulFlag);
    // underscode -> lowercase -> camel
    // let ulc = (v:string) => camelize(v.toLowerCase());
    let envflag = nanoFlagKeysCamelize(getFlagFromProcessEnv(flagKeys), {
        camelize: v => camelize(v.toLowerCase())
    });
    // cli or api flag
    let cliNano = getNanoFromStra(argv);
    let cliFlag = nanoFlagKeysCamelize(cliNano.flags);
    // todo: get flag in position
    // ...
    // do you real need position flag ?
    //cli flag-> process.env flag -> default-flag  ->
    // let flag = {
    //   ...defFlag,
    //   ...nanoFlagShimValueExclude(envflag, undefinedvalue),
    //   ...nanoFlagShimValueExclude(cliFlag, undefinedvalue)
    // }
    let flag = putFlag(defFlag, nanoFlagShimValueExclude(envflag, undefinedValue), nanoFlagShimValueExclude(cliFlag, undefinedValue));
    cliNano.flags = flag;
    return cliNano;
}


/***/ }),

/***/ 420:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const burn_bucket_ncli_code_1 = __nccwpck_require__(136);
// import type {NanoFlags, NanoParsedFlags} from './burn-bucket-ncli-util'
const burn_bucket_ncli_core_1 = __nccwpck_require__(972);
// import type {NanoLike} from './burn-bucket-ncli-core'
const package_json_1 = __importDefault(__nccwpck_require__(598));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, burn_bucket_ncli_core_1.runArgv)(process.argv.slice(2), { usage: (0, burn_bucket_ncli_code_1.usage)(), version: package_json_1.default.version });
    });
}
run().catch(console.error);


/***/ }),

/***/ 574:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getStore = getStore;
exports.iniStore = iniStore;
exports.addStore = addStore;
exports.iniStoreTree = iniStoreTree;
exports.readAssetsFromLocation = readAssetsFromLocation;
exports.loc2asset = loc2asset;
exports.setAsset = setAsset;
exports.wirteInstallJson = wirteInstallJson;
exports.getSignatureFromUrl = getSignatureFromUrl;
exports.saveJsonFileSync = saveJsonFileSync;
exports.saveTextFileSync = saveTextFileSync;
exports.readTextFileSync = readTextFileSync;
exports.makeDirs = makeDirs;
exports.nanoPathJoin = nanoPathJoin;
exports.readFileList = readFileList;
const fs_1 = __nccwpck_require__(147);
const path_1 = __nccwpck_require__(17);
function getStore(tree, name) {
    const store = tree[name];
    return store;
}
function iniStore(version = '', note = '') {
    return {
        version: version,
        notes: note,
        pub_date: new Date().toISOString(),
        platforms: {
            win64: { signature: '', url: '' }, // compatible with older formats
            linux: { signature: '', url: '' }, // compatible with older formats
            darwin: { signature: '', url: '' }, // compatible with older formats
            'darwin-aarch64': { signature: '', url: '' },
            'darwin-x86_64': { signature: '', url: '' },
            'linux-x86_64': { signature: '', url: '' },
            'windows-x86_64': { signature: '', url: '' }
            // 'windows-i686': { signature: '', url: '' }, // no supported
        }
    };
}
function addStore(tree, name, val) {
    if (!tree[name]) {
        tree[name] = val;
    }
    return tree[name];
}
function iniStoreTree() {
    return {};
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
function readAssetsFromLocation(dir = `target`, preifx = '', pkgOrg = '') {
    const latestRelease = {
        assets: []
    };
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
    const list = readFileList(dir).filter(v => /.sig$/.test(v));
    latestRelease.assets = list.map(v => loc2asset(v, preifx, pkgOrg));
    // console.log(latestRelease.assets);
    return latestRelease;
}
function loc2asset(s, base = '', org = '') {
    const items = s.split('/');
    const name = items[items.length - 1];
    const zipname = name.replace(/.sig$/, '');
    const [pkgname, pkgversion] = zipname.split('_');
    // base from tpl to txt
    const basetext = base
        .replace(/{version}/gi, pkgversion)
        .replace(/{name}/gi, pkgname);
    const signature = readTextFileSync(s, '');
    return {
        name,
        file: s,
        signature,
        browser_download_url: [basetext, zipname].filter(v => v).join('/'),
        store_file: [org, pkgname].filter(v => v).join('.'),
        pkgname,
        pkgversion
    };
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
function setAsset(asset, reg, platforms, store) {
    return __awaiter(this, void 0, void 0, function* () {
        let sig = '';
        if (/.sig$/.test(asset.name)) {
            if (asset.signature) {
                sig = asset.signature;
            }
            else {
                sig = yield getSignatureFromUrl(asset.browser_download_url);
            }
        }
        platforms.forEach(platform => {
            if (reg.test(asset.name)) {
                // platform signature
                if (sig) {
                    store.platforms[platform].signature = sig;
                    // return;
                }
                // platform url
                store.platforms[platform].url = asset.browser_download_url;
            }
        });
    });
}
/**
 *
 * @sample
 * ```
 *  wirteInstallJson("./updater/install.json",updateData)
 * ```
 */
function wirteInstallJson(loc, data) {
    saveJsonFileSync(loc, data);
    console.log(`Generate ${loc}`);
}
// get the signature file content
/**
 *
 * @sample
 * ```
 * await getSignatureFromUrl(asset.browser_download_url)
 * ```
 */
function getSignatureFromUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/octet-stream' }
            });
            return response.text();
        }
        catch (_) {
            return '';
        }
    });
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
function saveJsonFileSync(loc, data) {
    // feat(core): parse js object to json-format string
    const text = typeof data !== 'string' ? JSON.stringify(data, null, 2) : data;
    saveTextFileSync(loc, text);
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
function saveTextFileSync(loc, text = '') {
    makeDirs(loc);
    // log(`[info] out: ${loc}`);
    (0, fs_1.writeFileSync)(loc, text);
}
function readTextFileSync(loc, defaultText = '') {
    // feat(core): return default text when location not exits
    // feat(core): return default text when reading location but error
    let text = defaultText;
    if (!(0, fs_1.existsSync)(loc))
        return text;
    try {
        // why try catch ? when location is binary file may be fail.
        text = (0, fs_1.readFileSync)(loc).toString();
    }
    catch (error) {
        text = defaultText;
    }
    return text;
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
function makeDirs(loc) {
    const dir = (0, path_1.dirname)((0, path_1.resolve)(loc));
    if (!(0, fs_1.existsSync)(dir))
        (0, fs_1.mkdirSync)(dir, { recursive: true });
}
/**
 *
 * @sample
 * ```ts
 * nanoPathJoin('./packages/jcm','lib') // './packages/jcm/lib'
 * //  ignore-empty -> join slash & like slash  ->  multi-slash-to-one
 * ```
 */
function nanoPathJoin(...pathLike) {
    // join
    return pathLike
        .filter(v => v.trim())
        .join('/')
        .replace(/\\/, '/');
}
/**
 * get all files in dir
 * @sample
 * ```ts
 *
 * ```
 */
function readFileList(dirPath) {
    const list = (0, fs_1.readdirSync)(dirPath);
    const resx = [];
    for (let index = 0; index < list.length; index++) {
        const name = list[index];
        const locx = nanoPathJoin(dirPath, name);
        if ((0, fs_1.statSync)(locx).isDirectory()) {
            let subdir = readFileList(locx);
            subdir = subdir.filter(f => (0, fs_1.statSync)(f).isFile());
            resx.push(...subdir);
            // console.log(locx, resx, subdir);
        }
        else {
            resx.push(locx);
        }
    }
    return resx;
}


/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 598:
/***/ ((module) => {

module.exports = JSON.parse('{"name":"yors-ghac-burn-tauri-bucket","version":"0.1.1","description":"a github action to burn tauri bucket mono repo","keywords":["artist","yors-ghac-burn-tauri-bucket","mono"],"author":"yemiancheng <ymc.github@gmail.com>","license":"MIT","private":false,"main":"dist/index.js","scripts":{"build":"tsc","release":"ncc build src/burn-bucket.ts && git add -f dist/","release-ncli":"ncc build src/burn-bucket-ncli.ts -o ncli","check-all":"concurrently \\"npm:format-check\\" \\"npm:lint\\" \\"npm:build\\"","format":"prettier --write **/*.ts","format-check":"prettier --check **/*.ts","lint":"eslint **/*.ts","lint-fix":"eslint **/*.ts --fix"},"repository":{"type":"git","url":"git+https://github.com/ymc-github/yors-ghac-burn-tauri-bucket.git"},"bugs":{"url":"git+https://github.com/ymc-github/yors-ghac-burn-tauri-bucket/issues"},"homepage":"https://github.com/ymc-github/yors-ghac-burn-tauri-bucket/blob/main/#readme","devDependencies":{"@types/node":"^12.12.6","@typescript-eslint/eslint-plugin":"^6.14.0","@vercel/ncc":"^0.33.4","concurrently":"^5.2.0","eslint":"^8.55.0","eslint-plugin-github":"^4.10.1","eslint-plugin-prettier":"^5.0.1","prettier":"^3.1.1","typescript":"^5.3.3"},"dependencies":{"@actions/artifact":"^2.1.6","@actions/core":"^1.10.1","@actions/github":"^5.1.1","minimatch":"^9.0.3"},"bin":{"burn-bucket":"ncli/index.js"},"files":["dist","ncli","action.yaml"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(420);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;