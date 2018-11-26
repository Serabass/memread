import Game from './entities/game';
import {schemaComposer} from 'graphql-compose';

import './entities';
import {Player} from './entities/player';
import {Vehicle} from './entities/vehicle';

schemaComposer.Query.addFields({
    player: {
        type: 'Player',
        resolve: () => Player.instance,
    },
    vehicles: {
        type: '[Vehicle]',
        resolve: () => Vehicle.pool,
    },
    game: {
        type: 'Game',
        resolve: () => Game.instance,
    },
});
