// import prisma from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET() {
//     try {
//         const urls = await prisma.url.findMany ({
//             orderBy: { createdAt: 'desc' },
//             take: 5 , //the max of data showing on recent 
//         });
//         return NextResponse.json(urls)
//     } catch (error) {
//         console.error('Error fetching Urls', error)
//         return NextResponse.json({ error: 'server eror'}, { status: 500})
//     }
// }

import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("Fetching URLs...");
        
        const urls = await prisma.url.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5, // Limit recent data
        });

        console.log("Fetched URLs:", urls);

        return NextResponse.json(urls);
    } catch (error: any) {
        console.error("Error fetching URLs:", error);
        return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
    }
}
