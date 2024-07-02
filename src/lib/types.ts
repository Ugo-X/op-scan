import { Hash, Address, Hex } from "viem";
import {
  Block as PrismaBlock,
  Transaction as PrismaTransaction,
} from "@/prisma/generated/client";

export type Block = { number: bigint; hash: Hash; timestamp: bigint };

export type MessageArgs = {
  target: Hash;
  sender: Hash;
  message: Hash;
  value: bigint;
  messageNonce: bigint;
  gasLimit: bigint;
};

export type Transaction = {
  hash: Hash;
  blockNumber: bigint;
  from: Address;
  to: Address | null;
  value: bigint;
  gas: bigint;
  gasPrice: bigint | null;
  maxFeePerGas: bigint | null;
  maxPriorityFeePerGas: bigint | null;
  nonce: number;
  transactionIndex: number;
  input: Hex;
  signature: string;
  timestamp: bigint;
};

export type TransactionReceipt = {
  transactionHash: Hash;
  status: "success" | "reverted";
  from: Address;
  to: Address | null;
  effectiveGasPrice: bigint;
  gasUsed: bigint;
  l1Fee: bigint | null;
  l1GasPrice: bigint | null;
  l1GasUsed: bigint | null;
  l1FeeScalar: number | null;
};

export type TransactionWithReceipt = Transaction & {
  transactionReceipt: TransactionReceipt;
};

export type AddressDetails = {
  addressType: "Contract" | "Address";
  balance: bigint;
};

export type BlockWithTransactions = Block & { transactions: Transaction[] };

export type L1L2Transaction = {
  l1BlockNumber: bigint;
  l1Hash: Hash;
  l2Hash: Hash;
  timestamp: bigint;
  l1TxHash: string;
  l1TxOrigin: string;
  gasLimit: number;
};

export const fromPrismaBlock = (block: PrismaBlock) => ({
  number: BigInt(block.number),
  hash: block.hash as Hash,
  timestamp: BigInt(block.timestamp),
});

export const fromPrismaBlockWithTransactions = (
  block: PrismaBlock & { transactions: PrismaTransaction[] },
) => ({
  ...fromPrismaBlock(block),
  transactions: block.transactions.map(fromPrismaTransaction),
});

export const fromPrismaTransaction = (transaction: PrismaTransaction) => ({
  hash: transaction.hash as Hash,
  blockNumber: BigInt(transaction.blockNumber),
  from: transaction.from as Address,
  to: transaction.to ? (transaction.from as Address) : null,
  value: BigInt(transaction.value),
  gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : undefined,
  timestamp: BigInt(transaction.timestamp),
});

export type TokenTransfer = {
  from: Address;
  to: Address;
  tokenAddress: Address;
  amount: string;
  decimals: number;
};
