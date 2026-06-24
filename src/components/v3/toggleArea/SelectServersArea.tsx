import {StatusV3} from "@/components/v3/toggleArea/Status.v3";


import {Loading} from "@/components/utils/Loading";
import {ToggleThisV3} from "@/components/v3/toggleArea/ToggleThis.v3";
import {ToggleApisV3} from "@/components/v3/toggleArea/ToggleApis.v3";

export const SelectServersArea = () => {

    return (
        <div>
            <div className={"my-5"}>
                <div className={"flex flex-col items-center p-8"}>
                <StatusV3/>
                </div>
            </div>
            <div className={"flex justify-between my-5"}>
                <ToggleApisV3/>
                <ToggleThisV3/>

                {/*<ToggleItem*/}
                {/*    isChecked={isApiOn}*/}
                {/*    onCheckChange={handleApiStateChange}*/}
                {/*    label="Keep API ON"*/}
                {/*    setForceUpdate={setForceUpdate}*/}
                {/*/>*/}
            </div>

        </div>
    )
}
