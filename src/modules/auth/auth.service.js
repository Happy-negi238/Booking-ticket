import { userTable } from "./auth.models.js";
import { db } from '../../index.js';
import ApiErros from "../../common/utils/api-error.js";
import { createHmac, randomBytes } from "node:crypto"
import { eq } from "drizzle-orm";
import { generateAccessToken, generateRefereshToken } from "../../common/utils/jwt.utils.js";
import pool from "../../common/config/db.config.js";


const hash = (salt, password) => {
    return createHmac("sha256", salt).update(password).digest("hex");
}

const registerService = async (data) => {
    const { firstName, lastName, email, password } = data;
    const Userdata = await db.select().from(userTable).where(eq(userTable.email, email));

    if (Userdata.length > 0) throw ApiErros.conflict("Already registered");

    const salt = randomBytes(32).toString("hex");
    const hashPassword = hash(salt, password);

    const user = await db.insert(userTable).values({
        firstName,
        lastName,
        email,
        password: hashPassword,
        salt
    }).returning({ id: userTable.id });

    return { user, status: 201 };
}

const loginService = async ({ email, password }) => {
    const [userData] = await db.select().from(userTable).where(eq(userTable.email, email));

    if (!userData) throw ApiErros.conflict("User with this email not found");
    const userSalt = userData.salt;

    if (hash(userSalt, password) !== userData.password) throw ApiErros.conflict("Incorrect email and password");

    const accessToken = generateAccessToken(userData.id);
    const refreshToken = generateRefereshToken(userData.id);

    const hashRefreshToken = hash(userData.email, refreshToken);
    await db.update(userTable).set({ isVerify: true, refreshToken: hashRefreshToken }).where(eq(userTable.email, email));

    return { id: userData.id, accessToken, refreshToken, status: 200 }
}

const seatsService = async () => {
    const result = await pool.query("select * from seats"); // equivalent to Seats.find() in mongoose
    return { "rows": result.rows };
}

const seatBookedService = async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.params.name;
        // payment integration should be here
        // verify payment
        const conn = await pool.connect(); // pick a connection from the pool
        //begin transaction
        // KEEP THE TRANSACTION AS SMALL AS POSSIBLE
        await conn.query("BEGIN");
        //getting the row to make sure it is not booked
        /// $1 is a variable which we are passing in the array as the second parameter of query function,
        // Why do we use $1? -> this is to avoid SQL INJECTION
        // (If you do ${id} directly in the query string,
        // then it can be manipulated by the user to execute malicious SQL code)
        const sql = "SELECT * FROM seats where id = $1 and isbooked = 0 FOR UPDATE";
        const result = await conn.query(sql, [id]);

        //if no rows found then the operation should fail can't book
        // This shows we Do not have the current seat available for booking
        if (result.rowCount === 0) {
            // res.send({ error: "Seat already booked" });
            return { error: "Seat already booked" };
        }
        //if we get the row, we are safe to update
        const sqlU = "update seats set isbooked = 1, name = $2 where id = $1";
        const updateResult = await conn.query(sqlU, [id, name]); // Again to avoid SQL INJECTION we are using $1 and $2 as placeholders

        //end transaction by committing
        await conn.query("COMMIT");
        conn.release(); // release the connection back to the pool (so we do not keep the connection open unnecessarily)
        // res.send(updateResult);
        return updateResult;
    } catch (ex) {
        console.log(ex);
        res.send(500);
    }
}

export { registerService, loginService, seatsService, seatBookedService }
