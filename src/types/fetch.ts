export type FetchType<DataType = any> = {
    body: DataType,
    headers: {[key: string]: any},
    status: number | undefined,
    success: boolean,
}