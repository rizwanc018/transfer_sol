import {
    Connection,
    PublicKey,
    Keypair,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
} from "@solana/web3.js"
import { airdrop } from "./airdrop"

const transferSol = async (from: Keypair, to1: PublicKey, to2: PublicKey, amount: number) => {
    // const connection = new Connection('https://api.devnet.solana.com', "confirmed");
    const conn = new Connection("http://localhost:8899", "confirmed")

    const transaction = new Transaction()

    const instruction1 = SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to1,
        lamports: LAMPORTS_PER_SOL * amount,
    })

    const instruction2 = SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to2,
        lamports: LAMPORTS_PER_SOL * amount,
    })
    

    transaction.add(instruction1)
    transaction.add(instruction2)

    const signature = await sendAndConfirmTransaction(conn, transaction, [from])
    console.log("Transfer finished")
    console.log("Signature:", signature)
}

// from
// publicKey = "3dS4FhFCejvqRsDScQrJyH5nTqSrebeSn3QdmjuLszKq"
// secretKey = [224,203,39,17,23,82,96,243,254,38,120,75,97,10,95,254,24,136,111,230,174,208,166,42,13,140,184,168,119,235,94,47,39,12,157,46,166,143,30,245,122,102,236,104,57,31,107,59,82,219,142,89,115,176,151,62,234,163,180,152,96,94,184,72]

const secret = Uint8Array.from([
    224, 203, 39, 17, 23, 82, 96, 243, 254, 38, 120, 75, 97, 10, 95, 254, 24, 136, 111, 230, 174, 208, 166,
    42, 13, 140, 184, 168, 119, 235, 94, 47, 39, 12, 157, 46, 166, 143, 30, 245, 122, 102, 236, 104, 57, 31,
    107, 59, 82, 219, 142, 89, 115, 176, 151, 62, 234, 163, 180, 152, 96, 94, 184, 72,
])
const from_keypair = Keypair.fromSecretKey(secret)
const to_public_key1 = new PublicKey("3BUoiPCqw77faEXhc3jnXw8DKkTE1thpG1H45zwzvt92")
const to_public_key2 = new PublicKey("6yKokE3rahq4h2tFA9agBgkAxdWBNrEvnw9gdq3rzTEt")


;(async () => {
    await airdrop(from_keypair.publicKey.toString(), 20)
    await transferSol(from_keypair, to_public_key1, to_public_key2, 10)
})()
