import { KeyringProvider } from '@unique-nft/accounts/keyring';
import { KeyringOptions } from '@polkadot/keyring/types';
import { Sdk, Options, Client, CollectionInfoWithSchemaResponse } from "@unique-nft/sdk";

const seed = 'key remove clerk live debate figure...';

async function createCollection(sdk: Client, address: string): Promise<CollectionInfoWithSchemaResponse> {
    const { parsed, error } = await sdk.collections.creation.submitWaitResult({
        address,
        name: 'Test collection',
        description: 'My test collection',
        tokenPrefix: 'TST',
        permissions: {
            nesting: {
                tokenOwner: true,
                collectionAdmin: true,
            },
        },
    });

    if (error || !parsed) {
        console.log('Error occurred while creating a collection. ', error);
        process.exit();
    }

    const { collectionId } = parsed;

    return sdk.collections.get({ collectionId });
}

const createArgs = {
    collectionId: 311,
    data: {
        image: {},
    },
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

    // const { id } = await createCollection(sdk, address);
    // console.log(id);
    // 311

    const result = await sdk.tokens.create.submitWaitResult({
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
