#!/usr/bin/env bash

# Create directory for Drupal so we don't blow away all the files in the
# main directory.
mkdir drupal
cd drupal || exit

# Taken from https://ddev.readthedocs.io/en/stable/users/quickstart/
ddev config --project-type=drupal --php-version=8.4 --docroot=web
ddev start
ddev composer create drupal/recommended-project
ddev composer require drush/drush

# Add config/sync directory to settings.
ddev exec echo '\$settings["config_sync_directory"] = "../../config/sync";' >> web/sites/default/settings.php

ddev drush site:install minimal --account-name=admin --account-pass=admin -y --existing-config

ddev drush status

# Return to the parent directory.
cd ../
