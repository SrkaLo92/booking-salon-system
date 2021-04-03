# QuikMail-Backend

Mikro ORM commands:
* ```npx mikro-orm schema:create -r``` Create quikmail database with and apply all migration
* ```npx mikro-orm schema:drop --drop-db -r``` Drop whole database (use with caution, permantent loss of data)
* ```npx mikro-orm migration:create``` Creates new migration with chagnes in entities folder
* ```npx mikro-orm migration:up``` Apply next migration to database (there is also migration:down to go backwards, but down method needs to be implemented manaully)

All commands have option -d to show sql that will be applied to database.
