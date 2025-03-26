# Internship Project

---

## 🏗️ Project Structure

📦 internship-project
 |File                   | Role            | 
 |-----------------------|-----------------|
 | ┣ 📂 app               | Laravel project|
 | ┣ 📂 nginx             | Nginx reverse proxy config |
 | ┣ 📂 php               | PHP docker config |
 | ┣ 📄 compose.dev.yaml  | compose file for DEV mode |
 | ┣ 📄 compose.yaml      | compose file for PROD mode |
 | ┣ 📄 .env.example      | example .env file |
 | ┗ 📄 README.md         | Readme file |

---

## ⚙️ Technologies Used

| Layer       | Technology |
|-------------|------------|
| Frontend    | Vite, TailwindCSS |
| Backend     | PHP, Laravel |
| Reverse Proxy | Nginx |
| Database    | MySQL |
| DevOps      | Docker, Docker Compose |

---

## 🛠️ Build & Run Your App

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

### 📦 Docker Compose

`docker compose up`


Visit `http://localhost:80`


Enjoy and Customize as much as you want!

---
