import getEntityStore, {EntityItem} from '../entities';
import PositionComponent from './components/position';
import MovementComponent from './components/movement';
import {MovementCommand} from '../types';

export default class Player {
    public entity: EntityItem;
    public position: PositionComponent;
    public movement: MovementComponent;

    public lastMovement: MovementCommand;

    constructor(x: number, y: number, char: string) {
        const store = getEntityStore();

        this.entity = store.createNewEntity();

        // TODO: HAHAH 100 hard coded Z? What is this css?
        this.position = new PositionComponent(char, x, y, 100);

        // TODO: Should movement be relative or absolute
        this.movement = new MovementComponent(0, 0);

        store.attachComponent(this.entity, this.position);
        store.attachComponent(this.entity, this.movement);
    }
}


