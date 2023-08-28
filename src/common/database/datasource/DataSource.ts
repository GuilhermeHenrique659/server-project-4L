import IDataSource from "./IDataSource";
import IEntity from "@common/database/datasource/types/IEntity";
import IQueryBuilder from "./IQueryBuilder";
import { relationType } from "./types/RelationTypes";
import IEdge from "./types/IEdge";
import QueryBuilder from "./QueryBuilder";

class DataSource<E extends IEntity> implements IDataSource<E> {
    private _queryBuilder: IQueryBuilder;
    private _label: string

    constructor(queryBuilder: IQueryBuilder, entity: new (props: Partial<E>) => IEntity) {
        this._queryBuilder = queryBuilder;
        this._label = entity.name
    }

    public async findOne<E extends IEntity>(attribute: Partial<E>): Promise<E | undefined> {
        const [key] = Object.entries(attribute)[0];
        const query_prop = this._label.toLocaleLowerCase()

        const query = this._queryBuilder.match(`(${query_prop}:${this._label} {${key}: $${key}})`, attribute)

        return await query.return(`${query_prop}{.*, label: labels(${query_prop})[0]}`).getOne<E>('executeRead');
    }

    public async hasRelationShip({ from, label, to }: Required<IEdge>): Promise<boolean> {

        const data = await this._queryBuilder.
            match(`(from:${from.label} {id: $id})`, { id: from.id }).
            goOut(`r:${label}`, `to:${to.label} {id: '${to.id}'}`).
            return('r').
            getOne<any>();

        return !!data;
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
        const { label, id, createdAt, ...data } = entity;

        data.updatedAt = new Date().toISOString();

        return await this._queryBuilder.
            match(`(e:${label ?? this._label})`).
            where(`e.id = $id`, { id }).
            set(data).
            return(`e{.*, label: labels(e)[0]}`).
            getOne() as E;
    }

    public async create(entity: E): Promise<E> {
        const { label, ...data } = entity
        data.createdAt = new Date().toISOString()
        return await this._queryBuilder.create(label, data).return(`e{.*, label: labels(e)[0]}`).getOne('executeWrite') as E;
    }

    public async createRelationship(edge: Required<IEdge>): Promise<void> {
        const { from, to, label } = edge;
        if (!from.id && !to.id) return;

        await this._queryBuilder
            .match(`(f:${from.label}), (t:${to.label})`)
            .where('f.id = $fid AND t.id = $tid', {
                fid: from.id,
                tid: to.id
            })
            .createRelation('f', label, 't')
            .getMany('executeWrite')
    }

    public async remove(id: string): Promise<void> {
        await this._queryBuilder.query(`MATCH (n:${this._label} {id: $id}) DETACH DELETE n`, { id }).setData('executeWrite');
    }

    public async removeRelationShip(from: IEntity, to: IEntity, edge: string): Promise<void> {
        await this._queryBuilder.query(`MATCH (f:${from.label} {id: $fromId})-[r:${edge}]->(t:${to.label} {id: $toId}) DELETE r`,
            {
                fromId: from.id,
                toId: to.id
            }).setData('executeWrite');
    }

    public getQueryBuilder(): IQueryBuilder {
        return new QueryBuilder(this._queryBuilder.getTx())
    }
}

export default DataSource;