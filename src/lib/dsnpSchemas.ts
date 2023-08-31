export interface SchemaData {
  id: Record<string, any>;
  description: string;
}

export type Schema = Record<string, SchemaData>;

export const DSNPSchemas: Schema = {
  tombstone: {
    id: {
      mainnet: 1,
      rococo: 1
    },
    description:
      'Allow provider to note that a previously announced content is invalid and the related Announcement should be considered reverted.'
  },
  broadcast: {
    id: {
      mainnet: 2,
      rococo: 2
    },
    description: 'Allow provider to send a public message to everyone'
  },
  replay: {
    id: {
      mainnet: 3,
      rococo: 3
    },
    description: 'Allow provider to send a public message to reply to another broadcast message'
  },
  reaction: {
    id: {
      mainnet: 4,
      rococo: 4
    },
    description: 'Allow provider to publish emoji reactions to any broadcast'
  },
  profile: {
    id: {
      mainnet: 6,
      rococo: 5
    },
    description: 'Allow provider to publish profile updates'
  },
  update: {
    id: {
      mainnet: 5,
      rococo: 6
    },
    description: 'Allow provider to update previously announced content'
  },
  publicKey: {
    id: {
      mainnet: 7,
      rococo: 18
    },
    description:
      'Allow provider to note a new cryptographic key that can be used in DSNP to secure and verify the authenticity of communications'
  },
  publicFollows: {
    id: {
      mainnet: 8,
      rococo: 13
    },
    description: 'Allow provider to publicly follow another user'
  },
  privateFollows: {
    id: {
      mainnet: 9,
      rococo: 14
    },
    description: 'Allow provider to privately follow another user without exposing the follow.'
  },
  privateConnections: {
    id: {
      mainnet: 10,
      rococo: 15
    },
    description:
      "Allow provider to establish private connections between DSNP Users, forming bidirectional relationships. These connections are stored on both users' ends, enabling status updates while upholding privacy."
  }
};
