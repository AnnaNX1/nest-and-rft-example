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

    const address: string = signer.instance.address;

    const args = {
        address,
        parent: {
            collectionId: 311,
            tokenId: 1,
        },
        nested: {
            collectionId: 312,
            tokenId: 1,
        },
        value: 5
    };

    const result = await sdk.tokens.nest.submitWaitResult(args);

    if (!result || !result.parsed) {
        console.log('Error occurred while nest');
        process.exit();
    }

    const { tokenId } = result.parsed;

    console.log(
        `Token ${tokenId} successfully nested`,
    );

})().catch((e) => {console.log(e);});
