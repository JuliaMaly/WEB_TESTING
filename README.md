# Lab 4 – Testing and Automation

## Description

This project extends previous labs by adding testing, performance analysis, and automation.

The application is a fullstack system consisting of:
- Backend: Node.js (Express REST API)
- Frontend: React (Vite)

Lab 4 focuses on:
- Unit testing
- Integration testing
- Code coverage
- Performance testing
- Automated data scraping

---

## Technologies

- Node.js  
- Express.js  
- React (Vite)  
- Jest  
- Supertest  
- Artillery  
- Selenium WebDriver  

---

## Testing

### Unit & Integration Tests

Tests are implemented using **Jest** and **Supertest**.

Covered functionality:
- Authentication endpoints  
- Product CRUD operations  
- Filtering logic  
- Integration scenario (User → Product → Order)  

Run tests:

```bash
cd lab2
npm test
```

---

## Code Coverage

Coverage report is generated automatically.

**Results:**
- Statements: ~64%  
- Branches: ~52%  
- Functions: ~30%  
- Lines: ~70%  
<img width="857" height="265" alt="image_2026-05-03_22-54-30" src="https://github.com/user-attachments/assets/228b5860-0a3f-44e4-be34-bacb2d3e59ae" />

Requirement (**≥30%**) is satisfied.

<img width="366" height="93" alt="image_2026-05-03_22-54-40" src="https://github.com/user-attachments/assets/59f5f49d-6c94-4a53-95bb-e2870543d6a4" />


## Performance Testing

Performance testing is implemented using **Artillery**.

**Scenario includes:**
- User login  
- Creating a product  
- Fetching products  
- Deleting the created product (using returned ID)  

**Run:**

```bash
cd lab2
npm start
```

In another terminal:

```bash
npm run performance
```

---

## Selenium Automation (Scraping)

Automated browser interaction is implemented using **Selenium WebDriver**.

**The script performs:**
- Opening the frontend application  
- User authentication  
- Navigation to Products page  
- Data extraction from UI  

**Run:**

```bash
cd frontend-lab3
node tests/scrape.cjs
```

---

## Project Structure

```text
web/
│
├── lab2/                # Backend
│   ├── routes/
│   ├── data/
│   ├── tests/           # Jest tests
│   └── performance.yml  # Artillery scenario
│
├── frontend-lab3/       # Frontend
│   ├── src/
│   └── tests/
│       └── scrape.cjs   # Selenium script
│
└── README.md
```
