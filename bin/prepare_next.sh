#! /bin/sh
# Script to prepare a admin-ui-assets bundle release as [version]-next branch

[ ! -f "bin/prepare_release.sh" ] && echo "This script has to be run the root of the bundle" && exit 1

print_usage()
{
    echo "Create a new version of admin-ui-assets bundle by creating [version]-next"
    echo "This script MUST be run from the bundle root directory. It will create"
    echo "a branch but this branch will NOT be pushed"
    echo ""
    echo "Usage: $1 -v <version> -b <branch>"
    echo "-v : where version will be used to create next branch"
    echo "-b : branch which will be used to create next branch"
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

CURRENT_BRANCH=`git branch | grep '*' | cut -d ' ' -f 2`
NEXT_BRANCH="$VERSION-next"

echo "# Switching to $BRANCH and updating"
git checkout -q $BRANCH > /dev/null && git pull > /dev/null
check_process "switch to $BRANCH"

jq --indent 4 '.scripts["postinstall"] = "(cd node_modules/@ibexa/design-system && yarn install &&yarn packages:build)"' package.json > package.json.tmp && mv package.json.tmp package.json
./bin/prepare_release_files.sh
git checkout HEAD -- package.json
check_process "prepare the release files"

echo "# Creating next branch: $NEXT_BRANCH"
git checkout -q -B "$NEXT_BRANCH" > /dev/null
check_process "create the branch '$NEXT_BRANCH'"

echo "# Commiting"
git add src/bundle/Resources > /dev/null
git commit -q -m "Version $VERSION"
check_process "commit the assets"

echo ""
echo "The branch '$NEXT_BRANCH' has been created, please check that everything is correct"
echo "then you can run:"
echo "  git push origin $NEXT_BRANCH"
