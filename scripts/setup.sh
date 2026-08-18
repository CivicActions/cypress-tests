#!/usr/bin/env bash

# Create a detached worktree for Drupal so we don't blow away the files in the
# main directory, but still have a real git checkout for Drupdater.
git worktree add --detach drupal HEAD
cd drupal || exit

# Taken from https://ddev.readthedocs.io/en/stable/users/quickstart/
ddev config --project-type=drupal --php-version=8.4 --docroot=web
ddev start
ddev composer install

ddev exec echo '\$settings["config_sync_directory"] = "../config/sync";' >> web/sites/default/settings.php

ddev drush site:install minimal --account-name=admin --account-pass=admin -y --existing-config

ddev drush status

# Return to the parent directory.
cd ../
