import { Migration } from '@mikro-orm/migrations';

export class Migration20210423211117 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "user_image" ("user_id" int4 not null, "image" bytea not null, "mimetype" varchar(255) not null);',
        );
        this.addSql('alter table "user_image" add constraint "user_image_pkey" primary key ("user_id");');

        this.addSql(
            'alter table "user_image" add constraint "user_image_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;',
        );
    }
}
