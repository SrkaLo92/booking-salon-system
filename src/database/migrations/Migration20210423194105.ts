import { Migration } from '@mikro-orm/migrations';

export class Migration20210423194105 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "inmate_contact_image" ("inmate_contact_id" int4 not null, "image" bytea not null, "mimetype" varchar(255) not null);',
        );
        this.addSql(
            'alter table "inmate_contact_image" add constraint "inmate_contact_image_pkey" primary key ("inmate_contact_id");',
        );

        this.addSql(
            'alter table "inmate_contact_image" add constraint "inmate_contact_image_inmate_contact_id_foreign" foreign key ("inmate_contact_id") references "inmate_contact" ("id") on update cascade on delete cascade;',
        );
    }
}
