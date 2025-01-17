#!/usr/bin/env bash

###
# Launches Drupal CMS using DDEV.
#
# This requires that DDEV be installed and available in the PATH, and only works in
# Unix-like environments (Linux, macOS, or the Windows Subsystem for Linux). This will
# initialize DDEV configuration, start the containers, install dependencies, and open
# Drupal CMS in the browser.
###

# Abort this entire script if any one command fails.
set -e

if ! command -v ddev >/dev/null; then
  echo "DDEV needs to be installed. Visit https://ddev.com/get-started for instructions."
  exit 1
fi

NAME=$(basename $PWD)
# If there are any other DDEV projects in this system with this name, add a numeric suffix.
declare -i n=$(ddev list | grep --count "$NAME")
if [ $n > 0 ]; then
  NAME=$NAME-$(expr $n + 1)
fi

# Configure DDEV if not already done.
test -d .ddev || ddev config --project-type=drupal11 --docroot=web --php-version=8.3 --ddev-version-constraint=">=1.24.0" --project-name="$NAME"
# Start your engines.
ddev start
# Install dependencies if not already done.
test -f composer.lock || ddev composer install
# All set, let's get Drupalin'.
ddev launch
