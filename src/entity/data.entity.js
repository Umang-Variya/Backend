var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "CurrentAffair",
    tableName: "currentaffair",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        state_id: {
            type: "int",
        },
        date_of_current_affair: {
            type: "varchar",
        },
        content: {
            type: "varchar",
        },
        created_at: {
            type: "varchar",
        }
    }
})