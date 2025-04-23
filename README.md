# Internship Project

---

## 🏗️ Project Structure

📦 internship-project
 |File                   | Role            | 
 |-----------------------|-----------------|
 | ┣ 📂 app               | Laravel project|
 | ┣ 📂 nginx             | Nginx reverse proxy config |
 | ┣ 📂 php               | PHP docker config |
 | ┣ 📂 spa               | React frontend written in TypeScript |
 | ┣ 📄 compose.dev.yaml  | compose file for DEV mode |
 | ┣ 📄 compose.yaml      | compose file for PROD mode |
 | ┣ 📄 .env.example      | example .env file |
 | ┣ 📄 .gitignore        | Gitignore file |
 | ┗ 📄 README.md         | Readme file |

---

## ⚙️ Technologies Used

| Layer       | Technology |
|-------------|------------|
| Frontend    | TypeScript, React, Vite, TailwindCSS |
| Backend     | PHP, Laravel |
| Reverse Proxy | Nginx |
| Database    | MySQL |
| DevOps      | Docker, Docker Compose |

---

## 🛠️ Build & Run Your App

### !!! ATTENTION
### To successfully build and run this app, You MUST create Algolia and Firebase storage Accounts.

### 1. Clone the repository
```bash
git clone https://github.com/abror2142/internship-project
cd internship-project
```

### 2. Environment Configuration
Create your .env files for both backend and docker (examples are provided):

```bash
cp .env.example .env
cp app/.env.example app/.env
```

** Update environment variables as needed.

### 1. Create Firebase Account and Appropriate bucket (free trial possible).
- Make Sure you got firebase-auth.json file and place it in the project. Then you should point this file using .env variables.
- You Also need to put firebase.json to the frontend (As this project explores both file uploads: from directly frontend to firebase and fronend to backend then to firebase).
- Some problems may arise which might require a bit research.

### 2. Create Algolia account (free within allocated limit).
- You should provide algolia client to both frontend and backend.
- Backend pushes and manages search entries.
- Frontend is responsible for data retrieval.
- For backend, update the .env with suitable keys!
- For frontend, instal algoliasearch package, create algolia.ts in the root file with following content:
  ```bash
  import { algoliasearch } from "algoliasearch";
  export const client = algoliasearch(YOUR_APP_ID, YOUR_SEARCH_API_KEY);
  ```

  *** Building might take some effort as the project heavily utilizes third party services.

### 3. 📦 Docker Compose

To Run In **DEVELOPMENT** Mode:

```bash
 docker compose -f compose.dev.yaml up
```

** In **Development** Mode:
 - HotLoading is enabled! 
 - Xdebug is installed and can be configured!


To run in **PRODUCTION** Mode:

```bash
 docker compose up
```

Visit `http://localhost:80`


Enjoy and Customize as much as you want!

---
