const pool = require("../../db/pool")
const QueryBuilder = require("./QueryBuilder");

class Model {
    static table_name = "";
    constructor(attributes = {}) {
        Object.assign(this, attributes);
    }

    static async find(where) {
        const rows = await QueryBuilder.query_where(this.table_name, {where, strict: true, limit: 1});
        return rows.length ? new this(rows[0]) : null;
    }

    static async get_all(where) {
        const rows = await QueryBuilder.query_where(this.table_name, {where});
        return rows.map(row => new this(row));
    }

    static async get_all_strict(where) {
        const rows = await QueryBuilder.query_where(this.table_name, {where, strict: true});
        return rows.map(row => new this(row));
    }

    static async get_all_paged({
                                   where = {},
                                   page = 1,
                                   limit = 10,
                                   strict = false,
                                   order_by = "id",
                                   order_dir = "ASC",
                               } = {}) {
        const offset = (page - 1) * limit;

        const [countRows] = await pool.execute(
            `SELECT COUNT(*) AS count FROM ${this.table_name}`
        );
        const total = countRows[0].count;
        const total_pages = Math.ceil(total / limit);

        const rows = await QueryBuilder.query_where(this.table_name, {
            where,
            strict,
            limit,
            offset,
            order_by,
            order_dir,
        });

        return {
            data: rows.map(row => new this(row)),
            pagination: { page, limit, total, total_pages, order_by, order_dir },
        };
    }

    static async get_joined_paged({
                                      joins = [],
                                      where = {},
                                      page = 1,
                                      limit = 10,
                                      order_by = "id",
                                      order_dir = "ASC",
                                      select = null,
                                      group_by = null   // <-- NEW
                                  } = {}) {
        const offset = (page - 1) * limit;
        const selectFields = select || `${this.table_name}.*`;

        const countResult = await QueryBuilder.query_join({
            table: this.table_name,
            joins,
            where,
            select: `COUNT(DISTINCT ${this.table_name}.id) as count`
        });
        const total = countResult[0].count;
        const total_pages = Math.ceil(total / limit);

        const rows = await QueryBuilder.query_join({
            table: this.table_name,
            joins,
            where,
            select: selectFields,
            limit,
            offset,
            order_by,
            order_dir,
            group_by
        });

        return {
            data: rows.map(row => new this(row)),
            pagination: { page, limit, total, total_pages, order_by, order_dir }
        };
    }

    static async exists(where) {
        return await this.find(where) != null;
    }

    async delete() {
        const sql = `DELETE FROM ${this.constructor.table_name} WHERE id = ?`;
        await pool.execute(sql, [this.id]);
    }

    async save() {
        const fields = Object.keys(this).filter(key => key !== "id");
        const values = fields.map(key => this[key]);

        if (this.id) {
            const updates = fields.map(field => `${field} = ?`).join(", ");
            const sql = `UPDATE ${this.constructor.table_name} SET ${updates} WHERE id = ?`;
            await pool.execute(sql, [...values, this.id]);
        }
        else {
            const sql = `INSERT INTO ${this.constructor.table_name} (${fields.join(", ")}) VALUES (${fields.map(() => "?").join(", ")})`;
            const [rows] = await pool.execute(sql, values);
            this.id = rows.insertId;
        }

        return this.id;
    }
}

module.exports = Model;
