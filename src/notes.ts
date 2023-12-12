import { Note, TypeValues } from './types'
import * as core from '@actions/core'

const notesInBodyExps = [
  /```release-note:(?<type>[^\r\n]*)\r?\n?(?<note>.*?)\r?\n?```/gmu,
  /```releasenote:(?<type>[^\r\n]*)\r?\n?(?<note>.*?)\r?\n?```/gmu
]

export function fromBody(body: string): Note[] {
  const res: Note[] = []

  for (const re of notesInBodyExps) {
    core.debug(`running expression ${re}`)

    let m: RegExpExecArray | null

    while ((m = re.exec(body)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++
      }

      const note = m.groups?.note.trim()
      core.debug(`note found: ${note}`)

      const typ = m.groups?.type.trim()
      core.debug(`type found: ${typ}`)

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
