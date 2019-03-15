import ECPair from "bitcoinjs-lib/src/ecpair";
const baddress = require("bitcoinjs-lib/src/address");
const bcrypto = require("bitcoinjs-lib/src/crypto");
const NETWORKS = require("bitcoinjs-lib/src/networks");
const bitcoin = require("bitcoinjs-lib");
const Base58check = require('base58check');
// let bip39 = require("bip39");
// const bip32 = require("bip32");
const script_signature = require("bitcoinjs-lib/src/script_signature");

const utilMethods = {
    toByteArray(x) {
        var hexString = x.toString(16);
        if (hexString.length % 2 > 0) hexString = "0" + hexString;
        var byteArray = [];
        for (var i = 0; i < hexString.length; i += 2) {
            byteArray.push(parseInt(hexString.slice(i, i + 2), 16));
        }
        return byteArray;
    },

    ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    },

    // 字符串转为ArrayBuffer对象，参数为字符串
    str2ab(str) {
        var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    },

    getAddress(node) {
        console.log("PrivateKey = " + node.toWIF().toString('hex'));
        console.log("PublicKey =" + node.publicKey.toString('hex'))
        return baddress.toBase58Check(bcrypto.hash160(node.publicKey), NETWORKS.bitcoin.pubKeyHash)
    },
    produceSign(message, privKey) {
        // /**
        //  * 生成地址
        //  */
        // let mnemonic = bip39.generateMnemonic();
        // console.log("-----------助记词--------------");
        // console.log(mnemonic);
        // console.log("-----------助记词--------------");
        // let seed = bip39.mnemonicToSeed(mnemonic);
        // console.log("---------seed------------");
        // console.log(seed);
        // console.log("---------seed------------");
        // const rootMasterKey = bip32.fromSeed(seed);
        // let key1 = rootMasterKey.derivePath("m/44'/0'/0'/0/0");
        // let key2 = rootMasterKey.derivePath("m/44'/0'/0'/0/1");
        // let key3 = rootMasterKey.derivePath("m/44'/0'/0'/1/0");
        // let key4 = rootMasterKey.derivePath("m/44'/0'/0'/1/1");
        // console.log(util.utilMethods.getAddress(key1));

        /**
        * 签名
        */
        // let apex = "0548";
        //Base58check decode
        // let from_Address = "APNctFxoeKJV9cXBzWarUmxmwoxxwfMXurX";
        // let from_Address_Data = Base58check.decode(from_Address, "hex")
        //   .data;
        // let from_Address_Data_result = from_Address_Data.slice(2);
        // console.log("From---" + from_Address_Data_result);
        // //Base58check encode
        // let from = "e2a4b7c6582f4e837668504eb2f4eaa796e908e4";
        // let decodeFromkeyPair = Base58check.encode(from, apex);
        // console.log("From---" + decodeFromkeyPair);

        // //Base58check decode
        // let to_Address = "APGMmPKLYdtTNhiEkDGU6De8gNCk3bTsME9";
        // let to_Address_data = Base58check.decode(to_Address, "hex").data;
        // let to_Address_data_result = to_Address_data.slice(2);
        // console.log("To---" + to_Address_data_result);
        // //Base58check encode
        // let to = "9df7fc7ca2358cc2c0535e4d08532d9733e2bf58";
        // let decodeTokeyPair = Base58check.encode(to, apex);
        // console.log("To---" + decodeTokeyPair);

        // let message = "416c616e20547572696e67";
        // // let message = "Alan Turing".getBytes("US-ASCII")
        // // console.log(message);

        // let key =
        //   "f8b8af8ce3c7cca5e300d33939540c10d45ce001b8f252bfbc57ba0342904181";
        let messageToBuffer = Buffer.from(message, "hex");
        
        let hash = bitcoin.crypto.sha256(messageToBuffer);
        let keyToBuffer = Buffer.from(privKey, "hex");
        let signature = ECPair.fromPrivateKey(keyToBuffer).sign(hash);
        let signature_encode = script_signature.encode(signature, 1);
        let signature_toHex = signature_encode.toString("hex");
        //3044022030a2f70a1af80b33eb999f3654f8e3daa5f7b8dbfd45499c6fd4a927e75b7f62022025e819d63a4158bdd1f5bf51e2c1c690663c59c836524366366755394c37dbf201
        
        let signature_result = signature_toHex.substring(0, signature_toHex.length - 2);
        //3044022030a2f70a1af80b33eb999f3654f8e3daa5f7b8dbfd45499c6fd4a927e75b7f62022025e819d63a4158bdd1f5bf51e2c1c690663c59c836524366366755394c37dbf2
        
        return signature_result
    },
    serialized_transaction(version, txType, from, toPubKeyHash, amount, nonce, data, gasPrice, gasLimit, executeTime, signature) {
        // let version = "00000001";
        // let txType = "01";
        // let from = "e2a4b7c6582f4e837668504eb2f4eaa796e908e4";
        let apex = "0548";
        //Base58check decode
        let decode_from_Data = Base58check.decode(from, "hex")
            .data;
        let from_result = decode_from_Data.slice(2);
        //Base58check decode
        let decodetoPubKeyHash_data = Base58check.decode(toPubKeyHash, "hex").data;
        let toPubKeyHash_result = decodetoPubKeyHash_data.slice(2);
        //9df7fc7ca2358cc2c0535e4d08532d9733e2bf58

        // let amount = "080de0b6b3a7640000";
        // let nonce = "0000000000000002";
        // let data = "00";
        // let gasPrice = "020237";
        // let gasLimit = "020315";
        // let signature = "46304402206afddf1f5fa1bbe9f91b9b4a39006a9196a07ca1acf106f5c5a13a327196b47702202def3ffd84b293b324fe95cc67504816f3185690425d51d580cea1707daedd8a";
        // let executeTime = "0000000000000000";
        return version + txType + from_result + toPubKeyHash_result + amount + nonce + data + gasPrice + gasLimit + executeTime + signature;
        //0000000101e2a4b7c6582f4e837668504eb2f4eaa796e908e49df7fc7ca2358cc2c0535e4d08532d9733e2bf581,0,0,0,0,0,0,0,0,0000000000000000200020237020315000000000000000046304402206afddf1f5fa1bbe9f91b9b4a39006a9196a07ca1acf106f5c5a13a327196b47702202def3ffd84b293b324fe95cc67504816f3185690425d51d580cea1707daedd8a
    }
}
export default { utilMethods }