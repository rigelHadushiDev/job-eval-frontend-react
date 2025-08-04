# **CodePioneers Career Portal – ReactJS FrontEnd**

A modern recruitment platform that leverages artificial intelligence to streamline applicant evaluation and enhance hiring decisions.

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Project Overview](#project-overview)
- [Demo Videos](#demo-videos)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#️tech-stack)
- [Getting Started](#getting-started)
- [Related Repositories](#related-repositories)
- [Author](#author)

---

## Project Overview

CodePioneers' Career Portal is a demo recruitment platform where applicants submit detailed profile information and can apply for a job position. Applicants build their profiles by entering details about their education, work experience, projects, skills, and english language level. After applying, an AI-powered algorithm in a FastAPI microservice acts as the initial screening layer, scoring each applicant in real time using advanced data science algorithms and a Sentence Transformer model to evaluate their suitability for the job, helping recruiters focus on the most promising candidates first. Recruiters can then review the top-matched applicants, decide who to shortlist, and invite selected candidates for interviews. They can also create, update, and close job postings directly from the platform. Administrators on the other hand can reduce or add more recruitment staff.

---

## Demo Videos

### 🎥 Role-Based Functionality Demonstration

This is a demonstration of the different user roles (applicant, recruiter and admin) and their respective views and permissions in the CodePioneers web application.

[![Recruitment Platform Demonstration](https://img.youtube.com/vi/Ea7ekItOIcs/0.jpg)](https://www.youtube.com/watch?v=Ea7ekItOIcs)

### 🎥 Walkthrough: Applicant Registration + Evaluating algorithm powered by AI

This is a walkthrough video of an applicant registering their education, skills, work experience, projects and English level. A recruiter can then view an AI-powered algorithm evaluation in real time and decide if the applicant is fit for the position published by CodePioneers.

[![Showcasing job evaluation in CodePioneers](https://img.youtube.com/vi/GD_D-e1y1Qw/0.jpg)](https://www.youtube.com/watch?v=GD_D-e1y1Qw)

---

## Features

- **Applicant**:

  - Register and complete profile (education, experience, skills, projects, English level)
  - View and apply for job positions
  - View it's past job applications
  - Manage it's personal details

- **Recruiter**:

  - Create, update, and manage job posts
  - View applicant evaluations done by an algorithm who leverges AI
  - Reject / Accept Applicants
  - Manage it's personal details

- **Admin**:
  - Create, update, and manage job posts
  - View applicant evaluations done by an algorithm who leverges AI
  - Reject / Accept Applicants
  - Manage it's personal details
  - Increase or decrease staff size

---

## Project Structure

```
    src/
    ├── api/ → API calls
    ├── assets/images/ → Static images
    ├── components/ → Reusable React components
    ├── constants/ → Static values and enums
    ├── context/ → Global state using React Context API
    ├── data/ → Static data on the Homepage presentation
    ├── hooks/ → Custom React hooks
    ├── layouts/ → Common layout components
    ├── pages/ → Page-level components (route targets)
    ├── App.jsx → Root component
    ├── main.jsx → Entry point
    ├── index.css → Global styles

```

## Tech Stack

- **Frontend**: ReactJS + Vite
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **API Communication**: Axios
- **Backend**:
  - Spring Boot (Main Backend)
  - FastAPI (AI Evaluation Microservice)
- **AI Model**: Sentence Transformer (`all-MiniLM-L6-v2`)

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- Backend services up and running (see related repos)

### Installation

```bash
git clone https://github.com/yourusername/codepioneers-frontend.git
```

```bash
cd codepioneers-frontend
```

```bash
npm install
```

```bash
npm run dev
```

Visit http://localhost:5173 in your browser.

---

### Related Repositories

- **Main Application Backend**: [job-eval-backend-spring](https://github.com/rigelHadushiDev/job-eval-backend-spring)

- **FastAPI Microservice (AI Scoring Algorithm)**: [job-eval-backend-fastapi](https://github.com/rigelHadushiDev/job-eval-backend-fastapi)

---

### Author

Developed by [@rigelHadushiDev](https://github.com/rigelHadushiDev)
