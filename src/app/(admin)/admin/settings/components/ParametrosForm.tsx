'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { SettingsHttp } from '@/http/Settings'
import { SettingResponse } from '@/types/api/Response/SettingResponse'
import { SettingValueType } from '@/types/api/Types/SettingValueType'
import toast from 'react-hot-toast'

const SETTING_TYPE_LABELS: Record<SettingValueType, string> = {
  String: 'Texto',
  Integer: 'Número inteiro',
  Decimal: 'Número decimal',
  Boolean: 'Booleano',
  Date: 'Data',
  DateTime: 'Data e hora',
  Uri: 'URL',
}

const SETTING_TYPE_VALUES = Object.keys(
  SETTING_TYPE_LABELS,
) as SettingValueType[]

export function ParametrosForm() {
  const [configs, setConfigs] = useState<SettingResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [changed, setChanged] = useState<{ [id: number]: string }>({})

  useEffect(() => {
    async function fetchParams() {
      setLoading(true)
      const response = await SettingsHttp.getSettings()
      if (!response.hasError && response.data) {
        setConfigs(response.data)
      }
      setLoading(false)
    }
    fetchParams()
  }, [])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    idx: number,
  ) {
    const newConfigs = [...configs]
    const config = newConfigs[idx]
    if (config && typeof config.id === 'number') {
      newConfigs[idx] = {
        ...config,
        [e.target.name]: e.target.value,
        name: config.name || '',
        type: config.type || '',
      }
      setConfigs(newConfigs)
      setChanged({ ...changed, [config.id]: e.target.value })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    let success = true
    for (const idx of Object.keys(changed)) {
      const config = configs.find((c) => c.id === Number(idx))
      if (
        config &&
        typeof config.id === 'number' &&
        config.name &&
        config.type
      ) {
        const response = await SettingsHttp.updateSetting(config.id, {
          name: config.name,
          value: config.value,
          type: config.type,
        })
        if (response.hasError) success = false
      }
    }
    setSaving(false)
    setChanged({})
    if (success) {
      toast.success('Parâmetros salvos com sucesso!')
    } else {
      toast.error('Erro ao salvar um ou mais parâmetros!')
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex font-semibold text-gray-500 mb-2">
        <div className="w-10">Id</div>
        <div className="w-60">Nome</div>
        <div className="w-42">Tipo</div>
        <div className="flex-1">Valor</div>
      </div>
      {configs.map((config, idx) => (
        <div className="flex items-center gap-2" key={config.id ?? idx}>
          <div className="w-10 text-sm text-gray-700">{config.id}</div>
          <div className="w-56 truncate text-sm text-gray-700">
            <Label htmlFor={config.name}>{config.name}</Label>
          </div>
          <div className="w-40">
            <select
              name="type"
              value={config.type}
              onChange={(e) => handleChange(e, idx)}
              disabled={loading || saving}
              className="w-full border rounded px-2 py-1 text-sm"
            >
              {SETTING_TYPE_VALUES.map((opt) => (
                <option key={opt} value={opt}>
                  {SETTING_TYPE_LABELS[opt]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <Input
              id={config.name}
              name="value"
              value={config.value}
              onChange={(e) => handleChange(e, idx)}
              disabled={loading || saving}
            />
          </div>
        </div>
      ))}
      <Button
        type="submit"
        className="w-full mt-4"
        disabled={loading || saving || Object.keys(changed).length === 0}
      >
        {saving ? 'Salvando...' : 'Salvar parâmetros'}
      </Button>
    </form>
  )
}
