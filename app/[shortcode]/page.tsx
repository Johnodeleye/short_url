import prisma from '@/lib/db';
import { redirect, notFound } from 'next/navigation';

export default async function RedirectPage({ params }: { params: Record<string, string> }) {
  const shortcode = params?.shortcode; // Ensure it's accessed safely

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
