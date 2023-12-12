import * as core from '@actions/core'

import { Note, TypeValues, fromBody } from './notes'
import { wrapError } from './util'

function buildOutput(notes: Note[]): string {
  const notesByType: Map<string, Note[]> = new Map()

  for (const note of notes) {
    const nts = notesByType.get(note.type)
    if (nts) {
      nts.push(note)
      notesByType.set(note.type, nts)
    } else {
      notesByType.set(note.type, [note])
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

  core.debug(`returning output: ${output}`)

  return output
}

export function run(): void {
  const body = core.getInput('body')

  const notes = fromBody(body)
  core.debug(`${notes.length} note(s) found`)

  if (notes.length > 0) {
    const output = buildOutput(notes)
    core.setOutput('notes', output)
  }
}
function runWrapper(): void {
  try {
    run()
  } catch (error) {
    core.setFailed(`generate action failed. ${wrapError(error).message}`)
  }
}

void runWrapper()
