import { IDatabaseDriver, Connection, EntityManager } from "@mikro-orm/core";

export type MyContext = {
    em: EntityManager <any> & EntityManager<IDatabaseDriver<Connection>>;
}