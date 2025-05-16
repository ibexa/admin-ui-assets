#! /bin/sh
# Script to prepare a admin-ui-assets bundle release

[ ! -f "bin/prepare_release.sh" ] && echo "This script has to be run the root of the bundle" && exit 1

print_usage()
{
    echo "Create a new version of admin-ui-assets bundle by creating a local tag"
    echo "This script MUST be run from the bundle root directory. It will create"
    echo "a tag but this tag will NOT be pushed"
    echo ""
    echo "Usage: $1 -v <version> -b <branch>"
    echo "-v : where version will be used to create the tag"
    echo "-b : branch which will be used to create the tag"
}

VERSION=""
BRANCH=""
while getopts ":h:v:b:" opt ; do
    case $opt in
        v ) VERSION=$OPTARG ;;
        b ) BRANCH=$OPTARG ;;
        h ) print_usage "$0"
            exit 0 ;;
        * ) print_usage "$0"
            exit 2 ;;
    esac
done

[ -z "$BRANCH" ] && print_usage "$0" && exit 2
[ -z "$VERSION" ] && print_usage "$0" && exit 2

check_command()
{
    $1 --version 2>&1 > /dev/null
    check_process "find '$1' in the PATH, is it installed?"
}

check_process()
{
    [ $? -ne 0 ] && echo "Fail to $1" && exit 3
}

check_command "git"
check_command "yarn"

VENDOR_DIR="src/bundle/Resources/public/vendors"
BOOTSTRAP_DIR="$VENDOR_DIR/bootstrap"
BOOTSTRAP_NOTICE="$BOOTSTRAP_DIR/BOOTSTRAP_IN_ADMINUIASSETS.txt"
FLATPICKR_DIR="$VENDOR_DIR/flatpickr"
FLATPICKR_NOTICE="$FLATPICKR_DIR/FLATPICKR_IN_ADMINUIASSETS.txt"
JQUERY_DIR="$VENDOR_DIR/jquery"
JQUERY_NOTICE="$JQUERY_DIR/JQUERY_IN_ADMINUIASSETS.txt"
LEAFLET_DIR="$VENDOR_DIR/leaflet"
LEAFLET_NOTICE="$LEAFLET_DIR/LEAFLET_IN_ADMINUIASSETS.txt"
POPPER_DIR="$VENDOR_DIR/@popperjs"
POPPER_NOTICE="$POPPER_DIR/POPPER_IN_ADMINUIASSETS.txt"
REACT_DIR="$VENDOR_DIR/react"
REACT_NOTICE="$REACT_DIR/REACT_IN_ADMINUIASSETS.txt"
REACT_DOM_DIR="$VENDOR_DIR/react-dom"
REACT_DOM_NOTICE="$REACT_DOM_DIR/REACT_DOM_IN_ADMINUIASSETS.txt"
TAGGIFY_DIR="$VENDOR_DIR/taggify"
TAGGIFY_NOTICE="$TAGGIFY_DIR/TAGGIFY_IN_ADMINUIASSETS.txt"
MOMENT_DIR="$VENDOR_DIR/moment"
MOMENT_NOTICE="$MOMENT_DIR/MOMENT_IN_ADMINUIASSETS.txt"
MOMENT_TIMEZONE_DIR="$VENDOR_DIR/moment-timezone"
MOMENT_TIMEZONE_NOTICE="$MOMENT_TIMEZONE_DIR/MOMENT_TIMEZONE_IN_ADMINUIASSETS.txt"
D3_DIR="$VENDOR_DIR/d3"
D3_NOTICE="$D3_DIR/D3_IN_ADMINUIASSETS.txt"
DAGRE_D3_DIR="$VENDOR_DIR/dagre-d3"
DAGRE_D3_NOTICE="$DAGRE_D3_DIR/DAGRE_D3_IN_ADMINUIASSETS.txt"
JS_MD5_DIR="$VENDOR_DIR/js-md5"
JS_MD5_NOTICE="$JS_MD5_DIR/JS_MD5_IN_ADMINUIASSETS.txt"
CHART_JS_DIR="$VENDOR_DIR/chart-js"
CHART_JS_NOTICE="$CHART_JS_DIR/CHART_JS_IN_ADMINUIASSETS.txt"
CHARTJS_PLUGIN_DATALABELS_DIR="$VENDOR_DIR/chartjs-plugin-datalabels"
CHARTJS_PLUGIN_DATALABELS_NOTICE="$CHARTJS_PLUGIN_DATALABELS_DIR/CHARTJS_PLUGIN_DATALABELS_IN_ADMINUIASSETS.txt"

