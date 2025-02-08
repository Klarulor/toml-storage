import {TomlStorage} from "../src/module/TomlStorage";

const obj: TomlExample = {
    "title": "TOML Example",
    "owner": {
        "name": "Tom Preston-Werner",
        "organization": "GitHub",
        "bio": "GitHub Cofounder & CEO\n\tLikes \"tater tots\" and beer and backslashes: \\",
        "dob": "1979-05-27T07:32:00.000Z"
    },
    "database": {
        "server": "192.168.1.1",
        "ports": [
            8001,
            8001,
            8003
        ],
        "connection_max": 5000,
        "connection_min": -2,
        "max_temp": 87.1,
        "min_temp": -17.76,
        "enabled": true,
        isOk: true
    },
    "servers": {
        "alpha": {
            "ip": "10.0.0.1",
            "dc": "eqdc10"
        },
        "beta": {
            "ip": "10.0.0.2",
            "dc": "eqdc10"
        }
    },
    "clients": {
        "data": [
            [
                "gamma",
                "delta"
            ],
            [
                1,
                2
            ]
        ]
    }
}


const storage = new TomlStorage("./test.toml", obj);

console.log(storage.read());





interface Owner {
    name: string;
    organization: string;
    bio: string;
    dob: string; // Используем строку, так как ISO-дату можно парсить отдельно
}

interface Database {
    server: string;
    ports: number[];
    connection_max: number;
    connection_min: number;
    max_temp: number;
    min_temp: number;
    enabled: boolean;
    isOk: boolean;
}

interface Server {
    ip: string;
    dc: string;
}

interface Servers {
    alpha: Server;
    beta: Server;
}

interface Clients {
    data: (string | number)[][];
}

interface TomlExample {
    title: string;
    owner: Owner;
    database: Database;
    servers: Servers;
    clients: Clients;
}

