import * as application from "application";

export function setStatusBarColors() {
    application.on(application.launchEvent, () => {
        console.log('APP LAUNCHED');
    });
}