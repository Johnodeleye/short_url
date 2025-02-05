import prisma from '@/lib/db';
import { redirect, notFound } from 'next/navigation';

interface PageProps {
  params: { shortcode: string };
}

export default async function RedirectPage({ params }: PageProps) {
  const { shortcode } = params;

  if (!shortcode) return notFound();

  const url = await prisma.url.findUnique({
    where: { shortCode: shortcode }
  });

  if (!url) return notFound();

  await prisma.url.update({
    where: { id: url.id },
    data: { visits: { increment: 1 } },
  });

  redirect(url.originalUrl);
}
