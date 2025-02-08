# TOML Storage

A lightweight TypeScript library for managing structured data storage using the TOML format. This library provides an easy way to read, write, and maintain TOML configuration files while ensuring missing fields are automatically filled with default values.

## Features

- **Automatic File Creation**: If the specified TOML file does not exist, it will be created with the provided default data.
- **Recursive Field Checking**: Ensures all fields in the default data exist in the stored file, adding missing ones automatically.
- **Caching Mechanism**: Optionally uses an in-memory cache to avoid unnecessary file reads.
- **Type Safety**: Uses TypeScript generics to maintain strict type safety.

## Installation

```sh
npm install toml-storage
```

## Usage

```typescript
import { TomlStorage } from 'toml-storage';

interface Config {
    host: string;
    port: number;
    database: {
        user: string;
        password: string;
    };
}

const defaultConfig: Config = {
    host: 'localhost',
    port: 8080,
    database: {
        user: 'admin',
        password: 'password',
    },
};

const configStorage = new TomlStorage<Config>('config.toml', defaultConfig);

// Read configuration
const config = configStorage.read();
console.log(config);

// Update configuration
config.port = 9090;
configStorage.save(config);
```

## API

### `new TomlStorage<T>(path: string, defaultData: T, updateFileAsTemplate?: boolean)`

Creates an instance of `TomlStorage`.

- `path`: Path to the TOML file.
- `defaultData`: Default data structure to ensure required fields are present.
- `updateFileAsTemplate` (optional, default: `false`): If `true`, updates the file structure based on the default data.

### `read(cached?: boolean): T`

Reads the configuration file.

- If `cached` is `true` (default), returns the cached version.
- If `false`, reads the file from disk.

### `save(obj: T): void`

Writes the provided object to the TOML file and updates the cache.

## License

MIT License