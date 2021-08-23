// import { success } from "../../services/response/";
import { sign, verify } from "../../../services/jwt";
import User from "../../api/user/model";

export const login = async (_, { userInput: { email, password } }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            // eslint-disable-next-line no-throw-literal
            throw "Email not matched with password";
        }
        const validUser = await user.authenticate(password, user.password);
        if (!validUser) {
            // eslint-disable-next-line no-throw-literal
            throw "Email not matched with password";
        }
        const token = await sign(validUser.id);
        return { token, user };
    } catch (_err) {
        // eslint-disable-next-line no-throw-literal
        throw "Email not matched with password";
    }
};

export const token = async (context) => {
    // eslint-disable-next-line no-useless-catch
    try {
        // eslint-disable-next-line dot-notation
        const token = context.reply.request.headers["authorization"]?.replace(
            "Bearer ",
            ""
        );
        const { id } = await verify(token);
        const user = await User.findById(id);

        return user;
    } catch (err) {
        throw err;
    }
};
