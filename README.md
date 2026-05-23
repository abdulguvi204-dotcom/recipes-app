# 🍽️ Recipes CRUD API

A RESTful API for managing recipes built with **Node.js**, **Express.js**, and **Mongoose (MongoDB)**. Follows the **MVC pattern** with proper error handling and validation.

---

## 📁 Project Structure

```
recipes-app/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   └── recipeController.js    # CRUD logic (Controller layer)
├── middleware/
│   └── errorHandler.js        # Global error handling
├── models/
│   └── Recipe.js              # Mongoose schema (Model layer)
├── routes/
│   └── recipeRoutes.js        # Express routes
├── .env                       # Environment variables (NOT committed)
├── .env.example               # Example env file (committed)
├── .gitignore
├── package.json
├── server.js                  # Entry point
└── README.md
```

---

## ⚙️ Tech Stack

| Tool        | Purpose                    |
|-------------|----------------------------|
| Node.js     | JavaScript runtime         |
| Express.js  | Web framework              |
| Mongoose    | MongoDB ODM                |
| MongoDB     | Database (Atlas cloud)     |
| dotenv      | Environment variables      |
| nodemon     | Auto-restart in dev mode   |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)
- Postman (for API testing)

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/recipes-app.git
cd recipes-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and replace with your MongoDB Atlas connection string:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/recipesDB
NODE_ENV=development
```

### 4. Run the server
```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:5000`

---

## 📡 API Endpoints

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | `/api/recipes`        | Get all recipes      |
| POST   | `/api/recipes`        | Create a new recipe  |
| GET    | `/api/recipes/:id`    | Get recipe by ID     |
| PUT    | `/api/recipes/:id`    | Update recipe by ID  |
| DELETE | `/api/recipes/:id`    | Delete recipe by ID  |

### Query Parameters (GET /api/recipes)
| Param       | Example                        | Description              |
|-------------|--------------------------------|--------------------------|
| `category`  | `?category=Dinner`             | Filter by category       |
| `difficulty`| `?difficulty=Easy`             | Filter by difficulty      |
| `search`    | `?search=pasta`                | Search by title keyword  |

---

## 📦 Recipe Schema

```json
{
  "title":        "string (required, max 100)",
  "description":  "string (required, max 500)",
  "ingredients":  ["string"] (required, non-empty array),
  "instructions": "string (required)",
  "cookingTime":  number (minutes, required),
  "servings":     number (required),
  "category":     "Breakfast|Lunch|Dinner|Dessert|Snack|Beverage|Other",
  "difficulty":   "Easy|Medium|Hard (default: Medium)",
  "imageUrl":     "string (optional)"
}
```

---

## 🔍 Sample Request & Response

### POST /api/recipes

**Request Body:**
```json
{
  "title": "Spaghetti Carbonara",
  "description": "Classic Italian pasta dish with eggs, cheese, and pancetta.",
  "ingredients": ["200g spaghetti", "100g pancetta", "2 eggs", "50g parmesan", "Black pepper"],
  "instructions": "1. Cook pasta. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all off heat.",
  "cookingTime": 30,
  "servings": 2,
  "category": "Dinner",
  "difficulty": "Medium"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Recipe created successfully",
  "data": {
    "_id": "663a1f...",
    "title": "Spaghetti Carbonara",
    ...
    "createdAt": "2024-05-07T10:00:00.000Z",
    "updatedAt": "2024-05-07T10:00:00.000Z"
  }
}
```

---

## ☁️ Deployment on Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables:
   - `MONGO_URI` → your Atlas connection string
   - `NODE_ENV` → `production`
6. Click **Deploy**

---

## 🧪 Testing with Postman

Import the collection or manually test each endpoint at your deployed URL.

Base URL (local): `http://localhost:5000`  
Base URL (deployed): `https://your-app.onrender.com`

---

## 📄 License

MIT
