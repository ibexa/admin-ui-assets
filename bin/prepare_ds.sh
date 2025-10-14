#! /bin/sh

rm -rf ./.tmp/design-system
cp -r ./node_modules/@ibexa/design-system ./.tmp/design-system
cd ./.tmp/design-system
./bin/prepare_release_files.sh
