export interface EditorElement {
  id: string
  type: string
  props: {
    className?: string
    content?: string
    style?: React.CSSProperties
    [key: string]: unknown
  }
  children?: EditorElement[]
}

export interface EditorState {
  elements: EditorElement[]
  selectedElement: EditorElement | null
  history: EditorElement[][]
  historyIndex: number
  viewport: 'desktop' | 'tablet' | 'mobile'
}

export interface ElementDefinition {
  type: string
  label: string
  icon: string
  category: string
  defaultProps: Record<string, unknown>
}
