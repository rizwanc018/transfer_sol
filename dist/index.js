"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const airdrop_1 = require("./airdrop");
const transferSol = (from, to1, to2, amount) => __awaiter(void 0, void 0, void 0, function* () {
    // const connection = new Connection('https://api.devnet.solana.com', "confirmed");
    const conn = new web3_js_1.Connection("http://localhost:8899", "confirmed");
    const transaction = new web3_js_1.Transaction();
    const instruction1 = web3_js_1.SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to1,
        lamports: web3_js_1.LAMPORTS_PER_SOL * amount,
    });
    const instruction2 = web3_js_1.SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to2,
        lamports: web3_js_1.LAMPORTS_PER_SOL * 2000,
    });
    transaction.add(instruction1);
    transaction.add(instruction2);
    const signature = yield (0, web3_js_1.sendAndConfirmTransaction)(conn, transaction, [from]);
    console.log("Transfer finished");
    console.log("Signature:", signature);
});
// from
// publicKey = "3dS4FhFCejvqRsDScQrJyH5nTqSrebeSn3QdmjuLszKq"
// secretKey = [224,203,39,17,23,82,96,243,254,38,120,75,97,10,95,254,24,136,111,230,174,208,166,42,13,140,184,168,119,235,94,47,39,12,157,46,166,143,30,245,122,102,236,104,57,31,107,59,82,219,142,89,115,176,151,62,234,163,180,152,96,94,184,72]
const secret = Uint8Array.from([
    224, 203, 39, 17, 23, 82, 96, 243, 254, 38, 120, 75, 97, 10, 95, 254, 24, 136, 111, 230, 174, 208, 166,
    42, 13, 140, 184, 168, 119, 235, 94, 47, 39, 12, 157, 46, 166, 143, 30, 245, 122, 102, 236, 104, 57, 31,
    107, 59, 82, 219, 142, 89, 115, 176, 151, 62, 234, 163, 180, 152, 96, 94, 184, 72,
]);
const from_keypair = web3_js_1.Keypair.fromSecretKey(secret);
const to_public_key1 = new web3_js_1.PublicKey("3BUoiPCqw77faEXhc3jnXw8DKkTE1thpG1H45zwzvt92");
const to_public_key2 = new web3_js_1.PublicKey("6yKokE3rahq4h2tFA9agBgkAxdWBNrEvnw9gdq3rzTEt");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, airdrop_1.airdrop)(from_keypair.publicKey.toString(), 20);
    yield transferSol(from_keypair, to_public_key1, to_public_key2, 10);
}))();
//# sourceMappingURL=index.js.map