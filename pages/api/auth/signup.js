import {connectToDatabase} from '../../../lib/db'
import {hashPassword} from '../../../lib/auth'
async function handle(req,res){

    if(req.method !== 'POST'){
        return
    }

    const data =req.body

    const {email, password} = data

    if(!email || !email.includes('@') || !password || password.trim().length < 7){

        
        res.status(422).json({message:'Invalid input -password should have at lesat 7 character'})
        return
    }

    const client = await  connectToDatabase()

    const hashedPassword = await hashPassword(password)

    const db = client.db()

    const userExisting = await db.collection('users').findOne({
        email:email
    })

    if(userExisting){
        res.status(422).json({message:'Email already exists'})
        client.close()
        return
    }

    const result = await db.collection("users").insertOne({
        email:email,
        password:hashedPassword 
    })

    res.status(201).json({message:'Created user successfully'})
}

export default handle;