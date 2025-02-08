import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { parse } from '@iarna/toml';
import { stringify } from 'smol-toml';

export class TomlStorage<T extends object> {
    private readonly _path: string;
    private readonly _defaultData: T;
    private _cache: T;

    constructor(path: string, defaultData: T, updateFileAsTemplate: boolean = false) {
        this._path = path;
        this._defaultData = defaultData;
        this.run(updateFileAsTemplate);
    }

    private run(updateFileAsTemplate: boolean): void {
        if (!existsSync(this._path)) {
            this.createFile();
            this._cache = this._defaultData;
        } else {
            this._cache = this.readFile();
            const keys = Object.keys(this._defaultData) as (keyof T)[];
            for (const k of keys) {
                this.recursionFieldChecker(k, this._defaultData, this._cache);
            }
            this.save(this._cache);
        }
    }

    private recursionFieldChecker<K extends keyof T>(
        key: K,
        defaultData: T,
        cache: T
    ): void {
        if (cache[key] === undefined) {
            cache[key] = defaultData[key];
        } else if (typeof cache[key] === 'object' && typeof defaultData[key] === 'object') {
            this.recursionFieldCheckerNested(cache[key] as Record<string, any>, defaultData[key] as Record<string, any>);
        }
    }

    private recursionFieldCheckerNested(cacheObj: Record<string, any>, defaultDataObj: Record<string, any>): void {
        const keys = Object.keys(defaultDataObj);
        for (const key of keys) {
            if (cacheObj[key] === undefined) {
                cacheObj[key] = defaultDataObj[key];
            } else if (typeof cacheObj[key] === 'object' && typeof defaultDataObj[key] === 'object') {
                this.recursionFieldCheckerNested(cacheObj[key] as Record<string, any>, defaultDataObj[key] as Record<string, any>);
            }
        }
    }

    private createFile(): void {
        const str = stringify(this._defaultData);
        writeFileSync(this._path, str);
    }

    private readFile(): T {
        return parse(readFileSync(this._path).toString()) as T;
    }

    public save(obj: T): void {
        const str = stringify(obj);
        writeFileSync(this._path, str);
        this._cache = obj;
    }

    public read(cached: boolean = true): T {
        if (cached) return this._cache;
        return this.readFile();
    }
}
