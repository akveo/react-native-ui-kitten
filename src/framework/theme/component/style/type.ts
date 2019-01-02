export enum Interaction {
  ACTIVE = 'active',
}

export enum State {
  CHECKED = 'checked',
  DISABLED = 'disabled',
  FOCUSED = 'focused',
}

export namespace Interaction {
  export function parse(interaction: string): Interaction | undefined {
    return Interaction[interaction.toUpperCase()];
  }
}

export namespace State {
  export function parse(state: string): State | undefined {
    return State[state.toUpperCase()];
  }
}
