import { Migration } from '@mikro-orm/migrations';

export class Migration20210320195730 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "facility" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "facility_name" varchar(256) not null, "state" varchar(100) not null, "city" varchar(100) not null, "zip_code" varchar(10) not null);',
        );
    }
}
