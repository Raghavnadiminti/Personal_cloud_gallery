# NodeS3 Gallery

A full-stack gallery project using **Node.js (backend)**, **React (frontend)**, and **AWS S3** for image storage.  
Users can **upload images**, **view all images**, and **delete selected images**. The project uses **signed URLs** for secure access.This was my personal gallery

---

## 🗂 Project Structure

```
nodes3/
 ├─ frontend-gallery/     # React app
 └─ backend/      # Node.js API
```

---

## ⚡ Features

- Upload images to **private S3 bucket**  
- Generate **signed read URLs** (auto-expire)  
- Display all images in a **responsive gallery**  
- Select and **delete images**  
- Fully **private S3 storage**, no public access  

---

## 🛠 Tech Stack

- **Frontend:** React, Axios  
- **Backend:** Node.js, Express, AWS SDK v3  
- **Storage:** AWS S3  

- **Security:** Signed URLs for uploads and reads  

---

## 🔧 Setup Instructions

### 1. Clone repo
```bash
git clone https://github.com/Raghavnadiminti/Personal_cloud_gallery
cd nodes3
```

### 2. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend-gallery
npm install
```









#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm start
```

## 🎨 Frontend

- Responsive **grid gallery**  
- Click image to **select**  
- **Delete selected image** button  

---




## ✅ Future Improvements

- Multi-select delete  
- Pagination for large galleries  
- CloudFront for caching and long-lived signed URLs  
- User authentication  
- Multiple users

---
