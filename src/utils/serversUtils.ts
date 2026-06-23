import {ServerEntity} from "@/types/responses/server";

export const isAllMarkedAsCallOnAllActive = (servers: ServerEntity[]) => {
    const markedAsCallOnAll = servers.filter(x => x.isMain)
    const active = servers.filter(x => x.isActive)

    return active.length >= markedAsCallOnAll.length
}

export class ServersUtils {
    public static isAllMainActiveActive (servers: ServerEntity[]) {
        const markedAsCallOnAll = servers.filter(x => x.isMain)
        const active = servers.filter(x => x.isActive)

        return active.length >= markedAsCallOnAll.length
    }

    public static isAllOff(servers: ServerEntity[]) {
        return servers.filter(x => x.isActive).length == 0
    }

    public static mapToActiveStatus(servers: ServerEntity[]) {
        const actives = servers.filter(x => x.isActive)
        const markedAsMain = servers.filter(x => x.isMain)
        const activeCount = actives.length
        const markedAsMainCount = markedAsMain.length
        const activeAndMarkedAsMainCount = servers.filter(x => x.isActive && x.isMain).length

        let typeResult
        let label
        if(activeCount == 0) {
            label = "Nothing Selected"
            typeResult = ServersActiveStatus.allOff
        } else if(activeCount == 1) {
            label = actives[0].label
            typeResult = ServersActiveStatus.oneActive
        }  else if(activeAndMarkedAsMainCount == markedAsMainCount && activeCount == markedAsMainCount) {// todos os marcados estão ativos
            label = "ALL main"
            typeResult = ServersActiveStatus.allMarkedAsCallOnActive
        } else if (activeCount > markedAsMainCount && activeAndMarkedAsMainCount == markedAsMainCount) {
            label = `ALL & other ${activeCount - markedAsMainCount}`
            typeResult = ServersActiveStatus.moreThanAllMarkedAsCallOn
        } else {
            label = `${actives[0].shortLabel} & other ${activeCount - 1}`
            typeResult = ServersActiveStatus.multiple
        }



        return { label, type: typeResult }
    }

}


export enum ServersActiveStatus {
    allOff = 0,
    oneActive = 1,
    multiple = 2,
    allMarkedAsCallOnActive = 3,
    moreThanAllMarkedAsCallOn = 4,
    error = 99

}
