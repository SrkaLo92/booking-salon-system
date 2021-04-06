import { Entity, Property } from '@mikro-orm/core';
import BaseEntity from './BaseEntity';

@Entity({ abstract: true })
export default class BaseDeletableEntity extends BaseEntity {
    @Property({ default: false })
    isDeleted: boolean;
}
