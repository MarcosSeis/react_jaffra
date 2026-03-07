import { ProductDetailTemplate } from '@/presentation/components/templates';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ProductDetailTemplate id={Number(id)} />;
}
