export function getStatusTSX(statusMessage: string, statusType: string) {
    if (statusType == "error") {
        return (
            <h1>Error - {statusMessage}</h1>
        )
    } else if (statusType == "success") {
        return (
            <h1>Success - {statusMessage}</h1>
        )
    }
}