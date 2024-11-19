# Contacts App

This is a contact management app built using the following technologies:

- **React**: For building the user interface.
- **Vite**: A fast and optimized build tool.
- **Tailwind CSS**: For utility-first styling.
- **shadcn/ui**: For additional UI components.
- **React Query**: For managing server state and caching.

## Getting Started

To run the app locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-repo/contacts-app.git
```

2. Navigate into the project directory:

```bash
cd contacts-app
```

3. Install the dependencies:

```bash
npm install
```

4. Create a .env.local file in the root directory and provide the necessary environment variables

5. Start the development server:

```bash
npm run dev
```

6. To run e2e test in local environment copy `.env.test.example` file into `.env.test` and execute:

```bash
npm run dev
npm run local-test:e2e
```

6. To run unit tests:

```bash
npm run test:unit
```

7. To run `eslint` and `prettier`:

```bash
npm run lint
npm run format
```
