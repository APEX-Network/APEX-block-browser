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
        // let messageToBuffer = Buffer.from(signParams.message, "hex");
        console.log(signParams.message);
        let hash = Bitcoin.crypto.sha256(signParams.message);
        let keyToBuffer = Buffer.from(signParams.privKey, "hex");
        let signature = ECPair.fromPrivateKey(keyToBuffer).sign(hash);
        let signature_encode = script_signature.encode(signature, 0x01);
        let signature_toHex = signature_encode.toString("hex");
        // let signature_result = signature_toHex.substring(0, signature_toHex.length - 2);
        return "46" + signature_toHex
    },
    serialized_transaction(message, signature) {
        return message + signature
    },
    produce_message(serializParams) {
        let decode_from = Base58check.decode(serializParams.from).data.toString("hex");
        let from = decode_from.substring(2);
        console.log(from);

        //Base58check decode
        let decode_PubKeyHash = Base58check.decode(serializParams.to).data.toString("hex");
        let to = decode_PubKeyHash.substring(2);
        console.log(to);

        let byteArrayamount = BigInteger(serializParams.amount.toString()).toByteArray();
        let amount_hex = Buffer.from(byteArrayamount, "hex").toString("hex")
        let amount_prefix = (amount_hex.length) / 2;
        let amount;
        if (amount_prefix < 10) {
            amount = "0" + amount_prefix + amount_hex;
        };
        if (amount_prefix >= 10) {
            amount = amount_prefix.toString("hex") + amount_hex;
        };
        let byteArraygasePrice = BigInteger(serializParams.gasPrice.toString()).toByteArray();
        let gasPrice_hex = Buffer.from(byteArraygasePrice, "hex").toString("hex");
        let gasPrice_prefix = (gasPrice_hex.length) / 2;
        let gasPrice;
        if (gasPrice_prefix < 10) {
            gasPrice = "0" + gasPrice_prefix + gasPrice_hex;
        };
        if (gasPrice_prefix >= 10) {
            gasPrice = gasPrice_prefix.toString("hex") + gasPrice_hex;
        }
        let byteArraygaseLimit = BigInteger(serializParams.gasLimit.toString()).toByteArray();
        let gasLimit_hex = Buffer.from(byteArraygaseLimit, "hex").toString("hex");
        let gasLimit_prefix = (gasLimit_hex.length) / 2;
        let gasLimit;
        if (gasLimit_prefix < 10) {
            gasLimit = "0" + gasLimit_prefix + gasLimit_hex;
        };
        if (gasLimit_prefix >= 10) {
            gasLimit = gasLimit_prefix .toString("hex") + gasLimit_hex;
        };
        console.log("amount:" + amount + "serializParams.nonce" + serializParams.nonce);
        
        return serializParams.version + serializParams.txType + from + to + amount + "000000000000000"+serializParams.nonce + serializParams.data + "020237" + gasLimit+ serializParams.executeTime;
    },
    produce_KeyStore(keyStoreParams) {
        let data = keyStoreParams.data;
        let bigArraypwd = BigInteger(keyStoreParams.key).toByteArray();
        let pwdToBuffer = Buffer.from(bigArraypwd, "hex");
        let byteArraypwd = CryptoJS.enc.Utf8.parse(pwdToBuffer);
        let key = CryptoJS.SHA256(byteArraypwd).toString();
        let iv = key.substring(0, 16);
        // Encrypt
        let keyStore = CryptoJS.AES.encrypt(data, key, iv);
        let downKeyStore = keyStore.toString();
        return downKeyStore
    },
    keyStoreWallet(downKeyStore, key) {
        let bigArraypwd = BigInteger(key).toByteArray();
        let pwdToBuffer = Buffer.from(bigArraypwd, "hex");
        let byteArraypwd = CryptoJS.enc.Utf8.parse(pwdToBuffer);
        let keyStorekey = CryptoJS.SHA256(byteArraypwd).toString();
        let iv = keyStorekey.substring(0, 16);
        let DeckeyStore = CryptoJS.AES.decrypt(downKeyStore, keyStorekey, iv);
        let privKey = DeckeyStore.toString(CryptoJS.enc.Utf8);
        console.log(privKey);
        
        //  根据私钥生成地址
        let privKeyToBuffer = Buffer.from(privKey, "hex");
        let privKeyToPub = ECPair.fromPrivateKey(privKeyToBuffer).publicKey;
        let pubHash = Crypto.ripemd160(Crypto.sha256(privKeyToPub)).toString(
            "hex"
        );
        let ap = "0548";
        let pubAddress = Base58check.encode(pubHash, ap);
        return pubAddress
    },
    privKeyWallet(userPrivKey, key) {
        let privKeyToBuffer = Buffer.from(userPrivKey, "hex");
        let privKeyToPub = ECPair.fromPrivateKey(privKeyToBuffer).publicKey;
        let pubHash = Crypto.ripemd160(Crypto.sha256(privKeyToPub)).toString(
            "hex"
        );
        let ap = "0548";
        let pubAddress = Base58check.encode(pubHash, ap);
        return pubAddress
    },
    produceKeyPriv(downKeyStore, key) {
        let bigArraypwd = BigInteger(key).toByteArray();
        let pwdToBuffer = Buffer.from(bigArraypwd, "hex");
        let byteArraypwd = CryptoJS.enc.Utf8.parse(pwdToBuffer);
        let keyStorekey = CryptoJS.SHA256(byteArraypwd).toString();
        let iv = keyStorekey.substring(0, 16);
        let DeckeyStore = CryptoJS.AES.decrypt(downKeyStore, keyStorekey, iv);
        let privKey = DeckeyStore.toString(CryptoJS.enc.Utf8);
        return privKey
    },
}
export default { utilMethods }