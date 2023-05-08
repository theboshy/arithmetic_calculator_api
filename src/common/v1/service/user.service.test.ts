import { userRegisterService, userLoginService, getUser } from "./user.service";

const user = {
    username: "test",
    password: "test123",
}

describe("user service", () => {
    test('should register an user', async () => {
        expect.assertions(3);
        const result = await userRegisterService(user.username, user.password);
        expect(typeof result).toBe('object')
        expect(result.error).toBeFalsy()
        expect(result.response).toBe(user.username)
    });

    test('should login an user', async () => {
        expect.assertions(3);
        const result = await userLoginService(user.username, user.password);
        expect(typeof result).toBe('object')
        expect(result.error).toBeFalsy()
        expect(result.response.user).toBe(user.username)
    });

    test('should get an user', async () => {
        expect.assertions(3);
        const result = await getUser(user.username);
        expect(typeof result).toBe('object')
        expect(result.error).toBeFalsy()
        expect(result.response.username).toBe(user.username)
    });

    test('should return an error triying to log in with incorrect password', async () => {
        expect.assertions(3);
        let newUserMock = { ...user };
        newUserMock.password = "test321";
        const result = await userLoginService(user.username, newUserMock.password);
        expect(typeof result).toBe('object')
        expect(result.error).toBeTruthy()
        expect(result.errorTrace).toBe("password is incorrect")
    });

    test('should return an error triying to log in with non existing user', async () => {
        expect.assertions(3);
        let newUserMock = { ...user };
        newUserMock.username = "test2";
        const result = await userLoginService(newUserMock.username, user.password);
        expect(typeof result).toBe('object')
        expect(result.error).toBeTruthy()
        expect(result.errorTrace).toBe("username is incorrect")
    });
});