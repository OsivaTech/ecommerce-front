import Link from 'next/link'

export default function CreateAccount() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg  w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Crie sua conta</h2>

        <form className="space-y-4 w-full">
          <input
            type="text"
            placeholder="Nome"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Sobrenome"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Repetir senha"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Número de licença"
            className="w-full p-3 border rounded-lg"
          />
          <input type="file" className="w-full p-3 border rounded-lg" />

          <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700">
            Criar conta
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-2 text-center">
          <p className="text-gray-600">Já tem uma conta?</p>
          <Link
            href="/login"
            className="w-full bg-gray-200 text-gray-700 p-3 rounded-lg font-bold hover:bg-gray-300"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  )
}
