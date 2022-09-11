var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "State",
    tableName: "states",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        image: {
            type: "varchar",
        },
        created_at: {
            type: "varchar",
        }
    },
})