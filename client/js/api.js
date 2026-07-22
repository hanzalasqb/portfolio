// API Helper Functions
class PortfolioAPI {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
  }

  // Generic GET request
  async get(endpoint, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${this.baseURL}${endpoint}?${queryString}` : `${this.baseURL}${endpoint}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('GET Error:', error);
      throw error;
    }
  }

  // Generic POST request
  async post(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('POST Error:', error);
      throw error;
    }
  }

  // Generic PUT request
  async put(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('PUT Error:', error);
      throw error;
    }
  }

  // Generic PATCH request
  async patch(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('PATCH Error:', error);
      throw error;
    }
  }

  // Generic DELETE request
  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.status === 204 ? null : await response.json();
    } catch (error) {
      console.error('DELETE Error:', error);
      throw error;
    }
  }

  // Hero API
  async getHero() {
    return this.get('/hero');
  }

  async updateHero(data) {
    return this.put('/hero', data);
  }

  // About API
  async getAbout() {
    return this.get('/about');
  }

  async updateAbout(data) {
    return this.put('/about', data);
  }

  // Skills API
  async getSkills() {
    return this.get('/skills');
  }

  async getSkill(id) {
    return this.get('/skills', { id });
  }

  async addSkill(data) {
    return this.post('/skills', data);
  }

  async updateSkill(id, data) {
    return this.put(`/skills/${id}`, data);
  }

  async deleteSkill(id) {
    return this.delete(`/skills/${id}`);
  }

  // Projects API
  async getProjects() {
    return this.get('/projects');
  }

  async getProject(id) {
    return this.get('/projects', { id });
  }

  async addProject(data) {
    return this.post('/projects', data);
  }

  async updateProject(id, data) {
    return this.put(`/projects/${id}`, data);
  }

  async deleteProject(id) {
    return this.delete(`/projects/${id}`);
  }

  // Services API
  async getServices() {
    return this.get('/services');
  }

  async getService(id) {
    return this.get('/services', { id });
  }

  async addService(data) {
    return this.post('/services', data);
  }

  async updateService(id, data) {
    return this.put(`/services/${id}`, data);
  }

  async deleteService(id) {
    return this.delete(`/services/${id}`);
  }

  // Experience API
  async getExperience() {
    return this.get('/experience');
  }

  async addExperience(data) {
    return this.post('/experience', data);
  }

  async updateExperience(id, data) {
    return this.put(`/experience/${id}`, data);
  }

  async deleteExperience(id) {
    return this.delete(`/experience/${id}`);
  }

  // Education API
  async getEducation() {
    return this.get('/education');
  }

  async addEducation(data) {
    return this.post('/education', data);
  }

  async updateEducation(id, data) {
    return this.put(`/education/${id}`, data);
  }

  async deleteEducation(id) {
    return this.delete(`/education/${id}`);
  }

  // Testimonials API
  async getTestimonials() {
    return this.get('/testimonials');
  }

  async addTestimonial(data) {
    return this.post('/testimonials', data);
  }

  async updateTestimonial(id, data) {
    return this.put(`/testimonials/${id}`, data);
  }

  async deleteTestimonial(id) {
    return this.delete(`/testimonials/${id}`);
  }

  // Statistics API
  async getStatistics() {
    return this.get('/statistics');
  }

  // Social Links API
  async getSocialLinks() {
    return this.get('/social');
  }

  async updateSocialLinks(data) {
    return this.put('/social', data);
  }

  // Contact API
  async getMessages() {
    return this.get('/contact');
  }

  async sendMessage(data) {
    return this.post('/contact', data);
  }

  async deleteMessage(id) {
    return this.delete(`/contact/${id}`);
  }

  // Settings API
  async getSettings() {
    return this.get('/settings');
  }

  async updateSettings(data) {
    return this.put('/settings', data);
  }
}

// Initialize API instance
const api = new PortfolioAPI();
