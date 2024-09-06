export type TBike = {
    name: string;
    description: string;
    pricePerHour: number;
    isAvailable: boolean;
    cc: number;
    year: number;
    model: string;
    brand: string;
    img?: string;
}

export type TCloudinaryRes = {
    asset_id?: string;
    public_id?: string;
    version?: number;
    version_id?: string;
    signature?: string;
    width?: number;
    height?: number;
    format?: string;
    resource_type?: string;
    created_at?: string;
    tags?: string[],
    bytes?: number;
    type?: string;
    etag?: string;
    placeholder?: boolean;
    url?: string;
    secure_url?: string;
    asset_folder?: string;
    display_name?: string;
    original_filename?: string;
    api_key?: string;
}