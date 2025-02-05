import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const urls = await prisma.url.findFirst ({
            orderBy: { createdAt: 'desc' },
            take: 5 , //the max of data showing on recent 
        });
        return NextResponse.json(urls)
    } catch (error) {
        console.error('Error fetching Urls', error)
        return NextResponse.json({ error: 'server eror'}, { status: 500})
    }
}