import jwt from 'jsonwebtoken';

export const jwtSign = (payload: any, expiration: string = '1h') => {
    return new Promise<any>((resolve, reject) => {
        const today = new Date();
        if (expiration === "1h") {
            today.setHours(today.getHours() + 1);
        }
        jwt.sign({ ...payload, today }, process.env.JWT_SECRET, { expiresIn: expiration }, (err, token) => {
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