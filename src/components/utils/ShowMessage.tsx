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
        case 'success':
            variant = "success"
            break
        case 'info':
            variant = "info"
            break
    }

    toast({
        title: message,
        variant: variant,
        duration: 4000
      })
}