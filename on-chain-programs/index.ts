import {
  Keypair,
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import "dotenv/config";
import base58 from "bs58";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";

const payer = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

sendPingTransaction(connection, payer);

async function sendPingTransaction(connection: Connection, payer: Keypair) {
  const PING_PROGRAM_ADDRESS = new PublicKey(
    "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
  );
  const PING_PROGRAM_DATA_ADDRESS = new PublicKey(
    "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
  );

  const airdrop = await connection.requestAirdrop(
    payer.publicKey,
    LAMPORTS_PER_SOL * 1
  );
  if (airdrop) {
    console.log(`Airdrop successful!`);
  } else {
    throw new Error(`Airdrop failed!`);
  }

  const transaction = new Transaction();
  const programId = new PublicKey(PING_PROGRAM_ADDRESS);
  const pingProgramDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS);

  const instruction = new TransactionInstruction({
    keys: [
      {
        pubkey: pingProgramDataId,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId,
  });

  transaction.add(instruction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    payer,
  ]);

  console.log(`✅ Transaction completed! Signature is ${signature}`);
  console.log(
    `You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`
  );
}
