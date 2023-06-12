import IDataSource from "./IDataSource";
import IEntity from "@common/database/datasource/types/IEntity";
import IQueryBuilder from "./IQueryBuilder";
import { relationType } from "./types/RelationTypes";

class DataSource<E extends IEntity> implements IDataSource<E> {
    private _queryBuilder: IQueryBuilder;
    private _label: string

    constructor(queryBuilder: IQueryBuilder, entity: new (props: Partial<E>) => IEntity) {
        this._queryBuilder = queryBuilder;
        this._label = entity.name
    }

    public async findOne<E extends IEntity>(attribute: Partial<E>, relations?: relationType<E>[]): Promise<E | undefined> {
        const [key] = Object.entries(attribute)[0];

        const query = this._queryBuilder.match(`(e:${this._label})`).where(`e.${key} = $${key}`, attribute)

        if (relations) {
            relations.forEach((relation) => {
                if (relation.direction == 'in') {
                    query.goIn(relation.relationLabel, relation.nodeLabel as string);
                } else if (relation.direction == 'out') {
                    query.goOut(relation.relationLabel, relation.nodeLabel as string);
                } else {
                    query.goOut(relation.relationLabel, relation.nodeLabel as string);
                }
            })
        }

        const res = await query.return('*').run<E>('executeRead');
        return res && res[0];
    }

    public async store(entity: E): Promise<E> {
        const { id } = entity;

        const exists = await this.findOne({
            id: id
        });

        if (exists)
            return await this.update(entity);
        else
            return await this.create(entity);
    }

    public async update(entity: E): Promise<E> {
        const { label, id, ...data } = entity;

        const [res] = await this._queryBuilder.match(`(e:${label})`).where(`e.id = $id`, { id }).set(data).return('*').run('executeWrite') as E[]

        return res
    }

    public async create(entity: E): Promise<E> {
        const { label, ...data } = entity
        const [res] = await this._queryBuilder.create(label, data).return(`*`).run('executeWrite') as E[];
        return res
    }

    public async createRelationship<E extends IEntity>(from: E, relation: string, to: IEntity): Promise<void> {
        if (!from.id && !to.id) return;

        await this._queryBuilder
            .match(`(f:${from.label}), (t:${to.label})`)
            .where('f.id = $fid AND t.id = $tid', {
                fid: from.id,
                tid: to.id
            })
            .createRelation('f', relation, 't')
            .run('executeWrite')
    }

    public getQueryBuilder(): IQueryBuilder {
        return this._queryBuilder;
    }
}

export default DataSource;