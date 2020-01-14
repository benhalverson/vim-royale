// 1. Everything has behaViors
// createNewEntity: number
// addBehavior(entity: number, behavior<Position>)
//
// Renderererer(board) {
//    entities.forEach(<Position>, (positionEntity) => {
//    });
// }
//

export interface Component {
    type: string;
    getData(): object;
}

export type EntityItem = number;

// singleton?
class EntityStore {
    private currentId: number;

    // <generics>
    private entityMap: Map<EntityItem, Map<string, Component>>;
    private entitiesByComponent: Map<string, Map<EntityItem, Component>>;

    constructor() {
        this.entitiesByComponent = new Map();
        this.entityMap = new Map();
        this.currentId = 1;
    }

    forEach(componentType: string, cb: (state: Component) => void) {
        const entities = this.entitiesByComponent.get(componentType);

        if (!entities) {
            return;
        }

        // TODO: Ask Jordan
        for (let k in entities.keys()) {
            // @ts-ignore
            cb(entities.get(k));
        }
    }

    toArray(componentType: string): Component[] {
        const entities = this.entitiesByComponent.get(componentType);

        if (!entities) {
            return [];
        }

        return Array.from(entities.keys()).map(k => entities.get(k));
    }

    createNewEntity(): number {
        const id = this.currentId++;

        this.entityMap.set(id, new Map());

        return id;
    }

    attachComponent(entity: EntityItem, comp: Component) {
        this.entityMap.get(entity).set(comp.type, comp);
        if (!this.entitiesByComponent.has(comp.type)) {
            this.entitiesByComponent.set(comp.type, new Map());
        }

        this.entitiesByComponent.get(comp.type).set(entity, comp);
    }

    removeComponent
}

const store = new EntityStore();
export default function createEntityStore() {
    return store;
};

