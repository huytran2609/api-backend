import Hash from 'typestub-ipfs-only-hash';
// eslint-disable-next-line @typescript-eslint/ban-types
export const toCID = async (data: string | Buffer | { pipe: Function }) => {
  const hash = await Hash.of(data);
  return hash;
};
