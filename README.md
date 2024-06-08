# Classify Emails

**Classify Emails** is a cutting-edge application that automates the organization of Gmail inboxes using advanced AI. By leveraging secure Google OAuth authentication, it fetches raw email data via the Gmail API and utilizes the Groq AI API to classify emails into categories like Promotions, Social, Updates, and Forums. This intelligent classification system streamlines email management, helping users quickly identify and prioritize important messages. The app's user-friendly interface allows for easy viewing, searching, and filtering of categorized emails, enhancing productivity and reducing the time spent on inbox maintenance. With its robust security and efficient email organization, **Classify Emails** is an essential tool for maintaining a clutter-free and manageable inbox.

## Getting Started

To get started with the development server, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Rajshah1302/classifymail.git
cd classify-emails
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:

Create a `.env` file in the app folder of your project and add the following environment variables:

```env
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_ID=your-google-id
GOOGLE_SECRET=your-google-secret
```
4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The email classification system has the following structure:

1. **src:** This directory contains the source code for the email classification system.

2. **app:** Within the source code directory, the `app` directory holds all the application-specific files.

    - **api:** This directory contains files related to API integration, such as fetching emails from servers or sending classification results.

    - **components:** Here reside the reusable components used across different parts of the application, like UI elements or functional modules.

    - **login:** Contains files related to user authentication and login functionality.

    - **temp:** Temporary files or scripts may be stored in this directory.

    - **utils:** Utility functions or helper modules that support various functionalities within the application.

    - **other page.js related files:** Additional `page.js` related files or configurations may be placed here.

    - **page.js:** The main entry point of the application, where routing and rendering logic are typically defined.



## Features

- **Email Classification**: Classify emails into categories such as Important, Promotions, Social, Marketing, Spam, and General using Groq AI API. You can obtain the Groq AI API key from [Groq AI API Key Creation Page](https://www.groq.com/api-key).
- **User Authentication**: Log in with Google using NextAuth.js.
- **Responsive Design**: Tailored UI with Tailwind CSS and Material-UI.


## Links

- **Home Page**: [https://classifymail-2.onrender.com](https://classifymail-2.onrender.com)
