#!/bin/bash

pub() {
  cd packages/showcase
  npm run build
  git add -f dist
  cd ../..
  node_modules/.bin/lerna publish --skip-npm
  cd packages/utils
  npm publish
  cd packages/theme
  npm publish
  cd packages/components
  npm publish
  cd packages/blocks
  npm publish
  cd packages/visualizations
  npm publish
}

echo "Are you on a clean, up-to-date master branch, and logged into npm as https://www.npmjs.com/~contiamo?" 
select master in "Yes" "No"; do
  case $master in
    Yes ) pub; break;;
    No ) exit;;
  esac
done

