
<div align="center">
  <h1>burn-tauri-bucket</h1>
  <p>
    <strong>🤖 a github action to burn tauri bucket for mono repo.</strong>
  </p>

  [![NPM Version](https://img.shields.io/npm/v/yors-ghac-burn-tauri-bucket)](https://www.npmjs.com/package/yors-ghac-burn-tauri-bucket)![NPM License](https://img.shields.io/npm/l/yors-ghac-burn-tauri-bucket)
</div>

## Demo
- with this workdow:
```yml
name: download-tauri-app-from-run-id

on:
  push:
    branches:
      - main # let it able to dispatch when push on dev
    paths:
      - ".github/workflows/download-tauri-app-from-run-id.yml"
permissions: write-all

env:
  APP_NAME: yowa
  TAURI_VERSION: v1

jobs:
  build-bucket:
    runs-on: ubuntu-20.04
    steps:
      # - name: Download All Artifacts
      #   uses: actions/download-artifact@v4
      #   with:
      #     path: tauri-app # save to path
      #     pattern: tauri-app* # down load artifacts match pattern name
      #     merge-multiple: false #  extracted into individual named directories within the specified path
      #     run-id: 9744112537
      #     github-token: ${{ secrets.GITHUB_TOKEN }} # for different repo or workflow
      #     repository: ymc-github/yowa

      - name: mock tauri artifacts
        shell: bash
        run: |
          mkdir -p tauri-app/{msi,nsis}
          touch tauri-app/msi/wall_0.1.0_x64_en-US.msi.zip
          touch tauri-app/msi/wall_0.1.0_x64_en-US.msi.zip.sig
          echo "the content of a sig" > tauri-app/msi/wall_0.1.0_x64_en-US.msi.zip.sig


          touch tauri-app/nsis/wall_0.1.0_x64-setup.nsis.zip
          touch tauri-app/nsis/wall_0.1.0_x64-setup.nsis.zip.sig
          echo "the content of b sig" > tauri-app/nsis/wall_0.1.0_x64-setup.nsis.zip.sig

          touch tauri-app/msi/main_0.1.0_x64_en-US.msi.zip
          touch tauri-app/msi/main_0.1.0_x64_en-US.msi.zip.sig
          echo "the content of c sig" > tauri-app/msi/main_0.1.0_x64_en-US.msi.zip.sig

          touch tauri-app/nsis/main_0.1.0_x64-setup.nsis.zip
          touch tauri-app/nsis/main_0.1.0_x64-setup.nsis.zip.sig
          echo "the content of d sig" > tauri-app/nsis/main_0.1.0_x64-setup.nsis.zip.sig

      - name: list tauri app artifacts
        shell: bash
        run: |
          ls -R tauri-app

      - name: cook tauri bucket
        uses: ymc-github/yors-ghac-burn-tauri-bucket@v0.1.1
        with:
          path: tauri-app
          bucket-loc: "bucket/{name}.json"
          pkg-org: yors
          browser-download-url-prefix: "https://github.com/YMC-GitHub/yowa/releases/download/v{version}"

      - name: list tauri bucket
        shell: bash
        run: |
          ls -R bucket
          cat bucket/yors.wall.json
          cat bucket/yors.main.json

      - name: push tauri apps to some repo's release page (todo)
        shell: bash
        run: |
          echo "todo"

      - name: commit and push tauri bucket to some repo (todo)
        shell: bash
        run: |
          echo "todo"


```
- here will output bucket files: bucket/yors.main.json,bucket/yors.wall.json

- the bucket like (yors.wall.json):
```json
{
  "version": "0.1.0",
  "notes": "",
  "pub_date": "2024-07-01T13:10:15.076Z",
  "platforms": {
    "win64": {
      "signature": "the content of a sig\n",
      "url": "https://github.com/YMC-GitHub/yowa/releases/download/v0.1.0/wall_0.1.0_x64_en-US.msi.zip"
    },
    "linux": {
      "signature": "",
      "url": ""
    },
    "darwin": {
      "signature": "",
      "url": ""
    },
    "darwin-aarch64": {
      "signature": "",
      "url": ""
    },
    "darwin-x86_64": {
      "signature": "",
      "url": ""
    },
    "linux-x86_64": {
      "signature": "",
      "url": ""
    },
    "windows-x86_64": {
      "signature": "the content of a sig\n",
      "url": "https://github.com/YMC-GitHub/yowa/releases/download/v0.1.0/wall_0.1.0_x64_en-US.msi.zip"
    }
  }
}
```

## cli 
```bash
npm i -g yors-ghac-burn-tauri-bucket
# burn-bucket --help
# burn-bucket --version

burn-bucket --path test/tauri-app --bucket-loc "test/bucket/{name}.json" --browser-download-url-prefix "https://github.com/ymc-github/yowa/releases/download/v{version}"
```

## Author

yemiancheng <ymc.github@gmail.com>


## License
MIT

## Todo
- set this repo to mono repo with pnpm workspace or npm/yarn