import { redirect } from 'next/navigation';
import prisma from '@/lib/db';

type RedirectPageProps = {
    params: Record<string, string>; // ✅ Ensure params is a plain object, not a Promise
};

export default async function RedirectPage({ params }: RedirectPageProps) {
    const shortcode = params.shortcode; // ✅ No need to await

    const url = await prisma.url.findUnique({
        where: { shortCode: shortcode } // Ensure `shortCode` is unique in Prisma schema
    });

    if (!url) {
        return <div>404 - URL not found</div>;
    }

    await prisma.url.update({
        where: { id: url.id },
        data: { visits: { increment: 1 } },
    });

    redirect(url.originalUrl);
}
