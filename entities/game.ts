import * as winprocess from 'winprocess';
import {GameBase} from './game-base';
import TypeCompose from '../decorators/graphql/type-compose';
import Prop from '../decorators/memory/prop';
import {Player} from './player';
import {Vehicle} from './vehicle';
import MemoryEntity from '../decorators/memory/memory-entity';

const EXE: string = 'gta-vc.exe';

@TypeCompose()
@MemoryEntity()
export default class Game extends GameBase {

    public static singleton: Game;

    public static get instance() {
        if (!this.singleton) {
            const processId = winprocess.getProcessId(EXE);

            if (!processId) {
                throw new Error('Process not found');
            }

            this.singleton = new Game(0x0);
            this.singleton.process = new winprocess.Process(processId);
            this.singleton.process.open();
        }

        return this.singleton;
    }

    @Prop.pointer(0x94AD28, Player)
    public player: Player;

    @Prop.array(0x94AD2C, Vehicle)
    public vehicles: Vehicle[];

    @Prop(0x94ADC8, 'int')
    public money: number;

    @Prop(0xA10B6B, 'int')
    public hour: number;

    @Prop(0xA10B92, 'int')
    public minute: number;

    @Prop(0x686FC8, 'float')
    public carDensity: number;
}
