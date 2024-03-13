import { useRef, useState } from 'react'
import { TStyle, applyStyle } from './apply-style'

export function useEditor() {
	const [text, setText] = useState('Enter text...')
	const [selectionStart, setSelectionStart] = useState(0)
	const [selectionEnd, setSelectionEnd] = useState(0)

	const textRef = useRef<HTMLTextAreaElement | null>(null)

	const updateSelection = () => {
		if (!textRef.current) return
		setSelectionStart(textRef.current.selectionStart)
		setSelectionEnd(textRef.current.selectionEnd)
	}

	const applyFormat = (type: TStyle) => {
		const selectedText = text.substring(selectionStart, selectionEnd) // Выделенный текст

		if (!selectedText) return
		// Текст до выделенного фрагмента
		const before = text.substring(0, selectionStart)

		// Текст после выделенного фрагмента
		const after = text.substring(selectionEnd)

		setText(before + applyStyle(type, selectedText) + after)
	}

	return { text, applyFormat, updateSelection, setText, textRef }
}
