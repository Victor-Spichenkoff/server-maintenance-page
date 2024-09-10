export const ShowMessage = (
    message: string,
    type: "error" | "success" | "info",
    toast: any,
    desc?:string,

) => {
    var variant = "default"

    switch(type) {
        case 'error':
            variant = "destructive"
            break
        // case 'success':
        //     variant = "success"
        //     break
        // case 'error':
        //     variant = "primary"
        //     break
    }

    toast({
        title: message,
        variant: variant,
      })
}