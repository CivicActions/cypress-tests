#!/usr/bin/env bash

# Create directory for Drupal 10 so we don't blow away all the files in the
# main directory.
mkdir drupal
# Copy configuration into the Drupal directory. Any configuration changes will require a copying back to the main directory.
cp -r config drupal/.
cd drupal || exit

# Taken from https://ddev.readthedocs.io/en/stable/users/quickstart/
ddev config --project-type=drupal10 --docroot=web --create-docroot
ddev start
ddev composer create drupal/recommended-project
ddev composer require drush/drush
ddev exec echo '\$settings[\"config_sync_directory\"] = \"../config/sync\"\;' >> web/sites/default/settings.php
ddev drush site:install minimal --account-name=admin --account-pass=admin -y --existing-config

# Return to the parent directory.
cd ../
