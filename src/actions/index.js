import { SIGNED_IN } from '../constants';

export default function logUser(email){
    const action = {
        type: SIGNED_IN,
        email
    }
    return action;
}