import { KeyringProvider } from '@unique-nft/accounts/keyring';
import { KeyringOptions } from '@polkadot/keyring/types';
import { Sdk, Options, Client, CollectionInfoWithSchemaResponse } from "@unique-nft/sdk";

const seed = 'key remove clerk live debate figure...';

async function createCollection(sdk: Client, address: string): Promise<CollectionInfoWithSchemaResponse> {
    const { parsed, error } = await sdk.refungible.createCollection.submitWaitResult({
        address,
        name: 'Test collection',
        description: 'My test collection',
        tokenPrefix: 'TST',
    });

    if (error || !parsed) {
        console.log('Error occurred while creating a collection. ', error);
        process.exit();
    }

    const { collectionId } = parsed;

    return sdk.collections.get({ collectionId });
}

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

    const { id } = await createCollection(sdk, address);
    console.log(id);

})().catch((e) => {console.log(e);});
