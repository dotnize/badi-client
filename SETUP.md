# Setup

## Prerequisites

1. Make sure you have [Node.js](https://nodejs.org/en/) installed, v18 or v20 only!
   - Use `node --version` from your terminal to check the version, make sure it's either v18 or v20
2. Setup your VS Code with extensions - [Click here](https://gist.github.com/dotnize/47769c47114d7b7ba9a07df90cf416ca).
   - Only the Prettier VSCode extension is required, other extensions are **optional**, but still please follow the configuration from no. 2 in the guide.
3. Install the Expo app on your mobile phone:
   - [Android/Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&pcampaignid=web_share)
   - [iOS app store](https://apps.apple.com/us/app/expo-go/id982107779)

## Cloning & running the project

1. Clone this project:
   ```sh
   git clone git@github.com:dotnize/badi-client.git
   ```
   if it doesn't work, try the https url:
   ```sh
   git clone https://github.com/dotnize/badi-client.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file at the root directory of the project with the following content:
   ```sh
   EXPO_PUBLIC_API_URL=http://localhost:3001 # replace with your backend URL/port
   ```
4. Run the project:
   ```sh
   npm start
   ```
   - or `npm run web` to start immediately for the browser
5. Open the project:
   - If running for the browser only, then check the terminal for the URL
   - If running for mobile, open the Expo app you installed on your phone then scan the QR code from the terminal
