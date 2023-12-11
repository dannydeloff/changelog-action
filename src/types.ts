export const TypeValues: Map<string, string> = new Map([
  ['note', 'NOTES'],
  ['enhancement', 'ENHANCEMENTS'],
  ['improvement', 'IMPROVEMENTS'],
  ['feature', 'FEATURES'],
  ['bug', 'BUGS'],
  ['deprecation', 'DEPRECATIONS'],
  ['breaking-change', 'BREAKING CHANGES']
])

export type Note = {
  type: string
  body: string
}
