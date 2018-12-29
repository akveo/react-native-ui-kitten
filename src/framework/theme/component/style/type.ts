export enum Interaction {
  ACTIVE = 'active',
}

export enum State {
  CHECKED = 'checked',
  DISABLED = 'disabled',
  FOCUSED = 'focused',
}

export namespace Interaction {
  export function parse(description: string): Interaction | undefined {
    return Interaction[description.toUpperCase()];
  }
}

export namespace State {
  export function parse(description: string): State | undefined {
    return State[description.toUpperCase()];
  }
}
