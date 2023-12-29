import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

(async () => {
  const publicKey = new PublicKey(
    "EfuiG9QVpLuyYxJpn5QHNhdVNUptqwoJo6t6EriszwaC"
  );

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  const balanceInLamports = await connection.getBalance(publicKey);

  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

  console.log(
    `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
  );
})();
