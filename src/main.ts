import * as core from '@actions/core'

import { Note, TypeValues } from './types'
import { fromBody } from './notes'

export async function run(): Promise<void> {
  try {
    const body = core.getInput('body')

    const notes = fromBody(body)
    core.debug(`${notes.length} note(s) found`)

    if (notes.length > 0) {
      const output = buildOutput(notes)
      core.setOutput('notes', output)
    }
  } catch (e) {
    if (e instanceof Error) {
      core.setFailed(e.message)
    }
  }
}

function buildOutput(notes: Note[]): string {
  const notesByType: Map<string, Note[]> = new Map()

  for (const note of notes) {
    const nts = notesByType.get(note.type)
    if (nts) {
      nts.push(note)
      notesByType.set(note.type, nts)
    } else {
      notesByType.set(note.type, [])
    }
  }

  let output = ''
  for (const [typ, nts] of notesByType) {
    output += `${TypeValues.get(typ)}:\n`
    for (const nt of nts) {
      output += `* ${nt.body}\n`
    }

    output += '\n'
  }

  return output
}
