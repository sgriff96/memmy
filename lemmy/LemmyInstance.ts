import ILemmyServer from "./types/ILemmyServer";
import {LemmyHttp} from "lemmy-js-client";

export let lemmyInstance: LemmyHttp | null = null;
export let lemmyAuthToken: string | undefined = undefined;

export const initialize = async (server: ILemmyServer) => {
    lemmyInstance = new LemmyHttp(`https://${server.server}`);

    if(server.auth) {
        lemmyAuthToken = server.auth;
        return;
    }

    const res = await lemmyInstance.login({
        username_or_email: server.username,
        password: server.password
    });

    lemmyAuthToken = res.jwt;
};