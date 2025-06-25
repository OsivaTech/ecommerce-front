'use client'

import { PackageMaterialType } from '@/types/api/Types/PackageMaterialType'

interface PackagePreviewProps {
  width: number
  height: number
  length: number
  className?: string
  showDimensions?: boolean
  maxDimensionGlobal?: number
  materialType?: PackageMaterialType
}

export function PackagePreview({
  width,
  height,
  length,
  className = '',
  showDimensions = false,
  maxDimensionGlobal,
  materialType = 'Cardboard',
}: PackagePreviewProps) {
  // Usar escala global se fornecida
  const maxDimension = maxDimensionGlobal ?? Math.max(width, height, length)
  const scale = 120 / maxDimension // Escala para caber em 120px

  const scaledWidth = width * scale
  const scaledHeight = height * scale
  const scaledLength = length * scale

  // Parâmetros da fita
  const tapeWidth = scaledWidth * 0.18
  const tapeLeft = scaledWidth * 0.41
  const tapeFrontHeight = scaledHeight * 0.18
  const tapeTriangleHeight = scaledHeight * 0.09

  // Cores e estilos por material
  const isStyrofoam = materialType === 'Styrofoam'
  const faceFront = isStyrofoam ? 'bg-white' : ''
  const faceRight = isStyrofoam ? 'bg-gray-100' : ''
  const faceTop = isStyrofoam ? 'bg-gray-50' : ''
  const boxShadow = isStyrofoam
    ? '0 2px 8px 0 rgba(180,180,180,0.10)'
    : '0 2px 8px 0 rgba(180,140,100,0.10)'
  const border = isStyrofoam ? '1.5px solid #e5e7eb' : 'none'

  // Textura pontilhada para isopor (melhorada)
  const styrofoamTexture = isStyrofoam
    ? {
        backgroundImage: [
          // Bolhas maiores
          'radial-gradient(rgba(200,200,200,0.18) 1.7px, transparent 2.2px)',
          // Bolhas médias
          'radial-gradient(rgba(180,180,180,0.13) 1.1px, transparent 2.5px)',
          // Bolhas pequenas
          'radial-gradient(rgba(180,180,180,0.09) 0.7px, transparent 1.7px)',
          // Leve ruído
          'repeating-linear-gradient(135deg, rgba(220,220,220,0.07) 0 2px, transparent 2px 4px)',
        ].join(','),
        backgroundSize: '13px 13px, 8px 8px, 4px 4px, 32px 32px',
        backgroundPosition: '0 0, 4px 7px, 2px 2px, 0 0',
      }
    : {}

  return (
    <div className={`flex items-start justify-center gap-3 ${className}`}>
      <div
        className="relative flex-shrink-0 flex items-center justify-center"
        style={{
          minHeight: `${scaledHeight + scaledLength * 0.5}px`,
        }}
      >
        {/* Caixa 3D */}
        <div
          className="relative transform-gpu"
          style={{
            width: `${scaledWidth}px`,
            height: `${scaledHeight}px`,
            transform: 'rotateX(-20deg) rotateY(-45deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Face frontal */}
          <div
            className={`absolute ${faceFront}`}
            style={{
              background: isStyrofoam ? undefined : '#D8AA77',
              width: `${scaledWidth}px`,
              height: `${scaledHeight}px`,
              transform: 'translateZ(0px)',
              boxShadow,
              border,
              borderRadius: isStyrofoam ? '6px' : '2px',
              ...styrofoamTexture,
            }}
          >
            {/* Linha da tampa (frontal) */}
            {isStyrofoam && (
              <div
                style={{
                  position: 'absolute',
                  top: `${scaledHeight * 0.13}px`,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background:
                    'linear-gradient(90deg, rgba(220,220,220,0.7) 60%, rgba(255,255,255,0.5) 100%)',
                  borderRadius: '2px',
                  boxShadow: '0 1px 2px 0 rgba(180,180,180,0.10)',
                }}
              />
            )}
          </div>

          {/* Face lateral direita */}
          <div
            className={`absolute ${faceRight}`}
            style={{
              background: isStyrofoam ? undefined : '#CA9865',
              width: `${scaledLength}px`,
              height: `${scaledHeight}px`,
              transform: `translateX(${scaledWidth}px) rotateY(90deg)`,
              transformOrigin: 'left',
              boxShadow,
              border,
              borderRadius: isStyrofoam ? '6px' : '2px',
              ...styrofoamTexture,
            }}
          >
            {/* Linha da tampa (lateral) */}
            {isStyrofoam && (
              <div
                style={{
                  position: 'absolute',
                  top: `${scaledHeight * 0.13}px`,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background:
                    'linear-gradient(90deg, rgba(230,230,230,0.7) 60%, rgba(255,255,255,0.5) 100%)',
                  borderRadius: '2px',
                  boxShadow: '0 1px 2px 0 rgba(180,180,180,0.10)',
                }}
              />
            )}
          </div>

          {/* Face superior */}
          <div
            className={`absolute ${faceTop}`}
            style={{
              background: isStyrofoam ? undefined : '#E8BB84',
              width: `${scaledWidth}px`,
              height: `${scaledLength}px`,
              transform: `translateY(-${scaledLength}px) rotateX(90deg)`,
              transformOrigin: 'bottom',
              boxShadow,
              border,
              borderRadius: isStyrofoam ? '6px' : '2px',
              ...styrofoamTexture,
            }}
          />

          {/* Fita no topo (não exibe para isopor) */}
          {!isStyrofoam && (
            <>
              <div
                className="absolute"
                style={{
                  background: '#BE8C5A',
                  width: `${tapeWidth}px`,
                  height: `${scaledLength}px`,
                  left: `${tapeLeft}px`,
                  top: '0',
                  transform: `translateY(-${scaledLength}px) rotateX(90deg)`,
                  transformOrigin: 'bottom',
                  zIndex: 2,
                }}
              />
              <div
                className="absolute"
                style={{
                  background: '#BE8C5A',
                  width: `${tapeWidth}px`,
                  height: `${tapeFrontHeight}px`,
                  left: `${tapeLeft}px`,
                  top: '0',
                  zIndex: 2,
                }}
              />
              <div
                className="absolute"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${tapeWidth / 2}px solid transparent`,
                  borderRight: `${tapeWidth / 2}px solid transparent`,
                  borderTop: `${tapeTriangleHeight}px solid #BE8C5A`,
                  left: `${tapeLeft}px`,
                  top: `${tapeFrontHeight}px`,
                  zIndex: 2,
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Dimensões (opcional) */}
      {showDimensions && (
        <div className="text-xs text-muted-foreground space-y-1 font-mono flex flex-col justify-center ml-20">
          <div>L: {width}cm</div>
          <div>A: {height}cm</div>
          <div>C: {length}cm</div>
        </div>
      )}
    </div>
  )
}
