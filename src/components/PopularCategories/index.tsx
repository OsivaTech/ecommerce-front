import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FolderOpen, Syringe, Droplets, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'

interface Category {
  id: number
  name: string
  productCount: number
}

interface PopularCategoriesProps {
  categories: Category[]
}

// Mapeamento de ícones para cada categoria
const getCategoryIcon = (categoryName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    Toxinas: <Syringe className="w-8 h-8 text-primary" />,
    Skinboosters: <Droplets className="w-8 h-8 text-primary" />,
    Preenchedores: <Sparkles className="w-8 h-8 text-primary" />,
    Bioestimuladores: <Zap className="w-8 h-8 text-primary" />,
  }

  return (
    iconMap[categoryName] || <FolderOpen className="w-8 h-8 text-primary" />
  )
}

export const PopularCategories = ({ categories }: PopularCategoriesProps) => {
  return (
    <section className="container mx-auto mt-16 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Categorias populares</h2>
        <p className="text-muted">Explore nossas categorias mais procuradas</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/store#${category.name}`}>
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                {getCategoryIcon(category.name)}
              </div>
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <Badge variant="secondary">
                {category.productCount} produtos
              </Badge>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
