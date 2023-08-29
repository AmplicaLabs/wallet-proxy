import type { u16, u32, u64 } from '@polkadot/types';
import type { MessageSourceId, SchemaId } from "@frequency-chain/api-augment/interfaces";
import type { AnyNumber } from '@polkadot/types/types';
import type { DispatchError, Event } from '@polkadot/types/interfaces';
import type { SpRuntimeDispatchError } from '@polkadot/types/lookup';

export type AddKeyData = { msaId?: u64; expiration?: any; newPublicKey?: any };
export type AddProviderPayload = {
  authorizedMsaId?: MessageSourceId;
  schemaIds?: SchemaId[] | AnyNumber[];
  expiration?: any;
};
export type ItemizedSignaturePayload = {
  msaId?: u64;
  schemaId?: u16;
  targetHash?: u32;
  expiration?: any;
  actions?: any;
};
export type PaginatedUpsertSignaturePayload = {
  msaId?: u64;
  schemaId?: u16;
  pageId?: u16;
  targetHash?: u32;
  expiration?: any;
  payload?: any;
};
export type PaginatedDeleteSignaturePayload = {
  msaId?: u64;
  schemaId?: u16;
  pageId?: u16;
  targetHash?: u32;
  expiration?: any;
};

export class EventError extends Error {
  name: string = '';

  message: string = '';

  stack?: string = '';

  section?: string = '';

  rawError: DispatchError | SpRuntimeDispatchError;

  constructor(source: DispatchError | SpRuntimeDispatchError) {
    super();

    if (source.isModule) {
      const decoded = source.registry.findMetaError(source.asModule);
      this.name = decoded.name;
      this.message = decoded.docs.join(' ');
      this.section = decoded.section;
    } else {
      this.name = source.type;
      this.message = source.type;
      this.section = '';
    }
    this.rawError = source;
  }

  public toString() {
    return `${this.section}.${this.name}: ${this.message}`;
  }
}

export type EventMap = { [key: string]: Event };

// export type ParsedEventResult<C extends Codec[] = Codec[], N = unknown> = [ParsedEvent<C, N> | undefined, EventMap];
export type ParsedEventResult = [any, EventMap];
