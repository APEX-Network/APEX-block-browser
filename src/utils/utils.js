const ECPair = require("bitcoinjs-lib/src/ecpair");
const Crypto = require("bitcoinjs-lib/src/crypto");
const Bitcoin = require("bitcoinjs-lib");
const Base58check = require('base58check');
const script_signature = require("bitcoinjs-lib/src/script_signature");
const BigInteger = require('bigi')


const utilMethods = {
    produce_address(privKey, ap) {
        let privKeyToBuffer = Buffer.from(privKey, "hex");
        let privKeyToWif = ECPair.fromPrivateKey(privKeyToBuffer).toWIF();
        let privKeyToPub = ECPair.fromPrivateKey(privKeyToBuffer).publicKey;
        let pubHash = Crypto.ripemd160(Crypto.sha256(privKeyToPub)).toString(
            "hex"
        );
        let pubAddress = Base58check.encode(pubHash, ap);
        return pubAddress
    },
    Sign(signParams) {
        let messageToBuffer = Buffer.from(signParams.message, "hex");
        let hash = Bitcoin.crypto.sha256(messageToBuffer);
        let keyToBuffer = Buffer.from(signParams.privKey, "hex");
        let signature = ECPair.fromPrivateKey(keyToBuffer).sign(hash);
        let signature_encode = script_signature.encode(signature, 1);
        let signature_toHex = signature_encode.toString("hex");
        //3044022030a2f70a1af80b33eb999f3654f8e3daa5f7b8dbfd45499c6fd4a927e75b7f62022025e819d63a4158bdd1f5bf51e2c1c690663c59c836524366366755394c37dbf201

        let signature_result = signature_toHex.substring(0, signature_toHex.length - 2);
        //3044022030a2f70a1af80b33eb999f3654f8e3daa5f7b8dbfd45499c6fd4a927e75b7f62022025e819d63a4158bdd1f5bf51e2c1c690663c59c836524366366755394c37dbf2

        return signature_result
    },
    serialized_transaction(serializParams) {
        if (!serializParams.version || !serializParams.txType || !serializParams.from || !serializParams.toPubKeyHash || !serializParams.amount || !serializParams.nonce || !serializParams.data || !serializParams.gasPrice || !serializParams.gasLimit  || !serializParams.executeTime || !serializParams.signature) {
            console.log("one of version, txType, from, toPubKeyHash, amount , nonce, data, gasPrice, , gasLimit, executeTime, signature and changeAddress is null, please give a valid param");
        } else {
            console.log("param is valid, start serialized transaction");
            let decode_from = Base58check.decode(serializParams.from, "hex")
                .data;
            let from = decode_from.slice(2);
            //Base58check decode
            let decode_PubKeyHash = Base58check.decode(serializParams.toPubKeyHash, "hex").data;
            let toPubKeyHash = decode_PubKeyHash.slice(2);
            //9df7fc7ca2358cc2c0535e4d08532d9733e2bf58
            return serializParams.version + serializParams.txType + from + toPubKeyHash + serializParams.amount + serializParams.nonce + serializParams.data + serializParams.gasPrice + serializParams.gasLimit + serializParams.executeTime + serializParams.signature;
            //0000000101e2a4b7c6582f4e837668504eb2f4eaa796e908e49df7fc7ca2358cc2c0535e4d08532d9733e2bf581,0,0,0,0,0,0,0,0,0000000000000000200020237020315000000000000000046304402206afddf1f5fa1bbe9f91b9b4a39006a9196a07ca1acf106f5c5a13a327196b47702202def3ffd84b293b324fe95cc67504816f3185690425d51d580cea1707daedd8a
        }
    }
}
export default { utilMethods }