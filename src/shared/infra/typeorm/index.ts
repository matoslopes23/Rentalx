import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
    host: string;
}
getConnectionOptions().then(options => {
    const newOptions = options as IOptions;
    newOptions.host = 'database'; // Essa opção deverá ser EXATAMENTE o nome dado ao ser 
    createConnection({
        ...options,
    });
});

