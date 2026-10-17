/** KNIGA source contracts. Every normalized research claim should remain traceable. */
export type KnigaSource = {
  id: string;
  title: string;
  url: string;
  publisher?: string;
  edition?: string;
  claimScope?: string;
};
