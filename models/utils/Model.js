const pool = require("../../db/pool")
const QueryBuilder = require("./QueryBuilder");

class Model {
    static table_name = "";
    constructor(attributes = {}) {
        Object.assign(this, attributes);
    }

    static async find(where) {
        const rows = await QueryBuilder.query_where(this.table_name, {where, limit: 1});
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
    }
}

module.exports = Model;
