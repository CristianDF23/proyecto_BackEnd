import bcrypt, { genSaltSync } from 'bcrypt'

export const createHash = (password) =>{
    return bcrypt.hashSync(password, genSaltSync(10))
}

export const isValidatePassword = (user, password) =>{
    return bcrypt.compareSync(password, user.password)
}

