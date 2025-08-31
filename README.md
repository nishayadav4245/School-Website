## SD World Inter College — Frontend + Backend

A simple full-stack project for SD World Inter College admissions:
- Static frontend (HTML/CSS/JS) with an inquiry form and an admin page.
- Node.js/Express backend with MongoDB (via Mongoose) to store and manage inquiries.

### Tech Stack
- Frontend: Vanilla HTML/CSS/JS
- Backend: Node.js, Express, Mongoose, CORS, body-parser
- Database: MongoDB (Atlas or local)

### Repository Structure
```
/frontend            # Static site (index.html, admin.html, css/, images/)
/sd-college-backend  # Express server and dependencies
```

### Prerequisites
- Node.js 18+ and npm
- MongoDB connection string (Atlas recommended) with a database that the app can access

### Quick Start
1) Start the backend API (port 5000 by default)
```
cd sd-college-backend
npm install
node server.js
```

2) Serve the frontend (any static server)
```
cd ../frontend
# Option A: use a simple HTTP server
python3 -m http.server 8080
# or
npx serve -l 8080 .
```

- Visit the site at http://localhost:8080
- The admin panel is at `frontend/admin.html` (e.g., http://localhost:8080/admin.html) and points to the backend at http://localhost:5000

### Backend Details
- Location: `sd-college-backend/`
- Main file: `server.js`
- Default port: `5000` (override with `PORT` env var)
- Dependencies: see `sd-college-backend/package.json`

MongoDB connection is currently configured in `server.js`. Replace the placeholder connection string with your own.

Recommended: move secrets to an environment variable and update the connection to read from `process.env.MONGODB_URI`.

Example (conceptual):
```js
// server.js (conceptual snippet)
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);
```

Then run with:
```bash
MONGODB_URI="<your-mongodb-uri>" PORT=5000 node server.js
```

### REST API
Base URL: `http://localhost:5000`

- POST `/api/inquiry`
  - Body (JSON):
    ```json
    {
      "student": "string",
      "parent": "string",
      "contact": "10-digit string",
      "email": "string",
      "message": "string"
    }
    ```
  - Responses:
    - 201 `{ "success": true }`
    - 400 `{ "success": false, "error": "..." }`
    - 500 `{ "success": false, "error": "..." }`

- GET `/api/inquiries`
  - Returns: JSON array of inquiries sorted by `createdAt` desc.

- DELETE `/api/inquiry/:id`
  - Deletes a single inquiry by Mongo `_id`.

### Frontend
- Location: `frontend/`
- Entry: `index.html`
- Admin: `admin.html` (fetches from `http://localhost:5000`)
- Styles: `frontend/css/`
- Assets: `frontend/images/`

Serve the directory using any static server. If you open the HTML files directly via the `file://` protocol, some browsers may block requests or assets; prefer running a local HTTP server.

### Development Notes
- CORS is enabled on the backend to allow the frontend origin in development.
- Validate that the backend is running (GET `/`) — it returns a health message.
- If you change the backend port, also update fetch URLs in `frontend/admin.html` (currently `http://localhost:5000`).

### Common Issues
- 4xx/5xx on POST `/api/inquiry`:
  - Ensure all fields are provided and `contact` is a 10-digit number.
  - Ensure MongoDB URI is valid and the network/IP access list allows your machine.

- CORS errors in the browser:
  - Make sure the backend is running and reachable from the frontend’s origin.

### Deployment
- Backend: deploy as a Node.js service (e.g., Render, Railway, Heroku, VPS, or container). Set `MONGODB_URI` and `PORT` accordingly.
- Frontend: host as static files (e.g., Netlify, Vercel static, S3/CloudFront, Nginx). Update admin fetch URLs to your deployed backend.

### License
ISC (see `sd-college-backend/package.json`). Replace as needed.

