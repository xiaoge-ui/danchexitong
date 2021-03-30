import { MENU_TITLE } from './../constants';

export const getMenuInfo = (menu) => {
    return {
        type: MENU_TITLE,
        menu
    }
}