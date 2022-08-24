import fs from 'fs';
import * as CardanoWasm from '@emurgo/cardano-serialization-lib-nodejs';
import { setData } from '$lib/account';

const blockFrostProjectId = JSON.parse(fs.readFileSync('/workspace/etc/secret-blockfrost.json'));

function getStakeAddr(addrStr) {
    if (addrStr.startsWith('stake')) return addrStr;
    let addr = CardanoWasm.Address.from_bech32(addrStr);
    let stakeCred = CardanoWasm.BaseAddress.from_address(addr).stake_cred();
    return CardanoWasm.RewardAddress.new(1, stakeCred).to_address().to_bech32();
}

export async function post({ request, locals }) {
    const params = await request.json();
    const addr = params?.addr;
    const stakeAddr = getStakeAddr(addr);
    const account = await fetch(
            `https://cardano-mainnet.blockfrost.io/api/v0/accounts/${encodeURIComponent(stakeAddr)}`,
            { headers: { project_id: blockFrostProjectId } }
        )
        .then(r => r.json());
    const adaBalance = Math.round((account?.controlled_amount / 1_000_000));
    if (adaBalance) {
        const addrInfo = { addr, adaBalance };
        await setData(locals?.user?.email, 'cardano-address', addrInfo);
        return {
            status: 200,
            body: addrInfo
        };
    } else {
        return {
            status: 200,
            body: {
                error: "Your ADA address must have a non-zero balance!"
            }
        };
    }
}
