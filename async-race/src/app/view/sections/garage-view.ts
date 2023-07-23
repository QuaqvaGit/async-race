import DOMComponent, { ElementParameters } from '../../../components/base-component';
import Menu from '../../../components/menu/menu';
import FormModal from '../../../components/modals/form-modal';
import { InputTypes } from '../../../types/dom-types';
import EventEmitter from '../../../utils/event-emitter';
import AppEvents from '../../app-events';
import { CarViewData } from '../../model/car';
import SectionView from './section-view';

enum GarageClasses {
  GarageMenu = 'garage__menu',
  MenuAddButton = 'garage-menu__add',
  MenuGenerateButton = 'garage-menu__generate',
  MenuRaceButton = 'garage-menu__race',
  MenuResetButton = 'garage-menu__reset',
  SubmitCarModal = 'submit-car-modal',
}
export default class GarageView extends SectionView {
  private static MENU_PARAMS: ElementParameters = {
    classes: [GarageClasses.GarageMenu],
  };

  private static RANDOM_CARS_COUNT = 100;

  private static MENU_BUTTONS: string[] = ['Add new', `Generate ${GarageView.RANDOM_CARS_COUNT}`, 'Race', 'Reset'];

  private static SUBMIT_CAR_MODAL_PARAMS = {
    classes: [GarageClasses.SubmitCarModal],
  };

  private static SUBMIT_MODAL_TITLE = 'Enter car info';

  private static SUBMIT_CAR_INPUTS: string[] = ['Name', 'Color'];

  private static SUBMT_CAR_INPUTS_TYPES: InputTypes[] = [InputTypes.Text, InputTypes.Color];

  private menu: DOMComponent<HTMLDivElement>;

  public constructor(emitter: EventEmitter, container: DOMComponent<HTMLElement>) {
    super(emitter, container);

    this.menu = this.createMenu();
  }

  private createMenu(): Menu {
    const params: ElementParameters = {
      ...GarageView.MENU_PARAMS,
      parent: this.container,
    };

    const clickHandlers = [
      () => {
        const inputModal = new FormModal({
          elementParams: GarageView.SUBMIT_CAR_MODAL_PARAMS,
          inputNames: GarageView.SUBMIT_CAR_INPUTS,
          inputTypes: GarageView.SUBMT_CAR_INPUTS_TYPES,
          onSubmit: (formData) => {
            const carViewData: CarViewData = {
              name: formData[0],
              color: formData[1],
            };
            this.emitter.emit(AppEvents.CarSubmit, carViewData);
          },
          windowTitle: GarageView.SUBMIT_MODAL_TITLE,
        });
        inputModal.show();
      },
      () => {
        this.emitter.emit(AppEvents.GenerateCars, GarageView.RANDOM_CARS_COUNT);
      },
      () => {
        this.launchRace();
      },
      () => {
        this.resetRace();
      },
    ];

    const menu = new Menu({ params, buttonTexts: GarageView.MENU_BUTTONS, clickHandlers });
    menu.forEachButton((button, index) => {
      switch (index) {
        case 0:
          button.addClass(GarageClasses.MenuAddButton);
          break;
        case 1:
          button.addClass(GarageClasses.MenuGenerateButton);
          break;
        case 2:
          button.addClass(GarageClasses.MenuRaceButton);
          break;
        case 3:
          button.addClass(GarageClasses.MenuResetButton);
          break;
        default:
          break;
      }
    });
    return menu;
  }

  private launchRace(): void {}

  private resetRace(): void {}
}
