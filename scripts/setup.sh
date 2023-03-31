#!/usr/bin/env bash

# Create directory for Drupal 10 so we don't blow away all the files in the
# main directory.
mkdir drupal
cd drupal || exit

# Taken from https://ddev.readthedocs.io/en/stable/users/quickstart/
ddev config --project-type=drupal10 --docroot=web --create-docroot
ddev start
ddev composer create drupal/recommended-project
ddev composer require drush/drush
ddev drush site:install --account-name=admin --account-pass=admin -y

# Return to the parent directory.
cd ../
