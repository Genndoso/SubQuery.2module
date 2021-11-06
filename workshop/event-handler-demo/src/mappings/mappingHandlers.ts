import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import {StarterEntity} from "../types";
import {Balance} from "@polkadot/types/interfaces";

/*
export async function handleBlock(block: SubstrateBlock): Promise<void> {
    //Create a new starterEntity with ID using block hash
    let record = new StarterEntity(block.block.header.hash.toString());
    //Record block number
    record.field1 = block.block.header.number.toNumber();
    await record.save();
}*/
export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;
    //Retrieve the record by its ID
    let record = new StarterEntity(event.extrinsic.block.block.header.hash.toString());
    logger.info("\n Block Number"+event.block.block.header.number.toNumber())
    logger.info("\n nMethod"+event.event.method);
    logger.info("\n nSection"+event.event.section);
    record.field2 = account.toString();
    //Big integer type Balance of a transfer event
    record.field3 = (balance as Balance).toBigInt();
    await record.save();
}



