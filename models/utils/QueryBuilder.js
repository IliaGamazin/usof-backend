import pool from "../../db/pool.js";

async function query_where(
    table_name,
    {
        where = {},
        where_like = {},
        strict = false,
        limit = null,
        offset = null,
        order_by = null,
        order_dir = "ASC",
    } = {}
) {
    const values = [];
    const conditions = [];

    const keys = Object.keys(where);
    if (keys.length) {
        const whereCondition = keys.map(k => {
            values.push(where[k]);
            return `${k} = ?`;
        }).join(strict ? " AND " : " OR ");
        conditions.push(whereCondition);
    }

    for (const [key, value] of Object.entries(where_like)) {
        conditions.push(`${key} LIKE ?`);
        values.push(`%${value}%`);
    }

    const condition = conditions.length ? conditions.join(" AND ") : "1";

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
                              where_like = {},
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
        if (value === null) {
            whereConditions.push(`${key} IS NULL`);
        } else if (Array.isArray(value)) {
            whereConditions.push(`${key} IN (${value.map(() => '?').join(',')})`);
            values.push(...value);
        } else {
            whereConditions.push(`${key} = ?`);
            values.push(value);
        }
    }

    for (const [key, value] of Object.entries(where_like)) {
        whereConditions.push(`${key} LIKE ?`);
        values.push(`%${value}%`);
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
