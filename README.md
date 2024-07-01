# yors-ghac-burn-tauri-bucket

<div align="center">
  <h1>burn-tauri-bucket</h1>
  <p>
    <strong>🤖 a github action to burn tauri bucket for mono repo.</strong>
  </p>
</div>


## Demo (todo)
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

      - name: push tauri apps to some repo's release page (todo)
        shell: bash
        run: |
          echo "todo"

      - name: commit and push tauri bucket to some repo (todo)
        shell: bash
        run: |
          echo "todo"


```

## Author

yemiancheng <ymc.github@gmail.com>


## License
MIT