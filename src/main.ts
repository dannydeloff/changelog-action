import * as core from '@actions/core'

import { Note, TypeValues } from './types'
import { fromBody } from './notes'

export async function run(): Promise<void> {
  try {
    const body = core.getInput('body')

    const notes = fromBody(body)
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

  notes.forEach(note => {
    let nts = notesByType.get(note.type)
    if (nts) {
      nts.push(note)
      notesByType.set(note.type, nts)
    } else {
      notesByType.set(note.type, [])
    }
  })

  let output: string = ''
  notesByType.forEach((nts, key) => {
    output += `${TypeValues.get(key)}:\n`
    nts.forEach(note => {
      output += `* ${note.body}\n`
    })

    output += '\n'
  })

  return output
}
