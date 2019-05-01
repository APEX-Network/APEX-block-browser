const ECPair = require("bitcoinjs-lib/src/ecpair");
const Crypto = require("bitcoinjs-lib/src/crypto");
const Bitcoin = require("bitcoinjs-lib");
const Base58check = require('base58check');
const script_signature = require("bitcoinjs-lib/src/script_signature");
const CryptoJS = require('./../../node_modules/crypto-js/crypto-js.js');
const BigInteger = require('bigi');
const bigdecimal = require("bigdecimal");


const utilMethods = {
    listUTCtime(timespan, serverTime) {
        let serverDate = new Date(serverTime).getTime();
        // console.log(new Date(serverTime));
        let serDay = new Date(serverTime).getUTCDate();
        let timeDay = new Date(timespan).getUTCDate();
        let diffTime = (serverDate - timespan) / 1000;
        let formatterTime = new Date(serverDate - timespan);
        // console.log(formatterTime);
        // console.log(new Date(timespan));
        // console.log(diffTime);
        let havePoint = diffTime.toString().indexOf(".");
        let date;
        if (havePoint > -1) {
            date = diffTime.toString().split(".")[0];
            // console.log(date);
        }
        if (havePoint == -1) {
            date = diffTime
            // console.log(date);
        }
        let allTime = (new Date(timespan)).toUTCString();
        let apM = new Date(timespan).getUTCHours();
        let utc = allTime.split("GMT")[0];
        let utctime = utc.split(",")[1];
        if (apM <= 12) {
            if (date == 60) {
                return "1" + " min ago";
            }
            if (date < 60) {
                if (date == 0 || date < 0) {
                    return "0.5 sec ago"
                } else {
                    return date + " sec ago";
                }
            }
            if (date > 60 && date < 3600) {
                return formatterTime.getUTCMinutes() + "   min ago";
            }
            if (date >= 3600 && date < 86400) {
                return formatterTime.getUTCHours() + " hour ago";
            };
            if (date >= 86400) {
                let diffDay = serDay - timeDay;
                if (diffDay !== 0) {
                    return diffDay + "  day ago";
                }
            };
        }
        if (apM > 12) {
            if (date == 60) {
                return "1" + " min ago";
            }
            if (date < 60) {
                if (date == 0 || date < 0) {
                    return "0.5 sec ago"
                } else {
                    return date + " sec ago";
                }
            }
            if (date > 60 && date < 3600) {
                return formatterTime.getUTCMinutes() + "    min ago";
            }
            if (date >= 3600 && date < 86400) {
                return formatterTime.getUTCHours() + " hour ago";
            };
            if (date >= 86400) {
                let diffDay = serDay - timeDay;
                if (diffDay !== 0) {
                    return diffDay + "  day ago";
                }
            };
        }
    },
    toUTCtime(timespan, serverTime) {
        let serverDate = new Date(serverTime).getTime();
        // console.log(serverTime);
        let serverDay = new Date(serverDate).getUTCDate();
        let timeStampDay = new Date(timespan).getUTCDate();
        let formatterTime = new Date(serverDate - timespan);
        let diffTime = (serverDate - timespan) / 1000;
        let havePoint = diffTime.toString().indexOf(".");
        // console.log(diffTime);
        // console.log(havePoint);
        let date;
        if (havePoint > -1) {
            date = diffTime.toString().split(".")[0];
        }
        if (havePoint == -1) {
            date = diffTime;
        }
        let allTime = (new Date(timespan)).toUTCString();
        // console.log(allTime);
        let apM = new Date(timespan).getUTCHours();
        let utc = allTime.split("GMT")[0];
        let utctime = utc.split(",")[1];
        if (apM <= 12) {
            if (date == 60) {
                return "1" + " min ago"
                    + " " + "(" + utctime + "AM +UTC" + ")";
            }
            if (date < 60) {
                return date + " sec ago"
                    + " " + "(" + utctime + "AM +UTC" + ")";
            }
            if (date > 60 && date < 3600) {
                return formatterTime.getUTCMinutes() + "    min  " + formatterTime.getUTCSeconds() + "    sec ago" + " " + "(" + utctime + "AM    +UTC" + ")";
            }
            if (date >= 3600 && date < 86400) {
                return formatterTime.getUTCHours() + "   hour" + " " + formatterTime.getUTCMinutes() + " min" + " " + formatterTime.getUTCSeconds() + " sec ago" + " " + "(" + utctime + "AM    +UTC" + ")";
            };
            if (date >= 86400) {
                let diffDay = Math.abs(serverDay - timeStampDay);
                if (diffDay !== 0) {
                    return diffDay + "   Day" + "  " + formatterTime.getUTCHours() + "   hour" + " " + formatterTime.getUTCMinutes() + " min" + " " + formatterTime.getUTCSeconds() + " sec ago" + "   " + "(" + utctime + "AM    +UTC" + ")";
                }
            };
        }
        if (apM > 12) {
            if (date == 60) {
                return "1" + " min ago"
                    + " " + "(" + utctime + "PM +UTC" + ")";
            }
            if (date < 60) {
                return date + " sec ago"
                    + " " + "(" + utctime + "PM +UTC" + ")";
            }
            if (date > 60 && date < 3600) {
                return formatterTime.getUTCMinutes() + "    min  " + formatterTime.getUTCSeconds() + "    sec ago" + " " + "(" + utctime + "PM    +UTC" + ")";

            }
            if (date >= 3600 && date < 86400) {
                return formatterTime.getUTCHours() + "   hour" + " " + formatterTime.getUTCMinutes() + " min" + " " + formatterTime.getUTCSeconds() + " sec ago" + " " + "(" + utctime + "PM    +UTC" + ")";
            };
            if (date >= 86400) {
                let diffDay = Math.abs(serverDay - timeStampDay);
                if (diffDay !== 0) {
                    return diffDay + "   Day" + "  " + formatterTime.getUTCHours() + "   hour" + " " + formatterTime.getUTCMinutes() + " min" + " " + formatterTime.getUTCSeconds() + " sec ago" + "   " + "(" + utctime + "PM    +UTC" + ")";
                }
            };

        }
    },
    tierAllTime(data) {
        var datatime = '';
        if (data != null || data != undefined) {
            timestampToTime(data);
            function timestampToTime(timestamp) {
                var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getUTCFullYear() + '-';
                var M = (date.getUTCMonth() + 1 < 10 ? '0' + (date.getUTCMonth() + 1) : date.getUTCMonth() + 1) + '-';
                var D;
                if (date.getUTCDate() < 10) {
                    D = "0" + date.getUTCDate() + " ";
                } else {
                    D = date.getUTCDate() + " ";
                }
                var h = (date.getUTCHours() < 10 ? '0' + (date.getUTCHours()) : date.getUTCHours()) + ':';
                var m = (date.getUTCMinutes() < 10 ? '0' + (date.getUTCMinutes()) : date.getUTCMinutes()) + ':';
                var s = (date.getUTCSeconds() < 10 ? '0' + (date.getUTCSeconds()) : date.getUTCSeconds());
                datatime = Y + M + D + h + m + s;
                return Y + M + D + h + m + s;
            }
            return datatime;
        }
    },
    producePrivKey() {
        return ECPair.makeRandom().privateKey.toString("hex")
    },
    produce_address(privKey, ap) {
        let privKeyToBuffer = Buffer.from(privKey, "hex");
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
        let signature_encode = script_signature.encode(signature, 0x01);
        let signature_toHex = signature_encode.toString("hex");
        let signature_result = signature_toHex.substring(0, signature_toHex.length - 2);
        let signature_result_length = signature_result.length / 2;
        let signature_result_prefix = (signature_result_length).toString(16);
        return signature_result_prefix + signature_result;
    },
    serialized_transaction(message, signature) {
        return message + signature
    },
    produce_message(serializParams) {
        let decode_from = Base58check.decode(serializParams.from).data.toString("hex");
        let from = decode_from.substring(2);
        //Base58check decode
        let decode_PubKeyHash = Base58check.decode(serializParams.to).data.toString("hex");
        let to = decode_PubKeyHash.substring(2);
        let eightPow = new bigdecimal.BigInteger(Math.pow(10, 18).toString());
        let bigEightPow = new bigdecimal.BigDecimal(eightPow);
        let bigAmount = new bigdecimal.BigDecimal(String(serializParams.amount));
        let amountMultiplyEightPow = bigAmount.multiply(bigEightPow).toString();
        let byteArrayamount = BigInteger(amountMultiplyEightPow.split(".")[0]).toByteArray();
        let amount_length = byteArrayamount.length;
        let amount_hex = Buffer.from(byteArrayamount, "hex").toString("hex");
        let amount
        if (amount_length <= 15) {
            amount = "0" + Number(amount_length).toString(16) + amount_hex;
        };
        if (amount_length >= 16) {
            amount = Number(amount_prefix).toString(16) + amount_hex;
        };
        let nonce;
        if (serializParams.nonce <= 15) {
            if (serializParams.nonce < 10) {
                nonce = "000000000000000" + serializParams.nonce;
            };
            if (serializParams.nonce >= 10) {
                nonce = "000000000000000" + Number(serializParams.nonce).toString(16);
            };
        };
        if (serializParams.nonce > 15 && serializParams.nonce <= 255) {
            let nonce_hex = Number(serializParams.nonce).toString(16);
            nonce = "00000000000000" + nonce_hex;
        };
        if (serializParams.nonce > 255 && serializParams.nonce <= 4095) {
            let nonce_hex = Number(serializParams.nonce).toString(16);
            nonce = "0000000000000" + nonce_hex;
        };
        if (serializParams.nonce > 4095 && serializParams.nonce <= 65535) {
            let nonce_hex = Number(serializParams.nonce).toString(16);
            nonce = "000000000000" + nonce_hex;
        };
        let gasPrice_hex = Number(serializParams.gasPrice).toString(16);
        let gasPrice;
        if (gasPrice_hex.length % 2 == 1) {
            let gasPrice_prefix = "0" + gasPrice_hex;
            let gasPrice_length = gasPrice_prefix.length / 2;
            if (gasPrice_length < 10) {
                gasPrice = "0" + gasPrice_length + gasPrice_prefix;
            };
            if (gasPrice_length >= 10) {
                gasPrice = gasPrice_length + gasPrice_prefix;
            };
        };
        if (gasPrice_hex.length % 2 == 0) {
            let gasPrice_prefix = gasPrice_hex;
            let gasPrice_length = gasPrice_prefix.length / 2;
            if (gasPrice_length < 10) {
                gasPrice = "0" + gasPrice_length + gasPrice_prefix;
            };
            if (gasPrice_length >= 10) {
                gasPrice = gasPrice_length + gasPrice_prefix;
            };
        };
        let byteArraygaseLimit = BigInteger(serializParams.gasLimit.toString()).toByteArray();
        let gasLimit_hex = Buffer.from(byteArraygaseLimit, "hex").toString("hex");
        let gasLimit_prefix = (gasLimit_hex.length) / 2;
        let gasLimit;
        if (gasLimit_prefix < 10) {
            gasLimit = "0" + gasLimit_prefix + gasLimit_hex;
        };
        if (gasLimit_prefix >= 10) {
            gasLimit = gasLimit_prefix.toString("hex") + gasLimit_hex;
        };
        if (serializParams.data == "00") {
            return serializParams.version + serializParams.txType + from + to + amount + nonce + serializParams.data + gasPrice + gasLimit + serializParams.executeTime;
        };
        if (serializParams.data !== "00" && serializParams.votingRefundType == "00") {
            let decode_vote = Base58check.decode(serializParams.data).data.toString("hex");
            let vote_length = Base58check.decode(serializParams.data).data.length;
            let vote = decode_vote.substring(2);
            let voting_data = vote + amount + serializParams.votingRefundType;
            let data_length = vote_length + amount_length + 1;
            let data;
            if (data_length < 16) {
                data = "0" + Number(data_length).toString(16) + voting_data;
            };

            if (data_length >= 16) {
                data = Number(data_length).toString(16) + voting_data;
            };
            return serializParams.version + serializParams.txType + from + to + "0100" + nonce + data + gasPrice + gasLimit + serializParams.executeTime;
        };
        if (serializParams.data !== "00" && serializParams.votingRefundType == "01") {
            let decode_vote = Base58check.decode(serializParams.data).data.toString("hex");
            let vote_length = Base58check.decode(serializParams.data).data.length;
            let vote = decode_vote.substring(2);
            let voting_data = vote + amount + serializParams.votingRefundType;
            let data_length = vote_length + amount_length + 1;
            let data;
            if (data_length < 16) {
                data = "0" + Number(data_length).toString(16) + voting_data;
            };

            if (data_length >= 16) {
                data = Number(data_length).toString(16) + voting_data;
            };
            return serializParams.version + serializParams.txType + from + to + "0100" + nonce + data + gasPrice + gasLimit + serializParams.executeTime;
        }

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