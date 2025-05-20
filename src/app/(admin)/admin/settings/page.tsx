'use client'

import { AdminTitle } from '@/components/AdminTitle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MelhorEnvioConfig } from './components/MelhorEnvioConfig'
import { ParametrosForm } from './components/ParametrosForm'

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <AdminTitle
        title="Configurações"
        description="Gerencie as configurações do sistema"
      />

      <Tabs defaultValue="parameters" className="w-full">
        <TabsList>
          <TabsTrigger value="parameters">Parâmetros</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
        </TabsList>

        <TabsContent value="parameters" className="mt-6">
          <ParametrosForm />
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <MelhorEnvioConfig />
        </TabsContent>
      </Tabs>
    </div>
  )
}
