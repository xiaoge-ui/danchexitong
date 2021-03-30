import { MENU_TITLE } from './../constants';

const InitialState = {
    menu_title: "首页"
}
export const reducer = (state = InitialState, action) => {
    switch (action.type) {
        case MENU_TITLE:
            return {
                ...state,
                menu_title: action.menu
            }
        default:
            return state
    }
}