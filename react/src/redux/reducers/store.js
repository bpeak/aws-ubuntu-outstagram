import reducer from './reducer.js'
import { createStore } from 'redux';

//언제 로컬스토리지 언제 세션스토리지사용할까
//언제 지울까 로컬스토리지를 사용한다면 localStorage.clear()

let store;
if(window.localStorage.getItem('outstagram') === null){
    store = createStore(reducer);
} else {
    store = createStore(reducer, JSON.parse(window.localStorage.getItem('outstagram')))
}

store.subscribe(() => {
    window.localStorage.setItem('outstagram', JSON.stringify(store.getState()))
})

export default store