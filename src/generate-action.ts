import * as core from '@actions/core'

import { Note, TypeValues, fromBody } from './notes'
import { wrapError } from './util'

function buildOutput(notes: Note[]): string {
  core.debug(`building output for ${notes.length} note(s)`)

  const notesByType: Map<string, Note[]> = new Map()

  for (const note of notes) {
    core.debug(`fetching notes for type ${note.type}`)
    const nts = notesByType.get(note.type)
    if (nts) {
      core.debug(`notes found for type ${note.type}, pushing note`)
      nts.push(note)
      notesByType.set(note.type, nts)
    } else {
      core.debug(`no notes found for type ${note.type}, initializing array`)
      notesByType.set(note.type, [note])
    }
  }

  let output = ''
  for (const [typ, nts] of notesByType) {
    core.debug(`fetching header for type ${typ}`)
    core.debug(`appending "${TypeValues.get(typ)}"`)
    output += `${TypeValues.get(typ)}:\n`
    for (const nt of nts) {
      core.debug(`iterating note for type ${typ}`)
      core.debug(`appending "* ${nt.body}"`)
      output += `* ${nt.body}\n`
    }

    output += '\n'
  }

  core.debug(`returning output: ${output}`)

  return output
}

export async function run(): Promise<void> {
  const body = core.getInput('body')

  const notes = fromBody(body)
  core.debug(`${notes.length} note(s) found`)

  if (notes.length > 0) {
    const output = buildOutput(notes)
    core.setOutput('notes', output)
  }
}
async function runWrapper(): Promise<void> {
  try {
    await run()
  } catch (error) {
    core.setFailed(`generate action failed. ${wrapError(error).message}`)
  }
}

void runWrapper()
