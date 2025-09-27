import pool from "../../db/pool.js";

async function query_where(
    table_name,
    {
        where = {},
        strict = false,
        limit = null,
        offset = null,
        order_by = null,
        order_dir = "ASC",
    } = {}
) {
    const keys = Object.keys(where);
    const values = Object.values(where);

    const condition = keys.length
        ? keys.map(k => `${k} = ?`).join(strict ? " AND " : " OR ")
        : "1";

    let sql = `SELECT * FROM ${table_name} WHERE ${condition}`;

    if (order_by) {
        const allowedDirs = ["ASC", "DESC"];
        order_dir = allowedDirs.includes(order_dir.toUpperCase()) ? order_dir.toUpperCase() : "ASC";

        sql += ` ORDER BY ${order_by} ${order_dir}`;
    }

    if (limit !== null) {
        sql += ` LIMIT ${limit}`;
        if (offset !== null) {
            sql += ` OFFSET ${offset}`;
        }
    }

    const [rows] = await pool.execute(sql, values);
    return rows;
}

async function query_join({
                              table,
                              joins = [],
                              where = {},
                              select = '*',
                              limit = null,
                              offset = null,
                              order_by = null,
                              order_dir = 'ASC',
                              group_by = null
                          } = {}) {
    let sql = `SELECT ${select} FROM ${table}`;
    const values = [];

    for (const join of joins) {
        sql += ` ${join.type || 'INNER'} JOIN ${join.table} ON ${join.condition}`;
    }

    const whereConditions = [];
    for (const [key, value] of Object.entries(where)) {
        if (Array.isArray(value)) {
            whereConditions.push(`${key} IN (${value.map(() => '?').join(',')})`);
            values.push(...value);
        } else {
            whereConditions.push(`${key} = ?`);
            values.push(value);
        }
    }

    if (whereConditions.length > 0) {
        sql += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    if (group_by) {
        sql += ` GROUP BY ${group_by}`;
    }

    if (order_by) {
        const allowedDirs = ["ASC", "DESC"];
        order_dir = allowedDirs.includes(order_dir.toUpperCase()) ? order_dir.toUpperCase() : "ASC";
        sql += ` ORDER BY ${order_by} ${order_dir}`;
    }

    if (limit) {
        sql += ` LIMIT ${limit}`;
        if (offset) {
            sql += ` OFFSET ${offset}`;
        }
    }

    const [rows] = await pool.execute(sql, values);
    return rows;
}

export default { query_where, query_join };
