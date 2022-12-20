# Cypress Tests Contribution Guide

Welcome to the CivicActions Cypress Tests Contribution Guide. This guide is intended to help you get started 
contributing to the CivicActions Cypress Tests repository.

Outline:
- [Getting Started](#getting-started)
  - [Conduct](#resources)
- [Git Workflow](#git-workflow)
  - [Cloning the Repository](#cloning-the-repository)
  - [Committing Changes](#committing-changes)
  - [Creating a Pull Request](#creating-a-pull-request)
  - [Reviewing Pull Requests](#reviewing-pull-requests)
  - [Merging Pull Requests](#merging-pull-requests)

## Getting Started

You may be new to CivicActions or a seasoned contributor. Either way, we strive to keep this contribution guide 
aligned with processes that most CivicActions team members are familiar with. To start out, we will be light on 
process notes and let them evolve as new contributors join.

### Conduct

At CivicActions we strive to be a welcoming and inclusive community. Please read our company Code of Conduct which 
applies to all interactions we have in this repository.

https://handbook.civicactions.com/en/latest/030-policies/code-of-conduct

## Git Workflow

The main part of contributing to any repository with code and version control is the Git workflow.

### Cloning the Repository

To get started, you will need to clone the repository to your local machine. Some projects in CivicActions use a 
workflow where you fork the repository and then clone your fork locally. Here we will work on the main repository 
and make branches off of it.

```shell
git clone git@github.com:CivicActions/cypress-tests.git
```

### Creating Branches and Issues

Creating new branches is required to make any contributions to the repository. This is to ensure that we can have 
reviews of contributions via pull requests.

You can either create an issue first and then create a branch tied to that issue number, or you can create a branch 
named after your contribution without an attached issue.

```shell
# Create branch using Gitflow naming convention.
# The issue number on GitHub is "1234".
git checkout -b feature/1234

# Create branch without issue on GitHub.
git checkout -b name-for-feature
```

It is encouraged to create issues for any contributions you make, so we can eventually use issue templates, but if 
you don't create an issue for your work, please put a description of your contribution in the pull request. This 
will help with the review process and make sure reviewers understand the context of your proposed contribution.

#### Default Branch

The default branch for this repository is `main`. This branch is protected and requires pull requests to be merged 
into it.

### Committing Changes

Once you have made your changes, you will need to commit them to your local branch. Be wary of committing extraneous 
files not relating to Cypress testing. We added some exclusions to the `.gitignore` file to help with this, but if 
you find others, please include those exclusions in your pull request. Also, please be as descriptive as possible 
with your main commit messages.

```shell  
# Please add descriptive commit messages.
git commit -m "Create example for testing nested objects in a JSON response."

# Not a descriptive commit message.
git commit -m "Add new feature"
```

### Creating a Pull Request

You can create a pull request without an issue attached, but if you did create an issue, then you should connect the 
pull request to the issue. This will help with tracking the work and closing the issue when the pull request is merged.

https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue

### Reviewing Pull Requests

After working on this repository for a while, it might be fine to merge in a pull request without review. For 
example, if you are making tiny changes to a documentation file or test example, it might become a nuisance to 
require someone to review those small changes.

However, it is always encouraged to have someone review your pull request if: the change is large, you have questions 
on how to implement something, or you are unsure if the change is correct.

You can always look for the list of contributors to this repository and ask them to review your pull request.

At some point, we will have tests running on pull requests, and you shouldn't merge in a pull request until those 
tests pass. 

### Merging Pull Requests

We recommend using the "Squash and Merge" option when merging pull requests. This will squash all the commits and 
commit messages from your branch into one. Locally, you can either rebase or merge when pulling in changes since the 
commits will be squashed when merged into the main branch.
