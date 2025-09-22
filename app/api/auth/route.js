import connectDB from "../../../lib/mongose";
import Admin from "../../../models/admin";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        console.log("Connected to DB in auth route");
        const {mobile, password} = await request.json();
        if (!mobile || !password) {
            return NextResponse.json({error: 'Mobile and password are required'}, {status: 400});
        }
        const existingAdmin = await Admin.findOne({mobile});
        if (existingAdmin) {
            return NextResponse.json({error: 'Admin with this mobile already exists'}, {status: 400});
        }
        const adminUser = new Admin({mobile, password});
        await adminUser.save();
        console.log("Admin user created successfully:", adminUser);
        return NextResponse.json({message: 'Admin user created successfully'}, {status: 201});
    } catch (error) {
        console.error("Error creating admin user:", error);
        return NextResponse.json({error: 'Failed to create admin user'}, {status: 500});
    }
}


