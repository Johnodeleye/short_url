import type { Metadata, ResolvingMetadata } from 'next';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'

type RedirectPageProps = {
    params: { shortcode: string };
};

export default async function RedirectPage({ params }: RedirectPageProps) {
    const { shortcode } = params; // No need for `await` here

    const url = await prisma.url.findUnique({
        where: { shortCode: shortcode } // Ensure `shortCode` is unique in your Prisma schema
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

