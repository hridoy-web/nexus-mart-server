import { prisma } from "../../lib/prisma.js";
import { hashPassword, comparePassword, generateToken } from "../../lib/authHelpers.js";

export const registerUserIntoDB = async (payload: any) => {

    //password secure
    const hashedPassword = await hashPassword(payload.password);

    const newUser = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    return newUser;
};

// login service
export const loginUserFromDB = async (payload: any) => {
    const user = await prisma.user.findUnique({
        where: { email: payload.email, isDeleted: false },
    });

    if (!user) {
        throw new Error("User not found!");
    }

    const isPasswordMatched = await comparePassword(payload.password, user.password);

    if (!isPasswordMatched) {
        throw new Error("Invalid credentials!");
    }

    // jwt token generate
    const token = generateToken({ id: user.id, role: user.role });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};