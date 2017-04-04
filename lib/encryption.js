"use strict";

const secret  = "asdkjtrewouity42398578478524083957nvnlwkcm;imr8n384n7cqn0m8";

const algorithm = 'aes-256-ctr';

const crypto = require('crypto');

class Encryption{
  salt() {
    return crypto.randomBytes(32).toString('hex').slice(32);
  }

  digest(plaintext){
    const hash = crypto.createHash('sha256');
    hash.update(plaintext);
    hash.update(secret);

    return hash.digest('hex');
  }

  encipher(plaintext){
    const cypher = crypto.createCipher(algorithm, secret);
    var encrypted = cypher.update(plaintext, 'utf8', 'hex');
    encrypted += cypher.final('hex');
    return encrypted;
  }

  decrypt(cryptext){
    const decypher = crypto.createCipher(algorithm, secret);
    var decyphered = decypher.update(cryptext, 'hex', 'utf8');
    decyphered += decypher.final('utf8');
    return decyphered;
  }
}

module.exports = new Encryption();
