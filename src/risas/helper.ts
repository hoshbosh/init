type RisaQuery = {
    windSpeed: number;
    clearHeight: number;
    panelWidth: number;
}


// Searches for a risa based on wind speed, clear height, and panel width
export const searchRisa=(risaQueryArgs:Record<string, any>, allRisas:any)=>{

    // Basic find percent error function
    const err=(given:number, stored:number)=>{
        return Math.abs((given-stored)/given)*100
    }

    // This object is returned and is comprised of a percent error, and the risa data
    let totalErr={
        err:Number.MAX_VALUE,
        risa:allRisas[0]
    }

    // Taking out the wind speed, clear height, panel width variables to be checked against the risa database
    const {windSpeed, clearHeight, panelWidth}=risaQueryArgs
    
    console.log(risaQueryArgs.windSpeed + " " + risaQueryArgs.clearHeight + " " + risaQueryArgs.panelWidth)

    // console.log("Risa Query Args : " + risaQueryArgs.windSpeed + " " + risaQueryArgs.clearHeight + " " + risaQueryArgs.panelWidth)

    // Iterates over every risa and tries to find the minimum average percent error risa across the three parameters
    for(let i=0; i<allRisas.length;i++){
        const curr=allRisas[i]
        // I am not sure why windspeed is multiplied by a constant, this was the equation in the original excel sheet
        const avgErr=(err(windSpeed, curr["windspeed"])*1.2+err(clearHeight, curr["clear_height"])+err(panelWidth, curr["panel_width"]))/3
        if(avgErr<totalErr.err){
            totalErr.err=avgErr
            totalErr.risa=curr
        }
    }
    return totalErr
}