# Badi Client - SMOLDUCKK02!!

Tech stack:

- React 18 - https://react.dev/
- React Native 0.72 - https://reactnative.dev/
- Expo 49 - https://expo.dev/
- Expo Router 2 - https://docs.expo.dev/routing/introduction/
- React Native Paper 5 - https://callstack.github.io/react-native-paper/
- TypeScript 5 - https://www.typescriptlang.org/
- ESLint & Prettier

## Required setup

1. Make sure you have [Node.js](https://nodejs.org/en/) installed, v18 or v20 only!
   - Use `node --version` from your terminal to check the version, make sure it's either v18 or v20
2. Setup your VS Code with extensions - [Click here](https://gist.github.com/ninetynize/47769c47114d7b7ba9a07df90cf416ca).
   - Only the Prettier VSCode extension is required, other extensions are **optional**, but still please follow the configuration from no. 2 in the guide.
3. Install the Expo app on your mobile phone:
   - [Android/Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&pcampaignid=web_share)
   - [iOS app store](https://apps.apple.com/us/app/expo-go/id982107779)

## Cloning & running the project

1. Clone this project:
   ```sh
   git clone git@github.com:Mugnavo/badi-client.git
   ```
   if it doesn't work, try the https url:
   ```sh
   git clone https://github.com/Mugnavo/badi-client.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the project:
   ```sh
   npm start
   ```
   - or `npm run web` to start immediately for the browser
4. Open the project:
   - If running for the browser only, then check the terminal for the URL
   - If running for mobile, open the Expo app you installed on your phone then scan the QR code from the terminal

## Contributing

### Creating a new branch

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

### Grabbing changes from main

If you're already working on a branch and you want to grab the latest changes from `main` branch, do the following:

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
4. Merge the changes from the `main` branch to your branch:
   ```sh
   git merge main
   ```
   If naay conflicts, chat nalang sa server hehe
5. _OPTIONAL_, fresh install if dependencies were updated:
   ```sh
   npm run freshinstall
   ```

### Extras

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
