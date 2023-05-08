import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

export const configDotEnv = () => {
    if (process.env.NODE_ENV === "dev") {
        dotenv.config({ path: ".env.dev" })
        return;
    }
    dotenv.config({ path: ".env.production" })
}