CURRENT_BRANCH=`git branch | grep '*' | cut -d ' ' -f 2`
TMP_BRANCH="version_$VERSION"
TAG="v$VERSION"

echo "# Switching to $BRANCH and updating"
git checkout -q $BRANCH > /dev/null && git pull > /dev/null
check_process "switch to $BRANCH"

echo "# Removing the assets"
[ ! -d "$VENDOR_DIR" ] && mkdir -p $VENDOR_DIR
[ -d "$VENDOR_DIR" ] && rm -rf $VENDOR_DIR/*
check_process "clean the vendor dir $VENDOR_DIR"

echo "# Removing yarn.lock"
rm "yarn.lock"

echo "# Installing dependendencies"
yarn install
yarn run prepare-release

echo "# Removing unused files from Bootstrap"
rm -r "$BOOTSTRAP_DIR/dist/css" "$BOOTSTRAP_DIR/js" $BOOTSTRAP_DIR/dist/js/bootstrap.js $BOOTSTRAP_DIR/dist/js/bootstrap.js.map $BOOTSTRAP_DIR/dist/js/bootstrap.bundle.js $BOOTSTRAP_DIR/dist/js/bootstrap.bundle.js.map $BOOTSTRAP_DIR/dist/js/bootstrap.bundle.min.js $BOOTSTRAP_DIR/dist/js/bootstrap.bundle.min.js.map
check_process "clean bootstrap"
echo "This is a customized Bootstrap version." > $BOOTSTRAP_NOTICE
echo "To decrease the size of the bundle, it includes production-only files" >> $BOOTSTRAP_NOTICE

echo "# Removing unused files from Flatpickr"
rm -r "$FLATPICKR_DIR/src" $FLATPICKR_DIR/dist/flatpickr.css $FLATPICKR_DIR/dist/flatpickr.js $FLATPICKR_DIR/dist/ie.css $FLATPICKR_DIR/README.md
check_process "clean flatpickr"
echo "This is a customized Flatpickr version." > $FLATPICKR_NOTICE
echo "To decrease the size of the bundle, it includes production-only files" >> $FLATPICKR_NOTICE

echo "# Removing unused files from jQuery"
rm -r "$JQUERY_DIR/src" $JQUERY_DIR/dist/jquery.js $JQUERY_DIR/dist/jquery.min.map $JQUERY_DIR/dist/jquery.slim.js $JQUERY_DIR/dist/jquery.slim.min.js $JQUERY_DIR/dist/jquery.slim.min.map $JQUERY_DIR/AUTHORS.txt $JQUERY_DIR/bower.json $JQUERY_DIR/README.md
check_process "clean jquery"
echo "This is a customized jQuery version." > $JQUERY_NOTICE
echo "To decrease the size of the bundle, it includes production-only files" >> $JQUERY_NOTICE

echo "# Removing unused files from Leaflet"
rm -r "$LEAFLET_DIR/src" $LEAFLET_DIR/CHANGELOG.md $LEAFLET_DIR/README.md
check_process "clean Leaflet"
echo "This is a customized Leaflet version." > $LEAFLET_NOTICE
echo "To decrease the size of the bundle, it includes production-only files" >> $LEAFLET_NOTICE

echo "# Removing unused files from Popper"
rm -r "$POPPER_DIR/core/dist/esm" $POPPER_DIR/core/dist/umd/popper.js $POPPER_DIR/core/dist/umd/popper.js.map
check_process "clean popperjs"
echo "This is a customized Popperjs version." > $POPPER_NOTICE
echo "To decrease the size of the bundle, it includes production-only files" >> $POPPER_NOTICE

echo "# Removing unused files from react"
rm -r "$REACT_DIR/node_modules"
check_process "clean React"
echo "This is a customized React version." > $REACT_NOTICE
echo "To decrease the size of the bundle, it includes production-only files" >> $REACT_NOTICE

echo "# Removing unused files from react-dom"
rm -r "$REACT_DOM_DIR/node_modules" $REACT_DOM_DIR/index.js $REACT_DOM_DIR/server.js $REACT_DOM_DIR/test-utils.js
check_process "clean ReactDOM"
echo "This is a customized ReactDOM version." > $REACT_DOM_NOTICE
echo "To decrease the size of the bundle, it includes production-only files" >> $REACT_DOM_NOTICE

echo "# Removing unused files from taggify"
rm -r "$TAGGIFY_DIR/test" "$TAGGIFY_DIR/src/css" $TAGGIFY_DIR/src/js/taggify-script.js $TAGGIFY_DIR/src/js/taggify.es6.js $TAGGIFY_DIR/src/js/taggify.min.js.gz $TAGGIFY_DIR/.travis.yml $TAGGIFY_DIR/db.json $TAGGIFY_DIR/gulpfile.js $TAGGIFY_DIR/index.html $TAGGIFY_DIR/karma.conf.js $TAGGIFY_DIR/module-generator.js $TAGGIFY_DIR/taggify-comment.js $TAGGIFY_DIR/template.common.js $TAGGIFY_DIR/template.es6.js
check_process "clean Taggify"
echo "This is a customized Taggify version." > $TAGGIFY_NOTICE
echo "To decrease the size of the bundle, it includes production-only files" >> $TAGGIFY_NOTICE

echo "# Removing unused files from moment"
rm -r "$MOMENT_DIR/src"
check_process "clean moment"
echo "This is a customized moment version." > $MOMENT_NOTICE
echo "To decrease the size of the bundle, it includes production-only files" >> $MOMENT_NOTICE

echo "# Removing unused files from moment-timezone"
rm -r "$MOMENT_TIMEZONE_DIR/data"
check_process "clean moment-timezone"
echo "This is a customized moment version." > $MOMENT_TIMEZONE_NOTICE
echo "To decrease the size of the bundle, it includes production-only files" >> $MOMENT_TIMEZONE_NOTICE

echo "# Removing unused files from d3"
rm -r "$D3_DIR/node_modules" $D3_DIR/CHANGES.md $D3_DIR/index.js $D3_DIR/dist/d3.node.js $D3_DIR/dist/package.js
check_process "clean d3"
echo "This is a customized d3 version." > $D3_NOTICE
echo "To decrease the size of the bundle, it includes production-only files" >> $D3_NOTICE

echo "# Removing unused files from dagre-d3"
rm -r "$DAGRE_D3_DIR/lib" "$DAGRE_D3_DIR/dist/demo" $DAGRE_D3_DIR/.jshintrc $DAGRE_D3_DIR/bower.json $DAGRE_D3_DIR/index.js $DAGRE_D3_DIR/karma.conf.js $DAGRE_D3_DIR/karma.core.conf.js $DAGRE_D3_DIR/dist/dagre-d3.core.js $DAGRE_D3_DIR/dist/dagre-d3.core.min.js $DAGRE_D3_DIR/dist/dagre-d3.core.min.js.map
check_process "clean dagre-d3"
echo "This is a customized dagre-d3 version." > $DAGRE_D3_NOTICE
echo "To decrease the size of the bundle, it includes production-only files" >> $DAGRE_D3_NOTICE

echo "# Removing unused files from js-md5"
rm -r "$JS_MD5_DIR/src"
check_process "clean js-md5"
echo "This is a customized js-md5 version." > $JS_MD5_NOTICE
echo "To decrease the size of the bundle, it includes production-only files" >> $JS_MD5_NOTICE

echo "This is a customized chart-js version." > $CHART_JS_NOTICE
echo "To decrease the size of the bundle, it includes production-only files" >> $CHART_JS_NOTICE

echo "This is a customized chartjs-plugin-datalabels version." > $CHARTJS_PLUGIN_DATALABELS_NOTICE
echo "To decrease the size of the bundle, it includes production-only files" >> $CHARTJS_PLUGIN_DATALABELS_NOTICE

echo "# Creating the custom branch: $TMP_BRANCH"
git checkout -q -b "$TMP_BRANCH" > /dev/null
check_process "create the branch '$TMP_BRANCH'"

echo "# Commiting"
git add src/bundle/Resources > /dev/null
git commit -q -m "Version $VERSION"
check_process "commit the assets"

echo "# Tagging $TAG"
git tag "$TAG"
check_process "to tag the version '$TAG'"

echo "# Switching back to '$CURRENT_BRANCH'"
git checkout -q "$CURRENT_BRANCH" > /dev/null
check_process "to switch back to '$CURRENT_BRANCH'"

echo "# Removing the custom branch '$TMP_BRANCH'"
git branch -D "$TMP_BRANCH" > /dev/null
check_process "to remove the branch '$TMP_BRANCH'"

echo ""
echo "The tag '$TAG' has been created, please check that everything is correct"
echo "then you can run:"
echo "  git push origin $TAG"
echo "and create the corresponding release on Github"
echo "https://github.com/ibexa/admin-ui-assets/releases"
