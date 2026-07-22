# Hanzala's MERN Stack Developer Portfolio

A modern, production-ready developer portfolio built with Node.js, Express.js, and vanilla JavaScript. Features a beautiful frontend with an admin panel for easy content management.

## Features

### Frontend
- Modern, premium design with glassmorphism effects
- Responsive layout for all devices (mobile, tablet, desktop)
- Smooth animations and transitions
- Dark/Light mode toggle
- Typing animation
- Scroll reveal animations
- Particle background effects
- Smooth scrolling navigation
- Back to top button
- Contact form with JSON storage

### Admin Panel
- Secure login system (Username: `hanzala`, Password: `hanzala@12431222`)
- Dashboard for content management
- Edit hero section, about, and tagline
- CRUD operations for:
  - Skills
  - Projects
  - Services
  - Experience
  - Education
  - Testimonials
- Social media links management
- SEO settings
- Contact message viewer
- Theme customization

### Backend
- RESTful API with full CRUD operations
- JSON-based database (no external database required)
- Express.js server with security middleware
- Session-based authentication
- Rate limiting for API protection
- Input validation and error handling

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup Steps

1. **Extract the project**
   ```bash
   unzip Portfolio.zip
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Access the portfolio**
   - Portfolio: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin`

## Admin Login

- **URL**: `http://localhost:3000/admin`
- **Username**: `hanzala`
- **Password**: `hanzala@12431222`

## Folder Structure

```
Portfolio/
├── client/
│   ├── index.html           # Main portfolio page
│   ├── admin-login.html     # Admin login page
│   ├── admin.html           # Admin dashboard
│   ├── 404.html             # Error page
│   ├── css/
│   │   ├── style.css        # Main styles
│   │   ├── responsive.css   # Responsive styles
│   │   └── animation.css    # Animation styles
│   ├── js/
│   │   ├── app.js           # Main app logic
│   │   ├── animation.js     # Animation effects
│   │   └── api.js           # API helper functions
│   └── images/              # Image assets
├── server/
│   ├── server.js            # Main server file
│   ├── routes/              # API routes
│   ├── database/
│   │   └── db.json          # JSON database
│   └── uploads/             # Uploaded files
├── package.json             # Dependencies
└── README.md                # This file
```

## API Endpoints

### Hero Section
- `GET /api/hero` - Get hero data
- `PUT /api/hero` - Update hero data

### About Section
- `GET /api/about` - Get about data
- `PUT /api/about` - Update about data

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Add new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Add new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Add new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Experience
- `GET /api/experience` - Get all experience entries
- `POST /api/experience` - Add new experience
- `PUT /api/experience/:id` - Update experience
- `DELETE /api/experience/:id` - Delete experience

### Education
- `GET /api/education` - Get all education entries
- `POST /api/education` - Add new education
- `PUT /api/education/:id` - Update education
- `DELETE /api/education/:id` - Delete education

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Add new testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

### Social Links
- `GET /api/social` - Get social links
- `PUT /api/social` - Update social links

### Contact
- `GET /api/contact` - Get all messages
- `POST /api/contact` - Send new message
- `DELETE /api/contact/:id` - Delete message

### Settings
- `GET /api/settings` - Get all settings
- `PUT /api/settings` - Update settings

## Database Structure

The `db.json` file contains the following data:

```json
{
  "adminCredentials": { "username": "...", "password": "..." },
  "portfolioInfo": { "owner": "...", "profession": "...", "tagline": "...", "description": "..." },
  "hero": { "title": "...", "subtitle": "..." },
  "about": { "title": "...", "content": "..." },
  "skills": [{ "id": 1, "name": "...", "level": "..." }],
  "projects": [{ "id": 1, "name": "...", "description": "...", "image": "..." }],
  "services": [{ "id": 1, "name": "...", "description": "..." }],
  "experience": [{ "id": 1, "title": "...", "company": "...", "years": "..." }],
  "education": [{ "id": 1, "degree": "...", "university": "...", "years": "..." }],
  "testimonials": [{ "id": 1, "name": "...", "feedback": "..." }],
  "socialLinks": { "github": "...", "linkedin": "...", "email": "..." },
  "theme": { "colors": { "primary": "...", "secondary": "..." }, "darkMode": false },
  "seo": { "metaTitle": "...", "metaDescription": "...", "keywords": "..." },
  "messages": []
}
```

## Customization

### Change Admin Credentials
Edit `server/database/db.json` and update the `adminCredentials` section:

```json
"adminCredentials": {
  "username": "your-username",
  "password": "your-password"
}
```

### Change Theme Colors
Edit `client/css/style.css` and modify the CSS variables:

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --accent: #00d4ff;
}
```

### Add More Content
Use the admin panel to add skills, projects, services, experience, education, and testimonials.

## Security Features

- Helmet.js for HTTP headers security
- Express Session for authentication
- Rate limiting to prevent abuse
- Input validation
- Protected admin routes
- CORS support

## Development

To run in development mode with auto-reload:

```bash
npm run dev
```

This requires `nodemon` to be installed (included in devDependencies).

## Deployment

To deploy this portfolio:

1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Set up a reverse proxy (nginx/Apache)
4. Configure HTTPS
5. Update the database backup strategy

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, set a different port:
```bash
PORT=3001 npm start
```

### Admin Login Not Working
Check that the credentials in `db.json` match what you're entering.

### API Errors
Check the browser console and server logs for detailed error messages.

## Support

For issues or questions, please contact: hanzala@example.com

## License

This project is provided as-is for personal use.

---

**Built with ❤️ by Hanzala**
