# Contributing

Table of Contents:

- [Creating a new branch](#creating-a-new-branch) (branching out from `main`)
- [Grabbing changes from main](#grabbing-changes-from-main) (or from other branches)
- [Workflow guidelines](#workflow-guidelines)
- [Extras](#extras)

## Creating a new branch

When working on a new screen, feature, or bugfix, create a new branch from `main` with the following naming convention: `lastname/branchame`

> e.g. `tampus/home` or `sagmon/fix-routing`

1. Switch to `main` branch:
   ```sh
   git switch main
   ```
2. Pull the latest changes:
   ```sh
   git pull
   ```
3. Create a new branch:
   ```sh
   git switch -c lastname/branchname # replace with ur names
   ```
4. Push the branch to remote:
   ```sh
   git push -u origin lastname/branchname # replace with the created branch name
   ```
5. Install dependencies
   ```sh
   npm install
   ```
   _Optional_, but after this, you can perform a fresh reinstall to avoid cache & dependency issues:
   ```sh
   npm run freshinstall
   ```
6. Start working on your branch, commit, and push freely :) just dont commit to `main` or other member's branches

## Grabbing changes from main

If you're already working on a branch and you want to grab the latest changes from `main` or any other branch, do the following:

1. Switch to `main` branch (or the branch you want to grab commits from):
   ```sh
   git switch main
   ```
2. Pull the latest changes:
   ```sh
   git pull
   ```
3. Switch back to your branch:
   ```sh
   git switch lastname/branchname # replace with ur names
   ```
4. Merge the changes from `main` (or your chosen source branch) to your branch:
   ```sh
   git merge main
   ```
   If naay conflicts, chat nalang sa server hehe
5. _OPTIONAL_, fresh install if dependencies were updated:
   ```sh
   npm run freshinstall
   ```

## Workflow guidelines

1. Communicate! Ask for help, make suggestions, and let others know what you're working on.
2. Push your commits regularly. Don't wait until you're done with your work before pushing.
   - I recommend pushing after you're done working for the day (e.g. before turning off your computer or going to sleep).
3. Create pull requests so we can discuss your branches before merging.
   - So we can track and review your changes easier, I recommend creating a Pull Request immediately after creating a new branch, even if it's still in progress or empty. Request a review if you're finished.
4. To avoid merge conflicts, avoid making changes to files assigned to other members. If you really need to, please communicate it properly when making a pull request.
5. Keep your code simple and readable. Use descriptive variable names, and avoid unnecessary complexity.

## Extras

- Use `git switch` to switch to an existing branch, and add the `-c` flag when creating a new one.
  - e.g `git switch -c lastname/newbranchname`
- Use `git merge` to grab commits from another branch to your current branch. Examples:
  - grabbing commits from main branch: `git merge main`
  - grabbing commits from a different member's branch: `git merge sagmon/fix-routing`
  - Make sure to `git pull` from the source branch first!
- Make sure to always pull the latest commits from `main` branch before merging or creating a new branch
  - `git switch main` then `git pull`
- When pulling new commits with possible updated dependencies, do a fresh install to avoid cache & versioning issues:
  - `npm run freshinstall`
