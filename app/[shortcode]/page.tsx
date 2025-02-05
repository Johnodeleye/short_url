import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'

type RedirectPageProps = {
    params: { shortcode: any };
};

// export default async function RedirectPage({ params }: RedirectPageProps) {
    export default async function RedirectPage({ params }: RedirectPageProps) {
    const { shortcode } = params;

    const url = await prisma.url.findUnique({
        where: { shortCode: shortcode }
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
