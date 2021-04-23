import { Migration } from '@mikro-orm/migrations';

export class Migration20210330184020 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "inmate_contact" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "is_deleted" bool not null default false, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "inmate_id" varchar(255) not null, "facility_name" varchar(255) not null, "facility_state" varchar(100) not null, "facility_city" varchar(100) not null, "facility_zip_code" varchar(10) not null, "user_id" int4 not null);',
        );

        this.addSql(
            'create table "inmate_mailing_address" ("inmate_contact_id" int4 not null, "order" int4 not null, "mailing_address" varchar(255) not null);',
        );
        this.addSql(
            'alter table "inmate_mailing_address" add constraint "inmate_mailing_address_pkey" primary key ("inmate_contact_id", "order");',
        );

        this.addSql(
            'alter table "inmate_contact" add constraint "inmate_contact_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
        );

        this.addSql(
            'alter table "inmate_mailing_address" add constraint "inmate_mailing_address_inmate_contact_id_foreign" foreign key ("inmate_contact_id") references "inmate_contact" ("id") on update cascade;',
        );
    }
}
