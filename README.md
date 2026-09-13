# Security Operations & Engineering Portfolio

An interactive, enterprise-grade Security Operations Center (SOC) and Security Engineering portfolio web application built with React, Vite, TypeScript, and Tailwind CSS.

---

## 📌 Overview

This platform serves as a live, interactive showcase of security engineering implementations, cloud threat detection workflows, real-time threat intelligence aggregation, and automated GRC frameworks.

### Key Features
* **Interactive System Modules:** Dedicated views for Cloud Incident Response (AWS GuardDuty & CloudTrail), SIEM & Detection Analytics (Elastic Security & MITRE ATT&CK), ApexIntel Threat Intelligence CTI, and SentinelGRC Framework.
* **Mobile-Responsive Architecture:** Fully optimized responsive top navigation with a slide-over mobile drawer for mobile viewports.
* **Secure Telemetry & Contact Channel:** Real-time message storage to Firebase Firestore with dual automated email dispatch via EmailJS (admin alert + auto-acknowledgment) featuring client-side time zone detection.
* **Automated CI/CD Pipeline & Testing:** Comprehensive unit test suite using Vitest and React Testing Library backed by GitHub Actions workflows for automated linting, testing, and production builds.

---

## 🛠️ Tech Stack

* **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React
* **Backend & Storage:** Firebase Firestore, EmailJS API
* **Testing & Quality Assurance:** Vitest, React Testing Library, ESLint, jsdom
* **CI/CD & Hosting:** GitHub Actions, Vercel

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory using `.env.example` as a template:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_admin_alert_template_id
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=your_auto_reply_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

---

## 🧪 Testing & Quality Assurance

Run the test suite locally using Vitest:

```bash
# Run tests interactively in watch mode
npm test

# Single test execution for CI/CD environments
npm run test:run

# Generate code coverage report
npm run test:coverage
```

---

## 🚀 Local Development Setup

1. Clone the repository:

```bash
git clone [https://github.com/bermudd95/your-repo-name.git](https://github.com/bermudd95/your-repo-name.git)
cd your-repo-name
```

2. Install Dependencies 

```bash
npm install
```

3. Start the local development server:

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

---

## 📄 License

Distributed under the MIT License. See ⁠LICENSE⁠ for more information.

