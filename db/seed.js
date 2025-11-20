import { pool } from "./queries/client.js";
import fs from "fs";
import path from "path";
import url from "url";
import { createEmployee } from "./queries/employees.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

async function seedEmployees() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  await pool.query(schema);

  const employees = [
    { name: "Alice", birthday: "1990-01-10", salary: 60000 },
    { name: "Bob", birthday: "1988-03-25", salary: 72000 },
    { name: "Charlie", birthday: "1992-07-12", salary: 55000 },
    { name: "Diana", birthday: "1985-09-01", salary: 80000 },
    { name: "Ethan", birthday: "1995-11-17", salary: 48000 },
    { name: "Fiona", birthday: "1993-05-22", salary: 67000 },
    { name: "George", birthday: "1989-06-03", salary: 71000 },
    { name: "Hannah", birthday: "1991-12-29", salary: 65000 },
    { name: "Ian", birthday: "1994-02-15", salary: 53000 },
    { name: "Julia", birthday: "1996-08-09", salary: 62000 },
  ];

  for (const emp of employees) {
    await createEmployee(emp);
  }

  console.log("🌱 Database seeded with 10 employees");
  await pool.end();
}

seedEmployees().catch((err) => {
  console.error("Error seeding database:", err);
  pool.end();
});
