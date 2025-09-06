const pool = require("../../db/pool");

async function query_where(table_name,
                           {
                               where = {},
                               strict = false,
                               limit = null
                           } = {}) {
    const keys = Object.keys(where);
    const values = Object.values(where);

    const condition = keys.length
        ? keys.map(k => `${k} = ?`).join(strict ? ' AND ' : ' OR ')
        : '1';
    let sql = `SELECT * FROM ${table_name} WHERE ${condition}`;
    if (limit !== null)
        sql += ` LIMIT ${limit}`;

    const [rows] = await pool.execute(sql, values);
    return rows;
}

module.exports = {query_where};
