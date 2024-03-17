import userModels from "../models/userModels.js"
import { createHash, isValidatePassword } from "../../../utils/bcrypt.js"

class UserManagerMongo {

    async registerUser(userData) {
        try {
            let user = await userModels.find()
            let existUser = user.find(u => u.email === userData.email)
            if (!existUser) {
                let userNew = {
                    email: userData.email,
                    password: createHash(userData.password),
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    phone: userData.phone,
                    age: userData.age,
                    rol: 'Usuario'
                }
                if (userData.email === 'adminCoder@coder.com' && userData.password === 'adminCod3r123') {
                    userNew.rol = 'Admin'
                }
                const result = await userModels.create(userNew)
                return result
            }
            return true
        } catch (error) {
            console.log('Error encontrado: \n', error);
            return false
        }
    }

    async loginUser(userData) {
        try {
            const user = await userModels.findOne({ email: userData.email });
            if (user) {
                const validPassword = isValidatePassword(user.password, userData.password);
                if (validPassword) {
                    return user;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            console.log('Error encontrado: \n', error);
            return false
        }
    }
}

export default UserManagerMongo