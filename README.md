# 🚀 AI Auto-Category & Tag Generator

An intelligent product categorization tool that uses **AI (OpenAI GPT-4o-mini)** to automatically generate categories, SEO tags, and sustainability filters for e-commerce products.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?logo=openai&logoColor=white)

### 🌐 [Live Demo](https://ai-auto-category-tag-generator-1.onrender.com/)

---

## ✨ Features

- **AI-Powered Categorization** — Automatically assigns products to one of six primary categories (Electronics, Apparel, Home & Kitchen, Beauty & Personal Care, Grocery, Toys)
- **Smart Sub-Categories** — Generates context-specific sub-categories for granular classification
- **SEO Tag Generation** — Produces 5–10 high-search-volume SEO keywords per product
- **Sustainability Filters** — Detects eco-friendly attributes like *plastic-free*, *organic*, *vegan*, *recycled*, etc.
- **Product History** — View all previously categorized products stored in MongoDB
- **Modern UI** — Sleek dark-themed interface with glassmorphism, animations, and responsive design

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 19, Vite 7, Axios          |
| Backend    | Node.js, Express 4               |
| AI Engine  | OpenAI GPT-4o-mini               |
| Database   | MongoDB (Mongoose ODM)           |

---

## 📁 Project Structure

```
AI Auto-Category & Tag Generator/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   └── productController.js   # API business logic
│   ├── models/
│   │   └── Product.js             # Mongoose product schema
│   ├── routes/
│   │   └── productRoutes.js       # Express routes
│   ├── services/
│   │   └── aiService.js           # OpenAI integration & validation
│   ├── .env.example               # Environment variables template
│   ├── package.json
│   └── server.js                  # Express server entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductForm.jsx    # Product input form
│   │   │   ├── ProductHistory.jsx # History display
│   │   │   └── ResultCard.jsx     # AI results display
│   │   ├── services/
│   │   │   └── api.js             # Axios API client
│   │   ├── App.jsx                # Main application
│   │   └── main.jsx               # React entry point
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **OpenAI API Key** — [Get one here](https://platform.openai.com/api-keys)

### 1. Clone the Repository

```bash
git clone https://github.com/abhsk-kr/AI-Auto-Category-Tag-Generator.git
cd AI-Auto-Category-Tag-Generator
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-category-generator
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

### 4. Run the Application

Start both servers in separate terminals:

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

The frontend runs at **http://localhost:5173** and the backend API at **http://localhost:5000**.

---

## 📡 API Endpoints

| Method | Endpoint                   | Description                        |
|--------|----------------------------|------------------------------------|
| POST   | `/api/products/generate`   | Generate AI metadata for a product |
| POST   | `/api/products/save`       | Save categorized product to DB     |
| GET    | `/api/products/history`    | Fetch all saved products           |
| GET    | `/health`                  | Server health check                |

### Example Request

```bash
curl -X POST http://localhost:5000/api/products/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Organic Bamboo Toothbrush Set",
    "description": "Pack of 4 biodegradable bamboo toothbrushes with charcoal-infused bristles. BPA-free, plastic-free packaging."
  }'
```

### Example Response

```json
{
  "success": true,
  "data": {
    "title": "Organic Bamboo Toothbrush Set",
    "description": "Pack of 4 biodegradable bamboo toothbrushes...",
    "primary_category": "Beauty & Personal Care",
    "sub_category": "Oral Care",
    "seo_tags": ["bamboo toothbrush", "eco-friendly toothbrush", "charcoal bristle toothbrush", "biodegradable toothbrush", "organic oral care"],
    "sustainability_filters": ["plastic-free", "organic", "compostable"]
  }
}
```

---

## 🌱 Sustainability Filters

The AI detects and assigns only validated sustainability tags:

| Tag               | Description                          |
|-------------------|--------------------------------------|
| `plastic-free`    | No plastic materials or packaging    |
| `compostable`     | Biodegradable / compostable product  |
| `vegan`           | No animal-derived ingredients        |
| `recycled`        | Made from recycled materials         |
| `organic`         | Organic certified ingredients        |
| `cruelty-free`    | Not tested on animals                |
| `energy-efficient`| Low energy consumption               |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
