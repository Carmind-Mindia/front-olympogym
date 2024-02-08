import PopupConfirm from "@/components/PopupConfirm.vue";
import { createApp, type App } from "vue";

export default {
    install(app: App){
        app.config.globalProperties.$ask = (textstr?: string) => {

            var popup : App<Element> | undefined = undefined;
            var yesCallback : Function | undefined = undefined;
            var noCallback : Function | undefined = undefined;

            popup = createApp(PopupConfirm, {show : true, text: textstr, yesCallback: () =>{yesCallback ? yesCallback() : null;}, noCallback: ()=>{noCallback ? noCallback() : null;}});

            const container = document.createElement('div');
            document.body.appendChild(container);
            popup.mount(container);

            return new Promise((resolve, reject) => {
                yesCallback = () => {
                    resolve(true);
                    popup?.unmount();
                    container.remove();
                };
                noCallback = () => {
                    resolve(false);
                    popup?.unmount();
                    container.remove();
                };
            });

        }
    }
}