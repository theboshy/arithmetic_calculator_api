import jwt from 'jsonwebtoken';

export const jwtSign = (payload: any, expiration: string = '1h') => {
    return new Promise<any>((resolve, reject) => {
        jwt.sign({ ...payload }, process.env.JWT_SECRET, { expiresIn: expiration }, (err, token) => {
            if (err) {
                reject(err)
            }
            resolve(token)
        });
    });
}

export const jwtVerify = (token: string) => {
    return new Promise<any>((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded)
        })
    });
}