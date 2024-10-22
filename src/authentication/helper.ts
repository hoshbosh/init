import crypto from 'crypto'
import 'dotenv/config'
const SECRET=process.env.SECRET

// Returns a random string
export const random=()=>{
    return crypto.randomBytes(128).toString('base64')
}

// Hashes based on a given salt and password, returns an encrypted string
export const authentication=(salt:string, password:string)=>{
    // Starting from the inside of createHmac:
    // 1. Join the salt and the password in the format "salt/password"
    // 2. Execute the sha256 hashing algorithm on it
    // 3. I am not sure how update works but it just has to be done, documentation for it sucks
    // 4. Then finally the diget function turns the hmac object into a usable string
    return crypto.createHmac('sha256',[salt, password].join('/')).update(SECRET).digest()
}