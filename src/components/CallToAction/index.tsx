import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Award, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const CallToAction = () => {
  return (
    <section className="container mx-auto mt-16 px-4">
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-white p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <Award className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            Cadastre-se e tenha acesso exclusivo
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Como profissional da área, você terá acesso a preços especiais,
            produtos exclusivos e suporte prioritário.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create-account">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Criar conta
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </section>
  )
}
