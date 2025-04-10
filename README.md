## Demo Video

https://github.com/user-attachments/assets/4acf9f03-983f-42f5-8082-0cc4dd15135a

#  completeBlogApp Project

A full-featured blog application built using React and Appwrite, with robust authentication and clean state management using Redux. This project aims to deliver quality code and modular architecture that can scale.

---

##  Dependencies

- **react**: Core UI library.
- **react-dom**: Entry point for rendering UI components in the browser.
- **redux**: For predictable state management across components.
- **react-router-dom**: To handle multiple routes like login, signup, and dashboard views.
- **appwrite**: Backend as a Service for authentication, database, storage, and more.
- **tailwindcss**: A CSS framework for fast and responsive design.
- **@reduxjs/toolkit**: Way to write less Boilerplate code.
- **react-hook-form**: Efficient form handling in React with minimal re-renders.
- **@tinymce/tinymce-react**: Rich Text Editor for writing the blog content. 

---

##  Appwrite Services Used

The project integrates multiple Appwrite services:

- **Account** – Handles login, signup, session creation, and user authentication.
- **Databases** – Stores blog post content and user-related metadata.
- **Storage** – Manages file uploads (like blog images).
- **Users** – Retrieves and manages user profiles.

---

##  File Structure

```
 completeBlogApp
├─ src
│  ├─ conf
│  │  └─ conf.js               # Access .env variables safely
│  ├─ store                    # Redux setup
│  │  ├─ store.js
│  │  └─ authSlice.js
│  ├─ appwrite                 # Abstraction for Appwrite service classes
│  │  ├─ config.js             # DB and storage-related functions
│  │  └─ auth.js               # Auth and user-related logic
│  ├─ components               # Reusable UI components
│  │  ├─ Header
│  │  │  ├─ Header.jsx
│  │  │  └─ LogoutBtn.jsx
│  │  ├─ Footer
│  │  │  └─ Footer.jsx
│  │  ├─ post-form
│  │  │  └─ PostForm.jsx
│  │  ├─ container
│  │  │  └─ Container.jsx
│  │  ├─ AuthLayout.jsx
│  │  ├─ Button.jsx
│  │  ├─ index.jsx
│  │  └─ Input.jsx
│  ├─ pages                    # Route-level components (pages)
│  │  ├─ AddPost.jsx
│  │  ├─ Home.jsx
│  │  ├─ EditPost.jsx
│  │  └─ Login.jsx
├─ App.jsx
└─ main.jsx


```
> **Notes:**
> - `conf.js`: Reads and exports `.env` variables. Prevents app crashes due to delay in loading or type misreading.
> - `store.js` & `authSlice.js`: Handle Redux state configuration and authentication logic.
> - `appwrite/config.js`: Stores Appwrite setup (projectId, endpoint, etc.)
> - `auth.js`: All authentication-related functions using Appwrite's SDK.
> - `components`: Reusable UI elements like header, footer, forms.
> - `pages`: Actual routes/screens like `Login`, `AddPost`, `Home`, etc.

---

#  Service Classes (/appwrite)

All backend-related logic is abstracted into service classes under the appwrite folder. This encapsulation offers major benefits:

- If we decide to switch from Appwrite to another backend (like Firebase, Supabase, or a custom API), we only need to update logic here — not across the app.
- Classes return class instances instead of raw class definitions — meaning you don't need to instantiate objects every time.

```
import authServices from "../appwrite/auth";


authServices.login(data);    // no need for `new AuthService()`
```

This makes the code cleaner, less error-prone, and easier to maintain.

---

#  What Makes This Codebase Quality

- **Conditional Rendering**: Dynamically render components like Login, Header, or Dashboard based on user state.
- **Protected Routes**: Certain routes are only accessible when the user is authenticated.
- **Modular Design**: Code is separated into atomic components and utility classes for easy scalability.
- **Form Handling with Validation**: Forms use react-hook-form for real-time validation and performance.
- **Centralized State Management**: Redux Toolkit is used to manage user auth and post state efficiently.
- **Separation of Concerns**: UI, state, and services are kept decoupled.
- **Scalable Folder Structure**: Organized project structure for easy onboarding and future updates.

---
