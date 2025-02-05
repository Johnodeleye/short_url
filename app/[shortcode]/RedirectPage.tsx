import prisma from '@/lib/db';
import { redirect, notFound } from 'next/navigation';

interface RedirectPageProps {
  params: { shortcode: string };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortcode } = params; 

  const url = await prisma.url.findUnique({
    where: { shortCode: shortcode } as any, // ✅ Quick fix
  });
  

  if (!url) {
    notFound();
  }

  await prisma.url.update({
    where: { id: url.id },
    data: { visits: { increment: 1 } },
  });

  redirect(url.originalUrl);
}
