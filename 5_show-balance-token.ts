import { KeyringProvider } from '@unique-nft/accounts/keyring';
import { KeyringOptions } from '@polkadot/keyring/types';
import { Sdk, Options, Client } from "@unique-nft/sdk";

const seed = 'key remove clerk live debate figure...';

(async () => {
    const options: KeyringOptions = {
        type: 'sr25519',
    };
    const provider = new KeyringProvider(options);
    await provider.init();

    const signer = provider.addSeed(seed);

    const clientOptions: Options = {
        baseUrl: 'https://rest.unique.network/opal/v1',
        signer,
    };
    const sdk: Client = new Sdk(clientOptions);

    // find address in rest: /address-utils/nesting/ids-to-address
    const result = await sdk.refungible.getBalance({
        address: '0xf8238CcfFf8ed887463Fd5E00000013700000001',
        collectionId: 312,
        tokenId: 1
    });

    if (!result) {
        process.exit();
    }
    console.log(result);


    // get bundle
    // const bundle = await sdk.tokens.getBundle({
    //     collectionId: 311,
    //     tokenId: 1,
    // });
    // console.log(bundle);

    // total number of pieces
    // const result = await sdk.refungible.totalPieces({
    //     collectionId: 312,
    //     tokenId: 1,
    // });
    // console.log(result);


})().catch((e) => {console.log(e);});
