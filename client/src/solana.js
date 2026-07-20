// ─── Solana integration ──────────────────────────────────────────────────────
// Wallet connect (Phantom / Backpack / any injected provider), premium-content
// gating by SPL token holdings, a cleanly-mocked NFT-skin fetch, and a devnet
// mintDog() stub. @solana/web3.js is dynamically imported so the game boots
// instantly for guests and works fully offline from Solana.
//
// SAFETY: nothing here ever auto-approves. Every signature goes through the
// wallet's own confirmation UI.

const NETWORK = import.meta.env.VITE_SOLANA_NETWORK || 'devnet';
const RPC = import.meta.env.VITE_SOLANA_RPC || 'https://api.devnet.solana.com';
const PREMIUM_MINT = import.meta.env.VITE_PREMIUM_MINT || '';

let web3 = null;
async function loadWeb3() {
  if (!web3) web3 = await import('@solana/web3.js');
  return web3;
}

/** Find an injected wallet provider (Phantom, Backpack, or generic). */
export function getProvider() {
  if (window.phantom?.solana?.isPhantom) return window.phantom.solana;
  if (window.backpack?.isBackpack) return window.backpack;
  if (window.solana) return window.solana;
  return null;
}

export const wallet = {
  provider: null,
  address: null,       // base58 string — the player's persistent dog identity
  premium: false,      // holds the configured premium mint?
};

/** Connect the wallet. Returns the address, or throws with a friendly message. */
export async function connectWallet() {
  const provider = getProvider();
  if (!provider) {
    throw new Error('No Solana wallet found — install Phantom or Backpack to use wallet identity.');
  }
  const resp = await provider.connect();            // wallet shows its own approval UI
  const address = (resp?.publicKey ?? provider.publicKey).toString();
  wallet.provider = provider;
  wallet.address = address;
  wallet.premium = await checkPremium(address);
  return wallet;
}

export async function disconnectWallet() {
  try { await wallet.provider?.disconnect?.(); } catch { /* provider may not support it */ }
  wallet.provider = null;
  wallet.address = null;
  wallet.premium = false;
}

/**
 * Premium gate: does `address` hold any amount of VITE_PREMIUM_MINT?
 * With no mint configured, everything is unlocked (graceful default).
 */
export async function checkPremium(address) {
  if (!PREMIUM_MINT) return true;
  try {
    const { Connection, PublicKey } = await loadWeb3();
    const conn = new Connection(RPC, 'confirmed');
    const accounts = await conn.getParsedTokenAccountsByOwner(
      new PublicKey(address), { mint: new PublicKey(PREMIUM_MINT) });
    return accounts.value.some(
      (a) => Number(a.account.data.parsed.info.tokenAmount.amount) > 0);
  } catch (err) {
    console.warn('[solana] premium check failed (treating as not-premium):', err.message);
    return false;
  }
}

/**
 * Fetch the wallet's dog NFTs to offer as selectable skins.
 *
 * MOCK: returns a small demo set so the lobby UI is visible end-to-end even
 * with zero NFTs in the wallet. To fetch real assets, replace the return with
 * a DAS `getAssetsByOwner` call against an indexer RPC (Helius etc.):
 *
 *   const res = await fetch(RPC, { method: 'POST', body: JSON.stringify({
 *     jsonrpc: '2.0', id: 1, method: 'getAssetsByOwner',
 *     params: { ownerAddress: address, page: 1, limit: 50 },
 *   })});
 *   // then filter items whose metadata marks them as PAWVERSE dogs and map
 *   // their attributes onto customization objects like below.
 */
export async function fetchDogNfts(address) {
  if (!address) return [];
  return [
    {
      name: 'Genesis Pup #001 (demo)',
      mock: true,
      customization: {
        breed: 'husky', primary: '#3d4a63', secondary: '#e8ecf5',
        pattern: 'mask', size: 1.15, collar: '#ffd166', accessory: 'bandana',
      },
    },
    {
      name: 'Beach Zoomer #042 (demo)',
      mock: true,
      customization: {
        breed: 'corgi', primary: '#e0a03f', secondary: '#ffffff',
        pattern: 'socks', size: 0.85, collar: '#3f8fe5', accessory: 'glasses',
      },
    },
  ];
}

/**
 * mintDog() — devnet STUB of the future "mint your dog as an NFT" flow.
 *
 * Today it builds a real transaction that embeds the dog's metadata in a Memo
 * instruction and asks the wallet to sign & send it on devnet — proving the
 * whole wallet round-trip works. EXTENSION POINT: swap the memo instruction
 * for Metaplex Token Metadata / Core `create` instructions to mint an actual
 * NFT with this JSON as its on-chain metadata.
 */
export async function mintDog(customization, name) {
  if (!wallet.provider || !wallet.address) throw new Error('Connect a wallet first.');
  if (NETWORK === 'mainnet-beta') {
    // Deliberate guard: the stub is devnet-only until real minting lands.
    throw new Error('mintDog() is a devnet stub — refusing to run on mainnet.');
  }
  const { Connection, PublicKey, Transaction, TransactionInstruction } = await loadWeb3();
  const conn = new Connection(RPC, 'confirmed');
  const owner = new PublicKey(wallet.address);

  const MEMO_PROGRAM = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
  const metadata = JSON.stringify({ app: 'PAWVERSE', kind: 'dog', name, dog: customization });
  const tx = new Transaction().add(new TransactionInstruction({
    keys: [{ pubkey: owner, isSigner: true, isWritable: false }],
    programId: MEMO_PROGRAM,
    data: new TextEncoder().encode(metadata),
  }));
  tx.feePayer = owner;
  tx.recentBlockhash = (await conn.getLatestBlockhash()).blockhash;

  // The wallet prompts the user; we never sign silently.
  const { signature } = await wallet.provider.signAndSendTransaction(tx);
  return signature;
}

export const solanaConfig = { NETWORK, RPC, PREMIUM_MINT };
