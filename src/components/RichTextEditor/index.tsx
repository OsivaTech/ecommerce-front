import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
  ],
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'align',
  'link',
]

export const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Digite aqui...',
  className = '',
}: RichTextEditorProps) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      className={`min-h-[200px] mb-12 ${className}`}
    />
  )
}
