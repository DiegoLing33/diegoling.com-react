/*
 *
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 *  ,--. o                   |    o
 *  |   |.,---.,---.,---.    |    .,---.,---.
 *  |   |||---'|   ||   |    |    ||   ||   |
 *  `--' ``---'`---|`---'    `---'``   '`---|
 *             `---'                    `---'
 *
 *   Copyright (C) 2016-2017, Yakov Panov (Yakov Ling)
 *   Mail: <diegoling33@gmail.com>
 *
 *   Это программное обеспечение имеет лицензию, как это сказано в файле
 *   COPYING, который Вы должны были получить в рамках распространения ПО.
 *
 *   Использование, изменение, копирование, распространение, обмен/продажа
 *   могут выполняться исключительно в согласии с условиями файла COPYING.
 *
 *   Файл создан: 2019-07-06 15:25
 *
 *   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */

import CoreLoadingManager from "./managers/CoreLoadingManager";
import StoresManager from "./managers/StoresManager";
import TracksManager from "./managers/TracksManager";

/**
 * Менеджеры приложения
 */
interface IApplicationManagers {
    [name: string]: CoreLoadingManager<any>;
    storesManager: StoresManager;
    tracksManager: TracksManager;
}

/**
 * Приложение
 */
export default class Application {

    /**
     * Менеджеры
     */
    public static managers: IApplicationManagers = {
        storesManager: new StoresManager(),
        tracksManager: new TracksManager(),
    };

    /**
     * Возвращает менеджеры списком
     */
    public static managersList(): CoreLoadingManager<any>[]{
        return Object.values(Application.managers);
    }

    /**
     * Запускает загрузку менеджеров
     */
    public static startManagersLoading(){
        Application.managersList().forEach(value => value.load());
    }

    /**
     * Возвращает true, если все менеджеры загружены
     */
    public static isEveryManagerReady(){
        return Application.managersList().every(value => value.ready());
    }
}
