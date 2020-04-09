import { Request } from 'express'
import { QueryTypes } from "sequelize"
const jwt = require('jsonwebtoken');
import { sign } from "jsonwebtoken";
import config from "../config";
import { sequelize } from '../utils'
const md5 = require('md5');

export class AuthController {
    public async index(req: Request) {
        const { authId, password } = req.body;

        const [user] = await sequelize.query('SELECT * from members where emailaddress=? and md5pass =?',
            { replacements: [authId, md5(password)], type: QueryTypes.SELECT }
        )

        console.log(user);

        // const token = sign(user.toJSON(), config.JWT_SECRET, { expiresIn: '12h' });

        return { success: true };
    }
}