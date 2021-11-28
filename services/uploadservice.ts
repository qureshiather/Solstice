import { ImageService } from "./imageservice";
import { programs } from "@metaplex/js";
import Arweave from "arweave";
const fs = require("fs");
import {
  PublicKey,
  Connection,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  SOLANA_RPC_HOST,
  UPDATE_AUTHORITY_KEYPAIR,
} from "../server";
// @ts-ignore
import fetch from 'node-fetch';

const arweaveJWK = {
  kty: "RSA",
  n: "0FOfCBV63rlv6Ves-I04FWarIfWhtG4xoxkAPzvSrDu-MuYPMqYa3daWGdsKhQKImjRfG-mCiMHIEdJfsPY_e4Y4XxqPGiJuE5UzZiXW8OMYZNmTbuyHaEgKRspXkN1rFMIxk8vs7ZbFRrSgzETg37FPFCFSLhXWA09IDAAHyYlvEn2QgmVFvQdVfAhBOMS5f7IB3bI2aNWNQQzcZEj7_DWUFZzKEMYTWMa1-PI2Szm_1AuP5h0mxjYz7ZnANkQ8BR46FQOsTmiv5ty4Qp-vvTb7IkjfOkOUKNEuvpr5LmsPrJMfnqMrlZhKlnSd6x0ryckLXKDW9vc5opibRvwx0EGaDa5iioh-Zk-5KdcuXSslnXIC6WsiLwILJB-SCh67IWaSzrHXRrmFboZ7aRBAi2TZe9Jo2vOa62ejeJmLOCrUSpnNzU5dmCpRKfizN_yP_WCiQ9YNqGsr_Elung3C6cGb36sajYvdKp7xeJi8gK9AzVe6u_9T8sQFsk0qvxhCZyC3zLAzngH_zcdSnbEhoe2BkjqEr98LBLdNOs6if9lYN_vvV1YwQqs7lcW2njEpQb-vAQ1ZS1wMX4uY54u1kgfJ4FNmV4Twd8qiqkzceEtNUpojhxd60gjgfkTrE_7nEmujIyGEHjd1C8dRIXqc4AMc6gcszAxi3JgZwAjvboU",
  e: "AQAB",
  d: "bmoTnOY9lDR2kxcsDyRR-E3NIBefGBFbb5U9o0Yit7SGb1Wt8mtFTBSCw7trjOm12v0s949A5xjF4GQ-4XzyUpbl48og1HoxG2H1twsRK-VBNZp34M-uSN_9yl1OIfKo4Xy3aB0qOxaxAnOT0hAjm4vPXNz4QILERkbL6chOWEvmOcehQutIFhMABNgfMWZa5spC4Oyml9OvpS2a1fA01gzTqszJ8C_7aw8OvZ4qlp5KBKoIH6-NsHpj9WeLD3gE07WclSy4M2qa6GJNqsoWC9RLMHWtEqVkrmmIO-_JaAfIa_AiTyMuY4Au8CVo2YdBgRZ0VijNJmIMAxidG_dosoJ0w7OXweiwW0PhN7uzSSzHnbgYxLHa5zQ8svberPCLHbKjojv8ml7f3g4gdB2RkZg0oy5srSorHUEiJWsyRzVJSyA115L-A1W39y_fR1bQlf6Tmn76kf8lnk1XyZaDm2nvLF_fVpgcwXR8cmrfKIa8EP6yKz9VIgeZxMJiilDGiadDAmimS4UlnFoQQKB62sdrYQpW5SVOIKINqESpokdakcTnV6LroybYNBRrFTHiQg_TIMivQ5eSv5KuTbBZJUMTeRAe2aeLFfCdtZEJxl4_yjxrHLB2XV6IWKsc4EyiXptunZnUeA_oBRMO8jsAnfndQSTERcRpnUL2gaave4E",
  p: "6GYRvGqBBc7IXEKjmXtKa_b79AZUwp1tp4pipayGW8UcQZum7ICZmF0BsOm-VHPQmKhuAe_aFZ9U4cQqTPJXOW6AklUjFSrg21uTm8U3lFXx-GmKt2ItBeLE9ZSa6gBYcubDGz8PzuBgWsi0uRQf8I7gkEuk7uqFxP-kz4rogbXOBuAS0ceXQeeqP73y-SISBwYTZ4hTDhPhknpP8mSB0YZpffd1W03eRfQ9H6IUEF0c7E3eya_ZLwFTGvVusPWyuABMxnc7bw9Ejyclzaoqhu0qZ9UQmL_O-EsW4gYSJQnVSOEAQ9vM0KIVgaQeM15q5CSQM0OBXVcf5qahxv-YIQ",
  q: "5Xu5MvR3YWaWTnccBh8cvXswCCDDEgvkjVIHJhYonxcjtb-V-KDS-K38g5_ndoQPNXqejDRgS9EvS7Ca226FEhZusgIPSIYIUKb4qLhh9PlOnwGjeDVkKs6kEOxVtkD62bmgjXEue_7VtdBn5mWpM3Zav_eCxjT8I9a2Q7zMKhl1mchTMtsbaa-5G6JL48mtcAd420FoyotE5cNmqSOBME_bN3reCPs2zt4JINezzICdl2KxGvimeazBLk0i2wI4gLoL6_q0Wx-izY2HWdemEWRRSmOuOTF-p4_cLTx-l-eEr6DpXla1tK5a28olBrwWku3sEoCcReEWurGH68055Q",
  dp: "JOdoc5oaCPkQOg5e-lVouQJMejCzLwBe1FcWWSavY01GsmhsNmwpd9d1GEnV7oVBn6xHY8lZwUs-6GcFLJjjHvycMCCS5J6dfFfrdbX4oHaRaRghbgOKEMA09KZ3fyc05HIek2oNMZXR1zi98hHvDH0zzdYlR8c4HNNXsZlmWIqtP8w_UM64B0ApedvJBKTTZggh9rPgNIEVtfP0VBJ_xuzoPZeZLDmOTV9-gVJ0izCuEhw_f5mMDHnSX5qPzEwH6E4r4uw2JOmwwma-Cw21mR16OWjNLORwkl8iMBw0r2sDUoJgT2ZM_OhwL9kG7rNUmAvyViGnHlJif3cAg6A84Q",
  dq: "Y5eQRlbmQHUfIip7FQUHmgwOSli9j-VtaQ-CXrsbIgAO1V-yHFbfeGE5x33sG_kwCIuQp1RLvluoZPbeHgEW60SlAcf3DghtL2NnYwGyMXjI8CTr5s11DUbk2RtYD2Kf-0GeNgQ6okF0ShWKIelYxybEN6-ZJ5_zFTKnozoaeOLXsMfJo7aHbRSAB0gmG1N5W7dCchUu_0f1vKlSsnDgLjFZ9_fwyIENxjWCTKiQNV5UBlEkf4oN5ZxdslRzngyWrPcRGXaSM0HFi-OyLAF05vNcfCZKhDPAvcOnUFKCtjYZ1YbGANUswp8we1Z9PzD9swJig50hNQp8rMVDMci9KQ",
  qi: "qqtGEN6wA2erHUrNL1s7btwwYe8E1fMZdDc6v26sF72rBI5Qfo7Mn4DVyGlfzIFrfY4MGyvXeJJD9GDYb89qikM3IXRUKuNJYU8ZYmEzRTRmmHktW00rLI4r-M2cXUZ4F4ekoBDNduX67sLWU2-F8o3emqNVw-8pYZlhvNskhukiT5CE6IV_SkqWAe6nHREvCYaclKSS8m0mwxk2nmqF39pVEcf9tkSu7M6q-0V9toXq4BMYofayGN0DECGXtxfwtfIaJL9zOYQm7mOVq1G_pwRY2oniOt5wFIKOHxxcBXZNHrQs9RcCOgTBCL1EMgI7sNYiPJkcWDFJrsaeywEYfQ",
};

