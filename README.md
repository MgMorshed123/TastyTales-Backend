"# TastyTales-Backend" 

# 🍽️ Zomato Server  Side 

![diagram-export-12-2-2024-1_14_40-PM](https://github.com/user-attachments/assets/abe04d52-4d94-4cad-9bc7-fdd132b61ff1)


## 🛠️ Tech Stack
- **Frontend:** React, React Router DOM, Tailwind CSS, Framer Motion, CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose


## 🌟 Default Credentials

### **Admin User**  
- **Email:** `smart@gmail.com`  
- **Password:** `12345678`  

### **Normal User**  
- **Email:** `mdarfinji45@gmail.com`  
- **Password:** `12345678`  

---

## 🏗️ Database Models & Interactions

### 🥘 Food Model
- Represents individual food items in the system.
- **Fields:**
  - `name` (String, required) – Name of the food item.
  - `description` (String, required) – Description of the food.
  - `price` (String, required) – Price of the food item.
  - `image` (String, required) – Image URL.
  - `category` (String, required) – Food category.
- **Interactions:**
  - Used when displaying food items to users.
  - Admins can add, delete, or update food items.

### 🛍️ Order Model
- Represents a user's order.
- **Fields:**
  - `userId` (String, required) – Links order to a specific user.
  - `items` (Array, required) – List of ordered food items.
  - `amount` (Number, required) – Total price of the order.
  - `address` (Object, required) – Shipping address.
  - `status` (String, default: "Food Processing") – Order status.
  - `date` (Date, default: `Date.now()`) – Order date.
  - `payment` (Boolean, default: false) – Payment status.
- **Interactions:**
  - Users place orders that are stored in this model.
  - Admins update order status.
  - Payment details are linked to this model.

### 👤 User Model
- Stores user information.
- **Fields:**
  - `name` (String, required) – User's name.
  - `email` (String, required, unique) – User's email.
  - `password` (String, required) – Hashed password.
  - `cartData` (Map of Numbers, default: `{}`) – Stores food items and quantities in the user's cart.
- **Interactions:**
  - Users register and log in.
  - Cart data is saved per user.
  - Orders reference `userId` to track user purchases.

---

## 🚀 Installation & Setup

### 📄 Prerequisites
- Node.js & npm
- MongoDB database

### 🛠️ Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourrepo/zomato-client.git
   cd zomato-client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm start
   ```

---

## 🎯 Conclusion
The **Zomato Client Side** is a user-friendly frontend application providing seamless food ordering and management functionalities for users and admins alike.

