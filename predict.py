import sys
import pickle
import re
import json
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

try:
    stopwords.words('english')
except LookupError:
    nltk.download('stopwords')

ps = PorterStemmer()

def stemming(content):
    sc = re.sub('[^a-zA-Z]', ' ', content)
    sc = sc.lower()
    sc = sc.split()
    # Remove stopwords and stem
    sc = [ps.stem(word) for word in sc if not word in stopwords.words("english")]
    # Join back to string
    sc = " ".join(sc)
    return sc

def load_models():
    try:
        model = pickle.load(open('model.pkl', 'rb'))
        vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))
        return model, vectorizer
    except Exception as e:
        print(json.dumps({"error": f"Error loading models: {str(e)}"}))
        sys.exit(1)

def predict(text):
    model, vectorizer = load_models()
    stemmed_text = stemming(text)
    
    # Vectorize (Input must be in a list)
    vectorized_text = vectorizer.transform([stemmed_text])    
    prediction = model.predict(vectorized_text)[0]
    label_map = {
        -1: "negative",
        0: "neutral",
        1: "positive"
    }
    
    result = label_map.get(prediction, "unknown")
    return result

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input text provided"}))
        sys.exit(1)
    
    input_text = sys.argv[1]
    prediction = predict(input_text)
    
    # Output as JSON so Node.js can easily parse it
    print(json.dumps({"sentiment": prediction, "input": input_text}))
