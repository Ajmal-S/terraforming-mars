import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectOption} from '../../inputs/SelectOption';
import {Resource} from '../../../common/Resource';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';
import {Priority} from '../../deferredActions/DeferredAction';

export class ArtificialPhotosynthesis extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.ARTIFICIAL_PHOTOSYNTHESIS,
      tags: [Tag.SCIENCE],
      cost: 12,

      metadata: {
        description: 'Increase your plant production 1 step or your energy production 2 steps.',
        cardNumber: '115',
        renderData: CardRenderer.builder((b) => b.production((pb) => pb.plants(1).or(Size.SMALL).energy(2))),
      },
    });
  }
  public override bespokePlay(player: IPlayer) {
    const options = new OrOptions(
      new SelectOption('Increase your energy production 2 steps', 'Increase', () => {
        player.production.add(Resource.ENERGY, 2, {log: true});
        return undefined;
      }),
      new SelectOption('Increase your plant production 1 step', 'Increase', () => {
        player.production.add(Resource.PLANTS, 1, {log: true});
        return undefined;
      }),
    );
    player.defer(options, Priority.GAIN_RESOURCE_OR_PRODUCTION);
    return undefined;
  }
}
