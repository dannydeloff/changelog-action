import * as core from '@actions/core'

import { wrapError } from './util'
import { isTypeValid, fromBody } from './notes'

function run(): void {
  const body = core.getInput('body')
  const notes = fromBody(body)

  if (notes.length < 1) {
    core.warning('no release notes found')
    return
  }

  const unknownTypes: string[] = []
  for (const note of notes) {
    if (!isTypeValid(note)) {
      unknownTypes.push(note.type)
    }
  }

  if (unknownTypes.length > 0) {
    core.setFailed(`unknown release note types found: ${unknownTypes}`)
  }
}

function runWrapper(): void {
  try {
    run()
  } catch (error) {
    core.setFailed(`check action failed. ${wrapError(error).message}`)
  }
}

void runWrapper()
