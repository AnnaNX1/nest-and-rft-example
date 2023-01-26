import { KeyringProvider } from '@unique-nft/accounts/keyring';
import { KeyringOptions } from '@polkadot/keyring/types';
import { Sdk, Options, Client, CollectionInfoWithSchemaResponse } from "@unique-nft/sdk";

const seed = 'key remove clerk live debate figure...';

const createArgs = {
    collectionId: 299,
    data: {
        image: {},
    },
    amount: 20
};

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

    const address: string = signer.instance.address;


    const result = await sdk.refungible.createToken.submitWaitResult({
        address,
        ...createArgs
    });
    if (!result || !result.parsed) {
        console.log('Error occurred while creating a token');
        process.exit();
    }
    const { collectionId, tokenId } = result.parsed;
    console.log(collectionId, tokenId);


})().catch((e) => {console.log(e);});
