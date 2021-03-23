# QuikMail-Backend

Mikro ORM commands:
* ```npx mikroorm schema:create -r``` Create quikmail database with and apply all migration
* ```npx mikroorm schema:drop --drop-db -r``` Drop whole database (use with caution, permantent loss of data)
* ```npx mikroorm migration:create``` Creates new migration with chagnes in entities folder
* ```npx mikroorm migration:up``` Apply next migration to database (there is also migration:down to go backwards, but down method needs to be implemented manaully)

All commands have option -d to show sql that will be applied to database.
