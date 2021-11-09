import Vue, { createApp } from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faUserSecret,
    faGlobe,
    faHandsHelping,
    faClipboard,
    faGlobeAsia,
    faTasks,
    faSchool,
    faClipboardCheck,
    faFire,
    faExclamationCircle,
    faExclamation,
    faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import {
    faPython,
    faFontAwesome,
    faDocker,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './index.css';

library.add(faUserSecret);
library.add(faFontAwesome);
library.add(faPython);
library.add(faGlobe);
library.add(faHandsHelping);
library.add(faClipboard);
library.add(faTasks);
library.add(faSchool);
library.add(faClipboardCheck);
library.add(faGlobeAsia);
library.add(faDocker);
library.add(faFire);
library.add(faExclamationCircle);
library.add(faExclamation);
library.add(faEllipsisV);

const clickOutside = {
    beforeMount: (el: any, binding: any) => {
        el.clickOutsideEvent = (event: Event) => {
            // here I check that click was outside the el and his children
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                binding.value();
            }
        };
        document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted: (el: any) => {
        document.removeEventListener('click', el.clickOutsideEvent);
    },
};

const app = createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .directive('click-outside', clickOutside)
    .mount('#app');
