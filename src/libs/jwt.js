import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken"

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        try {
            jwt.sign(
                payload,
                TOKEN_SECRET,
                {
                    expiresIn: "1d",
                },
                (err, token) => {
                    if (err) console.log(err)
                    resolve(token)
                })
        } catch (error) {
            reject(error)
        }

    });
}