export class UploadService {

  async updateMetadata(seedString: String, artConfig: any, tokenId: String) {
    const uploadFile = async (fileName: String) => {
      const arweave = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
      });
      await arweave.wallets.jwkToAddress(arweaveJWK);
      let key = await arweave.wallets.generate();
      let data = await fs.readFileSync(fileName);
      let transaction = await arweave.createTransaction(
        { data: data },
        key
      );
      transaction.addTag("Content-Type", "image/png");
      await arweave.transactions.sign(transaction, key);
      await arweave.transactions.post(transaction);
      fs.unlinkSync(fileName); // deletes file
      const permURLToImage = `https://www.arweave.net/${transaction.id}?ext=png`;
      
      const connection = new Connection(SOLANA_RPC_HOST);

      let {
        metadata: { Metadata, UpdateMetadata, MetadataDataData },
      } = programs;
      let metadataAccount = await Metadata.getPDA(new PublicKey(tokenId));
      const metadat = await Metadata.load(connection, metadataAccount);
      let metadataName = metadat.data.data.name;
      const mintNumber = metadataName.split('#')[1]
      const newTokenname = `Solstice #${mintNumber}`

      const originalJSONURI = metadat.data.data.uri;
      const response = await fetch(originalJSONURI);
      const originalJsonData = await response.json();

      let newJSONData = JSON.parse(JSON.stringify(originalJsonData))
      newJSONData.name = newTokenname;
      newJSONData.description = `Uniquely generated art with seed: ${seedString}`;
      newJSONData.image = permURLToImage;
      newJSONData.properties.files[0].uri = permURLToImage;
      newJSONData.properties.files[0].type = "image/png";
      newJSONData.attributes[0] = {"trait_type": "Type", "value": "Art"}
      newJSONData.collection = {"name": "SolsticeNFT", "family": "ProjectSolstice"}

      let jsonTransaction = await arweave.createTransaction({
        data: JSON.stringify(newJSONData)
      }, key);
      jsonTransaction.addTag("Content-Type", "application/json");
      await arweave.transactions.sign(jsonTransaction, key);
      await arweave.transactions.post(jsonTransaction);
      const permURLToJSON = `https://www.arweave.net/${jsonTransaction.id}`;

      let newMetadataData = new MetadataDataData({
        name: newTokenname,
        symbol: metadat.data.data.symbol,
        uri: permURLToJSON,
        creators: metadat.data.data.creators,
        sellerFeeBasisPoints: metadat.data.data.sellerFeeBasisPoints,
      });
      const updateTx = new UpdateMetadata(
        { feePayer: UPDATE_AUTHORITY_KEYPAIR.publicKey },
        {
          metadata: metadataAccount,
          updateAuthority: UPDATE_AUTHORITY_KEYPAIR.publicKey,
          metadataData: newMetadataData,
          newUpdateAuthority: UPDATE_AUTHORITY_KEYPAIR.publicKey,
          primarySaleHappened: metadat.data.primarySaleHappened,
        }
      );
      await sendAndConfirmTransaction(connection, updateTx, [
        UPDATE_AUTHORITY_KEYPAIR,
      ]);
    };
    ImageService.generateArt(seedString, artConfig, uploadFile)
  }
}
