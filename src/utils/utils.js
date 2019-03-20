const ECPair = require("bitcoinjs-lib/src/ecpair");
const Crypto = require("bitcoinjs-lib/src/crypto");
const Bitcoin = require("bitcoinjs-lib");
const Base58check = require('base58check');
const script_signature = require("bitcoinjs-lib/src/script_signature");
const CryptoJS = require('./../../node_modules/crypto-js/crypto-js.js');
const BigInteger = require('bigi');


const utilMethods = {
    tierNoYear(data) {
        var datatime = '';
        if (data != null || data != undefined) {
            timestampToTime(data);
            function timestampToTime(timestamp) {
                var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D;
                if (date.getDate() < 10) {
                    D = "0" + date.getDate() + " ";
                } else {
                    D = date.getDate() + " ";
                }
                var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
                var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
                datatime = h + m + s;
                return h + m + s;
            }
            return datatime;
        }
    },
    tierAllTime(data) {
        var datatime = '';
        if (data != null || data != undefined) {
            timestampToTime(data);
            function timestampToTime(timestamp) {
                var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D;
                if (date.getDate() < 10) {
                    D = "0" + date.getDate() + " ";
                } else {
                    D = date.getDate() + " ";
                }
                var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
                var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
                datatime = Y + M + D + h + m + s;
                return Y + M + D + h + m + s;
            }
            return datatime;
        }
    },
    getSec(data) {
        let data_result = new Date() - data
        let datatime = '';
        if (data_result != null || data_result != undefined) {
            timestampToTime(data_result);
            function timestampToTime(timestamp) {
                var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D;
                if (date.getDate() < 10) {
                    D = "0" + date.getDate() + " ";
                } else {
                    D = date.getDate() + " ";
                }
                var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
                var s = (date.getSeconds() < 10 ? (date.getSeconds()) : date.getSeconds());
                datatime = s;
                return s;
            }
            if (datatime == 0) {
                datatime = 0.5;
            }
            return datatime + " " + "seconds ago";
        }
    },
    getMin(data) {
        var datatime = '';
        if (data != null || data != undefined) {
            timestampToTime(data);
            function timestampToTime(timestamp) {
                var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D;
                if (date.getDate() < 10) {
                    D = "0" + date.getDate() + " ";
                } else {
                    D = date.getDate() + " ";
                }
                var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
                var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
                datatime = m;
                return m;
            }
            return datatime;
        }
    },
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
        let signature_result = signature_toHex.substring(0, signature_toHex.length - 2);
        return signature_result
    },
    serialized_transaction(serializParams) {
        if (!serializParams.version || !serializParams.txType || !serializParams.from || !serializParams.toPubKeyHash || !serializParams.amount || !serializParams.nonce || !serializParams.data || !serializParams.gasPrice || !serializParams.gasLimit || !serializParams.executeTime || !serializParams.signature) {
            console.log("one of version, txType, from, toPubKeyHash, amount , nonce, data, gasPrice, , gasLimit, executeTime, signature and changeAddress is null, please give a valid param");
        } else {
            console.log("param is valid, start serialized transaction");
            let decode_from = Base58check.decode(serializParams.from, "hex")
                .data;
            let from = decode_from.slice(2);
            //Base58check decode
            let decode_PubKeyHash = Base58check.decode(serializParams.toPubKeyHash, "hex").data;
            let toPubKeyHash = decode_PubKeyHash.slice(2);

            let byteArrayamount = BigInteger(serializParams.amount.toString()).toByteArray();
            let amount = "08" + Buffer.from(byteArrayamount, "hex").toString("hex");
            console.log(amount);
            let byteArraygasePrice = BigInteger(serializParams.gasPrice.toString()).toByteArray();
            let gasPrice = "02" + Buffer.from(byteArraygasePrice, "hex").toString("hex");
            console.log(gasPrice);
            let byteArraygaseLimit = BigInteger(serializParams.gasLimit.toString()).toByteArray();
            let gasLimit = "02" + Buffer.from(byteArraygaseLimit, "hex").toString("hex");
            console.log(gasLimit);
            return serializParams.version + serializParams.txType + from + toPubKeyHash + amount + serializParams.nonce + serializParams.data + gasPrice + gasLimit + serializParams.executeTime + serializParams.signature;
        }
    },
    produce_KeyStore(keyStoreParams) {
        let data = keyStoreParams.data;
        console.log(data);
        
        let byteArraypwd = BigInteger(keyStoreParams.key).toByteArray();
        let pwdToBuffer = Buffer.from(byteArraypwd, "hex");
        console.log(pwdToBuffer);
        let key = Bitcoin.crypto.sha256(Buffer.from(pwdToBuffer, "hex")).toString("hex");
        console.log(key);
        //bf7cbe09d71a1bcc373ab9a764917f730a6ed951ffa1a7399b7abd8f8fd73cb4
        let iv = key.substring(0, 16);
        console.log(iv);
        //bf7cbe09d71a1bcc
        let keyStore = Buffer.from(CryptoJS.AES.encrypt(data, key, iv).ciphertext.words, "hex").toString("hex");
        console.log(keyStore);
        //eb5d29320a95114463305109f6fc4ba7e6ffe2de
        let x = Buffer.from(keyStore, "hex").toString("hex");
        console.log(x);
        

        let deKeyStore = CryptoJS.AES.decrypt(x, key, iv);
        console.log(Buffer.from(deKeyStore.words, "hex"));
        
        // console.log(Buffer.from(deKeyStore, "hex").toString("hex").toString("hex"));
        
        return keyStore
    }
}
export default { utilMethods }