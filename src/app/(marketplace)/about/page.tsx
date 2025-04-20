import Image from 'next/image'

export default async function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        <Image
          src="/fundocontent.jpg"
          alt="LS Injectable Logo"
          width={450}
          height={450}
          className="rounded-xl"
        />
        {/* Título Principal */}
        <div>
          <h1 className="text-3xl font-bold mb-6">Sobre LS Injectable</h1>
          <div className="flex flex-col max-w-4xl mx-auto text-lg gap-4">
            <p>
              A LS Injectable nasceu com o propósito de atender profissionais da
              saúde e clínicas estéticas que buscam qualidade, segurança e
              agilidade na aquisição de produtos injetáveis. Nosso compromisso é
              oferecer os melhores dermocosméticos e bioestimuladores do
              mercado, sempre com procedência garantida e preços justos.
            </p>
            <p>
              Trabalhamos com uma linha completa de toxinas botulínicas,
              preenchedores, bioestimuladores e skinboosters das marcas mais
              reconhecidas e confiáveis do mercado, como Juvederm, Restylane,
              Rennova, Biogelis, Millimetric, Sculptra, entre outras.
            </p>
            <p>
              Nosso atendimento é focado em entregar uma experiência ágil,
              segura e personalizada para clínicas, médicos, dentistas,
              biomédicos e demais profissionais habilitados em todo o Brasil.
              Valorizamos a confiança dos nossos clientes e buscamos, dia após
              dia, ser referência em excelência, ética e compromisso com a
              estética e bem-estar.
            </p>
            <p className="font-semibold">
              Seja bem-vindo à LS Injectable — qualidade, segurança e agilidade
              em cada entrega.
            </p>
          </div>
        </div>
      </div>

      {/* Dados Importantes */}
      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-8">
          Dados Importantes da LS Injectable
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary p-6 rounded-lg text-white">
            <div className="text-2xl font-bold mb-2">+ de 30</div>
            <div>Produtos disponíveis</div>
          </div>
          <div className="bg-primary p-6 rounded-lg text-white">
            <div className="text-2xl font-bold mb-2">+ de 1000</div>
            <div>Clientes Ativos</div>
          </div>
          <div className="bg-primary p-6 rounded-lg text-white">
            <div className="text-2xl font-bold mb-2">100%</div>
            <div>Produtos originais</div>
          </div>
        </div>
      </div>
    </div>
  )
}
