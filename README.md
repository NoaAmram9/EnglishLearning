# EnglishLearning
English learning - Frontend
# English Learning AI App 🎓

אפליקציית React מתקדמת ללימוד אנגלית עם בוט AI חכם. האפליקציה מאפשרת לימוד אינטראקטיבי עם תמיכה בהקלטה קולית, צ'אט טקסט ופיצרים נוספים.

## ✨ פיצרים

- 💬 צ'אט אינטראקטיבי עם AI
- 🎤 הקלטה קולית עם זיהוי דיבור
- 🔊 השמעת תשובות הבוט
- 📊 מעקב אחר התקדמות (XP, רמה, רצף ימים)
- 🚀 כפתורי פעולות מהירות
- 🎨 עיצוב מודרני ומותאם לנייד
- 📱 תמיכה מלאה בנייד

## 🚀 התקנה והרצה

### דרישות מוקדמות

- Node.js (גרסה 16 ומעלה)
- npm או yarn

### שלבי התקנה

1. **יצירת פרויקט React חדש:**
```bash
npx create-react-app english-learning-ai
cd english-learning-ai
```

2. **התקנת תלויות נוספות:**
```bash
npm install lucide-react
```

3. **החלפת קובץ App.js:**
   - מחק את התוכן של `src/App.js`
   - העתק את הקוד מהקומפוננטה למעלה
   - שמור את הקובץ

4. **עדכון App.css (אופציונלי):**
```css
/* src/App.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

5. **התקנת Tailwind CSS:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

6. **עדכון tailwind.config.js:**
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

7. **הרצת האפליקציה:**
```bash
npm start
```

## 🏗️ מבנה הפרויקט

```
src/
├── App.js                 # הקומפוננטה הראשית
├── components/           # תיקיית קומפוננטות (עבור הרחבות עתידיות)
│   ├── Header.js        # חלק עליון
│   ├── ChatWindow.js    # חלון הצ'אט
│   ├── MessageBubble.js # בועות הודעות
│   └── InputArea.js     # אזור הקלט
├── hooks/               # React hooks מותאמים אישית
├── utils/              # פונקציות עזר
└── styles/             # קבצי CSS נוספים
```

## 🧩 הסבר הקומפוננטות

### 1. `EnglishLearningApp` - הקומפוננטה הראשית
- מנהלת את כל המצב הגלובלי של האפליקציה
- מכילה את לוגיקת הצ'אט, הקלטה ותקשורת עם AI

### 2. `Header` - כותרת האפליקציה
- מציגה לוגו, שם האפליקציה
- מציגה סטטיסטיקות משתמש (רמה, נקודות, רצף)
- כפתור הגדרות

### 3. `ChatWindow` - חלון הצ'אט
- מציג את כל ההודעות
- מטפל בגלילה אוטומטית
- מעביר הודעות לקומפוננטת MessageBubble

### 4. `MessageBubble` - בועת הודעה
- מציגה הודעות משתמש ובוט
- כולל כפתור להשמעה לבוט
- מבדיל בין הודעות קוליות לטקסטואליות

### 5. `InputArea` - אזור הקלט
- טקסט אריה עם אפשרות שליחה
- כפתור הקלטה עם אנימציות
- כפתורי פעולות מהירות

### 6. `QuickActionButton` - כפתורי פעולה מהירה
- כפתורים למילוי מהיר של שאלות נפוצות

## 🔧 חיבור לצד שרת (Backend)

### מבנה API מומלץ:

```javascript
// utils/api.js
const API_BASE_URL = 'http://localhost:3001/api';

export const sendMessageToAI = async (message) => {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      message,
      userId: localStorage.getItem('userId'),
      timestamp: new Date().toISOString()
    })
  });
  
  return await response.json();
};

export const sendVoiceToAI = async (audioBlob) => {
  const formData = new FormData();
  formData.append('audio', audioBlob);
  formData.append('userId', localStorage.getItem('userId'));
  
  const response = await fetch(`${API_BASE_URL}/voice`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  });
  
  return await response.json();
};
```

### עדכון הקוד לחיבור עם השרת:

```javascript
// בתוך handleSendMessage
const handleSendMessage = async () => {
  if (inputText.trim()) {
    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
    
    try {
      const aiResponse = await sendMessageToAI(inputText);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: aiResponse.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // הודעת שגיאה למשתמש
    }
  }
};
```

## 🎯 הרחבות מוצעות

### 1. מערכת אימות
```bash
npm install firebase
# או
npm install auth0-js
```

### 2. מעקב התקדמות
- שמירת נתונים ב-localStorage או database
- גרפים של התקדמות
- מערכת תגמולים

### 3. תמיכה בשפות נוספות
```bash
npm install react-i18next
```

### 4. התראות
```bash
npm install react-toastify
```

## 🚀 פרסום (Deployment)

### Netlify:
```bash
npm run build
# העלה את תיקיית build ל-Netlify
```

### Vercel:
```bash
npm install -g vercel
vercel
```

## 🐛 פתרון בעיות נפוצות

### בעיה: Tailwind CSS לא עובד
```bash
# וודא שהתקנת נכון:
npm install -D tailwindcss postcss autoprefixer
# ובדק את tailwind.config.js
```

### בעיה: מיקרופון לא עובד
- וודא שהאתר רץ ב-HTTPS או localhost
- בדק הרשאות מיקרופון בדפדפן

### בעיה: אייקונים לא מופיעים
```bash
npm install lucide-react
# ווודא import נכון
```

## 📞 תמיכה

לשאלות או בעיות, ניתן ליצור issue בפרויקט או לפנות לתמיכה.

## 📄 רישיון

MIT License
