import { FetchType } from "@/types/fetch"

interface Options extends RequestInit{
	body?: any,
	headers?: any
}

export const fetchWrapper = async <TOutput> (uri: string, options: Options = {}): Promise<FetchType<TOutput>> => {
    let response = {} as Response

	if (!options['headers']) {
		options['headers'] = {}
	}
	try {
		await fetch(process.env.NEXT_PUBLIC_APP_URL+uri, options).then((data) => {
			response = data
		})
	} catch (error) {
		console.error(error)

		response = {} as Response
	}
    return await responseWrapper(response)
}

export const responseWrapper = async (response: Response) => {
	let data
	try {
		if (response.headers.get('content-type') === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
			data = await response.blob()
		} else {
			data = await response.json()
		}
	} catch (error) {
		data = {}
	}
	if (response && response.ok) {
		return {
			body: data,
			headers: response.headers,
			status: response.status,
			success: true,
		}
	} else {
		if (data?.error) {
			console.error(data['error'])
		}
		return {
			body: {
				...data,
				...(!data?.detail && {detail: 'Something went wrong. Please, repeat later.'}),
			},
			headers: {},
			status: response.status,
			success: false,
		}
	}
}