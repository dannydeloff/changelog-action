import { Note, TypeValues } from './types'

const notesInBodyExps = [
  /```release-note:(?<type>[^\r\n]*)\r?\n?(?<note>.*?)\r?\n?```/gmu,
  /```releasenote:(?<type>[^\r\n]*)\r?\n?(?<note>.*?)\r?\n?```/gmu
]

export function fromBody(body: string): Note[] {
  let res: Note[] = []

  for (let re of notesInBodyExps) {
    let m: RegExpExecArray | null

    while ((m = re.exec(body)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++
      }

      let note = m.groups?.note.trim()
      let typ = m.groups?.type.trim()

      if (note && typ) {
        res.push({ body: note, type: typ })
      }
    }
  }

  return res
}

export function isTypeValid(note: Note): boolean {
  return TypeValues.has(note.type)
}
