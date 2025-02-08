import {existsSync, readFileSync, writeFileSync} from "node:fs";
import { JsonMap, parse } from '@iarna/toml';
import { stringify } from 'smol-toml';

export class TomlStorage<T>{
    private readonly _path: string;
    private readonly _defaultData: T;

    private _cache: T
    constructor(path: string, defaultData: T) {
        this._path = path;
        this._defaultData = defaultData;
        this.run();
    }

    private run(): void{
        if(!existsSync(this._path)){
            this.createFile();
            this._cache = this._defaultData;
        }else
            this._cache = this.readFile();
    }

    private createFile(): void{
        const str = stringify(this._defaultData);
        writeFileSync(this._path, str);
    }
    private readFile(): T{
        return parse(readFileSync(this._path).toString()) as T;
    }

    public save(obj: T): void{
        const str = stringify(obj);
        writeFileSync(this._path, str);
        this._cache = obj;
    }
    public read(cached: boolean = true): T{
        if(cached)
            return this._cache;
        return this.readFile();
    }
}