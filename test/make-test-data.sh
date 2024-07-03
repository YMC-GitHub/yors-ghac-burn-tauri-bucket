#!/usr/bin/sh

echo "[zero] make test data: "

mkdir -p test;
cd test;

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

# echo "[zero] burn bucket :"
# cd ../;
# node ncli/index.js --path test/tauri-app --bucket-loc test/bucket/{name}.json --browser-download-url-prefix yours/url

