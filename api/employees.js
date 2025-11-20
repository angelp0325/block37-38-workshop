import db from "./client.js";

// CREATE
export async function createEmployee({ name, birthday, salary }) {
  const result = await db.query(
    `INSERT INTO employees (name, birthday, salary)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [name, birthday, salary]
  );
  return result.rows[0];
}

// READ
export async function getEmployees() {
  const result = await db.query(`SELECT * FROM employees ORDER BY id;`);
  return result.rows;
}

export async function getEmployee(id) {
  const result = await db.query(`SELECT * FROM employees WHERE id = $1;`, [id]);
  return result.rows[0];
}

// UPDATE
export async function updateEmployee(id, { name, birthday, salary }) {
  const result = await db.query(
    `UPDATE employees
     SET name = $1, birthday = $2, salary = $3
     WHERE id = $4
     RETURNING *;`,
    [name, birthday, salary, id]
  );
  return result.rows[0];
}

// DELETE
export async function deleteEmployee(id) {
  await db.query(`DELETE FROM employees WHERE id = $1;`, [id]);
}
