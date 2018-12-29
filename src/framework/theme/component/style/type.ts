export enum Action {
  STATELESS = '',
  STATE_CHECKED = 'checked',
  STATE_DISABLED = 'disabled',
  STATE_ACTIVE = 'active',
  STATE_FOCUS = 'focus',
}

export namespace Action {
  export function parse(action: string): Action | undefined {
    return action ? Action[`STATE_${action.toUpperCase()}`] : Action.STATELESS;
  }
}
