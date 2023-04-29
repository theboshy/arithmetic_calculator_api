import { userRecordService } from "./user.record.service";

describe('user record tests', () => {
    it("should create record with initial state", async () => {
        await userRecordService("mononised", "cc44b18f-ccda-44d2-a8a8-7987272f480e", 3)
    })

});