# Responsive Ecommerce Website (Flask + MongoDB)

This is a small responsive e-commerce demo implemented with a Flask backend and a static frontend (templates + static files). The app uses MongoDB for persistence (users, products, cart) and GridFS for storing uploaded product images.

Key features
- User registration, login, logout
- Password reset (email or console fallback)
- Simple cart APIs (add/get/update/remove/clear)
- Product CRUD endpoints intended for admin users
- Admin UI (protected by a user with role "admin")

API endpoints (selected)
- POST /api/register            { name, email, password }
- POST /api/login               { email, password }
- POST /api/logout
- POST /api/forgot-password     { email }
- POST /api/reset-password      { email, code, newPassword }
- POST /api/verify-reset-code   { email, code }
- GET  /api/check-auth
- GET  /api/products
- GET  /api/products/<id>/image
- POST /api/products            (admin, multipart or JSON)
- PUT  /api/products/<id>       (admin)
- DELETE /api/products/<id>     (admin)
- POST /api/cart/add            (requires auth)
- GET  /api/cart/get            (requires auth)

Requirements
- Python 3.10+ recommended
- MongoDB (local or Atlas)

Included in this repo
- Flask backend: `app.py`
- Scripts: `create_admin.py` (create/update admin), `seed_products.py` (seed product data)
- data/products.json and data/mobile_phones.csv (sample data)

Quick start
1. Create and activate a virtual environment

   - Windows (PowerShell):

     ```powershell
     python -m venv .venv; .\\.venv\\Scripts\\Activate.ps1
     ```

2. Install Python dependencies

   ```powershell
   pip install -r requirements.txt
   ```

3. Configure environment variables

   Create a `.env` file in the project root or set environment variables in your shell. Minimum recommended vars:

   - FLASK_SECRET_KEY (used for sessions)
   - MONGO_URI (default: mongodb://localhost:27017/)
   - MONGO_DB_NAME (default: phonestoredb)
   - SMTP_SERVER / SMTP_FROM_EMAIL / SMTP_FROM_PASSWORD (optional: for real email delivery)

   Example `.env`:

   ```text
   FLASK_SECRET_KEY=change-me
   MONGO_URI=mongodb://localhost:27017/
   MONGO_DB_NAME=phonestoredb
   SMTP_SERVER=smtp.gmail.com
   SMTP_FROM_EMAIL=you@example.com
   SMTP_FROM_PASSWORD=app-password
   SMTP_USE_TLS=true
   ```

   Note: If SMTP credentials are not provided, password reset codes are printed to the server console to support development/testing.

4. Start MongoDB (or configure Atlas)

   - Local: run `mongod` or use the MongoDB service.

5. Seed products (optional)

   ```powershell
   python seed_products.py
   ```

6. Create an admin user (optional, required for admin UI/endpoints)

   ```powershell
   python create_admin.py
   ```

7. Run the app

   ```powershell
   python app.py
   ```

   The app listens on port 5000 by default and will print connection status to MongoDB on startup.

Testing and usage
- Open http://localhost:5000/ to view the site.
- Use the `/login/` page to sign in.
- The `create_admin.py` script will create/update a user with role "admin" in the users collection.
- To test password reset: POST to `/api/forgot-password` with {"email": "..."}. If SMTP isn't configured, the code will be logged to the server console.

Notes and troubleshooting
- If MongoDB connection fails, `app.py` prints an error and continues in a degraded state (collections set to None). Ensure `MONGO_URI` and the MongoDB server are reachable.
- The app creates unique indexes on `users.email` and `products.id` when applicable.
- Uploaded product images are stored in GridFS. If GridFS isn't available (no DB), image uploads will fail.

Developer tips
- The repository contains small client-side JS under `static/js/` and templates in `templates/`.
- To run tests (if present), inspect `test_*.py` files and run them with pytest. There are a few test files included (e.g. `test_api.py`).

License & Credits
- MIT-style demo for educational use.

If you'd like, I can also:
- Add a short CONTRIBUTING section
- Add example Postman collection or curl examples for key endpoints
- Create a minimal Dockerfile and docker-compose for MongoDB + app
# Responsive Ecommerce Website Using HTML CSS JAVASCRIPT

## Backend Auth with MongoDB

This project uses Flask for the backend and MongoDB for authentication. The frontend calls these endpoints:

- POST /api/register { name, email, password }
- POST /api/login { email, password }
- POST /api/logout
- POST /api/forgot-password { email }
- POST /api/reset-password { email, code, newPassword }
- GET  /api/check-auth

### Configure Environment

Create a .env file or set environment variables:

- FLASK_SECRET_KEY=change-me
- MONGO_URI=mongodb://localhost:27017/
- MONGO_DB_NAME=phone_website
- SMTP_SERVER=smtp.gmail.com
- SMTP_PORT=465
- SMTP_FROM_EMAIL=your_email@example.com
- SMTP_FROM_PASSWORD=your_app_password

If SMTP credentials are not set, the reset code will be printed to the server console in development.

### Install dependencies

Use Python 3.12+ if possible.

1. Create a virtual environment
2. Install requirements

### Run

Start a local MongoDB instance (or use MongoDB Atlas), then run the Flask app.

The app will create a unique index on users.email automatically.
