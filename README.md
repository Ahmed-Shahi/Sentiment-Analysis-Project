# Sentiment Analysis Web Application

A modern, full-stack web application that predicts the sentiment (Positive, Negative, or Neutral) of user comments using a Machine Learning model (Logistic Regression) and Natural Language Processing (NLP).

## Features
- **Real-time Prediction**: Analyze comments instantly.
- **UI**: Clean, modern, and responsive design.
- **NLP Preprocessing**: Implements stemming and stopword removal for higher accuracy.
- **Node.js Backend**: Express.js server.
- **Python ML Bridge**: Connects Node.js with Python-trained models.

---

## Technology Stack
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Machine Learning**: Python 3, Scikit-learn, Pandas, NLTK
- **Bridge**: Child Process (Node-to-Python communication)

---

## Prerequisites
Before running the project, ensure you have the following installed:
1. **Node.js** (v14 or higher)
2. **Python 3.x**
3. **Python Libraries**:
   ```bash
   pip install scikit-learn pandas nltk
   ```

---

## Installation & Setup

### 1. Clone the repository
Navigate to your project folder:
```bash
cd "Sentiment-Analysis-Project"
```

### 2. Install Node.js dependencies
```bash
npm install
```

### 3. Ensure ML Files exist
Make sure the following files are in the root directory:
- `model.pkl` (Trained Logistic Regression model)
- `vectorizer.pkl` (TF-IDF Vectorizer)

---

## How to Run

1. **Start the Server**:
   ```bash
   npm start
   ```
2. **Access the Website**:
   Open your browser and go to: `http://localhost:5000`

---

## 📂 Project Structure
```text
├── public/                 # Frontend files
│   ├── index.html          # UI Structure
│   ├── style.css           # Custom Styling
│   └── script.js           # Frontend Logic
├── predict.py              # Python inference script
├── server.js               # Node.js Express server
├── model.pkl               # Saved ML Model
├── vectorizer.pkl          # Saved TF-IDF Vectorizer
├── package.json            # Node.js configuration
└── README.md               # Documentation
```

---

## How it Works
1. The user enters a comment on the website.
2. The frontend sends a `POST` request to the Node.js API (`/api/predict`).
3. Node.js triggers `predict.py` via a child process, passing the comment as an argument.
4. Python cleans the text (stemming, lowercasing, removing stopwords) and predicts the sentiment using the `.pkl` files.
5. The result is sent back to Node.js as JSON, which then updates the website UI.

---

This project was developed for the **Introduction to Data Science** Lab Project.
