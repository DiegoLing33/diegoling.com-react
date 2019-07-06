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
 *   Файл создан: 2019-07-06 15:06
 *
 *   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */

import {request} from "../Request";

/**
 * Менеджер загрузки
 */
export default abstract class CoreLoadingManager<DataInterface> {
    /**
     * Загруженные элементы
     */
    protected __items?: DataInterface;

    /**
     * Состояние
     */
    protected __ready: boolean = false;

    /**
     * Наблюдатель начала загруки
     */
    protected __startLoadingObservers: Array<() => void> = [];

    /**
     * Наблюдатель конца загрузки
     */
    protected __endLoadingObservers: Array<(data?: DataInterface) => void> = [];

    /**
     * Возвращает true, если менеджер завершил загрузку
     */
    public ready(): boolean {
        return this.__ready;
    }

    /**
     * При начале загрузки
     * @param o
     */
    public onStartLoading(o: () => void): CoreLoadingManager<DataInterface> {
        this.__startLoadingObservers.push(o);
        return this;
    }

    /**
     * При завершении загрузки
     * @param o
     */
    public onEndLoading(o: (data?: DataInterface) => void): CoreLoadingManager<DataInterface> {
        this.__endLoadingObservers.push(o);
        return this;
    }

    /**
     * Загружает элементы
     * @param callback
     */
    public load(callback?: (data?: DataInterface) => void) {
        console.log(`${this.constructor.name} is loading...`);
        this.__startLoadingObservers.forEach(value => value());
        request("get", this.path(), {}, null, {ignoreCache: true})
            .then(value => {
                this.__items = value.json<DataInterface>();
            }).catch(reason => {
            console.log(reason);
        }).finally(()=>{
            console.log(`${this.constructor.name} is ready.`);
            this.__ready = true;
            this.__endLoadingObservers.forEach(value => value(this.__items));
            if (callback) callback(this.__items);
        });
    }

    /**
     * Возвращает путь до элементов
     */
    public abstract path(): string;
}

/**
 * Менеджер загрузки списка
 */
export abstract class ListLoadingManager<ItemInterface> extends CoreLoadingManager<ItemInterface[]>{
    /**
     * Возвращает путь до элементов
     */
    public abstract path(): string;

    /**
     * Возвращает список загруженых элементов
     */
    public list(): ItemInterface[] {
        return this.__items || [];
    }
}

/**
 * Тип сущности
 */
export type TEntitiesList<IEntity> = {[key: string]: IEntity};

/**
 * Менеджер загрузки сущностей
 */
export abstract class EntitiesLoadingManager<EntityInterface> extends CoreLoadingManager<TEntitiesList<EntityInterface>>{
    /**
     * Возвращает путь до элементов
     */
    public abstract path(): string;

    /**
     * Возвращает список загруженых элементов
     */
    public items(): TEntitiesList<EntityInterface> {
        return this.__items || {};
    }
}
