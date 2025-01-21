/// <reference types="node" />
import { type TransferListItem } from 'node:worker_threads';
import type { AnyAsyncFn, GlobalShim, Syncify, ValueOf } from './types.js';
export * from './types.js';
export declare const TsRunner: {
    readonly TsNode: "ts-node";
    readonly EsbuildRegister: "esbuild-register";
    readonly EsbuildRunner: "esbuild-runner";
    readonly SWC: "swc";
    readonly TSX: "tsx";
};
export type TsRunner = ValueOf<typeof TsRunner>;
export declare const DEFAULT_BUFFER_SIZE: number | undefined;
export declare const DEFAULT_TIMEOUT: number | undefined;
export declare const DEFAULT_WORKER_BUFFER_SIZE: number;
export declare const DEFAULT_EXEC_ARGV: string[];
export declare const DEFAULT_TS_RUNNER: TsRunner | undefined;
export declare const DEFAULT_GLOBAL_SHIMS: boolean;
export declare const DEFAULT_GLOBAL_SHIMS_PRESET: GlobalShim[];
export declare const MTS_SUPPORTED_NODE_VERSION = 16;
export interface SynckitOptions {
    bufferSize?: number;
    timeout?: number;
    execArgv?: string[];
    tsRunner?: TsRunner;
    transferList?: TransferListItem[];
    globalShims?: GlobalShim[] | boolean;
}
export declare function extractProperties<T extends object>(object: T): T;
export declare function extractProperties<T>(object?: T): T | undefined;
export declare function createSyncFn<T extends AnyAsyncFn>(workerPath: string, bufferSize?: number, timeout?: number): Syncify<T>;
export declare function createSyncFn<T extends AnyAsyncFn>(workerPath: string, options?: SynckitOptions): Syncify<T>;
export declare const isFile: (path: string) => boolean;
export declare const encodeImportModule: (moduleNameOrGlobalShim: GlobalShim | string, type?: 'import' | 'require') => string;
export declare const generateGlobals: (workerPath: string, globalShims: GlobalShim[], type?: 'import' | 'require') => string;
export declare function runAsWorker<R = unknown, T extends AnyAsyncFn<R> = AnyAsyncFn<R>>(fn: T): void;
