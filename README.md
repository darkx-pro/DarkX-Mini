
# 🎭 DARKX-MINI WHATSAPP BOT
<p align="center">
  <img src="https://files.catbox.moe/pc5uec.png" width="350" height="350" alt="DarkX Logo" style="border-radius: 15px; box-shadow: 0px 4px 15px rgba(0,0,0,0.5);">
</p>
<p align="center">
  <strong>An advanced, lightweight, and high-speed WhatsApp userbot built to automate your chats with style.</strong>
</p>
<p align="center">
  <a href="https://github.com/darkx-pro/DarkX-Mini/fork"><img src="https://img.shields.io/badge/FORK-REPOSITORY-blue?style=for-the-badge&logo=github&logoColor=white" alt="Fork"></a>
  <a href="https://github.com/darkx-pro/DarkX-Mini/stargazers"><img src="https://img.shields.io/badge/STAR-REPOSITORY-yellow?style=for-the-badge&logo=github&logoColor=white" alt="Stars"></a>
  <a href="https://github.com/darkx-pro/DarkX-Mini/issues"><img src="https://img.shields.io/badge/BUGS-REPORT-red?style=for-the-badge&logo=github&logoColor=white" alt="Issues"></a>
</p>
---
## 🌟 Features at a Glance
*   🚀 **Ultra-Fast Performance:** Optimized codebase for instant responses.
*   🔒 **Secure Session Handling:** Keeps your account connection safe and encrypted.
*   🛠️ **Multi-Platform Deployment:** Easily hosts on Heroku, VPS, or Pterodactyl Panels.
*   🤖 **Fully Automated:** Handles media downloading, group administration, and fun commands effortlessly.
---
## 🔑 How to Get a Session ID
Before deploying, you must generate a **Session ID** to link the bot with your WhatsApp account. Follow these precise steps:
### **Step 1: Generate the Code**
1. Visit the [**SMD Pairing Site**](https://smd-pair.zone.id/pair).
2. Enter your WhatsApp phone number with your country code (e.g., `255775710774`).
3. Enter the **Pairing Code** that arrives via your WhatsApp notification.
4. Once linked, the site will send you a long code string starting with `SMD~`.
### **Step 2: Rename the Session (Crucial Component)**
Our bot strictly recognizes session keys that start with the prefix **`DarkX-Ultra`**. You must manually modify your retrieved code:

| Original Format (From Site) | Correct Format (Required for Bot) |
| :--- | :--- |
| `SMD~eyJub2lzZ...` | `DarkX-Ultra~eyJub2lzZ...` |

> ⚠️ **Important:** Simply delete the letters `SMD` and replace them with `DarkX-Ultra` right before the `~` symbol. Leave the rest of the string exactly as it is.
---
## 🚀 Deployment Methods
Choose your preferred hosting method below.
### Method 1: Heroku (One-Click Setup)
The easiest way to get your bot running 24/7. Click the button below to fill in your variables and deploy instantly:
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/darkx-pro/DarkX-Mini)
---
### Method 2: Panel or VPS Deployment (Linux/Ubuntu)
For advanced users deploying via Pterodactyl Panel or a virtual private server. Run the following commands sequentially in your terminal:
```bash
# Step 1: Clone the repository to your environment
git clone [https://github.com/darkx-pro/DarkX-Mini.git](https://github.com/darkx-pro/DarkX-Mini.git)
# Step 2: Navigate into the project directory
cd DarkX-Mini
# Step 3: Install all required project dependencies
npm install
# Step 4: Launch the WhatsApp Bot
npm start
```
## 🛠️ Configuration Variables
When hosting, ensure you set up your environment variables correctly:
 * SESSION_ID: Your modified session key (DarkX-Ultra~...).
 * PREFIX: The character used to trigger bot commands (e.g., ., !, or *).
 * OWNER_NUMBER: Your personal WhatsApp number for full admin controls.
## 🤝 Contributing & Support
If you encounter bugs or want to suggest new features, feel free to open an issue or submit a pull request on the repository. Don't forget to **Star ⭐** this repository if you enjoy using it!
```
```
