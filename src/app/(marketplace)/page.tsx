import { ProductHttp } from '@/http/Product'
import { CategoryHttp } from '@/http/Category'
import { AdvertisementHttp } from '@/http/Advertisement'
import { Advertisement } from '@/components/Advertisement'
import { RecomendedProducts } from '@/components/RecomendedProducts'
import { Testimonials } from '@/components/Testimonials'
import { CallToAction } from '@/components/CallToAction'
import { PopularCategories } from '@/components/PopularCategories'
import { Benefits } from '@/components/Benefits'
import { BestSellers } from '@/components/BestSellers'
import { SatisfactionStats } from '@/components/SatisfactionStats'

export default async function Home() {
  // Fazendo todas as requisições simultaneamente
  const [featuredProducts, allProducts, categories, advertisements] =
    await Promise.all([
      ProductHttp.getFeaturedProducts(),
      ProductHttp.getProducts(),
      CategoryHttp.getAllCategories(),
      AdvertisementHttp.getAdvertisements(),
    ])

  if (
    featuredProducts.hasError ||
    allProducts.hasError ||
    categories.hasError ||
    advertisements.hasError
  ) {
    return <div>Error</div>
  }

  // Pegar as 4 categorias mais populares (com mais produtos)
  const popularCategories = categories.data
    .map((category) => ({
      ...category,
      productCount: allProducts.data.filter(
        (p) => p.category.id === category.id,
      ).length,
    }))
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, 4)

  // Produtos mais vendidos (simulado - você pode implementar uma API real)
  const bestSellers = featuredProducts.data
    .filter((product) => product.stock > 0)
    .slice(0, 6)

  return (
    <div className="relative w-full">
      {/* Seção de Anúncios */}
      <Advertisement advertisements={advertisements.data} />

      {/* Seção de Produtos Recomendados */}
      <RecomendedProducts products={featuredProducts.data} />

      {/* Seção de Categorias Populares */}
      <PopularCategories categories={popularCategories} />

      {/* Seção de Benefícios */}
      <Benefits />

      {/* Seção de Produtos Mais Vendidos */}
      <BestSellers products={bestSellers} />

      {/* Seção de Depoimentos */}
      <Testimonials />

      {/* Seção de Estatísticas de Satisfação */}
      <SatisfactionStats />

      {/* Seção de Call-to-Action para Cadastro */}
      <CallToAction />
    </div>
  )
}
