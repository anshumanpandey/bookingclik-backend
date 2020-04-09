import { Sequelize } from "sequelize"

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite

// Option 2: Passing parameters separately (other dialects)
export const sequelize = new Sequelize(`mysql://rightcar_db:b239avp@151.236.32.180:3306/rightcar_db`)

