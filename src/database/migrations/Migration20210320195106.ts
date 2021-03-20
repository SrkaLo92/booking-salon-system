import { Migration } from '@mikro-orm/migrations';

export class Migration20210320195106 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(256) not null, "email" varchar(255) not null, "password_hash" varchar(255) not null, "is_active" bool not null);',
        );
        this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    }
}
